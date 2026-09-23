import React from 'react';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/sections/CTASection';
import { ArrowRight, Calendar, HeartHandshake, Sparkles, UserPlus, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Get Involved | Devorah Women Foundation',
  description: 'Join the movement. Explore pathways for volunteering, institutional partnering, supporting our work, and attending foundation events.',
};

export default function GetInvolvedPage() {
  const PATHWAYS = [
    {
      id: 'volunteer',
      title: 'VOLUNTEER',
      subtitle: 'Share your professional expertise, mentor young scholars, or assist in field outreaches.',
      cta: 'Apply to Volunteer',
      href: '/contact?reason=Volunteering'
    },
    {
      id: 'partner',
      title: 'PARTNER WITH US',
      subtitle: 'Co-sponsor programs, provide educational grants, or launch corporate social initiatives.',
      cta: 'Explore Partnerships',
      href: '/partnerships'
    },
    {
      id: 'support',
      title: 'SUPPORT OUR WORK',
      subtitle: 'Contribute resources, learning toolkits, or financial support directly to foundation projects.',
      cta: 'Support Initiatives',
      href: '/contact?reason=Support'
    },
    {
      id: 'events',
      title: 'ATTEND OUR EVENTS',
      subtitle: 'Participate in annual summits, devotional circles, and regional leadership workshops.',
      cta: 'View Upcoming Events',
      href: '/stories?category=Events'
    }
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      
      {/* Hero Header */}
      <section className="py-20 bg-gradient-to-b from-[#F7F3F8] to-[#FAF8F5] border-b border-[#E8DDF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-[#E8DDF0] text-[#6E3A82] text-xs font-semibold uppercase tracking-widest">
            JOIN THE MOVEMENT
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3B214F]">
            There's a place for you in this work.
          </h1>
          <p className="text-base sm:text-lg text-[#716A73] max-w-2xl mx-auto leading-relaxed">
            Every contribution—whether time, expertise, prayer, or resources—multiplies our capacity to transform women's lives.
          </p>
        </div>
      </section>

      {/* Four Major Pathways */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PATHWAYS.map((path) => (
            <div
              key={path.id}
              id={path.id}
              className="p-8 rounded-3xl bg-white border border-[#E8DDF0] shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#6E3A82]">
                  {path.title}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#3B214F]">
                  {path.subtitle}
                </h3>
              </div>

              <div className="pt-4 border-t border-[#E8DDF0]">
                <Link
                  href={path.href}
                  className="inline-flex items-center gap-2 bg-[#6E3A82] hover:bg-[#3B214F] text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors"
                >
                  <span>{path.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
