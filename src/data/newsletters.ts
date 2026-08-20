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

/** A string that must exist in both locales. Missing one is a type error. */
export type Localized = { en: string; zh: string };

/** A link whose label is translated but whose target is shared. */
export type LocalizedLink = { label: Localized; href: string };

/**
 * Image fields, available on most section kinds — a campus map above the
 * first-day notes, a team photo above the volunteer call, or the flyer that IS
 * the section. `alt` is mandatory whenever `image` is set: the union makes an
 * undescribed image a build error, the same way `Localized` makes a missing
 * translation one.
 */
type ImageFields =
  | { image: string; alt: Localized; caption?: Localized }
  | { image?: undefined; alt?: undefined; caption?: undefined };

/**
 * Shared by every section. `links` renders as a row of underlined links below
 * the body — use it for downloads and supporting documents, and use a `cta`
 * (callout only) for the one action the section is actually asking for.
 */
type SectionBase = { title: Localized; links?: LocalizedLink[] };

/**
 * One block of an issue. Sections render in array order, so the array IS the
 * running order of the page. Every kind is optional and repeatable — a quiet
 * week might be a single `note`; a busy one might carry four `flyer`s.
 *
 * Every kind renders in the same order: title, image + caption, body, links,
 * then cta. If a week needs a shape none of these covers, add a kind here and
 * a branch in NewsletterIssuePage.astro — never smuggle markup into a string.
 */
