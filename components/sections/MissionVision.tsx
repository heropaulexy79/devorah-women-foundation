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

        {/* Mission & Vision — editorial open layout */}
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
            <p className="text-sm sm:text-base text-[#524C55] leading-relaxed">
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
            <p className="text-sm sm:text-base text-[#524C55] leading-relaxed">
              We envision thriving communities shaped by courageous female leaders who foster
              economic prosperity, social harmony, and enduring spiritual hope across generations.
            </p>
          </motion.div>
        </div>

        {/* Values — Bespoke Architectural Cards */}
        <div className="border-t border-[#E8DDF0] pt-16 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#6E3A82]">
                CORE PRINCIPLES
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B214F] mt-2">
                Our Guiding Values
              </h3>
            </div>
            <p className="text-sm text-[#524C55] max-w-md">
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
                  className="group bg-white rounded-sm p-7 sm:p-8 border border-[#E8DDF0] shadow-sm hover:shadow-xl hover:border-[#6E3A82]/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-sm bg-[#F4ECF7] border border-[#E8DDF0] flex items-center justify-center text-[#6E3A82] mb-6 group-hover:bg-[#6E3A82] group-hover:text-white transition-all duration-300">
                      <IconComp className="w-5 h-5" aria-hidden="true" />
                    </div>

                    <h4 className="font-serif text-xl font-semibold text-[#3B214F] mb-3 group-hover:text-[#6E3A82] transition-colors duration-200">
                      {val.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#524C55] leading-relaxed">
                      {val.description}
                    </p>
                  </div>

                  {/* Card footer indicator */}
                  <div className="mt-8 pt-4 border-t border-[#F4ECF7] flex items-center justify-between text-[11px] font-semibold tracking-wider text-[#A987C2] group-hover:text-[#6E3A82] transition-colors duration-200">
                    <span>PILLAR 0{idx + 1}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6E3A82]/30 group-hover:bg-[#6E3A82] transition-all duration-300" />
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

