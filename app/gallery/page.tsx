import React from 'react';
import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import MediaGallery from '@/components/sections/MediaGallery';
import CTASection from '@/components/sections/CTASection';
import { Camera, Users, Award, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Media Gallery | Devorah Women Foundation',
  description: 'Explore photos and moments of impact from Devorah Women Foundation outreaches, leadership summits, conferences, and community development projects.',
  openGraph: {
    title: 'Media Gallery | Devorah Women Foundation',
    description: 'Moments of transformation captured in the field across our outreaches, conferences, and mentorship hubs.',
  },
};

const STATS = [
  { icon: Camera, number: '500+', label: 'Field Photos & Records' },
  { icon: Users, number: '5,000+', label: 'Outreach Beneficiaries' },
  { icon: Award, number: '15+', label: 'Executive Summits' },
  { icon: MapPin, number: '40+', label: 'Communities Documented' },
];

export default function GalleryPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Page Hero Header */}
      <PageHero
        eyebrow="OUTREACH & CONFERENCE GALLERY"
        title="Visualizing transformation."
        description="A curated visual archive showcasing community outreaches, leadership summits, STEM bootcamps, and spiritual renewal circles."
        breadcrumb={[{ label: 'Media Gallery' }]}
      />

      {/* Impact Quick Metrics Banner */}
      <section className="bg-[#3B214F] text-white py-12 border-y border-[#6E3A82]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="p-4 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#6E3A82]/50 border border-[#A987C2]/30 flex items-center justify-center text-[#C5A8D8] mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    {stat.number}
                  </span>
                  <span className="text-xs text-[#E8DDF0]/70 font-medium uppercase tracking-wider mt-1">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Interactive Gallery Section */}
      <MediaGallery />

      {/* Call to Action */}
      <CTASection />
    </div>
  );
}
