'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Heart, Compass } from 'lucide-react';

const VALUES = [
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

export default function MissionVision() {
  return (
    <section className="py-24 lg:py-32 bg-[#F7F3F8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section eyebrow */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#6E3A82] mb-16">
          FOUNDATION PILLARS
        </p>

        {/* Mission & Vision — editorial open layout, no card containers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:divide-x lg:divide-[#E8DDF0] mb-20">

          {/* Mission */}
          <motion.div
            className="pb-12 lg:pb-0 lg:pr-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="text-[10px] font-semibold tracking-[0.3em] text-[#6E3A82] uppercase">
              OUR MISSION
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#3B214F] mt-4 mb-6 leading-[1.25]">
              To empower, educate, and elevate girls and women into positions of strength,
              leadership, and independence.
            </h2>
            <p className="text-sm text-[#716A73] leading-relaxed">
              We achieve this through structured educational grants, vocational mentorship,
              ethical leadership development, and faith-anchored community outreach designed
              for multi-generational transformation.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            className="pt-12 lg:pt-0 lg:pl-16 border-t border-[#E8DDF0] lg:border-t-0"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <span className="text-[10px] font-semibold tracking-[0.3em] text-[#6E3A82] uppercase">
              OUR VISION
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#3B214F] mt-4 mb-6 leading-[1.25]">
              A world where every girl and woman walks in her full God-given potential,
              free from systemic limitations.
            </h2>
            <p className="text-sm text-[#716A73] leading-relaxed">
              We envision thriving communities shaped by courageous female leaders who foster
              economic prosperity, social harmony, and enduring spiritual hope across generations.
            </p>
          </motion.div>
        </div>

        {/* Values — Glassmorphic Elevated Cards */}
        <div className="border-t border-[#E8DDF0]/80 pt-16 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#6E3A82]">
                CORE PRINCIPLES
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B214F] mt-2">
                Our Guiding Values
              </h3>
            </div>
            <p className="text-sm text-[#716A73] max-w-md mt-2 sm:mt-0">
              The foundational pillars that guide every grant, mentorship program, and outreach initiative we undertake.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {VALUES.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/80 shadow-md shadow-[#6E3A82]/5 hover:shadow-2xl hover:shadow-[#6E3A82]/15 hover:border-[#6E3A82]/30 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle top glow highlight */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#6E3A82]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Decorative background gradient element */}
                  <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-br from-[#6E3A82]/5 to-[#8E44AD]/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                  <div>
                    {/* Icon container with hover animation */}
                    <div className="w-12 h-12 rounded-xl bg-[#F4ECF7] border border-[#E8DDF0] flex items-center justify-center text-[#6E3A82] mb-6 group-hover:bg-[#6E3A82] group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                      <IconComp className="w-6 h-6 transition-transform duration-300" aria-hidden="true" />
                    </div>

                    <h4 className="font-serif text-lg font-semibold text-[#3B214F] mb-3 group-hover:text-[#6E3A82] transition-colors duration-200">
                      {val.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#655E67] leading-relaxed">
                      {val.description}
                    </p>
                  </div>

                  {/* Card footer indicator */}
                  <div className="mt-6 pt-4 border-t border-[#F0E6F4] flex items-center justify-between text-[11px] font-medium text-[#A088B0] group-hover:text-[#6E3A82] transition-colors duration-200">
                    <span>Pillar 0{idx + 1}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6E3A82]/30 group-hover:bg-[#6E3A82] transition-all duration-300 group-hover:scale-125" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
