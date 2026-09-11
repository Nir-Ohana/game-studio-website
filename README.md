# Ohana Studios Website & Shelly Jigsaw Showcase

Official web portal and game showcase for **Ohana Studios** and its debut title **Shelly Jigsaw: Calm Puzzles**.

> **"Play Together, Win Together"**  
> We craft calm, thoughtful, and accessible games designed with heartfelt care for players of all ages.

Live Website: [https://ohana-studios.me](https://ohana-studios.me)

---

## 🌟 Project Overview

This repository hosts the official marketing website, developer journal, and privacy documentation for **Ohana Studios**, an independent game studio focused on mindful and multi-generational play experiences.

### Key Sections:
- **Studio Hero**: Introduces Ohana Studios, our core values, and our commitment to senior-friendly design and zero-pressure gameplay.
- **Game Spotlight — Shelly Jigsaw: Calm Puzzles**:
  - Interactive screenshot gallery featuring Adventure Journey, Piece Snapping & Board, Daily Puzzle, Victory Stars & Journal, Home & Levels, and Key Art.
  - Core design highlights: Forgiving magnetic snapping, 50+ accessibility (high contrast, extra-large touch targets), Daily & Storybook modes, and calm ad-free play.
  - Pre-registration / Coming Soon download badges for Google Play and the Apple App Store.
- **Studio Journal & Devlog**: High-density engineering articles, Godot 4 technical deep-dives, and accessibility design retrospectives powered by Astro Content Collections.
- **Privacy Policy (`/privacy`)**: App Store and Google Play compliant policy affirming zero data collection, zero analytics tracking, and 100% on-device sandboxed saves.
- **Studio Contact**: Community feedback form and direct studio communication channels (`hello@ohana-studios.me`).

---

## 🛠️ Technology Stack

| Technology | Role | Details |
| :--- | :--- | :--- |
| **[Astro 5](https://astro.build/)** | Web Framework | Ultra-fast Static Site Generation (SSG) with zero client-side JavaScript by default and Islands architecture. |
| **[Tailwind CSS 3](https://tailwindcss.com/)** | Styling Engine | Responsive design, modern dark palette (`#0B0F19`), glassmorphism, and `@tailwindcss/typography`. |
| **[TypeScript 5](https://www.typescriptlang.org/)** | Type Safety | Strict type checking and Zod schema validation across all Content Collections. |
| **[GitHub Pages](https://pages.github.com/)** | Hosting & CI/CD | Fully automated build and deployment pipeline via GitHub Actions (`deploy.yml`) on push to `main`. |

---

## 📁 Repository Structure

```text
game-studio-website/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment to GitHub Pages
├── public/
│   ├── CNAME                   # Custom domain declaration (ohana-studios.me)
│   ├── favicon.svg             # Studio logo favicon
│   └── images/
│       ├── games/
│       │   └── shelly-jigsaw/  # High-resolution screenshots and feature graphic
│       └── studio/
│           └── logo.svg        # Ohana Studios brand vector logo
├── src/
│   ├── components/             # Reusable Astro UI components
│   │   ├── BlogCard.astro      # Card component for journal articles
│   │   ├── ContactSection.astro# Studio contact form & email callout
│   │   ├── Footer.astro        # Global sticky footer with legal and social links
│   │   ├── GameSpotlight.astro # Interactive screenshot gallery & game features
│   │   ├── Header.astro        # Sticky navigation bar with mobile hamburger menu
│   │   └── Hero.astro          # Studio mission hero section
│   ├── content/
│   │   └── blog/               # Markdown devlog articles
│   │       └── 2026-09-11-introducing-shelly-jigsaw.md
│   ├── content.config.ts       # Astro 5 Content Collections loader & Zod schema
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Global HTML wrapper with SEO meta tags & fonts
│   │   └── BlogPostLayout.astro# Long-form article layout with reading progress bar
│   ├── pages/
│   │   ├── index.astro         # Homepage (Hero, Spotlight, Contact)
│   │   ├── privacy.astro       # App Store & Google Play Privacy Policy
│   │   └── blog/
│   │       ├── index.astro     # Devlog archive listing
│   │       └── [slug].astro    # Dynamic static routes for blog articles
│   └── styles/
│       └── global.css          # Global Tailwind directives and custom utility classes
├── astro.config.mjs            # Astro configuration (site URL & Tailwind integration)
├── package.json                # Project dependencies and npm scripts
├── tailwind.config.mjs         # Tailwind theme customizations and typography plugins
└── tsconfig.json               # TypeScript strict configuration
```

---

## 💻 Local Development

### Prerequisites
- **Node.js**: v18.17.0+ or v20.0.0+ (LTS recommended)
- **npm**: v9.0.0+

### Installation & Commands

```bash
# 1. Install all dependencies
npm install

# 2. Start the local development server (accessible at http://localhost:4321)
npm run dev

# 3. Type check project files (TypeScript and Content Collections)
npx astro check

# 4. Build static production site to dist/
npm run build

# 5. Preview production build locally (from dist/)
npm run preview
```

---

## 🌐 GoDaddy DNS Configuration Guide (`ohana-studios.me`)

To connect the custom domain `ohana-studios.me` purchased on GoDaddy to GitHub Pages, follow these step-by-step instructions.

### 1. GoDaddy DNS Management Setup

1. Log in to your **[GoDaddy Account](https://account.godaddy.com/)**.
2. Navigate to **Domain Portfolio** and locate `ohana-studios.me`.
3. Click the domain name, then select **DNS** (or **Manage DNS**).
4. Review existing records. **Delete or edit any default parked A records** pointing to GoDaddy parking servers (e.g., `34.102.136.180`).

### 2. Configure the 4 GitHub Pages Apex A Records

Create **four A records** pointing the root/apex domain (`@`) to GitHub Pages' global Anycast IP addresses:

| Type | Name | Value / Points to | TTL |
| :---: | :---: | :---: | :---: |
| **A** | `@` | `185.199.108.153` | `1 Hour` (or 600s / 1/2 hour) |
| **A** | `@` | `185.199.109.153` | `1 Hour` (or 600s / 1/2 hour) |
| **A** | `@` | `185.199.110.153` | `1 Hour` (or 600s / 1/2 hour) |
| **A** | `@` | `185.199.111.153` | `1 Hour` (or 600s / 1/2 hour) |

### 3. Configure the `www` Subdomain CNAME Record

Create **one CNAME record** to automatically redirect `www.ohana-studios.me` to your GitHub Pages host:

| Type | Name | Value / Points to | TTL |
| :---: | :---: | :---: | :---: |
| **CNAME** | `www` | `nir-ohana.github.io` | `1 Hour` (or 600s / 1/2 hour) |

> **Note**: Do not include `https://` in the CNAME target value. Enter only `nir-ohana.github.io`.

### 4. GitHub Repository Settings

1. In your GitHub repository (`Nir-Ohana/game-studio-website`), navigate to **Settings** > **Pages**.
2. Under **Build and deployment**:
   - **Source**: Select `GitHub Actions`.
3. Under **Custom domain**:
   - Enter `ohana-studios.me`.
   - Click **Save**.
4. GitHub Pages will initiate a DNS health check. DNS propagation typically takes 5 to 30 minutes (up to 24 hours in rare cases).
5. Once DNS check reports success:
   - Check the box for **Enforce HTTPS** (GitHub Pages automatically provisions a free Let's Encrypt TLS certificate).

### 5. Automated CNAME Preservation

The file `public/CNAME` is tracked in version control with the content:
```text
ohana-studios.me
```
When `npm run build` runs, Astro automatically copies `public/CNAME` into `dist/CNAME`. This ensures every deployment to GitHub Pages retains your custom domain configuration without resetting.

---

## ✍️ Writing & Publishing Blog Posts

The blog engine is powered by Astro 5's Content Collections API (`astro:content`) located in `src/content/blog/`.

### 1. Creating a New Post

Add a new Markdown file inside `src/content/blog/` using a descriptive date-prefixed filename:
```text
src/content/blog/YYYY-MM-DD-your-post-slug.md
```

### 2. Frontmatter Specification

Every article must include a YAML frontmatter block matching the schema defined in `src/content.config.ts`:

```yaml
---
title: "Article Headline Here"
description: "A compelling 1-2 sentence summary used for SEO metadata, Open Graph cards, and archive listings."
pubDate: 2026-09-11
author: "Nir Ohana"
image: "/images/games/shelly-jigsaw/feature-graphic.png"
tags: ["Shelly Jigsaw", "Devlog", "Godot Engine", "Game Design"]
draft: false
---
```

#### Field Details:
- **`title`** *(string, required)*: The post's title displayed in headers and browser title.
- **`description`** *(string, required)*: Brief description used for meta tags and preview cards.
- **`pubDate`** *(date `YYYY-MM-DD`, required)*: Publication date. Used for sorting posts chronologically.
- **`author`** *(string, optional)*: Author name. Defaults to `"Ohana Studios"`.
- **`image`** *(string, optional)*: Absolute path to the cover image within `public/` (e.g., `/images/...`).
- **`tags`** *(array of strings, optional)*: Category and topic pills. Defaults to `[]`.
- **`draft`** *(boolean, optional)*: Set to `true` while drafting. Defaults to `false`.

### 3. Markdown Features & Formatting

Posts support full standard Markdown and rich typography styling:
- **Headings (`##`, `###`)**: Automatically styled with generous margins and custom typography.
- **Code Blocks**: Formatted with syntax highlighting and dark background styling.
- **Images**: Reference local static assets placed in `public/images/` using root-relative paths:
  ```markdown
  ![Screenshot description](/images/games/shelly-jigsaw/04-puzzle-play.png)
  ```
- **Blockquotes**: Stylized with a sky-blue accent border.

### 4. Static Route Generation

Astro dynamically generates individual static pages using `src/pages/blog/[slug].astro`. For instance:
- `src/content/blog/2026-09-11-introducing-shelly-jigsaw.md`  
  compiles directly to:  
  `https://ohana-studios.me/blog/2026-09-11-introducing-shelly-jigsaw/`

### 5. Publishing to Production

Once ready to publish:
```bash
# Verify type safety and frontmatter integrity
npx astro check

# Build locally to verify static rendering
npm run build

# Commit and push to main
git add src/content/blog/
git commit -m "feat(blog): publish post on [topic]"
git push origin main
```
The GitHub Actions workflow (`deploy.yml`) will automatically trigger, build the website, and deploy the updated static files to GitHub Pages.

---

## 🔒 Privacy & Store Compliance

The Privacy Policy is maintained at `src/pages/privacy.astro` and deployed to `https://ohana-studios.me/privacy`. It complies fully with:
- **Apple App Store Review Guidelines** (Section 5.1.1 - Legal Data Collection & Storage).
- **Google Play Developer Policy Center** (User Data, Families Policy, and Privacy Policy transparency).
- **COPPA & GDPR-K** (Zero personal data collection from players of any age).

---

## 📬 Contact & Studio Info

- **Studio Name**: Ohana Studios
- **Email**: [hello@ohana-studios.me](mailto:hello@ohana-studios.me)
- **Flagship Game**: Shelly Jigsaw: Calm Puzzles
- **Website**: [https://ohana-studios.me](https://ohana-studios.me)
