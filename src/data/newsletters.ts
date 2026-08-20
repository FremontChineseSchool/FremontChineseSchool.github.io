// Weekly eNews issues — the source of truth for /enews and /zh/enews.
//
// Written by the `fcs-weekly-newsletter` skill (.claude/skills/), which the
// principal runs each week. Adding an issue is the ONLY edit a normal week
// needs: prepend an object to `issues` below, drop any flyer images into
// public/images/news/, and run `npm run build`. No new route files, no slug
// table entry, no meta-description entry — the routes and the archive are
// generated from this array.
//
// Unlike most page copy — which lives in src/i18n/content.ts split into
// `content.en` / `content.zh` — each issue here carries BOTH locales inline,
// the same shape calendar.ts and teachers.ts use, and for the same reason:
// keeping a week's Chinese and English adjacent is what stops the two from
// drifting. Here the type also *enforces* it — `Localized` requires both keys,
// so a half-translated issue is a build error rather than a silent gap.
// Page-level chrome (the page title, archive labels) still lives in content.ts
// under `enews`.
//
// Issue dates are the SEND date, which is normally the Thursday or Friday
// before the Saturday the issue is about — so consecutive issues are not
// reliably 7 days apart. Nothing here assumes a weekly cadence; `date` is just
// a unique sort key and slug.
//
// The email version of the same issue is a separate artifact: a standalone
// email-safe HTML file the skill renders from
// .claude/skills/fcs-weekly-newsletter/assets/email-template.html for pasting
// into the parent-email send. It is intentionally NOT generated from this file
// — email needs table layout and inline styles that have nothing to do with
// the site's CSS. The skill fills both from the same gathered content in one
// pass; if they ever drift, this file is the one that's canonical.
//
// Flyer images: commit them to public/images/news/ so the SITE hosts them.
// That is what makes them usable in the email too — email clients need an
// absolute, publicly reachable URL, and once an issue is deployed the flyer
// lives at https://fremontchineseschool.org/images/news/<file>. Publish the
// web page first, then send the email. Recurring, non-issue-specific art
// (sponsor logos) lives in public/images/sponsors/ instead, undated, because
// the same file is reused across issues.

import { GAP, isGapHref } from "../lib/inline";

/** A string that must exist in both locales. Missing one is a type error. */
export type Localized = { en: string; zh: string };

/** A link whose label is translated but whose target is shared. */
export type LocalizedLink = { label: Localized; href: string };

/**
 * One block inside a section. Sections are documents, not paragraphs: a single
 * "Week 2 School Update" routinely carries a sub-heading, some prose, a list,
 * an image, another sub-heading, and more prose. Blocks render in array order,
 * so the array IS the running order.
 *
 * Prose, list items, sub-headings, and captions all accept the two inline
 * constructs from src/lib/inline.ts — `[label](href)` and `**emphasis**` — so a
 * link mid-sentence stays mid-sentence instead of being demoted to the link row.
 */
export type Block =
  /** A bold sub-heading within a section. Numbered when the section says so. */
  | { block: "subhead"; text: Localized }
  /** One paragraph. */
  | { block: "prose"; text: Localized }
  /** A bullet or numbered list. */
  | { block: "list"; items: Localized[]; ordered?: boolean }
  /**
   * An image mid-section — a campus map, a schedule table, a photo. `alt` is
   * required; describe what the image is FOR, not what it is called.
   */
  | { block: "image"; src: string; alt: Localized; caption?: Localized };

/**
 * Shared by every section. `links` renders as a row of underlined links below
 * the body — use it for downloads and supporting documents, and `cta` (callout
 * only) for the one action the section is actually asking for. A link that
 * belongs inside a sentence goes in the prose, not here.
 */
type SectionBase = { title: Localized; links?: LocalizedLink[] };

/**
 * One section of an issue. Sections render in array order.
 *
 * `prose` and `callout` are the general-purpose kinds and differ only in
 * presentation — callout gets a tinted box and a CTA button. `flyer` and
 * `sponsors` stay separate because their shape is genuinely fixed and their
 * presentation is worth defaulting rather than re-deciding weekly.
 *
 * If a week needs a shape none of these covers, add a kind here and a branch in
 * NewsletterIssuePage.astro — never smuggle markup into a string.
 */
export type IssueSection =
  /**
   * Narrative. The principal's note, a weekly update, general announcements.
   * Set `numbered: true` to number the sub-headings — that is how the school's
   * "General Announcements" section reads, as an ordered list of mini-items.
   */
  | (SectionBase & {
      kind: "prose";
      blocks: Block[];
      numbered?: boolean;
      /** e.g. "Warmly, Angela — Principal" — rendered in a lighter style. */
      signoff?: Localized;
    })
  /** A highlighted block with an optional button — volunteer calls, donations. */
  | (SectionBase & {
      kind: "callout";
      blocks: Block[];
      cta?: LocalizedLink;
    })
  /**
   * A pre-made flyer graphic (usually Canva). The same image is used in both
   * locales and in the email — only title, alt, and caption are translated.
   * `image` and `alt` are required: the graphic IS the section.
   */
  | (SectionBase & {
      kind: "flyer";
      /** Site-absolute path, e.g. "/images/news/enews-2026-08-14-flyer.jpg". */
      image: string;
      /**
       * Alt text. Flyers carry their own words, so describe the flyer's
       * PURPOSE for a screen reader rather than restating the title.
       */
      alt: Localized;
      /**
       * The flyer's key facts as real text — times, room numbers, join codes.
       * Text baked into a graphic is invisible to screen readers, to site
       * search, and to anyone who blocks images.
       */
      caption?: Localized;
    })
  /**
   * Sponsor logos. Recurring — the school's gold sponsors appear most weeks —
   * but confirm the roster each issue rather than assuming it is unchanged.
   * Omit a logo's `href` when the correct destination is not certain.
   */
  | (SectionBase & {
      kind: "sponsors";
      logos: { name: string; image: string; href?: string }[];
    });

