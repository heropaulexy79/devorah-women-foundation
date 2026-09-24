'use client';

import React, { useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/sections/CTASection';
import PageHero from '@/components/ui/PageHero';
import { PARTNERS } from '@/lib/data';
import { Building2, CheckCircle2, HeartHandshake, Mail, Phone, Send, ShieldCheck, Sparkles, User, Globe2, GraduationCap, Church, Users } from 'lucide-react';

const POTENTIAL_PARTNERS = [
  { name: 'Individuals & Donors', icon: User, desc: 'Support educational grants and female scholarships.' },
  { name: 'Businesses & Corporations', icon: Building2, desc: 'Co-sponsor programs and drive CSR initiatives.' },
  { name: 'Churches & Ministry Networks', icon: Church, desc: 'Mobilize spiritual renewal and mentorship.' },
  { name: 'NGOs & Civil Foundations', icon: HeartHandshake, desc: 'Collaborate on regional field advocacy.' },
  { name: 'Government Agencies', icon: Globe2, desc: 'Institutional policy alignment and civic reach.' },
  { name: 'Educational Institutions', icon: GraduationCap, desc: 'University exchanges and school leadership hubs.' },
];

const PARTNERSHIP_OPPORTUNITIES = [
  'Financial Support',
  'Program Sponsorship',
  'Resource Donations',
  'Strategic Partnerships',
  'Event Partnerships',
  'Corporate Partnerships',
  'Volunteer Support',
  'Professional Expertise'
];

export default function PartnershipsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    partnershipType: PARTNERSHIP_OPPORTUNITIES[0],
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      
      {/* Header Banner */}
      <PageHero
        eyebrow="INSTITUTIONAL PARTNERSHIPS"
        title="Together, We Can Create Greater Impact."
        description="We collaborate with corporate foundations, international non-profits, churches, government entities, and inspired individuals to scale sustainable empowerment."
        breadcrumb={[{ label: 'Partnerships' }]}
      />

      {/* Who Can Partner Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="POTENTIAL PARTNERS"
          title="Who Can Partner With Devorah Foundation"
          centered
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POTENTIAL_PARTNERS.map((partner, idx) => {
            const IconComp = partner.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#E8DDF0] shadow-sm hover:border-[#6E3A82] transition-colors space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F4ECF7] text-[#6E3A82] flex items-center justify-center">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#3B214F]">{partner.name}</h3>
                <p className="text-xs text-[#716A73] leading-relaxed">{partner.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Partnership Opportunities Grid */}
      <section className="py-16 bg-[#F7F3F8] border-y border-[#E8DDF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            eyebrow="COLLABORATIVE OPPORTUNITIES"
            title="Partnership Pathways & Engagement Models"
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PARTNERSHIP_OPPORTUNITIES.map((type, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#E8DDF0] shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#6E3A82]">OPPORTUNITY 0{idx + 1}</span>
                  <h4 className="font-serif text-base font-bold text-[#3B214F]">{type}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logos Showcase */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6E3A82]">
          OUR INSTITUTIONAL ALLIANCES & PARTNER LOGOS
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="p-5 rounded-2xl bg-white border border-[#E8DDF0] text-[#3B214F] font-serif font-bold text-sm shadow-sm flex items-center justify-center h-24 text-center"
            >
              {partner.name}
            </div>
          ))}
        </div>
      </section>

      {/* Partnership Inquiry Form */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E8DDF0] shadow-xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#6E3A82]">PARTNERSHIP ENQUIRY FORM</span>
            <h2 className="font-serif text-3xl font-bold text-[#3B214F]">Together, We Can Create Greater Impact.</h2>
            <p className="text-sm text-[#716A73]">Fill out the institutional form below and our partnership team will connect with you within 24–48 hours.</p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#E8DDF0]/60 border border-[#A987C2] text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#6E3A82] mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-[#3B214F]">Partnership Inquiry Received</h3>
              <p className="text-sm text-[#716A73] max-w-md mx-auto">
                Thank you for reaching out. A senior representative from Devorah Women Foundation will review your submission and contact you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="inline-block text-xs font-semibold text-[#6E3A82] underline pt-2"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#3B214F] mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DDF0] bg-[#FAF8F5] text-sm focus:outline-none focus:border-[#6E3A82]"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#3B214F] mb-2">Organisation / Company *</label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DDF0] bg-[#FAF8F5] text-sm focus:outline-none focus:border-[#6E3A82]"
                    placeholder="Organisation Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#3B214F] mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DDF0] bg-[#FAF8F5] text-sm focus:outline-none focus:border-[#6E3A82]"
                    placeholder="office@organisation.org"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#3B214F] mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DDF0] bg-[#FAF8F5] text-sm focus:outline-none focus:border-[#6E3A82]"
                    placeholder="+233 ..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#3B214F] mb-2">Type of Partnership *</label>
                <select
                  value={formData.partnershipType}
                  onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8DDF0] bg-[#FAF8F5] text-sm focus:outline-none focus:border-[#6E3A82]"
                >
                  {PARTNERSHIP_OPPORTUNITIES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#3B214F] mb-2">Partnership Message / Proposal *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8DDF0] bg-[#FAF8F5] text-sm focus:outline-none focus:border-[#6E3A82]"
                  placeholder="Outline your proposal or strategic area of collaboration..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#6E3A82] hover:bg-[#3B214F] text-white py-4 rounded-xl font-bold text-base shadow-md transition-colors"
              >
                <Send className="w-5 h-5" />
                <span>Submit Partnership Proposal</span>
              </button>
            </form>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
