'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/sections/CTASection';
import { RESOURCES } from '@/lib/data';
import { BookOpen, Download, Eye, Search } from 'lucide-react';

const CATEGORIES = ['All', 'Journals', 'Books', 'Devotionals', 'Guides', 'Publications'];

export default function ResourcesPage() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = RESOURCES.filter((res) => {
    const matchesCat = selectedCat === 'All' || res.type === selectedCat;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      
      {/* Header Banner */}
      <section className="py-20 bg-gradient-to-b from-[#F7F3F8] to-[#FAF8F5] border-b border-[#E8DDF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-[#E8DDF0] text-[#6E3A82] text-xs font-semibold uppercase tracking-widest">
            DEVORAH RESOURCE LIBRARY
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3B214F]">
            Knowledge that empowers.
          </h1>
          <p className="text-base sm:text-lg text-[#716A73] max-w-2xl mx-auto leading-relaxed">
            Access our curated collection of editorial journals, devotional guides, leadership frameworks, and research publications.
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto pt-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-[#716A73]" />
              <input
                type="text"
                placeholder="Search library resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full border border-[#E8DDF0] bg-white text-sm focus:outline-none focus:border-[#6E3A82] shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Category Filters */}
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

        {/* Resources Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="p-6 rounded-2xl bg-white border border-[#E8DDF0] shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6 items-center"
            >
              <div className="relative w-36 aspect-[3/4] rounded-xl overflow-hidden shadow bg-[#3B214F] shrink-0">
                <Image src={res.coverImageUrl} alt={res.title} fill className="object-cover" />
              </div>

              <div className="space-y-3 flex-grow">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#E8DDF0] text-[#6E3A82]">
                  {res.type}
                </span>

                <h3 className="font-serif text-xl font-bold text-[#3B214F] leading-snug">
                  {res.title}
                </h3>

                <p className="text-xs text-[#6E3A82] font-medium">By {res.author}</p>

                <p className="text-xs text-[#716A73] line-clamp-2 leading-relaxed">
                  {res.shortDescription}
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert('Reading mode active for ' + res.title); }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6E3A82] hover:text-[#3B214F]"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Read Online</span>
                  </a>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert('Downloading ' + res.title); }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#6E3A82] hover:bg-[#3B214F] text-white px-3 py-1.5 rounded-full transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      <CTASection />
    </div>
  );
}
