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
//
// Bios are trimmed to a consistent length (~100–130 characters of Chinese /
// ~50–70 English words) from source entries that ranged from ~90 to ~700
// characters. Syllabus-style content from those same entries is kept out of
// `bio` and lives in `courseNotes` instead. Where the syllabus described an
// ELECTIVE, it went into that elective's own description in content.ts, since
// /electives is the page families browse when choosing one.
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
  /** School address, as listed in the source document (lower-cased). */
  email: string;
  group: TeacherGroup;
  /** Class codes only. Resolved to full names via `classLabel()`. */
  classes: string[];
  /** Path under public/. Omit to fall back to a monogram. */
  photo?: string;
  /** object-position override, for photos the default framing crops badly. */
  photoFocus?: string;
  tagline?: { en: string; zh: string };
  bio?: { en: string; zh: string };
  /**
   * Per-class notes on what the year covers, written by the teacher. Kept
   * separate from `bio` — mixing the two is what made the source document's
   * entries uneven, since some teachers wrote a biography, some a syllabus,
   * and some both under one heading. Coverage is partial (14 of the 23
   * language and AC classes), which is why the page collapses these.
   */
  courseNotes?: { code: string; en: string; zh: string }[];
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
  K1: { en: "Kindergarten", zh: "注音班" },
  AP: { en: "AP Chinese", zh: "AP 中文" },
};

