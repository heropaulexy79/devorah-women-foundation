'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#2a1638] text-[#FAF8F5] pt-20 pb-10 border-t border-[#6E3A82]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top identity bar */}
        <div className="pb-12 border-b border-[#6E3A82]/20 mb-12">
          <Link href="/" className="flex items-center gap-3 w-fit">
            <div className="relative w-11 h-11">
              <Image
                src="/logo.png"
                alt="Devorah Women Foundation Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-wider text-white leading-none">
                DEVORAH
              </span>
              <span className="text-[9px] font-semibold tracking-[0.3em] text-[#A987C2] uppercase mt-1">
                WOMEN FOUNDATION
              </span>
            </div>
          </Link>

          <p className="mt-5 font-serif text-lg text-[#E8DDF0]/60 font-light italic max-w-sm leading-relaxed">
            A foundation established to see every woman and girl walk in her full God-given potential.
          </p>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-[#6E3A82]/20">

          {/* Stay Connected */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A987C2]">
              Stay Connected
            </h3>
            <p className="text-xs text-[#E8DDF0]/60 leading-relaxed">
              Receive impact updates, program news, and community stories.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-sm text-[#A987C2]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thank you for joining our community.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex max-w-xs">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white/8 text-white placeholder-[#E8DDF0]/40 border border-[#6E3A82]/50 rounded-l-sm focus:outline-none focus:border-[#A987C2] transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#6E3A82] hover:bg-[#8B4FA0] text-white px-3 py-2.5 rounded-r-sm text-xs font-semibold transition-colors flex items-center"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A987C2]">
              Foundation
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Our Programs', href: '/programs' },
                { label: 'Impact & Projects', href: '/impact' },
                { label: 'Resource Library', href: '/resources' },
                { label: 'Stories & Insights', href: '/stories' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#E8DDF0]/60 hover:text-[#C5A8D8] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A987C2]">
              Get Involved
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Volunteer Pathways', href: '/get-involved#volunteer' },
                { label: 'Corporate Partnerships', href: '/partnerships' },
                { label: 'Support Our Work', href: '/get-involved#support' },
                { label: 'Attend Events', href: '/get-involved#events' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#E8DDF0]/60 hover:text-[#C5A8D8] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A987C2]">
              Connect
            </h3>
            <p className="text-xs text-[#E8DDF0]/60 leading-relaxed">
              Official enquiries:<br />
              <a
                href="mailto:info@devorahwomen.org"
                className="text-[#C5A8D8] hover:text-white transition-colors"
              >
                info@devorahwomen.org
              </a>
            </p>
            <ul className="space-y-3">
              {[
                { label: 'Instagram', href: 'https://instagram.com' },
                { label: 'Facebook', href: 'https://facebook.com' },
                { label: 'LinkedIn', href: 'https://linkedin.com' },
                { label: 'YouTube', href: 'https://youtube.com' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#E8DDF0]/60 hover:text-[#C5A8D8] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#E8DDF0]/35 gap-3">
          <p>
            © {new Date().getFullYear()} Devorah Women Foundation. All rights reserved.
          </p>
          <p className="italic text-[#E8DDF0]/25">
            Empowering Women. Shaping Girls. Transforming Communities.
          </p>
        </div>

      </div>
    </footer>
  );
}
