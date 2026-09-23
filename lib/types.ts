export interface Program {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  targetAudience: string;
  objectives: string[];
  activities: string[];
  locations: string[];
  imageUrl: string;
  featured: boolean;
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
  category: 'Foundation News' | 'Women\'s Issues' | 'Girls\' Development' | 'Leadership' | 'Faith' | 'Empowerment' | 'Community Stories' | 'Events';
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
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRelationship: string; // e.g. "Beneficiary, Leadership Program", "Community Partner"
  avatarUrl?: string;
  location?: string;
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
  category: 'Financial' | 'Program' | 'Resource' | 'Strategic' | 'Corporate';
  logoUrl?: string;
}
