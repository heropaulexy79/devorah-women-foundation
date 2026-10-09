'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Heart, Compass, BookOpen, Award } from 'lucide-react';

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
    <section className="py-24 lg:py-32 bg-[#F7F3F8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section eyebrow */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#6E3A82] mb-12">
          FOUNDATION GOAL, VISION & MISSION
        </p>

        {/* Goal Banner */}
        <motion.div
          className="bg-white rounded-2xl p-8 sm:p-10 border border-[#E8DDF0] shadow-sm mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="text-[10px] font-semibold tracking-[0.3em] text-[#6E3A82] uppercase block mb-2">
            OUR OVERARCHING GOAL
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#3B214F] font-bold leading-relaxed">
            "To raise spiritually grounded and empowered women who are equipped for impactful leadership while driving sustainable transformation in communities through mentorship, service, and strategic outreach."
          </h2>
        </motion.div>

        {/* Mission & Vision — editorial open layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:divide-x lg:divide-[#E8DDF0] mb-20">

          {/* Vision */}
          <motion.div
            className="pb-12 lg:pb-0 lg:pr-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="text-[10px] font-semibold tracking-[0.3em] text-[#6E3A82] uppercase">
              OUR VISION
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B214F] mt-4 mb-4 leading-[1.3]">
              To raise a generation of empowered women who are spiritually grounded, purpose-driven, and globally influential, impacting lives and every sector of society.
            </h2>
          </motion.div>

          {/* Mission */}
          <motion.div
            className="pt-12 lg:pt-0 lg:pl-16 border-t border-[#E8DDF0] lg:border-t-0"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <span className="text-[10px] font-semibold tracking-[0.3em] text-[#6E3A82] uppercase">
              OUR MISSION
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B214F] mt-4 mb-4 leading-[1.3]">
              To equip and empower women to thrive spiritually, socially, and economically, enabling them to lead with impact through leadership development, mentorship, and service.
            </h2>
            <p className="text-sm text-[#524C55] leading-relaxed">
              We are committed to transforming vulnerable communities by advancing healthcare, education, and food security through purposeful outreach initiatives.
            </p>
          </motion.div>
        </div>

        {/* Values — Bespoke Architectural Cards */}
        <div className="border-t border-[#E8DDF0] pt-16 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#6E3A82]">
                CORE VALUES
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B214F] mt-2">
                Wisdom • Integrity • Service • Courage • Excellence • Compassion
              </h3>
            </div>
            <p className="text-sm text-[#524C55] max-w-md">
              The core values shaping every program, outreach, and community initiative led by Devorah Global Women.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {VALUES.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group bg-white rounded-2xl p-7 sm:p-8 border border-[#E8DDF0] shadow-sm hover:shadow-xl hover:border-[#6E3A82]/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#F4ECF7] border border-[#E8DDF0] flex items-center justify-center text-[#6E3A82] mb-6 group-hover:bg-[#6E3A82] group-hover:text-white transition-all duration-300">
                      <IconComp className="w-5 h-5" aria-hidden="true" />
                    </div>

                    <h4 className="font-serif text-xl font-bold text-[#3B214F] mb-3 group-hover:text-[#6E3A82] transition-colors duration-200">
                      {val.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#524C55] leading-relaxed">
                      {val.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#F4ECF7] flex items-center justify-between text-[11px] font-semibold tracking-wider text-[#A987C2] group-hover:text-[#6E3A82] transition-colors duration-200">
                    <span>CORE VALUE 0{idx + 1}</span>
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

