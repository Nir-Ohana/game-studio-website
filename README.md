# Ohana Studios website

The studio site at [ohana-studios.me](https://ohana-studios.me): showcases for Shelly Jigsaw, Rocket Rabbit and Pili Words, plus Shelly Jigsaw's privacy policy.

The shared layout follows Shelly Jigsaw's in-game style (aqua background, pearl cards, dark readable text, Nunito). Rocket Rabbit has its own pixel art and sunny accent. The header and site icons use the current Ohana Studios heart-and-waves mark. Tokens are at the top of `src/styles/global.css`.

## Pages

The homepage pairs a spacious introduction with two illustrated game showcases, each using its own colors and real game screenshots. The shared header uses the heart-and-waves studio mark, and the layout adapts to narrow phone screens. Browser demos load only after the player chooses to play.

| URL | Source |
| --- | --- |
| `/` | `src/pages/index.astro` |
| `/shelly-jigsaw/` | `src/pages/[game].astro` and shared game layout |
| `/rocket-rabbit/` | `src/pages/[game].astro` and shared game layout |
| `/pili-words/` | `src/pages/[game].astro` and shared game layout |
| `/shelly-jigsaw/privacy/` | `src/pages/shelly-jigsaw/privacy.astro` (Google Play and AdMob privacy policy URL) |
| `/privacy` | Redirects to the Shelly Jigsaw policy (`astro.config.mjs`) |
| `/app-ads.txt` | `public/app-ads.txt` (AdMob authorized sellers) |

The homepage links to every dedicated game page and retains its game section anchors. Both games are labeled **In development · Android**; add a store link only when public availability is confirmed. The existing `/privacy` redirect remains specific to Shelly Jigsaw.

The contact email is set once in `src/site.ts`.

## Game content and assets

Refreshed September 28, 2026 from the local game projects:

- **Shelly Jigsaw** — `C:/dev/puzzle-game`, revision `3d232db`. Features checked against the Adventure catalog, Daily puzzle sizes, hint system and current player-experience docs. Screenshots come from `docs/evidence/schell-lenses/2026-09-27/` (`home.png`, `adventure.png`, `daily.png`, `completion-photo.png`); the app icon comes from `design/store-listing/icon-play-512.png`.
- **Rocket Rabbit** — `C:/Users/Nir/orca/rocket-rabbit`, revision `4e926dc`. Features checked against the README, `Characters.gd`, `Zones.gd` and the cosmetics catalog. Fresh screenshots were captured with `tools/capture_screenshots.tscn` (`00_menu`, `01_start`, `94_friends`, `92_shop_hats`) using a temporary player profile. The older screenshots in `docs/design/screenshots/` predate the pixel art. The app icon and feature art come from `docs/store/`.
- **Pili Words** — `C:/dev/venn-puzzle`, added October 5, 2026. Features checked against the puzzle catalog (96 levels in eight chapters), star ratings and streak. Screenshots are 540 × 1170 captures from `tools/capture_store_shots.gd` (`play`, `mystery`, `win`, `levels`) using isolated saves; the app icon is rendered from the game's `assets/icon.svg`, drawn by `tools/generate_pili_art.py`.
- **Studio branding** — Shelly Jigsaw's `design/shelly-style-handoff/brand/ohana-studios/ohana-symbol-full-colour.svg` and `ohana-square-full-colour.svg`.

Web assets are copied into `public/images/`; the site has no runtime dependency on either game checkout. Screenshots are 540 × 1170 WebP images. Rocket Rabbit uses lossless WebP to preserve its pixel art.

## Browser demos

| Demo | Folder | Built by |
| --- | --- | --- |
| Shelly Jigsaw | `public/play/` | `puzzle-game`: `scripts/export_web.sh`, CI artifact `web-demo` |
| Rocket Rabbit | `public/rocket-rabbit-play/` | `rocket-rabbit`: `scripts/export_web.sh`, CI artifact `web-demo` |
| Pili Words | `public/pili-words-play/` | `pili-words`: the "Web Demo" preset, via `scripts/export-pili-words.ps1` here until its CI exports it |

Every demo uses one slim Godot web template (no 3D, no networking, XR or video): about 23.7 MB of wasm, 7.3 MB gzipped, against 39.5 MB and 10.2 MB for the stock template. The **Build slim Godot web template** workflow (`.github/workflows/godot-web-template.yml`, run by hand) builds it and publishes it as the `godot-web-<version>-slim` release of this repo; each game's export script downloads it from there. Rebuild it when the games move to a new Godot version, and add a module back if a game starts using it.

`deploy.yml` installs each game's newest `web-demo` artifact from `main` with `scripts/install-demo.sh`, on every push and nightly. The games are private, so this needs the `GAME_DEMOS_TOKEN` secret: a fine-grained token with Actions: read on `puzzle-game`, `rocket-rabbit` and `pili-words`. A game without a readable artifact keeps the demo committed in `public/`.

To install a local build by hand:

```sh
sh scripts/install-demo.sh ../puzzle-game/scratch/web_build play
```

`install-demo.sh` gives the game pack a content-hashed filename, so returning visitors load the new version, and replaces the demo folder as a whole. The games' export scripts call it unless given `--no-publish`.

Pili Words' "Web Demo" preset plays the first chapter only; pass `-Preset Web` to `export-pili-words.ps1` for the whole game.

Rocket Rabbit's demo starts a run directly, with the game's touch arrows and BLAST button enabled for every browser. Players can hold an arrow and BLAST together, or slide a steering finger between arrows. Arrow keys / A-D and Space also work. Tilt remains available in the Android game; the web build turns the motion sensors off. The portrait demo keeps its proportions on short screens. Both demos offer a new-tab link after loading, and a full-screen button where the browser supports it.

For a browser smoke check with an installed Playwright and Chrome:

```powershell
$env:PLAYWRIGHT_PATH = 'C:/path/to/node_modules/playwright-core'
$env:CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
node tests/verify-demo.cjs
```

Start the local site first. This checks deferred game loading, startup, touch and keyboard input, portrait frame proportions and page overflow across desktop and three phone sizes. Screenshots are written to a temporary evidence directory for visual inspection.

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
