---
name: Fremont Chinese School
description: Warm, rooted, editorial identity site for a 50-year WASC-accredited weekend Chinese school — Jade & Gold on paper
colors:
  # NOTE: a few CSS tokens keep legacy NAMES that now hold different roles:
  #   --color-fcs-orange*  -> gold (CTA)        --color-fcs-gold-ink -> deep jade (accent text on light)
  # Listed here by their true role; the token alias is noted in parentheses.
  fcs-green: "#1A6E52"        # Jade — primary (header, links, structure)
  fcs-green-dark: "#134B38"   # Jade dark — bands, deep fills
  fcs-green-light: "#E6F3EE"  # Jade tint — icon tiles, badges, soft bands
  fcs-gold: "#D8A832"         # Gold — CTA button fills, focus ring, NEW badge (alias --color-fcs-orange)
  fcs-gold-deep: "#B07F1E"    # Gold hover/active (--color-fcs-orange-deep)
  fcs-gold-tint: "#F6ECCF"    # Soft gold wash — callouts (--color-fcs-orange-light)
  fcs-mint: "#6FC9A0"         # Light mint — accent TEXT on DARK green bands (AA 5:1) (--color-fcs-mint)
  fcs-jade-ink: "#0E5038"     # Deep jade — accent TEXT on LIGHT surfaces (AA 7.8:1) (token: --color-fcs-gold-ink)
  fcs-black: "#221F1A"        # Ink
  fcs-white: "#ECE6D6"        # Paper — body background + card surface
  fcs-surface: "#F7F3E9"      # Lighter surface — raised cards, table zebra
  fcs-border: "#D9D0C0"       # Warm hairline border
  fcs-muted: "#57534A"        # Ink-soft — secondary text
gradients:
  gold-fill: "linear-gradient(135deg, #E6BC4E 0%, #D8A832 50%, #C28F22 100%)"  # button metal
  culture-band: "#0F2E22"
  closing-cta: "linear-gradient(135deg, #221F1A 0%, #134B38 55%, #1A6E52 100%)"
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
    color: "{colors.fcs-jade-ink}"   # deep jade on light; light mint on dark bands
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
  button-primary:                      # .btn-primary / .btn-on-dark
    background: "{gradients.gold-fill}"
    textColor: "{colors.fcs-black}"    # ink on gold (never white-on-gold; it fails AA)
    rounded: "{rounded.xs}"
    padding: "12px 24px"
    hover: "darken via filter brightness(0.94) + specular sheen sweep"
    shimmer: ".btn-shimmer adds a passive sheen loop (marquee Enroll CTAs only)"
  button-outline:
    background: "transparent"
    textColor: "{colors.fcs-white}"    # on photo / dark bands only
    border: "1px solid rgba(255,255,255,0.7)"
    rounded: "{rounded.xs}"
    padding: "12px 24px"
  nav-link:
    textColor: "#FFFFFF"
    typography: "{typography.eyebrow}"
    padding: "8px 12px"
  card:
    background: "{colors.fcs-white}"
    textColor: "{colors.fcs-black}"
    border: "1px solid {colors.fcs-border}"
    rounded: "{rounded.md}"
    padding: "28px"
---

# Design System: Fremont Chinese School

> **Palette: Jade & Gold on paper.** Evolved from a celadon experiment to a
> jade green, keeping gold as the CTA color. The accent *text* is green (deep
> jade on light, light mint on dark) — gold is reserved for buttons/focus.
> Some CSS tokens keep legacy names: `--color-fcs-orange*` hold the gold, and
> `--color-fcs-gold-ink` holds deep jade. Machine sidecar: `.impeccable/design.json`.

## 1. Overview

**Creative North Star: "The Modern Heritage House"**

A fifty-year institution that has been tastefully renovated. The bones are old and proud —
a WASC-accredited school running since 1972 — but the surfaces are current, composed, and
confident. The palette is **jade green and gold over a warm paper field**: a jade green carries
the structure, gold is the one warm voice that asks for action (CTAs), and the body is a warm
paper that reads as ink-on-paper rather than a generic near-white. Traditional Chinese is set in
**Noto Serif TC**, a literary serif that signals heritage and gravity; English and all UI runs in
**Inter**, which keeps the structure modern and clean. The two together are the whole idea:
heritage and modernity in one composed room.

The mood is **warm but editorial**. Headings are large, extrabold, and tightly tracked
(-0.03em); sections are generously spaced and separated by tonal background bands (paper → mint
→ deep jade → jade) rather than by chrome. Corners are sharp and structured (6–12px, never
pills); surfaces are flat and bordered, not shadowed. Gold is the one place the system raises its
voice — a metallic CTA fill with a quiet sheen. The result reads as a confident, contemporary
institution — not a tech product, not a daycare, not a bureaucracy.

