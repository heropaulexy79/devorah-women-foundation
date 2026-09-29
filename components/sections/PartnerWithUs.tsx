'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { Building2, Globe2, GraduationCap, HeartHandshake, ArrowRight } from 'lucide-react';

const PARTNER_PILLARS = [
  {
    icon: Building2,
    title: 'Corporate Partnerships',
    description: 'Collaborate through CSR initiatives, employee mentorship, and co-sponsored grants.',
  },
  {
    icon: Globe2,
    title: 'International Foundations',
    description: 'Scale high-impact programs and institutional research across regional communities.',
  },
  {
    icon: GraduationCap,
    title: 'Educational Institutions',
    description: 'Expand scholarship pathways, academic mentorship, and student leadership exchanges.',
  },
  {
    icon: HeartHandshake,
    title: 'Community Networks',
    description: 'Drive grassroots mobilization and faith-based community outreach initiatives.',
  },
];

export default function PartnerWithUs() {
  return (
    <section className="py-24 lg:py-32 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="max-w-3xl mb-16">
          <SectionHeader
            eyebrow="PARTNER WITH US"
            title="Multiplying impact through strategic collaboration."
            description="We invite corporate leaders, global foundations, academic institutions, and donors to join us in establishing lasting transformation."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {PARTNER_PILLARS.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-sm p-7 sm:p-8 border border-[#E8DDF0] shadow-sm hover:shadow-xl hover:border-[#6E3A82]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-sm bg-[#F4ECF7] border border-[#E8DDF0] flex items-center justify-center text-[#6E3A82] mb-6 group-hover:bg-[#6E3A82] group-hover:text-white transition-all duration-300">
                    <IconComp className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-[#3B214F] mb-3 group-hover:text-[#6E3A82] transition-colors duration-200">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#524C55] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#F4ECF7] text-xs font-semibold text-[#6E3A82] flex items-center justify-between">
                  <span>Explore Pathway</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action banner */}
        <div className="bg-[#3B214F] rounded-sm p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-[#6E3A82]/40">
          <div>
            <h4 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
              Ready to explore a partnership opportunity?
            </h4>
            <p className="text-sm text-[#E8DDF0]/80 mt-2 max-w-xl leading-relaxed">
              Connect with our leadership team to discuss custom sponsorship, program integration, or institutional support.
            </p>
          </div>

          <Link
            href="/partnerships"
            className="inline-flex items-center gap-2 bg-white hover:bg-[#FAF8F5] text-[#3B214F] px-8 py-3.5 rounded-sm font-semibold text-sm transition-all duration-300 shrink-0 shadow-sm"
          >
            <span>Initiate Partnership</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}

