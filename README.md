# Ohana Studios website

The studio site at [ohana-studios.me](https://ohana-studios.me): showcases for Shelly Jigsaw and Rocket Rabbit, plus Shelly Jigsaw's privacy policy.

The shared layout follows Shelly Jigsaw's in-game style (aqua background, pearl cards, dark readable text, Nunito). Rocket Rabbit has its own pixel art and sunny accent. The header and site icons use the current Ohana Studios heart-and-waves mark. Tokens are at the top of `src/styles/global.css`.

## Pages

| URL | Source |
| --- | --- |
| `/` | `src/pages/index.astro` |
| `/shelly-jigsaw/` | `src/pages/[game].astro` and shared game layout |
| `/rocket-rabbit/` | `src/pages/[game].astro` and shared game layout |
| `/shelly-jigsaw/privacy/` | `src/pages/shelly-jigsaw/privacy.astro` (Google Play and AdMob privacy policy URL) |
| `/privacy` | Redirects to the Shelly Jigsaw policy (`astro.config.mjs`) |
| `/app-ads.txt` | `public/app-ads.txt` (AdMob authorized sellers) |

The homepage links to both dedicated game pages and retains its game section anchors. Both games are labeled **In development · Android**; add a store link only when public availability is confirmed. The existing `/privacy` redirect remains specific to Shelly Jigsaw.

The contact email is set once in `src/site.ts`.

## Game content and assets

Refreshed September 28, 2026 from the local game projects:

- **Shelly Jigsaw** — `C:/dev/puzzle-game`, revision `3d232db`. Features checked against the Adventure catalog, Daily puzzle sizes, hint system and current player-experience docs. Screenshots come from `docs/evidence/schell-lenses/2026-09-27/` (`home.png`, `adventure.png`, `daily.png`, `completion-photo.png`); the app icon comes from `design/store-listing/icon-play-512.png`.
- **Rocket Rabbit** — `C:/Users/Nir/orca/rocket-rabbit`, revision `4e926dc`. Features checked against the README, `Characters.gd`, `Zones.gd` and the cosmetics catalog. Fresh screenshots were captured with `tools/capture_screenshots.tscn` (`00_menu`, `01_start`, `94_friends`, `92_shop_hats`) using a temporary player profile. The older screenshots in `docs/design/screenshots/` predate the pixel art. The app icon and feature art come from `docs/store/`.
- **Studio branding** — Shelly Jigsaw's `design/shelly-style-handoff/brand/ohana-studios/ohana-symbol-full-colour.svg` and `ohana-square-full-colour.svg`.

Web assets are copied into `public/images/`; the site has no runtime dependency on either game checkout. Screenshots are 540 × 1170 WebP images. Rocket Rabbit uses lossless WebP to preserve its pixel art.

## Develop

```sh
npm ci
npm run dev      # http://localhost:4321
npm run check    # Astro and TypeScript diagnostics
npm run build    # static site in dist/
npm run test:seo # checks the built HTML, sitemap and robots.txt
```

## Deploy

Pushing to `main` builds and publishes to GitHub Pages (`.github/workflows/deploy.yml`). The custom domain comes from `public/CNAME`.

## SEO

Canonical URLs use trailing slashes. The sitemap integration generates `/sitemap-index.xml` and `/sitemap-0.xml`; `/robots.txt` advertises the sitemap. Unique metadata and JSON-LD describe the studio and each game. Fonts are served locally, and images use WebP and responsive sizes. See [SEO verification and indexing status](docs/seo.md).
