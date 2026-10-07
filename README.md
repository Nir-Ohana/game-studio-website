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
- **Pili Words** — `C:/dev/venn-puzzle`, added October 5, 2026. Features checked against the puzzle catalog (72 levels in six chapters), star ratings and streak. Screenshots are 540 × 1170 captures from `tools/capture_store_shots.gd` (`play`, `mystery`, `win`, `levels`) using isolated saves; the app icon is rendered from the game's `assets/icon.svg`, drawn by `tools/generate_pili_art.py`.
- **Studio branding** — Shelly Jigsaw's `design/shelly-style-handoff/brand/ohana-studios/ohana-symbol-full-colour.svg` and `ohana-square-full-colour.svg`.

Web assets are copied into `public/images/`; the site has no runtime dependency on either game checkout. Screenshots are 540 × 1170 WebP images. Rocket Rabbit uses lossless WebP to preserve its pixel art.

## Pili Words browser demo

The game's own `Web` export preset builds the demo. To refresh it from the current local game, run:

```powershell
./scripts/export-pili-words.ps1
# Optional: -GamePath C:/path/to/venn-puzzle -Godot C:/path/to/Godot_console.exe
```

This exports into a temporary folder, gives the game pack a content-hashed filename, and replaces `public/pili-words-play/`. The game checkout is only read.

## Rocket Rabbit browser demo

Updated September 30, 2026 from `C:/Users/Nir/orca/rocket-rabbit` at `532a947`, including the current local game changes. The demo starts a run directly, with the game's touch arrows and BLAST button enabled for every browser. Players can hold an arrow and BLAST together, or slide a steering finger between arrows. Arrow keys / A-D and Space also work. Tilt remains available in the Android game; the browser export keeps touch steering because its motion sensors are disabled.

The portrait demo keeps its proportions on short screens. Both demos offer a new-tab link after loading, and a full-screen button where the browser supports it. Game packs use a content hash in their filenames so updated controls load for returning visitors.

To refresh Rocket Rabbit from the current local game, run:

```powershell
./scripts/export-rocket-rabbit.ps1
# Optional: -GamePath C:/path/to/rocket-rabbit -Godot C:/path/to/Godot_console.exe
```

This exports a temporary copy using the installed Godot Web templates, then replaces the website's demo only after a successful export. It leaves the game checkout unchanged and prints the location of the import/export logs. Run the site checks below afterward.

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
