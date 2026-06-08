// All page copy lives here, keyed by locale, so pages stay thin and the EN/中文
// versions never drift apart structurally. External links are shared (not
// translated) and centralized so they're easy to update in one place.

export const links = {
  register: 'https://fremontchineseschool.org/registration',
  payment: 'https://fremontchineseschool.org/online-payment',
  calendarZh:
    'https://drive.google.com/file/d/1LgAKCRMIiecG3fpMC2w6Hwx2zpWYXGd3/view',
  calendarEn:
    'https://drive.google.com/file/d/1jEHtmbAqxjldM-q1NdFuryYcHENRhDui/view',
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
} as const;

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
        },
        {
          title: 'Enroll',
          body: 'New and returning families register online. See tuition, fees, and placement details.',
          route: 'enroll',
        },
        {
          title: 'School Calendar',
          body: 'Download the 2026–2027 school-year calendar in English or Chinese.',
          route: 'calendar',
        },
      ],
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
          body: 'Classes from beginner through advanced, following established Mandarin curricula. Students build reading, writing, listening, and speaking skills in a supportive weekend setting.',
        },
        {
          heading: 'Accredited Curriculum (AC / 學分班)',
          body: 'Our WASC-accredited high-school Chinese course lets eligible students earn high-school credit. A placement test determines the appropriate level — see the Enroll page for placement details.',
        },
        {
          heading: 'Electives',
          body: 'Enrichment classes such as Chinese painting and Chinese yo-yo give students a fun, hands-on connection to Chinese culture.',
        },
      ],
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
          link: 'payment',
        },
        {
          heading: 'AC placement test',
          body: 'Students new to the Accredited Curriculum take a placement test. Watch for the placement-test announcement and register online when it opens.',
        },
      ],
      calendarNote:
        'Check the school calendar for the first day of class and important dates.',
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
        },
        {
          title: '報名註冊',
          body: '新生與舊生皆於線上報名。可查看學費、費用與分班相關資訊。',
          route: 'enroll',
        },
        {
          title: '學校行事曆',
          body: '下載 2026–2027 學年行事曆（中文版或英文版）。',
          route: 'calendar',
        },
      ],
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
          body: '課程涵蓋初級至高級，採用成熟的中文教材，於溫馨的週末環境中培養學生聽、說、讀、寫的能力。',
        },
        {
          heading: '學分班（Accredited Curriculum / AC）',
          body: '本校通過 WASC 認證的高中中文課程，讓符合資格的學生取得高中學分。新生須參加分班考試以決定適合的程度，分班詳情請見「報名註冊」頁面。',
        },
        {
          heading: '才藝選修',
          body: '國畫、扯鈴等才藝課程，讓學生以有趣且實作的方式親近中華文化。',
        },
      ],
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
          link: 'payment',
        },
        {
          heading: '學分班分班考試',
          body: '初次修讀學分班的學生須參加分班考試。請留意分班考試公告，並於開放時線上報名。',
        },
      ],
      calendarNote: '開學日與重要日期請參閱學校行事曆。',
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
