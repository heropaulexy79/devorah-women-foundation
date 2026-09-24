export interface Program {
  id: string;
  slug: string;
  name: string;
  category: "Women's Empowerment" | "Girls' Development" | "Leadership Development" | "Education" | "Mentorship" | "Community Outreach" | "Faith & Spiritual Development";
  tagline: string;
  description: string;
  targetAudience: string;
  objectives: string[];
  activities: string[];
  locations: string[];
  imageUrl: string;
  featured: boolean;
  impactResults?: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  galleryImages?: string[];
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  category: 'Outreach' | 'Training' | 'Conferences' | 'Community' | 'Campaigns';
  date: string;
  location: string;
  shortDescription: string;
  fullDescription: string;
  objective: string;
  whatWeDid: string[];
  whoWeReached: string;
  impactResults: string[];
  imageUrl: string;
  galleryImages?: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: 'Foundation News' | 'Women\'s Issues' | 'Girls\' Development' | 'Leadership' | 'Faith' | 'Empowerment' | 'Community Stories' | 'Event Updates & Announcements';
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  publishedAt: string;
  readingTime: string;
  featuredImageUrl: string;
  featured?: boolean;
}

export interface Resource {
  id: string;
  slug: string;
  title: string;
  type: 'Journals' | 'Books' | 'Devotionals' | 'Guides' | 'Publications';
  author: string;
  shortDescription: string;
  coverImageUrl: string;
  downloadUrl?: string;
  readOnlineUrl?: string;
}

export interface Person {
  id: string;
  name: string;
  role: string;
  category: 'Founder' | 'Team Lead' | 'Board Member';
  title?: string;
  biography: string;
  background?: string;
  education?: string;
  vision?: string;
  responsibilities?: string;
  expertise?: string[];
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRelationship: string; // e.g. "Beneficiary", "Community Leader", "Partner"
  avatarUrl?: string;
  location?: string;
  category?: 'Beneficiary' | 'Volunteer' | 'Partner' | 'Event Participant' | 'Community Leader';
  videoUrl?: string;
}

export interface ImpactMetric {
  id: string;
  number: string;
  label: string;
  description: string;
  isPlaceholder?: boolean;
}

export interface Partner {
  id: string;
  name: string;
  category: 'Individuals' | 'Businesses' | 'Churches' | 'NGOs' | 'Foundations' | 'Government Agencies' | 'Educational Institutions' | 'Corporate Organisations' | 'Community Organisations';
  logoUrl?: string;
}