This system explicitly rejects the four things PRODUCT.md names: the **dated, cluttered Joomla**
site it replaces; **cold corporate / SaaS** clichés (gradient-soaked hero-metric templates,
soulless grids); anything **childish or cartoonish** (over-bright primaries, clip-art); and
**stuffy, institutional** dryness. The jade + gold + paper carries warmth and credibility; the
serif-Chinese type carries the heritage; Inter keeps it from ever feeling old.

**Key Characteristics:**
- Earthy, rooted palette: jade green + gold over warm paper. Gold is the CTA; green accents do the labelling.
- Bilingual type as identity: Noto Serif TC (中文, literary serif) paired with Inter (EN + all UI).
- Editorial headings: extrabold, large (up to ~4.5rem), tightly tracked (-0.03em).
- Sharp, structured geometry: 6–12px radii, flat bordered surfaces, tonal section bands.
- Gold-fill CTAs with a specular sheen; jade/mint accent text; pill badges as the badge system.
- Global gold focus-visible ring; all motion (sheen, reveals, parallax, splash) degrades under reduced-motion.

## 2. Colors

A warm, earthy field: jade greens over warm paper, with gold as the CTA color and green (deep
jade / light mint) as the accent-text color. This is a committed, identity-driven palette — the
warmth is the brand, not a default tint.

### Primary — Greens
- **Jade** (`#1A6E52`): The core brand color. Sticky header, primary links, card link-labels,
  the feature-card top-rule, section accents. Dark enough to pass AA as small link text on paper.
- **Jade Dark** (`#134B38`): The deeper green for the facts strip, deep bands, and where green
  fills must hold contrast against white text.
- **Jade Tint** (`#E6F3EE`): The lightest green — icon tiles, green badges, soft mint→paper gradient.
- **Culture band** (`#0F2E22`): A near-black jade used full-bleed behind the culture section.

### CTA — Gold
Gold is the **action** color, used for interactive emphasis only — never as accent label text.
- **Gold** (`#D8A832`): CTA **button fills** (metallic gradient `#E6BC4E → #D8A832 → #C28F22`
  with **ink text** — gold is light, so white-on-gold fails AA), the global **focus ring**, and
  the "NEW" badge. Deepens to **Gold Deep** (`#B07F1E`) on hover.
- **Gold Tint** (`#F6ECCF`): Soft wash for callouts (`--color-fcs-orange-light`).

### Accent text — Green (two shades, by surface)
Accent labels are green, never gold. The shade depends on the surface luminance:
- **Deep Jade** (`#0E5038`, token `--color-fcs-gold-ink`): accent text on **light** surfaces —
  the `.eyebrow`, electives prices, enroll key-dates, warning icons (AA 7.8:1 on paper).
- **Light Mint** (`#6FC9A0`, `--color-fcs-mint`): accent text on **dark** green bands — facts-strip
  labels, culture kickers/labels/links, footer section headers, mobile Enroll (AA 5:1 on jade-dark).

### Neutral
- **Ink** (`#221F1A`): Body text, the footer base, and ink-on-gold button text. A warm near-black,
  never pure `#000`.
- **Paper** (`#ECE6D6`): The signature surface and body background. Warm, low-chroma — the ink/
  calligraphy concept earns it; it is a committed brand choice, not a default warm tint.
- **Surface** (`#F7F3E9`): A lighter raised surface — alternate cards, the calendar zebra stripe.
- **Warm Border** (`#D9D0C0`): 1px hairline strokes; deepens to ~`#C8B89A` on hover.
- **Ink-Soft** (`#57534A`): Secondary / supporting copy. Passes AA on paper (6.1:1) as body.

### Named Rules
**The Gold-Is-CTA Rule.** Gold = interactive action (button fills, focus ring, "NEW"). It is not
used as accent label text. A gold fill is always paired with **ink text**, never white.

**The Green-Accent-Text Rule.** Accent/label text is green: **deep jade `#0E5038`** on light
surfaces, **light mint `#6FC9A0`** on dark green bands. Do *not* use a mid/bright jade (e.g.
`#3DA17C`) as small text on a dark green band — it fails AA (3.15:1). The accent must be light
enough (mint) on dark, dark enough (deep jade) on light.

**The Paper-Is-The-Field Rule.** Paper (`#ECE6D6`) is the ground; greens and ink are the figure.
Color carries through accents, bands, and imagery — not by tinting the body warmer.

**The Warm-Black Rule.** All dark text/surfaces use Ink (`#221F1A`), never pure `#000`.

