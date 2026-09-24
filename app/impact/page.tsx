'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/sections/CTASection';
import { PROJECTS } from '@/lib/data';
import { ArrowUpRight, Calendar, MapPin } from 'lucide-react';

const CATEGORIES = ['All', 'Outreach', 'Training', 'Conferences', 'Community', 'Campaigns'];

import PageHero from '@/components/ui/PageHero';

export default function ImpactPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      
      {/* Header Banner */}
      <PageHero
        eyebrow="FIELD IMPACT & INITIATIVES"
        title="See the work in action."
        description="Explore our project archive documenting outreach missions, leadership summits, and community development field reports."
        breadcrumb={[{ label: 'Our Impact' }]}
      />

      {/* Filter Tabs & Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#6E3A82] text-white shadow-sm'
                  : 'bg-white border border-[#E8DDF0] text-[#716A73] hover:text-[#3B214F] hover:bg-[#E8DDF0]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/impact/${project.slug}`}
              className="group block rounded-2xl overflow-hidden bg-white border border-[#E8DDF0] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#3B214F]">
                <Image
                  src={project.imageUrl}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF8F5]/90 text-[#3B214F]">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-4 text-xs text-[#6E3A82] font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {project.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {project.location}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#3B214F] group-hover:text-[#6E3A82] transition-colors">
                  {project.name}
                </h3>

                <p className="text-xs text-[#716A73] leading-relaxed">
                  {project.shortDescription}
                </p>

                <div className="pt-3 border-t border-[#E8DDF0] flex items-center justify-between text-xs font-semibold text-[#6E3A82]">
                  <span>View Project Details</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
