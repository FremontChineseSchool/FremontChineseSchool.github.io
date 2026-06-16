// All page copy lives here, keyed by locale, so pages stay thin and the EN/中文
// versions never drift apart structurally. External links are shared (not
// translated) and centralized so they're easy to update in one place.

export const links = {
  register: 'https://sites.google.com/fremontchineseschool.org/mainpage/home',
  payment: 'https://fremontchineseschool.org/online-payment',
  calendarZh:
    'https://drive.google.com/file/d/1LgAKCRMIiecG3fpMC2w6Hwx2zpWYXGd3/view',
  calendarEn:
    'https://drive.google.com/file/d/1jEHtmbAqxjldM-q1NdFuryYcHENRhDui/view',
  tuitionPdf: 'https://docs.google.com/document/d/1eMiXP6MsfTPzySyFSNG8VMmvKSI8NSzo2Vb3Mg72Gn8/view',
  facebook: 'https://facebook.com/fremontchineseschool',
} as const;

// Contact details — values shared across locales; labels are translated below.
export const contactInfo = {
  principal: 'Principal@fremontchineseschool.org',
  office: 'contact@fremontchineseschool.org',
  registration: 'Registration@fremontchineseschool.org',
  voicemail: '(510) 468-9905',
  mailing: 'PO Box 1309, Fremont, CA 94538',
  classroom: '41800 Blacow Road, Fremont, CA 94538',
  principalName: 'Angela Ha',
  principalNameZh: '夏芷筠',
} as const;

// Per-page meta descriptions (SEO snippets), keyed by route key. Kept separate
// from on-page copy so search/social snippets can be tuned without disturbing
// layout text. BaseLayout looks these up by the current route; passing a
// `description` prop to BaseLayout overrides the lookup. Aim for ~150 chars.
export const descriptions: Record<'en' | 'zh', Record<string, string>> = {
  en: {
    home: 'Fremont Chinese School is a WASC-accredited, non-profit weekend school teaching Mandarin Chinese language and culture in Fremont, CA since 1972.',
    about:
      'Fremont Chinese School (FCS) — a WASC-accredited non-profit founded in 1972 and one of the largest Chinese schools in the East Bay.',
    programs:
      'Mandarin Chinese classes for pre-K through 12th grade, a WASC-accredited high-school credit track, and electives like Chinese painting and yo-yo.',
    enroll:
      'Enroll at Fremont Chinese School. New and returning families register online — see tuition, fees, and AC placement-test details for the school year.',
    payment:
      'Pay Fremont Chinese School tuition and fees securely online — browse items, add to your cart, and check out right on the page.',
    calendar:
      'Download the Fremont Chinese School 2026–2027 school-year calendar in English or Chinese, with the first day of class and key dates.',
    events:
      'Chinese New Year celebrations, food festival, academic contests, and more — community events for FCS students and families throughout the year.',
    donate:
      'Support Fremont Chinese School with a tax-deductible gift to our 501(c) non-profit and help bring Mandarin classes to more East Bay families.',
    contact:
      'Contact Fremont Chinese School — principal, school office, registration, mailing address, classroom location in Fremont, CA, and Facebook.',
  },
  zh: {
    home: '費利蒙中文學校（FCS）自 1972 年起於加州費利蒙教授中文語文與文化，是通過 WASC 認證的非營利週末學校。',
    about:
      '認識費利蒙中文學校（FCS）——創立於 1972 年、通過 WASC 認證的非營利組織，是東灣規模最大的中文學校之一。',
    programs:
      '提供學前班至十二年級的中文課程、通過 WASC 認證可抵高中學分的學分班，以及國畫、扯鈴等才藝選修課程。',
    enroll:
      '在費利蒙中文學校報名。新生與舊生線上註冊，並查看學費、各項費用與學分班分班考試的詳情。',
    payment:
      '直接在線上安全繳交費利蒙中文學校的學費與各項費用——瀏覽項目、加入購物車並於本頁結帳。',
    calendar:
      '下載費利蒙中文學校 2026–2027 學年行事曆（中文版或英文版），查看開學日與重要日期。',
    events:
      '新春聯歡、小吃義賣、學術比賽等——費利蒙中文學校全年為學生與家庭舉辦的精彩社區活動。',
    donate:
      '以可抵稅的捐款支持費利蒙中文學校 501(c) 非營利組織，協助更多東灣家庭學習中文。',
    contact:
      '聯絡費利蒙中文學校——校長、學校辦公室、報名註冊、通訊地址、加州費利蒙上課地點與 Facebook。',
  },
};

