'use client';

import React from 'react';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import ProgramCard from '@/components/cards/ProgramCard';
import { PROGRAMS } from '@/lib/data';

export default function ProgramsGrid() {
  const featured = PROGRAMS[0]; // Women's Empowerment Initiative — first featured program
  const supporting = PROGRAMS.slice(1); // Remaining programs

  return (
    <section className="py-24 lg:py-32 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeader
            eyebrow="OUR PROGRAMS"
            title="Where empowerment becomes action."
            description="Strategic program pillars designed to foster long-term dignity, economic independence, and spiritual growth."
          />
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6E3A82] hover:text-[#3B214F] shrink-0 transition-colors tracking-wide group"
          >
            <span>View All Programs</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Featured Program — full-width editorial treatment */}
        <div className="mb-6">
          <ProgramCard program={featured} featured={true} />
        </div>

        {/* Supporting Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {supporting.map((program) => (
            <ProgramCard key={program.id} program={program} featured={false} />
          ))}
        </div>

      </div>
    </section>
  );
}
