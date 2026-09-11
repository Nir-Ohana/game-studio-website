# Design Document: Ohana Studios Website & Shelly Jigsaw Game Showcase

**Date:** 2026-09-11  
**Project:** Ohana Studios Static Website & Blog  
**Target Domain:** `ohana-studios.me`  
**Repository:** `Nir-Ohana/game-studio-website` (`C:\dev\game-studio-website`)  
**Flagship Game:** *Shelly Jigsaw: Calm Puzzles* (`Nir-Ohana/puzzle-game`)  

---

## 1. Executive Summary

Ohana Studios requires an authoritative, high-performance static website at `ohana-studios.me`. The website serves two primary purposes:
1. **Studio Identity:** Establish Ohana Studios as an indie game studio with the motto *"Play Together, Win Together"*, providing a professional brand presence and studio contact channel.
2. **Game Showcase & Devlog:** Promote the studio's flagship title, *Shelly Jigsaw: Calm Puzzles*, with rich gameplay visuals, feature highlights, store download links, and an integrated Markdown-powered blog for devlogs and game design updates.

The website is constructed as a static site generated via **Astro** and **Tailwind CSS**, hosted for free on **GitHub Pages** with automated **GitHub Actions** CI/CD and connected to the custom GoDaddy domain `ohana-studios.me`.

---

## 2. Information Architecture & Routes

The site features a focused, zero-bloat route hierarchy:

```
ohana-studios.me/
├── /                     # Studio Homepage & Shelly Jigsaw Spotlight
├── /blog                 # Devlog & News Archive (filterable by tag)
├── /blog/[slug]          # Individual Devlog Article (Markdown/MDX)
└── /privacy              # Privacy Policy (App Store & Google Play compliance)
```

### 2.1. Homepage (`/`)
* **Header / Navigation:**
  * Logo: "OHANA STUDIOS" text mark with minimalist game-controller/puzzle icon.
  * Nav Links: `Games` (`#game`), `Blog` (`/blog`), `About` (`#about`), `Contact` (`#contact`).
  * CTA Button: "Play Shelly Jigsaw" (smooth scrolls to `#game` or opens store links).
* **Studio Hero Section:**
  * Headline: *"OHANA STUDIOS"*
  * Tagline: *"Play Together, Win Together"*
  * Background: Subtle dark radial mesh gradient with geometric particle accents.
  * Supporting copy introducing the studio's focus on calm, thoughtful, and accessible games.
* **Game Spotlight Section (`#game` — *Shelly Jigsaw: Calm Puzzles*):**
  * **Brand Pill:** "Flagship Release"
  * **Game Title & Tagline:** *Shelly Jigsaw: Calm Puzzles* — "Cozy jigsaw puzzles with Shelly the sea turtle".
  * **Interactive Media Gallery:** High-definition real-display screenshots from the Godot game:
    1. Home Screen & Level Selection
    2. Daily Puzzle mode with streak tracking
    3. Adventure Map & Chapter progression
    4. In-game gameplay with large pieces and gentle snapping
    5. Victory & Stars celebration
  * **Feature Highlights Grid:**
    * *Accessible by Design:* Large buttons, high contrast, extra-large text mode, and forgiving piece snapping built for players 50+.
    * *Daily & Adventure:* A fresh date-seeded daily puzzle every day plus curated storybook chapters.
    * *Calm & Peaceful:* Zero time pressure, 3 free gentle hints per puzzle, no intrusive countdowns.
    * *100% Private & Offline:* No account creation, no tracking, works completely without an internet connection.
  * **Store Download Badges:**
    * Google Play Store badge (*"Coming Soon"* status pill + pre-register/store link).
    * Apple App Store badge (*"Coming Soon"* status pill + App Store link).
* **Latest Dispatches Section:**
  * Displays the 3 latest blog/devlog articles as structured cards with thumbnail image, publish date, read time estimate, tags, and summary snippet.
  * "View all posts →" link directing to `/blog`.
* **About the Studio Section (`#about`):**
  * Narrative on Ohana Studios' mission: crafting digital experiences that prioritize player comfort, accessibility, and heartfelt craftsmanship.
* **Contact & Press Section (`#contact`):**
  * Direct contact channels: contact email (`hello@ohana-studios.me` / direct mailto link), GitHub repository link, and social profiles.
  * Press inquiries / media kit download notice.
* **Footer:**
  * Copyright notice: `© 2026 Ohana Studios. All rights reserved.`
  * Quick links: Home, Shelly Jigsaw, Devlog, Privacy Policy.

### 2.2. Blog Archive (`/blog`)
* Hero header: "Studio Dispatches & Devlogs".
* Tag filter bar: Filter articles by `All`, `Devlog`, `Game Design`, `Announcements`.
* Grid of all published posts sorted chronologically (newest first).

### 2.3. Article Template (`/blog/[slug]`)
* Breadcrumb navigation: `Home > Blog > [Article Title]`.
* Header: Title, subtitle, author ("Nir Ohana / Ohana Studios"), publish date, and category tags.
* Featured hero image with caption.
* Article Body: Styled using `@tailwindcss/typography` (`prose prose-invert prose-lg`), supporting:
  * Headers (`h2`, `h3`)
  * Blockquotes and callouts
  * Code blocks with syntax highlighting
  * Inline and full-width images with captions
* "Share this article" / Back to all dispatches navigation.

