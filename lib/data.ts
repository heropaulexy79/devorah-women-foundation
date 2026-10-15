import { Program, Project, Article, Resource, Person, Testimonial, ImpactMetric, Partner, GalleryItem } from './types';

export const IMPACT_METRICS: ImpactMetric[] = [
  {
    id: '1',
    number: '5,000+',
    label: 'Women & Girls Reached',
    description: 'Empowered through education, mentorship, and community initiatives.',
    isPlaceholder: true
  },
  {
    id: '2',
    number: '40+',
    label: 'Communities Served',
    description: 'Transformative programs delivered across targeted regional hubs.',
    isPlaceholder: true
  },
  {
    id: '3',
    number: '12',
    label: 'Programs Delivered',
    description: 'Comprehensive outreach, leadership institutes, and spiritual development.',
    isPlaceholder: true
  },
  {
    id: '4',
    number: '100%',
    label: 'Lives Impacted',
    description: 'Dedicated to sustainable growth, dignity, and faith-driven hope.',
    isPlaceholder: true
  }
];

export const PROGRAMS: Program[] = [
  {
    id: 'empowerment-leadership',
    slug: 'empowerment-leadership',
    name: 'Empowerment & Leadership',
    category: 'Empowerment & Leadership',
    tagline: 'Helping women discover potential, grow in confidence, and build leadership skills.',
    description: 'Designed to help women discover their potential, grow in confidence, and develop leadership skills for their homes, workplaces, and communities.',
    targetAudience: 'Women and young women.',
    objectives: [
      'Equip women and young women with leadership tools for home, workplace, and community.',
      'Build personal confidence, strategic decision-making skills, and civic engagement.',
      'Host impactful assemblies and training initiatives celebrating female achievements.'
    ],
    activities: [
      'She Thrives Conference',
      'Leadership Training',
      'International Women’s Day Initiatives',
      'Women-focused empowerment sessions'
    ],
    locations: ['Lagos', 'Ikeja', 'Regional Community Centers'],
    imageUrl: '/images/programs/Empowerment-leadership.PNG',
    featured: true,
    impactResults: [
      'Over 1,200 women trained in strategic leadership and workplace confidence.',
      'Annual She Thrives Conference bringing together female pioneers and emerging leaders.',
      '15 active leadership circles established across regional hubs.'
    ],
    testimonial: {
      quote: "The empowerment sessions and leadership training gave me the confidence and clarity to step into leadership roles in my community.",
      author: "Amina Adeleke",
      role: "Leadership Program Graduate"
    },
    galleryImages: ['/images/programs/Empowerment-leadership.PNG', '/images/who_we_are.png']
  },
  {
    id: 'educational-support',
    slug: 'educational-support',
    name: 'Educational Support',
    category: 'Educational Support',
    tagline: 'Needs-based educational assistance securing a brighter future for learners.',
    description: 'Provides needs-based assistance to help children, young people, and adults pursue or continue their education and secure a better future.',
    targetAudience: 'Children, young people, and adults with identified educational needs.',
    objectives: [
      'Provide financial and material aid to eliminate educational barriers for all ages.',
      'Distribute essential learning equipment, books, and study resources.',
      'Support academic continuity for vulnerable children and adult learners.'
    ],
    activities: [
      'Child and adult education support',
      'Provision of educational materials',
      'Essential learning needs support',
      'Needs-based assistance'
    ],
    locations: ['Partner Schools', 'Community Learning Centers'],
    imageUrl: '/images/programs/educational-support.PNG',
    featured: true,
    impactResults: [
      'Provided essential educational materials and fees support to over 500 students.',
      '100% completion rate for supported adult education and literacy learners.'
    ],
    testimonial: {
      quote: "Without this educational support, continuing my studies seemed impossible. The provision of materials and guidance changed my life path.",
      author: "Grace Okon",
      role: "Educational Support Beneficiary"
    },
    galleryImages: ['/images/programs/educational-support.PNG', '/images/story_beneficiary.png']
  },
  {
    id: 'mentorship-capacity-development',
    slug: 'mentorship-capacity-development',
    name: 'Mentorship & Capacity Development',
    category: 'Mentorship & Capacity Development',
    tagline: 'Creating practical learning spaces, personal guidance, and volunteer equipping.',
    description: 'Focuses on creating spaces for individuals to learn practical skills, receive personal and professional guidance, and equip volunteers to serve effectively.',
    targetAudience: 'Women, girls, and volunteers.',
    objectives: [
      'Equip individuals with practical, market-relevant vocational and professional skills.',
      'Provide structured one-on-one and group mentorship for personal and career growth.',
      'Train and mobilize dedicated volunteers for sustainable community impact.'
    ],
    activities: [
      'Volunteer Training',
      'Capacity-Building Workshops',
      'Skills Development Sessions',
      'Mentorship opportunities'
    ],
    locations: ['Development Hubs', 'Vocational Centers'],
    imageUrl: '/images/programs/mentorship-capacity.jpeg',
    featured: true,
    impactResults: [
      'Over 350 women and girls paired with experienced professional mentors.',
      '120 active volunteers trained and deployed across foundation initiatives.'
    ],
    testimonial: {
      quote: "The capacity-building workshops and mentorship paired me with a mentor who helped me unlock my professional potential.",
      author: "Tunde Balogun",
      role: "Mentorship Participant"
    },
    galleryImages: ['/images/programs/mentorship-capacity.jpeg', '/images/hero_portrait.png']
  },
  {
    id: 'community-outreach-support',
    slug: 'community-outreach-support',
    name: 'Community Outreach & Support',
    category: 'Community Outreach & Support',
    tagline: 'Compassionate, practical support promoting dignity, care, and sustainable impact.',
    description: 'Engages with communities to offer practical, compassionate support that promotes dignity, care, and sustainable impact.',
    targetAudience: 'Individuals, families, and communities with identified needs.',
    objectives: [
      'Deliver compassionate relief and essential item distribution directly to families.',
      'Provide targeted financial grants and emergency assistance to vulnerable households.',
      'Maintain long-term follow-up support to ensure sustainable beneficiary progress.'
    ],
    activities: [
      'Community outreaches and engagement',
      'Needs-based assistance',
      'Distribution of essential items',
      'Grants and financial assistance',
      'Follow-up beneficiary support'
    ],
    locations: ['Urban & Rural Outreach Centers'],
    imageUrl: '/images/programs/community-outreach.PNG',
    featured: true,
    impactResults: [
      'Direct practical assistance delivered to over 2,500 families in need.',
      'Continuous follow-up support maintaining 90%+ beneficiary stability.'
    ],
    testimonial: {
      quote: "The community outreach arrived when our family needed support most. Their practical assistance restored our dignity and hope.",
      author: "Folake Adeleke",
      role: "Community Outreach Recipient"
    },
    galleryImages: ['/images/programs/community-outreach.PNG', '/images/founder_portrait.png']
  },
  {
    id: 'faith-spiritual-development',
    slug: 'faith-spiritual-development',
    name: 'Faith & Spiritual Development',
    category: 'Faith & Spiritual Development',
    tagline: 'Christian faith fellowship spaces for spiritual growth, prayer, and connection.',
    description: 'Centers on Christian faith to create fellowship spaces where women and girls can grow spiritually, connect with God, and build supportive relationships.',
    targetAudience: 'Women and girls.',
    objectives: [
      'Nurture Christian faith, personal identity, and spiritual reflection.',
      'Foster uplifting fellowship spaces and supportive community relationships.',
      'Organize spiritual retreats, prayer gatherings, and inspirational events.'
    ],
    activities: [
      'Prayer gatherings',
      'Faith-based conferences',
      'Bible picnics',
      'Fellowship activities'
    ],
    locations: ['Assembly Halls', 'Retreat Centers'],
    imageUrl: '/images/programs/faith-spiritual-development.PNG',
    featured: true,
    impactResults: [
      'Over 1,000 women participating in regular prayer gatherings and Bible picnics.',
      'Spiritual retreats building lasting supportive sisterhood networks.'
    ],
    testimonial: {
      quote: "The prayer gatherings and Bible picnics restored my spirit and connected me with an incredible sisterhood of faith.",
      author: "Hannah Babatunde",
      role: "Fellowship Member"
    },
    galleryImages: ['/images/programs/faith-spiritual-development.PNG', '/images/hero_portrait.png']
  }
];

