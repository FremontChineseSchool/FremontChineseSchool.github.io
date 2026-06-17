# Product

## Register

brand

## Users

Primarily **Chinese-American parents in Fremont and the greater East Bay** evaluating
or maintaining a weekend Chinese-school education for their children (pre-K through
12th grade). They arrive on a phone or laptop, often mid-decision: "Is this school
legitimate? What does it cost? How do I enroll? When does class start?" Many read
Traditional Chinese more comfortably than English, so the site is fully bilingual
(EN default at `/`, 中文 at `/zh/`) and the two locales must stay structurally identical.

Secondary audiences: returning families checking the calendar/events, prospective
donors, and community members. The job to be done is almost always informational and
transactional — build confidence, then route to the live enrollment, payment, and
calendar resources hosted on the legacy domain.

## Product Purpose

The public identity and front door for **Fremont Chinese School** (FCS) — a
WASC-accredited, non-profit weekend Chinese school founded in 1972, one of the largest
in the East Bay. This is a deliberate rebuild of a dated Joomla site, dropping stale
content rather than porting it 1:1. Static, bilingual, fast, built on Astro 5 +
Tailwind 4, hosted on GitHub Pages.

Success = a visiting parent quickly trusts the school's credibility and longevity,
understands the programs, and confidently clicks through to enroll, pay, or check the
calendar. The site sells reputation and clarity; the transactions themselves live on
the existing legacy systems and are intentionally not rebuilt here.

## Brand Personality

**Warm, established, culturally rooted, and clear.** A 50-year community institution
that takes education seriously without being stuffy. The voice is welcoming and
plain-spoken — a place where kids belong and families feel at home — backed by the
quiet authority of WASC accreditation and five decades of history. Cultural pride is
expressed through the brush-calligraphy identity (`費利蒙中文學校`) and Traditional
Chinese typography, not through cliché or decoration. Emotional goal: a parent should
feel *reassured and invited*, never sold-to or overwhelmed.

## Anti-references

- **The old Joomla site** — cluttered, text-heavy, dated. Avoiding this is the entire
  reason for the rebuild; the new site must feel current, breathable, and uncluttered.
- **Cold corporate / SaaS landing pages** — generic startup template, gradient-soaked,
  hero-metric clichés, soulless. This is a community school, not a tech product.
- **Childish / cartoonish** — over-bright primaries, clip-art, daycare energy. FCS is a
  credentialed school (high-school credit track); it should read as serious and capable.
- **Stuffy / institutional / academic** — dry, bureaucratic, intimidating university
  energy. Warmth and approachability must temper the credibility.

## Design Principles

1. **Credibility through calm.** Trust is earned with breathing room, clear hierarchy,
   and restraint — not louder claims. White space and confident typography carry the
   "established" feeling; clutter would undo it.
2. **Bilingual parity is structural, not cosmetic.** EN and 中文 share one set of
   markup and one layout. Any design choice must work identically in both locales,
   including Traditional Chinese line lengths, wrapping, and font rendering.
3. **Heritage with a light touch.** Cultural identity lives in the calligraphy intro,
   the logo blue, and Traditional Chinese typesetting — deployed sparingly so it feels
   authentic, never as ornament sprinkled everywhere.
4. **Guide, don't trap.** The site's job is to build confidence and then hand off to
   the live enrollment/payment/calendar resources. Make those paths obvious and frictionless;
   don't rebuild flows that already exist elsewhere.
5. **Fast and resilient by default.** Static, progressively enhanced (the splash and
   reveals degrade to plain content without JS or under reduced-motion). A parent on a
   phone on weekend wifi should get a fast, fully-usable page.

## Accessibility & Inclusion

Target **WCAG 2.1 AA**. Body text ≥4.5:1 contrast against its background (watch muted
grays on white/tinted surfaces and on the blue gradients); large text ≥3:1. Full
keyboard navigation and visible focus states. Honor `prefers-reduced-motion` everywhere
— the calligraphy splash, scroll reveals, and parallax must all degrade to static,
fully-visible content (already partly implemented). Bilingual EN / Traditional Chinese
with correct `lang`/`hreflang` is itself an inclusion requirement; never let one locale
regress relative to the other.
