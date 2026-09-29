'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, UserCheck } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { TESTIMONIALS } from '@/lib/data';

export default function TestimonialsEditorial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 60 : -60,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 lg:py-32 bg-[#F7F3F8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="COMMUNITY VOICES & TESTIMONIALS"
          title="Stories of transformation from those we serve."
          centered
          className="mb-14"
        />

        {/* Dynamic responsive height container */}
        <div className="relative max-w-4xl mx-auto min-h-[320px] sm:min-h-[280px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.35 },
              }}
              className="w-full flex flex-col items-center text-center px-6 sm:px-12 py-4"
            >
              <Quote className="w-10 h-10 text-[#6E3A82]/30 mb-6 shrink-0" aria-hidden="true" />
              
              <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#3B214F] leading-relaxed mb-8 italic max-w-3xl">
                "{currentTestimonial.quote}"
              </blockquote>
              
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#E8DDF0] text-[#6E3A82] flex items-center justify-center mb-3">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-[#3B214F] text-xs sm:text-sm tracking-wider uppercase">
                  {currentTestimonial.authorName}
                </h4>
                <p className="text-xs text-[#6E3A82] font-semibold mt-1">
                  {currentTestimonial.authorRelationship} &middot; {currentTestimonial.location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls — 44x44px touch targets */}
          <button
            className="absolute top-1/2 -left-2 sm:-left-12 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-[#E8DDF0] text-[#6E3A82] flex items-center justify-center hover:bg-[#6E3A82] hover:text-white transition-all shadow-sm z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6E3A82]"
            onClick={() => paginate(-1)}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            className="absolute top-1/2 -right-2 sm:-right-12 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-[#E8DDF0] text-[#6E3A82] flex items-center justify-center hover:bg-[#6E3A82] hover:text-white transition-all shadow-sm z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6E3A82]"
            onClick={() => paginate(1)}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide indicator dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === idx
                  ? 'w-7 h-1.5 bg-[#6E3A82]'
                  : 'w-1.5 h-1.5 bg-[#6E3A82]/30 hover:bg-[#6E3A82]/60'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

