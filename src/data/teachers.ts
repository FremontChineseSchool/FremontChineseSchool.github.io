// Teacher roster, sourced from the school's "FCS 教師介紹表" document
// (re-synced 2026-08-12, when the school completed the remaining entries).
//
// Unlike most page copy — which lives in src/i18n/content.ts split into
// `content.en` / `content.zh` — each teacher here is a single record carrying
// BOTH locales. This is the same shape calendar.ts uses, and for the same
// reason: keeping a person's Chinese and English text adjacent is what stops
// the two from drifting when the roster is re-synced from the source doc.
// Page-level copy (title, intro) still lives in content.ts under `teachers`.
//
// Deliberately NOT stored here:
//
//   - Room numbers and class times. The class schedule on /student-resources is
//     the single source of truth for those; duplicating them here would
//     guarantee they drift apart.
//   - Email addresses. Held back pending a decision on publishing them.
//
// Bios are trimmed to a consistent length (~100–130 characters of Chinese /
// ~50–70 English words) from source entries that ranged from ~90 to ~700
// characters. Syllabus-style content from those same entries is kept out of
// `bio`; see src/data/proposed-changes.ts for the per-class notes still under
// review.
//
// PHOTOS. Every teacher now has one. They are NOT a consistent set: resolutions
// run from 268x386 to 1130x1279, backgrounds range from studio white to a
// Honolulu skyline, several are webcam stills, one has a video-call filter on
// it, and two are full-body shots rather than headshots. They are displayed
// with object-fit: cover inside a circle, so nothing is stretched — but a
// proper photo session would replace all 25. Where the default framing cuts
// badly (a face off-centre, a full-body pose), `photoFocus` sets
// object-position for that one image.
//
// The only edit made to the supplied files: five had a white margin baked into
// the image (吳秀華, 呂慧慈, 謝明暐, 沈燦, 張樂濱), which showed as a pale wedge
// inside the circle. Those were trimmed to their content bounding box —
// removing padding only, nothing of the subject.

import { content } from "../i18n/content";
import type { Lang } from "../i18n/ui";

/** Which block of the program a teacher belongs to, in display order. */
export type TeacherGroup = "language" | "ac" | "electives" | "online";

export type Teacher = {
  /** Stable slug — used as the card's anchor id and the photo filename. */
  id: string;
  /** 中文姓名, without the 老師 honorific (the template appends it). */
  nameZh: string;
  /**
   * English/romanized name exactly as the teacher writes it. Styles vary across
   * the roster (some use an English given name, some a romanized one, a few
   * both). Left verbatim on purpose — a person's own spelling of their name is
   * theirs to normalize, not ours.
   */
  nameEn: string;
  group: TeacherGroup;
  /** Class codes only. Resolved to full names via `classLabel()`. */
  classes: string[];
  /** Path under public/. Omit to fall back to a monogram. */
  photo?: string;
  /** object-position override, for photos the default framing crops badly. */
  photoFocus?: string;
  tagline?: { en: string; zh: string };
  bio?: { en: string; zh: string };
};

export const groupLabels: Record<TeacherGroup, { en: string; zh: string }> = {
  language: { en: "Chinese Language", zh: "中文課程" },
  ac: { en: "Accredited Curriculum (AC / 學分班)", zh: "AC 學分班" },
  electives: { en: "Electives", zh: "才藝選修" },
  online: { en: "Online Classes", zh: "網路課程" },
};

export const groupOrder: TeacherGroup[] = ["language", "ac", "electives", "online"];

/** Framing for photos where a centred square crop would cut the subject badly. */
export const defaultPhotoFocus = "50% 35%";

// --- Class-code labels ----------------------------------------------------
//
// Elective codes (P1, AB1, X2, e-CT1, …) are NOT listed here: they are read
// back out of `content[lang].electives` at render time so the elective list
// stays the one place those names are maintained. Only the language and AC
// codes — which exist nowhere else in the codebase — are spelled out below.

const ordinalsEn = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
const numeralsZh = ["一", "二", "三", "四", "五", "六", "七", "八"];

const coreClassLabels: Record<string, { en: string; zh: string }> = {
  PK: { en: "Pre-K", zh: "學前班" },
  K1: { en: "Kindergarten", zh: "幼稚園" },
  AP: { en: "AP Chinese", zh: "AP 中文" },
};

