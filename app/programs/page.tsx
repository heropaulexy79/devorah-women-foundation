import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import ProgramCard from '@/components/cards/ProgramCard';
import CTASection from '@/components/sections/CTASection';
import { PROGRAMS } from '@/lib/data';

export const metadata = {
  title: 'Our Programs | Devorah Women Foundation',
  description: 'Explore our comprehensive empowerment programs covering women leadership, girl-child development, education grants, and spiritual growth.',
};

export default function ProgramsPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      
      {/* Header Banner */}
      <section className="py-20 bg-gradient-to-b from-[#F7F3F8] to-[#FAF8F5] border-b border-[#E8DDF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-[#E8DDF0] text-[#6E3A82] text-xs font-semibold uppercase tracking-widest">
            OUR STRATEGIC PILLARS
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3B214F]">
            Where empowerment becomes action.
          </h1>
          <p className="text-base sm:text-lg text-[#716A73] max-w-2xl mx-auto leading-relaxed">
            Our multi-disciplinary initiatives are structured to provide sustainable education, career leadership, vocational dignity, and spiritual resilience.
          </p>
        </div>
      </section>

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