export const content = {
  en: {
    home: {
      heroTitle: 'Fremont Chinese School',
      heroSubtitle:
        'A WASC-accredited, non-profit weekend school teaching Chinese language and culture in the East Bay since 1972.',
      heroSlidesAlt: [
        'Chinese New Year celebration with award winners',
        'FCS students marching in a community parade',
        'Academic contest winners with the FCS school flag',
        'FCS families at a community parade',
        'Students performing on stage',
        'Lunar New Year awards ceremony',
      ],
      ctaPrimary: 'Enroll Now',
      ctaSecondary: 'Explore Programs',
      facts: [
        { label: 'Founded', value: '1972' },
        { label: 'Accreditation', value: 'WASC' },
        { label: 'When', value: 'Saturdays' },
        { label: 'Where', value: 'Fremont, CA' },
      ],
      cardsTitle: 'Get started',
      cards: [
        {
          title: 'Our Programs',
          body: 'Chinese language classes for all levels, WASC-accredited high-school credit, and electives like painting and yo-yo.',
          route: 'programs',
          linkLabel: 'Explore Programs',
        },
        {
          title: 'Enroll',
          body: 'New and returning families register online. See tuition, fees, and placement details.',
          route: 'enroll',
          linkLabel: 'Go to Enroll',
        },
        {
          title: 'School Calendar',
          body: 'Download the 2026–2027 school-year calendar in English or Chinese.',
          route: 'calendar',
          linkLabel: 'View Calendar',
        },
      ],
      featuresTitle: 'Why families choose FCS',
      featuresSubtitle:
        'A warm, community-centered place to learn Mandarin and grow up connected to Chinese culture.',
      features: [
        {
          title: '50+ years of community',
          body: 'Since 1972, generations of East Bay families have learned and grown at FCS.',
        },
        {
          title: 'WASC-accredited',
          body: 'Earn real high-school credit through our accredited Chinese curriculum.',
        },
        {
          title: 'Every level welcome',
          body: 'From first characters to advanced fluency, plus electives like painting and yo-yo.',
        },
        {
          title: 'More than a classroom',
          body: 'New Year celebrations, contests, and performances — culture you can feel.',
        },
      ],
      showcaseAlt: 'FCS students celebrating together at a school event',
      eventsTitle: 'Life at FCS',
      eventsLead:
        'Learning spills beyond the classroom into celebrations families look forward to all year.',
      eventsCta: 'See all events',
      ctaTitle: 'Ready to join us this year?',
      ctaBody:
        "Enrollment is open to new and returning families. Reserve your child's place for the 2026–2027 school year.",
    },
    about: {
      title: 'About FCS',
      sections: [
        {
          heading: 'A school with a long history',
          body: [
            'Fremont Chinese School (FCS) was founded in 1972. What began as a home school with little more than ten students has grown into one of the largest Chinese schools in the East Bay.',
            'For more than fifty years, FCS has welcomed families who want their children to learn Mandarin Chinese and connect with Chinese culture in a warm, community-centered setting.',
          ],
        },
        {
          heading: 'Our mission',
          body: [
            'FCS is dedicated to teaching Chinese language and culture. We are an education-focused non-profit organization and are independent of any political party, religion, or political organization.',
          ],
        },
        {
          heading: 'Accreditation',
          body: [
            'Our Supplementary Education Program is accredited by the Accrediting Commission for Schools, Western Association of Schools and Colleges (WASC) — the same body that accredits California public and private high schools.',
          ],
        },
        {
          heading: 'Organization',
          body: [
            'FCS is governed by a School Board and an Executive Committee, supported by an active PTA. Our bylaws are available to download below.',
          ],
        },
      ],
      regulationsLabel: 'Download FCS bylaws (規章)',
    },
    programs: {
      title: 'Programs',
      intro:
        'We offer Chinese language classes for all levels, plus electives and a WASC-accredited credit track for high-school students.',
      sections: [
        {
          heading: 'Chinese Language',
          // TODO(verify): confirm exact grade range and track names with the school office.
          body: 'Weekend classes run from pre-K through 12th grade, all taught in Traditional Chinese. Choose the full-Chinese track for students from Mandarin-speaking families, or the bilingual track designed for beginners and heritage learners easing into the language. Students build reading, writing, listening, and speaking skills following established Mandarin curricula.',
        },
        {
          heading: 'Accredited Curriculum (AC / 學分班)',
          body: 'Our WASC-accredited high-school Chinese course lets eligible students earn high-school credit. A placement test determines the appropriate level — see the Enroll page for placement details.',
        },
        {
          heading: 'Electives',
          body: 'Enrichment classes such as Chinese painting, Chinese yo-yo, coding, and basketball give students a fun, hands-on connection to Chinese culture and a chance to make friends beyond the language classroom.',
        },
      ],
      tuition: {
        title: 'Tuition & Fees',
        earlyBirdLabel: 'Early Bird',
        regularLabel: 'Regular',
        earlyBirdNote:
          'Register and pay by May 16, 2026 to receive the Early Bird rate.',
        rows: [
          { track: 'CSL language class only (K–8)', earlyBird: 'from $780', regular: 'from $880' },
          { track: 'CSL + electives (K–8)', earlyBird: 'from $1,310', regular: 'from $1,510' },
          { track: 'AC accredited track (8–12)', earlyBird: 'from $1,300', regular: 'from $1,670' },
          { track: 'Electives only (K–12, adult)', earlyBird: 'from $630', regular: 'from $720' },
        ],
        notes: [
          'New student registration fee: +$50.',
          'Online payment via PayPal has a non-refundable 5% surcharge.',
        ],
        pdfLabel: 'Download full tuition schedule (PDF)',
      },
    },
    enroll: {
      title: 'Enroll',
      intro:
        'New and returning families are welcome. Registration and payments are handled through our existing school portal.',
      steps: [
        {
          heading: 'Register online',
          body: 'Complete registration through the FCS registration portal.',
          linkLabel: 'Go to registration',
          link: 'register',
        },
        {
          heading: 'Pay tuition & fees',
          body: 'Tuition and fees (including AC placement and other fees) are paid through the FCS online payment page.',
          linkLabel: 'Go to online payment',
          route: 'payment',
        },
        {
          heading: 'AC placement test',
          body: 'Students new to the Accredited Curriculum take a placement test. Watch for the placement-test announcement and register online when it opens.',
        },
      ],
      calendarNote:
        'Check the school calendar for the first day of class and important dates.',
    },
    payment: {
      title: 'Online Payment',
      intro:
        'Pay tuition and school fees right here. Browse the items below, add what you need to your cart, and check out securely — all on this page.',
      loading: 'Loading the payment store…',
      note: 'Payments are processed securely through our school store. If you are unsure which item to pay, check your registration confirmation or contact the school office.',
    },
    calendar: {
      title: 'School Calendar',
      yearLabel: '2026–2027 School Year',
      intro: 'Download the school-year calendar:',
      downloadZh: '下載中文版行事曆 (Chinese)',
      downloadEn: 'Download English calendar',
    },
    events: {
      title: 'Events',
      intro:
        'Throughout the year FCS hosts community events for students and families. Specific dates for each school year are announced on our Facebook page and in class.',
      annualTitle: 'Events we look forward to each year',
      annual: [
        'Chinese New Year Celebration',
        'Food Festival (小吃義賣)',
        'Academic Contest (學術比賽)',
        'Chinese Yo-Yo activities',
        'Open House',
        'Graduation Ceremony',
      ],
    },
    donate: {
      title: 'Support FCS',
      body: [
        'FCS is a non-profit 501(c) organization. Your donation is tax-deductible and helps us offer more classes to families in our community who want to learn Mandarin Chinese in a fun, welcoming way.',
        'Many employers match charitable gifts — please check whether your company can double your contribution.',
      ],
      sponsorHeading: 'Sponsors & yearbook ads',
      sponsorBody:
        'Interested in sponsoring FCS or placing a yearbook ad? We would love to hear from you.',
      contactEmailLabel: 'Email the principal',
    },
    contact: {
      title: 'Contact Us',
      labels: {
        principal: 'Principal',
        office: 'School Office',
        registration: 'Registration',
        voicemail: 'Voicemail',
        mailing: 'Mailing Address',
        classroom: 'Classroom Location',
        facebook: 'Facebook',
      },
    },
  },

  zh: {
    home: {
      heroTitle: '費利蒙中文學校',
      heroSubtitle:
        '自 1972 年起，於東灣地區教授中華語文與文化，為通過 WASC 認證的非營利週末學校。',
      heroSlidesAlt: [
        '新春聯歡會與得獎學生',
        '本校學生參加社區遊行',
        '學術比賽得獎學生與校旗合影',
        '本校家庭參加社區遊行',
        '學生舞台表演',
        '新春頒獎典禮',
      ],
      ctaPrimary: '立即報名',
      ctaSecondary: '瀏覽課程',
      facts: [
        { label: '創校', value: '1972' },
        { label: '認證', value: 'WASC' },
        { label: '上課時間', value: '每週六' },
        { label: '地點', value: '加州費利蒙' },
      ],
      cardsTitle: '從這裡開始',
      cards: [
        {
          title: '課程介紹',
          body: '各程度中文課程、通過 WASC 認證可抵高中學分的學分班，以及國畫、扯鈴等才藝課程。',
          route: 'programs',
          linkLabel: '瀏覽課程',
        },
        {
          title: '報名註冊',
          body: '新生與舊生皆於線上報名。可查看學費、費用與分班相關資訊。',
          route: 'enroll',
          linkLabel: '前往報名',
        },
        {
          title: '學校行事曆',
          body: '下載 2026–2027 學年行事曆（中文版或英文版）。',
          route: 'calendar',
          linkLabel: '查看行事曆',
        },
      ],
      featuresTitle: '家庭選擇本校的理由',
      featuresSubtitle:
        '在溫馨、以社區為本的環境中學習中文，伴隨孩子親近中華文化、共同成長。',
      features: [
        {
          title: '五十餘年社區傳承',
          body: '自 1972 年以來，東灣一代又一代的家庭在本校學習、成長。',
        },
        {
          title: 'WASC 認證',
          body: '透過本校認證的中文課程，取得正式高中學分。',
        },
        {
          title: '適合各種程度',
          body: '從第一個字到流利進階，另設國畫、扯鈴等才藝選修。',
        },
        {
          title: '不只是課堂',
          body: '新春聯歡、學術比賽、舞台表演——讓你親身感受文化。',
        },
      ],
      showcaseAlt: '本校學生於校園活動中歡聚同樂',
      eventsTitle: '校園生活',
      eventsLead: '學習延伸到課堂之外，化為全家人整年期待的精彩活動。',
      eventsCta: '查看所有活動',
      ctaTitle: '準備好今年加入我們了嗎？',
      ctaBody: '新生與舊生皆可報名。為您的孩子預留 2026–2027 學年的名額。',
    },
    about: {
      title: '關於本校',
      sections: [
        {
          heading: '歷史悠久的學校',
          body: [
            '費利蒙中文學校（FCS）創立於 1972 年。最初僅是一所十餘名學生的家庭學校，如今已成長為東灣地區規模最大的中文學校之一。',
            '五十多年來，本校歡迎每一個希望孩子學習中文、親近中華文化的家庭，營造溫馨而以社區為本的學習環境。',
          ],
        },
        {
          heading: '本校宗旨',
          body: [
            '本校以傳授中國文化、語文為宗旨，是以教育為主的非營利組織，不介入任何黨派、宗教及政治的組織。',
          ],
        },
        {
          heading: '學校認證',
          body: [
            '本校的補充教育課程獲得西部學校與學院協會（WASC）學校認證委員會認證——即認證加州公立與私立高中的同一機構。',
          ],
        },
        {
          heading: '組織',
          body: [
            '本校設有校董會與執行委員會，並有家長會（PTA）積極協助校務。本校規章可於下方下載。',
          ],
        },
      ],
      regulationsLabel: '下載本校規章',
    },
    programs: {
      title: '課程',
      intro:
        '本校提供各程度的中文課程，並設有才藝選修課程，以及通過 WASC 認證、可供高中生修習的學分課程。',
      sections: [
        {
          heading: '中文課程',
          // TODO(verify): confirm exact grade range and track names with the school office.
          body: '週末班級涵蓋學前班（Pre-K）至十二年級，全程以正體（繁體）中文授課。可選擇適合來自華語家庭學生的全中文班，或專為初學者與華裔子弟設計、循序漸進的雙語班。學生依循成熟的中文教材，培養聽、說、讀、寫的能力。',
        },
        {
          heading: '學分班（Accredited Curriculum / AC）',
          body: '本校通過 WASC 認證的高中中文課程，讓符合資格的學生取得高中學分。新生須參加分班考試以決定適合的程度，分班詳情請見「報名註冊」頁面。',
        },
        {
          heading: '才藝選修',
          body: '國畫、扯鈴、程式設計（coding）與籃球等才藝選修課程，讓學生以有趣且實作的方式親近中華文化，並在語文課堂之外結交朋友。',
        },
      ],
      tuition: {
        title: '學費與費用',
        earlyBirdLabel: '早鳥優惠',
        regularLabel: '一般費用',
        earlyBirdNote: '於 2026 年 5 月 16 日前完成報名並繳費，即可享早鳥優惠。',
        rows: [
          { track: '中文課程（僅語文班，K–8）', earlyBird: '起 $780', regular: '起 $880' },
          { track: '中文課程＋才藝選修（K–8）', earlyBird: '起 $1,310', regular: '起 $1,510' },
          { track: '學分班（8–12 年級）', earlyBird: '起 $1,300', regular: '起 $1,670' },
          { track: '僅才藝選修（K–12，成人）', earlyBird: '起 $630', regular: '起 $720' },
        ],
        notes: [
          '新生報名費：另加 $50。',
          '透過 PayPal 線上付款將加收不可退還之 5% 手續費。',
        ],
        pdfLabel: '下載完整學費說明（PDF）',
      },
    },
    enroll: {
      title: '報名註冊',
      intro:
        '歡迎新生與舊生報名。報名與繳費皆透過本校現有的入口網站辦理。',
      steps: [
        {
          heading: '線上報名',
          body: '請透過本校報名系統完成註冊。',
          linkLabel: '前往報名系統',
          link: 'register',
        },
        {
          heading: '繳交學費與費用',
          body: '學費與各項費用（含學分班分班考試費及其他費用）皆透過本校線上付款頁面繳交。',
          linkLabel: '前往線上付款',
          route: 'payment',
        },
        {
          heading: '學分班分班考試',
          body: '初次修讀學分班的學生須參加分班考試。請留意分班考試公告，並於開放時線上報名。',
        },
      ],
      calendarNote: '開學日與重要日期請參閱學校行事曆。',
    },
    payment: {
      title: '線上付款',
      intro:
        '直接在此頁繳交學費與各項學校費用。瀏覽下方項目，將所需項目加入購物車，並於本頁安全結帳。',
      loading: '正在載入付款商店…',
      note: '款項皆透過本校商店安全處理。若不確定應繳交哪一項目，請查看您的報名確認資訊，或聯絡學校辦公室。',
    },
    calendar: {
      title: '學校行事曆',
      yearLabel: '2026–2027 學年',
      intro: '下載本學年行事曆：',
      downloadZh: '下載中文版行事曆',
      downloadEn: '下載英文版行事曆 (English)',
    },
    events: {
      title: '活動',
      intro:
        '本校全年舉辦各項社區活動，與學生及家庭同樂。各學年的詳細日期將於本校 Facebook 專頁及課堂上公布。',
      annualTitle: '每年精彩活動',
      annual: [
        '新春聯歡會',
        '小吃義賣',
        '學術比賽',
        '扯鈴活動',
        '開放參觀日（Open House）',
        '畢業典禮',
      ],
    },
    donate: {
      title: '支持本校',
      body: [
        '費利蒙中文學校為 501(c) 非營利組織。您的捐款可享稅務抵減，並協助本校為社區中有意以輕鬆愉快方式學習中文的家庭開辦更多課程。',
        '許多公司提供慈善捐款配對方案，歡迎您查詢服務的公司是否能讓您的捐款加倍。',
      ],
      sponsorHeading: '贊助與年刊廣告',
      sponsorBody:
        '有意贊助本校或刊登年刊廣告嗎？歡迎與我們聯絡。',
      contactEmailLabel: '聯絡校長',
    },
    contact: {
      title: '聯絡我們',
      labels: {
        principal: '校長',
        office: '學校辦公室',
        registration: '報名註冊',
        voicemail: '語音信箱',
        mailing: '通訊地址',
        classroom: '上課地點',
        facebook: 'Facebook',
      },
    },
  },
} as const;
