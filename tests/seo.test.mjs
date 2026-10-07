import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { parse } from 'parse5';

const origin = 'https://ohana-studios.me';
const routes = ['/', '/shelly-jigsaw/', '/rocket-rabbit/', '/pili-words/', '/shelly-jigsaw/privacy/'];
const games = [['/shelly-jigsaw/', 'Shelly Jigsaw'], ['/rocket-rabbit/', 'Rocket Rabbit'], ['/pili-words/', 'Pili Words']];

function nodes(node, tag) {
  return [...(node.tagName === tag ? [node] : []), ...(node.childNodes ?? []).flatMap(child => nodes(child, tag))];
}
function attr(node, name) {
  return node?.attrs?.find(attribute => attribute.name === name)?.value;
}
function text(node) {
  return node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join('');
}
function page(route) {
  const file = join('dist', route.slice(1), 'index.html');
  assert.ok(existsSync(file), `Missing published page: ${route}`);
  return parse(readFileSync(file, 'utf8'));
}
function meta(document, key) {
  return attr(nodes(document, 'meta').find(node => attr(node, 'name') === key || attr(node, 'property') === key), 'content');
}
function graph(document) {
  const scripts = nodes(document, 'script').filter(node => attr(node, 'type') === 'application/ld+json');
  assert.equal(scripts.length, 1, 'A page must publish one complete structured-data graph');
  const data = JSON.parse(text(scripts[0]));
  assert.equal(data['@context'], 'https://schema.org');
  return data['@graph'];
}

for (const route of routes) {
  test(`${route} publishes canonical, indexable metadata and a connected schema graph`, () => {
    const document = page(route);
    const url = origin + route;
    const title = text(nodes(document, 'title')[0]);
    assert.ok(title.includes('Ohana Studios'));
    assert.ok(meta(document, 'description')?.length >= 70);
    assert.equal(nodes(document, 'h1').length, 1);
    assert.equal(attr(nodes(document, 'link').find(node => attr(node, 'rel') === 'canonical'), 'href'), url);
    assert.equal(meta(document, 'og:url'), url);
    assert.equal(meta(document, 'og:title'), title);
    assert.equal(meta(document, 'twitter:title'), title);
    assert.equal(meta(document, 'twitter:description'), meta(document, 'description'));
    assert.ok(meta(document, 'og:image')?.startsWith(origin + '/'));
    assert.ok(meta(document, 'og:image:alt'));
    assert.doesNotMatch(meta(document, 'robots') ?? '', /noindex|nofollow/);
    const data = graph(document);
    const organization = data.find(node => node['@type'] === 'Organization');
    const website = data.find(node => node['@type'] === 'WebSite');
    const webpage = data.find(node => node['@type'] === 'WebPage');
    assert.equal(organization?.name, 'Ohana Studios');
    assert.equal(website?.publisher?.['@id'], organization?.['@id']);
    assert.equal(webpage?.isPartOf?.['@id'], website?.['@id']);
    assert.equal(webpage?.url, url);
  });
}

test('game pages are discoverable from the homepage and have unique search descriptions', () => {
  const home = page('/');
  const links = nodes(home, 'a').map(node => attr(node, 'href'));
  for (const [route] of games) assert.ok(links.includes(route), `No crawlable link to ${route}`);
  const documents = routes.map(page);
  assert.equal(new Set(documents.map(document => text(nodes(document, 'title')[0]))).size, routes.length);
  assert.equal(new Set(documents.map(document => meta(document, 'description'))).size, routes.length);
});

for (const [route, name] of games) {
  test(`${name} schema agrees with its visible development status and breadcrumbs`, () => {
    const document = page(route);
    const data = graph(document);
    const game = data.find(node => node['@type'] === 'VideoGame');
    const webpage = data.find(node => node['@type'] === 'WebPage');
    const breadcrumbs = data.find(node => node['@type'] === 'BreadcrumbList');
    assert.equal(text(nodes(document, 'h1')[0]), name);
    assert.equal(game?.name, name);
    assert.equal(game?.url, origin + route);
    const full = route === '/pili-words/';
    assert.equal(game?.creativeWorkStatus, full ? 'Published' : 'In development');
    assert.match(text(document), full ? /Full game/ : /In development/);
    assert.deepEqual(game?.gamePlatform, full ? ['Web browser', 'Android'] : 'Android');
    assert.equal(webpage?.mainEntity?.['@id'], game?.['@id']);
    assert.ok(!game.offers && !game.aggregateRating && !game.datePublished, 'Do not invent availability, reviews or a launch date');
    assert.equal(breadcrumbs?.itemListElement[0].item, origin + '/');
    assert.equal(breadcrumbs?.itemListElement.at(-1).item, origin + route);
    assert.ok(nodes(document, 'nav').some(node => attr(node, 'aria-label') === 'Breadcrumb'));
    for (const image of nodes(document, 'img')) {
      assert.ok(existsSync(join('dist', attr(image, 'src').slice(1))), `Missing image ${attr(image, 'src')}`);
      assert.ok(attr(image, 'width') && attr(image, 'height'), 'Reserve image space before loading');
      assert.notEqual(attr(image, 'alt'), undefined);
    }
  });
}

test('robots discovers a sitemap containing exactly the canonical pages, without redirects', () => {
  assert.ok(existsSync('dist/robots.txt'), 'Missing robots.txt');
  const robots = readFileSync('dist/robots.txt', 'utf8');
  assert.match(robots, /User-agent:\s*\*/i);
  assert.doesNotMatch(robots, /^Disallow:\s*\/\s*$/im);
  const sitemap = robots.match(/^Sitemap:\s*(\S+)/im)?.[1];
  assert.ok(sitemap?.startsWith(origin + '/'));
  const index = readFileSync(join('dist', new URL(sitemap).pathname.slice(1)), 'utf8');
  const locations = xml => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  const urls = locations(index).flatMap(url => locations(readFileSync(join('dist', new URL(url).pathname.slice(1)), 'utf8')));
  assert.deepEqual(urls.sort(), routes.map(route => origin + route).sort());
});

test('legacy privacy links still lead to the game-specific policy', () => {
  const redirect = readFileSync('dist/privacy/index.html', 'utf8');
  assert.match(redirect, /http-equiv="refresh"/);
  assert.match(redirect, /\/shelly-jigsaw\/privacy\//);
  assert.ok(readFileSync('dist/app-ads.txt', 'utf8').includes('pub-7409104514915121'));
});
