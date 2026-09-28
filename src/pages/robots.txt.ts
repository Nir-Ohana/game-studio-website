import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('The sitemap requires the production site URL in astro.config.mjs.');
  return new Response(`User-agent: *\nAllow: /\nDisallow: /play/\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
