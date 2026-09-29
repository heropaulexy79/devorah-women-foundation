'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_ITEMS } from '@/lib/data';
import { GalleryItem } from '@/lib/types';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Sparkles, Filter, Expand, Layers } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const CATEGORIES = ['All', 'Outreaches', 'Conferences', 'Scholarships', 'Faith & Renewal'] as const;

export default function MediaGallery({ limit }: { limit?: number }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [spotlightIndex, setSpotlightIndex] = useState<number>(0);

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems;
  const currentItem = activeItemIndex !== null ? displayedItems[activeItemIndex] : null;
  const spotlightItem = GALLERY_ITEMS[spotlightIndex] || GALLERY_ITEMS[0];

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeItemIndex === null) return;
      if (e.key === 'Escape') setActiveItemIndex(null);
      if (e.key === 'ArrowLeft') {
        setActiveItemIndex((prev) => (prev !== null ? (prev - 1 + displayedItems.length) % displayedItems.length : 0));
      }
      if (e.key === 'ArrowRight') {
        setActiveItemIndex((prev) => (prev !== null ? (prev + 1) % displayedItems.length : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItemIndex, displayedItems.length]);

  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeader
            eyebrow="MEDIA & FIELD ARCHIVE"
            title="Outreaches & Conferences"
            description="Explore authentic photojournalism from our regional community outreaches, leadership summits, youth STEM bootcamps, and spiritual renewal circles."
          />
        </div>

        {/* Feature Spotlight Showcase Banner (Top Featured Photo) */}
        {!limit && (
          <div className="mb-16 bg-[#1a0f22] rounded-sm overflow-hidden border border-[#6E3A82]/30 shadow-2xl relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[420px]">
              
              {/* Large Spotlight Image */}
              <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[440px] bg-black">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={spotlightItem.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={spotlightItem.imageUrl}
                      alt={spotlightItem.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f22] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#1a0f22]" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Spotlight Narrative & Quick Controls */}
              <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between text-white bg-[#1a0f22] z-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-sm text-[10px] font-bold tracking-widest uppercase bg-[#6E3A82] text-white">
                      FEATURED MOMENT
                    </span>
                    <span className="text-xs text-[#C5A8D8] font-medium uppercase tracking-wider">
                      {spotlightItem.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-white">
                    {spotlightItem.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-[#C5A8D8] font-medium border-y border-white/10 py-3">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#A987C2]" />
                      {spotlightItem.location}
                    </span>
                    <span>&middot;</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#A987C2]" />
                      {spotlightItem.date}
                    </span>
                  </div>

                  <p className="text-sm text-white/80 leading-relaxed font-light">
                    {spotlightItem.caption}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => {
                      const idx = GALLERY_ITEMS.findIndex(i => i.id === spotlightItem.id);
                      if (idx !== -1) setActiveItemIndex(idx);
                    }}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#6E3A82] hover:bg-[#8B4FA0] px-5 py-2.5 rounded-sm transition-all"
                  >
                    <Expand className="w-3.5 h-3.5" />
                    <span>View Full Size</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSpotlightIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)}
                      className="p-2 rounded-sm bg-white/10 hover:bg-white/25 text-white transition-colors"
                      aria-label="Previous spotlight"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSpotlightIndex((prev) => (prev + 1) % GALLERY_ITEMS.length)}
                      className="p-2 rounded-sm bg-white/10 hover:bg-white/25 text-white transition-colors"
                      aria-label="Next spotlight"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[#E8DDF0] pb-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#3B214F]">
            <Layers className="w-4 h-4 text-[#6E3A82]" />
            <span>Photo Albums</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'bg-[#3B214F] text-white shadow-sm'
                      : 'bg-white text-[#524C55] hover:bg-[#F4ECF7] border border-[#E8DDF0]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Uniform Grid — ALL items have identical 16:9 ratio and consistent heights */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {displayedItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveItemIndex(index)}
                className="group relative bg-[#1a0f22] rounded-sm overflow-hidden cursor-pointer aspect-[16/9] border border-[#E8DDF0] shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0714]/90 via-[#0d0714]/30 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-sm text-[9px] font-bold tracking-widest uppercase bg-[#3B214F]/90 text-white backdrop-blur-sm border border-white/10">
                    {item.category}
                  </span>
                </div>

                {/* Overlaid Title & Meta */}
                <div className="absolute bottom-0 inset-x-0 p-4 z-10 text-white">
                  <h4 className="font-serif text-base font-bold text-white group-hover:text-[#E8DDF0] transition-colors leading-snug line-clamp-1">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-3 text-[10px] text-[#C5A8D8] font-medium mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location.split(' ')[0]}
                    </span>
                    <span>&middot;</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Fullscreen Interactive Lightbox Modal */}
        <AnimatePresence>
          {currentItem && activeItemIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#0a0510]/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 lg:p-10"
              onClick={() => setActiveItemIndex(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveItemIndex(null)}
                className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus:outline-none border border-white/20"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev / Next Controls */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveItemIndex((prev) => (prev !== null ? (prev - 1 + displayedItems.length) % displayedItems.length : 0));
                }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus:outline-none border border-white/20"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveItemIndex((prev) => (prev !== null ? (prev + 1) % displayedItems.length : 0));
                }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus:outline-none border border-white/20"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Modal Box */}
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-5xl w-full bg-[#180e22] rounded-sm overflow-hidden border border-white/20 shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
              >
                {/* Photo View */}
                <div className="relative w-full lg:w-2/3 aspect-[16/9] lg:aspect-auto min-h-[320px] lg:min-h-[500px] bg-black">
                  <Image
                    src={currentItem.imageUrl}
                    alt={currentItem.title}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>

                {/* Info Panel */}
                <div className="w-full lg:w-1/3 p-6 sm:p-8 flex flex-col justify-between bg-[#1f122b] text-white overflow-y-auto border-t lg:border-t-0 lg:border-l border-white/10">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-sm text-[10px] font-bold tracking-widest uppercase bg-[#6E3A82] text-white border border-[#A987C2]/40">
                        {currentItem.category}
                      </span>
                      <span className="text-xs text-[#C5A8D8] font-mono">
                        {activeItemIndex + 1} / {displayedItems.length}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold leading-snug text-white">
                      {currentItem.title}
                    </h3>

                    <div className="space-y-2 text-xs text-[#E8DDF0]/80 border-y border-white/10 py-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#C5A8D8]" />
                        <span>{currentItem.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#C5A8D8]" />
                        <span>{currentItem.date}</span>
                      </div>
                    </div>

                    <p className="text-sm text-[#E8DDF0]/90 leading-relaxed font-light">
                      {currentItem.caption}
                    </p>
                  </div>

                  {currentItem.impactHighlight && (
                    <div className="mt-8 pt-4 border-t border-white/10">
                      <span className="text-[10px] uppercase tracking-widest text-[#C5A8D8] block font-semibold mb-1">
                        FIELD IMPACT METRIC
                      </span>
                      <p className="text-sm font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#A987C2]" />
                        {currentItem.impactHighlight}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
