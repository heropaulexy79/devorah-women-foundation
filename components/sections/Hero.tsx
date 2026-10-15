'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Heart } from 'lucide-react';

const SLIDES = [
  {
    id: 'slide-1',
    eyebrow: 'DEVORAH GLOBAL WOMEN',
    titleLine1: 'Raising Women of',
    titleLine2: 'Wisdom, Courage, &',
    titleLine3: 'Global Impact.',
    supportingText:
      'Devorah Global Women is a faith-driven nonprofit organization committed to raising spiritually grounded, purpose-driven, and socially impactful women.',
    primaryCtaText: 'Donate Now',
    primaryCtaLink: '/donate',
    secondaryCtaText: 'Explore Our Work',
    secondaryCtaLink: '/programs',
    image: '/images/heroslider/hero1.jpeg',
  },
  {
    id: 'slide-2',
    eyebrow: "GIRLS' DEVELOPMENT & SCHOLARSHIPS",
    titleLine1: 'Nurturing Courage,',
    titleLine2: 'Education & Dignity',
    titleLine3: 'in Young Girls.',
    supportingText:
      'Removing financial barriers to guarantee girl-child education, STEM literacy, confidence building, and personal protection for every young scholar.',
    primaryCtaText: 'Educational Support',
    primaryCtaLink: '/programs/educational-support',
    secondaryCtaText: 'Support a Scholarship',
    secondaryCtaLink: '/donate?pillar=educational-support',
    image: '/images/heroslider/hero2.PNG',
  },
  {
    id: 'slide-3',
    eyebrow: 'EMPOWERMENT & LEADERSHIP',
    titleLine1: 'Raising Courageous',
    titleLine2: 'Female Leaders for',
    titleLine3: 'Civic Governance.',
    supportingText:
      'Designed to help women discover their potential, grow in confidence, and develop leadership skills for their homes, workplaces, and communities.',
    primaryCtaText: 'Empowerment & Leadership',
    primaryCtaLink: '/programs/empowerment-leadership',
    secondaryCtaText: 'Support Women Leaders',
    secondaryCtaLink: '/donate?pillar=empowerment-leadership',
    image: '/images/heroslider/hero3.PNG',
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
    secondaryCtaText: 'Donate to Outreach',
    secondaryCtaLink: '/donate?pillar=community-outreach-support',
    image: '/images/heroslider/hero4.PNG',
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
      className="relative w-full min-h-[100dvh] lg:min-h-screen flex items-center lg:items-end pt-20 pb-16 sm:pt-28 sm:pb-24 lg:pb-32 overflow-hidden bg-[#1a0f22] -mt-20"
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0714]/90 via-[#0d0714]/65 to-[#0d0714]/30 lg:from-[#0d0714]/85 lg:via-[#0d0714]/55 lg:to-[#0d0714]/20" />
          {/* Bottom vignette & mobile dark wash for crystal-clear text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0714]/95 via-[#0d0714]/55 to-[#0d0714]/35 lg:from-[#0d0714]/75 lg:via-transparent lg:to-[#0d0714]/30" />
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
              className="space-y-4 sm:space-y-6 lg:space-y-7"
            >
              {/* Eyebrow — plain editorial label */}
              <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] sm:tracking-[0.35em] uppercase text-[#C5A8D8]">
                {slide.eyebrow}
              </p>

              {/* Headline — selective italic for contrast */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.12] sm:leading-[1.08] tracking-tight">
                <span className="block font-bold">{slide.titleLine1}</span>
                <span className="block font-normal italic text-[#C5A8D8]">
                  {slide.titleLine2}
                </span>
                <span className="block font-bold">{slide.titleLine3}</span>
              </h1>

              {/* Supporting copy — WCAG AA contrast enhanced */}
              <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed max-w-xl font-light">
                {slide.supportingText}
              </p>

              {/* CTAs — refined, responsive sizing */}
              <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-3.5 sm:gap-5">
                <Link
                  href={slide.primaryCtaLink}
                  className="inline-flex items-center gap-2 bg-[#6E3A82] hover:bg-[#8B4FA0] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-sm text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#C5A8D8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0f22] focus-visible:outline-none shadow-lg shadow-black/20"
                >
                  {slide.primaryCtaLink.startsWith('/donate') && (
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white/20 text-white" />
                  )}
                  <span>{slide.primaryCtaText}</span>
                </Link>

                <Link
                  href={slide.secondaryCtaLink}
                  className="inline-flex items-center text-white/85 hover:text-white text-xs sm:text-sm font-medium tracking-wide border-b border-white/30 hover:border-white pb-0.5 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#C5A8D8] focus-visible:outline-none"
                >
                  {slide.secondaryCtaText}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-0 inset-x-0 z-30 pb-4 sm:pb-7 px-4 sm:px-8">
        {/* Thin Progress Bar */}
        <div className="max-w-7xl mx-auto mb-3 sm:mb-5 w-full h-px bg-white/15 overflow-hidden">
          <div
            className="h-full bg-[#A987C2] transition-all ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Slide Dots — enlarged touch target for WCAG Target Size */}
          <div className="flex items-center gap-3">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentSlide(idx);
                  setProgress(0);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className="p-2 -m-2 focus-visible:ring-2 focus-visible:ring-[#C5A8D8] focus-visible:outline-none rounded-full"
              >
                <span
                  className={`block transition-all duration-300 rounded-full ${
                    currentSlide === idx
                      ? 'w-6 h-1.5 bg-[#A987C2]'
                      : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <span className="text-white/50 text-[10px] tracking-widest hidden sm:inline mr-1">
              {String(currentSlide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </span>

            <button
              onClick={handlePrev}
              className="p-2 text-white/70 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#C5A8D8] focus-visible:outline-none rounded-md"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 text-white/70 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#C5A8D8] focus-visible:outline-none rounded-md"
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
              className="p-2 text-white/70 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#C5A8D8] focus-visible:outline-none rounded-md"
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
