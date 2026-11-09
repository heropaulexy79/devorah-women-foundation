'use client';

import React, { useState } from 'react';
import { Play, X, Award, Sparkles } from 'lucide-react';

interface VideoBeneficiaryModalProps {
  title?: string;
  subtitle?: string;
  vimeoId?: string;
}

export default function VideoBeneficiaryCard({
  title = "Grant Beneficiary Spotlight",
  subtitle = "Watch how the Devorah Women Foundation grant empowered this recipient to build, thrive, and transform her livelihood.",
  vimeoId = "1244967658",
}: VideoBeneficiaryModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Vimeo player embed with responsive support, autoplay when modal opens, and clean UI
  const vimeoEmbedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`;

  return (
    <>
      {/* Video Feature Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#3B214F] via-[#2A1638] to-[#512863] text-white p-6 sm:p-8 shadow-xl border border-[#BCA1CD]/30 group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#642B80]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCFCF7]/10 backdrop-blur-md border border-[#BCA1CD]/30 text-[#BCA1CD] text-[10px] font-bold uppercase tracking-widest">
              <Award className="w-3.5 h-3.5 text-[#BCA1CD]" />
              <span>{title}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#FCFCF7] leading-snug">
              Transforming Lives Through Direct Enterprise Grants
            </h3>
            <p className="text-xs sm:text-sm text-[#E8DDF0]/80 leading-relaxed font-light">
              {subtitle}
            </p>
          </div>

          <div className="shrink-0 flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#FCFCF7] hover:bg-[#BCA1CD] text-[#3B214F] font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group/btn cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#642B80] text-white flex items-center justify-center shadow-md group-hover/btn:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-white ml-0.5" />
              </div>
              <span>Watch Video Story</span>
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal Player */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-4xl bg-[#2A1638] rounded-2xl overflow-hidden border border-[#BCA1CD]/30 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#BCA1CD]/20 bg-[#3B214F]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#BCA1CD]" />
                <span className="text-xs font-bold text-[#FCFCF7] uppercase tracking-wider">
                  Beneficiary Video Testimonial
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Vimeo Video Iframe Embed */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              <iframe
                src={vimeoEmbedUrl}
                title="Devorah Women Foundation Beneficiary Video Testimonial"
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                allowFullScreen
              />
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#2A1638] text-center border-t border-[#BCA1CD]/10">
              <p className="text-xs text-[#E8DDF0]/70 font-light">
                Devorah Women Foundation &middot; Community Impact &amp; Grant Beneficiary Testimony
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
