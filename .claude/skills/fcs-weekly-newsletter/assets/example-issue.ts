// REFERENCE ONLY — this file is not imported by the site.
//
// A filled-in example of one entry in the `issues` array in
// src/data/newsletters.ts, exercising every section kind. Copy the SHAPE, not
// the content: every date, name, room number, and link below is invented.
// The type definitions at the top of src/data/newsletters.ts are authoritative.
//
// Note what this example does and doesn't do:
//   - `draft` holds a random review token, because every new issue starts
//     staged for review. While it is a draft the token IS the URL
//     (/enews/9f3a1c/) — no date, so the draft cannot be found by guessing one
//     and the URL survives the send date changing. The whole field is deleted
//     in a separate, deliberate publish step.
//   - There is no "Follow Us" section. The site footer already carries the
//     social links on every page, so that section is email-only.
//   - There is no HTML anywhere. Sections are data;
//     NewsletterIssuePage.astro owns the markup. If a week needs a shape that
//     doesn't exist, add a `kind` to IssueSection rather than smuggling markup
//     into a string.
//   - Captions carry the flyer's facts as real text. Words baked into a graphic
//     are invisible to screen readers, to site search, and to anyone whose mail
//     client blocks images.

{
  date: "2026-09-10",
  label: { en: "September 10, 2026", zh: "2026年9月10日" },
  draft: "9f3a1c",  // openssl rand -hex 3
  summary: {
    en: "Picture day is Saturday the 12th, the makeup class list is posted, and we still need help at morning check-in.",
    zh: "9月12日（週六）拍攝班級照、補課名單已公布，早晨報到仍需志工協助。",
  },
  sections: [
    {
      // Prose. `signoff` renders in a lighter style beneath the paragraphs.
      kind: "note",
      title: { en: "A Note from the Principal", zh: "校長的話" },
      paragraphs: [
        {
          en: "Three weeks in, and the classrooms are already full of noise in the best possible way. Thank you to everyone who has been arriving early.",
          zh: "開學三週，教室裡已充滿孩子們的歡聲笑語。感謝每一位提早到校的家長與同學。",
        },
      ],
      signoff: {
        en: "Warmly, Angela — Principal, Fremont Chinese School",
        zh: "謹上　夏芷筠　費利蒙中文學校校長",
      },
    },
    {
      // A `note` can carry an image too — a map, a diagram, a photo. `alt` is
      // required whenever `image` is set; omitting it is a build error.
      kind: "note",
      title: { en: "Picture Day — Saturday, September 12", zh: "班級照拍攝 — 9月12日（週六）" },
      image: "/images/news/enews-2026-09-10-picture-day-map.jpg",
      alt: {
        en: "Map of the courtyard showing where each class lines up for its photo.",
        zh: "中庭示意圖，標示各班拍照排隊位置。",
      },
      paragraphs: [
        {
          en: "Classes line up in the courtyard by room number. Please have your child wear their FCS shirt if they have one.",
          zh: "各班依教室號碼於中庭排隊。若已領取本校服裝，請讓孩子當天穿著。",
        },
      ],
      links: [
        {
          label: { en: "Class, teacher & classroom list", zh: "班級、教師與教室一覽" },
          href: "/student-resources",
        },
      ],
    },
    {
      // A list. `intro` sits above the bullets; `links` below them.
      kind: "bullets",
      title: { en: "School Calendar", zh: "學校行事曆" },
      intro: { en: "Coming event(s):", zh: "近期活動：" },
      items: [
        { en: "9/12/2026 — Picture day", zh: "9/12/2026 — 班級照拍攝" },
        { en: "9/19/2026 — No school, teacher in-service", zh: "9/19/2026 — 停課，教師研習" },
      ],
      links: [
        {
          label: { en: "Download calendar (Chinese)", zh: "下載行事曆（中文版）" },
          href: "https://drive.google.com/file/d/1kUl_nhpdAC0WLE0r6smb2fSjDUzRmSdX/view",
        },
        {
          label: { en: "Download calendar (English)", zh: "下載行事曆（英文版）" },
          href: "https://drive.google.com/file/d/1mHm8B4-LnNZkqqOY8qMvG7OReWaconzM/view",
        },
      ],
    },
    {
      // Highlighted block. `cta` is the one action being asked for; `links` are
      // supporting documents. An image is optional here as well.
      kind: "callout",
      title: { en: "Join Our Volunteer Team", zh: "加入幹事團隊" },
      image: "/images/news/enews-2026-09-10-volunteer-team.jpg",
      alt: {
        en: "Parent volunteers at the morning check-in table.",
        zh: "家長義工於早晨報到處協助。",
      },
      paragraphs: [
        {
          en: "We are short two people at morning check-in. It is a 30-minute shift and counts toward your family's volunteer hours.",
          zh: "早晨報到處尚缺兩位人手，每班 30 分鐘，可計入家庭志工時數。",
        },
      ],
      links: [
        {
          label: { en: "See open volunteer positions", zh: "查看義工職缺一覽" },
          href: "https://example.com/replace-with-the-real-positions-list",
        },
      ],
      cta: {
        label: { en: "Volunteer sign-up", zh: "義工報名" },
        href: "https://example.com/replace-with-the-real-signup-form",
      },
    },
    {
      // A pre-made graphic — `image` and `alt` are required. `links` optional.
      kind: "flyer",
      title: { en: "Class Highlight: Chinese Yoyo", zh: "課程精選：扯鈴" },
      image: "/images/news/enews-2026-09-10-yoyo.jpg",
      alt: {
        en: "Flyer for the Chinese yoyo elective, with a QR code to register.",
        zh: "扯鈴選修課宣傳單，並附報名 QR code。",
      },
      caption: {
        en: "Saturdays, 10:00–10:50 AM in the courtyard. Beginners welcome; no equipment needed for the first session.",
        zh: "每週六上午 10:00–10:50，中庭上課。歡迎初學者，第一堂課無需自備器材。",
      },
      links: [
        {
          label: { en: "Elective class list", zh: "選修課程一覽" },
          href: "/electives",
        },
      ],
    },
    {
      // Conditional — only on weeks with a sponsor update, never carried over.
      // Logos live in public/images/sponsors/ (undated; reused across issues).
      // Omit `href` when you are not certain of the correct destination.
      kind: "sponsors",
      title: { en: "2026 Yearbook Gold Sponsors", zh: "2026 年刊金牌贊助商" },
      logos: [
        {
          name: "Example Sponsor Inc. 範例贊助商",
          image: "/images/sponsors/example-sponsor.jpg",
          href: "https://example.com",
        },
      ],
    },
  ],
}