**The No-Stray-Blue Rule.** Blue is not in the palette. The only blues allowed are external brand
marks (Facebook `#1877F2`, Google Calendar `#4285F4`). Everything else is jade/gold/ink.

## 3. Typography

**Display / Body Font (English + UI):** Inter (with system sans fallback)
**Display Font (Traditional Chinese):** Noto Serif TC (literary serif), applied automatically to
any `[lang|="zh"]` subtree
**Loading:** preconnect to `fonts.googleapis.com` + `fonts.gstatic.com` and a `<link>` stylesheet
with `display=swap` in `<head>` — *not* a render-blocking CSS `@import`.

**Character:** A deliberate cross-script pairing on a true contrast axis: a modern geometric-ish
sans (Inter) for English and structure, a literary serif (Noto Serif TC) for Chinese heritage and
gravity. They are *meant* to differ — that contrast is the brand. Body is set at 15px / 1.7 for
calm, readable long-form.

### Hierarchy
- **Display (EN)** (Inter 800, clamp 3→4.5rem, line-height ~1.05, -0.03em): Hero `h1`, white over the photo hero.
- **Display (ZH)** (Noto Serif TC 700, same scale): The Chinese counterpart of any display heading.
- **Headline** (Inter 700, clamp 2.25→3rem, -0.03em): Section `h2`s. Use `text-wrap: balance`.
- **Title** (Inter 600, 1.25rem): Card / feature `h3`s (jade-dark or ink).
- **Body** (Inter 400, 15px, line-height 1.7): Paragraph copy in Ink; cap measure 65–75ch.
- **Eyebrow** (Inter 600, 10px, +0.18em, UPPERCASE): Deep jade on light, light mint on dark bands.
- **Nav** (Inter 600, 11–12px, uppercase, wide tracking): Header and footer navigation.

### Named Rules
**The Two-Script Rule.** Chinese is always Noto Serif TC; English/UI is always Inter. The script
*is* the cue for which face to use.

**The Eyebrow-Restraint Rule** *(enforced).* The eyebrow is a deliberate kicker, not a per-section
reflex. It appears in **exactly two** places: the homepage features and culture section headers.
Interior pages do **not** carry a header eyebrow — the `<h1>` and nav already orient the reader.
Do not reintroduce a kicker above every page heading; that's AI scaffolding, not voice.

## 4. Elevation

**Flat as built; gently layered is the target.** Surfaces are paper or tonal bands; structure comes
from 1px warm borders and background-color changes. The only shadow in play is the sticky header's
`shadow-md` once scrolled. Card hover changes border color, not elevation. (The gold CTAs carry a
sheen, not a shadow.)

**Recommended direction:** a *soft, warm* resting/hover shadow on cards could add gentle depth —
diffuse, low-opacity, ink-tinted (`rgba(34,31,26,…)`), never neutral black.

### Named Rules
**The Warm-Shadow Rule.** If shadows are added, they are tinted with Ink (`rgba(34,31,26,…)`),
diffuse, and low-opacity. Crisp or neutral-black shadows are forbidden.

## 5. Components

### Buttons — `.btn-primary` / `.btn-on-dark`
- **Shape:** Sharp — 6px radius. Never pills for actions.
- **Fill:** A metallic **gold gradient** (`#E6BC4E → #D8A832 → #C28F22`) with **ink text**
  (~7.5:1). Works on light surfaces and on dark green bands alike. No border (a thin border read
  as timid; the gold fill carries it).
- **Hover:** `filter: brightness(0.94)` + a **specular sheen** sweeps across (`::after`, 0.7s),
  fires immediately and identically on every gold button.
- **Passive shimmer:** `.btn-shimmer` adds a slow looping sheen (`::before`) on the marquee Enroll
  CTAs only — the announcement banner, hero, and closing band. ~1 glint / 5s.
- **All sheen motion is gated behind `prefers-reduced-motion: no-preference`** (reduced-motion
  users get the static gold gradient).
- **Outline (secondary):** Transparent, `white/70` border, white label — on photo / dark bands only.
- **Focus:** Global 2px gold focus-visible ring (`#D8A832`, 2px offset).

### Cards / Containers
- **Corner Style:** 6–12px. Feature cards 10px; media 12px; chips 8px.
- **Background:** Paper (`#ECE6D6`); Surface (`#F7F3E9`) for raised/alternate; translucent white on
  the dark culture band.
- **Border:** 1px Warm Border (`#D9D0C0`); `.gs-card` deepens to ~`#C8B89A` on hover (CSS `:hover`,
  never inline JS).