export const FEATURED_STORY = {
  id: 'story-1',
  headline: 'Transformation becomes real when you hear the story behind the numbers.',
  quote: '"Before joining the Devorah Leadership Institute, I doubted whether my voice could make a difference in my community. Through their mentorship, I gained the skills and courage to launch a community literacy drive that now serves over 200 children. Devorah Foundation didn\'t just teach me—they showed me who God created me to be."',
  authorName: 'Folake Adeleke',
  program: "Girls' Development & Leadership Academy",
  location: 'Lagos, Nigeria',
  date: 'October 13, 2026',
  imageUrl: '/images/story_beneficiary.png'
};

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    slug: 'community-girls-leadership-summit-2025',
    name: 'Community Girls Leadership Summit',
    category: 'Conferences',
    date: 'October 2025',
    location: 'Lagos City Hall',
    shortDescription: 'Gathering over 300 adolescent girls for a 2-day intensive on digital literacy, self-confidence, and career planning.',
    fullDescription: 'The Community Girls Leadership Summit brought together young leaders from 15 local schools for experiential learning, keynote sessions from female tech pioneers, group mentorship, and career roadmap planning.',
    objective: 'Equip adolescent girls with digital tools, leadership frameworks, and self-belief to pursue higher education.',
    whatWeDid: [
      'Hosted 12 interactive skill workshops covering digital literacy and public speaking.',
      'Distributed 300 leadership toolkits, journals, and learning kits.',
      'Established 15 school mentorship clubs led by certified university mentors.'
    ],
    whoWeReached: '320 adolescent girls & 45 educator chaperones',
    impactResults: [
      '98% reported increased confidence in public speaking and decision-making.',
      '100% pledged active participation in school mentorship clubs.'
    ],
    imageUrl: '/images/who_we_are.png',
    galleryImages: ['/images/who_we_are.png', '/images/story_beneficiary.png']
  },
  {
    id: 'project-2',
    slug: 'women-vocational-enterprise-outreach',
    name: 'Vocational Enterprise & Dignity Outreach',
    category: 'Outreach',
    date: 'August 2025',
    location: 'Lagos State',
    shortDescription: 'Providing 150 women with micro-business seed starter kits, trade equipment, and financial management education.',
    fullDescription: 'An intensive 3-week field program focused on practical skills, financial record keeping, product packaging, and market access for rural female entrepreneurs.',
    objective: 'Strengthen household economic stability through women-led small enterprises and community micro-finance.',
    whatWeDid: [
      'Delivered hands-on enterprise starter sessions and trade skills workshops.',
      'Provided micro-grant starter equipment valued at ₦1,500,000.',
      'Established 6 community savings and credit circles.'
    ],
    whoWeReached: '150 female micro-entrepreneurs & 450 family dependents',
    impactResults: [
      '85% launched active revenue-generating micro-enterprises within 60 days.',
      'Average household monthly income increased by 40%.'
    ],
    imageUrl: '/images/hero_portrait.png',
    galleryImages: ['/images/hero_portrait.png', '/images/founder_portrait.png']
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'article-1',
    slug: 'nurturing-courage-in-the-next-generation',
    title: 'Nurturing Courage and Dignity in the Next Generation of Women Leaders',
    category: 'Girls\' Development',
    excerpt: 'How intentional mentorship, spiritual grounding, and community support create resilient young women who lead with integrity.',
    content: `True empowerment begins long before a young woman enters the boardroom or public office. It takes root in the early years of self-discovery, when a girl learns that her intellect, her voice, and her identity in God carry profound weight.

At Devorah Women Foundation, our commitment to shaping girls goes beyond academic support. We focus on building internal strength—the courage to stand firm against societal constraints, the confidence to pursue rigorous fields like technology and governance, and the empathy to uplift others.

Through structured mentorship circles, we pair young girls with experienced female mentors who guide them through life transitions, academic choices, and spiritual growth. The results are transformative: girls who once hesitated to speak in class become school prefects, community organizers, and visionary thinkers.`,
    author: {
      name: 'Executive Director',
      role: 'Devorah Women Foundation',
      avatarUrl: '/images/founder_portrait.png'
    },
    publishedAt: 'September 14, 2025',
    readingTime: '5 min read',
    featuredImageUrl: '/images/story_beneficiary.png',
    featured: true
  },
  {
    id: 'article-2',
    slug: 'the-christian-foundation-of-empowerment',
    title: 'Faith in Action: Biblical Principles of Female Strength and Leadership',
    category: 'Faith',
    excerpt: 'Examining the legacy of Deborah in Judges 4-5 as a model for modern female leadership, wisdom, and governance.',
    content: `The Biblical narrative of Deborah—a prophetess, judge, and leader of Israel—offers a timeless blueprint for feminine leadership. She led not through dominance, but through wisdom, courage, intercession, and strategic unity.

When we reflect on Deborah's leadership under the palm tree, we see a woman who was accessible to her community, discerning in times of crisis, and resolute in her faith. Modern women called to leadership in business, politics, education, and ministry find in Deborah an enduring example of how grace and authority coexist.`,
    author: {
      name: 'Spiritual Mentorship Team',
      role: 'Devorah Women Foundation',
      avatarUrl: '/images/founder_portrait.png'
    },
    publishedAt: 'August 28, 2025',
    readingTime: '4 min read',
    featuredImageUrl: '/images/hero_portrait.png',
    featured: false
  }
];

