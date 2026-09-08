---
name: Mentalist Stream
description: The Mentalist'in 151 bölümünü Netflix-canon bir yayın kataloğunda hızlı ve dürüst biçimde keşfetme deneyimi.
colors:
  cinema-black: "#080808"
  catalog-black: "#141414"
  raised-charcoal: "#202020"
  soft-charcoal: "#2b2b2b"
  warm-white: "#f5f5f1"
  muted-silver: "#b3b3b3"
  quiet-gray: "#777777"
  netflix-red: "#e50914"
  match-green: "#46d369"
  browse-cyan: "#54b9c5"
  hairline: "rgba(255,255,255,.14)"
  action-white: "#ffffff"
typography:
  display:
    fontFamily: "Italiana, serif"
    fontSize: "clamp(3.8rem, 7vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.78
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Barlow, sans-serif"
    fontSize: "clamp(1.35rem, 2.25vw, 2.2rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Barlow, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.65rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Barlow, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Barlow, sans-serif"
    fontSize: ".78rem"
    fontWeight: 600
    lineHeight: 1
rounded:
  xs: ".2rem"
  sm: ".25rem"
  md: ".3rem"
  card: ".35rem"
  full: "50%"
spacing:
  rail-gap: ".38rem"
  compact: ".75rem"
  control-y: ".7rem"
  control-x: "1.45rem"
  page-x: "clamp(1.1rem, 4vw, 4.5rem)"
  header-height: "4.5rem"
  section: "2.5rem"
components:
  button-play:
    backgroundColor: "{colors.action-white}"
    textColor: "{colors.cinema-black}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: ".7rem 1.45rem"
    height: "3.2rem"
  button-info:
    backgroundColor: "rgba(109,109,110,.72)"
    textColor: "{colors.action-white}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: ".7rem 1.45rem"
    height: "3.2rem"
  episode-card:
    backgroundColor: "{colors.raised-charcoal}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.card}"
  season-select:
    backgroundColor: "#111111"
    textColor: "{colors.action-white}"
    typography: "{typography.label}"
    rounded: "{rounded.xs}"
    padding: ".65rem 2.4rem .65rem .8rem"
---

# Design System: Mentalist Stream

## Overview

**Creative North Star: "The Living Episode Shelf"**

Mentalist Stream follows the Netflix canon the user selected: a real episode still owns the first viewport, interface chrome recedes into black, and the catalog rises into view as horizontal shelves. The show remains the visual subject; the system exists to move a Turkish-speaking viewer from recognition to season choice to a specific episode with minimal friction.

The world is premium but pragmatic. Warm white copy, Netflix red branding, green availability metadata, and restrained gray controls sit over cinema-black surfaces. Episode imagery carries atmosphere while explicit source notes, missing-video states, HLS recovery, and adjacent-episode links keep the experience honest and operational across all 151 episode routes.

**Key Characteristics:**

- Full-bleed 16:9 episode imagery with layered black vignettes.
- A black, dense streaming catalog composed of horizontal episode rails.
- Warm white content, Netflix red identity, green match/episode metadata, and quiet gray support text.
- Barlow for fast interface reading; Italiana only for the series wordmark and oversized editorial numerals.
- Direct episode opening, season switching, previous/next navigation, and legal-source-aware player fallbacks.

## Colors

The palette is a compact streaming hierarchy: near-black rooms, warm-white content, red brand recognition, green status, and muted grays that let episode stills remain dominant.

### Primary

- **Netflix Red:** Brand wordmark, selection highlight, key inner-page accents, and brand-level emphasis.
- **Warm White:** Default text and the visual basis of the primary play action; it is slightly warmer than pure white to reduce glare on black.

### Secondary

- **Match Green:** Match percentage and episode-identifying metadata that signals positive availability or orientation.
- **Browse Cyan:** The quiet “Tüm bölümler” reveal in catalog row headings; use only for discovery links inside rails.

### Neutral

