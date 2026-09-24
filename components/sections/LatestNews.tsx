'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { ARTICLES } from '@/lib/data';

export default function LatestNews() {
  return (
    <section className="py-24 lg:py-32 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SectionHeader
            eyebrow="LATEST NEWS & ARTICLES"
            title="Insights, stories, and thought leadership."
            description="Explore our latest updates, field reports, and reflections on faith, leadership, and women's empowerment."
          />
          <Link
            href="/stories"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6E3A82] hover:text-[#3B214F] shrink-0 transition-colors tracking-wide group"
          >
            <span>View All Articles</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {ARTICLES.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-white rounded-2xl border border-[#E8DDF0]/70 overflow-hidden shadow-md shadow-[#6E3A82]/5 hover:shadow-2xl hover:shadow-[#6E3A82]/15 hover:border-[#6E3A82]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F4ECF7]">
                <Image
                  src={article.featuredImageUrl}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#3B214F]/90 text-white backdrop-blur-md shadow-sm">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-[#9B8CA6] font-medium">
                    <span>{article.publishedAt}</span>
                    <span>&middot;</span>
                    <span>{article.readingTime}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#3B214F] group-hover:text-[#6E3A82] transition-colors duration-200 leading-snug">
                    <Link href={`/stories/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-[#716A73] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F4ECF7] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#E8DDF0]">
                      <Image
                        src={article.author.avatarUrl || '/images/founder_portrait.png'}
                        alt={article.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs font-semibold text-[#3B214F]">
                      {article.author.name}
                    </span>
                  </div>

                  <Link
                    href={`/stories/${article.slug}`}
                    className="text-xs font-semibold text-[#6E3A82] group-hover:text-[#3B214F] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Read Article</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
