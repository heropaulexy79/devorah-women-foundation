'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/sections/CTASection';
import { ARTICLES } from '@/lib/data';
import { ArrowUpRight, Clock, User, Search } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Foundation News',
  'Women\'s Issues',
  'Girls\' Development',
  'Leadership',
  'Faith',
  'Empowerment',
  'Community Stories',
  'Events'
];

import PageHero from '@/components/ui/PageHero';

export default function StoriesPage() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = ARTICLES.filter((art) => {
    const matchesCat = selectedCat === 'All' || art.category === selectedCat;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredArticle = ARTICLES.find((a) => a.featured) || ARTICLES[0];

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      
      {/* Header Banner */}
      <div className="relative">
        <PageHero
          eyebrow="JOURNAL & THOUGHT LEADERSHIP"
          title="Stories & Insights"
          description="Perspectives on female leadership, girl-child advocacy, faith in action, and field stories of dignity and transformation."
          breadcrumb={[{ label: 'Stories & Insights' }]}
        />
        <div className="max-w-md mx-auto px-4 -mt-8 relative z-20 pb-8">
          <div className="relative shadow-lg rounded-full">
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-[#6E3A82]" />
            <input
              type="text"
              placeholder="Search articles & stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-full border border-[#E8DDF0] bg-white text-sm focus:outline-none focus:border-[#6E3A82] text-[#3B214F] placeholder-[#9B8CA6]"
            />
          </div>
        </div>
      </div>

      {/* Featured Editorial Article */}
      {featuredArticle && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/stories/${featuredArticle.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DDF0] shadow-sm hover:shadow-xl transition-all"
          >
            <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#3B214F]">
              <Image
                src={featuredArticle.featuredImageUrl}
                alt={featuredArticle.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="lg:col-span-5 space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E8DDF0] text-[#6E3A82]">
                {featuredArticle.category}
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B214F] group-hover:text-[#6E3A82] transition-colors leading-tight">
                {featuredArticle.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#716A73] leading-relaxed line-clamp-3">
                {featuredArticle.excerpt}
              </p>

              <div className="pt-4 border-t border-[#E8DDF0] flex items-center justify-between text-xs text-[#716A73]">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#6E3A82]" />
                  <span>{featuredArticle.author.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#6E3A82]" />
                  <span>{featuredArticle.readingTime}</span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCat === cat
                  ? 'bg-[#6E3A82] text-white shadow-sm'
                  : 'bg-white border border-[#E8DDF0] text-[#716A73] hover:text-[#3B214F] hover:bg-[#E8DDF0]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/stories/${article.slug}`}
              className="group block rounded-2xl overflow-hidden bg-white border border-[#E8DDF0] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#3B214F]">
                <Image
                  src={article.featuredImageUrl}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6 space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#E8DDF0] text-[#6E3A82]">
                  {article.category}
                </span>

                <h3 className="font-serif text-xl font-bold text-[#3B214F] group-hover:text-[#6E3A82] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-[#716A73] line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="pt-3 border-t border-[#E8DDF0] flex items-center justify-between text-xs text-[#716A73]">
                  <span>{article.publishedAt}</span>
                  <span className="font-semibold text-[#6E3A82]">{article.readingTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </section>

      <CTASection />
    </div>
  );
}
