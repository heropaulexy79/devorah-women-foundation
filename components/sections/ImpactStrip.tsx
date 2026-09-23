'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IMPACT_METRICS } from '@/lib/data';

export default function ImpactStrip() {
  return (
    <section className="bg-[#3B214F] text-white py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial headline */}
        <div className="mb-16 lg:mb-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A987C2] mb-4">
            OUR IMPACT
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white max-w-lg leading-[1.2]">
            Change is more powerful<br className="hidden sm:block" /> when you can see it.
          </h2>
        </div>

        {/* Stats — no card containers, separated by dividers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {IMPACT_METRICS.map((metric, idx) => (
            <motion.div
              key={metric.id}
              className={`py-8 pr-8 lg:pr-12 ${
                idx < IMPACT_METRICS.length - 1
                  ? 'border-b lg:border-b-0 lg:border-r border-white/10'
                  : ''
              } ${idx % 2 === 0 && idx !== IMPACT_METRICS.length - 2 ? 'border-r border-white/10 lg:border-r-0' : ''}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[#C5A8D8] tracking-tight leading-none">
                {metric.number}
              </div>
              <h3 className="text-sm font-semibold text-white mt-4 leading-snug">
                {metric.label}
              </h3>
              <p className="text-xs text-[#E8DDF0]/55 mt-2 leading-relaxed max-w-[180px]">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-[10px] text-[#E8DDF0]/35 italic">
          * Metrics reflect operational program targets & field milestones.
        </p>
      </div>
    </section>
  );
}
