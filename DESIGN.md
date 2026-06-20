---
name: Fremont Chinese School
description: Warm, rooted, editorial identity site for a 50-year WASC-accredited weekend Chinese school
colors:
  fcs-green: "#3A7D44"
  fcs-green-dark: "#2D6235"
  fcs-green-light: "#F0F7F2"
  fcs-green-deep: "#1A3D22"
  fcs-orange: "#E06820"
  fcs-orange-deep: "#C85A10"
  fcs-orange-light: "#FEF0E6"
  fcs-gold: "#D4980A"
  fcs-black: "#1C1208"
  fcs-white: "#FFF8F0"
  fcs-border: "#E8DDD0"
  fcs-muted: "#7A6A58"
typography:
  display-en:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(3rem, 6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  display-zh:
    fontFamily: "'Noto Serif TC', serif"
    fontSize: "clamp(3rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  eyebrow:
    fontFamily: "Inter, sans-serif"
    fontSize: "10px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.18em"
rounded:
  xs: "6px"
  sm: "8px"
  md: "10px"
  lg: "12px"
  pill: "100px"
spacing:
  gutter: "16px"
  gap: "24px"
  section: "112px"
components:
  button-primary:
    backgroundColor: "{colors.fcs-orange}"
    textColor: "{colors.fcs-white}"
    rounded: "{rounded.xs}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.fcs-orange-deep}"
    textColor: "{colors.fcs-white}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.fcs-white}"
    rounded: "{rounded.xs}"
    padding: "12px 24px"
  nav-link:
    textColor: "{colors.fcs-white}"
    typography: "{typography.eyebrow}"
    padding: "8px 12px"
  card:
    backgroundColor: "{colors.fcs-white}"
    textColor: "{colors.fcs-black}"
    rounded: "{rounded.md}"
    padding: "28px"
---

# Design System: Fremont Chinese School

## 1. Overview

**Creative North Star: "The Modern Heritage House"**

A fifty-year institution that has been tastefully renovated. The bones are old and proud —
a WASC-accredited school running since 1972 — but the surfaces are current, composed, and
confident. The palette is warm and rooted: forest green and harvest gold over a warm cream
field, with harvest-orange reserved for the moments that ask for action. Traditional Chinese
is set in **Noto Serif TC**, a literary serif that signals heritage and gravity; English and
all UI runs in **Inter**, which keeps the structure modern and clean. The two together are the
whole idea: heritage and modernity in one composed room.

The mood is **warm but editorial**. Headings are large, extrabold, and tightly tracked
(-0.03em); sections are generously spaced and separated by tonal background bands (cream → mint
→ deep green → orange) rather than by chrome. Corners are sharp and structured (6–12px, never
pills); surfaces are flat and bordered, not shadowed. The result reads as a confident,
contemporary institution — not a tech product, not a daycare, not a bureaucracy.

This system explicitly rejects the four things PRODUCT.md names: the **dated, cluttered Joomla**
site it replaces; **cold corporate / SaaS** clichés (gradient-soaked hero-metric templates,
soulless grids); anything **childish or cartoonish** (over-bright primaries, clip-art); and
**stuffy, institutional** dryness. Warmth tempers the credibility; the serif-Chinese type
carries the heritage; Inter keeps it from ever feeling old.

**Key Characteristics:**
- Earthy, rooted palette: forest green + harvest gold + warm cream, with orange as the action color.
- Bilingual type as identity: Noto Serif TC (中文, literary serif) paired with Inter (EN + all UI).
- Editorial headings: extrabold, large (up to ~4.5rem), tightly tracked (-0.03em).
- Sharp, structured geometry: 6–12px radii, flat bordered surfaces, tonal section bands.
- A gold eyebrow + pill badges as the deliberate accent system.
- Global gold focus-visible ring; reveals and parallax degrade under reduced-motion.

## 2. Colors

A warm, earthy field: forest greens and harvest gold over cream, with a single harvest-orange
saved for action. This is a committed, identity-driven palette — the warmth is the brand, not a
default tint.

### Primary
- **Forest Green** (`#3A7D44`): The core brand color. Owns the sticky header, primary links,
  card link-labels, and the green top-rule on feature cards. Confident and rooted.
- **Pine Green Dark** (`#2D6235`): The deeper green for the facts strip, hover states, and
  get-started card titles. Use where green text or fills must hold contrast.
- **Mint Wash** (`#F0F7F2`): The lightest green, for icon tiles and the soft mint→cream
  gradient under the get-started band.
- **Deep Forest** (`#1A3D22`): The darkest green, used as the full-bleed background of the
  culture section. A rich, immersive band.

### Secondary
- **Harvest Orange** (`#E06820`): The action color. Primary CTAs and the Enroll button; the
  closing CTA band runs an orange gradient. Rare and purposeful — its scarcity is what makes it
  read as "do this." Deepens to **Burnt Orange** (`#C85A10`) on hover.
- **Orange Wash** (`#FEF0E6`): Tints for orange badges / soft highlights.

### Tertiary
- **Harvest Gold** (`#D4980A`): The accent. Eyebrows, footer section headers, culture-section
  labels, and the global focus-visible ring. Heritage shimmer, used in small doses.

### Neutral
- **Warm Black** (`#1C1208`): Body text and the footer base. A warm near-black, never pure
  `#000` — it belongs to this palette's brown-green warmth.
- **Cream** (`#FFF8F0`): The signature surface and the body background. The warmth of the whole
  system lives here. (Committed brand identity — not a default warm tint.)
- **Warm Border** (`#E8DDD0`): 1px hairline strokes on cards and dividers; deepens to ~`#C8B89A`
  on hover. Structure without shadow.
- **Warm Muted** (`#7A6A58`): Secondary and supporting copy (subtitles, captions). **Watch
  contrast** — see the rules below.

### Named Rules
**The Orange-Is-Action Rule.** Harvest orange means "take this action." It is never decorative
and never a background wash outside the CTA band. If orange appears, it is asking for a click.

**The Warm-Black Rule.** All dark text and dark surfaces use Warm Black (`#1C1208`), never pure
black. Pure black is cold and breaks the palette's warmth.

**The Muted-Is-Secondary Rule.** Warm Muted (`#7A6A58`) is for secondary text only and sits near
the AA floor on cream — primary body copy uses Warm Black. Verify any muted text ≥4.5:1 (≥3:1 if
large) before shipping it as body.

## 3. Typography

**Display / Body Font (English + UI):** Inter (with system sans fallback)
**Display Font (Traditional Chinese):** Noto Serif TC (literary serif), applied automatically to
any `[lang|="zh"]` subtree
**Accent Font:** none distinct — the eyebrow and badges are Inter at small sizes

**Character:** A deliberate cross-script pairing on a true contrast axis: a modern geometric-ish
sans (Inter) for English and structure, a literary serif (Noto Serif TC) for Chinese heritage and
gravity. They are *meant* to differ — that contrast is the brand. Body is set at 15px / 1.7 for
calm, readable long-form.

### Hierarchy
- **Display (EN)** (Inter 800, clamp 3→4.5rem, line-height ~1.05, -0.03em): Hero `h1`. The loudest
  voice; white over the photo hero.
- **Display (ZH)** (Noto Serif TC 700, same scale): The Chinese counterpart of any display heading.
- **Headline** (Inter 700, clamp 2.25→3rem, -0.03em): Section `h2`s. Use `text-wrap: balance`.
- **Title** (Inter 600, 1.25rem): Card / feature `h3`s (green-dark or warm-black).
- **Body** (Inter 400, 15px, line-height 1.7): Paragraph copy in Warm Black; cap measure 65–75ch.
- **Eyebrow** (Inter 600, 10px, +0.18em, UPPERCASE, gold): The deliberate section kicker / labels.
- **Nav** (Inter 600, 11–12px, uppercase, wide tracking): Header and footer navigation.

### Named Rules
**The Two-Script Rule.** Chinese is always Noto Serif TC; English/UI is always Inter. Never set
Chinese in Inter or English in the serif — the script *is* the cue for which face to use.

**The Eyebrow-Restraint Rule.** The gold eyebrow is a deliberate accent, not a per-section reflex.
Use it where a section genuinely needs a kicker; do not stamp one above every section, or it stops
being brand voice and becomes scaffolding. *(Currently appears on multiple sections — prune to the
ones that earn it.)*

## 4. Elevation

**Flat as built; gently layered is the target.** Today the system is essentially flat: surfaces are
cream or tonal bands, structure comes from 1px warm borders and background-color changes, and the
only shadow in play is the sticky header's `shadow-md` once scrolled. Hover states change border
color, not elevation.

**Recommended direction:** introduce a *soft, warm* resting/hover shadow on cards and primary CTAs
to add gentle depth without losing the editorial flatness — diffuse, low-opacity, warm-black-tinted
(never neutral black). This makes interactive surfaces feel alive while staying on-brand.

### Shadow Vocabulary (recommended)
- **Resting** (`box-shadow: 0 1px 2px rgba(28,18,8,0.05)`): Barely-there warmth on cards.
- **Hover lift** (`box-shadow: 0 10px 24px rgba(28,18,8,0.10)`, `translateY(-2px)`): Cards/CTAs on hover.
- **Header condensed** (`shadow-md` + `backdrop-blur`): Sticky header once scrolled (already built).

### Named Rules
**The Warm-Shadow Rule.** If shadows are added, they are tinted with Warm Black (`rgba(28,18,8,…)`),
diffuse, and low-opacity. Crisp or neutral-black shadows are forbidden — they break the warmth.

## 5. Components

### Buttons
- **Shape:** Sharp, structured — 6px radius (`rounded-[6px]`). Never pills for actions.
- **Primary:** Harvest Orange fill, cream label, `12px 24px`. The single most important action.
  Hover: deepens to Burnt Orange (`#C85A10`). On the orange CTA band it inverts — cream fill, orange label.
- **Outline:** Transparent with a `white/70` border and white label; the secondary CTA on photo /
  dark bands. Hover: subtle `white/10` fill.
- **Focus:** All interactives inherit the global 2px gold focus-visible ring (`#D4980A`, 2px offset).

### Cards / Containers
- **Corner Style:** 6–12px (`rounded-[6px]`→`[12px]`). Feature cards 10px; media 12px; chips 8px.
- **Background:** Cream (`#FFF8F0`) on light bands; translucent white on the deep-green culture band.
- **Border:** 1px Warm Border (`#E8DDD0`), deepening to ~`#C8B89A` on hover.
- **Feature-card top-rule:** a 5px Forest Green top border is the *one deliberate stripe* in the
  system. Do not propagate colored side/edge stripes to other cards (see Don'ts).
- **Shadow Strategy:** flat today; soft warm hover shadow recommended (see Elevation).
- **Internal Padding:** 16–28px.

### Eyebrow & Badges
- **Eyebrow:** `.eyebrow` — 10px, 600, +0.18em, uppercase, gold. The deliberate section kicker.
- **Badges:** pill (`100px`) tints in four roles — `badge-green` `#D6EDD9`/`#1E4D25`,
  `badge-orange` `#FEF0E6`/`#7A3200`, `badge-gold` `#FEF3DC`/`#7A5500`, `badge-dark`
  `#1C1208`/`#FFF8F0`. Small (10px), used for status/category tags.

### Navigation
- **Style:** Sticky header on Forest Green, fixed 72px; white inverted logo; condenses with shadow
  + backdrop-blur on scroll.
- **Links:** 11–12px Inter 600, **uppercase, wide tracking**, white; active link is cream with an
  underline (offset 4px) and `aria-current="page"`.
- **Mobile:** Native `<details>` disclosure toggle.
- **Footer:** Dark gradient (`#1C1208`→`#0D0A04`); gold uppercase section headers; cream/65% links
  that brighten to cream/100% on hover.

### Inputs / Fields
- No first-party form fields yet (enroll/payment live on external systems). When added: cream
  surface, 1px Warm Border, 6–8px radius, gold focus ring, Warm Black text, AA contrast.

### Signature Component — Calligraphy Splash
- The homepage brush-paints `費利蒙中文學校` stroke-by-stroke, then resolves into the header logo.
  Progressively enhanced; fully skipped under `prefers-reduced-motion`. The purest expression of
  "heritage with a light touch." Must never block or delay content.

## 6. Do's and Don'ts

### Do:
- **Do** treat orange as action only — rare, purposeful, never decorative (the Orange-Is-Action Rule).
- **Do** set Chinese in Noto Serif TC and English/UI in Inter, always (the Two-Script Rule).
- **Do** use Warm Black (`#1C1208`) for primary body copy; reserve Warm Muted for secondary text.
- **Do** verify orange-on-white/cream and muted-on-cream hit AA (4.5:1 small, 3:1 large) before shipping.
- **Do** separate sections with tonal background bands (cream → mint → deep green → orange) for rhythm.
- **Do** test every heading and CTA in **both** EN (Inter) and 中文 (Noto Serif TC) at every breakpoint.
- **Do** keep the gold eyebrow deliberate — only where a section earns a kicker (the Eyebrow-Restraint Rule).
- **Do** give every animation a `prefers-reduced-motion` fallback to static, visible content.

### Don't:
- **Don't** rebuild the **dated, cluttered Joomla** feel — no dense text walls or busy chrome.
- **Don't** drift toward **cold corporate / SaaS** clichés: gradient hero-metric templates, soulless grids.
- **Don't** go **childish or cartoonish** — no over-bright primaries, clip-art, or daycare energy.
- **Don't** go **stuffy / institutional** — the serif-Chinese + warm palette must stay inviting, not dry.
- **Don't** stamp the gold eyebrow above every section — that's AI scaffolding, not voice.
- **Don't** add colored side/edge stripes to cards beyond the one deliberate green top-rule on feature cards.
- **Don't** use pure black (`#000`) for text or shadows — Warm Black only (the Warm-Black Rule).
- **Don't** use pills for buttons — geometry is sharp and structured (6px).
- **Don't** set orange as a background wash outside the CTA band, or its action meaning erodes.
