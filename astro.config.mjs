// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// FCS site. Hosted on GitHub Pages at the org root domain, so no `base` path.
// Update `site` to the final custom domain if/when DNS is pointed here.
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
  vite: {
    plugins: [tailwindcss()],
  },
});