export type NewsletterIssue = {
  /**
   * Issue date, ISO `YYYY-MM-DD`. Doubles as the URL slug
   * (/enews/2026-08-14/) and as the sort key, so it must be unique.
   */
  date: string;
  /** Human-readable date for display. */
  label: Localized;
  /**
   * One sentence, ~120–160 chars: used as the page's meta description and as
   * the blurb in the archive list. Lead with what's actually in the issue.
   */
  summary: Localized;
  /**
   * Present = this issue is a DRAFT, staged for review but not announced. The
   * value is a random review token, and while the issue is a draft that token
   * is the ENTIRE URL segment:
   *
   *   draft: "9f3a1c"  ->  /enews/9f3a1c/
   *
   * Two reasons it is not the date, or date + token:
   *
   *   1. A bare dated URL is trivially guessable. Once any issue is published
   *      the pattern is public, and there are only seven plausible dates in a
   *      week — a parent idly editing the URL bar should not be able to land on
   *      an unfinished draft.
   *   2. The send date is not known early in the week. Drafting starts before
   *      anyone knows whether the issue goes out Thursday or Friday, so a date
   *      in the URL would move mid-review and break links already circulated.
   *
   * Generate one per issue with:
   *
   *   openssl rand -hex 3
   *
   * It must be stored here rather than generated at build time, or every build
   * would move the URL and break those same links. `date` may be edited freely
   * while an issue is a draft — the review URL does not depend on it.
   *
   * A draft is built at that tokenized permalink in both locales, so it renders
   * on the real site rather than someone's laptop. But it is excluded from
   * /enews/ (which keeps showing the previous issue), from the archive, from
   * the footer link, and from the sitemap, and it carries `noindex`. The page
   * shows a "draft" banner so no reviewer mistakes it for published.
   *
   * Delete the field when the issue is approved and push again. The issue then
   * moves from /enews/9f3a1c/ to its clean dated URL (/enews/2026-08-21/) and
   * becomes the current issue — which also means the review URL starts 404ing.
   * That is intended: a review link should not outlive the review.
   */
  draft?: string;
  /**
   * Known unresolved items, in plain internal prose — "the classroom-use flyer
   * is being regenerated", "Chinese captions need the principal's read". Listed
   * loudly at the top of the draft page so a reviewer cannot miss them, and
   * they BLOCK publication (see the check below).
   *
   * Not `Localized`, unlike everything else here: these are operational notes
   * for whoever reviews the draft, never published copy — an issue carrying
   * gaps cannot be published at all.
   *
   * A missing link URL does NOT belong here. Mark it in place with the `TODO`
   * href sentinel (see src/lib/inline.ts) so the hole is visible in the
   * sentence it belongs to; it is collected automatically.
   */
  gaps?: string[];
  /**
   * Escape hatch: publish DESPITE open gaps, stating why. A string, not a
   * boolean, so the reason is recorded next to the decision.
   *
   * Requires an explicit instruction from the user. Never set this to clear a
   * build failure on your own initiative — the failure is the feature.
   */
  publishWithGaps?: string;
  sections: IssueSection[];
};

/**
 * Issues, newest first. Prepend new ones.
 *
 * While this is empty NO eNews pages are generated at all — /enews/ and
 * /enews/archive/ simply do not exist, rather than existing as empty shells.
 * The footer link is likewise suppressed until the first issue lands (see
 * Footer.astro). The first real issue turns the whole section on.
 */
