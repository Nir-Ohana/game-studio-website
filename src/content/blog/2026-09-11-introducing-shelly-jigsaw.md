---
title: "Building Shelly Jigsaw: Crafting A Calm Mobile Puzzle Experience"
description: "How we built a cozy jigsaw game: Bezier interlocking tabs, magnetic piece snapping, and deterministic offline session state."
pubDate: 2026-09-11
author: "Nir Ohana"
image: "/images/games/shelly-jigsaw/feature-graphic.png"
tags: ["Game Design", "Shelly Jigsaw", "Devlog", "Architecture"]
draft: false
---

Most digital jigsaw games on mobile app stores are crowded with flashing countdown clocks, casino chimes, and full-screen video ads. For older players, tiny buttons and rigid touch targets make placing pieces frustrating.

We built **Shelly Jigsaw: Calm Puzzles** with a simple mandate: restore quiet concentration, multi-generational accessibility, and tactile satisfaction to digital puzzling.

![Shelly Jigsaw Showcase](/images/games/shelly-jigsaw/feature-graphic.png)

---

## Core Technical Decisions

Shelly Jigsaw is built from the ground up for mobile with custom rendering and tactile physics. Here are the three technical pillars behind the feel of the game:

### 1. Procedural Bezier Interlocking Tabs

Rather than pre-baking rigid geometric masks, our jigsaw generator builds organic cubic Bezier curves for interlocking tabs and blanks from a seedable configuration. Each cut features subtle irregularities that mirror physical cardboard and wooden dies, providing subtle visual hints for matching neighbors.

### 2. Generous Magnetic Snapping

Imprecise touch screens can make mobile jigsaws frustrating when a piece is rejected for being a couple of pixels off.

We implemented a two-phase snapping model:
- **Proximity Snap**: When a dragged piece enters the target anchor radius, it eases into place with a subtle audio snap.
- **Cluster Merging**: Neighboring pieces that belong together link permanently even when connected inside the staging tray, letting players assemble skies or borders before moving the cluster onto the board.

```gdscript
func test_snap_candidate(piece: PuzzlePiece, target_pos: Vector2) -> bool:
    var distance: float = piece.global_position.distance_to(target_pos)
    if distance <= SNAP_TOLERANCE_PX:
        snap_to_anchor(piece, target_pos)
        SfxPlayer.play(&"piece_snap_soft")
        return true
    return false
```

![Shelly Jigsaw Gameplay Board](/images/games/shelly-jigsaw/02-gameplay.png)

### 3. Deterministic Local State & 100% Offline Play

Puzzle state is owned by a standalone `PuzzleSession` resource. Board layout, tray order, connected piece clusters, and elapsed time serialize directly to local device storage. The game requires zero network connection and has zero tracking servers.

---

## Accessibility & Player Ergonomics

We tested early builds with players aged 50 and older. Key findings shaped our design system:

- **Touch Targets**: All primary buttons exceed 56×56 dp with high-contrast borders.
- **Zero Timers**: No countdowns or speed penalties. Players can pause for ten seconds or ten days without losing state.
- **Always-Free Assistance**: Every puzzle includes 3 free hints to highlight matching pieces without paywalls or ads.

![Shelly Jigsaw Completion Screen](/images/games/shelly-jigsaw/03-completion.png)

---

## What's Next

We are actively polishing our release build for Android and iOS:
- Daily date-seeded challenges with a local streak calendar
- Multi-chapter Adventure mode following Shelly across coastal harbors and reef ecosystems
- Additional piece-count tiers (16, 36, 64, and 100 pieces)

If you'd like to test early builds or share feedback, visit our [home page](/) or reach out via [contact](/contact).
