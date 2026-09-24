import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/sections/CTASection';
import PageHero from '@/components/ui/PageHero';
import { LEADERSHIP_PEOPLE, TESTIMONIALS } from '@/lib/data';
import { 
  Award, 
  BookOpen, 
  Compass, 
  Cross, 
  GraduationCap, 
  Heart, 
  HeartHandshake, 
  Lightbulb, 
  ShieldCheck, 
  Sparkles, 
  Target, 
  Users,
  CheckCircle2,
  BookMarked
} from 'lucide-react';

export const metadata = {
  title: 'About Us | Devorah Women Foundation',
  description: 'Learn about our history, mission, vision, core values, Christian identity, and leadership team.',
};

const CORE_VALUES = [
  {
    icon: Compass,
    title: 'Faith & Integrity',
    description: 'Guided by Biblical principles of grace, intercession, and unyielding truth in all initiatives.',
  },
  {
    icon: ShieldCheck,
    title: 'Dignity & Respect',
    description: 'Honoring the intrinsic value and unique God-given identity of every girl and woman.',
  },
  {
    icon: Target,
    title: 'Excellence in Action',
    description: 'Maintaining world-class institutional standards in program execution, stewardship, and governance.',
  },
  {
    icon: Heart,
    title: 'Transformative Community',
    description: 'Cultivating supportive networks where women elevate one another into positions of impact.',
  },
];

const APPROACH_PILLARS = [
  {
    number: '01',
    icon: GraduationCap,
    title: 'Educational Support & Scholarships',
    description: 'Removing financial barriers for high-potential girls to guarantee uninterrupted secondary and tertiary education.',
  },
  {
    number: '02',
    icon: Users,
    title: 'Structured Mentorship Incubators',
    description: 'Pairing young women with accomplished female executives, civic leaders, and scholars for holistic guidance.',
  },
  {
    number: '03',
    icon: Lightbulb,
    title: 'Vocational Dignity & Micro-Enterprise',
    description: 'Equipping women with financial literacy, business skills, and micro-grant pathways for self-sustaining independence.',
  },
  {
    number: '04',
    icon: HeartHandshake,
    title: 'Grassroots Community & Advocacy',
    description: 'Engaging local communities and stakeholders to eradicate systemic barriers and foster safe spaces for growth.',
  },
];

