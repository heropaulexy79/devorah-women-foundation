import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROGRAMS } from '@/lib/data';
import { ArrowLeft, CheckCircle2, MapPin, Target, Users, HeartHandshake } from 'lucide-react';
import CTASection from '@/components/sections/CTASection';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const program = PROGRAMS.find((p) => p.slug === slug);

  if (!program) {
    notFound();
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      
      {/* Top Breadcrumb Header */}
      <section className="py-12 bg-gradient-to-b from-[#F7F3F8] to-[#FAF8F5] border-b border-[#E8DDF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#6E3A82] hover:text-[#3B214F]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Programs</span>
          </Link>
          <span className="block px-3 py-1 rounded-full bg-[#E8DDF0] text-[#6E3A82] text-xs font-semibold uppercase tracking-widest w-fit">
            {program.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#3B214F]">
            {program.name}
          </h1>
          <p className="text-base text-[#6E3A82] italic font-medium max-w-2xl">
            {program.tagline}
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-10">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#3B214F]">
              <Image src={program.imageUrl} alt={program.name} fill className="object-cover" />
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#3B214F]">Program Overview</h2>
              <p className="text-base text-[#716A73] leading-relaxed">{program.description}</p>
            </div>

            {/* Objectives */}
            <div className="p-8 rounded-2xl bg-white border border-[#E8DDF0] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#6E3A82] font-semibold text-lg">
                <Target className="w-5 h-5" />
                <h3>Strategic Objectives</h3>
              </div>
              <ul className="space-y-2 text-sm text-[#716A73]">
                {program.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#6E3A82] shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Activities */}
            <div className="p-8 rounded-2xl bg-white border border-[#E8DDF0] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#6E3A82] font-semibold text-lg">
                <Users className="w-5 h-5" />
                <h3>Key Activities & Modules</h3>
              </div>
              <ul className="space-y-2 text-sm text-[#716A73]">
                {program.activities.map((act, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#6E3A82] shrink-0 mt-2" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar Specifications */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E8DDF0] shadow-sm space-y-6 sticky top-28">
              <h3 className="font-serif text-xl font-bold text-[#3B214F] border-b border-[#E8DDF0] pb-3">
                Program Profile
              </h3>

              <div>
                <h4 className="text-xs uppercase font-semibold text-[#6E3A82]">Target Audience</h4>
                <p className="text-sm text-[#716A73] mt-1">{program.targetAudience}</p>
              </div>

              <div>
                <h4 className="text-xs uppercase font-semibold text-[#6E3A82]">Primary Locations</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {program.locations.map((loc, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[#E8DDF0] text-[#3B214F]">
                      <MapPin className="w-3 h-3 text-[#6E3A82]" />
                      {loc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8DDF0]">
                <Link
                  href="/partnerships"
                  className="w-full flex items-center justify-center gap-2 bg-[#6E3A82] hover:bg-[#3B214F] text-white py-3 rounded-full text-sm font-semibold transition-colors"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>Sponsor This Program</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      <CTASection />
    </div>
  );
}
