export const languages = { en: 'English', zh: '中文' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

// Navigation: one entry per top-level page. `key` maps into the route table.
export const navOrder = [
  'about',
  'programs',
  'enroll',
  'calendar',
  'events',
  'donate',
  'contact',
] as const;

// Route slugs are shared across locales; zh pages live under /zh/<slug>.
export const routes: Record<string, string> = {
  home: '',
  about: 'about',
  programs: 'programs',
  enroll: 'enroll',
  calendar: 'calendar',
  events: 'events',
  donate: 'donate',
  contact: 'contact',
};

export const ui = {
  en: {
    siteName: 'Fremont Chinese School',
    tagline: 'Teaching Chinese language and culture since 1972',
    logoAlt: 'Fremont Chinese School',
    skipToContent: 'Skip to content',
    enrollCta: 'Enroll Now',
    nav: {
      home: 'Home',
      about: 'About',
      programs: 'Programs',
      enroll: 'Enroll',
      calendar: 'Calendar',
      events: 'Events',
      donate: 'Donate',
      contact: 'Contact',
    },
    footer: {
      rights: 'All rights reserved.',
      nonprofit: 'A 501(c) non-profit organization.',
      langLabel: 'Language',
    },
  },
  zh: {
    siteName: '費利蒙中文學校',
    tagline: '自 1972 年傳授中華語文與文化',
    logoAlt: '費利蒙中文學校',
    skipToContent: '跳至主要內容',
    enrollCta: '立即報名',
    nav: {
      home: '首頁',
      about: '關於本校',
      programs: '課程',
      enroll: '報名註冊',
      calendar: '行事曆',
      events: '活動',
      donate: '捐款',
      contact: '聯絡我們',
    },
    footer: {
      rights: '版權所有。',
      nonprofit: '本校為 501(c) 非營利組織。',
      langLabel: '語言',
    },
  },
} as const;

/** Build a locale-aware href for a route key. */
export function localizedPath(lang: Lang, routeKey: string): string {
  const slug = routes[routeKey] ?? '';
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  return `${prefix}/${slug}`.replace(/\/+$/, '') || '/';
}

/** Given the current URL path, return the equivalent path in the other locale. */
export function alternatePath(lang: Lang, pathname: string): string {
  const other: Lang = lang === 'en' ? 'zh' : 'en';
  // strip a leading /zh
  const bare = pathname.replace(/^\/zh(?=\/|$)/, '') || '/';
  const prefix = other === defaultLang ? '' : `/${other}`;
  return `${prefix}${bare}`.replace(/\/+$/, '') || '/';
}
