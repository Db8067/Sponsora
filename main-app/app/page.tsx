'use client';

import SellerNavbar from '@/components/SellerNavbar';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  LineChart, MessageCircle, ShieldCheck, Percent,
  Scissors, Phone, Banknote, Zap, CheckCircle2,
  XCircle, ChevronDown, Star, ArrowRight, Users, Filter, Gift, Wallet
} from 'lucide-react';

/* ─── FAQ Accordion item ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-pink-100 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
      <button
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-bold text-sm md:text-base text-slate-800 dark:text-white">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-pink-500 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`px-5 overflow-hidden transition-all duration-300 ${open ? 'max-h-96 pb-4' : 'max-h-0'}`}>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function SellerLandingPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="flex flex-col min-h-screen">
      <SellerNavbar />

      {/* ══════════════════════════════════════════
          1. HERO SECTION
      ══════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-pink-50 via-white to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12 md:py-16 px-4 relative overflow-hidden">
        {/* ambient blobs */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-pink-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-blue-200/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="container mx-auto max-w-7xl relative z-10">

          {/* ── DESKTOP ── */}
          <div className="hidden md:flex flex-row items-center gap-12">
            <div className="flex-1 text-left">
              {/* live badge */}
              <div className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-4 py-1.5 rounded-full text-xs font-bold mb-5">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                Empowering 850+ Independent Indian Brands
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-slate-800 dark:text-white leading-tight mb-4">
                Get Direct Customers For Your Brand.{' '}
                <span className="text-primary">No 30% Marketplace Cuts.</span>{' '}
                No Logistics Hassle.
              </h1>

              <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl mb-6 leading-relaxed">
                We connect your brand with real shoppers and local micro-creators using a ₹10 commitment voucher — so every customer who reaches you is genuinely interested in buying.
              </p>

              {/* 4 USP chips */}
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium text-sm">
                  <Scissors className="w-4 h-4 text-pink-500 flex-shrink-0" /> Zero marketplace cuts
                </li>
                <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium text-sm">
                  <Phone className="w-4 h-4 text-green-500 flex-shrink-0" /> Direct WhatsApp orders
                </li>
                <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium text-sm">
                  <Banknote className="w-4 h-4 text-blue-500 flex-shrink-0" /> 100% money in your bank
                </li>
                <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium text-sm">
                  <Zap className="w-4 h-4 text-orange-500 flex-shrink-0" /> Setup under 5 mins
                </li>
              </ul>

              <div className="flex items-center gap-4 mb-10 bg-white/60 dark:bg-slate-800/60 p-3 rounded-2xl border border-pink-100 dark:border-white/10 max-w-xl shadow-sm backdrop-blur-sm">
                <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex-shrink-0">New</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium text-sm">No website? Get yours live in just 2 minutes.</span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/brand-register">
                  <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-primary-dark transition-all shadow-xl shadow-primary/30 hover:scale-105 duration-300 flex items-center gap-2">
                    Start Getting Customers
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="#how-it-works">
                  <button className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:text-primary transition-colors">
                    <span className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-xs">&#9654;</span>
                    See How It Works
                  </button>
                </Link>
              </div>
            </div>

            {/* right — original banner image (restored to its original position) */}
            <div className="flex-1 flex justify-end w-full relative">
              <img
                src="/images/seller_banner_doodle.png"
                alt="Seller Doodle Banner"
                className="w-full lg:max-w-xl object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* ── MOBILE ── */}
          <div className="flex md:hidden flex-col items-center text-center gap-6">
            <div className="w-full pt-4">
              <div className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-3 py-1 rounded-full text-xs font-bold mb-4">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                850+ Independent Indian Brands
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white leading-tight mb-3">
                Get Direct Customers.{' '}
                <span className="text-primary">No Marketplace Cuts.</span>
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 px-2 leading-relaxed">
                We connect your brand with real buyers using a ₹10 commitment voucher. Every lead is genuinely interested.
              </p>

              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-5 text-left max-w-xs mx-auto">
                {[
                  { icon: <Scissors className="w-3.5 h-3.5 text-pink-500 flex-shrink-0" />, label: 'Zero marketplace cuts' },
                  { icon: <Phone className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />, label: 'Direct WhatsApp' },
                  { icon: <Banknote className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />, label: '100% your money' },
                  { icon: <Zap className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />, label: 'Setup in 5 mins' },
                ].map(({ icon, label }) => (
                  <li key={label} className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 text-xs font-medium">{icon}{label}</li>
                ))}
              </ul>

              <Link href="/brand-register">
                <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 w-[90%] sm:w-auto rounded-xl font-bold text-sm shadow-xl shadow-primary/30 active:scale-95 transition-all">
                  Start Getting Customers
                </button>
              </Link>
            </div>

            <div className="w-full flex justify-center">
              <img
                src="/images/seller_banner_mobile.png"
                alt="Seller Doodle Banner"
                className="w-full max-w-[300px] sm:max-w-sm object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          1b. HOW A CUSTOMER REACHES YOU (voucher flow walkthrough)
      ══════════════════════════════════════════ */}
      <section className="py-14 md:py-20 px-4 bg-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left: explanatory copy */}
            <div className="order-2 lg:order-1">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3">
                Real Customer Journey
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white leading-snug">
                From a ₹10 voucher to a confirmed order on your WhatsApp
              </h2>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed mt-3">
                A customer pays a small ₹10 commitment voucher to unlock your offer. That single step
                filters out browsers, bots and window-shoppers, so the message that lands in your
                WhatsApp is someone who is genuinely ready to buy.
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  { icon: <Gift className="w-4 h-4 text-pink-500 flex-shrink-0" />, text: 'Customer pays ₹10 and receives a unique voucher code.' },
                  { icon: <Users className="w-4 h-4 text-blue-500 flex-shrink-0" />, text: 'Their message opens pre-filled with your code and offer details.' },
                  { icon: <Banknote className="w-4 h-4 text-green-500 flex-shrink-0" />, text: 'You collect the full product payment directly via UPI.' },
                  { icon: <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />, text: 'You ship via your courier and keep 100% of the margin.' },
                ].map(({ icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
                    {icon}
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: mock store card */}
            <div className="order-1 lg:order-2 relative">
              <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-pink-100 dark:border-white/10 p-5 flex flex-col gap-4 relative z-10">
                <div className="flex items-center justify-between bg-pink-50 dark:bg-slate-700/60 px-4 py-3 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-200 dark:bg-pink-900/40 flex items-center justify-center text-lg">🌿</div>
                    <div>
                      <p className="font-bold text-sm text-slate-800 dark:text-white leading-none">Mitti Botanics</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Verified Artisan · Jaipur</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full">Active Deal</span>
                </div>

                <div className="flex items-center gap-3 bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800/40 rounded-xl px-4 py-3">
                  <Gift className="w-5 h-5 text-pink-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-white">₹10 Micro-Voucher → ₹120 Off Sampler Kit</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Customer pays ₹10 token · Lands on your WhatsApp</p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-700/40 rounded-xl p-3 border border-slate-100 dark:border-white/10">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-semibold uppercase tracking-wider">Pre-filled WhatsApp Message</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    "Hi Mitti Botanics! I paid the ₹10 token for the ₹120 Off Sampler Kit (Code: <span className="text-pink-600 font-bold">INDIE-942</span>). Here's my delivery address in Pune!"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-pink-50 dark:bg-slate-700/40 rounded-xl p-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Your Margin Kept</p>
                    <p className="text-xl font-black text-primary">100%</p>
                    <p className="text-xs text-slate-400">Zero cut taken</p>
                  </div>
                  <div className="bg-pink-50 dark:bg-slate-700/40 rounded-xl p-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Avg. Intent Rate</p>
                    <p className="text-xl font-black text-slate-800 dark:text-white">94.2%</p>
                    <p className="text-xs text-slate-400">Token-filtered leads</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full max-w-md bg-pink-200/50 dark:bg-pink-900/20 rounded-2xl -z-0 hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. HOW IT WORKS — 3-step
      ══════════════════════════════════════════ */}
      <section id="how-it-works" className="py-16 md:py-20 px-4 bg-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Simple 3-Step Process</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mt-2">
              Built For Real Conversions, Not Vanity Clicks
            </h2>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Marketplace ads bleed money before you make a single sale. We ensure every click has real buying intent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                bg: 'bg-pink-100 dark:bg-pink-900/30',
                text: 'text-primary',
                icon: <Gift className="w-5 h-5 text-primary" />,
                title: 'Create a ₹10 Micro-Offer',
                desc: 'Set up an irresistible offer — e.g., Pay ₹10, Get ₹100 Off + Free Sampler. The token fee instantly eliminates window-shoppers and fake leads.',
                tag: '🎯 Filters out junk leads instantly',
              },
              {
                num: '02',
                bg: 'bg-blue-100 dark:bg-blue-900/30',
                text: 'text-blue-600 dark:text-blue-400',
                icon: <Users className="w-5 h-5 text-blue-500" />,
                title: 'Creators Share With Their Audience',
                desc: 'Micro-creators on Instagram and WhatsApp distribute your branded voucher link to their followers in exchange for a barter gift from your brand.',
                tag: '🤝 Zero upfront influencer cash',
              },
              {
                num: '03',
                bg: 'bg-green-100 dark:bg-green-900/30',
                text: 'text-green-600 dark:text-green-400',
                icon: <MessageCircle className="w-5 h-5 text-green-500" />,
                title: 'Customer Lands on Your WhatsApp',
                desc: 'Buyers tap directly into your WhatsApp carrying their voucher code and delivery address. You collect full payment via UPI and ship yourself — no middleman.',
                tag: '💰 100% lifetime customer ownership',
              },
            ].map(({ num, bg, text, icon, title, desc, tag }) => (
              <div key={num} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-pink-100 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center font-black text-lg ${text} mb-4`}>
                    {num}
                  </div>
                  <h3 className="font-bold text-base md:text-lg text-slate-800 dark:text-white mb-2">{title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
                </div>
                <div className="mt-5 flex items-center gap-2 bg-slate-50 dark:bg-slate-700/40 rounded-xl px-3 py-2.5">
                  {icon}
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{tag}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/brand-register">
              <button className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:scale-105">
                Get Started for Free
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. COMPARISON — Us vs Marketplaces
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-4 bg-pink-50/60 dark:bg-slate-900/60">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Honest Comparison</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mt-2">
              Old Marketplaces vs. GrahakSetu Direct
            </h2>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-2">
              Stop giving away a third of your hard-earned revenue just to sell your own products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-base text-slate-800 dark:text-white">Traditional Marketplaces</h3>
                <span className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold px-2.5 py-1 rounded-full">Legacy Trap</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">Amazon, Meesho, Nykaa & typical aggregators</p>
              <ul className="space-y-4">
                {[
                  { t: '25-35% commission on every order', d: 'Slices your entire craft manufacturing margin.' },
                  { t: '30–45 day payment holds', d: 'Strangles your working capital between settlements.' },
                  { t: 'Fake returns & RTO losses', d: 'Damaged packaging, lost inventory, zero accountability.' },
                  { t: 'You never get customer data', d: 'No phone, no email - you can\'t even do repeat sales.' },
                ].map(({ t, d }) => (
                  <li key={t} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm text-slate-800 dark:text-white">{t}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{d}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-2 text-center text-sm font-medium text-slate-600 dark:text-slate-300">
                Net profit kept: <strong className="text-red-500">~45–60%</strong>
              </div>
            </div>

            {/* GrahakSetu */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-primary/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-pink-200/40 dark:bg-pink-900/20 rounded-bl-full pointer-events-none" />
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-base text-slate-800 dark:text-white flex items-center gap-1.5">
                  GrahakSetu Direct <CheckCircle2 className="w-4 h-4 text-primary" />
                </h3>
                <span className="bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">The Better Way</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">Sovereign Direct-to-Customer ecosystem</p>
              <ul className="space-y-4">
                {[
                  { t: '₹0 commission — ever', d: 'Every rupee from the product price goes straight to your UPI.' },
                  { t: 'Instant payment before you ship', d: 'Customer pays via PhonePe / GPay / NetBanking before dispatch.' },
                  { t: 'Commitment-backed orders only', d: 'The ₹10 token eliminates phantom orders and returns.' },
                  { t: 'Direct WhatsApp relationship', d: 'Build lifetime loyalty — cross-sells, reviews, repeat buyers.' },
                ].map(({ t, d }) => (
                  <li key={t} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm text-slate-800 dark:text-white">{t}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{d}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-pink-50 dark:bg-pink-900/20 rounded-xl px-4 py-2 text-center text-sm font-medium text-slate-700 dark:text-slate-200">
                Net profit kept: <strong className="text-primary">100% of product price</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. WHY SELL / BENEFITS (4 cards)
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-4 bg-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Platform Benefits</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mt-2">Why Sell on GrahakSetu?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { bg: 'bg-green-100 dark:bg-green-900/30', icon: <Percent className="w-6 h-6 text-green-600 dark:text-green-400" />, title: '0% Commission', desc: 'We never touch your sales revenue. You handle payments directly with customers.' },
              { bg: 'bg-pink-100 dark:bg-pink-900/30', icon: <LineChart className="w-6 h-6 text-pink-600 dark:text-pink-400" />, title: 'Powerful Dashboard', desc: 'Track shop visitors, product views, and customer clicks in real-time analytics.' },
              { bg: 'bg-blue-100 dark:bg-blue-900/30', icon: <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />, title: 'GST-Free Onboarding', desc: 'No complicated paperwork to start. Get your brand page live in under 2 minutes.' },
              { bg: 'bg-orange-100 dark:bg-orange-900/30', icon: <MessageCircle className="w-6 h-6 text-orange-500 dark:text-orange-400" />, title: 'WhatsApp-First', desc: 'Customers connect on WhatsApp for orders — real relationships, repeat buyers.' },
            ].map(({ bg, icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-pink-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>{icon}</div>
                <h3 className="font-bold text-base mb-2 text-slate-800 dark:text-white text-center">{title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 text-center leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. TRANSPARENT PRICING
      ══════════════════════════════════════════ */}
      <section id="pricing" className="py-16 md:py-20 px-4 bg-pink-50/60 dark:bg-slate-900/60">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">No Hidden Percentage Fees</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mt-2">
              Transparent, Predictable Pricing
            </h2>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-2">
              Pick a flat monthly plan. Keep 100% of your product earnings — always.
            </p>
            {/* billing toggle */}
            <div className="mt-5 inline-flex items-center gap-1 p-1 bg-white/70 dark:bg-slate-800/70 border border-pink-100 dark:border-white/10 rounded-full shadow-sm">
              <button
                onClick={() => setBilling('monthly')}
                className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all ${billing === 'monthly' ? 'bg-primary text-white shadow' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
              >Monthly</button>
              <button
                onClick={() => setBilling('annual')}
                className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${billing === 'annual' ? 'bg-primary text-white shadow' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
              >
                Annual
                <span className="bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400 text-xs font-bold px-2 py-0.5 rounded-full">2 Mos Free</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Startup */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-pink-100 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Startup</span>
                  <span className="bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400 text-xs font-bold px-2.5 py-0.5 rounded-full">83% off</span>
                </div>
                <div className="text-sm text-slate-400 line-through mb-0.5">₹599</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">{billing === 'monthly' ? '₹99' : '₹79'}</span>
                  <span className="text-sm text-slate-500">/ month</span>
                </div>
                {billing === 'annual' && <p className="text-xs text-primary font-semibold mb-1">Billed annually</p>}
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">Perfect for new brands stepping out of exhibitions.</p>
                <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
                  {['0% Commission on all orders', 'Up to 10 products / month', 'Custom brand page & link', 'Direct WhatsApp order button', 'Brand dashboard access'].map(f => (
                    <li key={f} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />{f}</li>
                  ))}
                </ul>
              </div>
              <Link href="/subscriptions" className="block mt-6">
                <button className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-primary hover:text-white text-slate-800 dark:text-white font-bold text-sm transition-all">
                  Get Started — ₹{billing === 'monthly' ? '99' : '79'}/mo
                </button>
              </Link>
            </div>

            {/* Growth Pro — highlighted */}
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-primary/50 rounded-2xl p-6 shadow-xl flex flex-col justify-between relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">Most Popular</div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Growth Pro</span>
                  <span className="bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400 text-xs font-bold px-2.5 py-0.5 rounded-full">76% off</span>
                </div>
                <div className="text-sm text-slate-400 line-through mb-0.5">₹2,099</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-black text-primary">{billing === 'monthly' ? '₹499' : '₹399'}</span>
                  <span className="text-sm text-slate-500">/ month</span>
                </div>
                {billing === 'annual' && <p className="text-xs text-primary font-semibold mb-1">Billed annually</p>}
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">For established brands ready to scale daily volume.</p>
                <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
                  {['0% Commission forever', 'Unlimited product catalog', 'Custom domain (yourbrand.com)', 'Advanced real-time analytics', 'Realtime customer lead access', 'Priority WhatsApp support'].map(f => (
                    <li key={f} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />{f}</li>
                  ))}
                </ul>
              </div>
              <Link href="/subscriptions" className="block mt-6">
                <button className="w-full py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
                  Get Growth Pro — ₹{billing === 'monthly' ? '499' : '399'}/mo
                </button>
              </Link>
            </div>

            {/* Business Scale */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-pink-100 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Business Scale</span>
                  <span className="bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400 text-xs font-bold px-2.5 py-0.5 rounded-full">65% off</span>
                </div>
                <div className="text-sm text-slate-400 line-through mb-0.5">₹4,299</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">{billing === 'monthly' ? '₹1,499' : '₹1,199'}</span>
                  <span className="text-sm text-slate-500">/ month</span>
                </div>
                {billing === 'annual' && <p className="text-xs text-primary font-semibold mb-1">Billed annually</p>}
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">Multi-brand / agency accounts at scale.</p>
                <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
                  {['Everything in Growth Pro', 'Multiple brand pages', 'Dedicated account manager', 'Creator campaign matching', 'Bulk order management', 'API access & integrations'].map(f => (
                    <li key={f} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />{f}</li>
                  ))}
                </ul>
              </div>
              <Link href="/subscriptions" className="block mt-6">
                <button className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-primary hover:text-white text-slate-800 dark:text-white font-bold text-sm transition-all">
                  Get Scale — ₹{billing === 'monthly' ? '1,499' : '1,199'}/mo
                </button>
              </Link>
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 mt-5">No hidden fees · Cancel anytime · Zero lock-in</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-4 bg-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Trusted Voices</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mt-2">
              Loved By Modern Indian Makers
            </h2>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-2">
              Real stories from brands who broke free from marketplace dominance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: '"We were paying almost 32% on marketplace portals. With GrahakSetu, customers arrive right in our WhatsApp after paying ₹10. Our repeat order rate skyrocketed because we actually talk with them."',
                name: 'Pooja Sharma',
                brand: 'Mitti Herbals · Jaipur',
                emoji: '🌿',
              },
              {
                quote: '"Micro-creators in college groups shared our silver jewellery voucher to get gift sets. We had 240 genuine purchases in our first 10 days without spending a single rupee on Instagram Ads!"',
                name: 'Harshvardhan Rao',
                brand: 'Kaari Silver · Udaipur',
                emoji: '💍',
              },
              {
                quote: '"The ₹10 token commitment is brilliant psychology. Before, visitors would abandon carts. On GrahakSetu, every person pinging us on WhatsApp transfers UPI right away. Game changer."',
                name: 'Karthik Menon',
                brand: 'BeanCraft Coffee · Chikmagalur',
                emoji: '☕',
              },
            ].map(({ quote, name, brand, emoji }) => (
              <div key={name} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-pink-100 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-0.5 text-orange-400 mb-3">
                    {Array(5).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-orange-400" />)}
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">{quote}</p>
                </div>
                <div className="mt-5 flex items-center gap-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl px-4 py-3">
                  <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-lg shrink-0">{emoji}</div>
                  <div>
                    <p className="font-bold text-sm text-slate-800 dark:text-white">{name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{brand}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. FAQ ACCORDION
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-4 bg-pink-50/60 dark:bg-slate-900/60">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Clear Answers</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mt-2">Frequently Asked Questions</h2>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-2">Everything you need to know about getting direct customers on GrahakSetu.</p>
          </div>
          <div className="flex flex-col gap-3">
            <FaqItem
              q="Do you take any percentage of my product sales?"
              a="No! You keep 100% of your sales money. GrahakSetu charges zero commission on your orders. You only pay the flat monthly subscription fee. The ₹10 voucher commitment paid by the customer covers the platform's lead verification engine."
            />
            <FaqItem
              q="How does the ₹10 voucher system work exactly?"
              a="You create a micro-offer (e.g., Pay ₹10 and get ₹100 off your first order). A customer pays ₹10 to get a unique voucher code. They then message you on WhatsApp with the code and their delivery address. You collect full product payment via UPI and ship directly — no platform in between."
            />
            <FaqItem
              q="How do I handle shipping and delivery?"
              a="You ship through your existing preferred couriers — Shiprocket, Delhivery, Porter, India Post — exactly like you do today. There are no forced warehouse hubs or mandatory logistics deductions from us."
            />
            <FaqItem
              q="What if a creator doesn't deliver results?"
              a="Our barter safety lock protects you. Barter gifts and hampers are only unlocked for a creator once their unique link generates verified voucher redemptions. You never send free products blindly without confirmed conversions first."
            />
            <FaqItem
              q="Can I cancel my subscription anytime?"
              a="Yes, completely. There are zero long-term contracts or cancellation penalties. Cancel or pause anytime from your dashboard with a single tap."
            />
            <FaqItem
              q="Do I need a GST number or company registration to sign up?"
              a="No! You don't need GSTIN, company registration, or any complex paperwork to onboard. Just fill in your brand details and your page goes live in under 2 minutes."
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. BOTTOM CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-4 bg-transparent">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-primary to-pink-600 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* decorative circles */}
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/10 rounded-full pointer-events-none" />
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-white/5 rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
              <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                ⚡ Instant 5-Minute Launch
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-white leading-tight mb-3">
                Ready to get genuine orders this week?
              </h2>
              <p className="text-sm md:text-base text-pink-100 mb-6 leading-relaxed">
                Launch your ₹10 introductory offer today. Keep 100% of your customer base and product margin — forever.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full max-w-lg">
                <input
                  type="text"
                  placeholder="Your Brand Name or WhatsApp Number"
                  className="flex-1 h-12 px-4 rounded-xl bg-white/90 dark:bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/60 shadow-sm"
                />
                <Link href="/brand-register">
                  <button className="h-12 px-6 rounded-xl bg-white text-primary font-bold text-sm hover:bg-pink-50 transition-all shadow-md flex items-center gap-2 whitespace-nowrap w-full sm:w-auto justify-center">
                    Start Free Trial <Zap className="w-4 h-4" />
                  </button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-4 text-pink-100 text-xs">
                <span>✓ No credit card needed</span>
                <span>✓ Instant WhatsApp setup</span>
                <span>✓ Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}






