'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
  backgroundImage?: string;
}

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  backgroundImage,
}: PageHeroProps) {
  return (
    <section className="relative w-full min-h-[50vh] lg:min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[#1a0f22] -mt-20">
      
      {/* Background Image & Classy Editorial Overlays */}
      {backgroundImage ? (
        <>
          <div className="absolute inset-0 w-full h-full">
            <img
              src={backgroundImage}
              alt=""
              className="w-full h-full object-cover object-center"
            />
            {/* Darker overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d0714]/85 via-[#0d0714]/60 to-[#0d0714]/85" />
            <div className="absolute inset-0 bg-[#3B214F]/40 mix-blend-multiply" />
          </div>
        </>
      ) : (
        <>
          {/* Fallback classy solid background with mesh and glow */}
          <div className="absolute inset-0 bg-[#1a0f22]" />
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#6E3A82]/25 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 left-1/4 w-[400px] h-[400px] bg-[#A987C2]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Optional Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-2 text-xs text-[#E8DDF0]/60 mb-6 font-medium tracking-wide"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                <ChevronRight className="w-3.5 h-3.5 text-[#E8DDF0]/40" />
                {item.href ? (
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[#C5A8D8] font-semibold">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </motion.nav>
        )}

        {/* Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#D8B4E2] text-[11px] font-semibold uppercase tracking-[0.25em] shadow-inner backdrop-blur-md mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A8D8]" />
          <span>{eyebrow}</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-white max-w-4xl mx-auto leading-[1.15] tracking-tight mb-6"
        >
          {title}
        </motion.h1>

        {/* Subtitle / Description */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-[#E8DDF0]/80 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            {description}
          </motion.p>
        )}

      </div>
    </section>
  );
}
