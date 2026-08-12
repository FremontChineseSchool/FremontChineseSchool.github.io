// Proposed changes to /electives and /teachers, staged for review.
//
// WHY THIS FILE EXISTS
//
// The live pages stay exactly as they are. This module holds only what the
// proposal would CHANGE, and the `-diff` routes (/electives-diff,
// /teachers-diff) render the same components with these values overlaid, so
// reviewers can open the live page and the proposed page side by side.
//
// Because the overlay carries only the new value, the CURRENT value is still
// sitting in content.ts at render time — which is what lets the diff pages show
// before-and-after without anyone maintaining a second copy of the old text.
//
// HOW TO SHIP IT
//
// Once approved: copy each `en`/`zh` value below into the matching entry in
// content.ts, move `teacherCourseNotes` into the `courseNotes` field on each
// teacher in teachers.ts, then delete this file, the four `-diff` routes, their
// `routes` entries in ui.ts, their `descriptions` entries, and the `variant`
// prop on the two page components. Nothing else references any of it.

export type ReviewLevel = "correction" | "decision" | "question";

/** An annotation asking a reviewer to look at something specific. */
export type ReviewNote = {
  level: ReviewLevel;
  en: string;
  zh: string;
};

export type ElectiveOverride = {
  /** Only the fields that change. Anything omitted falls through to content.ts. */
  en: { name?: string; description?: string; notes?: string | null };
  zh: { name?: string; description?: string; notes?: string | null };
  review?: ReviewNote[];
};

// --- Electives ------------------------------------------------------------