for (let i = 0; i < 8; i++) {
  const n = i + 1;
  // Full-Chinese track (T1–T8) and bilingual/CSL track (C1–C8).
  coreClassLabels[`T${n}`] = {
    en: `${ordinalsEn[i]} Grade — Full Chinese`,
    zh: `${numeralsZh[i]}年級（全中文班）`,
  };
  coreClassLabels[`C${n}`] = {
    en: `${ordinalsEn[i]} Grade — Bilingual`,
    zh: `${numeralsZh[i]}年級（雙語班）`,
  };
}

for (let i = 0; i < 4; i++) {
  coreClassLabels[`AC${i + 1}`] = {
    en: `Accredited Chinese ${i + 1}`,
    zh: `學分班${numeralsZh[i]}`,
  };
}

// Built once per locale on first use — the electives tree is a nested
// slots→classes structure and there is no reason to walk it per card.
const electiveLabelCache: Partial<Record<Lang, Record<string, string>>> = {};

function electiveLabels(lang: Lang): Record<string, string> {
  const cached = electiveLabelCache[lang];
  if (cached) return cached;

  const e = content[lang].electives;
  const map: Record<string, string> = {};
  for (const slot of [...e.slots, ...e.onlineSlots]) {
    for (const cls of slot.classes) map[cls.code] = cls.name;
  }
  electiveLabelCache[lang] = map;
  return map;
}

/**
 * Full display name for a class code. Falls back to the bare code if a teacher
 * is assigned to something the electives list doesn't know about, so an
 * unrecognized code shows up as itself rather than disappearing.
 */
export function classLabel(code: string, lang: Lang): string {
  return coreClassLabels[code]?.[lang] ?? electiveLabels(lang)[code] ?? code;
}

// --- Roster ---------------------------------------------------------------
// Ordered as the source document orders it: PK → K → T → C → AC → AP →
// electives → online, which is also roughly the order families read in.

