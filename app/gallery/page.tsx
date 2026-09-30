import React from 'react';
import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import MediaGallery from '@/components/sections/MediaGallery';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Media Gallery | Devorah Women Foundation',
  description: 'Explore moments from Devorah Women Foundation’s programs, outreaches, conferences, scholarships and faith-based initiatives.',
  openGraph: {
    title: 'Media Gallery | Devorah Women Foundation',
    description: 'Moments from the work. Stories from the community.',
  },
};

export default function GalleryPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Page Hero Header */}
      <PageHero
        eyebrow="OUR GALLERY"
        title="Moments from the work."
        description="Explore moments from Devorah Women Foundation's programs, outreaches, conferences, scholarships and faith-based initiatives."
        breadcrumb={[{ label: 'Our Gallery' }]}
      />

      {/* Main Curated Editorial Gallery Section */}
      <MediaGallery />

      {/* Organizational Call to Action */}
      <CTASection />
    </div>
  );
}
