import React from 'react';
import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Devorah Women Foundation. Learn how we safeguard your personal information and maintain transparency.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      <PageHero
        eyebrow="LEGAL & TRANSPARENCY"
        title="Privacy Policy"
        description="We are committed to safeguarding your personal data, donor records, and privacy with the highest standards of integrity."
        breadcrumb={[{ label: 'Privacy Policy' }]}
      />

      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E8DDF0] shadow-sm space-y-8 text-[#524C55] leading-relaxed text-sm">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#6E3A82] font-bold">Effective Date</span>
            <p className="text-sm font-semibold text-[#3B214F] mt-1">January 1, 2026</p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#3B214F]">1. Information We Collect</h2>
            <p>
              When you interact with Devorah Women Foundation through our website, donate, volunteer, or subscribe to our newsletter, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Contact details such as your full name, email address, and phone number.</li>
              <li>Donation transaction details (processed securely via PCI-DSS certified gateways such as Paystack). We do not store credit card or bank card details on our servers.</li>
              <li>Inquiry or partnership information submitted through our direct forms.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#3B214F]">2. How We Use Your Information</h2>
            <p>We use your information strictly for legitimate organizational and philanthropic purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Processing donations, delivering official vouchers, and issuing donor stewardship updates.</li>
              <li>Responding to partnership proposals, volunteer applications, and inquiries.</li>
              <li>Sending newsletters and announcements regarding our programs, conferences, and impact reports (you may unsubscribe at any time).</li>
              <li>Complying with statutory reporting requirements for registered non-governmental organizations in Nigeria.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#3B214F]">3. Payment Processing &amp; Security</h2>
            <p>
              Online transactions are securely handled by <strong>Paystack</strong>, a licensed and PCI-DSS Level 1 compliant payment processor. All payment data is encrypted using 256-bit SSL protocols.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#3B214F]">4. Sharing of Information</h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties. We may share data only with verified service providers who assist in operating our website and services under strict confidentiality agreements.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#3B214F]">5. Contact Us</h2>
            <p>
              If you have any questions or requests regarding your personal information, please contact our administration team:
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