export const teachers: Teacher[] = [
  {
    id: "vivian-chang",
    nameZh: "張筱薇",
    nameEn: "Ms. Vivian Chang",
    group: "language",
    classes: ["PK"],
    photo: "/images/teachers/vivian-chang.jpg",
    tagline: { en: "A child's first Chinese teacher", zh: "孩子的第一位中文老師" },
    bio: {
      en: "With extensive early-childhood teaching experience, Ms. Chang uses a five-senses approach — listening, speaking, singing, movement, and play — so children pick up Chinese naturally. She reads each child's emotions and pace carefully, helping them build a sense of security, confidence, and genuine interest in learning.",
      zh: "擁有豐富幼兒教學經驗的張老師，以五感教學帶領孩子透過聽、說、唱、跳、玩，自然學習中文。她細心理解每位孩子的情緒與發展步調，陪伴孩子建立安全感、自信與學習興趣，在充滿歡笑的課堂中快樂成長、愛上中文。",
    },
  },
  {
    id: "chinghsien-yin",
    nameZh: "尹清賢",
    nameEn: "Ms. Chinghsien Yin",
    group: "language",
    classes: ["K1", "T8"],
    photo: "/images/teachers/chinghsien-yin.jpg",
    tagline: { en: "A firm foundation for Chinese", zh: "穩固中文學習的基石" },
    bio: {
      en: "With some 32 years of teaching experience, Ms. Yin is one of the school's most senior teachers. She believes strong Chinese comes from a firm foundation and steady accumulation — from building Zhuyin and character recognition in Kindergarten to developing reading comprehension, recitation, and writing in 8th grade. Patience and care have always defined her classroom.",
      zh: "尹老師擁有約 32 年中文教學經驗，是費利蒙中文學校最資深的教師之一。她相信良好的中文能力來自穩固的基礎與持續的累積——從 K1 建立正確的注音與識字能力，到 T8 培養閱讀理解、朗讀技巧與寫作能力，每個階段都循序漸進。耐心、細心、用心，是她始終不變的教學特色。",
    },
  },
  {
    id: "sophie-chiu",
    nameZh: "邱智欣",
    nameEn: "Ms. Chih-hsin Sophie Chiu",
    group: "language",
    classes: ["T1", "T4"],
    photo: "/images/teachers/sophie-chiu.jpg",
    tagline: { en: "Opening the door to literacy", zh: "開啟孩子的識字之路" },
    bio: {
      en: "Ms. Chiu takes a step-by-step approach, guiding first-graders into reading and writing — starting with practicing their own names each day to build confidence. By fourth grade she introduces Hanyu Pinyin, so students can type in both Zhuyin and Pinyin and have more options open to them in later study.",
      zh: "邱老師以循序漸進的方式，帶領一年級孩子正式踏入識字與讀寫的世界，從每天練習寫自己的名字開始，建立閱讀與書寫的信心；到了四年級，再進一步教授漢語拼音，讓孩子除了注音之外也具備拼音輸入能力，為未來的中文學習增添更多選擇。",
    },
  },
  {
    id: "yvonne-cheng",
    nameZh: "鄭怡文",
    nameEn: "Ms. Yvonne Cheng",
    group: "language",
    classes: ["T2", "T6"],
    photo: "/images/teachers/yvonne-cheng.jpg",
    tagline: {
      en: "Making Chinese a skill children truly own",
      zh: "讓中文真正成為孩子的能力",
    },
    bio: {
      en: "Ms. Cheng draws on a wide range of interactive resources to build her students' Chinese across the board. Her classes combine multimedia materials, games, situational activities, and story performance, with guided questioning and group discussion that encourage students to think, analyze, and express themselves in Chinese — so the language becomes something they genuinely use.",
      zh: "鄭老師運用多元互動的教學資源，全面提升孩子的中文能力。課堂中結合多媒體教材、互動遊戲、情境活動與故事演出，並透過提問引導與小組討論，鼓勵學生以中文思考、分析與表達。她期望孩子不僅能流暢閱讀，更能自然運用所學寫出中文，讓中文成為日常生活中真正的語言。",
    },
  },
  {
    id: "shuping-lee",
    nameZh: "李淑萍",
    nameEn: "Ms. Shu Ping Lee",
    group: "language",
    classes: ["T3", "T7"],
    photo: "/images/teachers/shuping-lee.jpg",
    tagline: { en: "Teaching to each child's strengths", zh: "因材施教，展現學習成果" },
    bio: {
      en: "Ms. Lee taught for 10 years in Taiwanese elementary schools and has spent 15 years teaching Mandarin in Northern California, with deep experience in developing and adapting Chinese teaching materials. She teaches to each child's individual strengths, using recitation, songs, short plays, and illustrated writing to let students show what they have learned.",
      zh: "李老師曾任台灣小學教師 10 年、北加州華語教學 15 年，對中文教材的編寫與整合有豐富經驗。她主張適性教學，依據每位學童不同的特質開發潛能，並透過朗誦、歌謠、小話劇與圖文創作等多元形式，讓孩子具體展現中文學習的成果。",
    },
  },
  {
    id: "singyin-lin",
    nameZh: "林欣穎",
    nameEn: "Ms. Sing-Yin Lin",
    group: "language",
    classes: ["T5"],
    photo: "/images/teachers/singyin-lin.jpg",
    // Landscape frame with the flowers filling the left third; only the
    // horizontal value has any effect, and it has to push well right to
    // centre her.
    photoFocus: "85% 50%",
    tagline: { en: "Bringing the Chinese classroom to life", zh: "讓中文課活起來" },
    bio: {
      en: "Ms. Lin puts classroom participation and real language use first, aiming for an environment orderly and safe enough that students want to speak up. She combines images, stories, discussion, and speaking practice, weaving in calligraphy and cultural topics so students meet Chinese from several angles and connect it to their own lives.",
      zh: "林老師重視學生的課堂參與及實際語言運用，希望營造安心、有秩序且願意開口的學習環境，鼓勵學生主動思考、提問與表達。課堂中她結合圖片、故事、討論與口語練習，並適時融入書法與文化主題，讓學生從不同角度認識中文，並將中文與生活經驗連結。",
    },
  },
  {
    id: "peichen-yang",
    nameZh: "楊沛蓁",
    nameEn: "Ms. Pei-Chen Yang",
    group: "language",
    classes: ["C1", "C8"],
    photo: "/images/teachers/peichen-yang.jpg",
    tagline: {
      en: "Bilingual teaching that makes learning natural and fun",
      zh: "雙語中文教學，讓學習自然又有趣",
    },
    bio: {
      en: "From introducing Chinese in first grade to developing language skills in eighth, Ms. Yang supports her students with patience, encouragement, and thoughtful bilingual instruction. Even for children new to Chinese, she creates a comfortable environment where they can speak with confidence, understand what they hear, and learn step by step — gradually developing a genuine love for the language.",
      zh: "從一年級的中文啟蒙，到八年級的語文能力培養，楊老師用耐心與鼓勵陪伴孩子學習，讓孩子即使一開始不熟悉中文，也能在熟悉、安心的環境中敢開口、聽得懂、學得會，慢慢愛上中文。",
    },
  },
  {
    id: "sabrina-wun",
    nameZh: "溫淑齡",
    nameEn: "Ms. Sabrina Wun",
    group: "language",
    classes: ["C2"],
    photo: "/images/teachers/sabrina-wun.jpg",
    tagline: {
      en: "Bilingual guidance, a growing love for Chinese",
      zh: "用雙語引導，讓孩子愛上中文",
    },
    bio: {
      // Source English called her "Ms. Wen" mid-paragraph while the name line
      // reads "Ms. Sabrina Wun". Normalized to Wun.
      en: "Ms. Wun focuses on helping her second-graders build a strong foundation in Chinese. Recognizing that students arrive with different levels of proficiency, she uses both Chinese and English to guide and support their learning, keeping lessons clear and accessible.",
      zh: "溫老師專注於陪伴孩子建立穩固的中文基礎。面對中文程度不同的學生，她善用中英文雙語引導，將課程內容化繁為簡，幫助孩子理解中文、熟悉中文，逐步建立學習信心。",
    },
  },
  {
    id: "cindy-chang",
    nameZh: "張淑惠",
    nameEn: "Ms. Cindy Chang",
    group: "language",
    classes: ["C3", "C6"],
    photo: "/images/teachers/cindy-chang.jpg",
  },
  {
    id: "nicole-shieh",
    nameZh: "謝宜靜",
    nameEn: "Ms. Nicole Shieh",
    group: "language",
    classes: ["C4", "LSC"],
    photo: "/images/teachers/nicole-shieh.jpg",
  },
  {
    id: "rose-lau",
    nameZh: "關秀鈴",
    nameEn: "Ms. Rose Lau",
    group: "language",
    classes: ["C5"],
    photo: "/images/teachers/rose-lau.jpg",
    tagline: {
      en: "Championing heritage language and culture",
      zh: "推廣中文教育與文化傳承",
    },
    bio: {
      en: "Ms. Lau has long been dedicated to promoting Chinese as a heritage language and fostering an appreciation of Chinese culture. She is passionate about helping families find ways to strengthen their students' Chinese proficiency, including through proficiency testing and the school's online one-to-one tutoring program.",
      zh: "關老師長期熱衷於推廣中文教育及文化傳承，並持續協助家長，透過華語文能力測驗及學校的網路 1:1 輔導計畫，提升學生的中文能力。",
    },
  },
  {
    id: "anise-wang",
    nameZh: "汪念慈",
    nameEn: "Ms. Anise Wang",
    group: "language",
    classes: ["C7"],
    photo: "/images/teachers/anise-wang.jpg",
    tagline: {
      en: "Bilingual guidance, growing confidence",
      zh: "雙語引導培養孩子的中文自信",
    },
    bio: {
      en: "Ms. Wang pays close attention to the different proficiency levels and learning needs her students bring. Through bilingual support in Chinese and English, and clear, structured instruction, she helps students with limited Chinese backgrounds follow the lessons and feel comfortable using the language.",
      zh: "汪老師重視學生不同的中文程度與學習需求。透過中英文雙語輔助與清楚的課程引導，幫助中文基礎較弱的學生更容易理解課程內容，也鼓勵學生在學習過程中勇敢使用中文。",
    },
  },
  {
    id: "amy-chang",
    nameZh: "張郁君",
    nameEn: "Ms. Amy Chang",
    group: "ac",
    classes: ["AC1"],
    photo: "/images/teachers/amy-chang.jpg",
  },
  {
    id: "catherine-ding",
    nameZh: "丁皓婷",
    nameEn: "Ms. Catherine Ding",
    group: "ac",
    classes: ["AC2"],
    photo: "/images/teachers/catherine-ding.jpg",
    tagline: {
      en: "Differentiated guidance, step by step",
      zh: "分層引導，逐步建立表達信心",
    },
    bio: {
      en: "Ms. Ding's AC2 class is for high-school students who already have foundational Chinese and are ready to strengthen speaking, reading, and writing. She gives differentiated instruction based on each student's level, using guided repetition, situational dialogue, and individual feedback to help them work through difficulties and build clarity and confidence.",
      zh: "丁老師的 AC2 課程適合已有基礎中文能力的高中生，進一步加強口語、閱讀與寫作。她依照學生程度提供分層引導，透過重複練習、情境對話與個別提示，幫助學生逐步克服語言使用上的困難，建立更清晰的表達能力與學習信心。",
    },
  },
  {
    id: "kristy-wu",
    nameZh: "吳秀華",
    nameEn: "Ms. Kristy Wu",
    group: "ac",
    classes: ["AC3"],
    photo: "/images/teachers/kristy-wu.jpg",
    tagline: {
      en: "Widening the range of expression",
      zh: "中級提升，拓展中文表達力",
    },
    bio: {
      // Source was Chinese-only and described the class rather than the
      // teacher; English is our translation.
      en: "Ms. Wu's class focuses on expanding vocabulary and sentence patterns and on strengthening speaking and writing. Through deeper study, students communicate more fluently with others while coming to know more of the Chinese language and its culture.",
      zh: "吳老師的課程著重於詞彙與句型的擴充、口語及寫作能力的提升，透過更深入的中文學習，幫助學生更流暢地與他人交流，同時進一步認識豐富的中華語言與文化，讓中文能力持續向上提升。",
    },
  },
  {
    id: "huitzu-lu",
    nameZh: "呂慧慈",
    nameEn: "Ms. Huitzu Lu",
    group: "ac",
    classes: ["AC4"],
    photo: "/images/teachers/huitzu-lu.jpg",
    tagline: { en: "Passing on Chinese with dedication", zh: "以熱忱傳承中文教育" },
    bio: {
      en: "Ms. Lu is a professor in the Department of Modern Languages at California State University, East Bay, with a long career in language education and research. Despite a full university teaching load, she teaches the AC4 credit class at FCS, bringing her professional background and experience to help students strengthen both their Chinese and their cultural understanding.",
      zh: "呂老師是 California State University, East Bay 現代語言系教授，長期投入語言教育與研究。雖然大學教學工作繁忙，她仍秉持對中文教育的熱愛，來到費利蒙中文學校 AC4 學分班授課，以深厚的專業背景與豐富教學經驗，引導學生提升中文能力與文化素養。",
    },
  },
  {
    id: "mingwei-shieh",
    nameZh: "謝明暐",
    nameEn: "Ms. Mingwei Shieh",
    group: "ac",
    classes: ["AP"],
    photo: "/images/teachers/mingwei-shieh.jpg",
    tagline: {
      en: "Preparing for the AP exam and beyond",
      zh: "為 AP 考試與大學中文做準備",
    },
    bio: {
      en: "Ms. Shieh's AP Chinese class is for students preparing for the AP Chinese exam. It strengthens advanced proficiency, reading and writing skills, and test-taking strategy, building toward both the exam itself and college-level Chinese study afterwards.",
      zh: "謝老師指導的 AP 中文課程適合準備 AP 中文考試的學生，強化高階中文能力、閱讀與寫作技巧及應試策略，為 AP 考試及未來大學階段的中文學習做好充分準備。",
    },
  },
  {
    id: "maureen-li",
    nameZh: "黃賜梅",
    nameEn: "Ms. Maureen Li",
    group: "electives",
    classes: ["P1"],
    photo: "/images/teachers/maureen-li.jpg",
    tagline: { en: "Thirty years of art education", zh: "三十年美術教育的堅持" },
    bio: {
      en: "Ms. Li has taught art in the Bay Area for over 30 years. She has received the 30-Year Gold Medal for Overseas Chinese Education from Taiwan's Overseas Community Affairs Council, and the Outstanding Teacher Award from the Association of Northern California Chinese Schools four times (2004, 2010, 2016, and 2022). Her courses align closely with the California Arts Standards.",
      zh: "黃老師在灣區從事美術教育超過 30 年，曾獲中華民國僑務委員會頒發海外僑校教師 30 年金質僑教榮譽章，並四度獲北加州中文學校聯合會優良教師獎（2004、2010、2016、2022 年）。她的課程嚴格銜接加州藝術教育標準，為孩子提供系統化的美學教育。",
    },
  },
  {
    id: "aaron-chen",
    nameZh: "陳萬宗",
    nameEn: "Mr. Aaron Chen",
    group: "electives",
    classes: ["AB1", "AB2", "AB3"],
    photo: "/images/teachers/aaron-chen.jpg",
    tagline: { en: "Opening new ground in the mind", zh: "讓珠心算打開孩子大腦新區" },
    bio: {
      en: "Mr. Chen has worked in education for nine years, focusing on abacus and mental arithmetic. What he values is not only calculation but the chance for a traditional skill to help children rebuild focus, composure, and independent thinking in a fast-moving world. The attention, working memory, and logical thinking abacus develops, he believes, carry over into reading, language, music, and science.",
      zh: "陳老師投入教育工作已有九年，長期致力於珠算與心算教學。他重視的不只是計算能力，更希望透過傳統技藝，讓孩子在快速變動的現代生活中重新建立專注、沉澱與獨立思考的能力。他認為珠算培養的注意力、工作記憶與邏輯思考，也能延伸到閱讀、語言、音樂與科學等各個領域。",
    },
  },
  {
    id: "becky-hsu",
    nameZh: "許珮漪",
    nameEn: "Ms. Becky Hsu",
    group: "electives",
    classes: ["YG1", "PS1"],
    photo: "/images/teachers/becky-hsu.jpg",
    // Full-body yoga pose outdoors rather than a headshot.
    photoFocus: "50% 30%",
    tagline: { en: "A healthy break for parents", zh: "家長健康新選擇" },
    bio: {
      en: "Ms. Hsu is a private yoga instructor teaching two adult classes for FCS parents. Yoga focuses on stretching, relaxation, flexibility, and core strength; Power Sculpt combines cardio, dance, and strength training. While their children are in Chinese class, parents get an hour of their own.",
      zh: "許老師是專業私人瑜伽教練，為家長開設兩堂成人課程：纖體瑜珈塑身著重伸展、放鬆、柔軟度與核心，燃力舞塑則結合有氧、舞蹈與肌力訓練。孩子上中文課的同時，家長也能擁有專屬的運動時光，放鬆身心、提升活力。",
    },
  },
  {
    id: "spring-kao",
    nameZh: "莊幼春",
    nameEn: "Ms. Spring Kao",
    group: "electives",
    classes: ["H1", "H3"],
    photo: "/images/teachers/spring-kao.jpg",
    tagline: { en: "Into the world of making", zh: "帶孩子走進手作的美好世界" },
    bio: {
      en: "Ms. Kao has over thirty years of experience teaching crafts and handwork, with a love of sewing and everyday aesthetics. Her classes are guided by clear steps, so even complete beginners finish a real piece. Crafts and sewing, she believes, are not just technique but a way of stitching creativity, patience, and a sense of beauty into daily life.",
      zh: "莊老師擁有超過三十年的美勞與手工藝教學經驗，熱愛縫紉與生活美學。課程以清楚的步驟引導，即使從零開始也能輕鬆完成作品。她相信美勞與縫紉不只是技巧，更是將創意、耐心與美感一針一線融入生活的藝術。",
    },
  },
  {
    id: "liling-chen",
    nameZh: "陳麗玲",
    nameEn: "Ms. Li-Ling Chen",
    group: "electives",
    classes: ["X1", "X2"],
    photo: "/images/teachers/liling-chen.jpg",
    // No photoFocus: the source is square, so it exactly fills a square
    // container and object-position has nothing to shift. This is the
    // full-body cut-out, so her face reads small — only a re-crop or a
    // re-shoot fixes it, and the photos are published as supplied.
    tagline: { en: "Passing on culture with enthusiasm", zh: "以文化熱忱傳承中華之美" },
    bio: {
      // Source said "retiring this summer" — made non-relative so the entry
      // does not silently go stale next school year.
      en: "Ms. Chen is a professor of education at California State University, East Bay, with a long career in the field. Now approaching retirement from the university, she still brings her enthusiasm for Chinese cultural heritage to FCS. To give children a way into that tradition, she taught herself Chinese yo-yo and now teaches it herself, combining culture, movement, and creativity.",
      zh: "陳老師是 California State University, East Bay 教育系教授，長期投入教育工作。即將從大學退休的她，仍懷抱對中華文化傳承的熱情，投入費利蒙中文學校教學。為了讓孩子接觸傳統文化，她自學扯鈴技巧並親自授課，將文化、運動與創意結合。",
    },
  },
  {
    id: "jt-chen",
    nameZh: "陳健庭",
    nameEn: "Mr. JT Chien-Ting Chen",
    group: "electives",
    classes: ["BK1", "BK2"],
    photo: "/images/teachers/jt-chen.jpg",
    // Lowest-resolution photo in the set (268x386); face is high in the frame.
    photoFocus: "50% 25%",
    tagline: {
      en: "Perseverance and teamwork on the court",
      zh: "在球場上學會堅持與合作",
    },
    bio: {
      en: "Coach Chen builds athletic ability and team spirit through basketball. His lively, enjoyable sessions cover fundamental skills, coordination, and fitness while developing focus, cooperation, and confidence — so students enjoy the game and learn perseverance and sportsmanship along the way.",
      zh: "陳教練以籃球培養孩子的運動能力與團隊精神，透過有趣、活潑的訓練，帶領學生學習基本技巧、提升協調性與體能，並培養專注、合作與自信，讓孩子在球場上享受籃球的樂趣，也在每一次練習中學會堅持與成長。",
    },
  },
  {
    id: "can-shen",
    nameZh: "沈燦",
    nameEn: "Mr. Can Shen",
    group: "electives",
    classes: ["P2", "P3", "CP1"],
    photo: "/images/teachers/can-shen.jpg",
    tagline: { en: "Into art, one stroke at a time", zh: "一筆一畫，走進多元藝術世界" },
    bio: {
      en: "Mr. Shen works across Chinese painting, calligraphy, and Western painting, teaching both traditional and modern art, and has published comics of his own. From ink and brushwork, to the line of calligraphy, to color and form in Western painting, he guides children to develop observation, taste, and imagination — so that art becomes a way of expressing themselves.",
      zh: "沈老師擅長國畫、書法與西畫，教學橫跨傳統與現代藝術，並曾出版漫畫作品，具備豐富的繪畫與創作經驗。從國畫的筆墨意境、書法的線條之美，到西畫的色彩與造型，他引導孩子在動手創作中培養觀察力、美感與想像力，讓藝術成為孩子表達自己的方式。",
    },
  },
  {
    id: "daphne-devine",
    nameZh: "張樂濱",
    nameEn: "Ms. Leping Daphne Devine",
    group: "online",
    classes: ["e-CT1", "e-CT2", "e-CW"],
    photo: "/images/teachers/daphne-devine.jpg",
    tagline: { en: "Typing as a shortcut into Chinese", zh: "用打字打開中文的門" },
    bio: {
      en: "Ms. Devine has over thirty years of K–12 teaching experience in Chinese schools. Convinced that Chinese typing is both where the world is heading and an effective shortcut into the language, she completed a structured Hanyu Pinyin curriculum in 2004 and has focused on Pinyin, typing, character recognition, and writing ever since. Her classes run online via Google Classroom, Zoom, and YouTube.",
      zh: "張老師在中文學校擁有超過三十年的 K–12 教學經驗。她深感中文打字既是時代趨勢，也是學習中文的有效捷徑，於 2004 年完成一套結構完整、層次分明的漢語拼音教材，並自此致力於漢語拼音、中文打字、識字與寫作教學。課程透過 Google Classroom、Zoom 與 YouTube 線上進行，學生可在家中方便上課。",
    },
  },
];

/** Roster split into display groups, preserving both group and roster order. */
export const teachersByGroup = groupOrder
  .map((group) => ({ group, members: teachers.filter((t) => t.group === group) }))
  .filter((g) => g.members.length > 0);
