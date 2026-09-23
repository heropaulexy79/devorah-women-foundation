'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Program } from '@/lib/types';

interface ProgramCardProps {
  program: Program;
  featured?: boolean;
}

export default function ProgramCard({ program, featured = false }: ProgramCardProps) {
  if (featured) {
    return (
      <Link
        href={`/programs/${program.slug}`}
        className="group block relative overflow-hidden rounded-sm bg-[#1a0f22] focus:outline-none"
        aria-label={`${program.name} — ${program.tagline}`}
      >
        {/* Large featured image */}
        <div className="relative aspect-[21/9] overflow-hidden">
          <Image
            src={program.imageUrl}
            alt={program.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f22]/90 via-[#1a0f22]/30 to-transparent" />
        </div>

        {/* Content — overlaid bottom-left */}
        <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C5A8D8] block mb-3">
            {program.category}
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-2xl group-hover:text-[#E8DDF0] transition-colors duration-300">
            {program.name}
          </h3>
          <p className="text-sm text-white/60 font-light italic mt-2 max-w-xl">
            {program.tagline}
          </p>
          <div className="mt-5 flex items-center gap-2 text-[#A987C2] text-sm font-medium">
            <span>Explore Program</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/programs/${program.slug}`}
      className="group block overflow-hidden bg-white rounded-sm focus:outline-none"
      aria-label={`${program.name} — ${program.tagline}`}
    >
      {/* Program Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1a0f22]">
        <Image
          src={program.imageUrl}
          alt={program.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f22]/60 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-2.5 border border-t-0 border-[#E8DDF0]/70">
        <h3 className="font-serif text-lg font-medium text-[#3B214F] group-hover:text-[#6E3A82] transition-colors leading-snug">
          {program.name}
        </h3>

        <p className="text-xs text-[#716A73] line-clamp-2 leading-relaxed">
          {program.tagline}
        </p>

        <div className="pt-3 flex items-center gap-1.5 text-xs font-medium text-[#6E3A82]">
          <span>View Program</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}
