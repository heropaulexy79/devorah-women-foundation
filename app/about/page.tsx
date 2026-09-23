import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/sections/CTASection';
import { LEADERSHIP_PEOPLE } from '@/lib/data';
import { Award, BookOpen, GraduationCap, Heart, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'About & Leadership | Devorah Women Foundation',
  description: 'Discover our story, leadership team, governance board, and faith-anchored mission empowering women and girls.',
};

export default function AboutPage() {
  const founder = LEADERSHIP_PEOPLE.find((p) => p.category === 'Founder');
  const teamLeads = LEADERSHIP_PEOPLE.filter((p) => p.category === 'Team Lead');
  const boardMembers = LEADERSHIP_PEOPLE.filter((p) => p.category === 'Board Member');

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      
      {/* Page Hero Header */}
      <section className="py-20 bg-gradient-to-b from-[#F7F3F8] to-[#FAF8F5] border-b border-[#E8DDF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-[#E8DDF0] text-[#6E3A82] text-xs font-semibold uppercase tracking-widest">
            ABOUT DEVORAH WOMEN FOUNDATION
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3B214F]">
            An institution built on strength, dignity, and purpose.
          </h1>
          <p className="text-base sm:text-lg text-[#716A73] max-w-2xl mx-auto leading-relaxed">
            We are dedicated to unlocking the potential of girls and women through holistic education, mentorship, leadership development, and faith-anchored community action.
          </p>
        </div>
      </section>

      {/* Founder Editorial Spotlight Section */}
      {founder && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Founder Portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <Image
                  src={founder.imageUrl}
                  alt={founder.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Founder Bio Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#6E3A82] uppercase bg-[#E8DDF0]/60 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FOUNDER & VISIONARY SPOTLIGHT</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B214F]">
                {founder.name}
              </h2>
              <p className="text-sm font-semibold text-[#6E3A82]">
                {founder.title}
              </p>

              <div className="space-y-4 text-sm text-[#716A73] leading-relaxed">
                <p>{founder.biography}</p>
                <div className="p-4 rounded-2xl bg-[#F7F3F8] border border-[#E8DDF0] space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-[#3B214F] text-xs uppercase tracking-wide">
                    <GraduationCap className="w-4 h-4 text-[#6E3A82]" />
                    <span>Background & Vision</span>
                  </div>
                  <p className="text-xs text-[#716A73]">{founder.background}</p>
                  <p className="text-xs italic text-[#6E3A82]">"{founder.vision}"</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* Team Leads & Governance Board */}
      <section className="py-20 bg-[#F7F3F8] border-t border-[#E8DDF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div>
            <SectionHeader
              eyebrow="LEADERSHIP TEAM"
              title="Dedicated professionals driving impact."
              centered
              className="mb-12"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamLeads.map((person) => (
                <div key={person.id} className="p-6 rounded-2xl bg-white border border-[#E8DDF0] shadow-sm space-y-4">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#3B214F]">
                    <Image src={person.imageUrl} alt={person.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#3B214F]">{person.name}</h3>
                    <p className="text-xs font-semibold text-[#6E3A82]">{person.title}</p>
                    <p className="text-xs text-[#716A73] mt-2 leading-relaxed">{person.biography}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader
              eyebrow="BOARD OF TRUSTEES"
              title="Institutional governance & stewardship."
              centered
              className="mb-12"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {boardMembers.map((person) => (
                <div key={person.id} className="p-6 rounded-2xl bg-white border border-[#E8DDF0] shadow-sm space-y-4">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#3B214F]">
                    <Image src={person.imageUrl} alt={person.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#3B214F]">{person.name}</h3>
                    <p className="text-xs font-semibold text-[#6E3A82]">{person.title}</p>
                    <p className="text-xs text-[#716A73] mt-2 leading-relaxed">{person.biography}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <CTASection />
    </div>
  );
}
