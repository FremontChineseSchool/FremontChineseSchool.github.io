# Fremont Chinese School — website

The website for [Fremont Chinese School](https://fremontchineseschool.org), a
WASC-accredited non-profit weekend Chinese school in Fremont, CA, founded in
1972. This is a fresh rebuild of the school's old Joomla site.

- **Stack:** [Astro](https://astro.build) 5 + [Tailwind CSS](https://tailwindcss.com) 4 — a static, fast site.
- **Bilingual:** English (`/`) and Traditional Chinese (`/zh/`).
- **Hosting:** GitHub Pages, deployed automatically on push to `main`.

## Getting started

Requires [Node.js](https://nodejs.org) 18+.

```sh
npm install        # install dependencies
npm run dev        # local dev server at http://localhost:4321
npm run build      # build the static site to dist/
npm run preview    # preview the built site locally
```

To share a preview with someone on the same Wi-Fi, run `npm run dev -- --host`
and give them the `Network` URL it prints.

## Editing content

Almost all page text — in **both languages** — lives in one file:
**`src/i18n/content.ts`**. Edit the copy there; English and Chinese sit side by
side with the same structure. Page layout/markup is separate (in
`src/components/pages/`), so non-developers can usually update wording without
touching design. Navigation labels and the site name live in `src/i18n/ui.ts`.

The brand color (banner blue `#8FBDDF`) and fonts are in
`src/styles/global.css`. The logo is `public/images/logo.png`.

See [`CLAUDE.md`](./CLAUDE.md) for the full architecture and how to add a new
page.

## Homepage intro animation

The homepage opens with a brush-calligraphy animation that paints the school
name (費利蒙) stroke-by-stroke with a wet ink-bloom, then completes and settles
into the header logo. It's skipped automatically for visitors who prefer reduced
motion, and a click/tap/keypress fast-forwards it.

It runs entirely from two committed data files —
`src/data/glyphs.json` (the glyph outlines) and `src/data/strokes.json` (the
hand-aligned brush strokes) — consumed by `src/components/CalligraphySplash.astro`.
The offline tooling that produced those files (a font-extraction script and a
custom stroke-alignment editor) is kept locally and not part of the repo; see
[`CLAUDE.md`](./CLAUDE.md) for how to regenerate or extend it.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes it to GitHub Pages. For this to work, repo **Settings → Pages →
Source** must be set to **GitHub Actions**.

## `old_website/`

A reference archive of the legacy Joomla pages, kept for content only — it is
not part of the built site. `old_website/SITEMAP.md` maps each file to its
original URL.

---

## Per-repo Claude Code login (macOS)

On macOS, Claude Code shares one login (the macOS Keychain) across every repo.
To run this repo as the FCS account, use a `~/.zshrc` wrapper that sets an
OAuth token, which overrides the Keychain login:

- **`claude`** → your default Keychain login
- **`claude-fcs`** → the FCS account (`it@fremontchineseschool.org`)

### Setup

1. Run `claude setup-token`, sign in as the FCS account in the browser it
   opens, and copy the `sk-ant-oat-...` token.

2. Add to `~/.zshrc`:

   ```sh
   claude-fcs() { CLAUDE_CODE_OAUTH_TOKEN="sk-ant-oat-..." claude "$@"; }
   ```

3. `source ~/.zshrc`
4. Use `claude-fcs` in this repo, `claude` elsewhere.

> The greeting still shows your default account's name — it's cosmetic. To
> confirm the active account, run `claude auth status`: `"authMethod":
> "oauth_token"` means the FCS token is active.

> ⚠️ The token is a credential — keep it in `~/.zshrc`, never commit it.
