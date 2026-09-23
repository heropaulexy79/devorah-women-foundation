'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const SLIDES = [
  {
    id: 'slide-1',
    eyebrow: 'DEVORAH WOMEN FOUNDATION',
    titleLine1: 'Empowering Women.',
    titleLine2: 'Shaping Girls.',
    titleLine3: 'Transforming Communities.',
    supportingText:
      'A Christian women-focused foundation committed to empowering girls and women through education, mentorship, leadership development, and faith-anchored support.',
    primaryCtaText: 'Explore Our Work',
    primaryCtaLink: '/programs',
    secondaryCtaText: 'Become a Partner',
    secondaryCtaLink: '/partnerships',
    image: '/images/hero_portrait.png',
  },
  {
    id: 'slide-2',
    eyebrow: "GIRLS' DEVELOPMENT & SCHOLARSHIPS",
    titleLine1: 'Nurturing Courage,',
    titleLine2: 'Education & Dignity',
    titleLine3: 'in Young Girls.',
    supportingText:
      'Removing financial barriers to guarantee girl-child education, STEM literacy, confidence building, and personal protection for every young scholar.',
    primaryCtaText: 'Girl-Child Academy',
    primaryCtaLink: '/programs/girls-development',
    secondaryCtaText: 'Support a Scholarship',
    secondaryCtaLink: '/get-involved#support',
    image: '/images/hero_slide_girls.png',
  },
  {
    id: 'slide-3',
    eyebrow: 'DEVORAH LEADERSHIP INSTITUTE',
    titleLine1: 'Raising Courageous',
    titleLine2: 'Female Leaders for',
    titleLine3: 'Civic Governance.',
    supportingText:
      'Equipping emerging female leaders with strategic governance skills, public advocacy capabilities, and ethical decision-making principles.',
    primaryCtaText: 'Leadership Institute',
    primaryCtaLink: '/programs/leadership-development',
    secondaryCtaText: 'Executive Summits',
    secondaryCtaLink: '/get-involved#events',
    image: '/images/hero_slide_leadership.png',
  },
  {
    id: 'slide-4',
    eyebrow: 'COMMUNITY IMPACT & FAITH',
    titleLine1: 'Fostering Financial',
    titleLine2: 'Dignity & Spiritual',
    titleLine3: 'Transformation.',
    supportingText:
      'Building self-sustaining families through micro-enterprise starter incubators, vocational mentorship, and spiritual renewal circles.',
    primaryCtaText: 'See Field Projects',
    primaryCtaLink: '/impact',
    secondaryCtaText: 'Become a Sponsor',
    secondaryCtaLink: '/partnerships',
    image: '/images/who_we_are.png',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const autoPlayDuration = 7000;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    if (!isPaused) {
      const step = 50;
      progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + (step / autoPlayDuration) * 100;
        });
      }, step);

      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        setProgress(0);
      }, autoPlayDuration);
    }

    return () => {
      clearInterval(interval);
      clearInterval(progressTimer);
    };
  }, [isPaused, currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  };

  const slide = SLIDES[currentSlide];

  return (
    <section
      className="relative w-full min-h-[95vh] lg:min-h-screen flex items-end pt-28 pb-24 lg:pb-32 overflow-hidden bg-[#1a0f22] -mt-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Full-Bleed Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={slide.image}
            alt={slide.titleLine1}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />

          {/* Sophisticated editorial overlay — darker from left, preserves photo on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0714]/85 via-[#0d0714]/55 to-[#0d0714]/20" />
          {/* Bottom vignette for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0714]/75 via-transparent to-[#0d0714]/30" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + '-text'}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="space-y-7"
            >
              {/* Eyebrow — plain editorial label */}
              <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-[#C5A8D8]">
                {slide.eyebrow}
              </p>

              {/* Headline — selective italic for contrast */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.08] tracking-tight">
                <span className="block font-bold">{slide.titleLine1}</span>
                <span className="block font-normal italic text-[#C5A8D8]">
                  {slide.titleLine2}
                </span>
                <span className="block font-bold">{slide.titleLine3}</span>
              </h1>

              {/* Supporting copy */}
              <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-xl font-light">
                {slide.supportingText}
              </p>

              {/* CTAs — refined, not pill-shaped */}
              <div className="pt-2 flex flex-wrap items-center gap-5">
                <Link
                  href={slide.primaryCtaLink}
                  className="inline-flex items-center bg-[#6E3A82] hover:bg-[#8B4FA0] text-white px-8 py-3.5 rounded-sm text-sm font-semibold tracking-wide transition-all duration-300"
                >
                  {slide.primaryCtaText}
                </Link>

                <Link
                  href={slide.secondaryCtaLink}
                  className="inline-flex items-center text-white/80 hover:text-white text-sm font-medium tracking-wide border-b border-white/30 hover:border-white pb-0.5 transition-all duration-300"
                >
                  {slide.secondaryCtaText}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-0 inset-x-0 z-30 pb-7 px-4 sm:px-8">
        {/* Thin Progress Bar */}
        <div className="max-w-7xl mx-auto mb-5 w-full h-px bg-white/15 overflow-hidden">
          <div
            className="h-full bg-[#A987C2] transition-all ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Slide Dots */}
          <div className="flex items-center gap-3">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentSlide(idx);
                  setProgress(0);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === idx
                    ? 'w-6 h-1.5 bg-[#A987C2]'
                    : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <span className="text-white/40 text-[10px] tracking-widest hidden sm:inline mr-1">
              {String(currentSlide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </span>

            <button
              onClick={handlePrev}
              className="p-2 text-white/50 hover:text-white transition-colors focus:outline-none"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 text-white/50 hover:text-white transition-colors focus:outline-none"
              aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
            >
              {isPaused ? (
                <Play className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Pause className="w-3.5 h-3.5 fill-current" />
              )}
            </button>

            <button
              onClick={handleNext}
              className="p-2 text-white/50 hover:text-white transition-colors focus:outline-none"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
