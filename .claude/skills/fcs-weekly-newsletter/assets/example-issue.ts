// REFERENCE ONLY — this file is not imported by the site.
//
// A filled-in example of one entry in the `issues` array in
// src/data/newsletters.ts, exercising every section kind and every block type.
// Copy the SHAPE, not the content: every date, name, room number, and link
// below is invented. The type definitions at the top of newsletters.ts are
// authoritative.
//
// Note what this example does and doesn't do:
//   - `draft` holds a random review token, because every new issue starts
//     staged for review. While it is a draft the token IS the URL
//     (/enews/9f3a1c/) — no date, so the draft cannot be found by guessing one
//     and the URL survives the send date changing. The whole field is deleted
//     in a separate, deliberate publish step.
//   - Sections are DOCUMENTS, not paragraphs. A `prose` or `callout` section
//     holds an ordered array of blocks — subheads, paragraphs, lists, images —
//     so one section can carry a sub-heading, prose, a list, an image, another
//     sub-heading, and more prose, the way the school actually writes.
//   - Prose, list items, subheads, and captions take two inline constructs and
//     no others: `[label](href)` and `**emphasis**`. A link that belongs
//     mid-sentence stays mid-sentence; the section's `links` row is for
//     downloads and supporting documents.
//   - There is no "Follow Us" section. The site footer already carries the
//     social links on every page, so that section is email-only.
//   - There is no HTML anywhere. If a week needs a shape none of these covers,
//     add a kind or a block type — never smuggle markup into a string.

{
  date: "2026-09-10",
  label: { en: "September 10, 2026", zh: "2026年9月10日" },
  draft: "9f3a1c",  // openssl rand -hex 3
  summary: {
    en: "Picture day is Saturday the 12th, two classrooms have moved, and we still need help at morning check-in.",
    zh: "9月12日（週六）拍攝班級照、兩間教室有異動，早晨報到仍需志工協助。",
  },
  sections: [
    {
      // Narrative. `signoff` renders in a lighter style beneath the blocks.
      kind: "prose",
      title: { en: "A Note from the Principal", zh: "校長的話" },
      blocks: [
        {
          block: "prose",
          text: {
            en: "Three weeks in, and the classrooms are already full of noise in the best possible way. More photos from last Saturday are here: [Week 3 Photo Album](https://photos.example.com/album).",
            zh: "開學三週，教室裡已充滿孩子們的歡聲笑語。上週六的活動照片請見：[第三週照片集](https://photos.example.com/album)。",
          },
        },
      ],
      signoff: {
        en: "Warmly, Angela — Principal, Fremont Chinese School",
        zh: "謹上　夏芷筠　費利蒙中文學校校長",
      },
    },
    {
      // A weekly update: sub-headings, prose, a list, and an image, in one
      // section. This is the shape the school uses for "Week N School Update" —
      // do NOT split it into several top-level sections.
      kind: "prose",
      title: { en: "Week 3 School Update", zh: "第三週學校近況" },
      blocks: [
        { block: "subhead", text: { en: "Classroom Changes", zh: "教室異動更新" } },
        {
          block: "prose",
          text: {
            en: "Two classes have moved. Affected teachers have been notified individually:",
            zh: "有兩個班級的教室已調整，任課老師均已個別通知：",
          },
        },
        {
          block: "list",
          items: [
            { en: "**T2** moves from room 213 to room 214.", zh: "**T2 班**由 213 教室改至 214 教室。" },
            { en: "**AB1** moves from room 216 to room 227.", zh: "**珠心算一**由 216 教室改至 227 教室。" },
          ],
        },
        {
          block: "image",
          src: "/images/news/enews-2026-09-10-campus-map.jpg",
          alt: {
            en: "Campus map marking visitor parking, the drop-off route, and the moved classrooms.",
            zh: "校園地圖，標示訪客停車場、接送路線與異動後的教室位置。",
          },
        },
        { block: "subhead", text: { en: "Parking Reminder", zh: "停車溫馨提醒" } },
        {
          block: "prose",
          text: {
            en: "**Staff and teachers must display a parking placard**, and the school checks periodically. If you are dropping off or coming onto campus, please use the Visitor Parking lot.",
            zh: "**教職員停車時需出示停車證**，校方會不定期查核。家長接送或需進入校園時，請停放於「家長／訪客停車場」。",
          },
        },
      ],
      links: [
        {
          label: { en: "2026–2027 Class Schedule (PDF)", zh: "2026–2027 學年度班級時間表（PDF）" },
          href: "/FCS_2026-2027_Class_Schedule.pdf",
        },
      ],
    },
    {
      // Several unrelated announcements in one section. `numbered: true`
      // numbers the subheads automatically — never number them by hand, or
      // inserting one means renumbering the rest.
      kind: "prose",
      title: { en: "General Announcements", zh: "其他公告" },
      numbered: true,
      blocks: [
        { block: "subhead", text: { en: "Volunteer Service Award", zh: "學生志工服務獎" } },
        {
          block: "prose",
          text: {
            en: "Applications are open. Deadline **October 1, 2026**. Details at [www.example.org](https://www.example.org).",
            zh: "現已開始報名。申請截止日：**2026年10月1日**。詳情請見[官網](https://www.example.org)。",
          },
        },
        { block: "subhead", text: { en: "Fall Festival", zh: "秋季園遊會" } },
        {
          block: "prose",
          text: {
            en: "Saturday 10/17, 10 AM – 4 PM, free admission.",
            zh: "10月17日（週六）上午10點至下午4點，免費入場。",
          },
        },
      ],
    },
    {
      // Highlighted block: same block array, tinted box, plus one `cta` — the
      // single action the section is asking for.
      kind: "callout",
      title: { en: "Join Our Volunteer Team", zh: "加入幹事團隊" },
      blocks: [
        {
          block: "image",
          src: "/images/news/enews-2026-09-10-volunteer-team.jpg",
          alt: {
            en: "Parent volunteers at the morning check-in table.",
            zh: "家長義工於早晨報到處協助。",
          },
        },
        {
          block: "prose",
          text: {
            en: "We are short two people at morning check-in. It is a 30-minute shift and counts toward your family's volunteer hours.",
            zh: "早晨報到處尚缺兩位人手，每班 30 分鐘，可計入家庭志工時數。",
          },
        },
      ],
      cta: {
        label: { en: "Volunteer sign-up", zh: "義工報名" },
        href: "https://example.com/replace-with-the-real-signup-form",
      },
    },
    {
      // A pre-made graphic — `image` and `alt` required, `caption` carries the
      // facts baked into the picture. `links` optional.
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
        { label: { en: "Elective class list", zh: "選修課程一覽" }, href: "/electives" },
      ],
    },
    {
      // Recurring — the gold sponsors appear most weeks. Confirm the roster
      // each issue rather than assuming it is unchanged, and omit a logo's
      // `href` when the correct destination is not certain.
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
