import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROGRAMS } from '@/lib/data';
import { ArrowLeft, CheckCircle2, MapPin, Target, Users, HeartHandshake, Award, Quote, Sparkles } from 'lucide-react';
import CTASection from '@/components/sections/CTASection';
import PageHero from '@/components/ui/PageHero';

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
      
      {/* Top Header */}
      <PageHero
        eyebrow={program.category}
        title={program.name}
        description={program.tagline}
        breadcrumb={[
          { label: 'Programs', href: '/programs' },
          { label: program.name }
        ]}
      />

      {/* Main Content Layout */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Primary Program Image */}
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#3B214F]">
              <Image src={program.imageUrl} alt={program.name} fill className="object-cover" />
            </div>

            {/* Program Overview */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B214F]">Program Overview</h2>
              <p className="text-base text-[#716A73] leading-relaxed font-normal">{program.description}</p>
            </div>

            {/* Strategic Objectives */}
            <div className="p-8 rounded-3xl bg-white border border-[#E8DDF0] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#6E3A82] font-semibold text-lg">
                <Target className="w-5 h-5" />
                <h3>Strategic Objectives</h3>
              </div>
              <ul className="space-y-3 text-sm text-[#716A73]">
                {program.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#6E3A82] shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Activities & Modules */}
            <div className="p-8 rounded-3xl bg-white border border-[#E8DDF0] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#6E3A82] font-semibold text-lg">
                <Users className="w-5 h-5" />
                <h3>Key Activities & Execution Modules</h3>
              </div>
              <ul className="space-y-3 text-sm text-[#716A73]">
                {program.activities.map((act, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#6E3A82] shrink-0 mt-2" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact & Results */}
            {program.impactResults && program.impactResults.length > 0 && (
              <div className="p-8 rounded-3xl bg-[#3B214F] text-white shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-[#C5A8D8] font-semibold text-lg">
                  <Award className="w-5 h-5" />
                  <h3>Measurable Impact & Results</h3>
                </div>
                <ul className="space-y-3 text-sm text-[#E8DDF0]/90">
                  {program.impactResults.map((res, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#C5A8D8] shrink-0 mt-2" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Program Testimonial */}
            {program.testimonial && (
              <div className="p-8 rounded-3xl bg-[#F7F3F8] border border-[#E8DDF0] space-y-4 relative overflow-hidden">
                <Quote className="w-12 h-12 text-[#6E3A82]/15 absolute top-4 right-4" />
                <span className="text-xs uppercase font-bold tracking-widest text-[#6E3A82]">
                  TESTIMONIAL
                </span>
                <p className="font-serif text-lg italic text-[#3B214F] leading-relaxed">
                  "{program.testimonial.quote}"
                </p>
                <div className="pt-2 border-t border-[#E8DDF0]/60">
                  <h4 className="font-semibold text-xs text-[#3B214F]">{program.testimonial.author}</h4>
                  <p className="text-[11px] text-[#6E3A82]">{program.testimonial.role}</p>
                </div>
              </div>
            )}

            {/* Photo Gallery Preview */}
            {program.galleryImages && program.galleryImages.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#3B214F]">Photo & Field Highlights</h3>
                <div className="grid grid-cols-2 gap-4">
                  {program.galleryImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                      <Image src={img} alt={`${program.name} photo ${idx + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar Profile & Call to Action */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E8DDF0] shadow-sm space-y-6 sticky top-28">
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

              {/* Call to Action Box */}
              <div className="pt-6 border-t border-[#E8DDF0] space-y-3">
                <h4 className="font-serif text-base font-bold text-[#3B214F]">
                  Interested in supporting this program?
                </h4>
                <p className="text-xs text-[#716A73]">
                  Partner with us to co-sponsor cohorts, provide scholarships, or donate resources.
                </p>
                <Link
                  href="/partnerships"
                  className="w-full flex items-center justify-center gap-2 bg-[#6E3A82] hover:bg-[#3B214F] text-white py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-colors shadow-sm"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>Partner With Us</span>
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
