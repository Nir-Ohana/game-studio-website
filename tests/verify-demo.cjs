// Manual browser smoke check. Uses the locally installed Playwright/Chrome.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH,
    headless: true,
    args: ['--enable-webgl', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
  });
  const evidence = process.env.DEMO_EVIDENCE || path.join(require('node:os').tmpdir(), 'rocket-rabbit-browser-check');
  fs.mkdirSync(evidence, { recursive: true });
  try {
    for (const device of [
      { name: 'phone', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
      { name: 'small-phone', viewport: { width: 320, height: 568 }, isMobile: true, hasTouch: true },
      { name: 'landscape-phone', viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true },
      { name: 'desktop', viewport: { width: 1280, height: 900 } },
    ]) {
      const context = await browser.newContext(device);
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      const requests = [];
      page.on('request', request => requests.push(request.url()));
      await page.goto(`${process.env.DEMO_URL || 'http://127.0.0.1:4321'}/rocket-rabbit/#play`);
      assert.equal(await page.locator('iframe').count(), 0, 'Game must load only on demand');
      assert.ok(!requests.some(url => /\.(wasm|pck)/.test(url)));
      assert.ok(await page.locator('#play').innerText().then(text => text.includes('BLAST')));
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), 'No horizontal page overflow');
      const box = await page.locator('[data-play-frame]').boundingBox();
      assert.ok(Math.abs(box.width / box.height - 9 / 16) < 0.01, 'Demo keeps portrait proportions');
      await page.getByRole('button', { name: 'Play now' }).click();
      const frame = await (await page.locator('iframe').elementHandle()).contentFrame();
      await frame.waitForURL(/rocket-rabbit-play/);
      await frame.waitForSelector('#canvas');
      await frame.waitForFunction(() => !document.querySelector('#status'), { timeout: 60000 });
      await page.locator('iframe').scrollIntoViewIfNeeded();
      await page.locator('iframe').evaluate(iframe => {
        const box = iframe.getBoundingClientRect();
        window.scrollTo({ top: window.scrollY + box.top - (window.innerHeight - box.height) / 2, behavior: 'instant' });
      });
      assert.ok(requests.some(url => /index\.[0-9a-f]{12}\.pck$/.test(url)), 'Load the current versioned game pack');
      await frame.locator('#canvas').screenshot({ path: path.join(evidence, `${device.name}-game.png`) });
      await page.screenshot({ path: path.join(evidence, `${device.name}.png`) });
      assert.ok(await page.getByRole('link', { name: 'Open demo in a new tab' }).isVisible());
      if (device.hasTouch) {
        await page.locator('iframe').evaluate(iframe => {
          const box = iframe.getBoundingClientRect();
          window.scrollTo({ top: window.scrollY + box.top - (window.innerHeight - box.height) / 2, behavior: 'instant' });
        });
        const canvas = await frame.locator('#canvas').boundingBox();
        assert.ok(canvas.y >= -1 && canvas.y + canvas.height <= device.viewport.height + 1, `Touch controls fit inside the visible viewport: ${JSON.stringify(canvas)}`);
        const point = (id, x) => ({ id, x: canvas.x + canvas.width * x, y: canvas.y + canvas.height * 0.941, radiusX: 6, radiusY: 6, force: 1 });
        const session = await context.newCDPSession(page);
        await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [point(0, 0.29), point(1, 0.5)] });
        await page.waitForTimeout(800);
        await frame.locator('#canvas').screenshot({ path: path.join(evidence, `${device.name}-game-steer-blast.png`) });
        await page.screenshot({ path: path.join(evidence, `${device.name}-steer-blast.png`) });
        await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [point(0, 0.71), point(1, 0.5)] });
        await page.waitForTimeout(500);
        await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      } else {
        await frame.locator('#canvas').focus();
        await page.keyboard.down('ArrowRight');
        await page.keyboard.down('Space');
        await page.waitForTimeout(800);
        await page.screenshot({ path: path.join(evidence, 'desktop-keyboard.png') });
        await page.keyboard.up('Space');
        await page.keyboard.up('ArrowRight');
      }
      assert.deepEqual(errors, [], `${device.name}: browser errors`);
      console.log(`PASS ${device.name}: deferred load, layout, game startup, inputs, no browser errors`);
      await context.close();
    }
    console.log(`Screenshots: ${evidence}`);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
