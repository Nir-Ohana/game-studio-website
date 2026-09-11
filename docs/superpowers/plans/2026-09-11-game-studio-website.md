# Ohana Studios Website & Shelly Jigsaw Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a blazing-fast, responsive static website and devlog for Ohana Studios and its flagship game *Shelly Jigsaw: Calm Puzzles* at `ohana-studios.me`, complete with automated GitHub Actions deployment.

**Architecture:** Astro static site generator with Tailwind CSS and Content Collections for Markdown-powered blog articles. The site generates zero-JS static HTML by default and automatically deploys to GitHub Pages on push to `main` with custom domain `ohana-studios.me`.

**Tech Stack:** Astro 5.x, Tailwind CSS, TypeScript, Markdown/MDX, GitHub Actions, GitHub Pages.

## Global Constraints

- Domain target: `ohana-studios.me` (GoDaddy DNS, GitHub Pages hosting).
- Workspace: `C:\dev\game-studio-website`.
- Repository: `https://github.com/Nir-Ohana/game-studio-website`.
- Flagship Game: *Shelly Jigsaw: Calm Puzzles* (assets sourced from `C:\dev\puzzle-game`).
- Zero unnecessary client JavaScript: keep interactive elements accessible and CSS/HTML native where possible.
- All tasks must produce verifiable static output (`dist/`).

---

### Task 1: Project Initialization & Tooling Setup

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `public/CNAME`
- Create: `.github/workflows/deploy.yml`
- Create: `.gitignore`

**Interfaces:**
- Produces: Astro build system configured with Tailwind CSS and GitHub Pages automated deployment.

- [ ] **Step 1: Initialize package.json and install Astro dependencies**

Write `package.json` with Astro and Tailwind CSS packages:

```json
{
  "name": "game-studio-website",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/check": "^0.9.4",
    "@astrojs/tailwind": "^5.1.5",
    "@tailwindcss/typography": "^0.5.16",
    "astro": "^5.4.2",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.3"
  }
}
```

Run installation:
```bash
npm install
```

- [ ] **Step 2: Create Astro and TypeScript configuration files**

Write `astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://ohana-studios.me',
  integrations: [tailwind({ applyBaseStyles: false })],
});
```

Write `tsconfig.json`:
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strictNullChecks": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

Write `.gitignore`:
```text
dist/
node_modules/
.astro/
.DS_Store
```

- [ ] **Step 3: Add custom domain CNAME and GitHub Pages deployment workflow**

Write `public/CNAME`:
```text
ohana-studios.me
```

Write `.github/workflows/deploy.yml`:
```yaml
name: Deploy Ohana Studios to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Detect package manager
        id: detect-package-manager
        run: |
          echo "manager=npm" >> $GITHUB_OUTPUT
          echo "command=ci" >> $GITHUB_OUTPUT
          echo "runner=npx --no-install" >> $GITHUB_OUTPUT

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm

      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5

      - name: Install dependencies
        run: npm ci

      - name: Build with Astro
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 4: Verify initial setup**

Create a temporary minimal page `src/pages/index.astro` to test the build:
```astro
---
---
<html>
  <head><title>Ohana Studios</title></head>
  <body><h1>Ohana Studios</h1></body>
</html>
```

Run: `npm run build`  
Expected output: Build completed successfully, generating `dist/index.html` and copying `dist/CNAME`.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json .gitignore public/CNAME .github/workflows/deploy.yml src/pages/index.astro
git commit -m "chore: initialize Astro project with Tailwind, CNAME, and GitHub Actions"
```

---

### Task 2: Asset Pipeline & Brand Assets

**Files:**
- Create: `public/favicon.svg`
- Create: `public/images/studio/logo.svg`
- Copy: `C:\dev\puzzle-game\design\store-listing\screenshots\*` to `public/images/games/shelly-jigsaw/`
- Copy: `C:\dev\puzzle-game\design\store-listing\feature-graphic-play.png` to `public/images/games/shelly-jigsaw/`

**Interfaces:**
- Produces: Visual assets accessible via `/favicon.svg`, `/images/studio/...`, and `/images/games/shelly-jigsaw/...`.

- [ ] **Step 1: Copy real game captures and promotional graphics from puzzle-game**

Copy screenshots:
- `01-home.png` → `public/images/games/shelly-jigsaw/01-home.png`
- `02-daily.png` → `public/images/games/shelly-jigsaw/02-daily.png`
- `03-adventure.png` → `public/images/games/shelly-jigsaw/03-adventure.png`
- `04-puzzle-play.png` → `public/images/games/shelly-jigsaw/04-puzzle-play.png`
- `05-completion.png` → `public/images/games/shelly-jigsaw/05-completion.png`
- `feature-graphic-play.png` → `public/images/games/shelly-jigsaw/feature-graphic.png`

- [ ] **Step 2: Generate SVG Favicon and Studio Logo**

Write `public/favicon.svg`:
Modern, clean sea turtle / puzzle-piece vector badge representing Shelly and Ohana Studios.

