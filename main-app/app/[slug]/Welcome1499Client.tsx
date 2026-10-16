'use client';

import React from 'react';
import Link from 'next/link';
import SellerNavbar from '@/components/SellerNavbar';
import Snowfall from '@/components/Snowfall';
import BrandDashboardGuard from '@/components/brand/BrandDashboardGuard';
import { CheckCircle2, Store, Sparkles, ArrowRight, Receipt, Shield } from 'lucide-react';

export interface Welcome1499ClientProps {
  slug: string;
  brand?: string;
  founder?: string;
  email?: string;
  phone?: string;
  plan?: string;
  amount?: string;
  logo?: string;
}

export function Welcome1499Client({
  slug,
  brand,
  founder = 'Founder',
  email = 'radhika@mittiherbals.com',
  phone = '98765 43210',
  plan = 'Business Scale',
  amount = '1499',
  logo,
}: Welcome1499ClientProps) {
  return (
    <BrandDashboardGuard
      requestedTier="1499"
      slug={slug}
      initialBrand={brand}
      initialFounder={founder}
      initialEmail={email}
      initialPhone={phone}
      initialLogo={logo}
      initialPlan={plan}
      initialAmount={amount}
    >
      {(verified) => {
        const brandName = verified.brandName;
        const activeFounder = verified.founderName || founder;
        const activeEmail = verified.email || email;
        const planName = verified.planName || plan || 'Business Scale Plan';
        const activeAmount = verified.amountPaid || amount || '1499';
        const brandLogo = verified.logo || logo;

        const brandInitials =
          brandName
            .split(' ')
            .map((w) => w[0])
            .join('')
            .substring(0, 2)
            .toUpperCase() || 'MH';

        return (
          <div className="min-h-screen flex flex-col bg-pink-50/30 dark:bg-slate-950 text-slate-900 dark:text-white antialiased relative selection:bg-pink-100 selection:text-primary">
            <Snowfall />
            <SellerNavbar />

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-10 relative z-10">
              {/* HERO SECTION WITH BRAND LOGO, BRAND NAME & SUBSCRIPTION PURCHASED */}
              <section className="relative overflow-hidden bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-3xl border border-pink-200/80 dark:border-white/10 p-6 sm:p-10 shadow-xl">
                <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-pink-200/40 dark:bg-pink-900/20 blur-3xl pointer-events-none"></div>
                <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-100/40 dark:bg-emerald-900/20 blur-3xl pointer-events-none"></div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-5">
                    {/* Brand Identity + Subscription Purchased Badge Card */}
                    <div className="inline-flex flex-wrap items-center gap-4 p-3.5 pr-5 rounded-2xl bg-pink-50/80 dark:bg-slate-800/90 border border-pink-200/80 dark:border-white/10 shadow-sm">
                      {brandLogo ? (
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white dark:bg-slate-700 border-2 border-primary/30 shadow-md shrink-0 flex items-center justify-center">
                          <img
                            src={brandLogo}
                            alt={`${brandName} Logo`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-pink-500 text-white font-black text-xl flex items-center justify-center shadow-md shrink-0">
                          {brandInitials}
                        </div>
                      )}
                      <div className="space-y-1 text-left">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                            {brandName}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-extrabold border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle2 className="w-3 h-3" /> Verified Business Scale Brand
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-primary">
                          <Store className="w-3.5 h-3.5" />
                          <span>Subscription Purchased: {planName} (₹{activeAmount})</span>
                        </div>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-emerald-800">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      BUSINESS SCALE PLAN OFFICIALLY UNLOCKED • 10X VELOCITY
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                      Congratulations <span className="text-primary">{brandName}</span>, Your ₹{activeAmount} {planName} Engine is Active! 🌸✨
                    </h1>

                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      Welcome to the top tier for breakout Indian D2C makers. You now possess{' '}
                      <span className="font-bold text-slate-900 dark:text-white">maximum verified buyer traffic</span>, priority creator barter matchmaking, unlimited voucher campaigns, and full 1-click WhatsApp business automation.
                    </p>

                    <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-800/80 backdrop-blur border border-pink-100 dark:border-white/10 shadow-xs flex flex-wrap items-center gap-y-2 gap-x-4 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Order ID: #IND-SCALE-{activeAmount}-92184</span>
                      </div>
                      <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>
                      <div className="text-slate-800 dark:text-slate-200 font-semibold">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">₹{activeAmount} Paid</span> via Razorpay Verified
                      </div>
                      <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>
                      <div className="text-slate-600 dark:text-slate-400">
                        Plan: <span className="font-bold text-slate-900 dark:text-white">{planName}</span>
                      </div>
                      <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>
                      <div className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <span>0% Brokerage • 100% Margin Kept</span>
                      </div>
                      <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>
                      <div className="text-slate-500 dark:text-slate-400 text-[11px] truncate flex items-center gap-1">
                        <span>Invoice dispatched to <strong className="text-slate-700 dark:text-slate-300">{activeEmail}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col gap-3.5 bg-pink-50/50 dark:bg-slate-800/80 p-5 rounded-2xl border border-pink-100 dark:border-white/10 shadow-sm">
                    <div className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Fast Scale Activation
                    </div>
                    <Link
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white font-bold text-sm shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group transition-all transform hover:-translate-y-0.5 text-center"
                      href="#dashboard"
                      id="dashboard"
                    >
                      <span>Continue to Brand Dashboard</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button
                      className="w-full py-3 px-5 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-800 dark:text-white border border-pink-100 dark:border-slate-600 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                      type="button"
                      onClick={() => alert(`GST Tax Invoice generated for ${brandName} (₹${activeAmount})`)}
                    >
                      <Receipt className="w-4 h-4 text-slate-500 dark:text-slate-300" />
                      <span>Download GST Tax Invoice</span>
                    </button>
                    <div className="p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 leading-snug flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Your VIP Business Scale Concierge onboarding call is ready to schedule.</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* SHOWCASE CARDS */}
              <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-7 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-3xl p-5 border border-pink-100 dark:border-white/10 shadow-sm flex flex-col justify-between overflow-hidden">
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-4 bg-pink-50 dark:bg-slate-800">
                    <img
                      alt={`${brandName} Artisanal Botanical Skincare Products`}
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsqlZV79fA2EWOvM6Dbcth8VGWehHKbUI_2FtG2xhRxI01qIjB3sGh_RgYY_Lq3K2MwzLVLXaimSjE58zjNtYP6fDfxWn2m8bN6ItEw6-etQ7WvJKKvudf6IZUNA04EXqomOM7rZn_-Mr_7AFhpUujRF-gxN_ZTT-EwxxBSDo4gHO7vQSliwP2DgJXoFxVLCsqaczK3tMPsbdmqzrxd-3DMnKD-5_I8SvJsy9tIg0"
                    />
                    <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      {brandName} • Priority Hero Spotlight Live on GrahakSetu Arcade
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                    <div className="font-medium">
                      <strong className="text-slate-900 dark:text-white">Featured In Store:</strong> Priority Catalog &amp; Unlimited Voucher Funnels
                    </div>
                    <span className="bg-pink-100 dark:bg-pink-900/40 text-primary font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                      Unlimited Campaigns
                    </span>
                  </div>
                </div>
                <div className="md:col-span-5 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-3xl p-5 border border-pink-100 dark:border-white/10 shadow-sm flex flex-col justify-between overflow-hidden">
                  <div className="relative rounded-2xl overflow-hidden aspect-square mb-4 bg-pink-50 dark:bg-slate-800">
                    <img
                      alt={`Founder ${activeFounder} packing ${brandName} artisan kraft parcels`}
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSeSZOLgrmHE54L0BmQJg-LXL5NX45SqUOEQh95vouTFY1k9tPP8A8_uy_6v07FXD_gRHBvLoOCwaEFL2_nRCa01jwdr1oyNj2CpukYkgUeFmL_32hEFqAKdAzDnFum__3xk7vF8GQ5PjD0TaqXsMaPHuyqSxf9pQvZEDXoZMSYx6T9fJR3UNGe1Q62rKKOewYqiU8Eq9KvjTxJW1LX1lgtVpTinJ67g-Qztu0LwQ"
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs p-2.5 rounded-xl font-medium">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-primary text-[15px]">inventory_2</span>
                        Dynamic Parcel QR Engine Active
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Every box packed earns repeat WhatsApp orders with zero middleman fees.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-300">
                      Packaging Optimization: <strong className="text-emerald-600 dark:text-emerald-400">VIP Ready</strong>
                    </span>
                    <Link className="text-primary font-bold hover:underline inline-flex items-center gap-0.5" href="#dashboard">
                      Get Parcel Inserts <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </section>

              {/* 8 BUSINESS SCALE SUPERPOWERS */}
              <section className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/40 text-primary font-semibold text-xs tracking-wide mb-2">
                      <span className="material-symbols-outlined text-[15px]">verified_user</span>
                      <span>BUSINESS SCALE SUITE • UNRESTRICTED ACCESS</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                      All 8 Business Scale Superpowers Activated for {brandName}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      Engineered to scale breakout makers to ₹3L+ consistent direct monthly GMV with 0% commission.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-4 py-2 rounded-full">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    8 of 8 Scale Features Fully Operational
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-sm rounded-2xl p-6 border-2 border-primary/20 shadow-sm hover:border-primary transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/40 text-primary flex items-center justify-center font-bold">
                          <span className="material-symbols-outlined text-[22px]">groups</span>
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-primary text-white px-2 py-0.5 rounded-full">10x Scale</span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">1,500+ Verified High-Intent Buyer Leads</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                        Automated WhatsApp contact verification. Connect with high-intent shoppers actively claiming your brand offers.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-pink-100 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>Verified Phone Numbers</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> Priority Queue
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 dark:border-white/10 shadow-sm hover:border-primary transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                          <span className="material-symbols-outlined text-[22px]">local_activity</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">Unlimited</span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">Unlimited Micro-Voucher Campaigns</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                        Run simultaneous targeted micro-offers across your entire catalog to maximize average order value and repeat purchases.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-pink-100 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>Multi-SKU Funnels</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> Unlimited Live
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-sm rounded-2xl p-6 border-2 border-amber-300/80 shadow-sm hover:border-amber-500 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
                          <span className="material-symbols-outlined text-[22px]">volunteer_activism</span>
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-white px-2 py-0.5 rounded-full">VIP Scale</span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">Automated Creator Barter Matchmaking</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                        Matched with top vetted lifestyle and D2C micro-creators every month for high-converting Instagram reels &amp; unboxings.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-pink-100 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>Zero Agency Fees</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> Priority Matches
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 dark:border-white/10 shadow-sm hover:border-primary transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                          <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full">100k+ Reach</span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">Hero Spotlight in Arcade</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                        Homepage hero placement in front of conscious D2C shoppers browsing GrahakSetu&apos;s marketplace directory.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-pink-100 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>Front Page Exposure</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> Hero Banner
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 dark:border-white/10 shadow-sm hover:border-primary transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                          <span className="material-symbols-outlined text-[22px]">smart_toy</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">API &amp; Webhooks</span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">VIP WhatsApp Business API</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                        Automated 1-click cart recovery, instant dispatch notifications, and custom webhook triggers for your internal tracking.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-pink-100 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>24/7 Fast Ping</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">sync</span> Connected
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 dark:border-white/10 shadow-sm hover:border-primary transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                          <span className="material-symbols-outlined text-[22px]">video_camera_front</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-900 px-2 py-0.5 rounded-full">1-on-1 Dedicated</span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">Dedicated Account Manager &amp; Audit</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                        Dedicated D2C growth strategist on WhatsApp plus strategy video calls to optimize pricing, packaging, and conversion funnels.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-pink-100 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>D2C Strategist Assigned</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">event_available</span> Booking Open
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 dark:border-white/10 shadow-sm hover:border-primary transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                          <span className="material-symbols-outlined text-[22px]">currency_rupee</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full">Zero Commission</span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">0% Marketplace Brokerage</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                        Keep 100% of customer gross payments. No 28-35% cuts like Amazon or Nykaa. Instant settlement directly to {brandName}&apos;s bank account.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-pink-100 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>Instant UPI Settle</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">shield</span> Guaranteed
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 dark:border-white/10 shadow-sm hover:border-primary transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                          <span className="material-symbols-outlined text-[22px]">qr_code_scanner</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-900 px-2 py-0.5 rounded-full">Vector Ready</span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">Dynamic Packaging QR Engine</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                        High-resolution vector printable QR templates for your kraft parcels. Dynamic tracking redirects buyers directly to repurchase vouchers.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-pink-100 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>Parcel Insert Kit</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">download</span> Ready to Print
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* 60-DAY SCALE ROADMAP */}
              <section className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-pink-100 dark:border-white/10 shadow-sm space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/40 text-primary font-bold text-xs tracking-wide mb-2">
                      <span className="material-symbols-outlined text-[15px]">trending_up</span>
                      BUSINESS SCALE EXCLUSIVE PLAYBOOK
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                      The 60-Day Scale to ₹3L+ Direct Monthly GMV Roadmap
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
                      A battle-tested 4-phase rollout designed for {brandName} to turn authentic craftsmanship into predictable, zero-commission recurring sales.
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-pink-50/60 dark:bg-slate-800 p-3 rounded-xl border border-pink-100 dark:border-white/10">
                    Target: <span className="font-bold text-slate-900 dark:text-white">₹3,00,000+ GMV/mo</span> • Zero Ad Waste
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                  <div className="bg-pink-50/40 dark:bg-slate-800/60 rounded-2xl p-5 border border-pink-100 dark:border-white/10 flex flex-col justify-between relative overflow-hidden">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-lg bg-primary text-white font-extrabold text-xs">Phase 1</span>
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Days 1 - 14</span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">Multi-SKU Voucher Rollout</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Launch high-converting micro-vouchers for {brandName}:
                      </p>
                      <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc pl-4">
                        <li><strong>SKU 1:</strong> ₹150 OFF Hero Bestseller</li>
                        <li><strong>SKU 2:</strong> Free Gift on orders ₹799+</li>
                        <li><strong>SKU 3:</strong> 20% OFF VIP Bundle Box</li>
                      </ul>
                    </div>
                    <div className="mt-4 pt-3 border-t border-pink-100 dark:border-white/10 text-[11px] text-primary font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">flag</span> Goal: 150 Claims in Week 1
                    </div>
                  </div>
                  <div className="bg-pink-50/40 dark:bg-slate-800/60 rounded-2xl p-5 border border-pink-100 dark:border-white/10 flex flex-col justify-between relative overflow-hidden">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-lg bg-amber-600 text-white font-extrabold text-xs">Phase 2</span>
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Days 15 - 30</span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">Creator Barter Activation</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Dispatch complimentary kits to your matched creators.
                      </p>
                      <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc pl-4">
                        <li>Makers receive aesthetic unboxing reels</li>
                        <li>Unique tracking tags for each creator</li>
                        <li>Direct bio link pings straight to WhatsApp</li>
                      </ul>
                    </div>
                    <div className="mt-4 pt-3 border-t border-pink-100 dark:border-white/10 text-[11px] text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">flag</span> Goal: ₹1,00,000 Direct GMV
                    </div>
                  </div>
                  <div className="bg-pink-50/40 dark:bg-slate-800/60 rounded-2xl p-5 border border-pink-100 dark:border-white/10 flex flex-col justify-between relative overflow-hidden">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white font-extrabold text-xs">Phase 3</span>
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Days 31 - 45</span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">VIP Customer WhatsApp Broadcast</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Activate automated segmented broadcast for past buyers:
                      </p>
                      <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc pl-4">
                        <li>Early access to new batches</li>
                        <li>Exclusive 1-click refill discount</li>
                        <li>Direct feedback loop with {activeFounder}</li>
                      </ul>
                    </div>
                    <div className="mt-4 pt-3 border-t border-pink-100 dark:border-white/10 text-[11px] text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">flag</span> Goal: 40% Repeat Rate
                    </div>
                  </div>
                  <div className="bg-pink-50/40 dark:bg-slate-800/60 rounded-2xl p-5 border border-pink-100 dark:border-white/10 flex flex-col justify-between relative overflow-hidden">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-900 dark:bg-slate-700 text-white font-extrabold text-xs">Phase 4</span>
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Days 46 - 60</span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">Repeat Order Automation</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Implement dynamic parcel inserts with printed custom QR tokens:
                      </p>
                      <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc pl-4">
                        <li>&ldquo;Scan to re-order in 1 tap &amp; save ₹150&rdquo;</li>
                        <li>Automated 30-day refill reminder</li>
                        <li>Zero acquisition cost scaling engine</li>
                      </ul>
                    </div>
                    <div className="mt-4 pt-3 border-t border-pink-100 dark:border-white/10 text-[11px] text-slate-900 dark:text-white font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">flag</span> Goal: ₹3L+ Monthly GMV
                    </div>
                  </div>
                </div>
              </section>

              {/* MATCHED CREATORS & SMARTPHONE PREVIEW */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-6 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-pink-100 dark:border-white/10 shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs">
                        <span className="material-symbols-outlined text-[14px]">handshake</span>
                        BUSINESS SCALE MATCHMAKER DECK
                      </div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">
                        Matched Creators Ready for {brandName}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-primary bg-pink-50 dark:bg-pink-900/30 px-2.5 py-1 rounded-full">
                      Priority Matched
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    As a ₹{activeAmount} {planName} member, GrahakSetu handpicks top Indian lifestyle and D2C creators each month who review your products in exchange for hampers.
                  </p>
                  <div className="space-y-3.5">
                    {[
                      { initials: 'TM', name: 'Tara Mohan', handle: '@tara.wellness', fit: '96% Fit', bio: '34k Followers • Mindful Ayurvedic Skincare & Rituals', color: 'bg-rose-100 text-rose-800 border-rose-200' },
                      { initials: 'SJ', name: 'Sanya Joshi', handle: '@sanyacrafts', fit: '99% Fit', bio: '52k Followers • Homegrown Indian Artisans & Studio Tours', color: 'bg-teal-100 text-teal-800 border-teal-200' },
                      { initials: 'RN', name: 'Rohan Nambiar', handle: '@consciousliving.in', fit: '94% Fit', bio: '28k Followers • Clean Living, Botanical Apothecary', color: 'bg-amber-100 text-amber-800 border-amber-200' },
                    ].map((cr) => (
                      <div key={cr.handle} className="p-3.5 rounded-2xl bg-pink-50/40 dark:bg-slate-800/70 border border-pink-100 dark:border-white/10 flex items-center justify-between gap-3 hover:border-primary/40 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full font-bold flex items-center justify-center text-xs border ${cr.color}`}>
                            {cr.initials}
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5 flex-wrap">
                              {cr.name}
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">{cr.handle}</span>
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">{cr.fit}</span>
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{cr.bio}</div>
                          </div>
                        </div>
                        <button className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 hover:bg-pink-50 dark:hover:bg-slate-600 border border-pink-200 dark:border-slate-600 font-bold text-xs text-slate-800 dark:text-white transition-colors shrink-0" type="button">
                          Offer Hamper
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-6 flex flex-col items-center">
                  <div className="text-center mb-3">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800 px-3 py-1 rounded-full border border-pink-100 dark:border-white/10">
                      <span className="material-symbols-outlined text-[15px] text-emerald-600">smartphone</span>
                      LIVE BUSINESS SCALE ENGINE PREVIEW
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Multi-campaign WhatsApp auto-routing + Creator tag tracking
                    </p>
                  </div>
                  <div className="w-full max-w-sm bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-4 border-slate-800">
                    <div className="bg-slate-950 rounded-[2rem] overflow-hidden border border-slate-800 text-slate-900">
                      <div className="bg-slate-900 px-6 pt-3 pb-2 text-white flex items-center justify-between text-[11px] font-medium">
                        <span>9:41</span>
                        <div className="w-20 h-4 bg-black rounded-full"></div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[13px]">wifi</span>
                          <span className="material-symbols-outlined text-[13px]">battery_full</span>
                        </div>
                      </div>
                      <div className="bg-[#075E54] text-white p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          {brandLogo ? (
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-white border border-white/40 shrink-0">
                              <img src={brandLogo} alt={brandName} className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-white text-primary font-bold text-xs flex items-center justify-center">
                              {brandInitials}
                            </div>
                          )}
                          <div>
                            <div className="text-xs font-bold leading-none flex items-center gap-1">
                              {brandName}
                              <span className="material-symbols-outlined text-[13px] text-emerald-300">verified</span>
                            </div>
                            <div className="text-[10px] text-emerald-200 mt-0.5">Business Scale • Instant Webhook Active</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#ECE5DD] p-3.5 space-y-3 min-h-[340px] text-xs flex flex-col justify-end">
                        <div className="text-center my-1">
                          <span className="bg-white/80 backdrop-blur px-2.5 py-0.5 rounded-full text-[10px] text-slate-600 font-medium shadow-2xs">
                            Source: Instagram Reel (@tara.wellness) • Voucher Claimed
                          </span>
                        </div>
                        <div className="bg-white rounded-2xl rounded-tl-xs p-3 shadow-xs max-w-[85%] space-y-1 self-start">
                          <div className="flex items-center justify-between text-[10px] font-bold text-primary">
                            <span>CAMPAIGN: VIP SCALE BUNDLE</span>
                            <span className="text-[9px] bg-pink-100 text-primary px-1.5 rounded">Ref: TARA34</span>
                          </div>
                          <p className="text-xs text-slate-800 leading-snug">
                            &ldquo;Namaste {activeFounder}! Saw Tara&apos;s reel showcasing {brandName}. I claimed the ₹150 micro-voucher for the VIP Bundle!&rdquo;
                          </p>
                          <div className="flex items-center justify-between pt-1 text-[9px] text-slate-400">
                            <span>Ananya Deshmukh • Pune</span>
                            <span>9:42 AM</span>
                          </div>
                        </div>
                        <div className="bg-[#DCF8C6] rounded-2xl rounded-tr-xs p-3 shadow-xs max-w-[85%] space-y-1.5 self-end text-left">
                          <div className="text-[10px] font-semibold text-emerald-800 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px]">bolt</span>
                            GrahakSetu VIP Automated Dispatch Ping
                          </div>
                          <p className="text-xs text-slate-800 leading-snug">
                            &ldquo;Namaste Ananya! {activeFounder} and the {brandName} studio welcome you! 🌸 Your ₹150 voucher is applied.&rdquo;
                          </p>
                          <div className="p-2 bg-white/80 rounded-lg text-[10px] text-slate-700 space-y-0.5 border border-emerald-200/50">
                            <div className="font-bold text-slate-900">Total: ₹1,199 - ₹150 = ₹1,049</div>
                            <div className="text-emerald-700 font-medium">Free Express Delivery Included</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* BOTTOM CTA */}
              <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-3xl border-2 border-primary/40 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1.5 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                      Ready to configure your Business Scale Campaigns, {activeFounder}?
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl">
                    Your priority buyer pipeline and unlimited micro-voucher campaign slots are armed for {brandName}.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                  <Link
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white font-bold text-sm shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group transition-all text-center"
                    href="#dashboard"
                  >
                    <span>Continue to Brand Dashboard</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-500 dark:text-slate-400 pb-4">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ₹{activeAmount} {planName} • No Variable Transaction Cuts
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  100% Direct Customer Data Ownership
                </span>
              </div>
            </main>
          </div>
        );
      }}
    </BrandDashboardGuard>
  );
}