export const issues: NewsletterIssue[] = [
  {
    // Week 2 of the 2026-27 school year. Replicated from the issue Angela
    // drafted in cloudHQ for the 8/22 class; she sends that version by email,
    // this is the web record.
    //
    // Flyer images are reused from the 2026-08-14 entry — Power Sculpt,
    // Language Support Club, Classroom Use Policy, Volunteer TA and the campus
    // map are unchanged this week. Their filenames still carry the 08-14 date,
    // which will read oddly once these recur for months; worth renaming to
    // undated paths in a separate pass.
    date: "2026-08-21",
    label: { en: "August 21, 2026", zh: "2026年8月21日" },
    draft: "019956",
    gaps: [
      "Volunteer team photo for this week is not in the repo yet — the 8/14 photo is a different group, so the volunteer section currently has no image. Add the file and an image block before publishing.",
      "Classroom Use Policy flyer is still the legacy graphic reading \"Irvington Hish School\" — being regenerated. Swap both its image and its caption when the replacement lands.",
    ],
    summary: {
      en: "Week 2: several classrooms have moved, staff parking now needs a placard, and the ANCCS Student Volunteer Service Award is open for applications.",
      zh: "第二週：多個班級教室有異動、教職員停車需出示停車證，北加州中文學校聯合會學生志工服務獎開始報名。",
    },
    sections: [
      {
        kind: "prose",
        title: { en: "A Note from the Principal", zh: "校長的話" },
        blocks: [
          {
            block: "prose",
            text: { en: "Dear FCS Families,", zh: "各位家長好：" },
          },
          {
            block: "prose",
            text: {
              en: "What an exciting first day of the new school year! It was wonderful to see familiar faces reunite and watch our new students settle into campus life — as principal, it truly warmed my heart, and thank you all for making the first day so memorable. You can check out more photos from the first day here: [First Day Photo Album](TODO: ask Angela for the album URL).",
              zh: "新學期的第一天真是充滿活力又令人興奮！看到熟悉的面孔重聚，也看到新生逐漸熟悉校園環境，身為校長真心替大家感到開心，也謝謝大家一起讓開學日如此難忘。更多開學日的精彩花絮照片，歡迎點擊以下連結觀看：[開學日照片集](TODO: ask Angela for the album URL)。",
            },
          },
          {
            block: "prose",
            text: {
              en: "I'd also like to take this opportunity to thank all of our parents for your patience and flexibility with the classroom adjustments on day one. Since we only officially gained access to some of our classrooms on the first day of school, our teachers had to quickly adapt and rearrange classroom assignments to make sure every class had a suitable space. We know last-minute changes can be inconvenient, and we truly appreciate your understanding as our team worked through the adjustments.",
              zh: "藉這個機會，也想特別感謝所有家長在開學第一天教室臨時調整時展現的耐心與配合。由於我們是開學當天才正式拿到部分教室的使用權，老師們必須在當天迅速應變、調整教室安排，確保每個班級都有合適的上課空間。我們知道臨時異動難免造成不便，也非常感謝大家的體諒，讓我們的團隊能順利完成調整。",
            },
          },
          {
            block: "prose",
            text: {
              en: "I also want to let you know that a few classroom assignments have since been confirmed and updated. You'll find the full details in the **Week 2 School Update** section below; please be sure to check the updated classroom roster there to confirm whether your child's classroom has changed. Parking reminders are in that section too.",
              zh: "另外也想提醒大家，開學後有幾間教室的安排已經確認更新，詳細內容會在下方「**第二週學校近況**」段落中說明，也請家長務必確認最新的教室名冊，確認孩子的教室是否有異動。停車相關提醒也在同一段落。",
            },
          },
          {
            block: "prose",
            text: {
              en: "Thank you again for your continued support and understanding — wishing everyone a wonderful new school year!",
              zh: "再次謝謝大家對學校一路以來的支持與體諒，祝福大家新學期一切順利！",
            },
          },
        ],
        signoff: {
          en: "Warmly, Angela — Principal, Fremont Chinese School",
          zh: "謹上　夏芷筠　費利蒙中文學校校長",
        },
      },
      {
        kind: "prose",
        title: { en: "Week 2 School Update", zh: "第二週學校近況" },
        blocks: [
          {
            block: "subhead",
            text: { en: "Classroom Changes", zh: "教室異動更新" },
          },
          {
            block: "prose",
            text: {
              en: "Based on feedback we received after the start of school, and taking each class's size and space needs into account, we've updated the classroom assignments for the following classes. Affected teachers have been notified individually:",
              zh: "根據開學後收集到的教室使用回饋，並考量各班學生人數與空間需求，我們調整了以下班級的教室安排（已個別通知任課老師）：",
            },
          },
          {
            block: "list",
            items: [
              {
                en: "**213 ⇄ 214:** Ms. Chiu (T1, T4) ⇄ Ms. Cheng (T2, T6)",
                zh: "**213 ⇄ 214：**邱智欣老師（T1、T4）⇄ 鄭怡文老師（T2、T6）",
              },
              {
                en: "**212 ⇄ 225:** Ms. Lee (T3, T7) ⇄ Ms. Yin (K1, T8)",
                zh: "**212 ⇄ 225：**李淑萍老師（T3、T7）⇄ 尹清賢老師（K1、T8）",
              },
              {
                en: "**207 ⇄ 204:** Ms. Wu (AC3) ⇄ Ms. Chang (AC1)",
                zh: "**207 ⇄ 204：**吳秀華老師（AC3）⇄ 張郁君老師（AC1）",
              },
            ],
          },
          {
            block: "prose",
            text: {
              en: "Two additional classroom changes were made because of the rooms themselves:",
              zh: "另外也有兩項教室調整，是因應教室本身的狀況所做的異動：",
            },
          },
          {
            block: "list",
            items: [
              {
                en: "**AC2** (Ms. Ding) moves from room 203 to **room 228** — room 203 had no desks set up.",
                zh: "**AC2 班**（丁皓婷老師）：原 203 教室因未配置課桌椅，改至 **228 教室**上課。",
              },
              {
                en: "**Abacus classes** (AB1, AB2, AB3 — Mr. Chen) move from room 216 to **room 227** — room 216 turned out to be a storage room and is not usable as a classroom.",
                zh: "**珠心算班**（AB1、AB2、AB3，陳萬宗老師）：原 216 教室確認為儲藏室、無法作為教室使用，改至 **227 教室**上課。",
              },
            ],
          },
          {
            block: "prose",
            text: {
              en: "Please check the class schedule below to confirm whether your child's classroom has changed. The **205 ⇄ 221** swap (Ms. Lu, AC4) is still under discussion — we'll follow up once it's confirmed.",
              zh: "麻煩家長參考下方的班級時間表，確認孩子班級的教室是否有異動。**205 ⇄ 221**（呂慧慈老師，AC4）的調整仍在討論中，確認後會再通知大家。",
            },
          },
          {
            block: "subhead",
            text: { en: "Parking Reminder", zh: "停車溫馨提醒" },
          },
          {
            block: "prose",
            text: {
              en: "A friendly reminder about parking: **starting this week, all staff and teachers need to display a parking placard**, and the school will be checking periodically. Please help us out by avoiding the staff and teacher parking areas, so our teachers always have a spot.",
              zh: "也藉這個機會提醒大家停車相關事宜：**從本週開始，所有教職員停車時都需出示停車證**，校方也會不定期查核。麻煩家長協助避免將車停放於教師／員工專用停車格，以免造成教職員停車不便。",
            },
          },
          {
            block: "prose",
            text: {
              en: "If you're dropping off, picking up, or need to park to come onto campus, please use the **Visitor Parking lot** on the Greenpark Dr side, as shown on the campus map below. Thank you for helping keep parking on campus running smoothly!",
              zh: "家長接送或需要下車進入校園時，請將車輛停放於**「家長／訪客停車場」**（Greenpark Dr 側，如下方校園地圖所示）。謝謝大家的配合，讓校園停車動線更加順暢！",
            },
          },
          {
            block: "image",
            src: "/images/news/enews-2026-08-14-campus-map.jpg",
            alt: {
              en: "Campus map marking visitor and staff parking, the blue drop-off route along Greenpark Drive, the green walking route, the new classrooms, and the wing closed for renovation.",
              zh: "校園地圖，標示家長／訪客與教職員停車場、沿 Greenpark Drive 的藍色接送路線、綠色行走路線、新教室位置，以及施工期間停用的舊教室區。",
            },
          },
        ],
        links: [
          {
            label: {
              en: "2026–2027 Class Schedule (PDF, updated 8/18)",
              zh: "2026–2027 學年度班級時間表（PDF，8/18 更新）",
            },
            href: "/FCS_2026-2027_Class_Schedule.pdf",
          },
          {
            label: {
              en: "Classes, teachers & classrooms",
              zh: "班級、教師與教室一覽",
            },
            href: "/student-resources",
          },
        ],
      },
      {
        kind: "prose",
        title: {
          en: "School Calendar 2026–2027",
          zh: "學校行事曆 2026–2027",
        },
        blocks: [
          {
            block: "prose",
            text: { en: "Coming event(s):", zh: "近期活動：" },
          },
          {
            block: "list",
            items: [
              {
                en: "**9/05/2026** — No school, Labor Day long weekend",
                zh: "**9/05/2026** — 停課，勞動節長週末",
              },
            ],
          },
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
        kind: "prose",
        title: { en: "General Announcements", zh: "其他公告" },
        numbered: true,
        blocks: [
          {
            block: "subhead",
            text: { en: "Volunteer Service Award", zh: "學生志工服務獎" },
          },
          {
            block: "prose",
            text: {
              en: "🔥 The Association of Northern California Chinese Schools (ANCCS) Student Volunteer Service Award is now open for applications. It recognises Chinese school students for their community service hours:",
              zh: "🔥 北加州中文學校聯合會學生志工服務獎開始報名！本獎項表彰中文學校學生的社區服務時數：",
            },
          },
          {
            block: "list",
            items: [
              {
                en: "**Teen** (ages 11–15): 🥉 Bronze 50–74 hrs ｜ 🥈 Silver 75–99 hrs ｜ 🥇 Gold 100+ hrs",
                zh: "**Teen**（年齡 11–15 歲）：🥉 銅獎 50–74 小時 ｜ 🥈 銀獎 75–99 小時 ｜ 🥇 金獎 100 小時以上",
              },
              {
                en: "**Young Adult** (16+): 🥉 Bronze 100–174 hrs ｜ 🥈 Silver 175–249 hrs ｜ 🥇 Gold 250+ hrs",
                zh: "**Young Adult**（年齡 16 歲以上）：🥉 銅獎 100–174 小時 ｜ 🥈 銀獎 175–249 小時 ｜ 🥇 金獎 250 小時以上",
              },
            ],
          },
          {
            block: "prose",
            text: {
              en: "Application deadline: **October 1, 2026**. Details at [www.anccs.org](https://www.anccs.org).",
              zh: "申請截止日：**2026 年 10 月 1 日**。詳情請上官網：[www.anccs.org](https://www.anccs.org)。",
            },
          },
          {
            block: "subhead",
            text: {
              en: "16th International Kids'N Fun Festival",
              zh: "第16屆國際童玩節",
            },
          },
          {
            block: "prose",
            text: {
              en: "📅 Saturday **8/22**, 10 AM – 4 PM ｜ 📍 Cupertino Memorial Park ｜ Free admission",
              zh: "📅 **8月22日（週六）** 10AM–4PM ｜ 📍 Cupertino Memorial Park ｜ 免費入場",
            },
          },
          {
            block: "prose",
            text: {
              en: "This year the festival doubles in size: 120+ booths and 20 countries, with cultural experiences, world cuisine, interactive games, and a special performance by the award-winning Hsinchu Taoshan Elementary Choir showcasing Tayal culture. RSVP online for a free pinwheel, plus a free Tesla parking shuttle. 👉 [www.kidsfunfest.org](https://www.kidsfunfest.org)",
              zh: "今年童玩節擴大規模，120+ 攤位、20 國文化單位共襄盛舉，有文化體驗、世界美食、互動遊戲，以及新竹縣桃山國小合唱團的泰雅文化表演。線上預約還送精美小風車，並有 Tesla 提供免費停車接駁。👉 [www.kidsfunfest.org](https://www.kidsfunfest.org)",
            },
          },
        ],
      },
      {
        kind: "callout",
        title: { en: "Join Our Volunteer Team", zh: "加入幹事團隊" },
        blocks: [
          {
            block: "prose",
            text: {
              en: "💪 **Help build the FCS community — volunteer roles for the 2026–27 school year.**",
              zh: "💪 **攜手打造費利蒙大家庭 — 2026–27 學年義工招募。**",
            },
          },
          {
            block: "prose",
            text: {
              en: "We're excited that many new parents have already joined our volunteer team this year — thank you! We can always use more help. From event planning to photography, translation to administration, there's a role to fit your skills and schedule. Parents matched to a good-fit role are also exempt from traffic and crossing duty. [See the open positions](https://drive.google.com/file/d/1500DSGZhrjpR4s9M4s8_OLxgXv7k5ePN/view).",
              zh: "我們很高興今年已有許多新家長加入幹事團隊，謝謝大家的付出！我們仍歡迎更多家長加入 — 從活動規劃、攝影、翻譯到行政，總能找到適合您的角色。找到合適崗位的家長，還可免除交通導護值勤。[查看義工職缺一覽](https://drive.google.com/file/d/1500DSGZhrjpR4s9M4s8_OLxgXv7k5ePN/view)。",
            },
          },
        ],
        cta: {
          label: {
            en: "Volunteer sign-up 2026–27",
            zh: "2026–27 學年義工報名表",
          },
          href: "https://forms.gle/MtdWWWUWagNWP1u8A",
        },
      },
      {
        kind: "flyer",
        title: {
          en: "Class Highlight: Power Sculpt",
          zh: "課程精選：燃力舞塑",
        },
        image: "/images/news/enews-2026-08-14-power-sculpt.jpg",
        alt: {
          en: "Flyer for the adult Power Sculpt class, listing the warm-up, core training, and Latin line dance segments, with a QR code to register.",
          zh: "成人「燃力舞塑」課程宣傳單，說明暖身、核心訓練與拉丁排舞三個段落，並附報名 QR code。",
        },
        caption: {
          en: "Saturdays, 11:10 AM – 12:00 PM, Irvington High School dance room. 15 min warm-up and dumbbell conditioning, 15 min core training, 20 min Latin line dance.",
          zh: "每週六上午 11:10–12:00，Irvington High School 舞蹈教室。15 分鐘暖身與啞鈴塑身、15 分鐘核心訓練、20 分鐘拉丁排舞。",
        },
      },
      {
        kind: "flyer",
        title: { en: "Language Support Club", zh: "語文輔導社" },
        image: "/images/news/enews-2026-08-14-language-support-club.jpg",
        alt: {
          en: "Flyer for the free Language Support Club, with photos of students at a past session holding their artwork.",
          zh: "免費「語文輔導社」宣傳單，內有學生於歷次活動中展示作品的照片。",
        },
        caption: {
          en: "Free. Every Saturday, 11:10 AM – 12:00 PM, Room 222. Join the Google Classroom with code **fwdggvj5**.",
          zh: "免費。每週六上午 11:10–12:00，教室 222。Google Classroom 代碼：**fwdggvj5**。",
        },
      },
      {
        kind: "flyer",
        title: { en: "Classroom Use Policy", zh: "教室使用規則" },
        image: "/images/news/enews-2026-08-14-classroom-use-guidelines.jpg",
        alt: {
          en: "Classroom use guidelines flyer listing nine rules for using Irvington High School classrooms.",
          zh: "教室使用規則宣傳單，列出使用 Irvington High School 教室的九項規定。",
        },
        caption: {
          en: "We share Irvington High School's classrooms: no food, leave desks and floors clean, return desks to where you found them, and don't use the equipment, drawers, fridge, microwave, or anything on the teacher's desk.",
          zh: "本校借用 Irvington High School 教室上課：請勿在教室內飲食，下課前清理桌面與地面、將桌椅歸回原位，並請勿使用教室內的設備、抽屜、冰箱、微波爐或講桌上的物品。",
        },
      },
      {
        kind: "flyer",
        title: { en: "Volunteer TA Needed", zh: "誠徵國高中義工小老師" },
        image: "/images/news/enews-2026-08-14-volunteer-ta.jpg",
        alt: {
          en: "Flyer recruiting high school student volunteer teaching assistants, with a QR code to register.",
          zh: "招募高中生義工小老師的宣傳單，並附報名 QR code。",
        },
        caption: {
          en: "Fremont Chinese School is looking for high school student volunteers to serve as Teaching Assistants — helping in the classroom, tutoring online, or supporting school events.",
          zh: "費利蒙中文學校誠徵高中生擔任義工小老師！無論是到班協助教學、線上輔導，或是協助活動進行，都歡迎加入我們的行列，一起為學弟妹的中文學習盡一份心力。",
        },
        links: [
          {
            label: { en: "Sign up to be a TA", zh: "義工小老師報名" },
            href: "https://docs.google.com/forms/d/e/1FAIpQLScN1hL35KbtGTcy_4Yq2KjQNrqra6G7rUf-TDfqcCGpRXOauA/viewform",
          },
        ],
      },
      {
        kind: "callout",
        title: {
          en: "Donate & Double Your Contribution",
          zh: "捐款與雙倍貢獻",
        },
        blocks: [
          {
            block: "prose",
            text: {
              en: "FCS is a non-profit 501(c) organization. Donations are tax-deductible (IRS tax ID: **94-2978949**) and help Fremont Chinese School continue to operate, teach Chinese courses, and pass on Chinese culture.",
              zh: "費利蒙中文學校是一家非營利性 501(c) 組織。您可以透過向費利蒙中文學校捐款來享受稅務抵減（IRS tax ID: **94-2978949**）。您的捐款將幫助本校繼續運營、教授中文課程並傳承中華文化。",
            },
          },
          {
            block: "prose",
            text: {
              en: "**Double your contribution:** thank you for volunteering at school! Your employer may offer volunteer cash rewards — please consider donating those rewards to Fremont Chinese School. [Instructions and an example](https://docs.google.com/presentation/d/1Op2TlZ4wFSz7epqziWHmEauqEa5FnqRJ5yJofqQhpqs/edit).",
              zh: "**雙倍貢獻：**感謝您在學校擔任義工！您的雇主也許提供義工獎勵金，歡迎將這筆獎勵金捐助給學校。[捐款方式說明與範例](https://docs.google.com/presentation/d/1Op2TlZ4wFSz7epqziWHmEauqEa5FnqRJ5yJofqQhpqs/edit)。",
            },
          },
        ],
        cta: {
          label: { en: "Donate", zh: "前往捐款" },
          href: "/donate",
        },
      },
      {
        kind: "sponsors",
        title: {
          en: "2026 Yearbook Gold Sponsors",
          zh: "2026 年刊金牌贊助商",
        },
        logos: [
          {
            name: "IvyMAX 飛達教育",
            image: "/images/sponsors/ivymax.jpg",
            href: "https://ivymax.com",
          },
          {
            name: "Fremont United Auto Service Inc. 聯合汽車修理中心",
            image: "/images/sponsors/fremont-united-auto.jpg",
            href: "https://www.fremontunitedautoservice.com/",
          },
        ],
      },
    ],
  },
  {
    // First issue of the 2026-27 school year. Reproduced from the email sent
    // 2026-08-14 00:28 PT ahead of the 8/15 first day of school.
    //
    // Published 2026-08-20, after the fact: the original went out by email
    // through the school's previous mail tool, so this entry is the web record
    // of it rather than something the site announced first.
    //
    // PENDING: the Classroom Use Policy graphic is a legacy flyer that has been
    // wrong for years ("Irvington Hish School") and is being regenerated. When
    // the replacement lands, swap both its image AND its caption — the caption
    // paraphrases the rules the old graphic lists, so a rules change makes it
    // wrong in a way the build cannot catch.
    date: "2026-08-14",
    label: { en: "August 14, 2026", zh: "2026年8月14日" },
    summary: {
      en: "Welcome to 2026–27. School starts Saturday, August 15 — with new classroom numbers, a changed drop-off route, and a campus map to check before you arrive.",
      zh: "2026–27 學年 8 月 15 日（週六）開學：教室編號有變動、接送與步行動線調整，請提前查看校園地圖與班級時間表。",
    },
    sections: [
      {
        kind: "prose",
        title: { en: "A Note from the Principal", zh: "校長的話" },
        blocks: [
          {
            block: "prose",
            text: {
              en: "Dear FCS Families,",
              zh: "親愛的費利蒙中文學校家長們：",
            },
          },
          {
            block: "prose",
            text: {
              en: "Welcome to the 2026–2027 school year! I'm honored to step into the role of Principal at Fremont Chinese School, and I'm looking forward to getting to know our students, families, and staff in the weeks ahead.",
              zh: "歡迎大家蒞臨 2026–2027 學年度！我很榮幸接任本校校長一職，期待在接下來的日子裡與各位學生、家長及教職員相識相知。",
            },
          },
          {
            block: "prose",
            text: {
              en: "Before we dive into the school year, I want to give you an important heads-up about **Saturday, August 15 — our first day of school**. Because of the ongoing construction on campus, a few things will look different this year. Please read the sections below carefully, and please don't hesitate to email me directly at [Principal@fremontchineseschool.org](mailto:Principal@fremontchineseschool.org) if you have any questions.",
              zh: "在正式開學之前，我想先提醒大家一個重要事項：由於校園內持續進行的施工工程，今年的 **8 月 15 日（星期六）開學日**將會有些不同之處，懇請家長們仔細閱讀以下說明。若有任何疑問，歡迎隨時來信 [Principal@fremontchineseschool.org](mailto:Principal@fremontchineseschool.org) 與我聯繫。",
            },
          },
          {
            block: "prose",
            text: {
              en: "Thank you for your patience as we navigate these changes together, and I can't wait to see everyone on Saturday! 🚀",
              zh: "感謝大家在我們共同適應這些變化的過程中給予的耐心與體諒，期待星期六與大家見面！🚀",
            },
          },
        ],
        signoff: {
          en: "Warmly, Angela — Principal, Fremont Chinese School",
          zh: "謹上　夏芷筠　費利蒙中文學校校長",
        },
      },
      {
        kind: "prose",
        title: {
          en: "First Day of School — Saturday, August 15, 2026",
          zh: "開學首日資訊 — 2026年8月15日（週六）",
        },
        blocks: [
          {
            block: "image",
            src: "/images/news/enews-2026-08-14-campus-map.jpg",
            alt: {
              en: "Campus map marking visitor and staff parking, the blue drop-off route along Greenpark Drive, the green walking route, the new classrooms, and the wing closed for renovation.",
              zh: "校園地圖，標示家長／訪客與教職員停車場、沿 Greenpark Drive 的藍色接送路線、綠色行走路線、新教室位置，以及施工期間停用的舊教室區。",
            },
          },
          {
            block: "prose",
            text: {
              en: "**Class start times vary by class.** Please check the 2026–2027 Class Schedule below to confirm your child's exact start time, teacher, and classroom.",
              zh: "**各班上課時間不同。**請查閱下方的 2026–2027 學年度班級時間表，確認貴子女的上課時間、教師及教室。",
            },
          },
          {
            block: "prose",
            text: {
              en: "⚠️ **Important: classroom numbers have changed.** Because of the ongoing construction, several classes have been reassigned to new rooms this year. If you received a class/classroom assignment email earlier from our registration team, please note that it may reference the old room numbers. Before Saturday, please double-check your child's current classroom on the schedule, then locate that room on the campus map above.",
              zh: "⚠️ **重要提醒：教室編號有變動。**由於校園施工，今年多個班級的教室已重新分配。若您先前收到註冊組寄發的班級／教室通知信，請注意信中所列可能為「舊」教室編號。請於星期六前，先查閱時間表確認貴子女目前的教室編號，再依照上方校園地圖找到該教室位置。",
            },
          },
          {
            block: "prose",
            text: {
              en: "**Please plan to arrive a little earlier than usual.** With new room locations and walking routes, we want to make sure every family has enough time to find their classroom comfortably before class starts.",
              zh: "**請提早到校。**由於教室位置及步行路線有所變更，懇請家長們提早出發，以確保有充裕時間帶孩子找到教室。",
            },
          },
        ],
        links: [
          {
            label: {
              en: "2026–2027 Class Schedule (PDF)",
              zh: "2026–2027 學年度班級時間表（PDF）",
            },
            href: "/FCS_2026-2027_Class_Schedule.pdf",
          },
          {
            label: {
              en: "Classes, teachers & classrooms",
              zh: "班級、教師與教室一覽",
            },
            href: "/student-resources",
          },
        ],
      },
      {
        kind: "prose",
        title: {
          en: "Parking, Drop-off & Walking Routes",
          zh: "停車、接送與步行路線",
        },
        blocks: [
          {
            block: "prose",
            text: {
              en: "Parking areas and drop-off/pick-up locations have also changed. Please see the campus map above and the details below:",
              zh: "停車區域及接送地點同樣有所調整，請參考上方校園地圖及以下說明：",
            },
          },
          {
            block: "list",
            items: [
              {
                en: "**Parking:** as in years past, parents and visitors must park in the Visitor Parking area. Staff Parking is reserved for teachers and staff displaying a valid placard.",
                zh: "**停車：**與往年相同，家長／訪客請停放於「家長／訪客停車場」(Visitor Parking)。教師／員工停車場僅供持有停車證之教職員使用。",
              },
              {
                en: "**Drop-off:** if you'd like to drop your child off closer to the classrooms, please follow the blue Drop Off Route shown on the map. For everyone's safety, please stay at or below the posted speed limit.",
                zh: "**接送：**若您想將孩子送至較靠近教室的地點，請依照地圖上的藍色「接送路線」(Drop Off Route) 行駛。為了大家的安全，請務必遵守速限。",
              },
              {
                en: "**Walking in:** if you're parking and walking your child in, please follow the green Walking Route shown on the map to reach the new classrooms.",
                zh: "**步行入校：**若您計畫停車後陪同孩子步行到教室，請依照地圖上的綠色「行走路線」(Walking Route) 前往新教室。",
              },
            ],
          },
        ],
      },
      {
        kind: "prose",
        title: {
          en: "School Calendar 2026–2027",
          zh: "學校行事曆 2026–2027",
        },
        blocks: [
          {
            block: "prose",
            text: { en: "Coming event(s):", zh: "近期活動：" },
          },
          {
            block: "list",
            items: [
              {
                en: "**8/15/2026** — First day of the school year 🎉",
                zh: "**8/15/2026** — 開學首日，第一天上課 🎉",
              },
              {
                en: "**9/05/2026** — No school, Labor Day long weekend",
                zh: "**9/05/2026** — 停課，勞動節長週末",
              },
            ],
          },
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
        kind: "callout",
        title: { en: "Join Our Volunteer Team", zh: "加入幹事團隊" },
        blocks: [
          {
            block: "image",
            src: "/images/news/enews-2026-08-14-volunteer-team.jpg",
            alt: {
              en: "FCS parent volunteers and staff standing together behind a Fremont Chinese School banner.",
              zh: "費利蒙中文學校家長義工與教職員在校旗前合影。",
            },
          },
          {
            block: "prose",
            text: {
              en: "💪 **Help build the FCS community — volunteer roles for the 2026–27 school year.**",
              zh: "💪 **攜手打造費利蒙大家庭 — 2026–27 學年義工招募。**",
            },
          },
          {
            block: "prose",
            text: {
              en: "We're excited that many new parents have already joined our volunteer team this year — thank you! We can always use more help. From event planning to photography, translation to administration, there's a role to fit your skills and schedule. Parents matched to a good-fit role are also exempt from traffic and crossing duty.",
              zh: "我們很高興今年已有許多新家長加入幹事團隊，謝謝大家的付出！我們仍歡迎更多家長加入 — 從活動規劃、攝影、翻譯到行政，總能找到適合您的角色。找到合適崗位的家長，還可免除交通導護值勤。",
            },
          },
        ],
        links: [
          {
            label: { en: "See open volunteer positions", zh: "查看義工職缺一覽" },
            href: "https://drive.google.com/file/d/1500DSGZhrjpR4s9M4s8_OLxgXv7k5ePN/view",
          },
        ],
        cta: {
          label: {
            en: "Volunteer sign-up 2026–27",
            zh: "2026–27 學年義工報名表",
          },
          href: "https://forms.gle/MtdWWWUWagNWP1u8A",
        },
      },
      {
        kind: "flyer",
        title: {
          en: "Class Highlight: Power Sculpt",
          zh: "課程精選：燃力舞塑",
        },
        image: "/images/news/enews-2026-08-14-power-sculpt.jpg",
        alt: {
          en: "Flyer for the adult Power Sculpt class, listing the warm-up, core training, and Latin line dance segments, with a QR code to register.",
          zh: "成人「燃力舞塑」課程宣傳單，說明暖身、核心訓練與拉丁排舞三個段落，並附報名 QR code。",
        },
        caption: {
          en: "Saturdays, 11:10 AM – 12:00 PM, Irvington High School dance room. 15 min warm-up and dumbbell conditioning, 15 min core training, 20 min Latin line dance.",
          zh: "每週六上午 11:10–12:00，Irvington High School 舞蹈教室。15 分鐘暖身與啞鈴塑身、15 分鐘核心訓練、20 分鐘拉丁排舞。",
        },
      },
      {
        kind: "flyer",
        title: { en: "Language Support Club", zh: "語文輔導社" },
        image: "/images/news/enews-2026-08-14-language-support-club.jpg",
        alt: {
          en: "Flyer for the free Language Support Club, with photos of students at a past session holding their artwork.",
          zh: "免費「語文輔導社」宣傳單，內有學生於歷次活動中展示作品的照片。",
        },
        caption: {
          en: "Free. Every Saturday, 11:10 AM – 12:00 PM, Room 222 — no club in week 1 (8/15). Join the Google Classroom with code **fwdggvj5**.",
          zh: "免費。每週六上午 11:10–12:00，教室 222 — 第一週（8/15）不開課。Google Classroom 代碼：**fwdggvj5**。",
        },
      },
      {
        kind: "flyer",
        title: { en: "Classroom Use Policy", zh: "教室使用規則" },
        image: "/images/news/enews-2026-08-14-classroom-use-guidelines.jpg",
        alt: {
          en: "Classroom use guidelines flyer listing nine rules for using Irvington High School classrooms.",
          zh: "教室使用規則宣傳單，列出使用 Irvington High School 教室的九項規定。",
        },
        caption: {
          en: "We share Irvington High School's classrooms: no food, leave desks and floors clean, return desks to where you found them, and don't use the equipment, drawers, fridge, microwave, or anything on the teacher's desk.",
          zh: "本校借用 Irvington High School 教室上課：請勿在教室內飲食，下課前清理桌面與地面、將桌椅歸回原位，並請勿使用教室內的設備、抽屜、冰箱、微波爐或講桌上的物品。",
        },
      },
      {
        kind: "flyer",
        title: { en: "Volunteer TA Needed", zh: "誠徵國高中義工小老師" },
        image: "/images/news/enews-2026-08-14-volunteer-ta.jpg",
        alt: {
          en: "Flyer recruiting high school student volunteer teaching assistants, with a QR code to register.",
          zh: "招募高中生義工小老師的宣傳單，並附報名 QR code。",
        },
        caption: {
          en: "Fremont Chinese School is looking for high school student volunteers to serve as Teaching Assistants — helping in the classroom, tutoring online, or supporting school events.",
          zh: "費利蒙中文學校誠徵高中生擔任義工小老師！無論是到班協助教學、線上輔導，或是協助活動進行，都歡迎加入我們的行列，一起為學弟妹的中文學習盡一份心力。",
        },
        links: [
          {
            label: { en: "Sign up to be a TA", zh: "義工小老師報名" },
            href: "https://docs.google.com/forms/d/e/1FAIpQLScN1hL35KbtGTcy_4Yq2KjQNrqra6G7rUf-TDfqcCGpRXOauA/viewform",
          },
        ],
      },
      {
        kind: "callout",
        title: {
          en: "Donate & Double Your Contribution",
          zh: "捐款與雙倍貢獻",
        },
        blocks: [
          {
            block: "prose",
            text: {
              en: "FCS is a non-profit 501(c) organization. Donations are tax-deductible (IRS tax ID: **94-2978949**) and help Fremont Chinese School continue to operate, teach Chinese courses, and pass on Chinese culture.",
              zh: "費利蒙中文學校是一家非營利性 501(c) 組織。您可以透過向費利蒙中文學校捐款來享受稅務抵減（IRS tax ID: **94-2978949**）。您的捐款將幫助本校繼續運營、教授中文課程並傳承中華文化。",
            },
          },
          {
            block: "prose",
            text: {
              en: "**Double your contribution:** thank you for volunteering at school! Your employer may offer volunteer cash rewards — please consider donating those rewards to Fremont Chinese School.",
              zh: "**雙倍貢獻：**感謝您在學校擔任義工！您的雇主也許提供義工獎勵金，歡迎將這筆獎勵金捐助給學校。",
            },
          },
        ],
        links: [
          {
            label: {
              en: "How to donate employer volunteer rewards (instructions and example)",
              zh: "義工獎勵金捐款方式說明與範例",
            },
            href: "https://docs.google.com/presentation/d/1Op2TlZ4wFSz7epqziWHmEauqEa5FnqRJ5yJofqQhpqs/edit",
          },
        ],
        cta: {
          label: { en: "Donate", zh: "前往捐款" },
          href: "/donate",
        },
      },
      {
        kind: "sponsors",
        title: {
          en: "2026 Yearbook Gold Sponsors",
          zh: "2026 年刊金牌贊助商",
        },
        logos: [
          {
            name: "IvyMAX 飛達教育",
            image: "/images/sponsors/ivymax.jpg",
            href: "https://ivymax.com",
          },
          {
            // The source email linked this logo to ichenartacademy.com, a
            // different business. Correct URL confirmed by the school
            // 2026-08-20. A longtime, very supportive sponsor — expect it to
            // recur, but confirm the roster each issue.
            name: "Fremont United Auto Service Inc. 聯合汽車修理中心",
            image: "/images/sponsors/fremont-united-auto.jpg",
            href: "https://www.fremontunitedautoservice.com/",
          },
        ],
      },
    ],
  },
];

/**
 * Every issue, drafts included, newest first. Only the route generator needs
 * this — it builds a permalink for drafts too. Everything reader-facing should
 * use `publishedIssues` so a draft never leaks into a listing.
 */
export const sortedIssues: NewsletterIssue[] = [...issues].sort((a, b) =>
  b.date.localeCompare(a.date),
);

/** Approved issues only, newest first. */
export const publishedIssues: NewsletterIssue[] = sortedIssues.filter(
  (i) => !i.draft,
);

/** The issue /enews/ shows. `undefined` until something is published. */
export const latestIssue: NewsletterIssue | undefined = publishedIssues[0];

/**
 * True once at least one issue is PUBLISHED — gates the footer link and the
 * /news card. A repo holding nothing but drafts still shows no eNews section.
 */
export const hasIssues = publishedIssues.length > 0;

/**
 * The URL segment for an issue: the review token while it is a draft, the bare
 * date once published. Single source of truth for issue URLs — routes, links,
 * and the sitemap filter all derive from this.
 *
 * The two forms cannot collide: tokens are hex, dates are YYYY-MM-DD, and
 * "archive" is neither.
 */
export function issueSlug(issue: NewsletterIssue): string {
  return issue.draft ?? issue.date;
}

/** Walk every string in a value, however deeply nested. */
function* walkStrings(value: unknown): Generator<string> {
  if (typeof value === "string") yield value;
  else if (Array.isArray(value)) for (const v of value) yield* walkStrings(v);
  else if (value && typeof value === "object")
    for (const v of Object.values(value)) yield* walkStrings(v);
}

/**
 * Everything unresolved about an issue: the notes in `gaps`, plus every link
 * still carrying the `TODO` sentinel, found by scanning all copy so a marker
 * cannot be missed because someone forgot to also list it.
 */
export function collectGaps(issue: NewsletterIssue): string[] {
  const found = [...(issue.gaps ?? [])];

  // One link needing a URL is ONE gap, even though it appears twice — once per
  // locale. Group by the marker's note so the count matches the number of
  // things a human has to go and find, and list both labels on the line.
  const byNote = new Map<string, string[]>();
  for (const text of walkStrings(issue.sections)) {
    for (const m of text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
      const [, label, href] = m;
      if (!isGapHref(href)) continue;
      const note = href.slice(GAP.length).replace(/^:\s*/, "");
      const labels = byNote.get(note) ?? [];
      if (!labels.includes(label)) labels.push(label);
      byNote.set(note, labels);
    }
  }
  for (const [note, labels] of byNote) {
    const named = labels.map((l) => `"${l}"`).join(" / ");
    found.push(`Missing link target for ${named}${note ? ` — ${note}` : ""}`);
  }
  return found;
}

// Publication gate. An issue with open gaps may exist as a DRAFT — that is the
// point, so reviewers can see the holes on the real page — but must not be
// published. Removing `draft` while gaps remain fails the build here rather
// than quietly shipping "link missing" to parents.
//
// `publishWithGaps` overrides it, and requires a stated reason.
for (const issue of issues) {
  if (issue.draft || issue.publishWithGaps) continue;
  const gaps = collectGaps(issue);
  if (gaps.length > 0) {
    throw new Error(
      `[enews] Refusing to publish the ${issue.date} issue with ` +
        `${gaps.length} unresolved gap(s):\n` +
        gaps.map((g) => `  - ${g}`).join("\n") +
        `\n\nResolve them, or keep the issue staged by restoring its \`draft\` ` +
        `token. To publish anyway, set \`publishWithGaps\` on the issue to the ` +
        `reason — but only when the user has explicitly asked for that.`,
    );
  }
}

/** Look up one issue by its URL slug. Finds drafts (by tokenized slug) too. */
export function findIssue(slug: string): NewsletterIssue | undefined {
  return sortedIssues.find((i) => issueSlug(i) === slug);
}

/**
 * Neighbours of an issue in publication order, for the prev/next footer.
 * `newer`/`older` rather than prev/next — less ambiguous on a dated archive.
 * Walks published issues only, so a draft is never linked from a live page and
 * has no neighbours of its own.
 */
export function issueNeighbours(date: string): {
  newer?: NewsletterIssue;
  older?: NewsletterIssue;
} {
  const i = publishedIssues.findIndex((x) => x.date === date);
  if (i === -1) return {};
  return { newer: publishedIssues[i - 1], older: publishedIssues[i + 1] };
}
