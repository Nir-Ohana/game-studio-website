# Ohana Studios website

The studio site at [ohana-studios.me](https://ohana-studios.me): the Shelly Jigsaw showcase and the app's privacy policy.

It follows the Shelly Jigsaw in-game style (flat aqua background, pearl cards, dark readable text, Nunito only). Tokens are at the top of `src/styles/global.css`.

## Pages

| URL | Source |
| --- | --- |
| `/` | `src/pages/index.astro` |
| `/shelly-jigsaw/privacy` | `src/pages/shelly-jigsaw/privacy.astro` (Google Play and AdMob privacy policy URL) |
| `/privacy` | Redirects to the Shelly Jigsaw policy (`astro.config.mjs`) |
| `/app-ads.txt` | `public/app-ads.txt` (AdMob authorized sellers) |

The contact email is set once in `src/site.ts`.

## Develop

```sh
npm ci
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Deploy

Pushing to `main` builds and publishes to GitHub Pages (`.github/workflows/deploy.yml`). The custom domain comes from `public/CNAME`.