export const electiveOverrides: Record<string, ElectiveOverride> = {
  P1: {
    en: {
      description:
        "A step-by-step introduction to fine art, starting from the fundamentals: people, animals, landscapes, still life, and outdoor sketching. Builds creativity and visual expression, and is aligned with the California Arts Standards.",
    },
    zh: {
      description:
        "專為啟蒙兒童美術興趣與思維設計，內容循序漸進，從基礎教起，主要教授人物、動物、大自然風景、生活靜物與戶外寫生，全面引導孩子的創造力與視覺表達。課程銜接加州藝術教育標準（California Arts Standards）。",
    },
    review: [
      {
        level: "decision",
        en: "The California Arts Standards alignment is Ms. Li's own claim from her write-up. Please confirm the school is comfortable stating it publicly.",
        zh: "「銜接加州藝術教育標準」一句出自黃老師的原稿。請確認學校願意在網站上公開作此聲明。",
      },
    ],
  },

  AB1: {
    en: {
      description:
        "Introduction stage of abacus learning, for complete beginners. Covers the structure of the abacus, correct technique, and the basic concepts behind abacus calculation, building toward mental math later on. Material fee includes all course materials.",
    },
    zh: {
      description:
        "算盤學習的入門階段，專為初學者設計，重點在於建立正確的學習態度、基本操作方式，以及算盤運算的基礎概念，為後續的心算與進階學習打下扎實基礎。教材費含所有課程材料。",
    },
  },

  AB2: {
    en: {
      description:
        "The bridge from the physical abacus to mental math — the external tool gradually becomes an internal way of thinking. Repeated practice builds both speed and a settled, focused attention.",
    },
    zh: {
      description:
        "從實體算盤進入心算的銜接階段，原本外在的工具開始轉化為內在的思考能力；在反覆練習之中，也培養出一種安定而專注的精神。",
    },
    review: [
      {
        level: "decision",
        en: "Mr. Chen wrote 腦中運算 (“calculating in the head”). Changed to 心算, the standard term, which also echoes the 珠心算 in the class name — but it is our word choice, not his.",
        zh: "陳老師原文為「腦中運算」，此處改為通用術語「心算」，亦與課名「珠心算」呼應。此為編輯用字，非老師原文。",
      },
    ],
  },

  AB3: {
    en: {
      name: "Abacus 3 — Advanced (珠心算三)",
      description:
        "The advanced stage of abacus learning, for students with a solid foundation and fluent technique. The goal is no longer simply being able to calculate, but speed, accuracy, and consistency together — until the skill becomes an intuitive response.",
    },
    zh: {
      name: "珠心算三（高級）",
      description:
        "算盤學習的高級階段，專為已具備穩固基礎與熟練技巧的學員設計。核心不再只是「會算」，而是進一步追求速度、準確度與穩定性的統一，透過高度重複與精準訓練，將算盤能力內化為直覺反應。",
    },
    review: [
      {
        level: "correction",
        en: "This renames the class, not just its description: “Intermediate” becomes “Advanced” (中級 → 高級), matching how Mr. Chen describes it. Check anywhere the old name appears outside the website — registration forms, the tuition schedule, printed handouts.",
        zh: "此項更動的是課程名稱，而非僅是說明文字：「中級」改為「高級」，與陳老師的描述一致。請一併確認網站以外使用舊名稱之處，例如報名表、學費說明與紙本講義。",
      },
    ],
  },

  YG1: {
    en: {
      description:
        "Yoga for adults — stretching, relaxation, flexibility, core strength, and balance of body and mind. Taught by a private yoga instructor while your children are in class.",
    },
    zh: {
      description:
        "成人瑜珈課程，著重伸展、放鬆、柔軟度、核心與身心平衡。由私人瑜伽教練授課，孩子上中文課的同時，家長也能擁有專屬的運動時光。",
    },
  },

  PS1: {
    en: {
      description:
        "Adult fitness combining cardio, dance, fat burn, and strength work — energizing, stress-relieving, and toning. Taught by a private yoga instructor while your children are in class.",
    },
    zh: {
      description:
        "成人有氧塑身課程，結合舞蹈、燃脂與肌力訓練，紓解壓力、提升活力，讓曲線更加勻稱。由私人瑜伽教練授課，孩子上中文課的同時，家長也能擁有專屬的運動時光。",
    },
  },

  LSC: {
    en: {
      description:
        "A student-led Chinese conversation club sponsored by Ms. Shieh. High-school students with strong Chinese lead the group through games, activities, talent shows, and crafts, giving members low-pressure opportunities to practice speaking Chinese and enjoy using it.",
    },
    zh: {
      description:
        "中文會話社團，由謝宜靜老師擔任指導老師，以學生帶學生的方式進行——由中文程度良好的高中生帶領大家，在遊戲、活動與互動中練習中文口說。社團也安排才藝表演與勞作製作，讓學生在輕鬆愉快的過程中增加使用中文的機會。",
    },
    review: [
      {
        level: "correction",
        en: "This is a factual correction, not a rewrite. The current text reads as remedial tutoring; Ms. Shieh's own write-up describes a student-led conversation club (中文會話社團) run by high schoolers. Families who chose or skipped LSC based on the old description had the wrong idea about it.",
        zh: "此項為事實更正，非單純潤稿。現行說明讀來像補救教學輔導；謝老師原稿說明這是由高中生帶領的「中文會話社團」。依舊說明決定是否報名的家庭，對本課程的理解可能有誤。",
      },
    ],
  },

  "e-CT1": {
    en: {
      description:
        "Learn Hanyu Pinyin from the ground up — correct pronunciation and sound discrimination first, then intuitive spelling and basic Chinese typing. Taught bilingually, so students with a limited Chinese background can follow.",
      notes: "For 4th grade through adult.",
    },
    zh: {
      description:
        "從正音、辨音開始，逐步建立學生對漢語拼音的正確概念與熟悉度，進而練習直覺拼音，培養基礎中文打字能力。課程採雙語教學，中文基礎較弱的學生亦可跟上。",
      notes: "學習對象：四年級以上至成人。",
    },
    review: [
      {
        level: "decision",
        en: "Adds a stated audience where there was none, taken from Ms. Devine's 學習對象 line. Confirm the grade floor is still current.",
        zh: "新增原本沒有的「學習對象」，取自張老師原稿。請確認年級下限是否仍然適用。",
      },
    ],
  },

  "e-CT2": {
    en: {
      description:
        "Builds typing speed, character recognition, and concentration through reading, listening, and typing practice. Each student works at their own pace with their own materials and individual instruction.",
      notes: "Requires Hanyu Pinyin and basic Chinese typing ability.",
    },
    zh: {
      description:
        "透過視、識、聽、打等多元教材與練習，逐步增強中文打字能力，同時擴充識字量並訓練專注力。課程採取個別進度、個別教材、個別指導的方式進行，充分考量每位學生的程度與需求。",
      notes: "學習對象：已具備漢語拼音及基本中文打字能力者。",
    },
    review: [
      {
        level: "decision",
        en: "“Own pace, own materials, individual instruction” is a strong promise to publish. It is Ms. Devine's wording, but worth confirming it holds at current class sizes.",
        zh: "「個別進度、個別教材、個別指導」是相當具體的承諾。此為張老師原文，但仍建議確認在目前班級人數下是否仍能落實。",
      },
    ],
  },

  "e-CW": {
    en: {
      description:
        "Develops written expression: word usage, grammar and sentence patterns, composition and creative writing, and translation with analysis. Systematic practice builds writing that is both complete and fluent.",
      notes: "Limited to 4 students. Requires fluent Chinese typing and 8th-grade Chinese proficiency.",
    },
    zh: {
      description:
        "提升中文文字表達與寫作能力，內容包括字詞運用、文法與句型結構、中文寫作與創作，以及翻譯與解析。透過系統性的練習，提升寫作的完整性與流暢度。",
      notes: "限收 4 名學生。學習對象：已具備成熟中文打字能力及八年級以上中文表達能力者。",
    },
  },
};