- **Cinema Black:** Player stage and deepest media background.
- **Catalog Black:** Default page and rail surface.
- **Raised Charcoal:** Hoverable or elevated dark surfaces and image placeholders.
- **Soft Charcoal:** Secondary navigation controls and compact utility surfaces.
- **Muted Silver:** Supporting copy, timestamps, source credits, and inactive information.
- **Quiet Gray:** Lowest-emphasis footer and localization notes.
- **Hairline:** Dividers that separate content without drawing boxes.
- **Action White:** Maximum-contrast focus outlines, play buttons, and text on dark overlays.

### Named Rules

**The Image Leads Rule.** Color supports real episode imagery; never flood a catalog row with decorative accent color.

**The Red Is Identity Rule.** Red marks the service identity and a few key accents. Ordinary episode metadata stays green or neutral.

## Typography

**Display Font:** Italiana (with serif fallback)
**Body Font:** Barlow (with sans-serif fallback)

**Character:** Barlow makes dense titles, summaries, durations, controls, and Turkish navigation quick to scan. Italiana supplies a narrow cinematic flourish for the series mark and oversized inner-page numerals without turning the streaming interface into an editorial theme.

### Hierarchy

- **Display** (400, fluid 3.8–6rem, 0.78 line-height): The stacked “The Mentalist” hero mark. Inner-page display headings may use a looser 0.9 line-height.
- **Headline** (700, fluid 1.35–2.2rem, 1.15 line-height): The hero proposition and player-state titles.
- **Title** (700, fluid 1.25–1.65rem, 1.2 line-height): Catalog row headings and page-level content groups.
- **Body** (400, 1rem, 1.5 line-height): Summaries, explanatory copy, and legal-source messaging; long watch-page copy stays within 70 characters.
- **Label** (600, approximately .74–.9rem): Episode codes, dates, durations, navigation, source notes, and controls. Uppercase/tracking belongs only to compact field labels such as the season selector.

### Named Rules

**The Streaming Voice Rule.** Barlow carries every task and content detail; Italiana appears only where a large cinematic identity moment justifies it.

## Layout

The home route opens with a full-width billboard up to 92svh and 55rem tall. Its content occupies at most 44rem or 52vw, sits on the left page inset, and is protected by horizontal, bottom, and top vignettes. The catalog overlaps the hero by 8rem on wide screens, visually turning the first episode shelf into the next action rather than a separate section.

All horizontal page insets use a fluid value from 1.1rem to 4.5rem. Rails use fixed-width 16:9 cards, a very tight .38rem gutter, native horizontal scrolling, proximity snapping, and optional edge controls. Season browse pages switch to a three-column image grid; watch pages place player information beside previous/next navigation and constrain descriptive text to 70ch.

At 900px, billboard content widens proportionally, the catalog overlap reduces, the episode grid becomes two columns, and watch information stacks. At 640px, the hero becomes bottom-aligned, copy is clamped, actions share the row, episode rails use 72vw cards, edge controls disappear, browse cards become one column, and episode navigation stacks vertically. Touch devices keep “Tüm bölümler” visible because hover cannot be assumed.

**The Fast Shelf Rule.** Preserve a wide episode thumbnail and its direct watch route at every viewport; mobile uses horizontal overflow instead of shrinking a rail into tiny cards.

## Elevation & Depth

Depth comes from photography, gradients, overlap, and small interaction lifts. The billboard uses directional vignettes to protect text and blend into the catalog. Episode imagery receives a soft grounding shadow, while cards lift and enlarge slightly on hover or keyboard focus. Utility surfaces remain flat.

### Shadow Vocabulary

- **Hero Text Legibility** (`0 3px 22px rgba(0,0,0,.65)` and `0 2px 12px rgba(0,0,0,.8)`): Keeps the series mark and summary readable over detailed stills.
- **Episode Grounding** (`0 .6rem 1.4rem rgba(0,0,0,.22)`): Separates 16:9 episode imagery from the catalog surface.

### Named Rules

