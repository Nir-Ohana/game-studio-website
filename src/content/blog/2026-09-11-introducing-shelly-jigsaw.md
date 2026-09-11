---
title: "Introducing Shelly Jigsaw: Crafting a Calmer, Senior-Friendly Puzzle Experience"
description: "Discover why and how we built Shelly Jigsaw with Godot 4: custom jigsaw piece generation, forgiving snapping algorithms, zero ad pressure, and accessible design."
pubDate: 2026-09-11
author: "Nir Ohana"
image: "/images/games/shelly-jigsaw/feature-graphic.png"
tags: ["Shelly Jigsaw", "Devlog", "Godot Engine", "Game Design", "Accessibility"]
draft: false
---

For decades, jigsaw puzzles have been one of the world's most beloved pastimes. Gathering around a kitchen table, sipping a warm cup of tea, sorting edge pieces, and listening to the gentle *clack* of interlocking cardboard—it is a tactile ritual centered on patience, presence, and calm.

Yet when you open the mobile app stores today searching for digital jigsaw puzzles, the experience is almost unrecognizable. Flashing countdown timers tick down in neon red. Loud casino-style jackpot chimes blare after every minor move. Full-screen video ads interrupt mid-session, jarring you out of your flow. And worst of all for older players, the pieces and buttons are often tiny, finicky, and unforgiving.

At **Ohana Studios**, we asked ourselves: *What happened to the peace?*

Today, we are thrilled to unveil **Shelly Jigsaw: Calm Puzzles**, our debut game designed from the ground up to restore tranquility, thoughtful pacing, and multi-generational accessibility to digital puzzling.

![Shelly Jigsaw Showcase](/images/games/shelly-jigsaw/feature-graphic.png)

---

## Why We Built Shelly Jigsaw: Designed for Calm and 50+ Accessibility

Our studio motto is **Play Together, Win Together**. We believe that digital games should unite families rather than frustrate them, and that games targeting adults and seniors deserve world-class engineering and respectful design rather than exploitative monetization.

When conducting our earliest playtests with players aged 50 and older—including parents, grandparents, and casual puzzle enthusiasts—three major pain points consistently surfaced:

1. **Tiny, Frustrating Touch Targets**: Small buttons and rigid collision masks make picking up and maneuvering pieces a chore on phone screens, especially for players with reduced fine motor dexterity or arthritis.
2. **Artificial Urgency**: Timers and speed ratings induce unnecessary stress, penalizing thoughtful, deliberate problem-solving.
3. **Aggressive Interruptions**: Frequent video pop-ups shatter immersion and cognitive momentum.

We designed Shelly Jigsaw to solve every single one of these problems.

We enlarged every touch target beyond standard mobile guidelines (exceeding 48×48 dp), applied high-contrast color palettes, and paired every visual state with gentle, warm audio cues. Most importantly, we instituted a zero-pressure design mandate: **no countdown timers, no rush, and zero ad pop-ups during puzzle play**.

![Shelly Jigsaw Main Board Play](/images/games/shelly-jigsaw/04-puzzle-play.png)

---

## Under the Hood: Godot 4 Architecture & Technical Highlights

Shelly Jigsaw is built using **Godot Engine 4.7**. We chose Godot for its lightweight footprint, instantaneous cold-boot performance, and flexible 2D rendering pipeline. Here is a peek behind the curtain at the core systems that make the game feel so natural.

### 1. Procedural Jigsaw Generation & Bezier Interlocking Tabs
Traditional digital jigsaw puzzles often cut images using rigid geometric grids with repetitive pre-baked masks. In Shelly Jigsaw, our piece generator calculates dynamic cubic Bezier curves for interlocking tabs and blanks based on seedable parameters. 

Each piece feels organic, featuring subtle irregularities that give visual hints about where its neighbors lie, mirroring the craftsmanship of physical wooden dies.

### 2. Forgiving Multi-Tier Snapping Algorithm
One of the most frustrating aspects of mobile puzzling is placing a piece in virtually the right spot, only for the game to reject it because it was two pixels off.

We engineered a **two-phase magnetic snapping algorithm**:
- **Proximity Snapping**: When a dragged piece enters a generous radius around its target board coordinate, the engine applies a gentle ease-in tween, locking it securely into place with an acoustic haptic snap.
- **Cluster Merging**: When two neighboring pieces that connect to each other are brought close together—even off the target board in the staging tray—they link permanently into a single cohesive group. Players can assemble distinct clusters (like the sky or a bright red barn) before placing the entire group onto the board.

```gdscript
# Excerpt from our piece connection validation logic
func test_snap_candidate(piece: PuzzlePiece, target_pos: Vector2) -> bool:
    var distance: float = piece.global_position.distance_to(target_pos)
    if distance <= SNAP_TOLERANCE_PX:
        snap_to_anchor(piece, target_pos)
        AudioManager.play_sfx("piece_snap_soft")
        return true
    return false
```

### 3. Authoritative Session State & 100% Offline Scoring
Many modern mobile games require a continuous cellular or Wi-Fi connection just to verify game states or ping ad servers.

Shelly Jigsaw's core logic is managed by a standalone, deterministic `PuzzleSession` state machine. Everything from board layout, piece coordinates, tray sorting, and completed clusters serializes cleanly to local device storage. 

Whether you are on an airplane, in a remote mountain cabin, or relaxing on a subway commute, your game saves every single piece placement instantly and runs entirely offline.

---

## Our Core Design Principles

When we sit down to design any feature at Ohana Studios, we test it against three fundamental pillars:

### 1. No Timers Forcing Panic
Life has enough deadlines. You will never see a countdown clock ticking down to zero in Shelly Jigsaw. Take two minutes or two hours—the puzzle awaits your return exactly as you left it.

### 2. Three Free Hints Every Single Board
Everyone gets stuck sometimes, especially when working through complex color gradients. Rather than gating assistance behind paywalls or forcing players to watch a 30-second commercial, every puzzle board comes equipped with **3 free hints**. Tapping a hint gently highlights a candidate piece and illuminates its destination on the board.

### 3. Pure Aesthetic Comfort
From the soft wooden textures of the assembly board to our relaxing acoustic guitar and ambient piano soundtrack, every sensory detail has been tuned to lower heart rates and provide a soothing sanctuary from the noisy web.

![Shelly Jigsaw Completion Screen](/images/games/shelly-jigsaw/05-completion.png)

---

## What's Next: The Shelly Jigsaw Roadmap

We are just getting started on this journey. Here is a preview of what our team is actively building:

- **Daily Puzzle Streak Tracker**: A brand-new, hand-curated puzzle delivered each calendar morning. Complete each day's challenge to maintain your monthly streak calendar and collect special seasonal stamps.
- **Storybook Adventure Mode**: A whimsical journey following Shelly the wise sea turtle across coastal harbors, sunlit forests, and alpine peaks. Each chapter tells a gentle illustrated story as you complete themed jigsaw sets.
- **Custom Image Import (Tablet & Desktop)**: Allowing players to safely turn their family vacation photos and pet memories into custom playable jigsaws.

---

## Join Our Community

Shelly Jigsaw is being crafted with love, care, and continuous player feedback. If you or someone in your family loves puzzles, we would love to have you try our latest builds and share your thoughts.

- [Explore Shelly Jigsaw Features](/#game)
- [Send feedback or say hello](/#contact)
- Follow along on this blog for monthly technical deep-dives and design retrospectives!

*Thank you for supporting independent game craft.*
