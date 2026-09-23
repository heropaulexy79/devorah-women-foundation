'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FEATURED_STORY } from '@/lib/data';

export default function FeaturedStory() {
  return (
    <section className="py-24 lg:py-32 bg-[#3B214F] text-white relative overflow-hidden">
      {/* Ambient light — very subtle */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6E3A82]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#A987C2]/08 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Eyebrow */}
        <div className="mb-16 lg:mb-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A987C2] mb-4">
            HER STORY
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-2xl leading-[1.15]">
            {FEATURED_STORY.headline}
          </h2>
        </div>

        {/* Story Layout — open, no card container */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          {/* Portrait — editorial, no border */}
          <div className="lg:col-span-4 relative">
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
              <Image
                src={FEATURED_STORY.imageUrl}
                alt={FEATURED_STORY.authorName}
                fill
                className="object-cover"
              />
              {/* Subtle gradient at bottom to blend with section */}
              <div className="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-[#3B214F]/50 to-transparent" />
            </div>
          </div>

          {/* Story Narrative */}
          <div className="lg:col-span-8 space-y-8">
            {/* Large decorative typographic quote mark */}
            <span
              className="font-serif text-8xl text-[#A987C2]/25 leading-none select-none block -mb-4"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light italic leading-[1.4] text-[#FAF8F5]">
              {FEATURED_STORY.quote.replace(/^"|"$/g, '')}
            </p>

            <div className="pt-6 border-t border-[#A987C2]/20">
              <h4 className="font-serif text-xl font-semibold text-white">
                {FEATURED_STORY.authorName}
              </h4>
              <p className="text-xs text-[#A987C2] mt-1.5 tracking-wide">
                {FEATURED_STORY.program} &middot; {FEATURED_STORY.location}
              </p>

              <div className="mt-7">
                <Link
                  href="/stories"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#A987C2] hover:text-white transition-colors tracking-wide group"
                >
                  <span>Read Her Story</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