export type IssueSection =
  /** Prose. The principal's note, or any narrative block. */
  | (SectionBase &
      ImageFields & {
        kind: "note";
        /** One entry per paragraph. */
        paragraphs: Localized[];
        /** e.g. "Warmly, Angela Ha, Principal" — rendered in a lighter style. */
        signoff?: Localized;
      })
  /** A list — dates, deadlines, logistics. */
  | (SectionBase &
      ImageFields & {
        kind: "bullets";
        intro?: Localized;
        items: Localized[];
      })
  /**
   * A pre-made flyer graphic (usually Canva). The same image is used in both
   * locales and in the email — only title, alt, and caption are translated.
   * `image` and `alt` are required here, since the graphic IS the section.
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
       * Put the flyer's key facts here as real text — times, room numbers,
       * join codes. Text baked into a graphic is invisible to screen readers,
       * to site search, and to anyone who blocks images.
       */
      caption?: Localized;
    })
  /** A highlighted block with an optional button — volunteer calls, donations. */
  | (SectionBase &
      ImageFields & {
        kind: "callout";
        paragraphs: Localized[];
        cta?: LocalizedLink;
      })
  /** Sponsor logos. Conditional — only on weeks with a sponsor update. */
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
   * Set `draft: true` to stage an issue for review WITHOUT announcing it.
   *
   * A draft is built at its own permalink — /enews/<date>/ and
   * /zh/enews/<date>/ — so the URL can be shared with staff, and it renders on
   * the real site rather than someone's laptop. But it is excluded from /enews/
   * (which keeps showing the previous issue), from the archive, from the footer
   * link, from the sitemap, and it carries a `noindex` so search engines skip
   * it. The page itself shows a "draft" banner so no reviewer mistakes it for
   * published.
   *
   * Delete the flag (don't set it to false) when the issue is approved, and
   * push again. That is the moment it becomes the current issue.
   */
  draft?: boolean;
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
    // First issue of the 2026-27 school year. Reproduced from the email sent
    // 2026-08-14 00:28 PT ahead of the 8/15 first day of school.
    date: "2026-08-14",
    label: { en: "August 14, 2026", zh: "2026年8月14日" },
    // Published 2026-08-20, after the fact: the original went out by email on
    // 2026-08-14 through the school's previous mail tool, so this entry is the
    // web record of it rather than something the site announced first.
    //
    // PENDING: the Classroom Use Policy graphic is a legacy flyer that has been
    // wrong for years and is being regenerated. When the replacement lands,
    // swap both its image AND its caption — the caption paraphrases the rules
    // the old graphic lists, so a rules change makes it wrong in a way the
    // build cannot catch.
    summary: {
      en: "Welcome to 2026–27. School starts Saturday, August 15 — with new classroom numbers, a changed drop-off route, and a campus map to check before you arrive.",
      zh: "2026–27 學年 8 月 15 日（週六）開學：教室編號有變動、接送與步行動線調整，請提前查看校園地圖與班級時間表。",
    },
    sections: [
      {
        kind: "note",
        title: { en: "A Note from the Principal", zh: "校長的話" },
        paragraphs: [
          {
            en: "Dear FCS Families,",
            zh: "親愛的費利蒙中文學校家長們：",
          },
          {
            en: "Welcome to the 2026–2027 school year! I'm honored to step into the role of Principal at Fremont Chinese School, and I'm looking forward to getting to know our students, families, and staff in the weeks ahead.",
            zh: "歡迎大家蒞臨 2026–2027 學年度！我很榮幸接任本校校長一職，期待在接下來的日子裡與各位學生、家長及教職員相識相知。",
          },
          {
            en: "Before we dive into the school year, I want to give you an important heads-up about Saturday, August 15 — our first day of school. Because of the ongoing construction on campus, a few things will look different this year. Please read the sections below carefully, and please don't hesitate to email me directly at Principal@fremontchineseschool.org if you have any questions.",
            zh: "在正式開學之前，我想先提醒大家一個重要事項：由於校園內持續進行的施工工程，今年的 8 月 15 日（星期六）開學日將會有些不同之處，懇請家長們仔細閱讀以下說明。若有任何疑問，歡迎隨時來信 Principal@fremontchineseschool.org 與我聯繫。",
          },
          {
            en: "Thank you for your patience as we navigate these changes together, and I can't wait to see everyone on Saturday! 🚀",
            zh: "感謝大家在我們共同適應這些變化的過程中給予的耐心與體諒，期待星期六與大家見面！🚀",
          },
        ],
        signoff: {
          en: "Warmly, Angela — Principal, Fremont Chinese School",
          zh: "謹上　夏芷筠　費利蒙中文學校校長",
        },
      },
      {
        kind: "note",
        title: {
          en: "First Day of School — Saturday, August 15, 2026",
          zh: "開學首日資訊 — 2026年8月15日（週六）",
        },
        image: "/images/news/enews-2026-08-14-campus-map.jpg",
        alt: {
          en: "Campus map marking visitor and staff parking, the blue drop-off route along Greenpark Drive, the green walking route, the new classrooms, and the wing closed for renovation.",
          zh: "校園地圖，標示家長／訪客與教職員停車場、沿 Greenpark Drive 的藍色接送路線、綠色行走路線、新教室位置，以及施工期間停用的舊教室區。",
        },
        paragraphs: [
          {
            en: "Class start times vary by class. Please check the 2026–2027 Class Schedule below to confirm your child's exact start time, teacher, and classroom.",
            zh: "各班上課時間不同。請查閱下方的 2026–2027 學年度班級時間表，確認貴子女的上課時間、教師及教室。",
          },
          {
            en: "⚠️ Important: classroom numbers have changed. Because of the ongoing construction, several classes have been reassigned to new rooms this year. If you received a class/classroom assignment email earlier from our registration team, please note that it may reference the old room numbers. Before Saturday, please double-check your child's current classroom on the schedule, then locate that room on the campus map above.",
            zh: "⚠️ 重要提醒：教室編號有變動。由於校園施工，今年多個班級的教室已重新分配。若您先前收到註冊組寄發的班級／教室通知信，請注意信中所列可能為「舊」教室編號。請於星期六前，先查閱時間表確認貴子女目前的教室編號，再依照上方校園地圖找到該教室位置。",
          },
          {
            en: "Please plan to arrive a little earlier than usual. With new room locations and walking routes, we want to make sure every family has enough time to find their classroom comfortably before class starts.",
            zh: "請提早到校。由於教室位置及步行路線有所變更，懇請家長們提早出發，以確保有充裕時間帶孩子找到教室。",
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
        kind: "bullets",
        title: {
          en: "Parking, Drop-off & Walking Routes",
          zh: "停車、接送與步行路線",
        },
        intro: {
          en: "Parking areas and drop-off/pick-up locations have also changed. Please see the campus map above and the details below:",
          zh: "停車區域及接送地點同樣有所調整，請參考上方校園地圖及以下說明：",
        },
        items: [
          {
            en: "Parking: as in years past, parents and visitors must park in the Visitor Parking area. Staff Parking is reserved for teachers and staff displaying a valid placard.",
            zh: "停車：與往年相同，家長／訪客請停放於「家長／訪客停車場」(Visitor Parking)。教師／員工停車場僅供持有停車證之教職員使用。",
          },
          {
            en: "Drop-off: if you'd like to drop your child off closer to the classrooms, please follow the blue Drop Off Route shown on the map. For everyone's safety, please stay at or below the posted speed limit.",
            zh: "接送：若您想將孩子送至較靠近教室的地點，請依照地圖上的藍色「接送路線」(Drop Off Route) 行駛。為了大家的安全，請務必遵守速限。",
          },
          {
            en: "Walking in: if you're parking and walking your child in, please follow the green Walking Route shown on the map to reach the new classrooms.",
            zh: "步行入校：若您計畫停車後陪同孩子步行到教室，請依照地圖上的綠色「行走路線」(Walking Route) 前往新教室。",
          },
        ],
      },
      {
        kind: "bullets",
        title: {
          en: "School Calendar 2026–2027",
          zh: "學校行事曆 2026–2027",
        },
        intro: {
          en: "Coming event(s):",
          zh: "近期活動：",
        },
        items: [
          {
            en: "8/15/2026 — First day of the school year 🎉",
            zh: "8/15/2026 — 開學首日，第一天上課 🎉",
          },
          {
            en: "9/05/2026 — No school, Labor Day long weekend",
            zh: "9/05/2026 — 停課，勞動節長週末",
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
        image: "/images/news/enews-2026-08-14-volunteer-team.jpg",
        alt: {
          en: "FCS parent volunteers and staff standing together behind a Fremont Chinese School banner.",
          zh: "費利蒙中文學校家長義工與教職員在校旗前合影。",
        },
        paragraphs: [
          {
            en: "💪 Help build the FCS community — volunteer roles for the 2026–27 school year.",
            zh: "💪 攜手打造費利蒙大家庭 — 2026–27 學年義工招募。",
          },
          {
            en: "We're excited that many new parents have already joined our volunteer team this year — thank you! We can always use more help. From event planning to photography, translation to administration, there's a role to fit your skills and schedule. Parents matched to a good-fit role are also exempt from traffic and crossing duty.",
            zh: "我們很高興今年已有許多新家長加入幹事團隊，謝謝大家的付出！我們仍歡迎更多家長加入 — 從活動規劃、攝影、翻譯到行政，總能找到適合您的角色。找到合適崗位的家長，還可免除交通導護值勤。",
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
          en: "Free. Every Saturday, 11:10 AM – 12:00 PM, Room 222 — no club in week 1 (8/15). Join the Google Classroom with code fwdggvj5.",
          zh: "免費。每週六上午 11:10–12:00，教室 222 — 第一週（8/15）不開課。Google Classroom 代碼：fwdggvj5。",
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
        paragraphs: [
          {
            en: "FCS is a non-profit 501(c) organization. Donations are tax-deductible (IRS tax ID: 94-2978949) and help Fremont Chinese School continue to operate, teach Chinese courses, and pass on Chinese culture.",
            zh: "費利蒙中文學校是一家非營利性 501(c) 組織。您可以透過向費利蒙中文學校捐款來享受稅務抵減（IRS tax ID: 94-2978949）。您的捐款將幫助本校繼續運營、教授中文課程並傳承中華文化。",
          },
          {
            en: "Double your contribution: thank you for volunteering at school! Your employer may offer volunteer cash rewards — please consider donating those rewards to Fremont Chinese School.",
            zh: "雙倍貢獻：感謝您在學校擔任義工！您的雇主也許提供義工獎勵金，歡迎將這筆獎勵金捐助給學校。",
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
            // 2026-08-20.
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

/** Look up one issue by its date slug. Finds drafts too. */
export function findIssue(date: string): NewsletterIssue | undefined {
  return sortedIssues.find((i) => i.date === date);
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
