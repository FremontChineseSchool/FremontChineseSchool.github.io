export const languages = { en: 'English', zh: '中文' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

// Navigation: one entry per top-level page. `key` maps into the route table.
export const navOrder = [
  'programs',
  'student-resources',
  'calendar',
  'events',
  'about',
  'donate',
  'contact',
] as const;

// Route slugs are shared across locales; zh pages live under /zh/<slug>.
export const routes: Record<string, string> = {
  home: '',
  about: 'about',
  programs: 'programs',
  enroll: 'enroll',
  payment: 'payment',
  calendar: 'calendar',
  events: 'events',
  'academic-contest': 'academic-contest',
  donate: 'donate',
  contact: 'contact',
  'ac-resources': 'ac-resources',
  'staff-resources': 'staff-resources',
  'student-resources': 'student-resources',
  news: 'news',
  electives: 'electives',
};

export const ui = {
  en: {
    siteName: 'Fremont Chinese School',
    // Standalone <title> for the homepage (keyword-rich, no site-name suffix).
    homeTitle: 'Fremont Chinese School — Weekend Mandarin Chinese School in Fremont, CA',
    tagline: 'Teaching Chinese language and culture since 1972',
    logoAlt: 'Fremont Chinese School',
    skipToContent: 'Skip to content',
    enrollCta: 'Enroll Now',
    replayIntro: 'Replay intro animation',
    textSize: {
      label: 'Text size',
      standard: 'Standard text size',
      large: 'Large text size',
      larger: 'Largest text size',
    },
    nav: {
      home: 'Home',
      about: 'About',
      programs: 'Programs',
      enroll: 'Enroll',
      calendar: 'Calendar',
      'student-resources': 'Student Resources',
      events: 'Events',
      donate: 'Donate',
      contact: 'Contact',
    },
    footer: {
      rights: 'All rights reserved.',
      nonprofit: 'A 501(c) non-profit organization.',
      langLabel: 'Language',
      links: 'Links',
      resources: 'Resources',
      connect: 'Connect',
      acResources: 'AC Resources',
      staffResources: 'Staff Resources',
    },
  },
  zh: {
    siteName: '費利蒙中文學校',
    homeTitle: '費利蒙中文學校 — 加州費利蒙週末中文學校',
    tagline: '自 1972 年傳授中華語文與文化',
    logoAlt: '費利蒙中文學校',
    skipToContent: '跳至主要內容',
    enrollCta: '立即報名',
    replayIntro: '重播開場動畫',
    textSize: {
      label: '字級',
      standard: '標準字級',
      large: '大字版',
      larger: '特大字版',
    },
    nav: {
      home: '首頁',
      about: '關於本校',
      programs: '課程',
      enroll: '報名註冊',
      calendar: '行事曆',
      'student-resources': '學生資源',
      events: '活動',
      donate: '捐款',
      contact: '聯絡我們',
    },
    footer: {
      rights: '版權所有。',
      nonprofit: '本校為 501(c) 非營利組織。',
      langLabel: '語言',
      links: '連結',
      resources: '資源',
      connect: '社群',
      acResources: '學分班資源',
      staffResources: '教職員資源',
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
