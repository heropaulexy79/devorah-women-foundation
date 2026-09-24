'use client';

import React, { useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import CTASection from '@/components/sections/CTASection';
import PageHero from '@/components/ui/PageHero';
import { Building2, CheckCircle2, Clock, Mail, MapPin, Phone, Send, Share2, Globe } from 'lucide-react';

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
      <PageHero
        eyebrow="CONTACT DEVORAH WOMEN FOUNDATION"
        title="We would love to hear from you."
        description="Reach out for general inquiries, partnership proposals, media requests, or volunteer interest."
        breadcrumb={[{ label: 'Contact Us' }]}
      />

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
                  <p className="text-xs text-[#716A73]">Administrative Support Line</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#E8DDF0] shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#E8DDF0] flex items-center justify-center text-[#6E3A82] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase font-semibold text-[#6E3A82]">Office Hours</h3>
                  <p className="text-sm font-bold text-[#3B214F] mt-0.5">Monday – Friday</p>
                  <p className="text-xs text-[#716A73]">9:00 AM – 5:00 PM GMT</p>
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

              {/* Social Media Handles */}
              <div className="p-6 rounded-2xl bg-[#F7F3F8] border border-[#E8DDF0] space-y-3">
                <h4 className="text-xs uppercase font-bold text-[#6E3A82] tracking-wider">Follow Our Social Handles</h4>
                <div className="flex items-center gap-3">
                  <a href="#" className="w-9 h-9 rounded-full bg-white border border-[#E8DDF0] flex items-center justify-center text-[#3B214F] hover:bg-[#6E3A82] hover:text-white transition-colors" title="Facebook">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full bg-white border border-[#E8DDF0] flex items-center justify-center text-[#3B214F] hover:bg-[#6E3A82] hover:text-white transition-colors" title="Instagram">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full bg-white border border-[#E8DDF0] flex items-center justify-center text-[#3B214F] hover:bg-[#6E3A82] hover:text-white transition-colors" title="Twitter/X">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full bg-white border border-[#E8DDF0] flex items-center justify-center text-[#3B214F] hover:bg-[#6E3A82] hover:text-white transition-colors" title="LinkedIn">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
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

        {/* Location Map Section */}
        <div className="mt-16 bg-white p-4 rounded-3xl border border-[#E8DDF0] shadow-md overflow-hidden">
          <div className="p-4 border-b border-[#E8DDF0] mb-4">
            <h3 className="font-serif text-xl font-bold text-[#3B214F]">Foundation Location</h3>
            <p className="text-xs text-[#716A73]">Accra Headquarters, Greater Accra Region, Ghana</p>
          </div>
          <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-[#3B214F]/10 flex items-center justify-center">
            <iframe
              title="Devorah Foundation Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254148.07722741544!2d-0.3013898863618641!3d5.591238676239109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
