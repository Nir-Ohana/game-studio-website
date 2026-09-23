import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ohana-studios.me',
  // The old studio-wide policy URL now points at the Shelly Jigsaw policy.
  redirects: {
    '/privacy': '/shelly-jigsaw/privacy',
  },
  devToolbar: {
    enabled: false,
  },
});