export default function AboutPage() {
  const founder = LEADERSHIP_PEOPLE.find((p) => p.category === 'Founder');
  const teamLeads = LEADERSHIP_PEOPLE.filter((p) => p.category === 'Team Lead');
  const boardMembers = LEADERSHIP_PEOPLE.filter((p) => p.category === 'Board Member');

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      
      {/* 1. Page Hero Header */}
      <PageHero
        eyebrow="ABOUT DEVORAH WOMEN FOUNDATION"
        title="An institution built on strength, dignity, and purpose."
        description="We are dedicated to unlocking the potential of girls and women through holistic education, mentorship, leadership development, and faith-anchored community action."
        breadcrumb={[{ label: 'About Us' }]}
      />

      {/* 2. Who We Are – History, Background, Who We Serve & Issues Addressed */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <SectionHeader
              eyebrow="WHO WE ARE"
              title="Building pathways where women and girls walk in full potential."
            />

            <p className="text-base text-[#716A73] leading-relaxed">
              Established with a deep commitment to social justice and human dignity, Devorah Women Foundation addresses the systemic educational, economic, and leadership barriers facing young girls and women in underserved communities.
            </p>

            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#3B214F]">
                Key Issues We Address & Who We Serve:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#E8DDF0] space-y-1 shadow-sm">
                  <h4 className="text-xs font-bold text-[#6E3A82] uppercase">Who We Serve</h4>
                  <p className="text-xs text-[#716A73] leading-relaxed">
                    Adolescent girls (ages 12–19), young adult female scholars, micro-entrepreneurs, and emerging community leaders.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E8DDF0] space-y-1 shadow-sm">
                  <h4 className="text-xs font-bold text-[#6E3A82] uppercase">Issues Addressed</h4>
                  <p className="text-xs text-[#716A73] leading-relaxed">
                    School dropout rates, leadership underrepresentation, economic vulnerability, and lack of structured female mentorship.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-[#716A73] leading-relaxed pt-2">
              By combining rigorous professional standards with faith-anchored compassion, our foundation creates sustainable ecosystems where every woman is empowered to thrive.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/who_we_are.png"
                alt="Devorah Foundation community gathering"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden sm:block">
              <Image
                src="/images/story_beneficiary.png"
                alt="Young woman empowered through mentorship"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3 & 4. Our Vision & Our Mission */}
      <section className="py-20 bg-[#F7F3F8] border-y border-[#E8DDF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 lg:divide-x lg:divide-[#E8DDF0]">
            
            {/* Our Vision */}
            <div className="lg:pr-12 space-y-4">
              <span className="text-[10px] font-semibold tracking-[0.3em] text-[#6E3A82] uppercase">
                OUR VISION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#3B214F] leading-tight">
                A world where every girl and woman walks in her full God-given potential, free from systemic limitations.
              </h2>
              <p className="text-sm text-[#716A73] leading-relaxed pt-2">
                We envision thriving communities shaped by courageous female leaders who foster economic prosperity, social harmony, and enduring spiritual hope across generations.
              </p>
            </div>

            {/* Our Mission */}
            <div className="lg:pl-12 space-y-4 border-t border-[#E8DDF0] lg:border-t-0 pt-12 lg:pt-0">
              <span className="text-[10px] font-semibold tracking-[0.3em] text-[#6E3A82] uppercase">
                OUR MISSION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#3B214F] leading-tight">
                To empower, educate, and elevate girls and women into positions of strength, leadership, and independence.
              </h2>
              <p className="text-sm text-[#716A73] leading-relaxed pt-2">
                We achieve this through structured educational grants, vocational mentorship, ethical leadership development, and faith-anchored community outreach designed for multi-generational impact.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Our Core Values */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#6E3A82]">
              FOUNDATION PILLARS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#3B214F] mt-2">
              Our Core Values
            </h2>
          </div>
          <p className="text-sm text-[#716A73] max-w-md mt-2 sm:mt-0">
            The unyielding principles that guide our institutional standards, program delivery, and governance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_VALUES.map((val, idx) => {
            const IconComp = val.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DDF0] shadow-md shadow-[#6E3A82]/5 hover:shadow-xl hover:border-[#6E3A82]/30 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#F4ECF7] border border-[#E8DDF0] flex items-center justify-center text-[#6E3A82] mb-6 group-hover:bg-[#6E3A82] group-hover:text-white transition-all duration-300">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#3B214F] mb-3 group-hover:text-[#6E3A82] transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#716A73] leading-relaxed">
                    {val.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F4ECF7] flex items-center justify-between text-[11px] font-semibold text-[#A088B0]">
                  <span>Pillar 0{idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6E3A82]" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Our Approach – Empowerment & Impact Methodology */}
      <section className="py-20 bg-[#F7F3F8] border-y border-[#E8DDF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <SectionHeader
            eyebrow="STRATEGIC METHODOLOGY"
            title="Our Approach: How We Support & Empower"
            description="Our integrated model equips women and girls at every stage of growth—from youth education to executive leadership."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {APPROACH_PILLARS.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={pillar.number}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DDF0] shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#F4ECF7] text-[#6E3A82] flex items-center justify-center font-bold text-sm">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="font-serif text-2xl font-bold text-[#E8DDF0]">
                        {pillar.number}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#3B214F]">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#716A73] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. Clearly Communicate Christian Identity */}
      <section className="py-20 lg:py-28 bg-[#3B214F] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6E3A82]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#D8B4E2] text-[11px] font-semibold tracking-wider uppercase">
                <BookMarked className="w-3.5 h-3.5" />
                <span>CHRISTIAN FOUNDATION & FAITH IDENTITY</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Anchored in Faith. Guided by Biblical Purpose.
              </h2>

              <p className="text-base text-[#E8DDF0]/80 leading-relaxed">
                Devorah Women Foundation is explicitly rooted in timeless Christian principles. Our name is drawn from the Biblical narrative of <strong className="text-white">Deborah (Judges 4–5)</strong>—a prophetess, leader, and judge who exemplified wisdom, courageous intercession, and unyielding faith in God.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md space-y-1">
                  <h4 className="text-xs font-bold text-[#C5A8D8] uppercase">Biblical Integrity</h4>
                  <p className="text-xs text-[#E8DDF0]/70">
                    Operating with complete financial transparency, truth, and grace across all initiatives.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md space-y-1">
                  <h4 className="text-xs font-bold text-[#C5A8D8] uppercase">Spiritual Renewal</h4>
                  <p className="text-xs text-[#E8DDF0]/70">
                    Integrating prayer circles, devotional growth, and spiritual mentorship for lasting strength.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-[#291439] group">
                <Image
                  src="/images/founder_portrait.png"
                  alt="Faith & Spiritual Development"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B214F] via-transparent to-transparent p-6 flex items-end">
                  <p className="font-serif text-lg italic text-[#FAF8F5]">
                    "She arises as a mother and leader in her community, walking in wisdom and strength."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Leadership & Governance */}
      {founder && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeader
            eyebrow="LEADERSHIP & GOVERNANCE"
            title="Guided by visionary leaders & faithful stewards."
            centered
          />

          {/* Founder Spotlight */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white p-8 sm:p-12 rounded-3xl border border-[#E8DDF0] shadow-lg">
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md bg-[#3B214F]">
                <Image
                  src={founder.imageUrl}
                  alt={founder.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-semibold tracking-widest text-[#6E3A82] uppercase bg-[#E8DDF0] px-3 py-1 rounded-full">
                FOUNDER & EXECUTIVE DIRECTOR
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#3B214F]">
                {founder.name}
              </h3>
              <p className="text-sm font-semibold text-[#6E3A82]">{founder.title}</p>
              <p className="text-sm text-[#716A73] leading-relaxed">{founder.biography}</p>
              <p className="text-xs italic text-[#6E3A82] pt-2">"{founder.vision}"</p>
            </div>
          </div>

          {/* Team Leads */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#3B214F] mb-8 text-center">
              Executive Team Leads
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamLeads.map((person) => (
                <div key={person.id} className="p-6 rounded-2xl bg-white border border-[#E8DDF0] shadow-sm space-y-4">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#3B214F]">
                    <Image src={person.imageUrl} alt={person.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold text-[#3B214F]">{person.name}</h4>
                    <p className="text-xs font-semibold text-[#6E3A82]">{person.title}</p>
                    <p className="text-xs text-[#716A73] mt-2 leading-relaxed">{person.biography}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. Final Call to Action */}
      <CTASection />
    </div>
  );
}
