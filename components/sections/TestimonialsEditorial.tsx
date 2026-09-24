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
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 bg-[#F7F3F8] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#6E3A82]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="COMMUNITY VOICES & TESTIMONIALS"
          title="Stories of transformation from those we serve."
          centered
          className="mb-16"
        />

        <div className="relative max-w-4xl mx-auto h-[450px] sm:h-[350px]">
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
                opacity: { duration: 0.4 },
              }}
              className="absolute inset-0 flex flex-col items-center text-center px-4"
            >
              <Quote className="w-12 h-12 text-[#A987C2]/40 mb-8" />
              
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#3B214F] leading-relaxed mb-8 italic">
                "{currentTestimonial.quote}"
              </h3>
              
              <div className="mt-auto">
                <div className="w-12 h-12 rounded-full bg-[#E8DDF0] text-[#6E3A82] flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#3B214F] text-sm tracking-wide uppercase">
                  {currentTestimonial.authorName}
                </h4>
                <p className="text-xs text-[#6E3A82] font-medium mt-1">
                  {currentTestimonial.authorRelationship} &middot; {currentTestimonial.location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <button
            className="absolute top-1/2 -left-4 sm:-left-12 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#E8DDF0] text-[#6E3A82] flex items-center justify-center hover:bg-[#6E3A82] hover:text-white transition-all shadow-sm z-20"
            onClick={() => paginate(-1)}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            className="absolute top-1/2 -right-4 sm:-right-12 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#E8DDF0] text-[#6E3A82] flex items-center justify-center hover:bg-[#6E3A82] hover:text-white transition-all shadow-sm z-20"
            onClick={() => paginate(1)}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
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
                  ? 'w-6 h-1.5 bg-[#6E3A82]'
                  : 'w-1.5 h-1.5 bg-[#6E3A82]/20 hover:bg-[#6E3A82]/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
