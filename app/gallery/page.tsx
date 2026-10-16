import React from 'react';
import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import MediaGallery from '@/components/sections/MediaGallery';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Media Gallery',
  description:
    "Explore moments from Devorah Women's Leadership & Empowerment Initiative's programs, outreaches, conferences, scholarships and faith-based initiatives across Lagos, Nigeria.",
  keywords: [
    'Devorah Initiative gallery',
    'women empowerment photos Nigeria',
    'women empowerment photos Lagos',
    'girls leadership conference',
    'community outreach photos',
    'NGO media Nigeria',
  ],
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Media Gallery | Devorah Women's Leadership & Empowerment Initiative',
    description: 'Moments from the work. Stories from the community.',
    url: '/gallery',
    type: 'website',
    images: [{ url: '/images/gallery_conference.png', width: 1200, height: 630, alt: 'Devorah Initiative gallery' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Media Gallery | Devorah Women's Leadership & Empowerment Initiative',
    description: 'Explore moments from Devorah Women's Leadership & Empowerment Initiative\'s programs, outreaches, and community events.',
    images: ['/images/gallery_conference.png'],
  },
};

export default function GalleryPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Page Hero Header */}
      <PageHero
        eyebrow="OUR GALLERY"
        title="Moments from the work."
        description="Explore moments from Devorah Women's Leadership & Empowerment Initiative's programs, outreaches, conferences, scholarships and faith-based initiatives."
        breadcrumb={[{ label: 'Our Gallery' }]}
      />

      {/* Main Curated Editorial Gallery Section */}
      <MediaGallery />

      {/* Organizational Call to Action */}
      <CTASection />
    </div>
  );
}
