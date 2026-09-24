import { Program, Project, Article, Resource, Person, Testimonial, ImpactMetric, Partner } from './types';

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
    id: 'womens-empowerment',
    slug: 'womens-empowerment',
    name: "Women's Empowerment Initiative",
    category: "Women's Empowerment",
    tagline: 'Building financial dignity, vocational skills, and strategic agency.',
    description: 'Our flagship initiative equipping women with practical entrepreneurship, financial literacy, vocational dignity, and holistic life skills to thrive independently.',
    targetAudience: 'Young adult women, mothers, and aspiring female entrepreneurs in underserved urban and rural communities.',
    objectives: [
      'Provide accredited vocational skills training and enterprise starter kits.',
      'Foster financial literacy, micro-savings, and credit management.',
      'Cultivate supportive peer networks and long-term economic independence.'
    ],
    activities: [
      'Enterprise incubators & financial literacy bootcamps.',
      'One-on-one professional mentorship pairings.',
      'Community micro-finance guidance circles & trade exhibitions.'
    ],
    locations: ['Accra', 'Kumasi', 'Regional Outreach Hubs'],
    imageUrl: '/images/who_we_are.png',
    featured: true,
    impactResults: [
      '85% of participating women launched sustainable micro-enterprises within 90 days.',
      'Over GH₵ 150,000 in micro-grant equipment distributed directly to female entrepreneurs.',
      '100% of participants established registered community savings circles.'
    ],
    testimonial: {
      quote: "The business training and seed capital provided by Devorah Foundation gave me the dignity to support my family and employ two young girls in my local community.",
      author: "Abena Mansah",
      role: "Empowerment Program Graduate"
    },
    galleryImages: ['/images/who_we_are.png', '/images/story_beneficiary.png']
  },
  {
    id: 'girls-development',
    slug: 'girls-development',
    name: "Girls' Development & Leadership Academy",
    category: "Girls' Development",
    tagline: 'Nurturing confidence, academic excellence, and self-worth in young girls.',
    description: 'A transformative academy designed to provide adolescent girls with educational support, digital skills, character development, personal safety education, and career guidance.',
    targetAudience: 'Adolescent girls aged 12–19 in primary and secondary schools.',
    objectives: [
      'Improve academic retention and STEM/digital engagement among adolescent girls.',
      'Provide comprehensive life-skills, confidence building, and moral clarity.',
      'Prevent early dropouts through mentorship and scholarship support.'
    ],
    activities: [
      'After-school leadership clinics & STEM bootcamps.',
      'Health, hygiene, and self-protection workshops.',
      'Youth mentorship retreats and public speaking summits.'
    ],
    locations: ['Sub-urban Schools', 'Community Learning Centers'],
    imageUrl: '/images/story_beneficiary.png',
    featured: true,
    impactResults: [
      '95% academic retention rate among academy participants.',
      'Over 300 girls trained in introductory digital literacy and coding fundamentals.',
      '15 active school-based leadership clubs established.'
    ],
    testimonial: {
      quote: "Devorah Foundation showed me that my voice matters. I went from being afraid to speak in class to leading our school's student governance council.",
      author: "Kofi Boateng",
      role: "Academy Graduate & Student Leader"
    },
    galleryImages: ['/images/story_beneficiary.png', '/images/hero_portrait.png']
  },
  {
    id: 'leadership-development',
    slug: 'leadership-development',
    name: 'Devorah Leadership Institute',
    category: 'Leadership Development',
    tagline: 'Raising courageous female leaders positioned for ethical governance and enterprise.',
    description: 'An executive and grassroots leadership incubator preparing women to step into decision-making roles across civic, corporate, educational, and community spheres.',
    targetAudience: 'Emerging female leaders, civic organizers, corporate executives, and university scholars.',
    objectives: [
      'Develop strategic leadership, negotiation, and public governance capacities.',
      'Impart faith-based ethical principles of Deborah-like wisdom and courage.',
      'Create institutional pathways and board readiness for female decision-makers.'
    ],
    activities: [
      'Quarterly executive leadership summits and masterclasses.',
      'Civic engagement and policy advocacy workshops.',
      'Board governance readiness training and executive mentoring.'
    ],
    locations: ['National Leadership Center', 'Accra Central'],
    imageUrl: '/images/hero_portrait.png',
    featured: true,
    impactResults: [
      '120 emerging female leaders certified in ethical governance and board readiness.',
      '85% placed in elevated management or community leadership positions.',
      'Established annual Female Leaders Roundtable.'
    ],
    testimonial: {
      quote: "The Leadership Institute transformed how I approach governance. It rooted my leadership in Biblical integrity and executive clarity.",
      author: "Esi Amodu",
      role: "Institute Alumna & Civic Organizer"
    },
    galleryImages: ['/images/hero_portrait.png', '/images/founder_portrait.png']
  },
  {
    id: 'education-scholarships',
    slug: 'education-scholarships',
    name: 'Education & Scholarship Fund',
    category: 'Education',
    tagline: 'Removing financial barriers to guarantee girl-child education.',
    description: 'Providing merit and need-based educational grants, learning materials, and mentorship to ensure young women complete secondary and tertiary education.',
    targetAudience: 'High-achieving girls from underserved rural and sub-urban communities.',
    objectives: [
      'Eliminate financial barriers to secondary education for vulnerable girls.',
      'Provide university scholarship pathways and academic support.',
      'Offer ongoing career counseling and academic tutoring.'
    ],
    activities: [
      'Annual scholarship awards ceremony and grant distribution.',
      'Academic tutoring and exam preparation centers.',
      'Book, uniform, and digital device distribution drives.'
    ],
    locations: ['Partnering Schools & Tertiary Institutions'],
    imageUrl: '/images/who_we_are.png',
    featured: false,
    impactResults: [
      'Full secondary school scholarships awarded to 50 vulnerable girls.',
      '100% pass rate in national final examinations for scholarship recipients.'
    ],
    testimonial: {
      quote: "Without this scholarship fund, my dream of attending university would have ended. Devorah Foundation gave me hope and a future.",
      author: "Grace Quarshie",
      role: "Tertiary Scholarship Recipient"
    }
  },
  {
    id: 'faith-spiritual-development',
    slug: 'faith-spiritual-development',
    name: 'Faith & Spiritual Renewal Circles',
    category: 'Faith & Spiritual Development',
    tagline: 'Anchoring purpose, dignity, and spiritual strength through Biblical wisdom.',
    description: 'Integrating timeless Christian principles of grace, courage, and Deborah-like intercession to nourish the soul and inspire purposeful living.',
    targetAudience: 'Women and girls seeking spiritual growth, moral guidance, and biblical mentorship.',
    objectives: [
      'Foster a deep, grounded understanding of Christian identity and divine purpose.',
      'Create safe spaces for prayer, counsel, and emotional healing.',
      'Encourage servant leadership anchored in integrity and grace.'
    ],
    activities: [
      'Weekly devotional fellowships & intercessory prayer circles.',
      'Annual Women of Courage Spiritual Retreat.',
      'Counseling and spiritual mentorship support helpline.'
    ],
    locations: ['Community Chapels & Online Assemblies'],
    imageUrl: '/images/founder_portrait.png',
    featured: true,
    impactResults: [
      'Over 1,000 women participating in weekly spiritual renewal circles.',
      'Annual retreat gathering 400+ female leaders for prayer and intercession.'
    ],
    testimonial: {
      quote: "The spiritual circles restored my confidence and grounded my identity in Christ. I am leading with new strength and joy.",
      author: "Hannah Adjei",
      role: "Fellowship Circle Member"
    }
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
    name: '[Official Founder Name to be Provided]',
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
    name: '[Official Program Lead Name]',
    title: 'Head of Programs & Community Outreach',
    role: 'Program Director',
    category: 'Team Lead',
    biography: 'Oversees design, implementation, and field evaluation across all Devorah Foundation initiatives.',
    responsibilities: 'Directing field operations, managing program leads, coordinating stakeholder partnerships.',
    imageUrl: '/images/hero_portrait.png'
  },
  {
    id: 'board-1',
    name: '[Official Board Chair Name]',
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
    authorName: '[Official Partner Representative]',
    authorRelationship: 'Institutional Partner Representative',
    location: 'Accra',
    category: 'Partner'
  },
  {
    id: 't-2',
    quote: 'Through their mentorship program, my daughter has grown into a confident young scholar who believes in her ability to lead.',
    authorName: '[Parent & Community Leader]',
    authorRelationship: 'Parent of Academy Graduate',
    location: 'Greater Accra',
    category: 'Community Leader'
  },
  {
    id: 't-3',
    quote: 'Volunteering with the Girls\' Leadership Academy allowed me to invest my professional skills directly into the next generation.',
    authorName: '[Volunteer Mentor]',
    authorRelationship: 'Academy Executive Mentor',
    location: 'Accra',
    category: 'Volunteer'
  },
  {
    id: 't-4',
    quote: 'The Women\'s Empowerment Initiative gave me trade skills, seed equipment, and financial confidence to run my own enterprise.',
    authorName: '[Program Beneficiary]',
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
