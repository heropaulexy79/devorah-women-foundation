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
          ? 'bg-[#21122E]/40 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-lg shadow-black/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Devorah Women Foundation Logo"
              fill
              className="object-contain filter drop-shadow"
              priority
            />
          </div>
          <div className="hidden sm:flex flex-col justify-center">
            <span className="font-serif text-lg font-semibold tracking-widest leading-none text-white">
              DEVORAH
            </span>
            <span className="text-[8.5px] font-semibold tracking-[0.35em] uppercase mt-1 text-[#C5A8D8]">
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
                className={`px-3.5 py-1.5 text-[13px] font-medium tracking-wider uppercase transition-all duration-300 relative ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-white/85 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#C5A8D8] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center space-x-4">
          <Link
            href="/get-involved"
            className="hidden sm:inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-md bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md"
          >
            Get Involved
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[68px] bg-[#FAF8F5] border-b border-[#E8DDF0] shadow-2xl backdrop-blur-xl">
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
                      ? 'text-[#3B214F] font-semibold border-l-4 border-[#6E3A82] bg-[#F7F3F8]'
                      : 'text-[#242024]/80 hover:text-[#6E3A82] hover:bg-[#F7F3F8]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-5 border-t border-[#E8DDF0]">
              <Link
                href="/get-involved"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#6E3A82] text-white py-3.5 rounded-full font-semibold text-xs uppercase tracking-widest text-center shadow-md"
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
