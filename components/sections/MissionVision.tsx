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

        {/* Values — horizontal list with dividers, no cards */}
        <div className="border-t border-[#E8DDF0] pt-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#6E3A82] mb-10">
            OUR GUIDING VALUES
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 lg:divide-x lg:divide-[#E8DDF0]">
            {VALUES.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div
                  key={idx}
                  className={`py-4 ${idx > 0 ? 'border-t sm:border-t-0 border-[#E8DDF0]' : ''} lg:border-t-0 lg:px-8 first:lg:pl-0 last:lg:pr-0`}
                >
                  <IconComp className="w-4 h-4 text-[#6E3A82] mb-4" aria-hidden="true" />
                  <h5 className="font-serif text-base font-semibold text-[#3B214F] mb-2">
                    {val.title}
                  </h5>
                  <p className="text-xs text-[#716A73] leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