export const RESOURCES: Resource[] = [
  {
    id: 'res-1',
    slug: 'devorah-leadership-journal-vol-1',
    title: 'Devorah Leadership Journal: Volume I',
    type: 'Journals',
    author: 'Devorah Research & Thought Leadership Unit',
    shortDescription: 'A comprehensive editorial journal exploring ethical leadership, girl-child advocacy, and economic empowerment models.',
    coverImageUrl: '/images/hero_portrait.png',
    downloadUrl: '#',
    readOnlineUrl: '#'
  },
  {
    id: 'res-2',
    slug: 'courageous-faith-devotional-guide',
    title: 'Courageous Faith: 30-Day Devotional Guide for Young Women',
    type: 'Devotionals',
    author: 'Faith & Spiritual Development Team',
    shortDescription: 'Daily biblical reflections designed to build spiritual resilience, personal dignity, and sense of purpose.',
    coverImageUrl: '/images/founder_portrait.png',
    downloadUrl: '#',
    readOnlineUrl: '#'
  }
];

export const LEADERSHIP_PEOPLE: Person[] = [
  {
    id: 'founder',
    name: 'Executive Director & Founder',
    title: 'Founder & Executive Director',
    role: 'Founder & Visionary Leader',
    category: 'Founder',
    biography: 'A dedicated visionary committed to advancing women and girls through holistic development, spiritual leadership, and transformative community action.',
    background: 'Over 15 years of experience in strategic non-profit management, community advocacy, and youth development.',
    education: 'Advanced studies in Social Policy, Leadership, and Business Administration.',
    vision: 'To see every girl and woman discover her God-given potential, walking in dignity, strength, and economic independence.',
    expertise: ['Non-Profit Governance', 'Women Leadership', 'Faith-Based Advocacy', 'Strategic Philanthropy'],
    imageUrl: '/images/founder_portrait.png'
  },
  {
    id: 'team-1',
    name: 'Head of Programs & Field Director',
    title: 'Head of Programs & Community Outreach',
    role: 'Program Director',
    category: 'Team Lead',
    biography: 'Oversees design, implementation, and field evaluation across all Devorah Foundation initiatives.',
    responsibilities: 'Directing field operations, managing program leads, coordinating stakeholder partnerships.',
    imageUrl: '/images/hero_portrait.png'
  },
  {
    id: 'board-1',
    name: 'Chairperson, Board of Trustees',
    title: 'Chairperson, Board of Trustees',
    role: 'Board Trustee',
    category: 'Board Member',
    biography: 'Provides institutional governance, strategic oversight, and fiscal stewardship across global operations.',
    background: 'Senior executive with background in corporate law, board governance, and global development.',
    imageUrl: '/images/who_we_are.png'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: 'The Devorah Foundation stands out for its high standard of integrity, deep community commitment, and genuine focus on individual transformation.',
    authorName: 'Institutional Partner Representative',
    authorRelationship: 'Institutional Partner Representative',
    location: 'Lagos',
    category: 'Partner'
  },
  {
    id: 't-2',
    quote: 'Through their mentorship program, my daughter has grown into a confident young scholar who believes in her ability to lead.',
    authorName: 'Parent & Community Advisory Member',
    authorRelationship: 'Parent of Academy Graduate',
    location: 'Lagos',
    category: 'Community Leader'
  },
  {
    id: 't-3',
    quote: 'Volunteering with the Girls\' Leadership Academy allowed me to invest my professional skills directly into the next generation.',
    authorName: 'Executive Volunteer Mentor',
    authorRelationship: 'Academy Executive Mentor',
    location: 'Lagos',
    category: 'Volunteer'
  },
  {
    id: 't-4',
    quote: 'The Women\'s Empowerment Initiative gave me trade skills, seed equipment, and financial confidence to run my own enterprise.',
    authorName: 'Empowerment Enterprise Beneficiary',
    authorRelationship: 'Micro-Enterprise Graduate',
    location: 'Lagos',
    category: 'Beneficiary'
  }
];

