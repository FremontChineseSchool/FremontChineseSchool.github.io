// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { issues, issueSlug } from './src/data/newsletters.ts';

// Draft eNews issues are built (so their tokenized permalink can be shared for
// review) but must not be advertised. Collect their URL paths to filter out
// below. issueSlug carries the review token, so these must be derived from it
// rather than from the date alone.
const draftPaths = issues
  .filter((i) => i.draft)
  .flatMap((i) => [`/enews/${issueSlug(i)}/`, `/zh/enews/${issueSlug(i)}/`]);

// FCS site. Hosted on GitHub Pages at the org root domain, so no `base` path.
// `site` drives canonical URLs and the generated sitemap, so it must match the
// host actually being served. The custom domain is cut over: both
// www.fremontchineseschool.org and fremontchineseschool.github.io 301 to the
// apex, so the apex is what canonicals must name. Keep the `Sitemap:` host in
// public/robots.txt in step with this value.
export default defineConfig({
  site: 'https://fremontchineseschool.org',
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    routing: {
      // English at "/", Traditional Chinese under "/zh/". Default locale is
      // not prefixed.
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    // Emits /sitemap-index.xml + /sitemap-0.xml, annotating each page with
    // hreflang alternates linking the en and zh trees.
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', zh: 'zh-Hant' },
      },
      // Drop draft issues. They also carry <meta robots="noindex">; this stops
      // us actively submitting them in the first place.
      filter: (page) =>
        !draftPaths.some((p) => new URL(page).pathname === p),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
