'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/programs', label: 'Programs' },
  { href: '/impact', label: 'Impact' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/resources', label: 'Resources' },
  { href: '/stories', label: 'Stories' },
  { href: '/partnerships', label: 'Partnerships' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#FCFCF7]/95 backdrop-blur-xl border-b border-[#BCA1CD]/30 py-3 shadow-md shadow-[#642B80]/5'
          : 'bg-transparent py-4'
      }`}
    >
      {/* Skip to Content Link for Keyboard Accessibility (WCAG 2.2 AA) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#642B80] focus:text-white focus:rounded-sm font-semibold text-xs uppercase tracking-widest focus:ring-2 focus:ring-white focus:outline-none shadow-xl"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group focus-visible:ring-2 focus-visible:ring-[#BCA1CD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0f22] focus-visible:outline-none rounded-sm" aria-label="Devorah Women's Foundation Home">
          <div className="relative w-36 h-12 sm:w-44 sm:h-14 lg:w-48 lg:h-16 transition-transform duration-300 group-hover:scale-105">
            <Image
              src={scrolled ? '/Logo-Purple.png' : '/Logo-white.png'}
              alt="Devorah Women's Leadership & Empowerment Initiative"
              fill
              className="object-contain object-left filter drop-shadow"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 text-[13px] font-medium tracking-wider uppercase transition-all duration-300 relative rounded-sm focus-visible:ring-2 focus-visible:ring-[#BCA1CD] focus-visible:outline-none ${
                  isActive
                    ? (scrolled ? 'text-[#642B80] font-bold' : 'text-white font-semibold')
                    : (scrolled ? 'text-[#242024]/80 hover:text-[#642B80]' : 'text-white/85 hover:text-white')
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#BCA1CD] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link
            href="/donate"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-md bg-[#642B80] hover:bg-[#3B214F] text-white border border-[#BCA1CD]/30 focus-visible:ring-2 focus-visible:ring-[#BCA1CD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0f22] focus-visible:outline-none"
          >
            <Heart className="w-3.5 h-3.5 fill-white/20 text-white" />
            <span>Donate</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-[#BCA1CD] focus-visible:outline-none ${scrolled ? "text-[#642B80] hover:bg-[#642B80]/10" : "text-white hover:bg-white/10"}`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[68px] bg-[#FCFCF7] border-b border-[#E8DDF0] shadow-2xl backdrop-blur-xl">
          <div className="px-6 pt-5 pb-8 space-y-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-md text-sm font-medium tracking-wider uppercase transition-colors ${
                    isActive
                      ? 'text-[#3B214F] font-semibold border-l-4 border-[#642B80] bg-[#F7F3F8]'
                      : 'text-[#242024]/80 hover:text-[#642B80] hover:bg-[#F7F3F8]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-5 border-t border-[#E8DDF0] space-y-2.5">
              <Link
                href="/donate"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#642B80] hover:bg-[#3B214F] text-white py-3.5 rounded-full font-semibold text-xs uppercase tracking-widest text-center shadow-md transition-colors"
              >
                <Heart className="w-4 h-4 fill-white/20 text-white" />
                <span>Donate Now</span>
              </Link>
              <Link
                href="/get-involved"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 border border-[#642B80]/30 text-[#3B214F] hover:bg-[#F7F3F8] py-3 rounded-full font-semibold text-xs uppercase tracking-widest text-center transition-colors"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