Write `public/images/studio/logo.svg`:
Vector logo of Ohana Studios combining subtle interlocking pieces with a clean modern geometric insignia.

- [ ] **Step 3: Verify assets exist and are valid**

Check file paths:
- `public/images/games/shelly-jigsaw/01-home.png`
- `public/images/games/shelly-jigsaw/feature-graphic.png`
- `public/favicon.svg`

- [ ] **Step 4: Commit**

```bash
git add public/
git commit -m "feat: add Shelly Jigsaw game screenshots and Ohana Studios SVG branding"
```

---

### Task 3: Layouts, Global Styles & SEO Shell

**Files:**
- Create: `src/styles/global.css`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Create: `src/layouts/BaseLayout.astro`

**Interfaces:**
- Consumes: Tailwind CSS directives, studio branding assets.
- Produces: `BaseLayout.astro` wrapping any page with header, footer, OpenGraph metadata, and consistent typography.

- [ ] **Step 1: Implement global styles**

Write `src/styles/global.css`:
Include `@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`, dark theme custom scrollbar, selection styling, and mesh gradient background utilities.

- [ ] **Step 2: Implement Header component**

Write `src/components/Header.astro`:
- Responsive sticky header with backdrop blur (`backdrop-blur-md bg-[#0B0F19]/80 border-b border-gray-800/60`).
- Logo with link to `/`.
- Navigation links: `Games` (`/#game`), `Blog` (`/blog`), `About` (`/#about`), `Contact` (`/#contact`).
- CTA Button: `Play Shelly Jigsaw` (accent gradient, rounded-full).
- Mobile hamburger menu toggle with responsive flyout.

- [ ] **Step 3: Implement Footer component**

Write `src/components/Footer.astro`:
- Studio motto: *"Play Together, Win Together"*.
- Quick navigation links.
- Games list (`Shelly Jigsaw`).
- Legal links: Privacy Policy (`/privacy`), Copyright notice (`© 2026 Ohana Studios`).

- [ ] **Step 4: Implement BaseLayout**

Write `src/layouts/BaseLayout.astro`:
- Props: `title: string`, `description?: string`, `image?: string`, `canonicalURL?: string`.
- Full `<meta>` tags: OpenGraph (og:title, og:description, og:image, og:url), Twitter card (summary_large_image), theme-color `#0B0F19`.
- Google Fonts preconnect (`Outfit` & `Inter`).
- Wraps `<Header />`, `<main><slot /></main>`, and `<Footer />`.

- [ ] **Step 5: Verify build with BaseLayout**

Update `src/pages/index.astro` to use `BaseLayout`.  
Run: `npm run build`  
Expected output: Successful build with clean HTML shell.

- [ ] **Step 6: Commit**

```bash
git add src/styles/global.css src/components/Header.astro src/components/Footer.astro src/layouts/BaseLayout.astro src/pages/index.astro
git commit -m "feat: add BaseLayout, responsive Header, Footer, and global styling"
```

---

### Task 4: Homepage Sections (Studio Hero, Game Spotlight, Contact)

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/GameSpotlight.astro`
- Create: `src/components/ContactSection.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `BaseLayout`, game assets in `public/images/games/shelly-jigsaw/`.
- Produces: Complete studio and game showcase homepage.

- [ ] **Step 1: Implement Studio Hero component**

Write `src/components/Hero.astro`:
- Eye-catching banner featuring "OHANA STUDIOS" and the studio motto "Play Together, Win Together".
- Modern dark aesthetics with subtle glowing gradient accents.
- Direct CTA buttons: "Discover Shelly Jigsaw" (scrolls to `#game`) and "Read Devlog" (links to `/blog`).

- [ ] **Step 2: Implement GameSpotlight component**

Write `src/components/GameSpotlight.astro`:
- Headline badge: "Featured Game".
- Title: *Shelly Jigsaw: Calm Puzzles*.
- Subtitle: "Relaxing, cozy jigsaw puzzles designed for peaceful focus and comfort."
- Interactive/Tabbed visual showcase displaying the Godot game screenshots:
  - Daily Puzzle
  - Adventure Journey
  - Piece Snapping & Board
  - Victory Stars & Journal
- Key Highlights Grid (4 cards with icons):
  1. *Gentle & Forgiving:* Snapping tolerances tuned for relaxation; pieces never get lost.
  2. *Designed for 50+:* High contrast, large piece modes, clear readable fonts.
  3. *Daily & Adventure Modes:* Fresh daily puzzle seeded each morning, plus storybook progression.
  4. *Calm & Ad-Free:* Zero ads during puzzles, 3 free hints on every board, 100% offline.
- Download Badges:
  - Google Play button with "Coming Soon" badge.
  - Apple App Store button with "Coming Soon" badge.

- [ ] **Step 3: Implement ContactSection component**

Write `src/components/ContactSection.astro`:
- Section heading: "Get in Touch".
- Direct email card (`hello@ohana-studios.me`) with copy-to-clipboard / mailto link.
- Studio details: Indie game studio based in Israel, focusing on calm and accessible games.
- Social / community cards: GitHub, Discord, Press Inquiries.