### 2.4. Privacy Policy (`/privacy`)
* Compliant with Google Play Store & Apple App Store developer requirements.
* Explicitly states:
  * No personal data collection or tracking.
  * Offline-first local storage for game progression, settings, and journal history.
  * No third-party ad networks or tracking SDKs in v1.
  * Contact information for privacy questions.

---

## 3. Visual System & Branding

* **Theme:** Modern Dark Studio shell accented with warm storybook colors.
* **Color Palette:**
  * Background Primary: `#0B0F19` (Deep Slate / Night Sky)
  * Background Secondary / Cards: `#111827` (Rich Charcoal Slate)
  * Card Borders / Dividers: `#1F2937` / `#374151`
  * Text Primary: `#F9FAFB` (Crisp Off-White)
  * Text Muted: `#9CA3AF` (Subtle Slate Gray)
  * Brand Accent (Studio): `#38BDF8` (Sky Blue) & `#818CF8` (Indigo Glow)
  * Game Accent (*Shelly Jigsaw*): `#0D9488` (Ocean Teal) & `#F59E0B` (Warm Amber Star)
* **Typography:**
  * Headings: Modern geometric sans-serif (`Outfit`, `Plus Jakarta Sans`, or system sans).
  * Body: Readable clean neutral sans (`Inter`, `system-ui`).
* **Responsive Layout:**
  * Mobile-first responsive design tested for 360px up to 4K displays.
  * Touch-friendly tap targets (minimum 44x44px) adhering to accessibility standards.

---

## 4. Technical Architecture

### 4.1. Directory Structure (`C:\dev\game-studio-website`)

```text
game-studio-website/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages build & deployment
├── public/
│   ├── CNAME                       # Domain declaration: ohana-studios.me
│   ├── favicon.svg                 # Studio favicon
│   ├── images/
│   │   ├── studio/                 # Studio branding images & icons
│   │   └── games/
│   │       └── shelly-jigsaw/      # Screenshots, app icons, and promo graphics
├── src/
│   ├── content.config.ts           # Astro content collection definitions (Zod schema)
│   ├── content/
│   │   └── blog/                   # Markdown blog articles
│   │       └── 2026-09-11-introducing-shelly-jigsaw.md
│   ├── layouts/
│   │   ├── BaseLayout.astro        # Base HTML shell with SEO meta & fonts
│   │   └── BlogPostLayout.astro    # Blog article reader shell
│   ├── components/
│   │   ├── Header.astro            # Sticky header & navigation
│   │   ├── Footer.astro            # Global footer & legal links
│   │   ├── Hero.astro              # Studio hero section
│   │   ├── GameSpotlight.astro     # Shelly Jigsaw showcase & gallery
│   │   ├── BlogCard.astro          # Reusable post teaser card
│   │   └── ContactSection.astro    # Contact card & social links
│   ├── pages/
│   │   ├── index.astro             # Studio homepage & game spotlight
│   │   ├── blog/
│   │   │   ├── index.astro         # Blog archive list
│   │   │   └── [slug].astro        # Dynamic Markdown post route
│   │   └── privacy.astro           # Privacy Policy page
│   └── styles/
│       └── global.css              # Tailwind directives & custom utilities
├── astro.config.mjs                # Astro configuration (site URL, Tailwind)
├── package.json                    # Dependencies and build scripts
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Repository overview & deployment instructions
```

### 4.2. Blog Schema Definition (`src/content.config.ts`)

```typescript
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
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

---

## 5. Domain & Deployment Specification

### 5.1. GitHub Pages Automation
* Repository: `https://github.com/Nir-Ohana/game-studio-website`
* Branch: `main`
* Workflow (`.github/workflows/deploy.yml`):
  * Trigger: Push to `main`.
  * Runner: `ubuntu-latest`.
  * Actions: Checkout → Setup Node.js (v20) → `npm ci` → `npm run build` → Deploy to GitHub Pages via `actions/deploy-pages@v4`.

### 5.2. GoDaddy Custom Domain Setup for `ohana-studios.me`
To route traffic from GoDaddy to GitHub Pages:
1. In `public/CNAME`, write:
   ```text
   ohana-studios.me
   ```
2. In GoDaddy DNS Management for `ohana-studios.me`:
   * Add **4 `A` Records** pointing `@` to GitHub Pages IPs:
     * `185.199.108.153`
     * `185.199.109.153`
     * `185.199.110.153`
     * `185.199.111.153`
   * Add **1 `CNAME` Record** pointing `www` to `nir-ohana.github.io`.
3. In GitHub Repository Settings → Pages:
   * Custom domain: `ohana-studios.me`
   * Check "Enforce HTTPS".

---

## 6. Verification & Quality Acceptance Criteria

1. **Build & Typecheck:** `npm run build` runs cleanly with zero Astro/TypeScript errors.
2. **SEO & Performance:** Perfect or near-perfect Lighthouse scores (Performance >95, Accessibility >95, Best Practices >95, SEO >95).
3. **Responsive Visual Quality:** Flawless rendering across standard mobile viewports (360px–420px), tablet (768px), and desktop (1280px+).
4. **Content Integrity:**
   * High-res Shelly Jigsaw screenshots and assets properly bundled.
   * Debut launch devlog article rendered and readable.
   * Privacy policy accessible and compliant.
   * Custom domain CNAME file present in `public/`.
