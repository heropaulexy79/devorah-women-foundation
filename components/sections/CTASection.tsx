'use client';

import React from 'react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-[#3B214F] text-white relative overflow-hidden">
      {/* Subtle radial warmth — not decorative pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(110,58,130,0.25),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">

          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#A987C2]">
            JOIN THE WORK
          </p>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            Every woman who rises,<br className="hidden sm:block" />
            <span className="italic font-normal text-[#C5A8D8]"> lifts others with her.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#E8DDF0]/70 max-w-xl mx-auto leading-relaxed">
            Whether you represent an international institution, a corporate foundation, a local
            church, or an inspired individual — your partnership accelerates sustainable change.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/partnerships"
              className="inline-flex items-center bg-white hover:bg-[#FAF8F5] text-[#3B214F] px-8 py-3.5 rounded-sm text-sm font-semibold tracking-wide transition-all duration-300"
            >
              Partner With Us
            </Link>

            <Link
              href="/get-involved"
              className="inline-flex items-center text-[#E8DDF0]/80 hover:text-white text-sm font-medium tracking-wide border-b border-[#E8DDF0]/30 hover:border-[#E8DDF0]/70 pb-0.5 transition-all duration-300"
            >
              Support Our Work
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
