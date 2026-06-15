---
name: seo
description: >-
  Audit and maintain SEO for the Fremont Chinese School site. Use when asked to
  run an SEO audit, add/verify meta tags, descriptions, canonical/hreflang,
  Open Graph, structured data (JSON-LD), the sitemap or robots.txt — or when
  adding/changing a page and SEO must not regress. Also tracks the outstanding
  SEO work tied to the custom-domain cutover.
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
  Aim for ~150 chars, keyword-rich, lead with "Fremont Chinese School" / the school
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
living there. Only flip it as part of the cutover (see Outstanding work).

## Rule: adding or changing a page must not regress SEO

When a new top-level page is added (on top of the steps in `CLAUDE.md`):

1. Add a `descriptions.en.<routeKey>` and `descriptions.zh.<routeKey>` entry. The
   `<routeKey>` must match the key in `routes` (`ui.ts`) — BaseLayout looks it up by
   path, and falls back to the tagline if missing (so a missing entry degrades quietly
   rather than erroring — don't rely on the fallback).
2. Nothing else is needed for canonical/hreflang/OG/sitemap — they derive automatically
   from the route existing in both locale trees.
3. Verify with the audit below.

## Running an SEO audit

1. `npm run build` — must pass (it type-checks `.astro` and fails on broken templates).
2. Inspect the emitted `dist/` output, not just the source:
   - `dist/sitemap-index.xml` + `dist/sitemap-0.xml` exist and list all pages with
     `xhtml:link hreflang` alternates.
   - `dist/robots.txt` has the correct `Sitemap:` host.
   - On a sample EN page and its ZH counterpart, confirm `<head>` has: unique
     `<meta name="description">`, self-referencing `<link rel="canonical">`,
     `hreflang` en/zh-Hant/x-default, OG (`og:title/description/url/image/locale`),
     Twitter card, and one `application/ld+json` block.
   - Homepage `<title>` is the keyword-rich `homeTitle`, not "Home".
   Useful: `grep -oE '<(title|meta|link)[^>]*>' dist/about/index.html | grep -iE 'desc|canonical|hreflang|og:|twitter'`
3. Cross-check every `routes` key has a `descriptions` entry in both locales.
4. Validate the JSON-LD (Google Rich Results Test) when the org details change.
5. Report findings by severity (Critical / High / Medium / Low) with the file:line and
   a concrete fix — mirror the structure of the original audit.

## Outstanding work (status)

This skill is the in-repo record of what's left; it is mirrored in the GitHub issue
**"SEO: complete cutover to fremontchineseschool.org custom domain"** (link the issue
number here once known: #___). Keep the two in sync, or pick one as canonical and note
it. Check items off here as they land.

### Shipped (commit `acda717`, PR #4)

- [x] Sitemap (`@astrojs/sitemap`) + `robots.txt`
- [x] Per-page meta descriptions (all 18 pages, both locales)
- [x] Canonical tags + `hreflang` alternates (en / zh-Hant / x-default)
- [x] Open Graph + Twitter cards (incl. `og:image`, `og:locale`)
- [x] `EducationalOrganization` JSON-LD
- [x] Keyword-rich homepage `<title>`

### At domain cutover

- [ ] Add `public/CNAME` with `fremontchineseschool.org`
- [ ] Point DNS at GitHub Pages (apex A/AAAA + `www` CNAME); enable Enforce HTTPS
- [ ] Flip `site` in `astro.config.mjs` to `https://fremontchineseschool.org` (one line)
- [ ] Update the `Sitemap:` host in `public/robots.txt`
- [ ] Redirect the old `.github.io` host to `.org` (avoid duplicate content)
- [ ] Confirm the legacy Joomla site at `.org` is fully replaced first

### Measurement (can start independently)

- [ ] Verify the property in Google Search Console (meta tag in `BaseLayout` or DNS TXT)
- [ ] Submit the sitemap (`/sitemap-index.xml`) once verified
- [ ] (Optional) Add privacy-friendly analytics (e.g. Plausible)

### Post-cutover validation

- [ ] Re-run the audit: canonical/hreflang/OG and sitemap all show `.org`
- [ ] Re-validate the JSON-LD via Rich Results Test
