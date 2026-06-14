// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// FCS site. Hosted on GitHub Pages at the org root domain, so no `base` path.
// `site` drives canonical URLs and the generated sitemap, so it must match the
// host actually being served. We're live at fremontchineseschool.github.io;
// at the custom-domain cutover, flip this to https://fremontchineseschool.org
// (and add public/CNAME + DNS).
export default defineConfig({
  site: 'https://fremontchineseschool.github.io',
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
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
