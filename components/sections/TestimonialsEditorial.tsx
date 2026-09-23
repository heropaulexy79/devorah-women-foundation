'use client';

import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { TESTIMONIALS } from '@/lib/data';

export default function TestimonialsEditorial() {
  return (
    <section className="py-24 bg-[#F7F3F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          eyebrow="COMMUNITY VOICES"
          title="Voices from the communities we serve."
          centered
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-8 sm:p-10 rounded-sm bg-white border border-[#E8DDF0]/70 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Typographic quote mark */}
                <span
                  className="font-serif text-5xl text-[#6E3A82]/20 leading-none select-none block"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="font-serif text-lg sm:text-xl text-[#3B214F] leading-relaxed italic -mt-2">
                  {t.quote}
                </p>
              </div>

              <div className="pt-5 border-t border-[#E8DDF0]">
                <h4 className="font-semibold text-[#3B214F] text-sm">
                  {t.authorName}
                </h4>
                <p className="text-xs text-[#6E3A82] font-medium mt-1">
                  {t.authorRelationship} &middot; {t.location}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
