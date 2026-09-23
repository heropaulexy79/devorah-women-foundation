'use client';

import React, { useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/sections/CTASection';
import { Building2, CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react';

const REASON_CATEGORIES = [
  'General Enquiry',
  'Partnership',
  'Volunteering',
  'Programs',
  'Media / Press',
  'Events',
  'Other'
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    reason: REASON_CATEGORIES[0],
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
      <section className="py-20 bg-gradient-to-b from-[#F7F3F8] to-[#FAF8F5] border-b border-[#E8DDF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-[#E8DDF0] text-[#6E3A82] text-xs font-semibold uppercase tracking-widest">
            CONTACT DEVORAH WOMEN FOUNDATION
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3B214F]">
            We would love to hear from you.
          </h1>
          <p className="text-base sm:text-lg text-[#716A73] max-w-2xl mx-auto leading-relaxed">
            Reach out for general inquiries, partnership proposals, media requests, or volunteer interest.
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Info & Form */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Official Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#3B214F]">Foundation Offices</h2>
              <p className="text-sm text-[#716A73] mt-2 leading-relaxed">
                Connect directly with our administration team during standard office hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#E8DDF0] shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#E8DDF0] flex items-center justify-center text-[#6E3A82] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase font-semibold text-[#6E3A82]">Email Inquiries</h3>
                  <p className="text-sm font-bold text-[#3B214F] mt-0.5">info@devorahwomen.org</p>
                  <p className="text-xs text-[#716A73]">partnerships@devorahwomen.org</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#E8DDF0] shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#E8DDF0] flex items-center justify-center text-[#6E3A82] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase font-semibold text-[#6E3A82]">Telephone</h3>
                  <p className="text-sm font-bold text-[#3B214F] mt-0.5">+233 (0) 302 000 000</p>
                  <p className="text-xs text-[#716A73]">Monday – Friday (9:00 AM – 5:00 PM GMT)</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#E8DDF0] shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#E8DDF0] flex items-center justify-center text-[#6E3A82] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase font-semibold text-[#6E3A82]">Headquarters Address</h3>
                  <p className="text-sm font-bold text-[#3B214F] mt-0.5">Devorah Women Foundation Headquarters</p>
                  <p className="text-xs text-[#716A73]">Greater Accra Region, Ghana</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#E8DDF0] shadow-xl">
            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#E8DDF0]/60 border border-[#A987C2] text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#6E3A82] mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-[#3B214F]">Message Sent Successfully</h3>
                <p className="text-sm text-[#716A73] max-w-md mx-auto">
                  Thank you for reaching out to Devorah Women Foundation. Our support team will review your inquiry and get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-block text-xs font-semibold text-[#6E3A82] underline pt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-serif text-2xl font-bold text-[#3B214F]">Send a Direct Message</h3>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#3B214F] mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DDF0] bg-[#FAF8F5] text-sm focus:outline-none focus:border-[#6E3A82]"
                    placeholder="Your Full Name"
                  />
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
                      placeholder="your.email@domain.com"
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
                  <label className="block text-xs font-semibold uppercase text-[#3B214F] mb-2">Subject / Category *</label>
                  <select
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DDF0] bg-[#FAF8F5] text-sm focus:outline-none focus:border-[#6E3A82]"
                  >
                    {REASON_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#3B214F] mb-2">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DDF0] bg-[#FAF8F5] text-sm focus:outline-none focus:border-[#6E3A82]"
                    placeholder="How can we assist or collaborate with you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#6E3A82] hover:bg-[#3B214F] text-white py-4 rounded-xl font-bold text-base shadow-md transition-colors"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      <CTASection />
    </div>
  );
}
