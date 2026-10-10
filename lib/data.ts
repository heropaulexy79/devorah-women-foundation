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
    locations: ['Accra', 'Kumasi', 'Regional Community Centers'],
    imageUrl: '/images/hero_slide_leadership.png',
    featured: true,
    impactResults: [
      'Over 1,200 women trained in strategic leadership and workplace confidence.',
      'Annual She Thrives Conference bringing together female pioneers and emerging leaders.',
      '15 active leadership circles established across regional hubs.'
    ],
    testimonial: {
      quote: "The empowerment sessions and leadership training gave me the confidence and clarity to step into leadership roles in my community.",
      author: "Abena Mansah",
      role: "Leadership Program Graduate"
    },
    galleryImages: ['/images/hero_slide_leadership.png', '/images/who_we_are.png']
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
    imageUrl: '/images/hero_slide_education.png',
    featured: true,
    impactResults: [
      'Provided essential educational materials and fees support to over 500 students.',
      '100% completion rate for supported adult education and literacy learners.'
    ],
    testimonial: {
      quote: "Without this educational support, continuing my studies seemed impossible. The provision of materials and guidance changed my life path.",
      author: "Grace Quarshie",
      role: "Educational Support Beneficiary"
    },
    galleryImages: ['/images/hero_slide_education.png', '/images/story_beneficiary.png']
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
    imageUrl: '/images/hero_slide_girls.png',
    featured: true,
    impactResults: [
      'Over 350 women and girls paired with experienced professional mentors.',
      '120 active volunteers trained and deployed across foundation initiatives.'
    ],
    testimonial: {
      quote: "The capacity-building workshops and mentorship paired me with a mentor who helped me unlock my professional potential.",
      author: "Kofi Boateng",
      role: "Mentorship Participant"
    },
    galleryImages: ['/images/hero_slide_girls.png', '/images/hero_portrait.png']
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
    imageUrl: '/images/who_we_are.png',
    featured: true,
    impactResults: [
      'Direct practical assistance delivered to over 2,500 families in need.',
      'Continuous follow-up support maintaining 90%+ beneficiary stability.'
    ],
    testimonial: {
      quote: "The community outreach arrived when our family needed support most. Their practical assistance restored our dignity and hope.",
      author: "Esi Amodu",
      role: "Community Outreach Recipient"
    },
    galleryImages: ['/images/who_we_are.png', '/images/founder_portrait.png']
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
    imageUrl: '/images/founder_portrait.png',
    featured: true,
    impactResults: [
      'Over 1,000 women participating in regular prayer gatherings and Bible picnics.',
      'Spiritual retreats building lasting supportive sisterhood networks.'
    ],
    testimonial: {
      quote: "The prayer gatherings and Bible picnics restored my spirit and connected me with an incredible sisterhood of faith.",
      author: "Hannah Adjei",
      role: "Fellowship Member"
    },
    galleryImages: ['/images/founder_portrait.png', '/images/hero_portrait.png']
  }
];