for (let i = 0; i < 8; i++) {
  const n = i + 1;
  // Traditional-Chinese track (T1–T8) and bilingual/CSL track (C1–C8).
  // The Chinese labels follow the school's own long-standing usage — the
  // legacy site called these the "traditional" classes and K1 the bo-po-mo-fo
  // (注音) class. The English "Full Chinese" is wording introduced during the
  // rebuild. The school has settled on "Traditional" for the English, which
  // parallels "Bilingual" on the other track.
  coreClassLabels[`T${n}`] = {
    en: `${ordinalsEn[i]} Grade — Traditional`,
    zh: `${numeralsZh[i]}年級（傳統中文班）`,
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
    email: "vivian@fremontchineseschool.org",
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
    email: "cyin@fremontchineseschool.org",
    group: "language",
    classes: ["K1", "T8"],
    photo: "/images/teachers/chinghsien-yin.jpg",
    tagline: { en: "32 years of teaching Chinese", zh: "32 年中文教學經驗" },
    bio: {
      en: "From beginning Chinese to advanced reading and writing, Ms. Yin brings some 32 years of teaching experience and is one of the school's most senior teachers. Across those years she has kept to a patient, attentive, and thorough approach, helping children of every age build their Chinese step by step. She values the groundwork at each stage and reads each child's pace, so that steady accumulation turns into visible progress.",
      zh: "從基礎中文到進階閱讀寫作，尹清賢老師擁有約 32 年豐富的中文教學經驗，是費利蒙中文學校最資深的教師之一。多年教學歷程中，尹老師始終以耐心、細心與扎實的教學態度，陪伴不同年齡的孩子一步步建立中文能力。她重視每個學習階段的基礎訓練，也善於觀察孩子的學習步調，透過循序漸進的方式，讓學生在穩定累積中看見自己的進步。",
    },
    courseNotes: [
      {
        code: "K1",
        en: "K1 is where a child's Chinese begins. Ms. Yin starts from Zhuyin, pronunciation, and character recognition to lay down a correct foundation, in a relaxed and encouraging classroom that builds interest and confidence alongside skill.",
        zh: "K1 是孩子接觸中文學習的重要起點。尹老師從注音、發音與識字開始，帶領孩子建立正確的中文基礎，在輕鬆、鼓勵的學習氛圍中，培養孩子對中文的興趣與信心。",
      },
      {
        code: "T8",
        en: "By eighth grade, Ms. Yin pushes further into reading comprehension, recitation, and writing, developing more mature expression and thinking — so that students are not only studying Chinese but genuinely using it to understand, express, and communicate.",
        zh: "到了八年級，尹老師進一步帶領學生提升閱讀理解、朗讀與寫作能力，培養更成熟的中文表達與思考能力，讓孩子不只是「學中文」，更能真正運用中文理解、表達與溝通。",
      },
    ],
  },
  {
    id: "sophie-chiu",
    nameZh: "邱智欣",
    nameEn: "Ms. Chih-hsin Sophie Chiu",
    email: "schiu@fremontchineseschool.org",
    group: "language",
    classes: ["T1", "T4"],
    photo: "/images/teachers/sophie-chiu.jpg",
    tagline: { en: "Opening the door to literacy", zh: "開啟孩子的識字之路" },
    bio: {
      en: "Ms. Chiu takes a step-by-step approach, guiding first-graders into reading and writing — starting with practicing their own names each day to build confidence. By fourth grade she introduces Hanyu Pinyin, so students can type in both Zhuyin and Pinyin and have more options open to them in later study.",
      zh: "邱老師以循序漸進的方式，帶領一年級孩子正式踏入識字與讀寫的世界，從每天練習寫自己的名字開始，建立閱讀與書寫的信心；到了四年級，再進一步教授漢語拼音，讓孩子除了注音之外也具備拼音輸入能力，為未來的中文學習增添更多選擇。",
    },
    courseNotes: [
      {
        code: "T1",
        en: "It starts with writing your own name. Ms. Chiu takes first-graders step by step through recognizing characters and practicing handwriting — the first move into reading and writing Chinese — with confidence built one repetition at a time.",
        zh: "從「寫下自己的名字」開始，邱老師以循序漸進的方式，陪伴一年級孩子一步步認識漢字、練習書寫，開啟中文閱讀與寫作的第一步，讓孩子在一次次的練習中建立自信。",
      },
      {
        code: "T4",
        en: "A step up. Alongside the Zhuyin input they already know, fourth-graders begin Hanyu Pinyin, so they can type Chinese more than one way — a more flexible command of the language, and useful preparation for the study and digital life ahead.",
        zh: "中文學習再進階！T4 班除了熟悉注音輸入，也開始學習漢語拼音，讓孩子掌握不同的中文輸入方式，培養更靈活的中文能力，為未來的學習與數位生活做好準備。",
      },
    ],
  },
  {
    id: "yvonne-cheng",
    nameZh: "鄭怡文",
    nameEn: "Ms. Yvonne Cheng",
    email: "ycheng@fremontchineseschool.org",
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
    courseNotes: [
      {
        code: "T2",
        en: "Second grade introduces more phono-semantic characters built from radicals and components. The class continues first grade's image-based approach — understanding characters through the evolution of pictographs and indicatives — before moving step by step into the patterns behind radicals, components, and compound characters. Readings shift from poems and rhymes toward short passages and stories, supported by multimedia, games, and story performance.",
        zh: "二年級開始接觸更多由部首、部件組成的形聲字。課程延續一年級的圖像化教學，從象形字、指示字的演變理解漢字，循序漸進認識部首、部件與形聲字的構字規律。教材也由詩歌、韻文逐漸過渡到短文與故事閱讀，並透過多媒體教材、互動遊戲與故事演出，建立聽、說、讀、寫的基礎。",
      },
      {
        code: "T6",
        en: "Sixth grade reaches an intermediate level, with deeper and more demanding material. Each lesson explores a different topic and vocabulary field — middle-school campus and after-school life, technology and computers in daily life, Chinese culture and social issues. Alongside analyzing text structure and building vocabulary, guided questioning, group discussion, and speaking activities develop reading comprehension, critical thinking, and communication.",
        zh: "六年級已進入中級程度，課程內容更深入也更具挑戰性。每課帶領學生探索不同主題與詞彙領域，例如中學生的校園與課後生活、科技與電腦的日常應用，以及中國文化與社會議題。除了分析課文結構、累積詞彙外，也透過提問引導、小組討論與口語表達活動，培養閱讀理解、批判思考與溝通能力。",
      },
    
    ],
  },
  {
    id: "shuping-lee",
    nameZh: "李淑萍",
    nameEn: "Ms. Shu Ping Lee",
    email: "slee@fremontchineseschool.org",
    group: "language",
    classes: ["T3", "T7"],
    photo: "/images/teachers/shuping-lee.jpg",
    tagline: { en: "Teaching to each child's strengths", zh: "因材施教，展現學習成果" },
    bio: {
      en: "Ms. Lee taught for 10 years in Taiwanese elementary schools and has spent 15 years teaching Mandarin in Northern California, with deep experience in developing and adapting Chinese teaching materials. She teaches to each child's individual strengths, using recitation, songs, short plays, and illustrated writing to let students show what they have learned.",
      zh: "李老師曾任台灣小學教師 10 年、北加州華語教學 15 年，對中文教材的編寫與整合有豐富經驗。她主張適性教學，依據每位學童不同的特質開發潛能，並透過朗誦、歌謠、小話劇與圖文創作等多元形式，讓孩子具體展現中文學習的成果。",
    },
    courseNotes: [
      {
        code: "T3",
        en: "The class emphasizes reading aloud and rhyme practice, helping students internalize the rhythm and sound of Chinese. Character recognition is strengthened by taking characters apart into their components and putting them back together. Telling stories from pictures — both the speaking and the reading comprehension behind it — is a central part of the year.",
        zh: "課堂著重課文朗讀與唸謠訓練，幫助學生熟練中文的音律感；並透過漢字部件的拆解與組合，強化認字能力。看圖說故事的口語表達與閱讀理解，也是本學年的重要環節。",
      },
      {
        code: "T7",
        en: "Alongside consolidating the Chinese students have built up over the years, seventh grade develops two-way translation between English and Chinese. Students work on group topic investigations through the term, and each student independently completes a topic report in Chinese by the end of the semester.",
        zh: "在持續鞏固長期累積的中文實力之外，本學年也培養學生英翻中、中翻英的雙向翻譯能力。課堂中進行分組主題探究，學期末每位學生須獨立以中文完成一份主題報告。",
      },
    
    ],
  },
  {
    id: "singyin-lin",
    nameZh: "林欣穎",
    nameEn: "Ms. Sing-Yin Lin",
    email: "sylin@fremontchineseschool.org",
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
    courseNotes: [
      {
        code: "T5",
        en: "Fifth grade builds further on reading, character recognition, and expression. Working from the textbook, students learn new characters, vocabulary, and key sentence patterns, then use guided reading and comprehension work to find the main point of a passage and read in context. Calligraphy, cultural topics, and creative activities are woven in through the year.",
        zh: "五年級進一步提升中文閱讀、識字與表達能力。課程以課文為基礎，學習生字、詞語與重點句型，並透過課文導讀與閱讀理解，引導學生掌握文章重點、理解上下文，逐步累積詞彙量。課堂也會適時融入書法、文化主題與創意活動，讓學生從不同角度認識中文與中華文化。",
      },
    
    ],
  },
  {
    id: "peichen-yang",
    nameZh: "楊沛蓁",
    nameEn: "Ms. Pei-Chen Yang",
    email: "pyang@fremontchineseschool.org",
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
    email: "sabrina.wun@fremontchineseschool.org",
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
    email: "cindy.chang@fremontchineseschool.org",
    group: "language",
    classes: ["C3", "C6"],
    photo: "/images/teachers/cindy-chang.jpg",
    courseNotes: [
      {
        code: "C3",
        en: "Third-grade bilingual is designed for children who don't speak Chinese at home, using everyday topics and plenty of images to provide enough language input. Material starts from set patterns like 你好 and 我叫⋯, paired with common vocabulary — family members, colors, numbers, classroom objects — and simple exchanges such as “what's your name?” Students learn to introduce their family, describe colors, and count objects in short sentences, working toward Novice-level goals.",
        zh: "雙語班三年級為家中不說中文的孩子設計，以生活化主題與大量圖片提供充足的語言輸入。教材從「你好」、「我叫⋯」等固定句型開始，搭配家庭成員、顏色、數字與教室物品等常見詞語，並安排「你叫什麼名字」這類簡單問答。孩子能用短句介紹家庭、描述顏色或數物品，逐步達到 Novice 階段的學習目標。",
      },
      {
        code: "C6",
        en: "Sixth-grade bilingual covers school activities, seasons and weather, festivals, transport, shopping, and giving simple reasons, targeting Novice High to Intermediate Low. Short passages, dialogues, and situational images build the ability to follow longer paragraphs, track sequence, and pick out main ideas, while connectives such as 如果…就… and 雖然…但是… come into use. Students describe a festival, the weather, or a shopping situation in five to eight sentences, and complete short writing, oral reports, or topic posters.",
        zh: "雙語班六年級涵蓋學校活動、季節與天氣、節慶文化、交通、購物與簡單的理由說明，目標為 Novice High 至 Intermediate Low。透過短文、對話與情境圖片，引導孩子理解較長段落、掌握事件順序與主要訊息，並逐步使用「如果…就…」、「雖然…但是…」等連接詞。學生能以 5–8 句描述節慶、天氣或購物情境，並完成短文、口頭報告或主題海報。",
      },
    
    ],
  },
  {
    id: "nicole-shieh",
    nameZh: "謝宜靜",
    nameEn: "Ms. Nicole Shieh",
    email: "yshieh@fremontchineseschool.org",
    group: "language",
    classes: ["C4", "LSC"],
    photo: "/images/teachers/nicole-shieh.jpg",
    courseNotes: [
      {
        code: "C4",
        en: "Step-by-step practice in listening, speaking, reading, and writing. The first hour covers the textbook; the second puts it to use through games, crafts, and interactive activities. Learning happens through play, and children build both ability and confidence in a relaxed bilingual environment.",
        zh: "透過聽、說、讀、寫的循序練習，讓孩子一步一步學好中文。第一小時學習課本內容，第二小時則透過遊戲、勞作與互動活動，在輕鬆有趣的環境中練習所學，讓孩子邊玩邊學，逐步建立中文能力與自信。",
      },
    
    ],
  },
  {
    id: "rose-lau",
    nameZh: "關秀鈴",
    nameEn: "Ms. Rose Lau",
    email: "rose.lau@fremontchineseschool.org",
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
    courseNotes: [
      {
        code: "C5",
        en: "The bilingual fifth-grade course develops listening, speaking, reading, and writing. Instruction focuses on sentence structure and usage, and on the vocabulary presented in the textbook. Regular listening and speaking activities build confidence in oral communication, and writing instruction develops simple one- to two-paragraph compositions. Cultural topics are incorporated throughout to deepen students' appreciation of the language and its context.",
        zh: "雙語班五年級全面提升學生聽、說、讀、寫的中文能力。教學著重句子結構及其實際運用，以及課本中的詞彙。課堂安排定期的聽力與口語練習，提升口語表達能力與溝通信心；寫作方面，學生將學習撰寫一至兩段的短文。課程亦融入豐富的文化主題，加深學生對中華文化的認識與欣賞。",
      },
    
    ],
  },
  {
    id: "anise-wang",
    nameZh: "汪念慈",
    nameEn: "Ms. Anise Wang",
    email: "anise.wang@fremontchineseschool.org",
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
    email: "amy.chang@fremontchineseschool.org",
    group: "ac",
    classes: ["AC1"],
    photo: "/images/teachers/amy-chang.jpg",
    courseNotes: [
      {
        code: "AC1",
        en: "Chinese Level 1 uses Integrated Chinese, Volume 1 to give beginning learners a solid foundation. Topics cover introductions, family, school life, friends, time, daily activities, food, shopping, and leisure, while students develop pronunciation, Pinyin, characters, vocabulary, and basic sentence structures. The course also emphasizes cultural learning through dialogues, role-play, group activities, and cultural comparison.",
        zh: "中文第一級以《Integrated Chinese（中文聽說讀寫）》第一冊為主要教材，為初學者建立紮實的中文基礎。內容涵蓋自我介紹、家庭、學校生活、朋友、時間、日常活動、飲食、購物與休閒等主題，逐步學習發音、漢語拼音、漢字、詞彙及基本句型。課程同時重視文化學習，透過對話、角色扮演、小組活動與文化比較，認識華人文化與生活方式。",
      },
    
    ],
  },
  {
    id: "catherine-ding",
    nameZh: "丁皓婷",
    nameEn: "Ms. Catherine Ding",
    email: "dinghaoting@fremontchineseschool.org",
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
    email: "kwu@fremontchineseschool.org",
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
    email: "hlu@fremontchineseschool.org",
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
    email: "mshieh@fremontchineseschool.org",
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
    email: "maureen.li@fremontchineseschool.org",
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
    email: "achen@fremontchineseschool.org",
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
    email: "phsu@fremontchineseschool.org",
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
    email: "spring.kao@fremontchineseschool.org",
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
    email: "liling.chen@fremontchineseschool.org",
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
    email: "jt.chen@fremontchineseschool.org",
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
    email: "cshen@fremontchineseschool.org",
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
    email: "ldevine@fremontchineseschool.org",
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
