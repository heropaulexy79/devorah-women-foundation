'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Heart, Compass, BookOpen, Award, Sparkles, Quote, Globe, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const VALUES = [
  {
    icon: BookOpen,
    title: 'Wisdom',
    description: 'Equipping women with sound judgment, biblical insight, and deep understanding to lead purposefully.',
  },
  {
    icon: Compass,
    title: 'Integrity',
    description: 'Upholding unwavering moral clarity, truth, and transparency rooted in Christian values.',
  },
  {
    icon: Heart,
    title: 'Service',
    description: 'Dedicated to servant leadership and uplifting vulnerable communities through action.',
  },
  {
    icon: ShieldCheck,
    title: 'Courage',
    description: 'Boldly stepping into leadership and standing firm to drive sustainable community transformation.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Striving for world-class quality and distinction in every educational and outreach initiative.',
  },
  {
    icon: Target,
    title: 'Compassion',
    description: 'Serving with empathy, care, and practical support for healthcare, education, and food security.',
  },
];

export default function MissionVision() {
  return (
    <section className="py-24 lg:py-32 bg-[#FAF8F5] relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E8DDF0]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#6E3A82]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 1. Main Heading Section (Prominent Header) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8DDF0] text-[#6E3A82] text-[11px] font-bold tracking-[0.2em] uppercase mb-4 border border-[#C5A8D8]/50 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#6E3A82]" />
            GUIDING INSTITUTIONAL PILLARS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B214F] tracking-tight leading-tight">
            Foundation Goal, Vision & Mission
          </h2>
          <p className="text-sm sm:text-base text-[#716A73] mt-4 font-light max-w-2xl mx-auto leading-relaxed">
            The core strategic compass guiding our faith-driven leadership development, community outreach, and global empowerment initiatives.
          </p>
        </div>

        {/* 2. Hero Overarching Goal Banner */}
        <motion.div
          className="relative bg-gradient-to-br from-[#3B214F] via-[#2A1638] to-[#512863] text-white rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl overflow-hidden mb-12 border border-[#6E3A82]/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Subtle Background Glow & Pattern */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#A987C2]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#6E3A82]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-12 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#D8B4E2]">
                  <Quote className="w-5 h-5 fill-current" />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5A8D8]">
                  Our Overarching Goal
                </span>
              </div>

              <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-medium leading-relaxed tracking-wide pt-2">
                "To raise spiritually grounded and empowered women who are equipped for impactful leadership while driving sustainable transformation in communities through mentorship, service, and strategic outreach."
              </blockquote>

              <div className="pt-4 flex flex-wrap items-center gap-3 text-xs text-[#E8DDF0]/70 font-light">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15">Mentorship</span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15">Servant Leadership</span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15">Strategic Outreach</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. Vision & Mission Side-by-Side Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">

          {/* Vision Card */}
          <motion.div
            className="group bg-white rounded-3xl p-8 sm:p-10 border border-[#E8DDF0] shadow-lg hover:shadow-2xl hover:border-[#6E3A82]/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Top Accent Gradient */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#6E3A82] to-[#A987C2]" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#F7F3F8] border border-[#E8DDF0] flex items-center justify-center text-[#6E3A82] group-hover:bg-[#6E3A82] group-hover:text-white transition-all duration-300 shadow-sm">
                  <Compass className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#6E3A82] bg-[#F7F3F8] px-3.5 py-1.5 rounded-full border border-[#E8DDF0]">
                  Our Vision
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B214F] leading-snug">
                  To raise a generation of empowered women who are spiritually grounded, purpose-driven, and globally influential.
                </h3>
                <p className="text-sm text-[#716A73] mt-4 leading-relaxed font-light">
                  Impacting lives and every sector of society by equipping women to step confidently into spaces of leadership and governance.
                </p>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-[#F7F3F8] flex items-center justify-between text-xs text-[#6E3A82] font-semibold">
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4" /> Global & Multi-Sector Impact
              </span>
              <span className="w-2 h-2 rounded-full bg-[#6E3A82]" />
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            className="group bg-white rounded-3xl p-8 sm:p-10 border border-[#E8DDF0] shadow-lg hover:shadow-2xl hover:border-[#6E3A82]/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Top Accent Gradient */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#A987C2] to-[#3B214F]" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#F7F3F8] border border-[#E8DDF0] flex items-center justify-center text-[#6E3A82] group-hover:bg-[#6E3A82] group-hover:text-white transition-all duration-300 shadow-sm">
                  <Target className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#6E3A82] bg-[#F7F3F8] px-3.5 py-1.5 rounded-full border border-[#E8DDF0]">
                  Our Mission
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B214F] leading-snug">
                  To equip and empower women to thrive spiritually, socially, and economically.
                </h3>
                <p className="text-sm text-[#716A73] mt-4 leading-relaxed font-light">
                  Enabling women to lead with impact through leadership development, mentorship, and service. We are committed to transforming vulnerable communities by advancing healthcare, education, and food security through purposeful outreach initiatives.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-8 border-t border-[#F7F3F8] flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold text-[#6E3A82] uppercase bg-[#E8DDF0] px-2.5 py-1 rounded-md">Healthcare</span>
              <span className="text-[10px] font-bold text-[#6E3A82] uppercase bg-[#E8DDF0] px-2.5 py-1 rounded-md">Quality Education</span>
              <span className="text-[10px] font-bold text-[#6E3A82] uppercase bg-[#E8DDF0] px-2.5 py-1 rounded-md">Food Security</span>
            </div>
          </motion.div>

        </div>

        {/* 4. Core Values Carousel (3 Boxes Visible, Slider Controls) */}
        <div className="border-t border-[#E8DDF0] pt-16 mt-4">
          <CoreValuesCarousel />
        </div>

      </div>
    </section>
  );
}

