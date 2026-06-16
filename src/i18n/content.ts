// All page copy lives here, keyed by locale, so pages stay thin and the EN/中文
// versions never drift apart structurally. External links are shared (not
// translated) and centralized so they're easy to update in one place.

export const links = {
  // Direct Google Form — bypasses the old Google Sites hub
  register: 'https://docs.google.com/forms/d/175aEJTOm76f6rOUqXarUuwNtlfV1n8o-GTWFmJA-5Gg/viewform',
  addDropTransfer: 'https://docs.google.com/forms/d/1X-RYHC61egynClnz_Bu17IokmcIMY1j8cwuwWzvVIzo/viewform',
  registrationGuide: 'https://docs.google.com/document/d/1Xk7q5gsK8CrA9PoW9EQoqs3RVP_wltkYIZ_H4TXJn8Q/view',
  gradeChart: 'https://drive.google.com/file/d/1qLV_WTqvwzNGEyjS5eoVIbe9pC3aOq5T/view',
  electiveList: 'https://docs.google.com/document/d/1WDBeqIcvrPU3i4yFUAt5mSVNFKYoWNjRWQ1Uy-wNBTs/view',
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
        enrollCta: 'Enroll Now',
      },
    },
    enroll: {
      title: 'Enroll',
      intro:
        'New and returning families register each year. The steps below walk you through registration, payment, and any placement testing.',
      newFamilyNote: 'New family? Read the registration guidelines before you begin.',
      newFamilyGuideLabel: 'Registration guidelines & policy',
      stepsTitle: 'How to register',
      steps: [
        {
          heading: 'Register online',
          body: 'Complete the FCS registration form — choose your program track, class level, and electives.',
          linkLabel: 'Go to registration form',
          link: 'register',
        },
        {
          heading: 'Pay tuition & fees',
          body: 'Register and pay by May 16, 2026 for the Early Bird rate. See Programs for full tuition details. Online payment via PayPal has a 5% surcharge.',
          linkLabel: 'Go to online payment',
          route: 'payment',
        },
        {
          heading: 'AC placement test (if applicable)',
          body: 'Students new to the Accredited Curriculum take a placement test. Watch for the placement-test announcement and register online when it opens.',
        },
      ],
      returningNote: 'Returning student? Need to add, drop, or transfer a class after registering?',
      returningLinkLabel: 'Submit a class change request',
      keyDatesTitle: 'Key Dates',
      keyDates: [
        {
          label: 'Early Bird deadline',
          date: 'May 16, 2026',
          note: 'Register and pay by this date to save $100–$150.',
        },
        {
          label: 'Refund cutoff',
          // TODO: confirm 2026-2027 refund cutoff date with school office
          date: 'See registration guidelines',
          note: 'No refunds after this date. Email finance@fremontchineseschool.org with questions.',
        },
      ],
      placementTitle: 'Finding the right class level',
      placementBody:
        'FCS classes are organized by language ability, not school grade. Use the FUSD grade chart as a starting point — contact the school office if you\'re unsure.',
      placementLinkLabel: 'Download FUSD grade chart',
      electivesTitle: 'Electives',
      electivesBody:
        'Enrich your child\'s experience with electives like Chinese painting, Chinese yo-yo, coding, and basketball. You\'ll select electives during the registration form.',
      electivesLinkLabel: 'View full elective list',
      faqTitle: 'Frequently Asked Questions',
      faq: [
        {
          q: 'What is the tuition?',
          a: 'See the Programs page for a full tuition summary by track. The complete tuition schedule is also available as a PDF download.',
        },
        {
          q: 'How do I get a refund?',
          a: 'Submit a withdrawal form before the refund cutoff date. The finance team processes refunds to the original payment method, or mails a check if unable to process within 6 months. Email finance@fremontchineseschool.org for status.',
        },
        {
          q: 'How do I add, drop, or transfer a class after registering?',
          a: 'Submit the class change request form. Changes are subject to availability.',
        },
        {
          q: 'How do I update my contact information?',
          a: 'Email registration@fremontchineseschool.org and computer@fremontchineseschool.org with your child\'s name, FCS ID, and class code.',
        },
        {
          q: 'What electives are available?',
          a: 'Current offerings include Chinese painting, Chinese yo-yo, coding, and basketball. See the full elective list for details and scheduling.',
        },
      ],
      resourcesTitle: 'All Registration Documents',
      resources: [
        { label: 'Registration guidelines & policy', link: 'registrationGuide' },
        { label: 'FUSD grade placement chart', link: 'gradeChart' },
        { label: 'Elective class list', link: 'electiveList' },
        { label: 'Full tuition schedule', link: 'tuitionPdf' },
        { label: 'Class change request form', link: 'addDropTransfer' },
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
        enrollCta: '立即報名',
      },
    },
    enroll: {
      title: '報名註冊',
      intro:
        '新生與舊生每年皆須完成報名。以下步驟將引導您完成報名、繳費及分班流程。',
      newFamilyNote: '初次報名？請於開始前先閱讀報名規章。',
      newFamilyGuideLabel: '報名規章與注意事項',
      stepsTitle: '報名流程',
      steps: [
        {
          heading: '線上報名',
          body: '填寫本校報名表，選擇課程班別、程度及才藝選修課程。',
          linkLabel: '前往報名表',
          link: 'register',
        },
        {
          heading: '繳交學費與費用',
          body: '於 2026 年 5 月 16 日前完成繳費，可享早鳥優惠。詳細學費請見「課程」頁面。透過 PayPal 線上付款將加收 5% 手續費。',
          linkLabel: '前往線上付款',
          route: 'payment',
        },
        {
          heading: '學分班分班考試（如適用）',
          body: '初次修讀學分班的學生須參加分班考試。請留意分班考試公告，並於開放時線上報名。',
        },
      ],
      returningNote: '舊生若需加課、退課或換課，請填寫申請表。',
      returningLinkLabel: '提交課程異動申請',
      keyDatesTitle: '重要日期',
      keyDates: [
        {
          label: '早鳥優惠截止',
          date: '2026 年 5 月 16 日',
          note: '於此日期前完成報名並繳費，可省 $100–$150。',
        },
        {
          label: '退費截止',
          date: '詳見報名規章',
          note: '截止日期後不予退費。如有問題請來信 finance@fremontchineseschool.org。',
        },
      ],
      placementTitle: '如何確認適合的班級程度',
      placementBody:
        '本校依語文程度分班，非依學校年級。可參考學區年級對照表（FUSD Grade Chart）作為初步依據，如有疑問請聯絡學校辦公室。',
      placementLinkLabel: '下載學區年級對照表',
      electivesTitle: '才藝選修課程',
      electivesBody:
        '選修課程包括國畫、扯鈴、程式設計與籃球等，於報名時一併選擇。',
      electivesLinkLabel: '查看完整選修課程列表',
      faqTitle: '常見問題',
      faq: [
        {
          q: '學費是多少？',
          a: '請至「課程」頁面查看各班別學費摘要，或下載完整學費方案 PDF。',
        },
        {
          q: '如何申請退費？',
          a: '請於退費截止日前提交退課申請表。財務組將退款至原付款方式，或於六個月內無法處理時以支票寄送。如需查詢退費狀態，請來信 finance@fremontchineseschool.org。',
        },
        {
          q: '報名後如何加課、退課或換課？',
          a: '請填寫課程異動申請表，名額異動視班級餘額而定。',
        },
        {
          q: '如何更新聯絡資料？',
          a: '請將學生姓名、本校學號及班級代碼來信至 registration@fremontchineseschool.org 及 computer@fremontchineseschool.org。',
        },
        {
          q: '有哪些才藝選修課程？',
          a: '目前提供國畫、扯鈴、程式設計及籃球等課程。詳情請查看完整選修課程列表。',
        },
      ],
      resourcesTitle: '所有報名文件',
      resources: [
        { label: '報名規章與注意事項', link: 'registrationGuide' },
        { label: '學區年級對照表', link: 'gradeChart' },
        { label: '才藝選修課程列表', link: 'electiveList' },
        { label: '完整學費方案', link: 'tuitionPdf' },
        { label: '課程異動申請表', link: 'addDropTransfer' },
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
