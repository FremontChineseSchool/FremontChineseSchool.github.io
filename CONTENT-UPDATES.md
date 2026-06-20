# FCS Website — Content Update Guide

All routine content updates live in **one file**: `src/i18n/content.ts`.  
Open that file, find the section below that matches what you want to change, make the edit, and commit.

> **Rule:** Every update must be made in **both** the `en` and `zh` sections — they share the same structure, so whatever you add in English needs a matching Chinese entry directly below it.

---

## 1. Announcement Banner

**What it is:** The gold bar at the very top of every page. Hidden when empty.

**Where:** `src/i18n/content.ts` → `content.en.home` and `content.zh.home`

```ts
// English
announcement: 'Enrollment is now open for the 2026–27 school year.',
announcementCta: 'Enroll now →',

// Chinese
announcement: '2026–27 學年招生現已開始。',
announcementCta: '立即報名 →',
```

**To hide the banner:** Set both `announcement` fields to `''` (empty string).

---

## 2. News Posts

**What it is:** Individual update cards on the `/news` page, shown newest-first.

**Where:** `src/i18n/content.ts` → `content.en.news.posts` and `content.zh.news.posts`

**To add a post**, prepend a new object to the top of each array:

```ts
// English
{
  date: 'June 2026',
  title: 'Summer office hours',
  body: 'The FCS office will be open every Tuesday in July from 10am–1pm for registration questions.',
},

// Chinese
{
  date: '2026 年 6 月',
  title: '暑期辦公時間',
  body: 'FCS 辦公室將於 7 月每週二上午 10 時至下午 1 時開放，歡迎家長來電或到訪諮詢報名事宜。',
},
```

**Optional photo:** Add `image: '/images/news/your-file.jpg'` to the object and drop the image file in `public/images/news/`.

---

## 3. Newsletter Archive

**What it is:** The list of past newsletter PDFs at the bottom of the `/news` page.

**Where:** `src/i18n/content.ts` → `content.en.news.newsletters` and `content.zh.news.newsletters`

**To add a newsletter**, prepend a new object to the top of each array:

```ts
// English (label is the display name; url is the Google Drive share link)
{ label: 'June 2026 Newsletter', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },

// Chinese
{ label: '2026 年 6 月通訊', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
```

**To get the Google Drive URL:** Right-click the PDF in Drive → Share → Copy link. Make sure it's set to "Anyone with the link can view."

---

## 4. Annual Traditions (homepage + Events page)

**What it is:** The grid of event names in the "Annual traditions" section on the homepage and the full Events page.

**Where:** `src/i18n/content.ts` → `content.en.events.annual` and `content.zh.events.annual`

```ts
// English — add or remove objects from this array
{ name: 'Chinese New Year Celebration' },
{ name: 'Confucius Day' },
// ...

// Chinese
{ name: '農曆新年慶典' },
{ name: '孔子誕辰' },
// ...
```

---

## 5. Homepage Stats Strip

**What it is:** The four stats under the hero (e.g. "54 / Years of Community").

**Where:** `src/i18n/content.ts` → `content.en.home.facts` and `content.zh.home.facts`

```ts
// English
{ value: '54', label: 'Years of community' },

// Chinese
{ value: '54', label: '年社區歷史' },
```

---

## 6. Tuition Table

**What it is:** The fee table on the Programs page.

**Where:** `src/i18n/content.ts` → `content.en.programs.tuition.rows` and `content.zh.programs.tuition.rows`

```ts
// English
{ track: 'Chinese Language (Pre-K–8)', regular: '$650' },

// Chinese
{ track: '中文班（學前班至 8 年級）', regular: '$650' },
```

Notes and the PDF link are in `tuition.notes` and `links.tuitionPdf` respectively.

---

## 7. Textbooks

**What it is:** The textbook reference table on the Programs page.

**Where:** `src/components/pages/ProgramsPage.astro` — hardcoded in the component around line 111.  
*(This one is not in content.ts — it's the only exception.)*

Each row looks like:
```ts
{ level: 'Grades 1–8', book: 'Merica Chinese (美洲華語)', url: 'http://...' },
```

Set `url: null` if there's no external link for that book.

---

## 8. Contact Information

**What it is:** Email addresses, phone, and addresses used across the site.

**Where:** `src/i18n/content.ts` → the `contactInfo` object near the top of the file (before the locale sections).

```ts
export const contactInfo = {
  principal: 'Principal@fremontchineseschool.org',
  office: 'contact@fremontchineseschool.org',
  registration: 'Registration@fremontchineseschool.org',
  voicemail: '(510) 468-9905',
  ...
}
```

---

## 9. External Links (Registration, Payment, Calendar PDFs…)

**What it is:** Shared URLs used across the site — enrollment form, payment portal, calendar downloads, etc.

**Where:** `src/i18n/content.ts` → the `links` object near the top of the file.

```ts
export const links = {
  register: 'https://docs.google.com/forms/...',
  payment: 'https://fremontchineseschool.org/online-payment',
  calendarEn: 'https://drive.google.com/...',
  // ...
}
```

---

## Quick reference

| Content | File | Key path |
|---|---|---|
| Announcement banner | `content.ts` | `content.[lang].home.announcement` |
| News posts | `content.ts` | `content.[lang].news.posts` |
| Newsletter archive | `content.ts` | `content.[lang].news.newsletters` |
| Annual traditions | `content.ts` | `content.[lang].events.annual` |
| Homepage stats | `content.ts` | `content.[lang].home.facts` |
| Tuition table | `content.ts` | `content.[lang].programs.tuition.rows` |
| Textbooks | `ProgramsPage.astro` | ~line 111 |
| Contact info | `content.ts` | `contactInfo` (top of file) |
| External links | `content.ts` | `links` (top of file) |