export const FEATURED_STORY = {
  id: 'story-1',
  headline: 'Transformation becomes real when you hear the story behind the numbers.',
  quote: '"Before joining the Devorah Leadership Institute, I doubted whether my voice could make a difference in my community. Through their mentorship, I gained the skills and courage to launch a community literacy drive that now serves over 200 children. Devorah Foundation didn\'t just teach me—they showed me who God created me to be."',
  authorName: 'Esi Amodu',
  program: "Girls' Development & Leadership Academy",
  location: 'Greater Accra',
  imageUrl: '/images/story_beneficiary.png'
};

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    slug: 'community-girls-leadership-summit-2025',
    name: 'Community Girls Leadership Summit',
    category: 'Conferences',
    date: 'October 2025',
    location: 'Accra Central Hall',
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
    location: 'Ashanti Region',
    shortDescription: 'Providing 150 women with micro-business seed starter kits, trade equipment, and financial management education.',
    fullDescription: 'An intensive 3-week field program focused on practical skills, financial record keeping, product packaging, and market access for rural female entrepreneurs.',
    objective: 'Strengthen household economic stability through women-led small enterprises and community micro-finance.',
    whatWeDid: [
      'Delivered hands-on enterprise starter sessions and trade skills workshops.',
      'Provided micro-grant starter equipment valued at GH₵ 150,000.',
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
    location: 'Accra',
    category: 'Partner'
  },
  {
    id: 't-2',
    quote: 'Through their mentorship program, my daughter has grown into a confident young scholar who believes in her ability to lead.',
    authorName: 'Parent & Community Advisory Member',
    authorRelationship: 'Parent of Academy Graduate',
    location: 'Greater Accra',
    category: 'Community Leader'
  },
  {
    id: 't-3',
    quote: 'Volunteering with the Girls\' Leadership Academy allowed me to invest my professional skills directly into the next generation.',
    authorName: 'Executive Volunteer Mentor',
    authorRelationship: 'Academy Executive Mentor',
    location: 'Accra',
    category: 'Volunteer'
  },
  {
    id: 't-4',
    quote: 'The Women\'s Empowerment Initiative gave me trade skills, seed equipment, and financial confidence to run my own enterprise.',
    authorName: 'Empowerment Enterprise Beneficiary',
    authorRelationship: 'Micro-Enterprise Graduate',
    location: 'Ashanti Region',
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
    slug: 'female-executive-leadership-summit',
    title: 'Female Executive Leadership Summit',
    category: 'Conferences',
    date: 'October 2025',
    location: 'Accra International Conference Centre',
    imageUrl: '/images/gallery_conference.png',
    caption: 'Gathering emerging female executives, civic leaders, and scholars for keynote masterclasses on ethical governance and board readiness.',
    impactHighlight: '300+ Executive Attendees',
    photoCount: 6,
    photos: [
      { id: 'p1-1', url: '/images/gallery_conference.png', caption: 'Keynote presentation on ethical governance and strategic female leadership.' },
      { id: 'p1-2', url: '/images/hero_portrait.png', caption: 'Panel discussion featuring corporate executives and policy advocates.' },
      { id: 'p1-3', url: '/images/founder_portrait.png', caption: 'Executive Director addressing summit delegates during opening session.' },
      { id: 'p1-4', url: '/images/story_beneficiary.png', caption: 'Emerging female leaders networking during masterclass breakout.' },
      { id: 'p1-5', url: '/images/who_we_are.png', caption: 'Group delegation of certified leadership institute graduates.' },
      { id: 'p1-6', url: '/images/hero_slide_leadership.png', caption: 'Interactive board governance workshop in session.' },
    ]
  },
  {
    id: 'g2',
    slug: 'vocational-enterprise-trade-outreach',
    title: 'Vocational Enterprise & Trade Equipment Outreach',
    category: 'Outreaches',
    date: 'August 2025',
    location: 'Ashanti Regional Community Hub',
    imageUrl: '/images/gallery_outreach.png',
    caption: 'Hands-on micro-enterprise starter clinic providing trade tools, seed capital guidance, and financial literacy training to local women.',
    impactHighlight: '150 Micro-Grants Awarded',
    photoCount: 5,
    photos: [
      { id: 'p2-1', url: '/images/gallery_outreach.png', caption: 'Vocational skills and enterprise management clinic.' },
      { id: 'p2-2', url: '/images/who_we_are.png', caption: 'Distribution of micro-grant starter equipment.' },
      { id: 'p2-3', url: '/images/story_beneficiary.png', caption: 'Beneficiary showcasing trade skills kit.' },
      { id: 'p2-4', url: '/images/hero_portrait.png', caption: 'Financial literacy and record-keeping workshop.' },
      { id: 'p2-5', url: '/images/founder_portrait.png', caption: 'Community savings circle setup and consultation.' },
    ]
  },
  {
    id: 'g3',
    slug: 'girls-stem-digital-literacy-bootcamp',
    title: 'Girls STEM & Digital Literacy Bootcamp',
    category: 'Scholarships',
    date: 'July 2025',
    location: 'Sub-Urban Youth Learning Centre',
    imageUrl: '/images/gallery_stem.png',
    caption: 'Adolescent female scholars engaged in computer coding, digital problem solving, and confidence building mentorship sessions.',
    impactHighlight: '200+ Girls Trained in Coding',
    photoCount: 4,
    photos: [
      { id: 'p3-1', url: '/images/gallery_stem.png', caption: 'Secondary school scholars working on laptop coding exercises.' },
      { id: 'p3-2', url: '/images/hero_slide_girls.png', caption: 'Mentors guiding students through software logic and digital literacy.' },
      { id: 'p3-3', url: '/images/story_beneficiary.png', caption: 'Student Prefect presenting team digital project.' },
      { id: 'p3-4', url: '/images/who_we_are.png', caption: 'Distribution of educational learning kits and certificates.' },
    ]
  },
  {
    id: 'g4',
    slug: 'women-of-courage-spiritual-renewal',
    title: 'Women of Courage Spiritual Renewal Assembly',
    category: 'Faith & Renewal',
    date: 'September 2025',
    location: 'Sanctuary Assembly Hall',
    imageUrl: '/images/gallery_retreat.png',
    caption: 'An inspiring intercessory prayer and spiritual renewal circle anchoring female leaders in Biblical grace, purpose, and unity.',
    impactHighlight: '400+ Women Joined in Prayer',
    photoCount: 4,
    photos: [
      { id: 'p4-1', url: '/images/gallery_retreat.png', caption: 'Women gathered in fellowship, prayer, and intercession.' },
      { id: 'p4-2', url: '/images/founder_portrait.png', caption: 'Devotional reflection on biblical Deborah-like leadership.' },
      { id: 'p4-3', url: '/images/hero_portrait.png', caption: 'Spiritual mentorship prayer circle session.' },
      { id: 'p4-4', url: '/images/who_we_are.png', caption: 'Annual spiritual retreat delegates worship gathering.' },
    ]
  },
  {
    id: 'g5',
    slug: 'community-girls-leadership-forum',
    title: 'Community Girls Leadership Forum',
    category: 'Conferences',
    date: 'May 2025',
    location: 'Greater Accra Youth Hall',
    imageUrl: '/images/who_we_are.png',
    caption: 'Interactive workshop focusing on public speaking, youth governance, and moral clarity for high school Prefects and student leaders.',
    impactHighlight: '15 Active School Clubs Launched',
    photoCount: 3,
    photos: [
      { id: 'p5-1', url: '/images/who_we_are.png', caption: 'Youth leaders participating in public speaking workshop.' },
      { id: 'p5-2', url: '/images/hero_slide_girls.png', caption: 'High school Prefects during leadership clinic.' },
      { id: 'p5-3', url: '/images/story_beneficiary.png', caption: 'Awarding school prefect mentorship certificates.' },
    ]
  },
  {
    id: 'g6',
    slug: 'grassroots-health-dignity-drive',
    title: 'Grassroots Health & Dignity Drive',
    category: 'Outreaches',
    date: 'April 2025',
    location: 'Northern Outreach Circuit',
    imageUrl: '/images/story_beneficiary.png',
    caption: 'Distributing sanitary dignity kits and providing health education to young girls in rural secondary schools.',
    impactHighlight: '1,000+ Dignity Kits Distributed',
    photoCount: 3,
    photos: [
      { id: 'p6-1', url: '/images/story_beneficiary.png', caption: 'Distribution of health and hygiene dignity kits.' },
      { id: 'p6-2', url: '/images/gallery_outreach.png', caption: 'Health education presentation for secondary school girls.' },
      { id: 'p6-3', url: '/images/who_we_are.png', caption: 'Field outreach team with local school administrators.' },
    ]
  },
  {
    id: 'g7',
    slug: 'tertiary-scholarship-awards-ceremony',
    title: 'Tertiary Scholarship Awards Ceremony',
    category: 'Scholarships',
    date: 'June 2025',
    location: 'National Civic Auditorium',
    imageUrl: '/images/hero_portrait.png',
    caption: 'Awarding merit-based university educational grants to exceptional young women entering STEM and law faculties.',
    impactHighlight: '50 Full Grants Awarded',
    photoCount: 3,
    photos: [
      { id: 'p7-1', url: '/images/hero_portrait.png', caption: 'Presentation of university scholarship grant certificates.' },
      { id: 'p7-2', url: '/images/story_beneficiary.png', caption: 'Scholarship recipient giving appreciation speech.' },
      { id: 'p7-3', url: '/images/founder_portrait.png', caption: 'Executive Director with scholarship recipients and families.' },
    ]
  },
  {
    id: 'g8',
    slug: 'devorah-mentorship-vision-retreat',
    title: 'Devorah Mentorship & Vision Retreat',
    category: 'Faith & Renewal',
    date: 'January 2025',
    location: 'Eco-Retreat Center',
    imageUrl: '/images/founder_portrait.png',
    caption: 'Annual executive retreat for foundation mentors and program directors reflecting on institutional strategy and prayer.',
    impactHighlight: 'Full Leadership Alignment',
    photoCount: 3,
    photos: [
      { id: 'p8-1', url: '/images/founder_portrait.png', caption: 'Strategic planning and vision session for executive mentors.' },
      { id: 'p8-2', url: '/images/hero_portrait.png', caption: 'Leadership intercession and prayer fellowship.' },
      { id: 'p8-3', url: '/images/who_we_are.png', caption: 'Foundation team and program leads roundtable.' },
    ]
  }
];


