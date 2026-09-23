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
    description: 'Our flagship initiative equipping women with practical entrepreneurship, financial literacy, and holistic life skills to thrive independently.',
    targetAudience: 'Young adult women, mothers, and aspiring female entrepreneurs.',
    objectives: [
      'Provide accredited vocational skills training.',
      'Foster financial literacy and micro-enterprise development.',
      'Cultivate supportive peer networks and economic independence.'
    ],
    activities: [
      'Enterprise incubators & financial literacy workshops.',
      'One-on-one professional mentorship pairings.',
      'Community micro-finance guidance circles.'
    ],
    locations: ['Accra', 'Kumasi', 'Regional Outreach Hubs'],
    imageUrl: '/images/who_we_are.png',
    featured: true
  },
  {
    id: 'girls-development',
    slug: 'girls-development',
    name: "Girls' Development & Leadership Academy",
    category: "Girls' Development",
    tagline: 'Nurturing confidence, academic excellence, and self-worth in young girls.',
    description: 'A transformative academy designed to provide young girls with educational support, digital skills, character development, and personal safety education.',
    targetAudience: 'Adolescent girls aged 12–19.',
    objectives: [
      'Improve academic retention and STEM engagement.',
      'Provide comprehensive life-skills and confidence building.',
      'Prevent early dropouts through mentorship and scholarship support.'
    ],
    activities: [
      'After-school leadership clinics & STEM bootcamps.',
      'Health, hygiene, and self-protection workshops.',
      'Youth mentorship retreats.'
    ],
    locations: ['Sub-urban Schools', 'Community Learning Centers'],
    imageUrl: '/images/story_beneficiary.png',
    featured: true
  },
  {
    id: 'leadership-development',
    slug: 'leadership-development',
    name: 'Devorah Leadership Institute',
    category: 'Leadership Development',
    tagline: 'Raising courageous female leaders positioned for ethical governance and enterprise.',
    description: 'An executive and grassroots leadership incubator preparing women to step into decision-making roles across civic, corporate, and community spheres.',
    targetAudience: 'Emerging female leaders, civic organizers, and university scholars.',
    objectives: [
      'Develop strategic leadership and public speaking capacities.',
      'Impart faith-based ethical principles of governance.',
      'Create institutional pathways for female decision-makers.'
    ],
    activities: [
      'Quarterly executive leadership summits.',
      'Civic engagement and policy advocacy workshops.',
      'Board governance readiness training.'
    ],
    locations: ['National Leadership Center'],
    imageUrl: '/images/hero_portrait.png',
    featured: true
  },
  {
    id: 'education-scholarships',
    slug: 'education-scholarships',
    name: 'Education & Scholarship Fund',
    category: 'Education',
    tagline: 'Removing financial barriers to guarantee girl-child education.',
    description: 'Providing merit and need-based educational grants, learning materials, and mentorship to ensure young women complete secondary and tertiary education.',
    targetAudience: 'High-achieving girls from underserved rural communities.',
    objectives: [
      'Eliminate financial barriers to secondary education.',
      'Provide university scholarship pathways.',
      'Offer ongoing career counseling and academic tutoring.'
    ],
    activities: [
      'Annual scholarship awards ceremony.',
      'Academic tutoring and exam preparation centers.',
      'Book and digital device distribution drives.'
    ],
    locations: ['Partnering Schools & Tertiary Institutions'],
    imageUrl: '/images/who_we_are.png',
    featured: false
  },
  {
    id: 'faith-spiritual-development',
    slug: 'faith-spiritual-development',
    name: 'Faith & Spiritual Renewal Circles',
    category: 'Faith & Spiritual Development',
    tagline: 'Anchoring purpose, dignity, and spiritual strength through Biblical wisdom.',
    description: 'Integrating timeless Christian principles of grace, courage, and Deborah-like intercession to nourish the soul and inspire purposeful living.',
    targetAudience: 'Women seeking spiritual growth and biblical mentorship.',
    objectives: [
      'Foster a deep, grounded understanding of Christian identity.',
      'Create safe spaces for prayer, counsel, and emotional healing.',
      'Encourage servant leadership anchored in integrity.'
    ],
    activities: [
      'Weekly devotional fellowships.',
      'Annual Women of Courage Spiritual Retreat.',
      'Counseling and prayer support helpline.'
    ],
    locations: ['Community Chapels & Online Assemblies'],
    imageUrl: '/images/founder_portrait.png',
    featured: true
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
    fullDescription: 'The Community Girls Leadership Summit brought together young leaders from 15 local schools for experiential learning, keynote sessions from female tech pioneers, and group mentorship.',
    objective: 'Equip adolescent girls with digital tools and self-belief to pursue higher education.',
    whatWeDid: [
      'Hosted 12 interactive skill workshops.',
      'Distributed 300 leadership toolkits and learning kits.',
      'Established 15 school mentorship clubs.'
    ],
    whoWeReached: '320 adolescent girls & 45 educator chaperones',
    impactResults: [
      '98% reported increased confidence in public speaking.',
      '100% pledged participation in school mentorship clubs.'
    ],
    imageUrl: '/images/who_we_are.png'
  },
  {
    id: 'project-2',
    slug: 'women-vocational-enterprise-outreach',
    name: 'Vocational Enterprise & Dignity Outreach',
    category: 'Outreach',
    date: 'August 2025',
    location: 'Ashanti Region',
    shortDescription: 'Providing 150 women with micro-business seed starter kits and financial management education.',
    fullDescription: 'An intensive 3-week field program focused on practical skills, financial record keeping, and market access for rural female entrepreneurs.',
    objective: 'Strengthen household economic stability through women-led small enterprises.',
    whatWeDid: [
      'Delivered hands-on enterprise starter sessions.',
      'Provided micro-grant starter equipment.',
      'Established community savings circles.'
    ],
    whoWeReached: '150 female micro-entrepreneurs',
    impactResults: [
      '85% launched active revenue-generating micro-enterprises within 60 days.'
    ],
    imageUrl: '/images/hero_portrait.png'
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
    imageUrl: '/images/founder_portrait.png'
  },
  {
    id: 'team-1',
    name: '[Official Program Lead Name]',
    title: 'Head of Programs & Community Outreach',
    role: 'Program Director',
    category: 'Team Lead',
    biography: 'Oversees design, implementation, and impact evaluation across all Devorah Foundation initiatives.',
    imageUrl: '/images/hero_portrait.png'
  },
  {
    id: 'board-1',
    name: '[Official Board Chair Name]',
    title: 'Chairperson, Board of Trustees',
    role: 'Board Trustee',
    category: 'Board Member',
    biography: 'Provides institutional governance, strategic oversight, and fiscal stewardship.',
    imageUrl: '/images/who_we_are.png'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: 'The Devorah Foundation stands out for its high standard of integrity, deep community commitment, and genuine focus on individual transformation.',
    authorName: '[Official Partner Representative]',
    authorRelationship: 'Institutional Partner Representative',
    location: 'Accra'
  },
  {
    id: 't-2',
    quote: 'Through their mentorship program, my daughter has grown into a confident young scholar who believes in her ability to lead.',
    authorName: '[Parent & Community Leader]',
    authorRelationship: 'Parent of Academy Graduate',
    location: 'Greater Accra'
  }
];

export const PARTNERS: Partner[] = [
  { id: 'p1', name: 'Strategic Corporate Partner', category: 'Corporate' },
  { id: 'p2', name: 'International Foundation Network', category: 'Strategic' },
  { id: 'p3', name: 'Community Development Initiative', category: 'Program' },
  { id: 'p4', name: 'Educational Trust', category: 'Financial' }
];
