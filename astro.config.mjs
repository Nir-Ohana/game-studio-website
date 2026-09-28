import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ohana-studios.me',
  trailingSlash: 'always',
  integrations: [sitemap({
    filter: (page) => !['/privacy/', '/404/', '/404.html'].includes(new URL(page).pathname),
  })],
  // The old studio-wide policy URL now points at the Shelly Jigsaw policy.
  redirects: {
    '/privacy': '/shelly-jigsaw/privacy/',
  },
  devToolbar: {
    enabled: false,
  },
});
