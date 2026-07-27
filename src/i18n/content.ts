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
  electiveIntros: 'https://docs.google.com/folderview?id=0B7NAXqzsebY0ZFhKNlloWmJwN3M&resourcekey=0-n5ocoQpPIMrKzkAxyU88ug',
  calendarZh:
    'https://drive.google.com/file/d/1kUl_nhpdAC0WLE0r6smb2fSjDUzRmSdX/view',
  calendarEn:
    'https://drive.google.com/file/d/1mHm8B4-LnNZkqqOY8qMvG7OReWaconzM/view',
  tuitionPdf: 'https://docs.google.com/document/d/1eMiXP6MsfTPzySyFSNG8VMmvKSI8NSzo2Vb3Mg72Gn8/view',
  irsDetermination: 'https://drive.google.com/file/d/1BBgfNR6QzLA2d1-Ej8ezyW56Pf96eosf/view',
  acCreditTransfer: 'https://forms.gle/TntoF21REwrnnkfj9',
  acPolicies: 'https://drive.google.com/file/d/1EKDsFuUj3pV8eXTBhEE4cSHGpC1M_sPF/view',
  acAbsenceForm: 'https://drive.google.com/file/d/1xbyIlzgvoZFpABZNK03L2-6sK2XSKXCI/view',
  acExcuseForm: 'https://drive.google.com/file/d/11KBdtFJ8iQYHGd4d8K4GWIMlQ2ceX2G0/view',
  tutorApplication: 'https://forms.gle/Aerk6mbhpEPfJEep9',
  legacyEvents: 'https://fremontchineseschool.org/events',
  legacyNews: 'https://fremontchineseschool.org/index.php',
  facebook: 'https://facebook.com/fremontchineseschool',
  instagram: 'https://www.instagram.com/fremontchineseschool/',
} as const;

