'use client';

import React, { useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { TESTIMONIALS } from '@/lib/data';
import { Quote, UserCheck } from 'lucide-react';

const CATEGORIES = ['All', 'Beneficiary', 'Volunteer', 'Partner', 'Community Leader'];

export default function TestimonialsEditorial() {
  const [selectedCat, setSelectedCat] = useState('All');

  const filteredTestimonials = selectedCat === 'All'
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => t.category === selectedCat);

  return (
    <section className="py-24 bg-[#F7F3F8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <SectionHeader
          eyebrow="COMMUNITY VOICES & TESTIMONIALS"
          title="Stories of transformation from those we serve."
          description="Hear from beneficiaries, young girls, volunteers, institutional partners, and community leaders."
          centered
          className="mb-12"
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCat === cat
                  ? 'bg-[#6E3A82] text-white shadow-sm'
                  : 'bg-white border border-[#E8DDF0] text-[#716A73] hover:text-[#3B214F] hover:bg-[#E8DDF0]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredTestimonials.map((t) => (
            <div
              key={t.id}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E8DDF0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F4ECF7] text-[#6E3A82]">
                    {t.category || 'Testimonial'}
                  </span>
                  <Quote className="w-8 h-8 text-[#6E3A82]/15" />
                </div>

                <p className="font-serif text-lg sm:text-xl text-[#3B214F] leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-5 border-t border-[#E8DDF0]/60 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-[#3B214F] text-sm">
                    {t.authorName}
                  </h4>
                  <p className="text-xs text-[#6E3A82] font-medium mt-0.5">
                    {t.authorRelationship} &middot; {t.location}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#F4ECF7] flex items-center justify-center text-[#6E3A82]">
                  <UserCheck className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
