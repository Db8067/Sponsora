'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import SellerNavbar from '@/components/SellerNavbar';
import {
  CheckCircle2, ArrowRight, Zap, Shield, Users, MessageCircle,
  Copy, Download, Send, Check, Sparkles, HelpCircle, Receipt,
  Smartphone, Award, QrCode, FileText, Lock, Star, Clock, HeartHandshake, TrendingUp
} from 'lucide-react';

export interface Welcome99ClientProps {
  slug: string;
  brand?: string;
  founder?: string;
  email?: string;
  phone?: string;
  plan?: string;
  amount?: string;
}

export function Welcome99Client({ 
  slug, 
  brand, 
  founder = 'Founder', 
  email = 'radhika@mittiherbals.com', 
  phone = '98765 43210', 
  plan = 'Starter Maker', 
  amount = '99' 
}: Welcome99ClientProps) {
  // Format brand name from slug: e.g. "mitti-herbals" -> "Mitti Herbals"
  const formattedBrand = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const brandName = brand || formattedBrand;
  const founderName = founder;
  const planName = plan;

  const brandInitials = brandName
    .split(' ')
    .map(w => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'MH';

  const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '');

  const [copied, setCopied] = useState(false);
  const [offerText, setOfferText] = useState('₹100 Off + Free Herbal Lip Balm');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`grahaksetu.in/${cleanSlug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <SellerNavbar />

      {/* ── Sticky Reassurance Top Bar ── */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-2 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded bg-primary/30 text-pink-300 text-[10px] font-bold uppercase tracking-wider">
              Zero Risk
            </span>
            <span className="text-slate-300">
              Bank-grade 256-bit security &bull; Direct UPI settlement to your QR &bull; Pause or cancel anytime
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Instant Webhook Sync
            </span>
            <span className="hidden sm:inline">24/7 Founder Concierge</span>
          </div>
        </div>
      </div>

      {/* ── Sub-header Progress Pill ── */}
      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-b border-pink-100 dark:border-white/10 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap font-semibold">
            <div className="flex items-center gap-1.5 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full border border-green-200 dark:border-green-800/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
              <span>1. Account Created</span>
            </div>
            <span className="text-slate-300 dark:text-slate-600">&rarr;</span>
            <div className="flex items-center gap-1.5 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full border border-green-200 dark:border-green-800/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
              <span>2. Plan Activated</span>
            </div>
            <span className="text-slate-300 dark:text-slate-600">&rarr;</span>
            <div className="flex items-center gap-1.5 text-primary bg-pink-50 dark:bg-pink-900/30 px-3 py-1 rounded-full border border-pink-200 dark:border-pink-800/40">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>3. Fast Launchpad</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800/40 font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span>Subscription Active &bull; ₹{amount}/mo</span>
            </div>
            <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-3">
              <div className="w-7 h-7 rounded-full bg-pink-100 dark:bg-pink-900/40 text-primary font-bold text-xs flex items-center justify-center border border-pink-200 dark:border-pink-800">
                {brandInitials}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-800 dark:text-white leading-tight">{brandName}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">{planName}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* ══════════════════════════════════════════
            SECTION 1: HERO CELEBRATION & RECEIPT
        ══════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-3xl border border-pink-100 dark:border-white/10 p-6 sm:p-10 shadow-xl">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-pink-200/30 dark:bg-pink-900/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-green-100/30 dark:bg-green-900/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 font-semibold text-xs border border-green-200 dark:border-green-800/40">
                <Sparkles className="w-4 h-4 text-green-600" />
                MEMBERSHIP OFFICIALLY ACTIVE
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 dark:text-white tracking-tight leading-tight">
                You&apos;re Officially in the Loop, <span className="text-primary">{brandName}!</span> 🎉
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Your <span className="font-bold text-slate-900 dark:text-white">₹{amount}/month {planName}</span> membership is confirmed &amp; active. Start getting direct, zero-commission customer orders right on your WhatsApp.
              </p>

              {/* Purchase Confirmation Receipt Pill */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 backdrop-blur border border-pink-100 dark:border-white/10 shadow-sm flex flex-wrap items-center gap-y-2 gap-x-4 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Order ID: #IND-{amount}-84920</span>
                </div>
                <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">&bull;</span>
                <div className="text-slate-700 dark:text-slate-300 font-medium">
                  <span className="font-bold text-green-600 dark:text-green-400">₹{amount} Paid</span> via UPI Autopay
                </div>
                <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">&bull;</span>
                <div className="text-slate-600 dark:text-slate-400">
                  Next billing: <span className="font-semibold text-slate-800 dark:text-white">30 days</span>
                </div>
                <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">&bull;</span>
                <div className="text-slate-500 dark:text-slate-400 text-[11px] truncate flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  Invoice sent to <span className="font-medium text-slate-700 dark:text-slate-300 underline">{email}</span>
                </div>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:w-80">
              <Link
                href="#fast-start"
                className="w-full py-4 px-6 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-xl shadow-primary/30 flex items-center justify-center gap-2 group transition-all transform hover:-translate-y-0.5"
              >
                <span>Continue to Fast Launchpad</span>
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                type="button"
                onClick={() => alert(`GST Tax Invoice generated for ${brandName} (₹${amount}/mo)`)}
                className="w-full py-3 px-5 rounded-2xl bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Receipt className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Download GST Tax Invoice</span>
              </button>
              <div className="text-[11px] text-center text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
                <Lock className="w-3.5 h-3.5 text-green-600" />
                Secure 256-Bit SSL &bull; Auto-renews at ₹{amount}/mo (cancel anytime)
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 2: ACTIVE ENTITLEMENTS (6 Cards)
        ══════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 text-primary font-semibold text-xs tracking-wide mb-2">
                <Zap className="w-3.5 h-3.5" />
                <span>LIVE SUBSCRIPTION ENTITLEMENTS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                Your Active ₹{amount}/month {planName} Includes:
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                All entitlements are unlocked and available on your store profile immediately.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800/40 px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              6 of 6 Services Active
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <Users className="w-6 h-6 text-primary" />,
                title: '150 Verified Buyer Leads',
                badge: 'Monthly',
                badgeStyle: 'bg-pink-100 dark:bg-pink-900/40 text-primary',
                desc: 'Targeted regional shoppers browsing for authentic Indian products who claim your introductory micro-voucher.',
                sub: 'High-Intent Shoppers',
                status: 'Activated',
              },
              {
                icon: <TicketIcon className="w-6 h-6 text-amber-600" />,
                title: '1 Live ₹10 Micro-Voucher',
                badge: 'Ready',
                badgeStyle: 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300',
                desc: 'Filters out tire-kickers by asking buyers for a symbolic ₹10 token that instantly unlocks your high-converting WhatsApp chat offer.',
                sub: 'Intent Filter Mechanism',
                status: 'Activated',
              },
              {
                icon: <MessageCircle className="w-6 h-6 text-green-600" />,
                title: 'WhatsApp Business Routing',
                badge: `+91 ${phone}`,
                badgeStyle: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-mono',
                desc: `Every voucher claim automatically pre-fills a personalized order inquiry message straight to ${brandName}'s verified number.`,
                sub: 'Direct WhatsApp Handoff',
                status: 'Connected',
              },
              {
                icon: <Shield className="w-6 h-6 text-purple-600" />,
                title: '0% Marketplace Brokerage',
                badge: 'Forever',
                badgeStyle: 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300',
                desc: 'Keep 100% of your basket value. Buyers pay directly into your existing Indian bank account via GPay, PhonePe, or UPI.',
                sub: 'No 30% Marketplace Cuts',
                status: 'Guaranteed',
              },
              {
                icon: <QrCode className="w-6 h-6 text-blue-600" />,
                title: 'Starter Link & QR Kit',
                badge: `grahaksetu.in/${cleanSlug}`,
                badgeStyle: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-mono',
                desc: 'Your personalized mobile microsite, high-res printable flyer QR codes for parcel inserts, and clean shareable bio link.',
                sub: 'Instagram Bio Ready',
                status: 'Kit Ready',
              },
              {
                icon: <TrendingUp className="w-6 h-6 text-slate-700 dark:text-slate-300" />,
                title: 'Analytics & Claim Tracker',
                badge: 'Real-time',
                badgeStyle: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200',
                desc: 'Monitor page visits, voucher purchase conversions, and chat engagement metrics with exportable CSV customer contacts.',
                sub: 'GDPR & DPDP Compliant',
                status: 'Active',
              },
            ].map((card, i) => (
              <div key={i} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 dark:border-white/10 shadow-sm hover:shadow-md hover:border-pink-300 dark:hover:border-pink-700 transition-all group">
                <div className="w-11 h-11 rounded-xl bg-pink-50 dark:bg-slate-700 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  {card.icon}
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-base text-slate-800 dark:text-white">{card.title}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${card.badgeStyle}`}>
                    {card.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">{card.desc}</p>
                <div className="mt-4 pt-3 border-t border-pink-100 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>{card.sub}</span>
                  <span className="font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {card.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 3: DAY 1 FAST START (3 Steps)
        ══════════════════════════════════════════ */}
        <section id="fast-start" className="space-y-6 scroll-mt-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 text-primary font-semibold text-xs tracking-wide mb-2">
              <span>DAY 1 LAUNCHPAD</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight">
              3 Steps to Your First Direct Sale in 48 Hours
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Complete these quick setup actions to turn social media browsers into direct WhatsApp customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Step 1 */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-6 sm:p-7 border border-pink-100 dark:border-white/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/40 text-primary font-bold text-sm flex items-center justify-center border border-pink-200 dark:border-pink-800">
                    1
                  </span>
                  <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/40">
                    Takes 2 mins
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-snug">
                  Customize Your ₹10 Welcome Offer
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Makers who offer a tangible incentive like <strong className="text-slate-800 dark:text-white">&quot;₹120 OFF on orders above ₹599&quot;</strong> convert 3.4x faster.
                </p>
                <div className="mt-4 p-3 bg-pink-50/50 dark:bg-slate-900/50 rounded-xl border border-pink-100 dark:border-white/10 text-xs space-y-2">
                  <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Active Welcome Offer:</div>
                  <input
                    type="text"
                    value={offerText}
                    onChange={e => setOfferText(e.target.value)}
                    className="w-full font-semibold text-primary bg-white dark:bg-slate-800 p-2 rounded-lg border border-pink-200 dark:border-pink-800/40 outline-none text-xs focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-pink-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => alert(`Offer updated to: "${offerText}"`)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold transition-all hover:bg-primary dark:hover:bg-primary dark:hover:text-white flex items-center justify-center gap-1.5"
                >
                  <span>Set Welcome Offer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-6 sm:p-7 border border-pink-100 dark:border-white/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/40 text-primary font-bold text-sm flex items-center justify-center border border-pink-200 dark:border-pink-800">
                    2
                  </span>
                  <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800/40">
                    Key Driver
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-snug">
                  Paste Magic Link in Instagram Bio &amp; Story
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Replace standard link trees with your direct GrahakSetu link. Pin it to your Instagram bio and post an announcement Story today.
                </p>
                <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-pink-100 dark:border-white/10 text-xs space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Your Storefront URL:</div>
                  <div className="flex items-center justify-between gap-2 bg-white dark:bg-slate-800 px-2.5 py-2 rounded-lg border border-pink-100 dark:border-white/10 font-mono text-[11px] text-slate-800 dark:text-white">
                    <span className="truncate">grahaksetu.in/{cleanSlug}</span>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="text-primary font-bold shrink-0 hover:underline flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-pink-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => alert(`Downloading Bio Kit Assets for ${brandName}...`)}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Download Bio Kit Assets</span>
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-6 sm:p-7 border border-pink-100 dark:border-white/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/40 text-primary font-bold text-sm flex items-center justify-center border border-pink-200 dark:border-pink-800">
                    3
                  </span>
                  <span className="text-[11px] font-semibold text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/30 px-2.5 py-0.5 rounded-full border border-green-200 dark:border-green-800/40">
                    Sales Pipeline
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-snug">
                  Receive Pre-Qualified WhatsApp Buyers
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  When a buyer claims the ₹10 voucher, your phone pings with their full name, location, and desired product. Close via your UPI QR.
                </p>
                <div className="mt-4 p-3 bg-green-50/70 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800/40 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-green-900 dark:text-green-300">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                    <span>Instant WhatsApp Alert:</span>
                  </div>
                  <p className="text-[11px] text-green-800 dark:text-green-300 italic">
                    &quot;Hi {founderName}! I just unlocked the ₹100 voucher #{brandInitials}-8921. I want to place an order!&quot;
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-pink-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => alert(`Test ping sent to WhatsApp number +91 ${phone}!`)}
                  className="w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-primary/20"
                >
                  <span>Test Live Demo Ping</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 4: SMARTPHONE PREVIEW / DEMO
        ══════════════════════════════════════════ */}
        <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-pink-100 dark:border-white/10 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-bold">
                <Smartphone className="w-4 h-4 text-green-600" />
                LIVE BUYER EXPERIENCE
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                Here&apos;s Exactly How Customers Discover &amp; Order From You
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Forget complex e-commerce carts with 80% abandonment. Customers claim your micro-voucher on a blazing-fast page and transition instantly to your WhatsApp to chat with you like a personal concierge.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  { icon: '🌐', title: 'Personalized Bio Storefront', desc: `grahaksetu.in/${cleanSlug} (Mobile optimized & indexed)` },
                  { icon: '💬', title: 'Zero Friction Validation', desc: 'Only serious shoppers pay the ₹10 token, eliminating spam bots' },
                  { icon: '💳', title: 'Instant Payment to Your UPI', desc: 'Direct settlement within seconds, zero waiting on marketplace payouts' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-pink-100 dark:border-white/10">
                    <span className="text-xl">{item.icon}</span>
                    <div className="text-xs">
                      <span className="font-bold text-slate-800 dark:text-white block">{item.title}</span>
                      <span className="text-slate-500 dark:text-slate-400">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smartphone Mockup */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-sm bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-4 border-slate-800">
                <div className="bg-slate-950 rounded-[2rem] overflow-hidden border border-slate-800 text-slate-900 dark:text-white">
                  {/* Status Bar */}
                  <div className="bg-slate-900 px-6 pt-3 pb-2 text-white flex items-center justify-between text-[11px] font-medium">
                    <span>9:41</span>
                    <div className="w-20 h-4 bg-black rounded-full" />
                    <div className="flex items-center gap-1.5 text-[10px]">100%</div>
                  </div>
                  {/* WhatsApp Header */}
                  <div className="bg-[#075E54] text-white p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-white text-primary font-bold text-xs flex items-center justify-center">
                        {brandInitials}
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-none flex items-center gap-1">
                          {brandName}
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                        </div>
                        <div className="text-[10px] text-emerald-200 mt-0.5">Online &bull; GrahakSetu Verified Brand</div>
                      </div>
                    </div>
                  </div>
                  {/* Chat Content */}
                  <div className="bg-[#ECE5DD] dark:bg-slate-800 p-3.5 space-y-3 min-h-[300px] text-xs flex flex-col justify-end">
                    <div className="text-center my-1">
                      <span className="bg-white/80 dark:bg-slate-900/80 backdrop-blur px-2.5 py-0.5 rounded-full text-[10px] text-slate-600 dark:text-slate-300 font-medium shadow-sm">
                        Voucher Claimed via GrahakSetu &bull; Today
                      </span>
                    </div>
                    {/* Incoming */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl rounded-tl-xs p-3 shadow-sm max-w-[85%] space-y-1.5 self-start text-slate-800 dark:text-slate-200">
                      <div className="flex items-center gap-1 text-[10px] text-primary font-bold">
                        <span>🎫 VERIFIED VOUCHER #{brandInitials}-8921</span>
                      </div>
                      <p className="text-xs leading-snug">
                        &quot;Namaste {founderName}! I just unlocked the ₹100 welcome voucher from your Instagram bio. Could I order your bestseller product?&quot;
                      </p>
                      <div className="flex items-center justify-between pt-1 text-[9px] text-slate-400">
                        <span>Priya Nair &bull; Bengaluru</span>
                        <span>9:42 AM</span>
                      </div>
                    </div>
                    {/* Outgoing */}
                    <div className="bg-[#DCF8C6] dark:bg-green-900/50 rounded-2xl rounded-tr-xs p-3 shadow-sm max-w-[85%] space-y-1.5 self-end text-left text-slate-800 dark:text-slate-200">
                      <p className="text-xs leading-snug">
                        &quot;Namaste Priya! Thank you for supporting our studio! 🙏 Yes, we have stock ready to dispatch today.&quot;
                      </p>
                      <div className="p-2 bg-white/70 dark:bg-slate-900/60 rounded-lg text-[10px] text-slate-700 dark:text-slate-300 border border-green-200 dark:border-green-800">
                        <div className="font-bold">Total: ₹699 - ₹100 = ₹599</div>
                        <div className="text-green-700 dark:text-green-400 font-medium">Free Shipping Included</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 5: COMMUNITY & CASE STUDIES
        ══════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 font-semibold text-xs tracking-wide mb-2">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>FOUNDER COMMUNITY</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                Other Starter Brands Who Made Sales in 48 Hours
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Joined by 850+ Homegrown Indian Makers</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                initials: 'AR',
                name: 'Ananya Roy',
                brand: 'Buraansh Organic Honey (Nainital)',
                quote: '"We activated the ₹99 plan on Tuesday noon. By Wednesday evening, our first ₹10 voucher converted into a ₹1,450 bulk honey gift box on WhatsApp!"',
                badge: 'First sale in 28 hrs',
                sub: 'Saved ₹435 cut',
              },
              {
                initials: 'VS',
                name: 'Varun Soni',
                brand: 'The Terracotta Project (Kolkata)',
                quote: '"Marketplace return scams almost shut down our pottery studio. On GrahakSetu, every customer who pays ₹10 speaks with me directly. 99% fulfillment rate!"',
                badge: '0% Return Losses',
                sub: 'Saved ₹32,000 / mo',
              },
            ].map(story => (
              <div key={story.name} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-pink-100 dark:border-white/10 p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 font-bold flex items-center justify-center text-xs">
                      {story.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white">{story.name}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{story.brand}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 italic leading-relaxed">
                    {story.quote}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-pink-100 dark:border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-green-700 dark:text-green-400 font-bold bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded">{story.badge}</span>
                  <span className="text-slate-500 dark:text-slate-400">{story.sub}</span>
                </div>
              </div>
            ))}

            {/* Concierge Card */}
            <div className="bg-gradient-to-br from-pink-50 via-white to-amber-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 rounded-2xl border-2 border-primary/20 p-5 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-green-600 text-white flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white">Your GrahakSetu Concierge</h4>
                    <p className="text-[10px] text-green-700 dark:text-green-400 font-semibold">Available for {brandName}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Need help crafting your first high-converting voucher or formatting your bio link? Ping your dedicated maker onboarding specialist directly on WhatsApp.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-pink-100 dark:border-white/10">
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat with Founder Concierge</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 6: STICKY BOTTOM CTA & GUARANTEES
        ══════════════════════════════════════════ */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-3xl border-2 border-primary/40 p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
              <h3 className="text-lg font-black text-slate-800 dark:text-white">Ready to launch your first offer for {brandName}?</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
              Everything is set up. Your first 150 buyer slots are loaded. Configure your welcome voucher and start receiving direct inquiries.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="#fast-start"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group transition-all"
            >
              <span>Continue to Fast Launchpad</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Trust Guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-500 dark:text-slate-400 pb-4">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            ₹{amount}/month Flat &bull; No Hidden Platform Fees
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-green-600" />
            Cancel subscription anytime in 1 click
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-green-600" />
            100% Direct Customer UPI Payments
          </span>
        </div>

      </main>
    </div>
  );
}

function TicketIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
      <path d="M13 5v2" /><path d="M13 11v2" /><path d="M13 17v2" />
    </svg>
  );
}
