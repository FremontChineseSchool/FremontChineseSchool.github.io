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
  irsDetermination: 'https://tinyurl.com/ybyr44ku',
  legacyEvents: 'https://fremontchineseschool.org/events',
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
      locationHeading: 'Where we meet',
      locationBody: 'Classes are held every Saturday at Irvington High School in Fremont. The school year generally runs from September through June, following the local public school calendar.',
      locationDetail: 'Irvington High School · 41800 Blacow Rd, Fremont, CA 94538',
      sections: [
        {
          heading: 'A school with a long history',
          body: [
            'Fremont Chinese School (FCS) was founded in 1972 by parents who wanted their children to learn Mandarin and stay connected to their heritage. What began as a home school with fewer than ten students has grown into one of the largest Chinese schools in the East Bay, with more than 200 registered students and 30+ teaching staff.',
            'FCS has always been run by parent volunteers — from classroom aides to the full administrative team of around 50 staff. In 1994, when FCS could no longer accommodate all applicants, the school helped establish Tri-City Chinese School in northern Fremont, providing operational guidance and teaching staff to serve even more families in the community.',
            'Beyond the classroom, FCS participates in the Fremont 4th of July Parade and the American Cancer Society Relay for Life, and coordinates AP Chinese online testing for Fremont Unified School District — reflecting our commitment to being a resource for the broader Fremont community.',
          ],
        },
        {
          heading: 'Our mission',
          body: [
            'FCS is dedicated to teaching Chinese language and culture. We are an education-focused non-profit organization and are independent of any political party, religion, or political organization.',
          ],
        },
        {
          heading: 'Curriculum',
          body: [
            'Language classes run from Pre-K through 12th grade in Traditional Chinese. Kindergarten uses the Zhuyin (ㄅㄆㄇㄈ) phonics system; Grades 1–8 follow the Children\'s Chinese Reader series supplemented by FCS-authored exercise books. The bilingual CSL track is designed for heritage learners and beginners.',
            'The Accredited Curriculum (AC) track for Grades 9–12 uses Integrated Chinese (Levels 2–4) and AP Chinese materials from National Normal University in Taiwan. AC credits fulfill foreign language requirements at area high schools, and FCS students have consistently placed in top rankings at ANCCS and NCACLS academic competitions.',
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
          schedule: 'Pre-K – 3rd grade: 11:10 am – 1:00 pm · 4th – 8th grade: 9:00 am – 10:50 am',
        },
        {
          heading: 'Accredited Curriculum (AC / 學分班)',
          body: 'Our WASC-accredited high-school Chinese course lets eligible students earn high-school credit. A placement test determines the appropriate level — see the Enroll page for placement details.',
          schedule: '8:50 am – 12:50 pm',
        },
        {
          heading: 'Electives',
          body: 'Choose from a wide range of enrichment classes: Chinese painting, Chinese calligraphy, abacus (珠心算), Chinese yo-yo, sewing, crafts, basketball, Basic Python coding, Intermediate Python coding, adult yoga, adult fitness, and online Chinese typing/writing. New electives are added each year.',
        },
      ],
      tutoringTitle: 'FCS Volunteer Tutoring',
      tutoringBadge: 'Free — enrolled students only',
      tutoringBody:
        'Enrolled FCS students have access to free one-on-one online tutoring provided by our volunteer tutors. Sessions are coordinated via email during the school year. Once enrolled, watch for an email with sign-up details — you\'ll need your FCS registration ID to reserve a spot.',
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
        'Enrich your child\'s experience with electives including Chinese painting, calligraphy, abacus, Chinese yo-yo, sewing, crafts, basketball, Python coding, yoga, and online Chinese typing. New classes are added each year — see the full list before registering.',
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
      volunteerTitle: 'Volunteer hours',
      volunteerBody:
        'Each enrolled family is required to contribute 3 volunteer hours per semester. Volunteer opportunities include helping at school events, serving as a classroom aide, and supporting administrative tasks. Hours are tracked by the school office.',
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
        'Throughout the year FCS brings together students, families, and staff for celebrations, competitions, and community traditions. Exact dates each school year are announced on our Facebook page and in class.',
      annualTitle: 'Annual events',
      annual: [
        {
          name: 'Open House',
          body: 'Prospective and current families visit classrooms, meet teachers, and learn about FCS programs before the new school year begins.',
        },
        {
          name: 'Chinese New Year Celebration (新春聯歡會)',
          body: 'Our biggest celebration of the year — students perform lion dances, musical numbers, skits, and cultural presentations for the whole community.',
        },
        {
          name: 'Food Festival (小吃義賣)',
          body: 'Families gather to enjoy homemade Chinese dishes, snacks, and desserts. A beloved tradition that raises funds for the school and brings the community together.',
        },
        {
          name: 'Academic Contest (學術比賽)',
          body: 'Students compete in Chinese reading, writing, and oral categories. Award winners are recognized at the Chinese New Year celebration.',
          route: 'academic-contest',
        },
        {
          name: 'ANCCS Competitions',
          body: 'FCS students participate in the Association of Northern California Chinese Schools competitions, including Analects interpretation, parent-child storytelling, and multimedia categories.',
        },
        {
          name: 'Chinese Yo-Yo (扯鈴) Showcase',
          body: 'Students from the Chinese yo-yo elective demonstrate their skills throughout the year at school events and community performances.',
        },
        {
          name: 'Double Ten Day (雙十節)',
          body: 'FCS observes the Republic of China National Day with a ceremony honoring Chinese cultural heritage.',
        },
        {
          name: 'Confucius Memorial Ceremony (祭孔典禮)',
          body: "A traditional ceremony commemorating Confucius's contributions to education and culture, observed at the start of the school year.",
        },
        {
          name: 'Teacher & Staff Appreciation Dinner',
          body: 'An annual dinner to recognize and celebrate the dedication of FCS teachers, staff, and volunteers.',
        },
        {
          name: 'Graduation Ceremony',
          body: 'Students completing the program are celebrated with a formal graduation ceremony at the end of the school year.',
        },
      ],
      photosTitle: 'Past photos & videos',
      photosBody:
        'Photos and videos from recent events are shared on our Facebook page. For archives going back to 2012, visit the event history on our legacy site.',
      photosFacebookLabel: 'Visit us on Facebook',
      photosLegacyLabel: 'Legacy event archive',
      calendarNote: 'Check the school calendar for this year\'s event dates.',
    },
    academicContest: {
      title: 'Academic Contest',
      intro:
        'FCS holds an annual Academic Contest open to all enrolled students. Top performers advance to the ANCCS regional competition representing Fremont Chinese School.',
      aboutTitle: 'About the contest',
      aboutBody:
        'The Academic Contest runs in two tiers: an internal FCS competition and the ANCCS (Association of Northern California Chinese Schools) regional contest. Students compete by grade group, and award winners are recognized at the Chinese New Year Celebration.',
      categoriesTitle: 'Contest categories',
      categories: [
        {
          name: 'Mandarin Speech (國語演講)',
          body: 'Students deliver a prepared speech in Mandarin on an assigned topic. Judged on pronunciation, fluency, expression, and content.',
        },
        {
          name: 'Reading Aloud (朗讀)',
          body: 'Students read a provided passage aloud in Mandarin or Cantonese. Judged on accuracy, tones, and pacing.',
        },
        {
          name: 'Brush Calligraphy (毛筆書法)',
          body: 'Students demonstrate Traditional Chinese calligraphy using a brush. Judged on stroke order, balance, and overall form.',
        },
        {
          name: 'Academic Tests',
          body: 'Written tests covering vocabulary, reading comprehension, and language skills, organized by level.',
        },
      ],
      resourcesTitle: 'Current year resources',
      resourcesNote:
        'Rules and registration materials for the 2025–2026 school year will be posted here when available. Questions? Email the Academic Contest coordinator.',
      rulesLabel: 'Contest rules (coming soon)',
      registerLabel: 'Register for the contest (coming soon)',
      contactLabel: 'Email ac@fremontchineseschool.org',
    },
    donate: {
      title: 'Support FCS',
      body: [
        'FCS is a non-profit 501(c) organization. Your donation is tax-deductible and helps us offer more classes to families in our community who want to learn Mandarin Chinese in a fun, welcoming way.',
        'Many employers match charitable gifts — please check whether your company can double your contribution.',
      ],
      einHeading: 'Tax information',
      einLabel: 'EIN (Tax ID)',
      einNumber: '94-2978949',
      irsLabel: 'IRS determination letter',
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
      locationHeading: '上課地點',
      locationBody: '本校每週六於費利蒙爾文頓高中（Irvington High School）上課，學年通常自九月起至翌年六月，與當地公立學校行事曆一致。',
      locationDetail: 'Irvington High School · 41800 Blacow Rd, Fremont, CA 94538',
      sections: [
        {
          heading: '歷史悠久的學校',
          body: [
            '費利蒙中文學校（FCS）由一群希望子女學習中文、傳承文化的家長於 1972 年創立。最初僅是十餘名學生的家庭學校，如今已成長為東灣地區規模最大的中文學校之一，擁有超過 200 名在學學生及 30 餘位教師。',
            '本校自創校以來一直由家長義工經營，從教室助理到約 50 名行政人員，皆由家長志願付出。1994 年，因本校無法再容納所有申請者，遂協助在費利蒙北部成立三城市中文學校（Tri-City Chinese School），提供行政指導與師資支援，讓更多家庭受益。',
            '在校外，本校積極參與費利蒙獨立紀念日遊行、美國癌症協會接力抗癌活動，並為費利蒙聯合學區（FUSD）統籌 AP 中文線上考試，體現本校作為費利蒙社區重要資源的承諾。',
          ],
        },
        {
          heading: '本校宗旨',
          body: [
            '本校以傳授中國文化、語文為宗旨，是以教育為主的非營利組織，不介入任何黨派、宗教及政治的組織。',
          ],
        },
        {
          heading: '課程制度',
          body: [
            '語文課程以正體中文授課，涵蓋學前班至十二年級。幼稚園採注音符號（ㄅㄆㄇㄈ）教學；一至八年級使用《兒童中文》系列教材，輔以本校自編練習冊。雙語 CSL 班專為華裔子弟及初學者設計，循序漸進導入中文學習。',
            '學分班（AC）課程供九至十二年級學生修習，使用《中文聽說讀寫》（Integrated Chinese）及台灣國立師範大學出版之 AP 中文教材，所修學分可抵充本地高中外語必修學分。本校學生於 ANCCS 及 NCACLS 學術比賽中屢獲佳績。',
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
          schedule: '學前班至三年級：11:10 am – 1:00 pm · 四至八年級：9:00 am – 10:50 am',
        },
        {
          heading: '學分班（Accredited Curriculum / AC）',
          body: '本校通過 WASC 認證的高中中文課程，讓符合資格的學生取得高中學分。新生須參加分班考試以決定適合的程度，分班詳情請見「報名註冊」頁面。',
          schedule: '8:50 am – 12:50 pm',
        },
        {
          heading: '才藝選修',
          body: '選修課程豐富多元，包含西畫、國畫書法、珠心算、扯鈴、縫紉、美勞、籃球、基礎 Python 程式設計、進階 Python 程式設計、成人瑜珈、成人塑身，以及線上中文打字與寫作課程，每年持續增設新課。',
        },
      ],
      tutoringTitle: 'FCS 義工輔導課程',
      tutoringBadge: '免費 — 僅限在學學生',
      tutoringBody:
        '本校在學學生可免費享有由義工提供的一對一線上輔導課程。課程於學年間透過電子郵件統籌安排。完成報名後，請留意本校寄出的課程通知信，預約時需提供您的本校學生編號。',
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
        '才藝選修課程豐富多元，包含西畫、國畫書法、珠心算、扯鈴、縫紉、美勞、籃球、Python 程式設計、瑜珈及線上中文打字等，每年持續增設新課。報名時一併選擇，完整課程列表請見下方連結。',
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
      volunteerTitle: '義工時數',
      volunteerBody:
        '每位在學學生的家庭每學期須完成 3 小時義工服務。義工機會包括協助學校活動、擔任教室助理及支援行政事務，時數由學校辦公室統計記錄。',
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
        '費利蒙中文學校全年舉辦多項活動，凝聚學生、家庭與教職員工，共同傳承文化傳統、慶典與比賽。各學年詳細日期將於本校 Facebook 專頁及課堂上公告。',
      annualTitle: '年度活動',
      annual: [
        {
          name: '開放參觀日（Open House）',
          body: '新舊家庭參觀各班教室、認識教師並了解本校課程，為新學年做好準備。',
        },
        {
          name: '新春聯歡會',
          body: '本校年度最盛大活動——學生帶來舞獅、音樂演出、短劇及文化表演，與全體師生家長共迎農曆新年。',
        },
        {
          name: '小吃義賣',
          body: '家長自製中式點心、料理與甜點與大家共享，是凝聚社區情誼、同時為學校籌款的溫馨傳統。',
        },
        {
          name: '學術比賽',
          body: '學生在中文閱讀、寫作與口語各組別中一展所學，得獎同學將於新春聯歡會上接受表揚。',
          route: 'academic-contest',
        },
        {
          name: 'ANCCS 競賽',
          body: '本校學生參加北加州中文學校聯合會（ANCCS）舉辦的論語朗誦、親子說故事及多媒體等各項比賽。',
        },
        {
          name: '扯鈴成果展',
          body: '扯鈴選修課的學生全年於校內活動及社區演出中展示精湛技藝。',
        },
        {
          name: '雙十節',
          body: '本校以典禮慶祝中華民國國慶日，傳承中華文化精神。',
        },
        {
          name: '祭孔典禮',
          body: '於學年初舉行傳統典禮，紀念孔子對教育與文化的偉大貢獻。',
        },
        {
          name: '教職員感謝晚宴',
          body: '每年舉辦晚宴，表彰並感謝全體教師、工作人員與義工的辛勤付出。',
        },
        {
          name: '畢業典禮',
          body: '學年末為完成課程的學生舉辦正式畢業典禮，隆重慶祝學習成果。',
        },
      ],
      photosTitle: '活動照片與影片',
      photosBody:
        '近期活動的照片與影片將分享於本校 Facebook 專頁；如需查閱 2012 年起的歷史紀錄，請參閱舊版網站活動存檔。',
      photosFacebookLabel: '前往 Facebook 專頁',
      photosLegacyLabel: '歷史活動存檔',
      calendarNote: '請查閱學校行事曆以了解本學年各活動日期。',
    },
    academicContest: {
      title: '學術比賽',
      intro:
        '費利蒙中文學校每年舉辦學術比賽，全體在學學生均可報名參加。表現優秀者將代表本校晉級 ANCCS 北加州中文學校聯合會地區競賽。',
      aboutTitle: '比賽簡介',
      aboutBody:
        '學術比賽分兩個層次舉行：費利蒙中文學校內部比賽，以及 ANCCS（北加州中文學校聯合會）地區競賽。學生依年級分組競賽，得獎者將於新春聯歡會上接受表揚。',
      categoriesTitle: '競賽項目',
      categories: [
        {
          name: '國語演講',
          body: '學生以國語發表準備好的演講，主題由主辦單位指定，評分標準包括發音、流暢度、表達與內容。',
        },
        {
          name: '朗讀',
          body: '學生以國語或粵語朗讀指定篇章，評分標準包括準確度、聲調與節奏。',
        },
        {
          name: '毛筆書法',
          body: '學生以毛筆書寫正體中文，評分標準包括筆順、結構平衡與整體美觀。',
        },
        {
          name: '學科測驗',
          body: '依程度分組的筆試，內容涵蓋詞彙、閱讀理解及語言能力。',
        },
      ],
      resourcesTitle: '本學年相關資料',
      resourcesNote:
        '2025–2026 學年的比賽規則及報名資料將於公布後登載於此。如有疑問，歡迎來信聯絡學術比賽負責人。',
      rulesLabel: '比賽規則（即將公布）',
      registerLabel: '學術比賽報名（即將開放）',
      contactLabel: '聯絡 ac@fremontchineseschool.org',
    },
    donate: {
      title: '支持本校',
      body: [
        '費利蒙中文學校為 501(c) 非營利組織。您的捐款可享稅務抵減，並協助本校為社區中有意以輕鬆愉快方式學習中文的家庭開辦更多課程。',
        '許多公司提供慈善捐款配對方案，歡迎您查詢服務的公司是否能讓您的捐款加倍。',
      ],
      einHeading: '稅務資訊',
      einLabel: '納稅人識別號（EIN）',
      einNumber: '94-2978949',
      irsLabel: 'IRS 免稅認定函',
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