- **Feature-card top-rule** *(deliberate marker, enforced).* A 5px Jade top border marks a
  **feature card** — used **only** on the homepage value-prop cards and the Programs offering cards.
  It is NOT card grammar: resource lists, callouts, info boxes, and class grids get a plain 1px
  border. Never propagate colored side/edge stripes (see Don'ts).
- **Internal Padding:** 16–28px.

### Eyebrow & Badges
- **Eyebrow:** `.eyebrow` — 10px, 600, +0.18em, uppercase. Deep jade (`#0E5038`) on light; the dark-
  band call sites override to light mint (`#6FC9A0`).
- **Badges:** pill (`100px`) tints — `badge-green` `#D6EDD9`/`#1E4D25`, `badge-gold` `#FEF3DC`/
  `#7A5500`, `badge-dark` ink/paper (tokenized). Inline tints (electives "NEW" = gold fill + ink;
  green status badges = jade tint + jade-dark). Small (10px), for status/category tags.

### Navigation
- **Header:** Sticky on Jade (`#1A6E52`), fixed 72px; white inverted logo; condenses with shadow
  + backdrop-blur on scroll. The Enroll CTA is a gold `.btn-primary`.
  Order: Programs · Enroll · About · Calendar · Events · Donate · Contact.
- **Links:** 11–12px Inter 600, uppercase, wide tracking, white; active link cream + underline
  (offset 4px) + `aria-current="page"`.
- **Mobile:** Native `<details>` disclosure; the Enroll item is light-mint text on the dark menu.
- **Announcement banner:** Deep-jade strip with a gold `.btn-shimmer` Enroll pill.
- **Footer:** Ink gradient (`#221F1A → #15120E`); light-mint uppercase section headers; paper-toned
  links (`.footer-link`, ~0.72 → 1.0 on hover via CSS).

### Calendar — event-category colors
Five distinguishable, AA-on-paper categories (color is paired with a legend + text label, never the
sole channel): **no-school** warm red `#B23A2C`, **exam** ochre `#7E5A05` (bold), **event** jade
`#1A6E52`, **ac** aubergine `#6B3A56`, **admin** ink-soft `#57534A`; **milestone** ink bold.
Zebra rows alternate paper / surface.

### Analytics
Umami (`cloud.umami.is`), `defer`-loaded in `<head>`; privacy-friendly, cookieless. The
`data-website-id` is public by design.

### Inputs / Fields
- No first-party form fields yet (enroll/payment live on external systems). When added: surface
  background, 1px Warm Border, 6–8px radius, gold focus ring, Ink text, AA contrast.

### Signature Component — Calligraphy Splash
- The first page of each tab session brush-paints `費利蒙中文學校` stroke-by-stroke, then resolves
  into the header logo. Progressively enhanced; skipped under `prefers-reduced-motion`; replayable
  via the ↻ button by the logo. Must never block or delay content.

## 6. Do's and Don'ts

### Do:
- **Do** use gold for CTAs only — button fills (always **ink text**), focus ring, "NEW" (Gold-Is-CTA).
- **Do** make accent text green: deep jade (`#0E5038`) on light, light mint (`#6FC9A0`) on dark.
- **Do** set Chinese in Noto Serif TC and English/UI in Inter, always (Two-Script Rule).
- **Do** use Ink (`#221F1A`) for primary body copy; Ink-Soft for secondary.
- **Do** keep paper as the field; carry warmth through accents, bands, and imagery (Paper-Is-The-Field).
- **Do** reserve the 5px jade top-rule for feature cards (homepage values + Programs offerings).
- **Do** keep the eyebrow to the two homepage section kickers only.
- **Do** test every heading and CTA in **both** EN (Inter) and 中文 (Noto Serif TC) at every breakpoint.
- **Do** give every animation a `prefers-reduced-motion` fallback to static, visible content.
- **Do** verify any accent/green text hits AA (4.5:1 small, 3:1 large) before shipping.

### Don't:
- **Don't** put **white text on a gold fill** — gold is light; use ink (white-on-gold fails AA).
- **Don't** use **gold as accent label text**, or a **bright/mid jade as small text on dark green** — both fail AA.
- **Don't** add **colored side/edge stripes** (`border-left/right > 1px`) to any card/callout — absolute ban.
- **Don't** stamp an **eyebrow above every section/page** — it's AI scaffolding (two homepage kickers only).
- **Don't** propagate the top-rule beyond feature cards — it's a marker, not card grammar.
- **Don't** reintroduce **blue** (except the Facebook / Google-Calendar external brand marks).
- **Don't** use pure black (`#000`) for text or shadows — Ink only (Warm-Black Rule).
- **Don't** use pills for buttons — geometry is sharp (6px).
- **Don't** rebuild the **Joomla** clutter, drift to **SaaS** clichés, go **childish**, or go **stuffy**.