- [ ] **Step 4: Assemble Homepage in `src/pages/index.astro`**

Wire `Hero`, `GameSpotlight`, and `ContactSection` into `src/pages/index.astro`.

- [ ] **Step 5: Verify build**

Run: `npm run build`  
Expected output: Static HTML built cleanly with all homepage sections.

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.astro src/components/GameSpotlight.astro src/components/ContactSection.astro src/pages/index.astro
git commit -m "feat: implement Studio Hero, Game Spotlight, and Contact sections"
```

---

### Task 5: Content Collections & Blog System

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/blog/2026-09-11-introducing-shelly-jigsaw.md`
- Create: `src/components/BlogCard.astro`
- Create: `src/layouts/BlogPostLayout.astro`
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[slug].astro`
- Modify: `src/pages/index.astro` (embed latest blog cards)

**Interfaces:**
- Consumes: Astro Content Collections API (`getCollection`, `render`).
- Produces: Type-safe blog archive at `/blog`, individual post routes at `/blog/[slug]`, and preview cards on `/`.

- [ ] **Step 1: Configure Content Collection schema**

Write `src/content.config.ts`:
```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Ohana Studios'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

- [ ] **Step 2: Create debut devlog post**

Write `src/content/blog/2026-09-11-introducing-shelly-jigsaw.md`:
Detailed, engaging devlog covering:
- Why we built *Shelly Jigsaw*: bringing calm, cozy puzzles to players of all ages, with special care for players 50+.
- Godot 4 architecture: custom piece generation, forgiving snapping algorithms, deterministic offline scoring.
- Design philosophy: no timers forcing rush, 3 free hints, zero ad interruptions.
- What's next on our roadmap (Daily puzzle streaks and Adventure mode).

- [ ] **Step 3: Implement BlogCard and BlogPostLayout**

Write `src/components/BlogCard.astro`:
Card with post cover image, tag pills, formatted publication date, title, description, read time, and hover transition.

Write `src/layouts/BlogPostLayout.astro`:
Reading-optimized layout with breadcrumb nav, author pill, hero image, styled Markdown typography (`prose prose-invert prose-sky max-w-none`), and back-to-blog link.

- [ ] **Step 4: Implement `/blog` and `/blog/[slug]` routes**

Write `src/pages/blog/index.astro`:
List all non-draft posts sorted by date descending, tag filtering buttons, and RSS / newsletter CTA.

Write `src/pages/blog/[slug].astro`:
Use `getStaticPaths` with `getCollection('blog')` to generate static pages for each markdown post. Render body with `<Content />`.

- [ ] **Step 5: Integrate Latest Dispatches on Homepage**

Update `src/pages/index.astro` to query the latest 3 posts from `getCollection('blog')` and render them in a "Latest from the Studio" section.

- [ ] **Step 6: Verify build**

Run: `npm run build`  
Expected output: Successful build generating `/blog/index.html` and `/blog/2026-09-11-introducing-shelly-jigsaw/index.html`.

- [ ] **Step 7: Commit**

```bash
git add src/content.config.ts src/content/blog/ src/components/BlogCard.astro src/layouts/BlogPostLayout.astro src/pages/blog/ src/pages/index.astro
git commit -m "feat: implement Content Collections blog system and debut Shelly Jigsaw devlog"
```

---

### Task 6: Privacy Policy Page

**Files:**
- Create: `src/pages/privacy.astro`

**Interfaces:**
- Consumes: `BaseLayout`.
- Produces: Compliant legal document at `/privacy`.

- [ ] **Step 1: Write Privacy Policy page**

Write `src/pages/privacy.astro`:
- App store compliant privacy policy covering *Shelly Jigsaw* and *Ohana Studios*.
- Clear headings: Data Collection (None), Offline Storage, Children's Privacy (COPPA compliant), Third-Party Services, Contact Information.

- [ ] **Step 2: Verify build**

Run: `npm run build`  
Expected output: Successful build generating `/privacy/index.html`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/privacy.astro
git commit -m "feat: add Google Play and App Store compliant Privacy Policy"
```

---

### Task 7: End-to-End Build Verification & DNS Guide

**Files:**
- Create: `README.md`
- Verify: Full static build in `dist/`

- [ ] **Step 1: Write documentation and DNS guide**

Write `README.md`:
- Overview of Ohana Studios website.
- Local development commands (`npm install`, `npm run dev`, `npm run build`).
- GoDaddy DNS configuration instructions for `ohana-studios.me`.
- Adding new blog posts guide.

- [ ] **Step 2: Run full build and verify distribution**

Run: `npm run build`  
Verify:
- `dist/index.html` exists and contains homepage content.
- `dist/blog/index.html` exists.
- `dist/blog/2026-09-11-introducing-shelly-jigsaw/index.html` exists.
- `dist/privacy/index.html` exists.
- `dist/CNAME` contains `ohana-studios.me`.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add setup instructions and GoDaddy DNS guide for ohana-studios.me"
```
