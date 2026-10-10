'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';

export default function WhoWeAre() {
  return (
    <section className="py-24 lg:py-32 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left Narrative Column */}
          <motion.div
            className="lg:col-span-6 space-y-7"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeader
              eyebrow="OVERVIEW OF DEVORAH GLOBAL WOMEN"
              title="Raising Women of Wisdom, Courage, and Global Impact."
            />

            <p className="text-base sm:text-lg text-[#3B3340] leading-relaxed">
              Devorah Global Women is a faith-driven nonprofit organization committed to raising spiritually grounded, purpose-driven, and socially impactful women. Rooted in Christian values, we believe that when women are equipped with knowledge, wisdom, courage, and character, they become catalysts for transformation in their communities, nations, and across the globe.
            </p>

            <p className="text-sm text-[#524C55] leading-relaxed font-normal">
              Our work aligns with the United Nations Sustainable Development Goals (SDGs 3 & 4) by promoting good health and well-being, as well as quality education. Through leadership training, mentorship programs, community outreach initiatives, podcasts, and educational campaigns, Devorah Global Women provides practical support while inspiring women to lead lives of faith, excellence, and service.
            </p>

            <ul className="space-y-3 pt-1">
              {[
                'Spiritually Grounded & Faith-Driven Approach',
                'Leadership Training & Mentorship Programs',
                'UN Sustainable Development Goals Alignment (SDGs 3 & 4)',
                'Community Outreach, Health & Educational Campaigns',
              ].map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-0 text-sm text-[#242024] border-l-2 border-[#A987C2] pl-4"
                >
                  <span className="font-medium leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-[#6E3A82] font-semibold text-sm hover:text-[#3B214F] transition-colors tracking-wide group focus-visible:ring-2 focus-visible:ring-[#6E3A82] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF8F5] focus-visible:outline-none rounded-sm"
              >
                <span>Discover Our Story</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Photographic Column */}
          <motion.div
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              {/* Primary Large Image — no white frame, photography as editorial object */}
              <div className="relative rounded-sm overflow-hidden aspect-[4/3] max-w-lg mx-auto lg:max-w-none">
                <Image
                  src="/images/who_we_are.png"
                  alt="Devorah Foundation community gathering — women and girls coming together"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Secondary overlapping portrait — editorial composition */}
              <div className="absolute -bottom-10 -left-6 w-40 sm:w-48 aspect-square rounded-sm overflow-hidden shadow-xl border-2 border-[#FAF8F5] hidden sm:block">
                <Image
                  src="/images/story_beneficiary.png"
                  alt="Young woman empowered through Devorah Foundation programs"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Subtle lilac accent square — geometric, not decorative text */}
              <div className="absolute -top-5 -right-5 w-24 h-24 bg-[#E8DDF0] rounded-sm hidden lg:block opacity-60" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
