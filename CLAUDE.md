# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The new website for **Fremont Chinese School** (FCS), a WASC-accredited non-profit
weekend Chinese school founded in 1972. It is a fresh rebuild of an old Joomla site,
deliberately dropping outdated content rather than porting 1:1. Static, bilingual
(English + Traditional Chinese), built with **Astro 5 + Tailwind 4**, hosted on
**GitHub Pages**.

## Commands

```sh
npm install        # install deps (use npm; package-lock.json is committed)
npm run dev        # dev server at localhost:4321 (live reload)
npm run dev -- --host   # also expose on the LAN for sharing previews
npm run build      # static build to dist/ — run this to verify changes compile
npm run preview    # serve the built dist/ locally
```

There is **no test or lint tooling** configured. After changes, `npm run build` is the
verification step — it type-checks `.astro` files and fails on broken imports/templates.

## Architecture — the bilingual content model (most important)

The site is bilingual and the two locales must never drift apart structurally. This is
achieved by separating **content** from **markup**:

- **`src/i18n/content.ts`** — ALL page copy for both locales, keyed `content.en.*` /
  `content.zh.*` with identical shapes. Also holds `links` (shared external URLs:
  registration, payment, calendar PDFs, Facebook) and `contactInfo`. **Edit copy here**,
  not in components. External links (Enroll/Registration, fees/Online Payment) point at
  the live legacy site at `fremontchineseschool.org` on purpose — do not rebuild those.
- **`src/i18n/ui.ts`** — nav labels, site name/tagline, the `routes` slug table,
  `navOrder`, and the `localizedPath()` / `alternatePath()` helpers. English is the
  default locale served at `/`; Chinese is served under `/zh/` (`prefixDefaultLocale:
  false` in `astro.config.mjs`).
- **`src/components/pages/*.astro`** — one body component per page (HomePage, AboutPage,
  …). These take a `lang` prop and render `content[lang]`. **Markup is written once here.**
- **`src/pages/*.astro`** (English) and **`src/pages/zh/*.astro`** (Chinese) — thin route
  wrappers. Each just sets `const lang = "en"|"zh"`, wraps the matching body component in
  `BaseLayout`, and passes the title. The EN and ZH route files are identical except for
  the locale and import depth (`../` vs `../../`).

### Adding or changing a page

1. Add the copy to **both** `content.en` and `content.zh` in `content.ts` (same shape).
2. If it's a new top-level page: add a slug to `routes` and the key to `navOrder` in
   `ui.ts`, and add the `nav` label in both locales.
3. Create the body component in `src/components/pages/`.
4. Create two route files: `src/pages/<slug>.astro` and `src/pages/zh/<slug>.astro`.

The language switcher (`LangSwitch.astro`) uses `alternatePath()` to map the current URL
to its counterpart, so a correct route in both trees is all that's needed for it to work.

## Branding

Brand tokens live in `src/styles/global.css` under Tailwind's `@theme` (Tailwind 4 uses
CSS-based config — there is no `tailwind.config.js`). The banner color is the FCS logo
blue `#8FBDDF` (`--color-fcs-blue`); the logo is `public/images/logo.png`.

## Site search (Pagefind)

`src/components/SiteSearch.astro` adds a search icon in the header (wired in
`Header.astro`) that opens a modal backed by [Pagefind](https://pagefind.app). Pagefind
indexes the **built HTML**, not the source content — the `postbuild` script in
`package.json` runs `pagefind --site dist` right after `astro build`, writing static
index + UI assets to `dist/pagefind/` (gitignored, regenerated on every build).

- Only `<main data-pagefind-body>` in `BaseLayout.astro` is indexed, so header/nav/footer
  chrome doesn't pollute every result.
- Pagefind auto-scopes results to the current page's language via `<html lang>`
  (set in `BaseLayout.astro`), so English and Chinese searches never cross-contaminate —
  no extra config needed.
- **The index only exists after a real build.** `npm run dev` (Astro dev server) has no
  `dist/pagefind/`, so the search modal shows a friendly fallback message instead of
  results. To actually test search locally: `npm run build` (runs postbuild
  automatically) then `npm run preview` — or use the `fcs-preview` launch config.
- Pagefind UI is themed via CSS custom properties (`--pagefind-ui-*`) scoped to `#search`
  in `SiteSearch.astro`, mapped to the site's brand tokens. Bilingual UI strings (search
  placeholder, result counts, etc.) are passed via the `translations` option when `lang`
  is `zh`.

## Deployment

`.github/workflows/deploy.yml` builds and deploys `dist/` to GitHub Pages on every push
to `main`. The repo is `FremontChineseSchool.github.io` (an org Pages repo), so it serves
at the root — `astro.config.mjs` sets `site` with no `base` path. **Pages source must be
set to "GitHub Actions"** in repo Settings → Pages for the deploy to succeed. A custom
domain (`fremontchineseschool.org`) is not yet wired up (would need a `CNAME` + DNS).

## old_website/ — reference only

`old_website/` holds HTML scraped from the legacy Joomla site, kept purely as a content
reference (it is not built or served). `old_website/SITEMAP.md` maps each file to its
original URL and the old site's structure. Its internal links are intentionally left as
absolute `fremontchineseschool.org` URLs (self-documenting). Mine it for content/contact
details when building pages; don't treat it as source.

## Note on README

`README.md` documents a per-repo Claude Code login setup (`claude-fcs` shell wrapper) so
this repo runs under the FCS Claude account rather than the machine default — unrelated to
the site code itself.
