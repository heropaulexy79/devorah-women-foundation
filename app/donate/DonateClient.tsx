'use client';

import React, { useState } from 'react';
import PageHero from '@/components/ui/PageHero';
import { Heart, ShieldCheck, Sparkles, CheckCircle2, Lock, ArrowRight, CreditCard, RefreshCw } from 'lucide-react';
import Script from 'next/script';

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: {
        key: string;
        email: string;
        amount: number;
        currency?: string;
        plan?: string;
        ref?: string;
        metadata?: Record<string, any>;
        callback: (response: { reference: string; status: string }) => void;
        onClose: () => void;
      }) => {
        openIframe: () => void;
      };
    };
  }
}

const PRESET_AMOUNTS = [50000, 100000, 250000, 500000, 1000000];

const PILLARS = [
  { id: 'general', name: 'General Support / Where Needed Most' },
  { id: 'empowerment-leadership', name: 'Empowerment & Leadership' },
  { id: 'educational-support', name: 'Educational Support' },
  { id: 'mentorship-capacity-development', name: 'Mentorship & Capacity Development' },
  { id: 'community-outreach-support', name: 'Community Outreach & Support' },
  { id: 'faith-spiritual-development', name: 'Faith & Spiritual Development' },
];

export default function DonateClient() {
  const [donationType, setDonationType] = useState<'one-time' | 'recurring'>('one-time');
  const [frequency, setFrequency] = useState<'monthly' | 'annually'>('monthly');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [pillar, setPillar] = useState<string>('general');

  // Donor Details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Status
  const [loading, setLoading] = useState(false);
  const [successRef, setSuccessRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount || 0;

  const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !fullName) {
      setErrorMsg('Please fill in your name and email address.');
      return;
    }

    if (finalAmount <= 0 || isNaN(finalAmount)) {
      setErrorMsg('Please select or enter a valid donation amount.');
      return;
    }

    if (!paystackPublicKey) {
      setErrorMsg(
        'Paystack Public Key is missing in your environment configuration (NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY). Please add your Paystack API key in .env.local.'
      );
      return;
    }

    if (typeof window === 'undefined' || !window.PaystackPop) {
      setErrorMsg('Paystack SDK failed to load. Please refresh the page and try again.');
      return;
    }

    setLoading(true);

    const reference = `DWF-${donationType.toUpperCase()}-${Date.now()}`;

    const handler = window.PaystackPop.setup({
      key: paystackPublicKey,
      email: email.trim(),
      amount: Math.round(finalAmount * 100), // Paystack expects amount in Kobo
      currency: 'NGN',
      ref: reference,
      metadata: {
        custom_fields: [
          { display_name: 'Full Name', variable_name: 'full_name', value: fullName },
          { display_name: 'Phone Number', variable_name: 'phone_number', value: phone },
          {
            display_name: 'Donation Type',
            variable_name: 'donation_type',
            value: donationType === 'recurring' ? `Recurring (${frequency})` : 'One-Time',
          },
          {
            display_name: 'Pillar Focus',
            variable_name: 'pillar_focus',
            value: PILLARS.find((p) => p.id === pillar)?.name || 'General Support',
          },
          { display_name: 'Anonymous Donor', variable_name: 'is_anonymous', value: isAnonymous ? 'Yes' : 'No' },
        ],
      },
      callback: (response) => {
        setLoading(false);
        if (response.status === 'success' || response.reference) {
          setSuccessRef(response.reference);
        } else {
          setErrorMsg('Payment could not be completed. Please try again.');
        }
      },
      onClose: () => {
        setLoading(false);
      },
    });

    handler.openIframe();
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      {/* Load Paystack Inline Script */}
      <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />

      {/* Hero Header */}
      <PageHero
        eyebrow="PARTNER IN IMPACT"
        title="Fuel the movement empowering women & girls."
        description="Your support unlocks micro-grants, educational scholarships, leadership training, and holistic mentorship for underserved women."
        breadcrumb={[{ label: 'Donate' }]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Donation Form Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-[#E8DDF0] shadow-sm">
            {successRef ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-[#3B214F]">Thank You for Your Generosity!</h2>
                <p className="text-[#242024]/75 max-w-md mx-auto leading-relaxed">
                  Your transaction was successful. Reference ID:{' '}
                  <span className="font-mono font-bold text-[#6E3A82]">{successRef}</span>. A receipt has been
                  dispatched to your email address.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSuccessRef(null);
                      setCustomAmount('');
                    }}
                    className="bg-[#6E3A82] hover:bg-[#3B214F] text-white px-8 py-3.5 rounded-full text-sm font-semibold transition-colors shadow-md"
                  >
                    Make Another Donation
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDonate} className="space-y-8">
                {/* 1. Frequency Toggle */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#6E3A82] mb-3">
                    1. Select Donation Frequency
                  </label>
                  <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#FAF8F5] rounded-2xl border border-[#E8DDF0]">
                    <button
                      type="button"
                      onClick={() => setDonationType('one-time')}
                      className={`py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                        donationType === 'one-time' ? 'bg-[#6E3A82] text-white shadow-md' : 'text-[#3B214F]/70 hover:text-[#3B214F]'
                      }`}
                    >
                      <Heart className="w-4 h-4" />
                      One-Time Giving
                    </button>
                    <button
                      type="button"
                      onClick={() => setDonationType('recurring')}
                      className={`py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                        donationType === 'recurring' ? 'bg-[#6E3A82] text-white shadow-md' : 'text-[#3B214F]/70 hover:text-[#3B214F]'
                      }`}
                    >
                      <RefreshCw className="w-4 h-4" />
                      Recurring Monthly
                    </button>
                  </div>
                </div>

                {/* 2. Amount Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#6E3A82] mb-3">
                    2. Select Amount (NGN ₦)
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-2.5 mb-4">
                    {PRESET_AMOUNTS.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        disabled={!!customAmount}
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`py-3 rounded-xl border text-sm font-bold transition-all ${
                          selectedAmount === amt && !customAmount
                            ? 'bg-[#3B214F] text-white border-[#3B214F] shadow-sm'
                            : 'bg-white text-[#3B214F] border-[#E8DDF0] hover:border-[#6E3A82]'
                        } disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#E8DDF0]`}
                      >
                        ₦{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <span
                        className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold transition-colors ${
                          selectedAmount !== null ? 'text-[#3B214F]/40' : 'text-[#3B214F]'
                        }`}
                      >
                        ₦
                      </span>
                      <input
                        type="number"
                        disabled={selectedAmount !== null}
                        placeholder={
                          selectedAmount !== null
                            ? `₦${selectedAmount.toLocaleString()} selected`
                            : 'Enter custom amount (NGN)'
                        }
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl text-sm font-medium focus:outline-none focus:border-[#6E3A82] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div className="flex justify-end">
                      {selectedAmount !== null && (
                        <button
                          type="button"
                          onClick={() => setSelectedAmount(null)}
                          className="text-xs font-semibold text-[#6E3A82] hover:text-[#3B214F] underline px-3 py-1.5 bg-white rounded-lg border border-[#E8DDF0] transition-colors"
                        >
                          Enter custom amount
                        </button>
                      )}
                      {customAmount && (
                        <button
                          type="button"
                          onClick={() => {
                            setCustomAmount('');
                            setSelectedAmount(25000);
                          }}
                          className="text-xs font-semibold text-[#6E3A82] hover:text-[#3B214F] underline px-3 py-1.5 bg-white rounded-lg border border-[#E8DDF0] transition-colors"
                        >
                          Use preset amounts
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Designation/Pillar */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#6E3A82] mb-3">
                    3. Direct Your Impact
                  </label>
                  <select
                    value={pillar}
                    onChange={(e) => setPillar(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl text-sm font-medium focus:outline-none focus:border-[#6E3A82] transition-colors text-[#3B214F]"
                  >
                    {PILLARS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. Donor Information */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#6E3A82] mb-3">
                    4. Donor Details
                  </label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl text-sm font-medium focus:outline-none focus:border-[#6E3A82] transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Email Address (for official receipt) *"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl text-sm font-medium focus:outline-none focus:border-[#6E3A82] transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number (Optional)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl text-sm font-medium focus:outline-none focus:border-[#6E3A82] transition-colors"
                    />
                    <label className="flex items-center gap-2.5 text-xs text-[#242024]/70 pt-1 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded text-[#6E3A82] focus:ring-[#6E3A82] w-4 h-4"
                      />
                      Make this donation anonymous
                    </label>
                  </div>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs leading-relaxed font-medium">
                    {errorMsg}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#6E3A82] hover:bg-[#3B214F] text-white py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 cursor-pointer"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>
                    {loading
                      ? 'Initializing Secure Paystack...'
                      : `Donate ₦${(finalAmount || 0).toLocaleString()} via Paystack`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[#242024]/50 text-xs">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-Bit Encrypted Secure Payment Processed by Paystack</span>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar / Trust & Transparency */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#3B214F] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 w-40 h-40 bg-[#6E3A82]/40 rounded-full blur-2xl" />
              <div className="relative z-10 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A8D8]">OUR COMMITMENT</span>
                <h3 className="font-serif text-2xl font-bold">Stewardship & Excellence</h3>
                <p className="text-sm text-[#E8DDF0]/80 leading-relaxed">
                  100% of public donations directly fund our local outreach centers, scholar stipends, and enterprise
                  startup kits.
                </p>
                <ul className="space-y-3 pt-2 text-xs text-[#E8DDF0]/90">
                  <li className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#C5A8D8]" />
                    Audited financial reporting and governance
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#C5A8D8]" />
                    Direct mentorship tracking for every beneficiary
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#E8DDF0] space-y-4 shadow-sm">
              <h4 className="font-serif text-lg font-bold text-[#3B214F]">Other Ways to Give?</h4>
              <p className="text-xs text-[#242024]/70 leading-relaxed">
                For bank transfers, corporate grants, legacy giving, or physical asset contributions, please connect
                directly with our finance team.
              </p>
              <div className="pt-2">
                <a
                  href="/contact?reason=Donations"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#6E3A82] hover:text-[#3B214F] transition-colors"
                >
                  Contact Financial Services &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
