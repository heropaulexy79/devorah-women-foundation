import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import ProgramCard from '@/components/cards/ProgramCard';
import CTASection from '@/components/sections/CTASection';
import { PROGRAMS } from '@/lib/data';

import PageHero from '@/components/ui/PageHero';

export const metadata = {
  title: 'Our Programs',
  description:
    'Explore Devorah Women Foundation\'s comprehensive empowerment programs covering women leadership, girl-child development, education scholarships, vocational training, and spiritual growth.',
  keywords: [
    'women empowerment programs Ghana',
    'girls development program',
    'leadership development women',
    'vocational training Ghana',
    'girl scholarship Africa',
    'faith spiritual development',
  ],
  alternates: { canonical: '/programs' },
  openGraph: {
    title: 'Our Programs | Devorah Women Foundation',
    description: 'Our multi-disciplinary initiatives provide sustainable education, career leadership, vocational dignity, and spiritual resilience for women and girls.',
    url: '/programs',
    type: 'website',
    images: [{ url: '/images/who_we_are.png', width: 1200, height: 630, alt: 'Devorah Women Foundation programs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Programs | Devorah Women Foundation',
    description: 'Explore our empowerment programs for women and girls across Ghana.',
    images: ['/images/who_we_are.png'],
  },
};

export default function ProgramsPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      
      {/* Header Banner */}
      <PageHero
        eyebrow="OUR STRATEGIC PILLARS"
        title="Where empowerment becomes action."
        description="Our multi-disciplinary initiatives are structured to provide sustainable education, career leadership, vocational dignity, and spiritual resilience."
        breadcrumb={[{ label: 'Our Programs' }]}
      />

      {/* Grid of Programs */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMS.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