/** Cross-cutting notes for /electives-diff, shown above the class list. */
export const electivesReviewNotes: ReviewNote[] = [
  {
    level: "question",
    en: "Unresolved: AB2 and AB3 tell families to email melissa@ to confirm placement, but the teacher document lists Mr. Aaron Chen (achen@) as the abacus teacher. Left untouched because we cannot tell which is current.",
    zh: "待確認：AB2 與 AB3 請家長寄信至 melissa@ 確認程度，但教師介紹表列出的珠心算老師為陳萬宗老師（achen@）。因無法判斷何者為現況，此處未作更動。",
  },
  {
    level: "decision",
    en: "All ten descriptions are condensed from the teachers' own write-ups, in both languages. Nothing here was invented, but nothing has been read back to the teachers either.",
    zh: "以下十項說明皆改寫自各科老師的原稿（中英文皆是）。內容並無杜撰，但也尚未回請老師確認。",
  },
];

// --- Teachers -------------------------------------------------------------

export type TeacherCourseNotes = {
  notes: { code: string; en: string; zh: string }[];
  review?: ReviewNote[];
};

/**
 * Keyed by the teacher `id` in teachers.ts. Would become the `courseNotes`
 * field on each of those records.
 */
export const teacherCourseNotes: Record<string, TeacherCourseNotes> = {
  "yvonne-cheng": {
    notes: [
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
    review: [
      {
        level: "decision",
        en: "Ms. Cheng's original ran to roughly 700 characters across T2 and T6; this is about 40% of that. The English is our translation — she wrote in Chinese only.",
        zh: "鄭老師 T2、T6 原稿合計約 700 字，此處約保留四成。英文為本站翻譯，老師原稿僅有中文。",
      },
    ],
  },

  "shuping-lee": {
    notes: [
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
    review: [
      {
        level: "decision",
        en: "Ms. Lee's original used half-width punctuation throughout (,. rather than ，。), which has been normalized. The English is our translation.",
        zh: "李老師原稿全篇使用半形標點（, 與 .），此處已統一為全形。英文為本站翻譯。",
      },
    ],
  },

  "singyin-lin": {
    notes: [
      {
        code: "T5",
        en: "Fifth grade builds further on reading, character recognition, and expression. Working from the textbook, students learn new characters, vocabulary, and key sentence patterns, then use guided reading and comprehension work to find the main point of a passage and read in context. Calligraphy, cultural topics, and creative activities are woven in through the year.",
        zh: "五年級進一步提升中文閱讀、識字與表達能力。課程以課文為基礎，學習生字、詞語與重點句型，並透過課文導讀與閱讀理解，引導學生掌握文章重點、理解上下文，逐步累積詞彙量。課堂也會適時融入書法、文化主題與創意活動，讓學生從不同角度認識中文與中華文化。",
      },
    ],
    review: [
      {
        level: "decision",
        en: "The English is our translation — Ms. Lin wrote in Chinese only.",
        zh: "英文為本站翻譯，林老師原稿僅有中文。",
      },
    ],
  },

  "cindy-chang": {
    notes: [
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
    review: [
      {
        level: "correction",
        en: "Ms. Chang submitted a curriculum outline rather than a biography, so her card currently shows only a name and class list. These notes would be the only thing on it. She should still be asked for a short bio.",
        zh: "張老師繳交的是課程大綱而非教師介紹，因此她的卡片目前只有姓名與班級。加入本欄後，這將是卡片上唯一的內容。仍建議另請老師提供簡短的個人介紹。",
      },
      {
        level: "decision",
        en: "The English is our translation, including the ACTFL level references (Novice, Novice High, Intermediate Low), which are carried over from her original.",
        zh: "英文為本站翻譯，其中 ACTFL 等級（Novice、Novice High、Intermediate Low）沿用老師原稿。",
      },
    ],
  },

  "nicole-shieh": {
    notes: [
      {
        code: "C4",
        en: "Step-by-step practice in listening, speaking, reading, and writing. The first hour covers the textbook; the second puts it to use through games, crafts, and interactive activities. Learning happens through play, and children build both ability and confidence in a relaxed bilingual environment.",
        zh: "透過聽、說、讀、寫的循序練習，讓孩子一步一步學好中文。第一小時學習課本內容，第二小時則透過遊戲、勞作與互動活動，在輕鬆有趣的環境中練習所學，讓孩子邊玩邊學，逐步建立中文能力與自信。",
      },
    ],
    review: [
      {
        level: "correction",
        en: "Like Ms. Chang, Ms. Shieh submitted class descriptions rather than a biography, so her card currently shows only a name and class list. Her Language Support Club copy went to that elective's description instead — see /electives-diff.",
        zh: "與張老師相同，謝老師繳交的是課程說明而非教師介紹，卡片目前僅有姓名與班級。她所撰寫的 Language Support Club 內容已改放入該選修課的說明，請見 /electives-diff。",
      },
    ],
  },

  "rose-lau": {
    notes: [
      {
        code: "C5",
        en: "The bilingual fifth-grade course develops listening, speaking, reading, and writing. Instruction focuses on sentence structure and usage, and on the vocabulary presented in the textbook. Regular listening and speaking activities build confidence in oral communication, and writing instruction develops simple one- to two-paragraph compositions. Cultural topics are incorporated throughout to deepen students' appreciation of the language and its context.",
        zh: "雙語班五年級全面提升學生聽、說、讀、寫的中文能力。教學著重句子結構及其實際運用，以及課本中的詞彙。課堂安排定期的聽力與口語練習，提升口語表達能力與溝通信心；寫作方面，學生將學習撰寫一至兩段的短文。課程亦融入豐富的文化主題，加深學生對中華文化的認識與欣賞。",
      },
    ],
    review: [
      {
        level: "decision",
        en: "The English here is Ms. Lau's own, lightly trimmed — not a translation.",
        zh: "此處英文為關老師親撰，僅作輕微精簡，非翻譯稿。",
      },
    ],
  },

  "amy-chang": {
    notes: [
      {
        code: "AC1",
        en: "Chinese Level 1 uses Integrated Chinese, Volume 1 to give beginning learners a solid foundation. Topics cover introductions, family, school life, friends, time, daily activities, food, shopping, and leisure, while students develop pronunciation, Pinyin, characters, vocabulary, and basic sentence structures. The course also emphasizes cultural learning through dialogues, role-play, group activities, and cultural comparison.",
        zh: "中文第一級以《Integrated Chinese（中文聽說讀寫）》第一冊為主要教材，為初學者建立紮實的中文基礎。內容涵蓋自我介紹、家庭、學校生活、朋友、時間、日常活動、飲食、購物與休閒等主題，逐步學習發音、漢語拼音、漢字、詞彙及基本句型。課程同時重視文化學習，透過對話、角色扮演、小組活動與文化比較，認識華人文化與生活方式。",
      },
    ],
    review: [
      {
        level: "correction",
        en: "Ms. Chang's submission was the Integrated Chinese Level 1 syllabus in full, in both languages, with nothing about herself — so her card currently shows only a name and class list. Condensed to roughly a third; both languages are hers.",
        zh: "張老師繳交的是完整的《Integrated Chinese》第一級課程大綱（中英文皆有），未提及個人背景，因此卡片目前僅有姓名與班級。此處精簡至約三分之一，中英文均為老師原稿。",
      },
    ],
  },
};

/** Cross-cutting notes for /teachers-diff, shown above the roster. */
export const teachersReviewNotes: ReviewNote[] = [
  {
    level: "decision",
    en: "Course notes are collapsed by default. Only 10 of the 23 language and AC classes have them, and a closed disclosure keeps the roster scannable while making the gaps unremarkable.",
    zh: "課程重點預設為收合狀態。23 個中文與學分班級中僅 10 班提供內容，收合可維持名單的易讀性，也讓尚未提供的班級不顯突兀。",
  },
  {
    level: "question",
    en: "Nothing else on the teachers page changes — bios, taglines, names, and the class chips are all exactly as they are on the live page today.",
    zh: "師資頁其餘內容均無更動——教師介紹、標語、姓名與班級標籤皆與目前線上版本相同。",
  },
];
