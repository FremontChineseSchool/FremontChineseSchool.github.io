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
canonical / hreflang / OG URL and the sitemap are built from it. The custom domain is now
cut over, so that value is `https://fremontchineseschool.org` — the apex, which is where
both `www.` and the `…github.io` host 301 to. Naming a host that redirects (either of
those two) would make every canonical a redirect hop, so keep this on the apex.

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
7. **Deployment-host consistency (always-true invariant — Critical if violated).**
   These three must all agree; if any disagree, the served domain and the
   canonical/OG/sitemap URLs point at different places:
   - `site` in `astro.config.mjs` equals the host actually being served.
   - `public/CNAME` is consistent with `site` — present and matching the apex domain
     when `site` is the custom domain; absent when `site` is the `…github.io` host.
   - the `Sitemap:` host in `public/robots.txt` matches `site`.
   This is a *consistency* check (does the repo agree with itself / with reality?), not
   an assertion of a specific value — so it never false-flags the pre-cutover state.
   What it does **not** cover: whether to cut over, DNS propagation, or Search Console
   setup. Those are external (the skill can't observe them) or decision-dependent, so
   they live in the cutover issue, not here — see below.
8. Report findings by severity (Critical / High / Medium / Low) with `file:line` and a
   concrete fix — mirror the structure of the original audit.

## What's tracked in the cutover issue instead (and why)

The custom-domain cutover work is tracked in the GitHub issue
**"SEO: complete cutover to fremontchineseschool.org custom domain"** — the canonical
checklist. Some of it could be phrased as a check but still doesn't belong here. The
test for whether something is an audit step vs. issue work is **not** "one-time vs.
repeatable" (almost any task can be reworded as a check). It is:

- **Observable?** Can this audit see the answer from the repo + `dist/`? Search Console
  verification and DNS propagation live in external systems the skill can't query, so a
  "check" for them could never self-clear — it'd be a permanent nag, not a finding.
- **Decision-independent?** Is there one always-true answer, or does "correct" depend on
  a project decision the skill can't see? "A CNAME *must exist*" fails this — pre-cutover,
  having none is the intended state, so it would false-flag every run. (The CNAME
  *consistency* check in step 7 is fine precisely because it's decision-independent:
  it only requires `CNAME` and `site` to agree, whichever era we're in.)

So: internal-consistency invariants the audit can observe → steps above. External
milestones, or assertions whose correctness depends on an unmade decision → the issue.
Do not re-add a cutover checklist here.
