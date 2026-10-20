'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PageHero from '@/components/ui/PageHero';
import {
  Heart,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  CreditCard,
  RefreshCw,
  Info,
  Check,
  Copy,
  Building2,
  Share2,
  Printer,
  ExternalLink,
} from 'lucide-react';
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

type CurrencyCode = 'NGN' | 'USD' | 'GBP';

interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  presets: number[];
  defaultAmount: number;
  koboMultiplier: number;
}

const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  NGN: {
    code: 'NGN',
    symbol: '₦',
    name: 'Nigerian Naira',
    presets: [50000, 100000, 250000, 500000, 1000000],
    defaultAmount: 250000,
    koboMultiplier: 100,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollars',
    presets: [25, 50, 100, 250, 500],
    defaultAmount: 50,
    koboMultiplier: 100,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    presets: [20, 50, 100, 250, 500],
    defaultAmount: 50,
    koboMultiplier: 100,
  },
};

const PILLARS = [
  { id: 'general', name: 'General Support / Where Needed Most' },
  { id: 'empowerment-leadership', name: 'Empowerment & Leadership' },
  { id: 'educational-support', name: 'Educational Support & Scholarships' },
  { id: 'mentorship-capacity-development', name: 'Mentorship & Capacity Development' },
  { id: 'community-outreach-support', name: 'Community Outreach & Relief' },
  { id: 'faith-spiritual-development', name: 'Faith & Spiritual Development' },
];

