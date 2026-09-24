'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a3 3 0 0 1-3-3" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-12 border-b border-[#6E3A82]/20">
          
          {/* Col 1: Brand & Contact */}
          <div className="space-y-6">
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
            <p className="text-sm text-[#E8DDF0]/70 font-light leading-relaxed">
              A Christian foundation committed to seeing every woman and girl walk in her full God-given potential through education, mentorship, and faith-anchored support.
            </p>
            <div className="pt-2 space-y-2 text-xs text-[#E8DDF0]/60">
              <p><strong className="text-[#C5A8D8] font-medium">Email:</strong> info@devorahwomen.org</p>
              <p><strong className="text-[#C5A8D8] font-medium">Phone:</strong> +1 (555) 123-4567</p>
              <p><strong className="text-[#C5A8D8] font-medium">Address:</strong> 123 Grace Avenue, Sanctuary City, SC 12345</p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-5 lg:pl-8">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A987C2]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Programs', href: '/programs' },
                { label: 'Impact', href: '/impact' },
                { label: 'Resources', href: '/resources' },
                { label: 'News', href: '/news' },
                { label: 'Partnerships', href: '/partnerships' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#E8DDF0]/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Get Involved & Legal */}
          <div className="space-y-5">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A987C2]">
              Get Involved
            </h3>
            <ul className="space-y-3 mb-8">
              {[
                { label: 'Volunteer', href: '/get-involved#volunteer' },
                { label: 'Partner With Us', href: '/partnerships' },
                { label: 'Support Our Work', href: '/get-involved#support' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#E8DDF0]/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A987C2]">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-sm text-[#E8DDF0]/70 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-[#E8DDF0]/70 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Stay Connected & Social Media */}
          <div className="space-y-5">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A987C2]">
              Social Media
            </h3>
            <ul className="space-y-3 mb-8 flex flex-wrap gap-4">
              {[
                { label: 'Instagram', href: 'https://instagram.com', Icon: InstagramIcon },
                { label: 'Facebook', href: 'https://facebook.com', Icon: FacebookIcon },
                { label: 'TikTok', href: 'https://tiktok.com', Icon: TikTokIcon },
                { label: 'YouTube', href: 'https://youtube.com', Icon: YoutubeIcon },
                { label: 'LinkedIn', href: 'https://linkedin.com', Icon: LinkedinIcon },
              ].map((link) => {
                const IconComp = link.Icon;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-[#6E3A82]/30 text-[#E8DDF0]/70 hover:bg-[#6E3A82] hover:text-white hover:border-[#6E3A82] transition-all duration-300 shadow-sm"
                      aria-label={link.label}
                    >
                      <IconComp className="w-4 h-4" />
                    </a>
                  </li>
                );
              })}
            </ul>

            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A987C2]">
              Newsletter
            </h3>
            {subscribed ? (
              <div className="flex items-start gap-2 text-sm text-[#A987C2]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Thank you for joining our community.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2 max-w-xs">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <div className="flex">
                  <input
                    id="footer-email"
                    type="email"
                    required
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white/5 text-white placeholder-[#E8DDF0]/40 border border-[#6E3A82]/50 rounded-l-md focus:outline-none focus:border-[#A987C2] transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-[#6E3A82] hover:bg-[#8B4FA0] text-white px-3 py-2.5 rounded-r-md text-xs font-semibold transition-colors flex items-center justify-center border border-[#6E3A82]"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#E8DDF0]/40 gap-3">
          <p>
            © {new Date().getFullYear()} Devorah Women Foundation. All rights reserved.
          </p>
          <p className="italic text-[#E8DDF0]/30 font-serif text-xs">
            Empowering Women. Shaping Girls. Transforming Communities.
          </p>
        </div>

      </div>
    </footer>
  );
}