// Contact details — values shared across locales; labels are translated below.
export const contactInfo = {
  principal: 'Principal@fremontchineseschool.org',
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

// FCS was founded in 1972. Derive "years of community" at build time so the
// homepage fact never goes stale (the site rebuilds on every deploy).
const yearsOfCommunity = String(new Date().getFullYear() - 1972);

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
      pauseSlideshow: 'Pause slideshow',
      playSlideshow: 'Play slideshow',
      ctaPrimary: 'Enroll Now',
      ctaSecondary: 'Explore Programs',
      facts: [
        { label: 'Years of community', value: yearsOfCommunity },
        { label: 'Grades served', value: 'Pre-K–12' },
        { label: 'UC/CSU-recognized credits', value: 'WASC' },
        { label: 'Classes meet', value: 'Saturdays' },
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
      featuresEyebrow: 'Why FCS',
      featuresTitle: 'Why families choose FCS',
      featuresSubtitle:
        'A warm, community-centered place to learn Mandarin and grow up connected to Chinese culture.',
      features: [
        {
          title: '50+ years of community',
          body: 'Since 1972, generations of East Bay families have learned and grown at FCS.',
        },
        {
          title: 'Credits colleges recognize',
          body: 'Our high-school Chinese courses are WASC-accredited — the same body that accredits California public schools — so credits count toward UC/CSU requirements.',
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
      cultureEyebrow: 'Life at FCS',
      cultureTitle: 'More than Mandarin',
      cultureSubtitle: 'Culture is our curriculum too. From New Year celebrations to yo-yo showcases, FCS traditions connect students to their heritage — and to each other.',
      cultureHighlights: [
        { photo: '/images/events/chinese-new-year.jpg', alt: 'Students performing at Chinese New Year Celebration', label: 'Chinese New Year' },
        { photo: '/images/events/food-festival.jpg', alt: 'Families enjoying the Food Festival', label: 'Food Festival' },
        { photo: '/images/events/yoyo.jpg', alt: 'Student performing at Chinese Yo-Yo Showcase', label: 'Yo-Yo Showcase' },
      ],
      eventsTitle: 'Annual traditions',
      eventsLead:
        'Learning spills beyond the classroom into celebrations families look forward to all year.',
      eventsCta: 'See all events',
      announcements: [
        { text: 'Enrollment is now open for the 2026–27 school year.', cta: 'Enroll now →', href: 'enroll' as const },
        { text: 'Classroom assignments are now available.', cta: 'View schedule →', href: 'student-resources' as const },
      ],
      ctaTitle: 'Ready to join us this year?',
      ctaBody:
        "Enrollment is open to new and returning families. Reserve your child's place for the 2026–2027 school year.",
      newsTeaserTitle: 'Latest News',
      newsTeaserCta: 'See all news →',
      faqTeaser: 'Have questions?',
      faqTeaserLink: 'See our FAQ →',
    },
    about: {
      title: 'About FCS',
      eyebrow: 'About',
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
            'Language classes run from Pre-K through 8th grade in Traditional Chinese. Kindergarten uses the Zhuyin (ㄅㄆㄇㄈ) phonics system; Grades 1–8 follow the Children\'s Chinese Reader series supplemented by FCS-authored exercise books. The bilingual CSL track is designed for heritage learners and beginners.',
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
      eyebrow: 'Programs',
      intro:
        'We offer Chinese language classes for all levels, plus electives and a WASC-accredited credit track for high-school students.',
      sections: [
        {
          heading: 'Chinese Language',
          body: 'Weekend classes run from Pre-K through 8th grade, all taught in Traditional Chinese. Choose the full-Chinese track for students from Mandarin-speaking families where the child and household speak Mandarin, or the bilingual track (C1–C8) designed for beginners and heritage learners easing into the language. Students build reading, writing, listening, and speaking skills following established Mandarin curricula.',
          schedule: 'Pre-K – 3rd grade: 11:10 am – 1:00 pm · 4th – 8th grade: 9:00 am – 10:50 am',
        },
        {
          heading: 'Accredited Curriculum (AC / 學分班)',
          body: 'Our WASC-accredited high-school Chinese course lets eligible students earn high-school credit toward UC/CSU and area high-school requirements. Uses Integrated Chinese (Levels 1–4) and AP Chinese materials. A placement test determines the appropriate level for new students.',
          schedule: '8:50 am – 12:50 pm',
          links: [
            { label: 'AC Credit Transfer Application', href: 'acCreditTransfer' as const },
            { label: 'AC Policies & Rules', href: 'acPolicies' as const },
            { label: 'Personal Absence Request Form', href: 'acAbsenceForm' as const },
            { label: 'Official Excuse Application Form', href: 'acExcuseForm' as const },
          ],
        },
        {
          heading: 'Electives',
          body: 'Choose from a wide range of enrichment classes: Chinese painting, Chinese calligraphy, abacus (珠心算), Chinese yo-yo, sewing, crafts, basketball, adult yoga, adult fitness, and online Chinese typing/writing. New electives are added each year.',
        },
      ],
      tutoringTitle: 'FCS Volunteer Tutoring',
      tutoringBadge: 'Free — enrolled students only',
      tutoringBody:
        'Enrolled FCS students have access to free one-on-one online tutoring provided by our volunteer tutors. Sessions are coordinated via email during the school year. Once enrolled, watch for an email with sign-up details — you\'ll need your FCS registration ID to reserve a spot.',
      tutoringApplyLabel: 'Apply to be a volunteer tutor',
      tuition: {
        title: 'Tuition & Fees',
        earlyBirdLabel: 'Early Bird',
        regularLabel: 'Regular',
        earlyBirdNote:
          'Register and pay by May 16, 2026 to receive the Early Bird rate.',
        rows: [
          { track: 'CSL language class only (Pre-K–8)', earlyBird: 'from $780', regular: 'from $880' },
          { track: 'CSL + electives (Pre-K–8)', earlyBird: 'from $1,310', regular: 'from $1,510' },
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
      eyebrow: 'Enroll',
      intro:
        'New and returning families register each year. The steps below walk you through registration, payment, and any placement testing.',
      newFamilyNote: 'New family? The registration guidelines and refund policy are covered on this page. Start with the steps below.',
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
          note: 'Register and pay by this date to save $100–$370.',
        },
        {
          label: 'Last day for full refund',
          date: 'May 16, 2026',
          note: 'No processing fee before this date. 30% fee May 17–Aug 22. No refund after Aug 22.',
        },
      ],
      placementTitle: 'Finding the right class level',
      placementBody:
        'FCS classes are organized by language ability, not school grade. Use the FUSD grade chart as a starting point — contact the school office if you\'re unsure.',
      placementLinkLabel: 'Download FUSD grade chart',
      electivesTitle: 'Electives',
      electivesBody:
        'Enrich your child\'s experience with electives including Chinese painting, calligraphy, abacus, Chinese yo-yo, sewing, crafts, basketball, yoga, and online Chinese typing. New classes are added each year — see the full list before registering.',
      electivesLinkLabel: 'View full elective list',
      electivesIntroLabel: 'View elective class introductions (PDF)',
      faqTitle: 'Frequently Asked Questions',
      faq: [
        {
          q: 'What is the tuition?',
          a: 'See the Programs page for a full tuition summary by track. The complete tuition schedule is also available as a PDF download.',
          linkLabel: 'View Programs page',
          linkRoute: 'programs' as const,
        },
        {
          q: 'How do I get a refund?',
          a: 'Submit a withdrawal request before August 22, 2026. Before May 17: full refund, no fee. May 17–August 22: tuition refunded minus a 30% processing fee. After August 22: no refund. Email finance@fremontchineseschool.org for status.',
        },
        {
          q: 'How do I add, drop, or transfer a class after registering?',
          a: 'Submit the class change request form. Changes are subject to availability.',
          linkLabel: 'Open class change request form',
          linkHref: 'addDropTransfer' as const,
        },
        {
          q: 'How do I update my contact information?',
          a: 'Email registration@fremontchineseschool.org and computer@fremontchineseschool.org with your child\'s name, FCS ID, and class code.',
        },
        {
          q: 'What electives are available?',
          a: 'Offerings include Chinese painting, calligraphy, abacus, Chinese yo-yo, sewing, crafts, basketball, yoga, and online Chinese typing. New classes are added each year — see the full elective list for details and scheduling.',
          linkLabel: 'View full elective list',
          linkRoute: 'electives' as const,
        },
        {
          q: 'I paid online via PayPal — do I need to do anything else?',
          a: 'Yes. After PayPal checkout you will receive a confirmation email with an Order #. You must copy that Order # and enter it into the registration form. Your enrollment is not complete until both the form and the payment are submitted.',
        },
      ],
      refundTitle: 'Withdrawal & Refund Policy',
      refundPaymentNote: 'Online payment via PayPal incurs a 5% processing fee. Checks are accepted with no surcharge.',
      refundTiers: [
        {
          period: 'Before May 17, 2026',
          rule: 'Full refund — no processing fee',
          highlight: true,
        },
        {
          period: 'May 17 – August 22, 2026',
          rule: '30% processing fee deducted from refund',
          highlight: false,
        },
        {
          period: 'After August 22, 2026',
          rule: 'No refund',
          highlight: false,
        },
      ],
      refundContact: 'Questions? Email finance@fremontchineseschool.org',
      volunteerTitle: 'FCS is a community-run school',
      volunteerBody:
        'What makes FCS special is our families. Every enrolled family contributes 3 volunteer hours per semester — helping at events, supporting classrooms, or assisting with admin. It\'s a small commitment that keeps tuition affordable and builds the community that makes FCS a great place for kids.',
      resourcesTitle: 'All Registration Documents',
      resources: [
        { label: 'FUSD grade placement chart', link: 'gradeChart' },
        { label: 'Elective class list', link: 'electives', internal: true },
        { label: 'Full tuition schedule', link: 'tuitionPdf' },
        { label: 'Class change request form', link: 'addDropTransfer' },
      ],
      calendarNote:
        'Check the school calendar for the first day of class and important dates.',
    },
    electives: {
      title: 'Elective Classes',
      intro: 'FCS offers elective classes every Saturday alongside the language program. All electives are open to enrolled students (PK–8th grade) unless noted. Some classes also welcome adult students.',
      materialFeeNote: 'Classes marked with a material fee require payment directly to the teacher after registration is confirmed — not through the school office payment system.',
      inPersonLabel: 'In-Person Classes (Saturday)',
      onlineLabel: 'Online Classes (Saturday)',
      slots: [
        {
          time: '9:00–9:50am',
          classes: [
            {
              code: 'P1',
              name: 'Western Painting 1 (西畫一)',
              materialFee: 'Bring own materials',
              materialsNote: 'Oil pastels required',
              description: 'Basic fine art skills — using colors, lines, and shapes to draw people, animals, and landscapes. Develops imagination and artistic interest.',
              notes: null,
              adultsWelcome: false,
              isNew: false,
            },
            {
              code: 'AB1',
              name: 'Abacus 1 — Beginner (珠心算一)',
              materialFee: '$70',
              materialsNote: 'Includes workbook, handouts, quizzes, and abacus',
              description: 'Introduction to abacus and mental math. Material fee includes all course materials.',
              notes: 'Pay fee to teacher or school office.',
              adultsWelcome: false,
              isNew: false,
            },
          ],
        },
        {
          time: '10:00–10:50am',
          classes: [
            {
              code: 'YG1',
              name: 'Adult Yoga (成人纖體瑜珈塑身)',
              materialFee: null,
              materialsNote: 'Bring own yoga mat',
              description: 'Yoga for adults focusing on body sculpting, flexibility, and relaxation.',
              notes: 'Adults only.',
              adultsWelcome: true,
              isNew: false,
            },
            {
              code: 'AB2',
              name: 'Abacus 2 — Intermediate (珠心算二)',
              materialFee: '$70',
              materialsNote: 'Includes workbook, handouts, quizzes, and abacus',
              description: 'Intermediate abacus and mental math training.',
              notes: 'Email teacher before registering to confirm level: melissa@fremontchineseschool.org',
              adultsWelcome: false,
              isNew: false,
            },
            {
              code: 'P2',
              name: 'Western Painting 2 (西畫二)',
              materialFee: 'Bring own materials',
              materialsNote: null,
              description: 'Basic to medium level painting skills with live demonstrations. New material each semester — content does not repeat for returning students.',
              notes: 'Adults welcome.',
              adultsWelcome: true,
              isNew: false,
            },
            {
              code: 'H1',
              name: 'Crafts (美勞)',
              materialFee: '$100',
              materialsNote: 'Collected by teacher directly',
              description: 'Hands-on arts and crafts projects.',
              notes: null,
              adultsWelcome: false,
              isNew: false,
            },
            {
              code: 'X1',
              name: 'Chinese Yo-Yo 1 (扯鈴一)',
              materialFee: null,
              materialsNote: 'Bring own yo-yo (recommended: Sundia triple bearing)',
              description: 'Learn the traditional Chinese diabolo. Suitable for all skill levels.',
              notes: 'Adults welcome.',
              adultsWelcome: true,
              isNew: false,
            },
            {
              code: 'BK1',
              name: 'Basketball 1 (籃球一)',
              materialFee: null,
              materialsNote: 'Bring own ball',
              description: 'Fundamentals, teamwork, and court skills in a fun structured setting.',
              notes: null,
              adultsWelcome: false,
              isNew: false,
            },
          ],
        },
        {
          time: '11:10am–12:00pm',
          classes: [
            {
              code: 'AB3',
              name: 'Abacus 3 — Advanced (珠心算三)',
              materialFee: '$70',
              materialsNote: 'Includes workbook, handouts, quizzes, and abacus',
              description: 'Advanced abacus and mental math training.',
              notes: 'Email teacher before registering: melissa@fremontchineseschool.org',
              adultsWelcome: false,
              isNew: false,
            },
            {
              code: 'P3',
              name: 'Western Painting 3 (西畫三)',
              materialFee: 'Bring own materials',
              materialsNote: null,
              description: 'Medium to high level painting skills with live demonstrations. New content each semester — does not repeat for returning students.',
              notes: 'Adults welcome.',
              adultsWelcome: true,
              isNew: false,
            },
            {
              code: 'H3',
              name: 'Sewing (基楚縫紉班)',
              materialFee: '$100',
              materialsNote: 'Collected by teacher directly',
              description: 'Basic sewing skills — hand sewing, machine sewing, and serger use. Suitable for older children and adults.',
              notes: 'Adults welcome.',
              adultsWelcome: true,
              isNew: false,
            },
            {
              code: 'X2',
              name: 'Chinese Yo-Yo 2 (扯鈴二)',
              materialFee: null,
              materialsNote: 'Bring own yo-yo (recommended: Sundia triple bearing)',
              description: 'Intermediate Chinese yo-yo techniques.',
              notes: 'Adults welcome.',
              adultsWelcome: true,
              isNew: false,
            },
            {
              code: 'BK2',
              name: 'Basketball 2 (籃球二)',
              materialFee: null,
              materialsNote: 'Bring own ball',
              description: 'Intermediate basketball skills and drills.',
              notes: null,
              adultsWelcome: false,
              isNew: false,
            },
            {
              code: 'PS1',
              name: 'Adult Power Sculpt (成人燃力舞塑)',
              materialFee: null,
              materialsNote: null,
              description: 'Adult fitness class combining dance and sculpting movements to relieve stress and tone the body.',
              notes: 'Adults only.',
              adultsWelcome: true,
              isNew: false,
            },
            {
              code: 'LSC',
              name: 'Language Support Club (語言支援社)',
              materialFee: null,
              materialsNote: null,
              description: 'Free Chinese-language support for students at all levels, taught by Ms. Shieh.',
              notes: 'Free. Limited to enrolled FCS students.',
              adultsWelcome: false,
              isNew: true,
            },
          ],
        },
        {
          time: '12:10–1:00pm',
          classes: [
            {
              code: 'CP1',
              name: 'Chinese Painting & Calligraphy (國畫書法班)',
              materialFee: 'Bring own materials',
              materialsNote: null,
              description: 'Traditional Chinese brush painting and calligraphy, taught step-by-step in both English and Chinese.',
              notes: 'Adults welcome.',
              adultsWelcome: true,
              isNew: false,
            },
          ],
        },
      ],
      onlineSlots: [
        {
          time: 'Sat 3:00–3:50pm',
          classes: [
            {
              code: 'e-CT1',
              name: 'Online Chinese Typing 1 — Beginner (網路中文打字識字初級班)',
              materialFee: '$20',
              materialsNote: 'Pay teacher directly',
              description: 'Learn Chinese Pinyin rules and typing input. Builds listening, pronunciation, and typing skills. Suitable for students with limited Chinese background.',
              notes: null,
              adultsWelcome: false,
              isNew: false,
            },
          ],
        },
        {
          time: 'Sat 4:00–4:50pm',
          classes: [
            {
              code: 'e-CT2',
              name: 'Online Chinese Typing 2 — Advanced (網路中文打字識字進階班)',
              materialFee: '$20',
              materialsNote: 'Pay teacher directly',
              description: 'Strengthen Chinese typing and literacy — vocabulary expansion, word usage, and sentence structure.',
              notes: null,
              adultsWelcome: false,
              isNew: false,
            },
          ],
        },
        {
          time: 'Sat 8:00–8:50pm',
          classes: [
            {
              code: 'e-CW',
              name: 'Online Applied Chinese / Writing (網路中文字詞應用/寫作班)',
              materialFee: '$20',
              materialsNote: 'Pay teacher directly',
              description: 'Chinese writing practice covering vocabulary, sentence and paragraph structure, and translation. Requires 8th-grade Chinese proficiency and familiarity with Chinese typing.',
              notes: 'Limited to 4 students.',
              adultsWelcome: false,
              isNew: false,
            },
          ],
        },
      ],
    },
    payment: {
      title: 'Online Payment',
      eyebrow: 'Payment',
      intro:
        'Pay tuition and school fees right here. Browse the items below, add what you need to your cart, and check out securely — all on this page.',
      loading: 'Loading the payment store…',
      // Registration notes, carried in-house from the store so they show in
      // both languages (the embedded storefront is English-only).
      notes: [
        'Early Bird: complete registration AND submit payment by May 16, 2026 to qualify for the Early Bird discount.',
        'CSL = Chinese as a Second Language.',
        'AC = Accredited Curriculum.',
        'The new-student registration fee applies to new students and to students who withdrew or did not enroll during the 2026–2027 school year.',
      ],
      howToPayTitle: 'How to pay',
      payByCheck: 'By check — make it payable to "Fremont Chinese School" and drop it off at the school office (Room 24) on any class day.',
      payOnline: 'Online — scroll down to add item(s) to your cart and check out. PayPal payments add a non-refundable 5% surcharge.',
      payReceipt: 'After paying, you will receive a receipt email from PayPal. Enter the PayPal Order # in the registration form to complete your enrollment.',
      note: 'Payments are processed securely through our school store. If you are unsure which item to pay, check your registration confirmation or contact the school office.',
    },
    calendar: {
      title: 'School Calendar',
      eyebrow: 'Calendar',
      yearLabel: '2026–2027 School Year',
      updated: 'Updated May 4, 2026',
      downloadZh: '下載中文版行事曆 (Chinese)',
      downloadEn: 'Download English calendar',
      sem1Label: 'Semester 1',
      sem2Label: 'Semester 2',
      sem1Dates: 'Aug 15, 2026 – Dec 19, 2026',
      sem2Dates: 'Jan 9, 2027 – May 22, 2027',
      weekLabel: 'Wk',
      dateLabel: 'Date',
      remarksLabel: 'Remarks',
      noSchoolLabel: 'No school',
      subscribeTitle: 'Add to your calendar',
      subscribeBody:
        'Subscribe to get FCS events automatically on your phone — works with Google Calendar, Apple Calendar, and Outlook.',
      subscribeGoogle: 'Add to Google Calendar',
      subscribeIcs: 'Apple / Outlook (.ics)',
      legend: {
        milestone: 'Key dates',
        noSchool: 'No school',
        event: 'School events',
        ac: 'AC / Academic Contest',
        exam: 'Exams',
        admin: 'Admin / Staff',
      },
    },
    events: {
      title: 'Events',
      intro:
        'Throughout the year FCS brings together students, families, and staff for celebrations, competitions, and community traditions. Exact dates each school year are announced on our Facebook page and in class.',
      annualTitle: 'Annual events',
      annual: [
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
          name: 'ANCCS Competitions (北加州中文學校聯合會競賽)',
          body: 'FCS students participate in the Association of Northern California Chinese Schools competitions, including Analects interpretation, parent-child storytelling, and multimedia categories.',
        },
        {
          name: 'Chinese Yo-Yo (扯鈴) Showcase',
          body: 'Students from the Chinese yo-yo elective demonstrate their skills throughout the year at school events and community performances.',
        },
        {
          name: 'Confucius Memorial Ceremony (祭孔典禮)',
          body: "A traditional ceremony commemorating Confucius's contributions to education and culture, observed at the start of the school year.",
        },
        {
          name: 'Teacher & Staff Appreciation Dinner (教職員感謝晚宴)',
          body: 'An annual dinner to recognize and celebrate the dedication of FCS teachers, staff, and volunteers.',
        },
        {
          name: 'Graduation Ceremony (畢業典禮)',
          body: 'Students completing the program are celebrated with a formal graduation ceremony at the end of the school year.',
        },
      ],
      photosTitle: 'Past photos & videos',
      photosBody:
        'Photos and videos from recent events are shared on our Facebook and Instagram pages. For archives going back to 2012, visit the event history on our legacy site.',
      photosFacebookLabel: 'Visit us on Facebook',
      photosInstagramLabel: 'Visit us on Instagram',
      photosLegacyLabel: 'Legacy event archive',
      calendarNote: 'Check the school calendar for this year\'s event dates.',
    },
    academicContest: {
      title: 'Academic Contest',
      eyebrow: 'Events',
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
      eyebrow: 'Donate',
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
      eyebrow: 'Contact',
      labels: {
        principal: 'Principal',
        registration: 'Registration',
        voicemail: 'Voicemail',
        mailing: 'Mailing Address',
        classroom: 'Classroom Location',
        facebook: 'Facebook',
        instagram: 'Instagram',
      },
    },
    news: {
      title: 'News & Updates',
      intro: 'Announcements, reminders, and highlights from Fremont Chinese School.',
      posts: [
        {
          date: 'June 2026',
          title: 'Enrollment Open for 2026–27',
          body: 'Registration for the 2026–27 school year is now open. New and returning families can register online. Early Bird rates apply through May 16, 2026.',
          image: '/images/news/enrollment-2026-27.png',
        },
        {
          date: 'June 2026',
          title: 'Graduation Ceremony — Class of 2026',
          body: 'Congratulations to our graduating class! The Graduation Ceremony was held on June 14, 2026. We are proud of all our students\' accomplishments.',
        },
        {
          date: 'May 2026',
          title: 'Teacher & Staff Appreciation Dinner',
          body: 'Thank you to all our dedicated teachers and staff. The annual appreciation dinner was a wonderful celebration of the people who make FCS possible.',
        },
        {
          date: 'March 2026',
          title: 'Academic Contest Results — ANCCS 2025–26',
          body: 'Our students represented FCS with excellence at the ANCCS 2025–26 academic competition. Congratulations to all award winners!',
          image: '/images/news/anccs-2025-26.jpg',
        },
        {
          date: 'February 2026',
          title: 'Chinese New Year Celebration',
          body: 'The annual Chinese New Year Celebration was a huge success! Thank you to all students, families, and volunteers who made the event so memorable.',
        },
        {
          date: 'February 2026',
          title: 'Internal Academic Contest Winners — 2025–26',
          body: 'Congratulations to all winners of the 2025–2026 FCS Internal Academic Contest, across Pencil Calligraphy, Western Drawing, Mandarin Speech, Mandarin Read Aloud, CFL/CSL Read Aloud, Singing & Dancing, and Reading Comprehension!',
          image: '/images/news/fcs-2025-26.jpg',
        },
        {
          date: 'January 2026',
          title: 'High School AC Placement Test — 2026-27',
          body: 'The Accredited Curriculum (AC) placement test for students entering 8th grade or higher will be held Saturday, February 28, 2026, 10:00–10:50 AM, at Irvington High School, Room 25. A test fee applies to students not currently enrolled at FCS. Questions or registration: ac_score@fremontchineseschool.org.',
          image: '/images/news/ac-placement-test-2026.png',
        },
      ],
      archiveLabel: 'News Archive (2013–2026)',
      archiveNote: 'Looking for older announcements?',
      newslettersTitle: 'Newsletter Archive',
      newslettersBody: 'Past issues of the FCS school newsletter (校園快報), published throughout the school year.',
      newsletters: [
        { label: 'Newsletter No. 10 (May 2021)', url: 'https://drive.google.com/file/d/1cWuNfxAtjPsOgOCOy44Lu0TWIj7v44kR/view' },
        { label: 'Newsletter No. 9 (April 2021)', url: 'https://drive.google.com/file/d/1PfMSHiodCuFZWJukK0xTmXbatB7PCCGZ/view' },
        { label: 'Newsletter No. 8 (March 2021)', url: 'https://drive.google.com/file/d/1wSjF7kcfr-IzF1CPoida-OBe-SrzodCb/view' },
        { label: 'Newsletter No. 7 (February 2021)', url: 'https://drive.google.com/file/d/1lCIJLIKW2-BAdy2mYQrRL4vYO7K8TKoC/view' },
        { label: 'Newsletter No. 6 (January 2021)', url: 'https://drive.google.com/file/d/1DBA601r03DnrsoWrvqleTX0T-FDre6ah/view' },
        { label: 'Newsletter No. 5 (December 2020)', url: 'https://drive.google.com/file/d/19yc8tUsclfjN7vN_I1uvbWd5JTt9BIV-/view' },
        { label: 'Newsletter No. 4 (November 2020)', url: 'https://drive.google.com/file/d/1z0QfMn_udAUCqIh4OD7Xo7rvBQ0T1XiX/view' },
        { label: 'Newsletter No. 3 (October 2020)', url: 'https://drive.google.com/file/d/1Q3-RX-HaSYuM7BbSM1ewlNVwqNYgYBp2/view' },
        { label: 'Newsletter No. 2 (September 2020)', url: 'https://drive.google.com/file/d/1D6_Dx4eAVmZ4BrIvai0LC300Ael5K_MB/view' },
        { label: 'Newsletter No. 1 (August 2020)', url: 'https://drive.google.com/file/d/1XyqnF7m8zw5cbLIi1ZG4zmDrTQPL1Gkl/view' },
      ],
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
      pauseSlideshow: '暫停輪播',
      playSlideshow: '播放輪播',
      ctaPrimary: '立即報名',
      ctaSecondary: '瀏覽課程',
      facts: [
        { label: '年社區歷史', value: yearsOfCommunity },
        { label: '服務年級', value: '學前–12年級' },
        { label: '大學認可學分', value: 'WASC' },
        { label: '上課時間', value: '每週六' },
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
      featuresEyebrow: '選擇本校',
      featuresTitle: '家庭選擇本校的理由',
      featuresSubtitle:
        '在溫馨、以社區為本的環境中學習中文，伴隨孩子親近中華文化、共同成長。',
      features: [
        {
          title: '五十餘年社區傳承',
          body: '自 1972 年以來，東灣一代又一代的家庭在本校學習、成長。',
        },
        {
          title: '大學認可的學分',
          body: '本校高中中文課程通過 WASC 認證——與認證加州公立學校的同一機構——學分可計入 UC/CSU 入學要求。',
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
      cultureEyebrow: '校園生活',
      cultureTitle: '不只是語言課',
      cultureSubtitle: '文化也是我們的課程。從舞獅表演到學術競賽，費利蒙中文學校的傳統活動讓學生與中華文化相連，也讓彼此更緊密。',
      cultureHighlights: [
        { photo: '/images/events/chinese-new-year.jpg', alt: '學生在新春聯歡會上表演', label: '新春聯歡會' },
        { photo: '/images/events/food-festival.jpg', alt: '家長和學生參加小吃義賣', label: '小吃義賣' },
        { photo: '/images/events/yoyo.jpg', alt: '學生參加扯鈴成果展', label: '扯鈴成果展' },
      ],
      eventsTitle: '年度傳統',
      eventsLead: '學習延伸到課堂之外，化為全家人整年期待的精彩活動。',
      eventsCta: '查看所有活動',
      announcements: [
        { text: '2026–27 學年報名現已開放。', cta: '立即報名 →', href: 'enroll' as const },
        { text: '2026-2027 班級教室資訊已公布。', cta: '查看課表 →', href: 'student-resources' as const },
      ],
      ctaTitle: '準備好今年加入我們了嗎？',
      ctaBody: '新生與舊生皆可報名。為您的孩子預留 2026–2027 學年的名額。',
      newsTeaserTitle: '最新消息',
      newsTeaserCta: '查看所有消息 →',
      faqTeaser: '有問題嗎？',
      faqTeaserLink: '查看常見問題 →',
    },
    about: {
      title: '關於本校',
      eyebrow: '關於',
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
            '語文課程以正體中文授課，涵蓋學前班至八年級。幼稚園採注音符號（ㄅㄆㄇㄈ）教學；一至八年級使用《兒童中文》系列教材，輔以本校自編練習冊。雙語 CSL 班專為華裔子弟及初學者設計，循序漸進導入中文學習。',
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
      eyebrow: '課程',
      intro:
        '本校提供各程度的中文課程，並設有才藝選修課程，以及通過 WASC 認證、可供高中生修習的學分課程。',
      sections: [
        {
          heading: '中文課程',
          body: '週末班級涵蓋學前班（Pre-K）至八年級，全程以正體（繁體）中文授課。可選擇適合來自華語家庭、孩子及家庭主要使用普通話的全中文班，或專為初學者與華裔子弟設計、循序漸進的雙語班（C1–C8）。學生依循成熟的中文教材，培養聽、說、讀、寫的能力。',
          schedule: '學前班至三年級：11:10 am – 1:00 pm · 四至八年級：9:00 am – 10:50 am',
        },
        {
          heading: '學分班（Accredited Curriculum / AC）',
          body: '本校通過 WASC 認證的高中中文課程，讓符合資格的學生取得可抵充 UC/CSU 及當地高中外語必修的學分。使用《中文聽說讀寫》（Integrated Chinese，Level 1–4）及 AP 中文教材。新生須參加分班考試以決定適合的程度。',
          schedule: '8:50 am – 12:50 pm',
          links: [
            { label: '學分申請表', href: 'acCreditTransfer' as const },
            { label: '學分班規章', href: 'acPolicies' as const },
            { label: '私假申請單', href: 'acAbsenceForm' as const },
            { label: '公假申請單', href: 'acExcuseForm' as const },
          ],
        },
        {
          heading: '才藝選修',
          body: '選修課程豐富多元，包含西畫、國畫書法、珠心算、扯鈴、縫紉、美勞、籃球、成人瑜珈、成人塑身，以及線上中文打字與寫作課程，每年持續增設新課。',
        },
      ],
      tutoringTitle: 'FCS 義工輔導課程',
      tutoringBadge: '免費 — 僅限在學學生',
      tutoringBody:
        '本校在學學生可免費享有由義工提供的一對一線上輔導課程。課程於學年間透過電子郵件統籌安排。完成報名後，請留意本校寄出的課程通知信，預約時需提供您的本校學生編號。',
      tutoringApplyLabel: '申請成為義工導師',
      tuition: {
        title: '學費與費用',
        earlyBirdLabel: '早鳥優惠',
        regularLabel: '一般費用',
        earlyBirdNote: '於 2026 年 5 月 16 日前完成報名並繳費，即可享早鳥優惠。',
        rows: [
          { track: '中文課程（僅語文班，Pre-K–8）', earlyBird: '起 $780', regular: '起 $880' },
          { track: '中文課程＋才藝選修（Pre-K–8）', earlyBird: '起 $1,310', regular: '起 $1,510' },
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
      eyebrow: '報名',
      intro:
        '新生與舊生每年皆須完成報名。以下步驟將引導您完成報名、繳費及分班流程。',
      newFamilyNote: '初次報名？報名規章與退費政策說明均已收錄於本頁，請先閱讀以下各步驟。',
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
          note: '於此日期前完成報名並繳費，可省 $100–$370。',
        },
        {
          label: '全額退費截止',
          date: '2026 年 5 月 16 日',
          note: '此日期前申請不收手續費。5 月 17 日至 8 月 22 日扣 30%。8 月 22 日後不退費。',
        },
      ],
      placementTitle: '如何確認適合的班級程度',
      placementBody:
        '本校依語文程度分班，非依學校年級。可參考學區年級對照表（FUSD Grade Chart）作為初步依據，如有疑問請聯絡學校辦公室。',
      placementLinkLabel: '下載學區年級對照表',
      electivesTitle: '才藝選修課程',
      electivesBody:
        '才藝選修課程豐富多元，包含西畫、國畫書法、珠心算、扯鈴、縫紉、美勞、籃球、瑜珈及線上中文打字等，每年持續增設新課。報名時一併選擇，完整課程列表請見下方連結。',
      electivesLinkLabel: '查看完整選修課程列表',
      electivesIntroLabel: '查看選修班簡介（PDF）',
      faqTitle: '常見問題',
      faq: [
        {
          q: '學費是多少？',
          a: '請至「課程」頁面查看各班別學費摘要，或下載完整學費方案 PDF。',
          linkLabel: '前往課程頁面',
          linkRoute: 'programs' as const,
        },
        {
          q: '如何申請退費？',
          a: '請於 2026 年 8 月 22 日前提交退課申請。5 月 17 日前：全額退費，免手續費。5 月 17 日至 8 月 22 日：退費扣除 30% 手續費。8 月 22 日後：不予退費。如需查詢，請來信 finance@fremontchineseschool.org。',
        },
        {
          q: '報名後如何加課、退課或換課？',
          a: '請填寫課程異動申請表，名額異動視班級餘額而定。',
          linkLabel: '開啟課程異動申請表',
          linkHref: 'addDropTransfer' as const,
        },
        {
          q: '如何更新聯絡資料？',
          a: '請將學生姓名、本校學號及班級代碼來信至 registration@fremontchineseschool.org 及 computer@fremontchineseschool.org。',
        },
        {
          q: '有哪些才藝選修課程？',
          a: '目前提供西畫、國畫書法、珠心算、扯鈴、縫紉、美勞、籃球、瑜珈及線上中文打字等課程，每年持續增設新課。詳情請查看完整選修課程列表。',
          linkLabel: '查看完整選修課程列表',
          linkRoute: 'electives' as const,
        },
        {
          q: '我已透過 PayPal 完成付款，還需要其他步驟嗎？',
          a: '是的。PayPal 付款完成後，您將收到含有訂單編號的確認信。請將該訂單編號填入報名表中。報名表與付款均完成後，報名程序才算正式完成。',
        },
      ],
      refundTitle: '退費與退課政策',
      refundPaymentNote: '透過 PayPal 線上付款須加收 5% 手續費；以支票繳費則不另收費。',
      refundTiers: [
        {
          period: '2026 年 5 月 17 日前',
          rule: '全額退費，免收手續費',
          highlight: true,
        },
        {
          period: '2026 年 5 月 17 日至 8 月 22 日',
          rule: '退費扣除 30% 手續費',
          highlight: false,
        },
        {
          period: '2026 年 8 月 22 日後',
          rule: '不予退費',
          highlight: false,
        },
      ],
      refundContact: '如有疑問，請來信 finance@fremontchineseschool.org',
      volunteerTitle: '費利蒙中文學校由社區共同經營',
      volunteerBody:
        '讓費利蒙中文學校與眾不同的，正是我們的家長們。每位在學學生的家庭每學期貢獻 3 小時義工服務——協助活動、支援課堂或協助行政工作。這份小小的承諾讓學費保持親民，也凝聚了讓孩子們茁壯成長的社區力量。',
      resourcesTitle: '所有報名文件',
      resources: [
        { label: '學區年級對照表', link: 'gradeChart' },
        { label: '才藝選修課程列表', link: 'electives', internal: true },
        { label: '完整學費方案', link: 'tuitionPdf' },
        { label: '課程異動申請表', link: 'addDropTransfer' },
      ],
      calendarNote: '開學日與重要日期請參閱學校行事曆。',
    },
    electives: {
      title: '才藝選修課程',
      intro: 'FCS 每週六提供多元選修課程，與中文課程同步進行。所有課程開放給在校學生（學前班至八年級）報名，部分課程亦歡迎成人參加。',
      materialFeeNote: '標有教材費的課程，請於報名確認後直接繳費給老師，無需透過學校付款系統。',
      inPersonLabel: '實體課程（週六）',
      onlineLabel: '線上課程（週六）',
      slots: [
        {
          time: '上午 9:00–9:50',
          classes: [
            {
              code: 'P1',
              name: '西畫一（Painting 1）',
              materialFee: '請自備材料',
              materialsNote: '需備油粉彩',
              description: '學習美術基本畫法，認識色彩、線條、形狀、人物、動植物和風景基本畫法，培養美術興趣和想像力。',
              notes: null,
              adultsWelcome: false,
              isNew: false,
            },
            {
              code: 'AB1',
              name: '珠心算一（基礎）',
              materialFee: '$70',
              materialsNote: '含作業簿、講義、測驗卷及算盤',
              description: '珠算與心算入門課程，教材費含所有課程材料。',
              notes: '繳交教材費給老師或辦公室工作人員。',
              adultsWelcome: false,
              isNew: false,
            },
          ],
        },
        {
          time: '上午 10:00–10:50',
          classes: [
            {
              code: 'YG1',
              name: '成人纖體瑜珈塑身',
              materialFee: null,
              materialsNote: '請自備瑜珈墊',
              description: '成人瑜珈課程，著重塑身、柔軟度與放鬆。',
              notes: '僅限成人。',
              adultsWelcome: true,
              isNew: false,
            },
            {
              code: 'AB2',
              name: '珠心算二（中級）',
              materialFee: '$70',
              materialsNote: '含作業簿、講義、測驗卷及算盤',
              description: '中級珠算與心算訓練。',
              notes: '報名前請 email 老師確認程度：melissa@fremontchineseschool.org',
              adultsWelcome: false,
              isNew: false,
            },
            {
              code: 'P2',
              name: '西畫二（Painting 2）',
              materialFee: '請自備材料',
              materialsNote: null,
              description: '教授基本到近中等水準的繪畫技能，當場演示作畫過程。為曾上過 P2 的學生教新增強材料，教材不重複。',
              notes: '歡迎成人學生。',
              adultsWelcome: true,
              isNew: false,
            },
            {
              code: 'H1',
              name: '美勞（Craft）',
              materialFee: '$100',
              materialsNote: '由老師直接收取',
              description: '動手操作的美勞創作課程。',
              notes: null,
              adultsWelcome: false,
              isNew: false,
            },
            {
              code: 'X1',
              name: '扯鈴一',
              materialFee: null,
              materialsNote: '請自備扯鈴（推薦：Sundia triple bearing）',
              description: '學習傳統中國扯鈴技藝，適合各程度學生。',
              notes: '歡迎成人。',
              adultsWelcome: true,
              isNew: false,
            },
            {
              code: 'BK1',
              name: '籃球一',
              materialFee: null,
              materialsNote: '請自備籃球',
              description: '基本功、團隊合作與球場技巧訓練。',
              notes: null,
              adultsWelcome: false,
              isNew: false,
            },
          ],
        },
        {
          time: '上午 11:10–下午 12:00',
          classes: [
            {
              code: 'AB3',
              name: '珠心算三（高級）',
              materialFee: '$70',
              materialsNote: '含作業簿、講義、測驗卷及算盤',
              description: '高級珠算與心算訓練。',
              notes: '報名前請 email 老師確認程度：melissa@fremontchineseschool.org',
              adultsWelcome: false,
              isNew: false,
            },
            {
              code: 'P3',
              name: '西畫三（Painting 3）',
              materialFee: '請自備材料',
              materialsNote: null,
              description: '教授中高等水準的繪畫技能，當場演示作畫過程。為曾上過 P3 的學生教新增強材料，教材不重複。',
              notes: '歡迎成人學生。',
              adultsWelcome: true,
              isNew: false,
            },
            {
              code: 'H3',
              name: '基楚縫紉班',
              materialFee: '$100',
              materialsNote: '由老師直接收取',
              description: '基礎縫紉課程，涵蓋手縫、機器縫紉及布邊機使用。適合大人和大小孩。',
              notes: '歡迎成人。',
              adultsWelcome: true,
              isNew: false,
            },
            {
              code: 'X2',
              name: '扯鈴二',
              materialFee: null,
              materialsNote: '請自備扯鈴（推薦：Sundia triple bearing）',
              description: '中級扯鈴技巧訓練。',
              notes: '歡迎成人。',
              adultsWelcome: true,
              isNew: false,
            },
            {
              code: 'BK2',
              name: '籃球二',
              materialFee: null,
              materialsNote: '請自備籃球',
              description: '中級籃球技巧與訓練。',
              notes: null,
              adultsWelcome: false,
              isNew: false,
            },
            {
              code: 'PS1',
              name: '成人燃力舞塑',
              materialFee: null,
              materialsNote: null,
              description: '成人有氧塑身課程，結合舞蹈動作，紓解壓力、燃燒脂肪，讓曲線更加勻稱。',
              notes: '僅限成人。',
              adultsWelcome: true,
              isNew: false,
            },
            {
              code: 'LSC',
              name: '語言支援社',
              materialFee: null,
              materialsNote: null,
              description: '謝宜靜老師提供各程度中文學習免費輔導。',
              notes: '免費課程，僅限本校在學學生參加。',
              adultsWelcome: false,
              isNew: true,
            },
          ],
        },
        {
          time: '下午 12:10–1:00',
          classes: [
            {
              code: 'CP1',
              name: '國畫書法班',
              materialFee: '請自備材料',
              materialsNote: null,
              description: '中英雙語教授基本國畫書法技能，當場逐步演示作畫過程。',
              notes: '歡迎成人學生。',
              adultsWelcome: true,
              isNew: false,
            },
          ],
        },
      ],
      onlineSlots: [
        {
          time: '週六 下午 3:00–3:50',
          classes: [
            {
              code: 'e-CT1',
              name: '網路中文打字識字（初級班）',
              materialFee: '$20',
              materialsNote: '直接繳給老師',
              description: '熟習漢語拼音規則，訓練聽音、辨音及打字能力，加強識字及聽打能力。可收中文基礎較弱的學生。',
              notes: null,
              adultsWelcome: false,
              isNew: false,
            },
          ],
        },
        {
          time: '週六 下午 4:00–4:50',
          classes: [
            {
              code: 'e-CT2',
              name: '網路中文打字識字（進階班）',
              materialFee: '$20',
              materialsNote: '直接繳給老師',
              description: '加強中文打字能力及識字能力，擴充詞彙，加強字詞應用及句子結構能力。',
              notes: null,
              adultsWelcome: false,
              isNew: false,
            },
          ],
        },
        {
          time: '週六 晚上 8:00–8:50',
          classes: [
            {
              code: 'e-CW',
              name: '網路中文字詞應用／寫作班',
              materialFee: '$20',
              materialsNote: '直接繳給老師',
              description: '中文寫作練習，包括詞彙擴充、句子及段落結構、語意表達及翻譯練習。須具備熟悉中文打字及八年級以上中文表達能力。',
              notes: '限收 4 名學生。',
              adultsWelcome: false,
              isNew: false,
            },
          ],
        },
      ],
    },
    payment: {
      title: '線上付款',
      eyebrow: '付款',
      intro:
        '直接在此頁繳交學費與各項學校費用。瀏覽下方項目，將所需項目加入購物車，並於本頁安全結帳。',
      loading: '正在載入付款商店…',
      // 報名須知，由商店移至站內以提供中英雙語（內嵌商店僅有英文）。
      notes: [
        '早鳥優惠：請於 2026 年 5 月 16 日前完成報名並繳交付款，方可享有早鳥折扣。',
        'CSL＝中文為第二語言（Chinese as a Second Language）。',
        'AC＝認證課程（Accredited Curriculum）。',
        '新生報名費適用於新生，以及在 2026–2027 學年退學或未報名的學生。',
      ],
      howToPayTitle: '付款方式',
      payByCheck: '支票付款——請開立抬頭為「Fremont Chinese School」的支票，並於上課日親自交至學校辦公室（24 號教室）。',
      payOnline: '線上付款——請往下捲動，將項目加入購物車並結帳。透過 PayPal 付款將收取不可退還的 5% 手續費。',
      payReceipt: '付款後，您將收到 PayPal 寄送的收據電子郵件。請將 PayPal 訂單編號（Order #）填入報名表，以完成報名。',
      note: '款項皆透過本校商店安全處理。若不確定應繳交哪一項目，請查看您的報名確認資訊，或聯絡學校辦公室。',
    },
    calendar: {
      title: '學校行事曆',
      eyebrow: '行事曆',
      yearLabel: '2026–2027 學年',
      updated: '更新於 2026 年 5 月 4 日',
      downloadZh: '下載中文版行事曆',
      downloadEn: '下載英文版行事曆 (English)',
      sem1Label: '第一學期',
      sem2Label: '第二學期',
      sem1Dates: '2026 年 8 月 15 日 – 12 月 19 日',
      sem2Dates: '2027 年 1 月 9 日 – 5 月 22 日',
      weekLabel: '週',
      dateLabel: '日期',
      remarksLabel: '備註',
      noSchoolLabel: '不上課',
      subscribeTitle: '加入您的行事曆',
      subscribeBody:
        '訂閱後即可在手機上自動取得本校活動——支援 Google 日曆、Apple 行事曆與 Outlook。',
      subscribeGoogle: '加入 Google 日曆',
      subscribeIcs: 'Apple／Outlook（.ics）',
      legend: {
        milestone: '重要日期',
        noSchool: '不上課',
        event: '學校活動',
        ac: '學分班／學術比賽',
        exam: '考試',
        admin: '行政／教職員',
      },
    },
    events: {
      title: '活動',
      intro:
        '費利蒙中文學校全年舉辦多項活動，凝聚學生、家庭與教職員工，共同傳承文化傳統、慶典與比賽。各學年詳細日期將於本校 Facebook 專頁及課堂上公告。',
      annualTitle: '年度活動',
      annual: [
        {
          name: '新春聯歡會 Chinese New Year Celebration',
          body: '本校年度最盛大活動——學生帶來舞獅、音樂演出、短劇及文化表演，與全體師生家長共迎農曆新年。',
        },
        {
          name: '小吃義賣 Food Festival',
          body: '家長自製中式點心、料理與甜點與大家共享，是凝聚社區情誼、同時為學校籌款的溫馨傳統。',
        },
        {
          name: '學術比賽 Academic Contest',
          body: '學生在中文閱讀、寫作與口語各組別中一展所學，得獎同學將於新春聯歡會上接受表揚。',
          route: 'academic-contest',
        },
        {
          name: 'ANCCS 競賽',
          body: '本校學生參加北加州中文學校聯合會（ANCCS）舉辦的論語朗誦、親子說故事及多媒體等各項比賽。',
        },
        {
          name: '扯鈴成果展 Chinese Yo-Yo Showcase',
          body: '扯鈴選修課的學生全年於校內活動及社區演出中展示精湛技藝。',
        },
        {
          name: '祭孔典禮 Confucius Memorial Ceremony',
          body: '於學年初舉行傳統典禮，紀念孔子對教育與文化的偉大貢獻。',
        },
        {
          name: '教職員感謝晚宴 Teacher & Staff Appreciation Dinner',
          body: '每年舉辦晚宴，表彰並感謝全體教師、工作人員與義工的辛勤付出。',
        },
        {
          name: '畢業典禮 Graduation Ceremony',
          body: '學年末為完成課程的學生舉辦正式畢業典禮，隆重慶祝學習成果。',
        },
      ],
      photosTitle: '活動照片與影片',
      photosBody:
        '近期活動的照片與影片將分享於本校 Facebook 與 Instagram 專頁；如需查閱 2012 年起的歷史紀錄，請參閱舊版網站活動存檔。',
      photosFacebookLabel: '前往 Facebook 專頁',
      photosInstagramLabel: '前往 Instagram 專頁',
      photosLegacyLabel: '歷史活動存檔',
      calendarNote: '請查閱學校行事曆以了解本學年各活動日期。',
    },
    academicContest: {
      title: '學術比賽',
      eyebrow: '活動',
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
      eyebrow: '捐款',
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
      eyebrow: '聯絡',
      labels: {
        principal: '校長',
        registration: '報名註冊',
        voicemail: '語音信箱',
        mailing: '通訊地址',
        classroom: '上課地點',
        facebook: 'Facebook',
        instagram: 'Instagram',
      },
    },
    news: {
      title: '最新消息',
      intro: '費利蒙中文學校的公告、提醒與活動報導。',
      posts: [
        {
          date: '2026年6月',
          title: '2026–27 學年報名開放',
          body: '2026–27 學年報名現已開放。新生及舊生均可線上報名。早鳥優惠截止日期為 2026 年 5 月 16 日。',
          image: '/images/news/enrollment-2026-27.png',
        },
        {
          date: '2026年6月',
          title: '2026屆畢業典禮',
          body: '恭賀本屆畢業生！畢業典禮於2026年6月14日舉行，感謝所有師生家長的參與與支持。',
        },
        {
          date: '2026年5月',
          title: '教職員感謝晚宴',
          body: '感謝全體敬業的老師與工作人員。年度感謝晚宴圓滿落幕，感謝所有讓費中成為可能的每一位夥伴。',
        },
        {
          date: '2026年3月',
          title: 'ANCCS 2025–26 學術比賽成績',
          body: '本校學生在 ANCCS 2025–26 學術比賽中表現優異，恭賀所有得獎同學！',
          image: '/images/news/anccs-2025-26.jpg',
        },
        {
          date: '2026年2月',
          title: '新春聯歡會',
          body: '本年度新春聯歡會圓滿成功！感謝所有學生、家長與志工讓這場活動留下美好回憶。',
        },
        {
          date: '2026年2月',
          title: '2025-2026年度校內學術比賽優勝名單',
          body: '恭喜所有在鉛筆書法、西畫、演講、國語朗讀、雙語班朗讀、兒歌及閱讀測驗等項目中獲獎的同學！',
          image: '/images/news/fcs-2025-26.jpg',
        },
        {
          date: '2026年1月',
          title: '2026-27 學年度高中學分班分班考試',
          body: '2026-27 學年度高中學分班（AC）分班考試適用於升八年級以上之學生，測驗時間為 2026 年 2 月 28 日（週六）上午 10:00–10:50，地點為 Irvington High School room 25。非本校在籍學生需繳交測驗費。如有疑問或欲報名，請聯絡 ac_score@fremontchineseschool.org。',
          image: '/images/news/ac-placement-test-2026.png',
        },
      ],
      archiveLabel: '歷史公告存檔（2013–2026）',
      archiveNote: '查看更早的公告？',
      newslettersTitle: '校刊存檔',
      newslettersBody: '歷期費利蒙中文學校校園快報，於每學年定期發行。',
      newsletters: [
        { label: '校園快報 第10期（2021年5月）', url: 'https://drive.google.com/file/d/1cWuNfxAtjPsOgOCOy44Lu0TWIj7v44kR/view' },
        { label: '校園快報 第9期（2021年4月）', url: 'https://drive.google.com/file/d/1PfMSHiodCuFZWJukK0xTmXbatB7PCCGZ/view' },
        { label: '校園快報 第8期（2021年3月）', url: 'https://drive.google.com/file/d/1wSjF7kcfr-IzF1CPoida-OBe-SrzodCb/view' },
        { label: '校園快報 第7期（2021年2月）', url: 'https://drive.google.com/file/d/1lCIJLIKW2-BAdy2mYQrRL4vYO7K8TKoC/view' },
        { label: '校園快報 第6期（2021年1月）', url: 'https://drive.google.com/file/d/1DBA601r03DnrsoWrvqleTX0T-FDre6ah/view' },
        { label: '校園快報 第5期（2020年12月）', url: 'https://drive.google.com/file/d/19yc8tUsclfjN7vN_I1uvbWd5JTt9BIV-/view' },
        { label: '校園快報 第4期（2020年11月）', url: 'https://drive.google.com/file/d/1z0QfMn_udAUCqIh4OD7Xo7rvBQ0T1XiX/view' },
        { label: '校園快報 第3期（2020年10月）', url: 'https://drive.google.com/file/d/1Q3-RX-HaSYuM7BbSM1ewlNVwqNYgYBp2/view' },
        { label: '校園快報 第2期（2020年9月）', url: 'https://drive.google.com/file/d/1D6_Dx4eAVmZ4BrIvai0LC300Ael5K_MB/view' },
        { label: '校園快報 第1期（2020年8月）', url: 'https://drive.google.com/file/d/1XyqnF7m8zw5cbLIi1ZG4zmDrTQPL1Gkl/view' },
      ],
    },
  },
} as const;
