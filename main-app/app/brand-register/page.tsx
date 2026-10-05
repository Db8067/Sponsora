'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SellerNavbar from '@/components/SellerNavbar';
import {
  CheckCircle2, ArrowRight, Loader2, Rocket,
  Store, User, Phone, Mail, Receipt, Tag, Link as LinkIcon
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

const CATEGORIES = [
  { emoji: '✨', label: 'Ayurvedic & Skincare' },
  { emoji: '💎', label: 'Handcrafted Jewelry' },
  { emoji: '☕', label: 'Gourmet Food & Coffee' },
  { emoji: '🌿', label: 'Handloom Apparel' },
  { emoji: '🏺', label: 'Ceramic & Home Decor' },
  { emoji: '🧁', label: 'Bakery & Sweets' },
  { emoji: '🪴', label: 'Plants & Wellness' },
  { emoji: '🎨', label: 'Art & Illustration' },
];

export default function BrandRegisterPage() {
  const [founderName, setFounderName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gstStatus, setGstStatus] = useState<'yes' | 'no'>('no');
  const [gstin, setGstin] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [storeLink, setStoreLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const { error: dbError } = await supabase.from('brand_registrations').insert({
        founder_name: founderName.trim(),
        brand_name: brandName.trim(),
        email: email.trim().toLowerCase(),
        whatsapp_number: phone.trim(),
        gst_status: gstStatus,
        gstin: gstin.trim().toUpperCase() || null,
        category: selectedCategory || null,
        store_link: storeLink.trim() || null,
      });

      if (dbError) throw dbError;
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Registration error:', err);
      setError('Something went wrong. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <SellerNavbar />
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-md mx-auto bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-pink-100 dark:border-white/10 rounded-3xl p-10 shadow-xl">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-3">
              You&apos;re on the Launchpad! 🚀
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              <span className="font-bold text-primary">{brandName}</span> has been registered. Our team will reach you on WhatsApp within 24 hours to set up your ₹10 micro-offer.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mb-8">
              Zero platform commission. 100% of every rupee goes straight to your UPI.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/25">
              Back to Homepage <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SellerNavbar />

      <main className="flex-1 py-10 px-4">
        <div className="max-w-7xl mx-auto">

          {/* — Announcement Banner — */}
          <div className="bg-gradient-to-r from-pink-100/60 via-pink-50/30 to-transparent border border-pink-200/50 dark:border-white/10 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm shadow-primary/30">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-primary text-white">
                    Launchpad
                  </span>
                  <span className="text-xs font-bold text-primary">Founders Launchpad • 14-Day Zero-Fee Sandbox</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Turn social scrollers into direct WhatsApp orders with ₹10 intent tokens. Zero platform commission.
                </p>
              </div>
            </div>
            {/* 2-step progress */}
            <div className="flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-pink-100 dark:border-white/10 shadow-sm self-start md:self-auto shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center ring-4 ring-primary/15">1</div>
                <span className="text-xs font-bold text-slate-800 dark:text-white">Brand Intake</span>
              </div>
              <div className="w-8 h-0.5 bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="flex items-center gap-2 opacity-50">
                <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 text-[11px] font-bold flex items-center justify-center">2</div>
                <span className="text-xs font-medium text-slate-500">₹10 Offer Setup</span>
              </div>
            </div>
          </div>

          {/* — 60/40 Grid — */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* ── LEFT: Form ── */}
            <section className="lg:col-span-7 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-pink-100 dark:border-white/10 shadow-sm">
              <div className="mb-7">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary mb-2 tracking-wide uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  Quick Founder Onboarding
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                  Register Your Homegrown Brand
                </h1>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Stop losing 30% to marketplaces. Get verified buyers directed straight to your WhatsApp with high-intent micro-vouchers.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>

                {/* Founder Name & Brand Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center justify-between" htmlFor="founderName">
                      <span>Founder Name</span>
                      <span className="text-[10px] text-primary lowercase font-medium normal-case tracking-normal">required</span>
                    </label>
                    <div className="relative group">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                      <input
                        id="founderName"
                        type="text"
                        required
                        value={founderName}
                        onChange={e => setFounderName(e.target.value)}
                        placeholder="Radhika Sharma"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-pink-100 dark:border-white/10 text-sm font-medium bg-white/60 dark:bg-slate-900/60 focus:bg-white dark:focus:bg-slate-900 text-slate-800 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center justify-between" htmlFor="brandName">
                      <span>Brand Name</span>
                      <span className="text-[10px] text-primary lowercase font-medium normal-case tracking-normal">required</span>
                    </label>
                    <div className="relative group">
                      <Store className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                      <input
                        id="brandName"
                        type="text"
                        required
                        value={brandName}
                        onChange={e => setBrandName(e.target.value)}
                        placeholder="Mitti Herbals"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-pink-100 dark:border-white/10 text-sm font-semibold bg-white/60 dark:bg-slate-900/60 focus:bg-white dark:focus:bg-slate-900 text-slate-800 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Email & WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5" htmlFor="email">
                      Work Email
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@yourbrand.com"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-pink-100 dark:border-white/10 text-sm bg-white/60 dark:bg-slate-900/60 focus:bg-white dark:focus:bg-slate-900 text-slate-800 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400" htmlFor="phone">
                        WhatsApp Business No.
                      </label>
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Orders
                      </span>
                    </div>
                    <div className="flex rounded-xl border border-pink-100 dark:border-white/10 overflow-hidden focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 bg-white/60 dark:bg-slate-900/60 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all">
                      <span className="px-3.5 py-3 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm border-r border-pink-100 dark:border-white/10 select-none flex items-center gap-1.5 shrink-0">
                        🇮🇳 +91
                      </span>
                      <input
                        id="phone"
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="98765 43210"
                        className="w-full px-3.5 py-3 text-sm font-semibold tracking-wide outline-none bg-transparent placeholder:text-slate-400 text-slate-800 dark:text-white"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-green-600" />
                      Verified buyer codes land directly in this chat
                    </p>
                  </div>
                </div>

                {/* GST Status */}
                <div className="p-4 sm:p-5 rounded-2xl bg-pink-50/60 dark:bg-slate-900/40 border border-pink-100 dark:border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-1.5">
                        <Receipt className="w-4 h-4 text-primary" />
                        GST Registration Status
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Home bakers, artisans & hobby crafters don&apos;t need a GST number to sell!
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-primary bg-pink-100 dark:bg-pink-900/30 px-2 py-0.5 rounded-full shrink-0 self-start sm:self-auto">
                      Small Makers Welcome
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${gstStatus === 'yes' ? 'border-primary bg-white dark:bg-slate-800' : 'border-pink-100 dark:border-white/10 bg-white/60 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/60'}`}>
                      <input type="radio" name="gst" value="yes" checked={gstStatus === 'yes'} onChange={() => setGstStatus('yes')} className="accent-primary h-4 w-4" />
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1">
                          Yes, Registered
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">Have active GSTIN for B2B invoices</div>
                      </div>
                    </label>
                    <label className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${gstStatus === 'no' ? 'border-primary bg-white dark:bg-slate-800' : 'border-pink-100 dark:border-white/10 bg-white/60 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/60'}`}>
                      <input type="radio" name="gst" value="no" checked={gstStatus === 'no'} onChange={() => setGstStatus('no')} className="accent-primary h-4 w-4" />
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-white">No / Unregistered</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">Artisan, home baker, or craft maker</div>
                      </div>
                    </label>
                  </div>
                  {gstStatus === 'yes' && (
                    <div className="mt-3.5 pt-3 border-t border-pink-100 dark:border-white/10">
                      <div className="relative">
                        <Receipt className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={gstin}
                          onChange={e => setGstin(e.target.value)}
                          placeholder="GSTIN e.g. 08AAAAA0000A1Z5"
                          className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-pink-100 dark:border-white/10 text-xs uppercase tracking-wider bg-white dark:bg-slate-900 text-slate-800 dark:text-white placeholder:normal-case placeholder:tracking-normal placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Brand Category */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><Tag className="w-4 h-4 text-primary" />Brand Category</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 normal-case tracking-normal font-normal">Select primary craft</span>
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {CATEGORIES.map(({ emoji, label }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setSelectedCategory(selectedCategory === label ? '' : label)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                          selectedCategory === label
                            ? 'bg-primary text-white border-primary shadow-sm shadow-primary/20'
                            : 'bg-white/60 dark:bg-slate-900/40 text-slate-800 dark:text-slate-200 border-pink-100 dark:border-white/10 hover:bg-white dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>{emoji}</span>
                        <span>{label}</span>
                        {selectedCategory === label && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Store Link */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center justify-between" htmlFor="storeLink">
                    <span>Store Website or Instagram Handle</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal lowercase tracking-normal">(optional)</span>
                  </label>
                  <div className="relative group">
                    <LinkIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input
                      id="storeLink"
                      type="text"
                      value={storeLink}
                      onChange={e => setStoreLink(e.target.value)}
                      placeholder="instagram.com/yourbrand or yourbrand.com"
                      className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-pink-100 dark:border-white/10 text-sm bg-white/60 dark:bg-slate-900/60 focus:bg-white dark:focus:bg-slate-900 text-slate-800 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                {/* CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-primary via-primary to-primary-dark hover:brightness-110 active:scale-[0.99] text-white font-black text-base tracking-wide transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2.5 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Launching Brand…</>
                    ) : (
                      <>
                        <span>Launch Brand &amp; Create ₹10 Offer</span>
                        <span className="text-lg">🚀</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-3.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" />No setup fee</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" />No credit card required</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" />0% commissions</span>
                  </div>
                </div>
              </form>
            </section>

            {/* ── RIGHT: Live Preview ── */}
            <aside className="lg:col-span-5 space-y-5">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-white">Live Brand Passport Preview</span>
                </div>
                <span className="text-[11px] font-semibold text-primary bg-pink-100 dark:bg-pink-900/30 px-2.5 py-0.5 rounded-full">
                  Buyer Facing View
                </span>
              </div>

              {/* 1. Voucher Card */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-5 rounded-3xl border border-pink-100 dark:border-white/10 shadow-md relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-start justify-between pb-4 border-b border-pink-100 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-pink-300 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                      {brandName ? brandName.slice(0, 2).toUpperCase() : 'MB'}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-slate-800 dark:text-white text-base leading-tight">
                          {brandName || 'Mitti Herbals'}
                        </h3>
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Founder: <span className="font-medium text-slate-800 dark:text-white">{founderName || 'Radhika Sharma'}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-primary dark:bg-orange-900/30 dark:text-orange-300 px-2.5 py-1 rounded-lg border border-orange-200 dark:border-orange-800/40">
                    Active Offer
                  </span>
                </div>
                {/* Voucher Ticket */}
                <div className="mt-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-primary/20 shadow-sm relative">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-extrabold text-primary flex items-center gap-1">
                      🎫 INDIE INTENT VOUCHER
                    </span>
                    <span className="font-mono text-[11px] font-bold bg-pink-100 dark:bg-pink-900/30 text-primary px-2 py-0.5 rounded">
                      CODE: #{(brandName || 'BRAND').slice(0, 5).toUpperCase()}-8921
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between mt-2">
                    <div>
                      <div className="text-xl font-extrabold text-slate-800 dark:text-white">₹120 OFF</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">On first direct artisan order above ₹499</div>
                    </div>
                    <div className="text-xs font-bold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-md border border-green-100 dark:border-green-800/40">
                      Buyer Locked with ₹10 UPI
                    </div>
                  </div>
                  <div className="my-3 border-t border-dashed border-pink-100 dark:border-white/10 relative">
                    <div className="absolute -left-5 -top-2 w-3.5 h-3.5 bg-pink-50 dark:bg-slate-800 rounded-full" />
                    <div className="absolute -right-5 -top-2 w-3.5 h-3.5 bg-pink-50 dark:bg-slate-800 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>Valid directly on <span className="font-semibold text-slate-800 dark:text-white">{brandName || 'Mitti Herbals'}</span></span>
                    <span className="font-semibold text-green-700 dark:text-green-400">100% Direct Delivery</span>
                  </div>
                </div>
              </div>

              {/* 2. Projected Margins */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-5 rounded-3xl border border-pink-100 dark:border-white/10 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center">
                      📈
                    </div>
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-white">Live Projected Margins</h4>
                  </div>
                  <span className="text-[11px] text-green-700 dark:text-green-400 font-bold bg-green-100/60 dark:bg-green-900/30 px-2 py-0.5 rounded-full">Zero Platform Commission</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Based on 100 orders/month · ₹1,500 avg order value:</p>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-2xl bg-red-50/70 dark:bg-red-900/20 border border-red-100 dark:border-red-800/40">
                    <span className="text-[10px] uppercase font-bold text-red-600 dark:text-red-400 tracking-wider">Aggregator Cut</span>
                    <div className="text-lg font-extrabold text-red-700 dark:text-red-400 mt-0.5">-₹38,000</div>
                    <span className="text-[10px] text-red-500 dark:text-red-400">25-30% marketplace fees</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-green-50/70 dark:bg-green-900/20 border border-green-100 dark:border-green-800/40">
                    <span className="text-[10px] uppercase font-bold text-green-700 dark:text-green-400 tracking-wider">IndieLoop Retained</span>
                    <div className="text-lg font-extrabold text-green-800 dark:text-green-300 mt-0.5">+₹1,24,000</div>
                    <span className="text-[10px] font-semibold text-green-600 dark:text-green-400">100% Direct UPI</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-[11px] font-semibold mb-1">
                    <span className="text-slate-500 dark:text-slate-400">Margin Kept:</span>
                    <span className="text-green-700 dark:text-green-400 font-bold">100% Direct to Maker</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-pink-100 dark:bg-slate-700 overflow-hidden">
                    <div className="bg-green-500 h-full rounded-full w-full" />
                  </div>
                </div>
              </div>

              {/* 3. WhatsApp Simulation */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-5 rounded-3xl border border-green-200 dark:border-green-800/40 shadow-sm">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-green-900 dark:text-green-300">
                    💬 <span>Real-time WhatsApp Lead</span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-green-800 dark:text-green-300 bg-white/70 dark:bg-green-900/30 px-2 py-0.5 rounded-full border border-green-200 dark:border-green-700">
                    +91 {phone || '98765 43210'}
                  </span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl rounded-tl-sm border border-green-200/70 dark:border-green-800/40 shadow-sm space-y-2 text-xs text-slate-800 dark:text-slate-200">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 font-bold text-[10px] flex items-center justify-center">A</div>
                      <span className="font-bold text-[11px]">Ananya Roy (Verified Shopper)</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Just now</span>
                  </div>
                  <p className="leading-relaxed">
                    "Namaste <span className="font-bold text-primary">{brandName || 'Mitti Herbals'}</span>! 👋 I just unlocked the ₹10 token for your shop on IndieLoop."
                  </p>
                  <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-xl border border-green-100 dark:border-green-800/40 font-mono text-[11px] text-green-900 dark:text-green-300 flex items-center justify-between">
                    <span>Token: <strong>#{(brandName || 'BRAND').slice(0, 5).toUpperCase()}-8921</strong></span>
                    <span className="text-[10px] font-sans font-bold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-1.5 py-0.5 rounded">UPI Confirmed</span>
                  </div>
                  <p>"Can I order the Kumkumadi Face Glow Oil to Bangalore?"</p>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-green-900 dark:text-green-300 font-semibold px-1">
                  <span>🔒 Zero intermediary spam</span>
                  <span>Zero cut on shipping</span>
                </div>
              </div>

              {/* 4. Trust badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: '🛡️', title: 'Verified D2C Maker', sub: 'Direct Maker Trust' },
                  { icon: '⚡', title: 'Instant UPI', sub: 'Direct to Your QR' },
                  { icon: '⭐', title: '4.9 / 5 Rating', sub: '850+ Indian Brands' },
                ].map(({ icon, title, sub }) => (
                  <div key={title} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-3 rounded-2xl border border-pink-100 dark:border-white/10 text-center shadow-sm">
                    <div className="w-8 h-8 rounded-xl bg-pink-50 dark:bg-slate-700 mx-auto flex items-center justify-center mb-1.5 text-lg">{icon}</div>
                    <div className="text-[11px] font-bold text-slate-800 dark:text-white">{title}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{sub}</div>
                  </div>
                ))}
              </div>
            </aside>

          </div>
        </div>
      </main>
    </div>
  );
}
