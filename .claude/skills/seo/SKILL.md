---
name: seo
description: >-
  Audit and maintain SEO for the Fremont Chinese School site. Use when asked to
  run an SEO audit, add/verify meta tags, descriptions, canonical/hreflang,
  Open Graph, structured data (JSON-LD), image alt text, the sitemap or
  robots.txt — or when adding/changing a page and SEO must not regress.
---

# SEO for the FCS site

This site is a static, bilingual (EN at `/`, Traditional Chinese at `/zh/`) Astro 5
build on GitHub Pages. SEO is centralized so the two locales never drift. Before
touching anything, read `CLAUDE.md` for the bilingual content model — SEO rides on top
of it.

## How SEO is wired (where each thing lives)

- **`src/layouts/BaseLayout.astro`** — the single source of all `<head>` SEO. Its
  frontmatter resolves the current route key from the path and emits, per page:
  `<title>`, `<meta name="description">`, `<link rel="canonical">`, `hreflang`
  alternates (`en` / `zh-Hant` / `x-default`), full Open Graph + Twitter card tags,
  and the site-wide `EducationalOrganization` JSON-LD. **Almost every SEO change
  happens here or in the data it reads.**
- **`src/i18n/content.ts` → `descriptions`** — per-page meta descriptions, keyed by
  route key, for both `en` and `zh`. Add a key here for every new page (both locales).
  Keep them **120–160 characters** (under ~120 Google often rewrites the snippet; over
  ~160 it truncates), keyword-rich, leading with "Fremont Chinese School" / the school
  name where natural. A `description` prop passed to `BaseLayout` overrides the lookup.
- **`src/i18n/ui.ts` → `homeTitle`** — the keyword-rich standalone `<title>` for the
  homepage (BaseLayout uses it instead of the `· siteName` pattern when `isHome`).
- **`astro.config.mjs`** — `site` (drives canonical + sitemap URLs) and the
  `@astrojs/sitemap` integration (i18n config emits hreflang in the sitemap).
- **`public/robots.txt`** — `Allow: /` + the `Sitemap:` pointer.
- **OG image** — `public/images/slider/slide-3.jpg` (largest landscape slide).

### `site` host invariant (important)

`site` in `astro.config.mjs` MUST match the host actually being served, because every
canonical / hreflang / OG URL and the sitemap are built from it. Today that is
`https://fremontchineseschool.github.io`. Pointing it at `fremontchineseschool.org`
before the domain is cut over would aim canonicals at the **legacy Joomla site** still
living there. Only flip it as part of the cutover (see One-time tasks below).

## Rule: adding or changing a page must not regress SEO

When a new top-level page is added (on top of the steps in `CLAUDE.md`):

1. Add a `descriptions.en.<routeKey>` and `descriptions.zh.<routeKey>` entry. The
   `<routeKey>` must match the key in `routes` (`ui.ts`) — BaseLayout looks it up by
   path, and falls back to the tagline if missing (so a missing entry degrades quietly
   rather than erroring — don't rely on the fallback).
2. Nothing else is needed for canonical/hreflang/OG/sitemap — they derive automatically
   from the route existing in both locale trees.
3. Verify with the audit below.

## What every page should emit (audit baseline)

On every page, in both locale trees, `<head>` must contain: a unique
`<meta name="description">`, a self-referencing `<link rel="canonical">`, `hreflang`
alternates (`en` / `zh-Hant` / `x-default`), Open Graph
(`og:title/description/url/image/locale`), a Twitter card, and exactly one
`application/ld+json` block (`EducationalOrganization`). The homepage `<title>` is the
keyword-rich `homeTitle`, not "Home". Site-wide there is `dist/robots.txt` and
`dist/sitemap-index.xml` + `dist/sitemap-0.xml`.

## Running an SEO audit

1. `npm run build` — must pass (it type-checks `.astro` and fails on broken templates).
   Audit the emitted `dist/` output, not just the source.
2. **Per-page head tags.** On a sample page, confirm the baseline tags above are
   present and well-formed.
   `grep -oE '<(title|meta|link)[^>]*>' dist/about/index.html | grep -iE 'desc|canonical|hreflang|og:|twitter'`
3. **Both locales + hreflang reciprocity (fragile — check every audit).** A page added
   to `/` but not `/zh/` (or vice versa) silently breaks the alternates. Sample at least
   one page from **each** tree (e.g. `dist/about/` and `dist/zh/about/`) and verify:
   - both files exist for every route, and
   - each page's `hreflang="en"` / `hreflang="zh-Hant"` links point at the *other*
     locale's URL (en → `/about/`, zh → `/zh/about/`), with `x-default` → the en URL.
   - the same reciprocity holds in `dist/sitemap-0.xml` (each `<url>` has both alternates).
4. **Descriptions coverage + length.** Every `routes` key has a `descriptions` entry in
   **both** `en` and `zh`. 120–160 is the target for **English** (Google measures snippet
   width in pixels, not characters). **Chinese (`zh`) is expected to be much shorter by
   character count** — CJK glyphs are far wider and denser, so a ~40–60-char `zh`
   description fills a comparable width; do not flag short `zh` counts as a finding.
5. **Image alt text.** Meaningful images need descriptive, non-empty `alt`. Alt copy is
   authored in `content.ts` (`heroSlidesAlt`, `showcaseAlt`, etc.) and components; flag
   any `<img>` with a missing or empty `alt` (decorative images may be intentionally
   `alt=""`, so judge by role):
   `grep -rEoh '<img[^>]*>' dist | grep -vE 'alt="[^"]+"'`
6. **JSON-LD.** Confirm the `EducationalOrganization` block parses and its fields (name,
   address, telephone, url, logo, sameAs) are current, then validate it with Google's
   Rich Results Test — https://search.google.com/test/rich-results — whenever the org
   details change.
7. Report findings by severity (Critical / High / Medium / Low) with `file:line` and a
   concrete fix — mirror the structure of the original audit.

## One-time tasks (not tracked here)

The custom-domain cutover (CNAME/DNS, flipping `site` to `.org`, redirecting the old
host, Search Console verification, sitemap submission) is **one-time work, not a
repeatable procedure**, so it is tracked in the GitHub issue
**"SEO: complete cutover to fremontchineseschool.org custom domain"** — the canonical
checklist. This skill only describes what is always true about SEO on the site; do not
re-add a cutover checklist here.