**The Media Depth Rule.** Shadows and scale belong to media interaction; do not elevate ordinary text containers or legal notes.

## Shapes

The system uses gently rounded media and controls, not pill-heavy softness. Episode images use a compact .35rem radius; primary controls use .3rem; metadata chips use .2rem. Circles are reserved for icon-only controls and play affordances. The 13+ badge remains a simple outlined rectangle.

## Components

### Buttons

- **Shape:** Compact rounded rectangles with a minimum height near 3.2rem; icon-only controls may be circular.
- **Primary:** Pure-white fill, black text, bold Barlow label, play icon, and .7rem by 1.45rem padding.
- **Secondary:** Translucent gray fill with white text and an information icon.
- **Hover / Focus:** Primary white softens to 75% opacity; secondary gray becomes more transparent. All keyboard focus uses a 3px white outline with a 3px offset.

### Cards / Containers

- **Corner Style:** 16:9 imagery clipped to a .35rem radius; copy sits below rather than inside a heavy container.
- **Background:** Episode imagery or raised charcoal fallback over catalog black.
- **State:** Hover/focus lifts by .3rem and scales to 1.025; imagery darkens and zooms while a central circular play affordance appears.
- **Metadata:** Episode code overlays the lower-left of the image; title and duration share one compact line beneath it.

### Inputs / Fields

- **Style:** The season selector is a native dark select with a #666 border, compact .2rem corners, white text, and an uppercase tracked label above it.
- **Focus:** It inherits the global 3px white focus outline.

### Navigation

The fixed header uses a top-to-transparent black gradient, a red wordmark, compact Barlow links, and a circular browse control. On narrow screens, only the task-relevant “Bölümler” route remains in the text navigation; the browse icon stays available. Footer copy and links explicitly distinguish the fan interface from a publication service.

### Episode Rail

Rows expose a title, a contextual “Tüm bölümler” link, horizontally snapping 16:9 cards, and edge chevrons on hover-capable layouts. Rail buttons scroll by roughly 82% of the visible rail width. Touch layouts depend on native swiping and never hide the all-episodes route.

### Player State

The player fills the available width and uses CineSrc's documented embedded player controls so viewers can access the provider's complete settings surface, including quality, subtitles, audio tracks, playback speed, and playback settings when the source exposes them. The surrounding page owns loading and recoverable error states, while watch details below the player provide season return, source credit, localization note, and previous/next episode navigation.

## Do's and Don'ts

### Do:

- **Do** let a real episode still dominate the first viewport and every episode card when available.
- **Do** keep catalog navigation fast through direct card links, horizontal snapping, season selection, and previous/next routes.
- **Do** preserve explicit focus outlines, reduced-motion handling, and touch-visible navigation.
- **Do** distinguish Turkish interface copy from source-language episode titles and summaries with a clear localization note.
- **Do** show a recoverable, legal-source-aware state when MP4 or HLS playback is absent or fails.

### Don't:

- **Don't** reintroduce the discarded abstract case-file, navy-and-brass, clipped-deck visual world.
- **Don't** replace episode stills with generic posters, ornamental diagrams, or editorial cards when real episode media exists.
- **Don't** hide essential navigation behind hover on touch devices.
- **Don't** imply that all 151 episodes are hosted or licensed; catalog completeness and video availability are separate facts.
- **Don't** add oversized radii, pills, bright gradients, or decorative shadows that weaken the Netflix-canon silhouette.


### Image delivery

Episode rails and season grids use the original TVmaze still, falling back to the medium image only when the original is missing. Next Image serves responsive variants at quality 85; the billboard uses quality 90 and accounts for cover-cropping on narrow screens in its sizes hint. Card crops anchor at center 30% to retain faces; the mobile billboard anchors at 72% top to keep Patrick Jane in view. Preserve natural image color rather than applying a global desaturation filter. The image audit in `.impeccable/review/image-audit.json` records source dimensions for all 151 episodes; 19 originals are narrower than 800 pixels, so their source detail remains limited.
