import React from 'react';
import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions governing the use of the Devorah Women Foundation website and donation portal.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      <PageHero
        eyebrow="LEGAL & TRANSPARENCY"
        title="Terms & Conditions"
        description="Please review the terms and conditions guiding our online platform, donor contributions, and organizational programs."
        breadcrumb={[{ label: 'Terms & Conditions' }]}
      />

      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E8DDF0] shadow-sm space-y-8 text-[#524C55] leading-relaxed text-sm">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#6E3A82] font-bold">Effective Date</span>
            <p className="text-sm font-semibold text-[#3B214F] mt-1">January 1, 2026</p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#3B214F]">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Devorah Women Foundation website (devorahwomen.org), you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use our services.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#3B214F]">2. Non-Profit Mission &amp; Purpose</h2>
            <p>
              Devorah Women Foundation is a registered non-governmental organization headquartered in Lagos, Nigeria. Our mission is dedicated to raising spiritually grounded, purpose-driven, and socially impactful women and girls through educational scholarships, leadership development, mentorship, and faith-anchored community outreach.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#3B214F]">3. Donations &amp; Financial Contributions</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>All donations made to Devorah Women Foundation are voluntary contributions supporting our charitable objectives and designated program pillars.</li>
              <li>Donations are processed securely through accredited payment partners including Paystack.</li>
              <li>While donations are generally non-refundable once deployed to field initiatives, inquiries regarding mistaken or duplicate transactions can be directed to womendevorah@gmail.com within 7 days of the transaction.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#3B214F]">4. Intellectual Property</h2>
            <p>
              All materials, photographs, stories, reports, logos, and branding on this website are the property of Devorah Women Foundation or used with appropriate permissions. Unauthorized reproduction, modification, or commercial distribution is prohibited without prior written consent.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#3B214F]">5. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#3B214F]">6. Inquiries &amp; Support</h2>
            <p>
              For legal inquiries or questions regarding our operational policies:
            </p>
            <p className="text-xs bg-[#FAF8F5] p-4 rounded-xl border border-[#E8DDF0] text-[#3B214F]">
              <strong>Email:</strong> womendevorah@gmail.com<br />
              <strong>Phone:</strong> 08030526200<br />
              <strong>Address:</strong> No 14, Esubiyi Street, Mende, Maryland, Lagos State, Nigeria
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
