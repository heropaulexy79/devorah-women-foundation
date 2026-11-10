'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';

export default function WhoWeAre() {
  return (
    <section className="py-24 lg:py-32 bg-[#FCFCF7] relative overflow-hidden">
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
              eyebrow="OVERVIEW OF DEVORAH WOMEN'S LEADERSHIP & EMPOWERMENT INITIATIVE"
              title="Raising Women of Wisdom, Courage, and Global Impact."
            />

            <p className="text-base sm:text-lg text-[#3B3340] leading-relaxed">
              Devorah Women's Leadership & Empowerment Initiative is a faith-driven nonprofit organization committed to raising spiritually grounded, purpose-driven, and socially impactful women. Rooted in Christian values, we believe that when women are equipped with knowledge, wisdom, courage, and character, they become catalysts for transformation in their communities, nations, and across the globe.
            </p>

            <p className="text-sm text-[#524C55] leading-relaxed font-normal">
              Our work aligns with the United Nations Sustainable Development Goals (SDGs 3, 4 & 5) by promoting good health and well-being, as well as quality education. Through leadership training, mentorship programs, community outreach initiatives, podcasts, and educational campaigns, Devorah Women's Leadership & Empowerment Initiative provides practical support while inspiring women to lead lives of faith, excellence, and service.
            </p>

            <ul className="space-y-3 pt-1">
              {[
                'Spiritually Grounded & Faith-Driven Approach',
                'Leadership Training & Mentorship Programs',
                'UN Sustainable Development Goals Alignment (SDGs 3, 4 & 5)',
                'Community Outreach, Health & Educational Campaigns',
              ].map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-0 text-sm text-[#242024] border-l-2 border-[#BCA1CD] pl-4"
                >
                  <span className="font-medium leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-[#642B80] font-semibold text-sm hover:text-[#3B214F] transition-colors tracking-wide group focus-visible:ring-2 focus-visible:ring-[#642B80] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFCF7] focus-visible:outline-none rounded-sm"
              >
                <span>Discover Our Story</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Video Column */}
          <motion.div
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              {/* Geometric brand glow accent */}
              <div className="absolute -top-5 -right-5 w-28 h-28 bg-[#BCA1CD]/30 rounded-2xl blur-xl hidden lg:block" />
              <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-[#642B80]/20 rounded-full blur-2xl pointer-events-none" />

              {/* Primary Responsive Vimeo Video Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#BCA1CD]/30 bg-black aspect-video max-w-lg mx-auto lg:max-w-none group">
                <iframe
                  src="https://player.vimeo.com/video/1245586089?h=496db21bbb&autoplay=1&muted=1&loop=1&autopause=0&title=0&byline=0&portrait=0&badge=0"
                  title="Devorah Women's Leadership & Empowerment Initiative - Who We Are"
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  allowFullScreen
                />
              </div>

              {/* Editorial Caption Tag */}
              <div className="mt-4 flex items-center justify-between text-xs text-[#716A73] px-1">
                <span className="font-semibold text-[#642B80] uppercase tracking-wider text-[11px]">
                  Featured Video Overview
                </span>
                <span className="font-light">
                  Devorah Women's Initiative
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