function CoreValuesCarousel() {
  const [activePageIndex, setActivePageIndex] = React.useState(0);

  // 6 values divided into 2 slides of 3 cards each (or responsive sliding)
  const itemsPerPage = 3;
  const totalPages = Math.ceil(VALUES.length / itemsPerPage);

  const handleNext = () => {
    setActivePageIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setActivePageIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentValues = VALUES.slice(
    activePageIndex * itemsPerPage,
    (activePageIndex + 1) * itemsPerPage
  );

  return (
    <div className="space-y-8">
      {/* Header & Slider Navigation */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-3xl space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#6E3A82] bg-[#E8DDF0] px-3 py-1 rounded-full border border-[#C5A8D8]/40 inline-block">
            CORE VALUES
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3B214F] leading-snug">
            The core values shaping every program, outreach, and community initiative led by Devorah Global Women.
          </h3>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handlePrev}
            className="w-11 h-11 rounded-full bg-white border border-[#E8DDF0] flex items-center justify-center text-[#3B214F] hover:bg-[#6E3A82] hover:text-white hover:border-[#6E3A82] transition-all shadow-sm"
            aria-label="Previous core values"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold text-[#6E3A82] px-2 font-mono">
            0{activePageIndex + 1} / 0{totalPages}
          </span>
          <button
            onClick={handleNext}
            className="w-11 h-11 rounded-full bg-white border border-[#E8DDF0] flex items-center justify-center text-[#3B214F] hover:bg-[#6E3A82] hover:text-white hover:border-[#6E3A82] transition-all shadow-sm"
            aria-label="Next core values"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3 Visible Cards Display with Motion Animation */}
      <div className="relative">
        <motion.div
          key={activePageIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {currentValues.map((val, idx) => {
            const actualIndex = activePageIndex * itemsPerPage + idx;
            const IconComp = val.icon;
            return (
              <div
                key={val.title}
                className="group bg-white rounded-3xl p-7 sm:p-8 border border-[#E8DDF0] shadow-md hover:shadow-2xl hover:border-[#6E3A82]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#F7F3F8] border border-[#E8DDF0] flex items-center justify-center text-[#6E3A82] group-hover:bg-[#6E3A82] group-hover:text-white transition-all duration-300 shadow-sm">
                    <IconComp className="w-6 h-6" aria-hidden="true" />
                  </div>

                  <h4 className="font-serif text-2xl font-bold text-[#3B214F] group-hover:text-[#6E3A82] transition-colors duration-200">
                    {val.title}
                  </h4>

                  <p className="text-sm text-[#716A73] leading-relaxed font-light">
                    {val.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#F7F3F8] flex items-center justify-between text-[11px] font-bold tracking-wider text-[#A987C2] group-hover:text-[#6E3A82] transition-colors duration-200">
                  <span>CORE VALUE 0{actualIndex + 1}</span>
                  <span className="w-2 h-2 rounded-full bg-[#6E3A82]/30 group-hover:bg-[#6E3A82] transition-all duration-300" />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Pagination Dot Indicators */}
      <div className="flex items-center justify-center gap-2 pt-2">
        {Array.from({ length: totalPages }).map((_, pageIdx) => (
          <button
            key={pageIdx}
            onClick={() => setActivePageIndex(pageIdx)}
            className={`transition-all duration-300 rounded-full ${
              activePageIndex === pageIdx
                ? 'w-8 h-2 bg-[#6E3A82]'
                : 'w-2 h-2 bg-[#E8DDF0] hover:bg-[#C5A8D8]'
            }`}
            aria-label={`Go to page ${pageIdx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

