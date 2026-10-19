'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Award, 
  Scale, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink, 
  X, 
  Sparkles, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Quote,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Person } from '@/lib/types';
import SectionHeader from '@/components/ui/SectionHeader';

interface BoardLeadershipSectionProps {
  boardMembers: Person[];
  teamLeads?: Person[];
}

const GOVERNANCE_PILLARS = [
  {
    icon: Scale,
    title: 'Fiduciary Integrity',
    desc: 'Uncompromising transparency, annual independent audits & donor accountability.'
  },
  {
    icon: ShieldCheck,
    title: 'Independent Oversight',
    desc: 'A dedicated four-member Board steering policy, compliance & institutional growth.'
  },
  {
    icon: BookOpen,
    title: 'Biblical Wisdom',
    desc: 'Anchoring every operational decision in Christian moral courage and servant leadership.'
  },
  {
    icon: Award,
    title: 'Impact Verification',
    desc: 'Rigorous outcome tracking aligned with UN SDGs 3 & 4 and community transformation.'
  }
];

export default function BoardLeadershipSection({
  boardMembers,
  teamLeads = []
}: BoardLeadershipSectionProps) {
  const [activeTab, setActiveTab] = useState<'board' | 'team'>('board');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'spotlight'>('grid');

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPerson(null);
    };
    if (selectedPerson) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPerson]);

  const founder = boardMembers.find((p) => p.id === 'founder') || boardMembers[0];
  const otherTrustees = boardMembers.filter((p) => p.id !== (founder?.id || 'founder'));

  return (
    <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* 1. Section Header & Governance Mandate */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8DDF0]/60 border border-[#E8DDF0] text-[#6E3A82] text-xs font-semibold uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4 text-[#6E3A82]" />
          <span>Leadership & Institutional Governance</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B214F] tracking-tight">
          Guided by visionary leaders & faithful stewards.
        </h2>
        <p className="text-base sm:text-lg text-[#716A73] leading-relaxed">
          The Devorah Women's Leadership & Empowerment Initiative is anchored by a four-member Board of Trustees upholding moral clarity, fiscal stewardship, and strategic vision across Africa.
        </p>
      </div>

      {/* 2. Governance Pillars Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl bg-gradient-to-br from-white to-[#FAF8F5] border border-[#E8DDF0] shadow-sm">
        {GOVERNANCE_PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div key={idx} className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/80 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#E8DDF0]/60 flex items-center justify-center shrink-0 text-[#6E3A82]">
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-sm text-[#3B214F]">{pillar.title}</h3>
                <p className="text-xs text-[#716A73] leading-snug">{pillar.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Navigation Controls: Tabs & View Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E8DDF0] pb-6">
        {/* Structure Tabs */}
        <div className="flex items-center gap-2 bg-[#E8DDF0]/40 p-1.5 rounded-full border border-[#E8DDF0]">
          <button
            onClick={() => setActiveTab('board')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'board'
                ? 'bg-[#3B214F] text-white shadow-md'
                : 'text-[#3B214F]/70 hover:text-[#3B214F]'
            }`}
          >
            Board of Trustees (4 Members)
          </button>
          {teamLeads.length > 0 && (
            <button
              onClick={() => setActiveTab('team')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'team'
                  ? 'bg-[#3B214F] text-white shadow-md'
                  : 'text-[#3B214F]/70 hover:text-[#3B214F]'
              }`}
            >
              Executive Program Leads ({teamLeads.length})
            </button>
          )}
        </div>

        {/* View Mode Switcher (only for board view) */}
        {activeTab === 'board' && (
          <div className="flex items-center gap-2 text-xs text-[#716A73]">
            <span className="hidden sm:inline font-medium">Layout:</span>
            <div className="inline-flex rounded-lg border border-[#E8DDF0] bg-white p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#6E3A82] text-white'
                    : 'text-[#716A73] hover:text-[#3B214F]'
                }`}
              >
                4-Column Grid
              </button>
              <button
                onClick={() => setViewMode('spotlight')}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  viewMode === 'spotlight'
                    ? 'bg-[#6E3A82] text-white'
                    : 'text-[#716A73] hover:text-[#3B214F]'
                }`}
              >
                Founder Spotlight
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4. Board of Trustees Content */}
      {activeTab === 'board' && (
        <div className="space-y-12">
          
          {/* Spotlight Mode: Founder Featured Hero + 3 Trustees */}
          {viewMode === 'spotlight' && founder && (
            <div className="space-y-12">
              {/* Founder Spotlight Card */}
              <div className="relative overflow-hidden rounded-3xl bg-white border border-[#E8DDF0] shadow-xl p-8 sm:p-12">
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#E8DDF0]/40 to-transparent rounded-bl-full pointer-events-none" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-5 relative">
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border border-[#E8DDF0] bg-[#3B214F] group">
                      <Image
                        src={founder.imageUrl}
                        alt={founder.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3B214F]/60 via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#C5A880] text-[#242024] shadow-sm">
                          Founder & Executive Trustee
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DDF0] text-[#6E3A82] text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-[#6E3A82]" />
                      <span>{founder.committee || 'Governance & Spiritual Oversight'}</span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B214F]">
                        {founder.name}
                      </h3>
                      <p className="text-sm font-semibold text-[#6E3A82]">{founder.title}</p>
                    </div>

                    <p className="text-sm sm:text-base text-[#716A73] leading-relaxed">
                      {founder.biography}
                    </p>

                    {founder.quote && (
                      <div className="relative pl-5 border-l-2 border-[#C5A880] py-1 my-2">
                        <p className="font-serif italic text-sm sm:text-base text-[#3B214F]">
                          "{founder.quote}"
                        </p>
                      </div>
                    )}

                    {/* Expertise Pills */}
                    {founder.expertise && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {founder.expertise.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E8DDF0] text-xs font-medium text-[#3B214F]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        onClick={() => setSelectedPerson(founder)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3B214F] text-white hover:bg-[#6E3A82] text-xs font-semibold tracking-wide transition-all shadow-md hover:shadow-lg"
                      >
                        <span>View Executive Dossier</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other 3 Trustees Header & Grid */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="font-serif text-2xl font-bold text-[#3B214F]">
                    The Board of Trustees
                  </h3>
                  <p className="text-xs text-[#716A73] mt-1">
                    Providing governance, audit oversight, and institutional strategy
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {otherTrustees.map((trustee) => (
                    <BoardCard
                      key={trustee.id}
                      person={trustee}
                      onSelect={() => setSelectedPerson(trustee)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Grid Mode: Balanced 4-Column Showcase (All 4 Members Equal & Distinguished) */}
          {viewMode === 'grid' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-[#716A73] px-1">
                <p>Showing all 4 members of the Board of Trustees</p>
                <p className="italic">Click any member to view full governance credentials</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {boardMembers.map((member) => (
                  <BoardCard
                    key={member.id}
                    person={member}
                    isFounder={member.id === 'founder'}
                    onSelect={() => setSelectedPerson(member)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. Executive Team Leads View */}
      {activeTab === 'team' && (
        <div className="space-y-8">
          <div className="max-w-2xl">
            <h3 className="font-serif text-2xl font-bold text-[#3B214F]">
              Executive Operations & Program Direction
            </h3>
            <p className="text-xs sm:text-sm text-[#716A73] mt-1">
              Translating governance into compassionate field outreach, leadership development, and daily beneficiary empowerment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamLeads.map((person) => (
              <div
                key={person.id}
                className="group p-6 rounded-2xl bg-white border border-[#E8DDF0] shadow-sm hover:shadow-md hover:border-[#6E3A82]/40 transition-all space-y-4"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#3B214F]">
                  <Image
                    src={person.imageUrl}
                    alt={person.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {person.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-[#3B214F]/85 text-white backdrop-blur-sm">
                        {person.badge}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-[#3B214F] group-hover:text-[#6E3A82] transition-colors">
                    {person.name}
                  </h4>
                  <p className="text-xs font-semibold text-[#6E3A82]">{person.title}</p>
                  <p className="text-xs text-[#716A73] leading-relaxed line-clamp-3">
                    {person.biography}
                  </p>

                  {person.responsibilities && (
                    <p className="text-[11px] text-[#716A73]/80 italic pt-1 border-t border-[#E8DDF0]">
                      <span className="font-semibold text-[#3B214F]">Role:</span> {person.responsibilities}
                    </p>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => setSelectedPerson(person)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6E3A82] hover:text-[#3B214F] transition-colors"
                    >
                      <span>Read profile</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Interactive Executive Profile Modal (Dossier) */}
      <AnimatePresence>
        {selectedPerson && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPerson(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E8DDF0] overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto"
            >
              {/* Header Close Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DDF0] bg-[#FAF8F5]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6E3A82]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#3B214F]">
                    {selectedPerson.category === 'Founder' || selectedPerson.badge?.includes('Trustee')
                      ? 'Board of Trustees Dossier'
                      : 'Leadership Profile'}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedPerson(null)}
                  className="w-8 h-8 rounded-full bg-white border border-[#E8DDF0] text-[#716A73] hover:text-[#3B214F] hover:bg-[#E8DDF0]/60 flex items-center justify-center transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Portrait & Quick Meta */}
                  <div className="md:col-span-5 space-y-4">
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#3B214F] border border-[#E8DDF0] shadow-md">
                      <Image
                        src={selectedPerson.imageUrl}
                        alt={selectedPerson.name}
                        fill
                        className="object-cover"
                      />
                      {selectedPerson.badge && (
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#3B214F]/90 text-white backdrop-blur-sm border border-white/20">
                            {selectedPerson.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    {selectedPerson.committee && (
                      <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8DDF0] space-y-1">
                        <p className="text-[10px] font-bold text-[#6E3A82] uppercase tracking-wider">
                          Committee Oversight
                        </p>
                        <p className="text-xs font-semibold text-[#3B214F]">
                          {selectedPerson.committee}
                        </p>
                      </div>
                    )}

                    {selectedPerson.education && (
                      <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8DDF0]">
                        <GraduationCap className="w-4 h-4 text-[#6E3A82] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold text-[#6E3A82] uppercase tracking-wider">
                            Academic & Professional Credentials
                          </p>
                          <p className="text-xs text-[#3B214F] mt-0.5">{selectedPerson.education}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Bio, Vision, Details */}
                  <div className="md:col-span-7 space-y-5">
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B214F]">
                        {selectedPerson.name}
                      </h3>
                      <p className="text-sm font-semibold text-[#6E3A82] mt-0.5">
                        {selectedPerson.title}
                      </p>
                    </div>

                    {selectedPerson.quote && (
                      <div className="p-4 rounded-xl bg-[#E8DDF0]/40 border-l-4 border-[#6E3A82] space-y-1">
                        <Quote className="w-4 h-4 text-[#6E3A82]" />
                        <p className="font-serif italic text-sm text-[#3B214F] leading-snug">
                          "{selectedPerson.quote}"
                        </p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#3B214F]">
                        Executive Biography
                      </h4>
                      <p className="text-xs sm:text-sm text-[#716A73] leading-relaxed">
                        {selectedPerson.biography}
                      </p>
                    </div>

                    {selectedPerson.background && (
                      <div className="space-y-1.5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#3B214F]">
                          Professional Background
                        </h4>
                        <p className="text-xs sm:text-sm text-[#716A73] leading-relaxed">
                          {selectedPerson.background}
                        </p>
                      </div>
                    )}

                    {selectedPerson.vision && (
                      <div className="space-y-1.5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#3B214F]">
                          Governance Vision
                        </h4>
                        <p className="text-xs sm:text-sm text-[#716A73] leading-relaxed">
                          {selectedPerson.vision}
                        </p>
                      </div>
                    )}

                    {selectedPerson.expertise && selectedPerson.expertise.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-[#E8DDF0]">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#3B214F]">
                          Core Governance Competencies
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedPerson.expertise.map((item, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E8DDF0] text-[11px] font-medium text-[#3B214F]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-[#E8DDF0] bg-[#FAF8F5] flex justify-end">
                <button
                  onClick={() => setSelectedPerson(null)}
                  className="px-5 py-2 rounded-full bg-[#3B214F] text-white text-xs font-semibold hover:bg-[#6E3A82] transition-colors"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

// Subcomponent: Board Member Card
interface BoardCardProps {
  person: Person;
  isFounder?: boolean;
  onSelect: () => void;
}

function BoardCard({ person, isFounder = false, onSelect }: BoardCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`group relative flex flex-col justify-between rounded-2xl bg-white border transition-all duration-300 cursor-pointer overflow-hidden p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 ${
        isFounder 
          ? 'border-[#C5A880]/60 ring-1 ring-[#C5A880]/30' 
          : 'border-[#E8DDF0] hover:border-[#6E3A82]/50'
      }`}
    >
      {/* Top Banner Tag for Founder or Chairperson */}
      <div className="space-y-4">
        <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#3B214F] border border-[#E8DDF0]/60">
          <Image
            src={person.imageUrl}
            alt={person.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3B214F]/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Badge */}
          {person.badge && (
            <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md shadow-sm ${
                  isFounder
                    ? 'bg-[#C5A880] text-[#242024]'
                    : 'bg-[#3B214F]/85 text-white'
                }`}
              >
                {person.badge}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          {person.committee && (
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#6E3A82] line-clamp-1">
              {person.committee}
            </p>
          )}

          <h3 className="font-serif text-lg font-bold text-[#3B214F] group-hover:text-[#6E3A82] transition-colors leading-snug">
            {person.name}
          </h3>

          <p className="text-xs font-semibold text-[#6E3A82] line-clamp-1">
            {person.title}
          </p>

          <p className="text-xs text-[#716A73] leading-relaxed line-clamp-3">
            {person.biography}
          </p>
        </div>
      </div>

      {/* Card Action Link */}
      <div className="pt-4 mt-4 border-t border-[#E8DDF0] flex items-center justify-between text-xs font-bold text-[#6E3A82] group-hover:text-[#3B214F] transition-colors">
        <span>View Full Dossier</span>
        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