export const PARTNERS: Partner[] = [
  { id: 'p1', name: 'Strategic Corporate Partner', category: 'Corporate Organisations' },
  { id: 'p2', name: 'International Foundation Network', category: 'Foundations' },
  { id: 'p3', name: 'Community Development Initiative', category: 'Community Organisations' },
  { id: 'p4', name: 'Educational Trust', category: 'Educational Institutions' },
  { id: 'p5', name: 'Grace Fellowship Alliance', category: 'Churches' },
  { id: 'p6', name: 'Regional Social Development Board', category: 'Government Agencies' }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    slug: 'community-outreach',
    title: 'Community Outreach & Humanitarian Relief',
    category: 'Community Outreach',
    date: 'December 2025',
    location: 'Grassroots Communities, Lagos',
    imageUrl: '/images/community outreach/IMG_5837.PNG',
    caption: 'Delivering essential care, compassionate relief packages, and direct household assistance to vulnerable mothers and families.',
    impactHighlight: '500+ Households Reached',
    photoCount: 6,
    photos: [
      { id: 'co-1', url: '/images/community outreach/IMG_5837.PNG', caption: 'Community outreach distribution of relief supplies and essential food provisions.' },
      { id: 'co-2', url: '/images/community outreach/IMG_5842.PNG', caption: 'Field outreach team engaging warmly with local community members.' },
      { id: 'co-3', url: '/images/community outreach/IMG_5843.PNG', caption: 'Dedicated volunteers organizing and coordinating relief package distribution.' },
      { id: 'co-4', url: '/images/community outreach/IMG_5844.PNG', caption: 'Providing direct family welfare support and compassionate assistance.' },
      { id: 'co-5', url: '/images/community outreach/IMG_5852.PNG', caption: 'Empowerment dialogue and dignity restoration in grassroots neighborhoods.' },
      { id: 'co-6', url: '/images/community outreach/IMG_5854.PNG', caption: 'Smiles of hope as women and children receive support and encouragement.' },
    ]
  },
  {
    id: 'g2',
    slug: 'faith-and-spiritual-development',
    title: 'Faith & Spiritual Development Fellowship',
    category: 'Faith and Spiritual Development',
    date: 'September 2025',
    location: 'Sanctuary Assembly, Lagos',
    imageUrl: '/images/faith and spiritual development/IMG_5806.PNG',
    caption: 'Nurturing Christian faith, prayer gatherings, and inspirational sisterhood to anchor women and young girls in spiritual purpose.',
    impactHighlight: '400+ Women in Fellowship',
    photoCount: 3,
    photos: [
      { id: 'fsd-1', url: '/images/faith and spiritual development/IMG_5806.PNG', caption: 'Uplifting prayer gathering and intercessory circle anchoring women in faith.' },
      { id: 'fsd-2', url: '/images/faith and spiritual development/IMG_5804.PNG', caption: 'Fellowship, biblical reflection, and spiritual encouragement session.' },
      { id: 'fsd-3', url: '/images/faith and spiritual development/IMG_5805.PNG', caption: 'Inspiring sisterhood in faith, purpose, and community transformation.' },
    ]
  },
  {
    id: 'g3',
    slug: 'school-outreaches',
    title: 'School Outreaches & Girl-Child Education Drive',
    category: 'School Outreaches',
    date: 'November 2025',
    location: 'Secondary Schools Across Lagos',
    imageUrl: '/images/School Outreaches/IMG_5808.PNG',
    caption: 'Visiting secondary schools to inspire young scholars, provide mentorship, distribute educational materials, and encourage girl-child excellence.',
    impactHighlight: '700+ Students Mentored',
    photoCount: 7,
    photos: [
      { id: 'so-1', url: '/images/School Outreaches/IMG_5808.PNG', caption: 'General school outreach assembly on academic excellence and moral leadership.' },
      { id: 'so-2', url: '/images/School Outreaches/IMG_5801.PNG', caption: 'Engaging secondary school students on career roadmaps and self-belief.' },
      { id: 'so-3', url: '/images/School Outreaches/IMG_5803.PNG', caption: 'Interactive classroom mentorship with young girls on personal development.' },
      { id: 'so-4', url: '/images/School Outreaches/IMG_5807.PNG', caption: 'Empowering young scholars with confidence, hygiene education, and leadership.' },
      { id: 'so-5', url: '/images/School Outreaches/IMG_5809.PNG', caption: 'Students participating enthusiastically in question and answer sessions.' },
      { id: 'so-6', url: '/images/School Outreaches/IMG_5835.PNG', caption: 'Distribution of textbooks, stationery, and learning materials.' },
      { id: 'so-7', url: '/images/School Outreaches/IMG_5850.PNG', caption: 'School leadership and prefect mentorship session with foundation directors.' },
    ]
  },
  {
    id: 'g4',
    slug: 'leadership-development',
    title: 'Leadership Development & Executive Summit',
    category: 'Leadership Development',
    date: 'October 2025',
    location: 'Eko Convention Centre, Lagos',
    imageUrl: '/images/leadership development/SV2L9066.jpeg',
    caption: 'Equipping emerging female leaders, executives, and scholars with strategic tools, ethical governance mastery, and civic leadership.',
    impactHighlight: '300+ Women Leaders Trained',
    photoCount: 9,
    photos: [
      { id: 'ld-1', url: '/images/leadership development/SV2L9066.jpeg', caption: 'Keynote presentation on ethical leadership, governance, and female impact.' },
      { id: 'ld-2', url: '/images/leadership development/SV2L8629.jpeg', caption: 'Executive delegates and participants gathered for strategic masterclasses.' },
      { id: 'ld-3', url: '/images/leadership development/SV2L8957.jpeg', caption: 'Panel symposium exploring women in leadership and civic transformation.' },
      { id: 'ld-4', url: '/images/leadership development/SV2L9258.jpeg', caption: 'Celebrating certified leadership academy graduates and future pioneers.' },
      { id: 'ld-5', url: '/images/leadership development/SV2L9288.jpeg', caption: 'Executive networking, collaborative workshops, and peer circles.' },
      { id: 'ld-6', url: '/images/leadership development/IMG_5845.PNG', caption: 'Interactive session focusing on personal confidence and public speaking.' },
      { id: 'ld-7', url: '/images/leadership development/IMG_5846.PNG', caption: 'Capacity-building group discussions and strategy presentations.' },
      { id: 'ld-8', url: '/images/leadership development/IMG_5848.PNG', caption: 'Mentorship roundtables connecting emerging leaders with industry mentors.' },
      { id: 'ld-9', url: '/images/leadership development/IMG_5851.PNG', caption: 'Recognition ceremony for women making exceptional community contributions.' },
    ]
  },
  {
    id: 'g5',
    slug: 'women-empowerment',
    title: 'Women Empowerment & Vocational Initiatives',
    category: 'Women Empowerment',
    date: 'August 2025',
    location: 'Lagos Enterprise Center',
    imageUrl: '/images/women empowerment/SV2L9492.jpeg',
    caption: 'Equipping women with market-relevant vocational skills, trade equipment, business guidance, and financial independence.',
    impactHighlight: '150+ Women Entrepreneurs Equipped',
    photoCount: 5,
    photos: [
      { id: 'we-1', url: '/images/women empowerment/SV2L9492.jpeg', caption: 'Vocational enterprise skills session empowering women to generate sustainable income.' },
      { id: 'we-2', url: '/images/women empowerment/SV2L9490.jpeg', caption: 'Hands-on practical training clinic and small business mentorship.' },
      { id: 'we-3', url: '/images/women empowerment/SV2L9494.jpeg', caption: 'Empowered women celebrating graduation and receipt of enterprise toolkits.' },
      { id: 'we-4', url: '/images/women empowerment/IMG_5813.PNG', caption: 'Showcasing trade products and artisan crafts created by program beneficiaries.' },
      { id: 'we-5', url: '/images/women empowerment/IMG_5814.PNG', caption: 'Financial literacy, budgeting, and micro-savings circle consultation.' },
    ]
  }
];


