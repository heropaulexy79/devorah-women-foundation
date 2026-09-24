'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { RESOURCES } from '@/lib/data';
import { Download, BookOpen, ArrowRight } from 'lucide-react';

export default function FeaturedResource() {
  const resource = RESOURCES[0]; // Primary featured resource

  return (
    <section className="py-24 lg:py-32 bg-[#F7F3F8] relative overflow-hidden">
      {/* Decorative ambient background accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#6E3A82]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl border border-[#E8DDF0] p-8 sm:p-12 lg:p-16 shadow-xl shadow-[#6E3A82]/5 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Narrative Column */}
            <motion.div
              className="lg:col-span-7 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4ECF7] border border-[#E8DDF0] text-[#6E3A82] text-[11px] font-semibold tracking-wider uppercase">
                <BookOpen className="w-3.5 h-3.5" />
                <span>FEATURED RESOURCE</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B214F] leading-[1.2]">
                {resource.title}
              </h2>

              <p className="text-sm sm:text-base text-[#716A73] leading-relaxed">
                {resource.shortDescription} Published by the {resource.author}, this publication delivers key insights, framework analyses, and actionable strategies for building resilient female leadership.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 bg-[#6E3A82] hover:bg-[#3B214F] text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md shadow-[#6E3A82]/20 hover:shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Publication</span>
                </Link>

                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 text-[#6E3A82] hover:text-[#3B214F] font-semibold text-sm px-5 py-3.5 rounded-xl border border-[#E8DDF0] hover:border-[#6E3A82]/30 transition-all duration-300 bg-[#FAF8F5]/50"
                >
                  <span>Explore Resource Center</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Right Resource Visual Preview */}
            <motion.div
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="relative mx-auto max-w-sm rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] bg-[#3B214F] group">
                <Image
                  src={resource.coverImageUrl}
                  alt={resource.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                
                {/* Journal cover overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B214F] via-[#3B214F]/40 to-transparent p-6 flex flex-col justify-between text-white">
                  <span className="text-[10px] uppercase font-semibold tracking-widest text-[#C5A8D8]">
                    DEVORAH FOUNDATION &middot; JOURNAL
                  </span>
                  
                  <div>
                    <span className="text-xs uppercase font-medium text-[#E8DDF0]/80 tracking-wider">
                      OFFICIAL PUBLICATION
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white mt-1">
                      {resource.title}
                    </h4>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
