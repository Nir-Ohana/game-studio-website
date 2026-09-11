# DESIGN.md — Ohana Studios Design System

> Design system specification for Ohana Studios web properties, based on the `awesome-design-md` and `taste-skill` frameworks, following Vercel Web Interface Guidelines.

---

## 1. Studio Identity & Design Read

- **Page Kind:** Indie Game Studio Landing & Flagship Showcase
- **Audience:** Intergenerational players (older adults 50+, parents, kids, cozy/indie game enthusiasts)
- **Vibe:** Calm Oceanic Sanctuary — soothing, warm, tactile, premium, deeply accessible
- **Anti-Default Discipline:**
  - Zero generic AI purple/violet gradients
  - Zero centered dark-mesh clichés with 3 identical cards
  - Zero tiny unreadable gray text or invisible hit targets
  - Zero jarring animations or frantic timers

---

## 2. Active Baseline Configuration (The Three Dials)

```yaml
DESIGN_VARIANCE: 8       # Asymmetric, editorial, organic card framing
MOTION_INTENSITY: 5      # Gentle undersea tides, smooth snaps, respects prefers-reduced-motion
VISUAL_DENSITY: 4        # Generous whitespace, breathable sanctuary feel
ACCESSIBILITY_PRIORITY: 10 # High contrast, WCAG AAA text targets, 44px+ touch sizes
```

---

## 3. Color Tokens

### Canvas & Surfaces (Deep Ocean Abyss)
- `bg-canvas`: `#060F17` (Deep benthic oceanic abyss)
- `bg-surface-elevated`: `#0B1926` (Subsea reef surface)
- `bg-surface-card`: `rgba(11, 25, 38, 0.85)` (Pearl-frosted subsea glass)
- `border-subtle`: `rgba(94, 234, 212, 0.12)` (Phosphorescent reef rim)
- `border-prominent`: `rgba(94, 234, 212, 0.28)`

### Accents & Signatures
- **Seafoam Mint (Primary Action):**
  - Base: `#2DD4BF` (Teal 400)
  - Bright: `#5EEAD4` (Teal 300)
  - Light Glow: `rgba(45, 212, 191, 0.15)`
- **Warm Shell & Sand Amber (Secondary Accent):**
  - Base: `#F59E0B` (Amber 500)
  - Glow: `#FBBF24` (Amber 400)
  - Badge Background: `rgba(245, 158, 11, 0.12)`
- **Coral Rose (Warmth Accent):**
  - `#FB7185` (Rose 400)

### Typography & Readability (Senior-Friendly Contrast)
- `text-primary`: `#F8FAFC` (Slate 50 — highest contrast, crisp against abyss)
- `text-secondary`: `#CBD5E1` (Slate 300 — legible body copy, no dim grays)
- `text-muted`: `#94A3B8` (Slate 400 — footnotes and metadata only)

---

## 4. Typography Hierarchy

- **Hero & Display Headings:**
  - Font: `Outfit`, system-ui fallback with letter-spacing `-0.025em`
  - Style: Bold/Extrabold with warm editorial presence, `text-wrap: balance`
- **Body & Sanctuary Copy:**
  - Font: `Inter` / system-ui, line-height `1.75` (relaxed), `text-wrap: pretty`
  - Minimum font size: `16px` on mobile, `18px` on desktop hero
- **Badges & Metadata:**
  - Font: `Outfit` uppercase, tracking `0.08em`, font-weight `700`, size `11px–13px`

---

## 5. Vercel Web Interface Guidelines Compliance

1. **Clear Focus Rings:**
   - Every interactive control has `:focus-visible` with `outline: none; ring: 2px; ring-color: #5EEAD4; ring-offset: 2px; ring-offset-color: #060F17`.
   - Never obscured by sticky headers or overflow containers.
2. **Hit Targets:**
   - Mobile buttons and interactive elements have minimum size `44px × 44px`.
   - Desktop targets are >= `32px`, with generous padding.
3. **Touch Manipulation:**
   - `touch-action: manipulation` applied to all interactive buttons, tabs, and links.
4. **Input Size:**
   - Inputs use `font-size: 16px` minimum to eliminate iOS auto-zoom shift.
5. **Reduced Motion:**
   - All floating animations and transitions respect `@media (prefers-reduced-motion: reduce)`.
6. **Text Balance & Flow:**
   - Headlines use `text-wrap: balance` to prevent awkward orphaned words.
   - Paragraphs use `text-wrap: pretty`.

---

## 6. Component Patterns

### Asymmetric Editorial Hero
- Left column (60%): High-impact headline, mission narrative, primary mint pill CTA + warm amber outline secondary button, tactile trust pill.
- Right column (40%): Artful organic showcase card featuring Shelly mascot, sunlit coral reef art, tactile wooden puzzle piece badges, and live progress indicators.

### Tactical Studio Pillars (Anti-Slop Layout)
- Instead of 3 identical box cards, use an asymmetric editorial 2-column feature breakdown:
  - Featured deep spotlight with large icon badge and rich narrative on older adult accessibility.
  - Paired companion cards highlighting Godot 4 craftsmanship and zero-pressure ad-free gameplay.

### Interactive Flagship Showcase (Shelly Jigsaw)
- Ocean pearl HUD with tabs, accessible keyboard arrow navigation (`ArrowLeft` / `ArrowRight`), tactile screenshot viewport, and instant caption synchronization.
