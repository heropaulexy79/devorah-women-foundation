'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Phone, ArrowRight, Sparkles, HeartHandshake } from 'lucide-react';

export default function UpcomingEvents() {
  return (
    <section className="py-20 lg:py-28 bg-[#F4ECF7]/50 relative overflow-hidden border-y border-[#E8DDF0]">
      {/* Subtle decorative background circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#642B80]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#642B80]/10 text-[#642B80] text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Upcoming Field Mission</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B214F] leading-tight">
              Upcoming Events &amp; Outreaches
            </h2>
            <p className="mt-3 text-base text-[#716A73] max-w-2xl leading-relaxed">
              Join hands with us as we bring hope, dignity, education, and essential relief to women and children across communities.
            </p>
          </div>

          <Link
            href="/get-involved"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E8DDF0] text-xs font-semibold uppercase tracking-wider text-[#642B80] hover:bg-[#642B80] hover:text-white transition-all shadow-sm shrink-0 self-start md:self-auto group"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Partner / Volunteer</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Featured Event Card */}
        <div className="bg-white rounded-3xl border border-[#E8DDF0] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          
          {/* Left Column: Official Event Flyer Poster */}
          <div className="lg:col-span-5 relative min-h-[380px] sm:min-h-[460px] bg-[#1a0f22] overflow-hidden group">
            <Image
              src="/images/Upcoming/New Devorah Women Ekiti Outreach.png"
              alt="Devorah Women Ekiti State Outreach Flyer"
              fill
              className="object-contain lg:object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-[#642B80] text-white shadow-md">
                Featured Outreach
              </span>
            </div>
          </div>

          {/* Right Column: Event Details & Action */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A088B0]">
                Community Humanitarian Mission
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3B214F] leading-snug">
                Devorah Women Ekiti State Outreach
              </h3>
              <p className="text-sm sm:text-base text-[#524C55] leading-relaxed font-light">
                A dedicated community mission to Erelu Adebayo Children&apos;s Home, Iyin Ekiti. We are extending love, educational supplies, empowerment gifts, nutritional relief, and spiritual encouragement to vulnerable children and mothers in the community.
              </p>

              {/* Event Metadata Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FCFCF7] border border-[#E8DDF0]">
                  <div className="p-2 rounded-xl bg-[#642B80]/10 text-[#642B80] shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#A088B0]">
                      Date
                    </span>
                    <strong className="text-sm font-serif font-bold text-[#3B214F]">
                      Friday, Dec. 4th, 2026
                    </strong>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FCFCF7] border border-[#E8DDF0]">
                  <div className="p-2 rounded-xl bg-[#642B80]/10 text-[#642B80] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#A088B0]">
                      Time
                    </span>
                    <strong className="text-sm font-serif font-bold text-[#3B214F]">
                      4:00 PM Prompt
                    </strong>
                  </div>
                </div>

                <div className="sm:col-span-2 flex items-start gap-3 p-3.5 rounded-2xl bg-[#FCFCF7] border border-[#E8DDF0]">
                  <div className="p-2 rounded-xl bg-[#642B80]/10 text-[#642B80] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#A088B0]">
                      Venue
                    </span>
                    <strong className="text-sm font-bold text-[#3B214F]">
                      Erelu Adebayo Children&apos;s Home, Iyin Ekiti, Ekiti State
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions & Enquiries */}
            <div className="pt-4 border-t border-[#E8DDF0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#716A73]">
                <Phone className="w-4 h-4 text-[#642B80] shrink-0" />
                <span>
                  For enquiries:{' '}
                  <a
                    href="tel:+2347036938589"
                    className="font-bold text-[#3B214F] hover:text-[#642B80] underline decoration-[#BCA1CD] transition-colors"
                  >
                    +234 703 693 8589
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center gap-2 bg-[#642B80] hover:bg-[#8B4FA0] text-white text-xs font-semibold px-6 py-3 rounded-full transition-all shadow-md group"
                >
                  <span>Support This Outreach</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
