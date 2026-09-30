'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_ITEMS } from '@/lib/data';
import { GalleryItem } from '@/lib/types';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, ArrowRight, Images } from 'lucide-react';

const CATEGORIES = ['All', 'Outreaches', 'Conferences', 'Scholarships', 'Faith & Renewal'] as const;

export default function MediaGallery({ limit }: { limit?: number }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeAlbum, setActiveAlbum] = useState<GalleryItem | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const currentPhotos = activeAlbum?.photos && activeAlbum.photos.length > 0
    ? activeAlbum.photos
    : activeAlbum ? [{ id: activeAlbum.id, url: activeAlbum.imageUrl, caption: activeAlbum.caption }] : [];

  const currentPhoto = currentPhotos[activePhotoIndex] || currentPhotos[0];

  // Lightbox Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeAlbum) return;
      if (e.key === 'Escape') setActiveAlbum(null);
      if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => (prev - 1 + currentPhotos.length) % currentPhotos.length);
      }
      if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev + 1) % currentPhotos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeAlbum, currentPhotos.length]);

  const openLightbox = (album: GalleryItem) => {
    setActiveAlbum(album);
    setActivePhotoIndex(0);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 1. Page / Section Introduction */}
        <div className="max-w-3xl mb-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#6E3A82] mb-3">
            OUR GALLERY
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3B214F] leading-[1.1] tracking-tight">
            Moments from the work.<br />
            <span className="italic font-normal text-[#6E3A82]">Stories from the community.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#524C55] leading-relaxed font-light">
            Explore moments from Devorah Women Foundation's programs, outreaches, conferences, scholarships and faith-based initiatives.
          </p>
        </div>

        {/* 2. Refined Editorial Category Filter Row */}
        {!limit && (
          <div className="mb-14 border-b border-[#E8DDF0]">
            <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar whitespace-nowrap pb-4">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs sm:text-sm font-semibold uppercase tracking-widest transition-all duration-300 relative py-1 focus:outline-none ${
                      isActive
                        ? 'text-[#3B214F]'
                        : 'text-[#524C55]/70 hover:text-[#3B214F]'
                    }`}
                  >
                    {cat}
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6E3A82]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Empty State Handling */}
        {displayedItems.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-sm border border-[#E8DDF0] my-8 p-8">
            <Images className="w-10 h-10 text-[#A987C2] mx-auto mb-3 opacity-60" />
            <p className="font-serif text-xl font-medium text-[#3B214F]">
              No stories in this collection yet.
            </p>
            <p className="text-xs text-[#524C55] mt-1">
              Please check back as new field photojournalism archives are published.
            </p>
          </div>
        ) : (
          /* 4. Cohesive Editorial Grid — Matching Heights & Overlaid Photography Text */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {displayedItems.map((item, index) => {
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(item)}
                >
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-sm overflow-hidden bg-[#1a0f22] border border-[#E8DDF0] shadow-md transition-all duration-500 group-hover:shadow-2xl">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    
                    {/* Dark gradient overlay for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0714]/90 via-[#0d0714]/35 to-transparent" />

                    {/* Top-Left Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-sm text-[10px] font-bold tracking-widest uppercase bg-[#3B214F]/90 text-white backdrop-blur-sm border border-white/20 shadow-sm">
                        {item.category}
                      </span>
                    </div>

                    {/* Album Info Overlay Inside Image */}
                    <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white flex flex-col justify-end">
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-[#C5A8D8] uppercase tracking-widest mb-2">
                        <span>{item.location.split(' ')[0]}</span>
                        <span>&middot;</span>
                        <span>{item.date}</span>
                      </div>

                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight mb-3 group-hover:text-[#E8DDF0] transition-colors">
                        {item.title}
                      </h2>

                      <div className="flex items-center justify-between text-xs text-[#C5A8D8] font-medium pt-2 border-t border-white/15">
                        <span className="flex items-center gap-1.5 text-xs text-[#E8DDF0]/80">
                          <MapPin className="w-3.5 h-3.5 text-[#A987C2]" />
                          {item.location}
                        </span>

                        <span className="inline-flex items-center gap-1.5 text-white font-semibold text-xs tracking-wider uppercase group-hover:translate-x-1 transition-transform duration-300">
                          <span>View Album ({item.photoCount || 1})</span>
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* 5. Lightbox Modal Exhibition Viewer */}
        <AnimatePresence>
          {activeAlbum && currentPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#0a0510]/96 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 lg:p-8 text-white"
              onClick={() => setActiveAlbum(null)}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between z-50 max-w-7xl mx-auto w-full border-b border-white/10 pb-4" onClick={(e) => e.stopPropagation()}>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A8D8] block">
                    {activeAlbum.category} &middot; PHOTO {activePhotoIndex + 1} OF {currentPhotos.length}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">
                    {activeAlbum.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/gallery/${activeAlbum.slug}`}
                    className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C5A8D8] hover:text-white border border-white/20 px-3.5 py-2 rounded-sm transition-colors"
                  >
                    <span>Full Album Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => setActiveAlbum(null)}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus:outline-none border border-white/20"
                    aria-label="Close album viewer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Image Stage */}
              <div className="relative flex-1 max-w-6xl mx-auto w-full my-4 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                {/* Prev Button */}
                <button
                  onClick={() => setActivePhotoIndex((prev) => (prev - 1 + currentPhotos.length) % currentPhotos.length)}
                  className="absolute left-2 sm:left-4 z-40 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-white/25 text-white transition-all backdrop-blur-md border border-white/20"
                  aria-label="Previous photograph"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Main Photograph */}
                <div className="relative w-full h-full max-h-[68vh] aspect-[16/10] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPhoto.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full max-h-[68vh]"
                    >
                      <Image
                        src={currentPhoto.url}
                        alt={currentPhoto.caption || activeAlbum.title}
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Next Button */}
                <button
                  onClick={() => setActivePhotoIndex((prev) => (prev + 1) % currentPhotos.length)}
                  className="absolute right-2 sm:right-4 z-40 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-white/25 text-white transition-all backdrop-blur-md border border-white/20"
                  aria-label="Next photograph"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Footer Details & Thumbnail Strip */}
              <div className="max-w-4xl mx-auto w-full z-50 text-center space-y-3 pt-2" onClick={(e) => e.stopPropagation()}>
                {currentPhoto.caption && (
                  <p className="text-xs sm:text-sm text-[#E8DDF0]/90 italic max-w-2xl mx-auto leading-relaxed">
                    "{currentPhoto.caption}"
                  </p>
                )}

                <div className="flex items-center justify-center gap-2 text-xs text-[#C5A8D8]">
                  <MapPin className="w-3.5 h-3.5 text-[#A987C2]" />
                  <span>{activeAlbum.location} &middot; {activeAlbum.date}</span>
                </div>

                {/* Thumbnail selector strip */}
                {currentPhotos.length > 1 && (
                  <div className="flex items-center justify-center gap-2 overflow-x-auto pt-2">
                    {currentPhotos.map((photo, pIdx) => (
                      <button
                        key={photo.id}
                        onClick={() => setActivePhotoIndex(pIdx)}
                        className={`relative w-12 h-9 rounded-sm overflow-hidden transition-all duration-300 border ${
                          activePhotoIndex === pIdx
                            ? 'border-[#C5A8D8] scale-110 shadow-md ring-1 ring-[#C5A8D8]'
                            : 'border-white/20 opacity-50 hover:opacity-100'
                        }`}
                      >
                        <Image src={photo.url} alt="thumbnail" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