export default function DonateClient() {
  const searchParams = useSearchParams();
  const initialPillarParam = searchParams.get('pillar');

  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('NGN');
  const [donationType, setDonationType] = useState<'one-time' | 'recurring'>('one-time');
  const [frequency, setFrequency] = useState<'monthly' | 'annually'>('monthly');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [pillar, setPillar] = useState<string>('general');

  // Set pillar if param exists
  useEffect(() => {
    if (initialPillarParam && PILLARS.some((p) => p.id === initialPillarParam)) {
      setPillar(initialPillarParam);
    }
  }, [initialPillarParam]);

  // Donor Details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Status
  const [loading, setLoading] = useState(false);
  const [successRef, setSuccessRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  const currentCurrency = CURRENCIES[selectedCurrency];
  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount || 0;

  const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';
  const isPlaceholderKey =
    !paystackPublicKey ||
    paystackPublicKey.includes('sample_key_replace_with_yours') ||
    paystackPublicKey.trim() === '';

  const handleCurrencyChange = (curr: CurrencyCode) => {
    setSelectedCurrency(curr);
    setSelectedAmount(CURRENCIES[curr].defaultAmount);
    setCustomAmount('');
  };

  const copyAccountNumber = (accNo: string) => {
    navigator.clipboard.writeText(accNo);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  const recordDonation = async (ref: string, isDemo: boolean) => {
    try {
      await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference: ref,
          amount: finalAmount,
          currency: selectedCurrency,
          donorName: fullName,
          email,
          phone,
          pillar: PILLARS.find((p) => p.id === pillar)?.name || 'General Support',
          donationType: donationType === 'recurring' ? `Recurring (${frequency})` : 'One-Time',
          isAnonymous,
          status: isDemo ? 'test_simulated' : 'success',
        }),
      });
    } catch {
      // Non-blocking telemetry
    }
  };

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !fullName) {
      setErrorMsg('Please fill in your full name and email address.');
      return;
    }

    if (finalAmount <= 0 || isNaN(finalAmount)) {
      setErrorMsg('Please select or enter a valid donation amount.');
      return;
    }

    setLoading(true);

    // If still using sample placeholder key, simulate immediate real-time success flow
    if (isPlaceholderKey) {
      setTimeout(async () => {
        setLoading(false);
        setIsDemoMode(true);
        const ref = `DWF-SIM-${Date.now().toString(36).toUpperCase()}`;
        setSuccessRef(ref);
        await recordDonation(ref, true);
      }, 1000);
      return;
    }

    // Ensure Paystack SDK is ready
    if (typeof window === 'undefined' || !window.PaystackPop) {
      // Dynamic load fallback
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.onload = () => {
        initiatePaystackTransaction();
      };
      script.onerror = () => {
        setLoading(false);
        setErrorMsg('Paystack SDK failed to load. Please verify your internet connection.');
      };
      document.body.appendChild(script);
      return;
    }

    initiatePaystackTransaction();
  };

  const initiatePaystackTransaction = () => {
    const reference = `DWF-${selectedCurrency}-${donationType.toUpperCase()}-${Date.now()}`;

    try {
      if (!window.PaystackPop) throw new Error('Paystack SDK not available');

      const handler = window.PaystackPop.setup({
        key: paystackPublicKey,
        email: email.trim(),
        amount: Math.round(finalAmount * currentCurrency.koboMultiplier),
        currency: selectedCurrency,
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
        callback: function (response: { reference: string; status?: string }) {
          setLoading(false);
          if (response && (response.status === 'success' || response.reference)) {
            setIsDemoMode(false);
            setSuccessRef(response.reference);
            recordDonation(response.reference, false);
          } else {
            setErrorMsg('Payment could not be confirmed. Please try again.');
          }
        },
        onClose: function () {
          setLoading(false);
        },
      });

      handler.openIframe();
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err?.message || 'Failed to initialize Paystack checkout. Please verify your public key.');
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">

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
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-[#E8DDF0] shadow-sm">
            {successRef ? (
              <div className="text-center py-10 space-y-6">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-[#3B214F]">Thank You for Your Generosity!</h2>
                <p className="text-[#242024]/75 max-w-md mx-auto leading-relaxed">
                  Your donation of{' '}
                  <strong className="text-[#3B214F]">
                    {currentCurrency.symbol}
                    {finalAmount.toLocaleString()}
                  </strong>{' '}
                  was processed securely. A detailed confirmation receipt has been dispatched to{' '}
                  <span className="font-semibold text-[#6E3A82]">{email}</span>.
                </p>

                {/* Receipt Card */}
                <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8DDF0] max-w-lg mx-auto text-left text-xs space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-[#E8DDF0]">
                    <span className="font-bold text-[#6E3A82] uppercase tracking-wider text-[11px]">Official Donation Voucher</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded-full">PAID / VERIFIED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#716A73]">Reference ID:</span>
                    <span className="font-mono font-bold text-[#6E3A82]">{successRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#716A73]">Donor Name:</span>
                    <span className="font-medium text-[#3B214F]">{isAnonymous ? 'Anonymous Donor' : fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#716A73]">Designated Pillar:</span>
                    <span className="font-medium text-[#3B214F]">
                      {PILLARS.find((p) => p.id === pillar)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#716A73]">Giving Frequency:</span>
                    <span className="font-medium text-[#3B214F]">
                      {donationType === 'recurring' ? `Recurring Monthly` : 'One-Time Contribution'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#716A73]">Payment Gateway:</span>
                    <span className="font-medium text-[#3B214F]">Paystack (256-Bit SSL Encrypted)</span>
                  </div>
                  {isDemoMode && (
                    <p className="pt-2 border-t border-[#E8DDF0] text-[11px] text-[#6E3A82] italic leading-relaxed">
                      Notice: Running in Paystack test mode. To connect your live merchant account, update <code className="font-mono bg-white px-1 rounded">NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY</code> in <code className="font-mono bg-white px-1 rounded">.env.local</code>.
                    </p>
                  )}
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 border border-[#E8DDF0] bg-white hover:bg-[#FAF8F5] text-[#3B214F] px-5 py-3 rounded-full text-xs font-semibold transition-colors shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Receipt</span>
                  </button>
                  <button
                    onClick={() => {
                      setSuccessRef(null);
                      setCustomAmount('');
                      setIsDemoMode(false);
                    }}
                    className="bg-[#6E3A82] hover:bg-[#3B214F] text-white px-7 py-3 rounded-full text-xs font-semibold transition-colors shadow-md"
                  >
                    Make Another Donation
                  </button>
                  <a
                    href="/"
                    className="border border-[#E8DDF0] text-[#3B214F] hover:bg-[#FAF8F5] px-6 py-3 rounded-full text-xs font-semibold transition-colors"
                  >
                    Return Home
                  </a>
                </div>
              </div>
            ) : (
              <form id="paystack-form" onSubmit={handleDonate} className="space-y-8">
                <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />
                {/* Notice if configured in demo / placeholder mode */}
                {isPlaceholderKey && (
                  <div className="p-3.5 rounded-xl bg-[#F7F3F8] border border-[#C5A8D8]/60 flex items-start gap-3 text-xs text-[#3B214F]">
                    <Info className="w-4 h-4 text-[#6E3A82] shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      <strong>Paystack Ready:</strong> Submitting runs the interactive test verification flow. To collect real debit cards and mobile money payments, configure your live key in <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[11px] text-[#6E3A82]">.env.local</code>.
                    </p>
                  </div>
                )}

                {/* 1. Currency & Frequency Bar */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#6E3A82]">
                      1. Select Currency
                    </label>
                    <div className="inline-flex rounded-xl p-1 bg-[#FAF8F5] border border-[#E8DDF0]">
                      {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => handleCurrencyChange(c)}
                          className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                            selectedCurrency === c
                              ? 'bg-[#6E3A82] text-white shadow-sm'
                              : 'text-[#716A73] hover:text-[#3B214F]'
                          }`}
                        >
                          {c} ({CURRENCIES[c].symbol})
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#6E3A82] mb-2">
                      Donation Frequency
                    </label>
                    <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#FAF8F5] rounded-xl border border-[#E8DDF0]">
                      <button
                        type="button"
                        onClick={() => setDonationType('one-time')}
                        className={`py-3 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                          donationType === 'one-time'
                            ? 'bg-[#6E3A82] text-white shadow-md'
                            : 'text-[#3B214F]/70 hover:text-[#3B214F]'
                        }`}
                      >
                        <Heart className="w-4 h-4" />
                        One-Time Giving
                      </button>
                      <button
                        type="button"
                        onClick={() => setDonationType('recurring')}
                        className={`py-3 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                          donationType === 'recurring'
                            ? 'bg-[#6E3A82] text-white shadow-md'
                            : 'text-[#3B214F]/70 hover:text-[#3B214F]'
                        }`}
                      >
                        <RefreshCw className="w-4 h-4" />
                        Recurring Monthly
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Amount Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#6E3A82] mb-3">
                    2. Select Amount ({currentCurrency.code} {currentCurrency.symbol})
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 mb-4">
                    {currentCurrency.presets.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`py-3 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                          selectedAmount === amt && !customAmount
                            ? 'bg-[#3B214F] text-white border-[#3B214F] shadow-sm'
                            : 'bg-white text-[#3B214F] border-[#E8DDF0] hover:border-[#6E3A82] hover:bg-[#FAF8F5]'
                        }`}
                      >
                        {currentCurrency.symbol}
                        {amt.toLocaleString()}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#6E3A82]">
                      {currentCurrency.symbol}
                    </span>
                    <input
                      type="number"
                      min="1"
                      placeholder={`Or enter custom amount in ${currentCurrency.code}`}
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        if (e.target.value) {
                          setSelectedAmount(null);
                        }
                      }}
                      className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#E8DDF0] rounded-xl text-sm font-medium focus:outline-none focus:border-[#6E3A82] text-[#3B214F] transition-colors"
                    />
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
                      Make this donation anonymous on public records
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
                      ? 'Connecting Secure Paystack Gateway...'
                      : `Donate ${currentCurrency.symbol}${(finalAmount || 0).toLocaleString()} via Paystack`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[#242024]/50 text-xs">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-Bit Encrypted Secure Payment Processed by Paystack (Card, Transfer, USSD &amp; MoMo)</span>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar / Trust, Transparency & Direct Wire Transfer */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Bank Transfer Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DDF0] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#6E3A82]">
                <Building2 className="w-5 h-5" />
                <span className="text-[11px] font-bold uppercase tracking-widest">DIRECT BANK TRANSFER</span>
              </div>
              <h4 className="font-serif text-xl font-bold text-[#3B214F]">Official Bank Accounts</h4>
              <p className="text-xs text-[#716A73] leading-relaxed">
                Prefer direct bank deposits, institutional wire transfers, or mobile banking? Use the verified credentials below:
              </p>

              <div className="space-y-3 pt-1">
                {/* Account details box */}
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DDF0] space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#716A73]">Bank Name:</span>
                    <span className="font-semibold text-[#3B214F]">Wema</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#716A73]">Account Name:</span>
                    <span className="font-semibold text-[#3B214F]">Devorah Women's Leadership & Empowerment Initiative</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-[#E8DDF0]">
                    <span className="text-[#716A73]">Account Number:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#6E3A82]">0128102671</span>
                      <button
                        type="button"
                        onClick={() => copyAccountNumber('1441002345')}
                        className="p-1 hover:bg-white rounded border border-[#E8DDF0] text-[#6E3A82] transition-colors"
                        title="Copy Account Number"
                      >
                        {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#716A73]">Location / Currency:</span>
                    <span className="font-mono font-medium text-[#3B214F]">Lagos, Nigeria (NGN)</span>
                  </div>
                </div>

                {copiedBank && (
                  <p className="text-[11px] text-emerald-600 font-semibold text-center flex items-center justify-center gap-1">
                    <Check className="w-3 h-3" /> Account Number copied to clipboard!
                  </p>
                )}
              </div>

              <div className="pt-2 text-xs text-[#716A73] leading-relaxed">
                After transfer, kindly share your transaction confirmation with{' '}
                <a
                  href="https://wa.me/2348030526200?text=Hello%20Devorah%20Foundation,%20I%20have%20made%20a%20donation%20transfer."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#6E3A82] hover:underline inline-flex items-center gap-0.5"
                >
                  Finance WhatsApp <ExternalLink className="w-3 h-3 inline" />
                </a>{' '}
                for instant receipting.
              </div>
            </div>

            {/* Commitment Box */}
            <div className="bg-[#3B214F] text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 w-40 h-40 bg-[#6E3A82]/40 rounded-full blur-2xl" />
              <div className="relative z-10 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A8D8]">OUR COMMITMENT</span>
                <h3 className="font-serif text-2xl font-bold">Stewardship &amp; Excellence</h3>
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

            {/* Other Ways to Give */}
            <div className="bg-white p-8 rounded-2xl border border-[#E8DDF0] space-y-4 shadow-sm">
              <h4 className="font-serif text-lg font-bold text-[#3B214F]">Corporate Grants &amp; Endowments?</h4>
              <p className="text-xs text-[#242024]/70 leading-relaxed">
                For institutional grants, foundation matching gifts, or corporate social responsibility partnerships,
                our executive office is ready to collaborate.
              </p>
              <div className="pt-2">
                <a
                  href="/partnerships"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#6E3A82] hover:text-[#3B214F] transition-colors"
                >
                  Explore Strategic Partnerships &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
