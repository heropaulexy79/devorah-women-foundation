'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/programs', label: 'Programs' },
  { href: '/impact', label: 'Impact' },
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
          ? 'bg-[#FAF8F5]/95 backdrop-blur-lg border-b border-[#E8DDF0]/60 py-3'
          : 'bg-gradient-to-b from-[#1a0f22]/50 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="relative w-12 h-12 transition-opacity duration-300 group-hover:opacity-80">
            <Image
              src="/logo.png"
              alt="Devorah Women Foundation Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="hidden sm:flex flex-col">
            <span
              className={`font-serif text-[1.05rem] font-bold tracking-wider leading-none transition-colors duration-300 ${
                scrolled ? 'text-[#3B214F]' : 'text-white'
              }`}
            >
              DEVORAH
            </span>
            <span
              className={`text-[9px] font-semibold tracking-[0.3em] uppercase mt-1 transition-colors duration-300 ${
                scrolled ? 'text-[#6E3A82]' : 'text-[#C5A8D8]'
              }`}
            >
              WOMEN FOUNDATION
            </span>
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
                className={`px-3 py-2 text-[0.875rem] font-medium tracking-wide transition-all duration-200 relative ${
                  scrolled
                    ? isActive
                      ? 'text-[#6E3A82]'
                      : 'text-[#242024]/75 hover:text-[#6E3A82]'
                    : isActive
                    ? 'text-white'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-current" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center space-x-4">
          <Link
            href="/get-involved"
            className={`hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-sm text-sm font-semibold tracking-wide transition-all duration-300 ${
              scrolled
                ? 'bg-[#6E3A82] hover:bg-[#3B214F] text-white'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm'
            }`}
          >
            Get Involved
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2.5 rounded-sm transition-colors focus:outline-none ${
              scrolled
                ? 'text-[#3B214F] hover:bg-[#E8DDF0]/50'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[64px] bg-[#FAF8F5] border-b border-[#E8DDF0] shadow-xl">
          <div className="px-4 pt-4 pb-6 space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-base font-medium transition-colors ${
                    isActive
                      ? 'text-[#3B214F] font-semibold border-l-2 border-[#6E3A82] bg-[#F7F3F8]'
                      : 'text-[#242024] hover:text-[#6E3A82] hover:bg-[#F7F3F8]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-[#E8DDF0]">
              <Link
                href="/get-involved"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#6E3A82] text-white py-3.5 rounded-sm font-semibold text-center tracking-wide"
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
