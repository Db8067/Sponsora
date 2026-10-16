'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Snowfall from '@/components/Snowfall';
import SellerNavbar from '@/components/SellerNavbar';
import ComingSoonView from '@/components/ComingSoonView';
import { MENTORSHIP_SERVICES } from '@/lib/mentorship-data';
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  MessageSquare,
  Share2,
  Star,
  ArrowRight,
  BookOpen,
  Handshake,
  ChevronDown,
} from 'lucide-react';

export default function OnlineMentorshipPage() {
  // Coming Soon modal state
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  // FAQ Accordion open index
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Animated sliding headline state
  const SLIDE_HEADLINES = [
    '1-2 Hour Online Sessions Until Every Doubt Is Crystal Clear.',
    'Build & Earn by just making simple projects.',
    'Direct Pitch Access to 50+ Verified Grahak Setu Brands.',
    'Close deal with 10+ Client daily With Confidence.',
  ];
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % SLIDE_HEADLINES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [SLIDE_HEADLINES.length]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative selection:bg-pink-100 selection:text-primary">
      <Snowfall />

      {/* Global Navbar */}
      <SellerNavbar />

      <main className="flex-1 w-full relative z-10 pt-4 sm:pt-6">
        {/* Hero Section */}
        <section className="w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Copy */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 dark:bg-pink-900/40 text-primary dark:text-pink-300 text-xs font-extrabold uppercase tracking-wider border border-pink-200 dark:border-pink-800/40 shadow-sm">
                <Clock className="w-3.5 h-3.5" />
                <span>1:1 Personalized Mentorship</span>
              </div>

              <h1 className="w-full text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.18]">
                <span className="block text-slate-900 dark:text-white mb-2 sm:mb-3">
                  Learn, Build & Earn:
                </span>
                {/* Grid stack ensures container naturally sizes to the tallest headline with zero clipping or overlap */}
                <span className="grid items-start overflow-hidden py-1">
                  {SLIDE_HEADLINES.map((line, idx) => {
                    const isCurrent = idx === currentSlideIndex;
                    const isPrev =
                      idx === (currentSlideIndex - 1 + SLIDE_HEADLINES.length) % SLIDE_HEADLINES.length;
                    return (
                      <span
                        key={line}
                        aria-hidden={!isCurrent}
                        className={`col-start-1 row-start-1 text-primary transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isCurrent
                            ? 'translate-y-0 opacity-100 pointer-events-auto'
                            : isPrev
                            ? '-translate-y-6 opacity-0 pointer-events-none'
                            : 'translate-y-6 opacity-0 pointer-events-none'
                        }`}
                      >
                        {line}
                      </span>
                    );
                  })}
                </span>
              </h1>

              <div className="w-full p-4 sm:p-5 rounded-2xl bg-white/75 dark:bg-slate-900/75 border border-pink-100 dark:border-white/10 backdrop-blur-sm shadow-sm">
                <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  Tired of 30-minute rushed Online Sessions where 15 minutes are wasted just explaining your project? We sit with you 1-on-1 for 1 to 2 full hours, screen-sharing directly, writing code, and building your real systems together.
                </p>
              </div>

              {/* Value Pills */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 bg-white/85 dark:bg-slate-800/85 rounded-2xl border border-pink-100 dark:border-white/10 shadow-sm flex items-center gap-2.5 backdrop-blur-sm">
                  <Terminal className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white">Earn with AI</span>
                </div>
                <div className="p-3.5 bg-white/85 dark:bg-slate-800/85 rounded-2xl border border-pink-100 dark:border-white/10 shadow-sm flex items-center gap-2.5 backdrop-blur-sm">
                  <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white">Get Leads & Clients</span>
                </div>
                <div className="p-3.5 bg-white/85 dark:bg-slate-800/85 rounded-2xl border border-pink-100 dark:border-white/10 shadow-sm flex items-center gap-2.5 backdrop-blur-sm">
                  <Share2 className="w-5 h-5 text-purple-600 shrink-0" />
                  <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white">Grahak Setu Access</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="https://wa.me/918527296771?text=Hi%2C%20I%20would%20like%20to%20get%20started%20with%201%3A1%20Personalized%20Mentorship%20at%20Grahak%20Setu."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-primary/25 transition-all hover:scale-[1.02] active:scale-95 text-center"
                >
                  <span>Let&apos;s start</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsComingSoonOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/85 dark:bg-slate-800/85 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-white border border-pink-200 dark:border-white/10 font-bold text-sm sm:text-base transition-all hover:shadow-md text-center"
                >
                  <span>Explore all the Services</span>
                  <BookOpen className="w-4 h-4" />
                </button>
              </div>

              {/* Rating Proof */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex text-amber-400">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                </div>
                <span className="font-black text-slate-800 dark:text-white">4.98 / 5.0</span>
                <span>from 140+ real Brands builds &amp; buisness operators</span>
              </div>
            </div>

            {/* Right Column: Clean Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-2 border-pink-200/70 dark:border-white/10 group p-4 sm:p-5 flex flex-col gap-4">
                <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden bg-pink-50 dark:bg-slate-800">
                  <Image
                    src="/images/mentorship-hero-banner.jpg"
                    alt="NextHour & Grahak Setu 1:1 Mentorship Artwork"
                    fill
                    sizes="(max-width: 640px) 340px, 460px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
                <div className="flex items-center justify-between gap-3 px-2 pt-1 text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Learn, Earn & Build</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-pink-100 dark:bg-pink-900/40 text-primary font-extrabold text-[11px]">
                    Start Earning Today
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison: The Broken 30-Minute Model vs NextHour Deep Sprints */}
        <section className="w-full bg-white/60 dark:bg-slate-900/60 py-16 px-4 sm:px-6 lg:px-8 border-y border-pink-100 dark:border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
                The Gap in Learning & Earning
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Why 30-Minute Mentorship Calls Are Completely Broken
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Learning AI is only the first step. Without consistent hands-on mentorship, practical implementation, and access to genuine business opportunities, it can be difficult to turn that learning into income.
              </p>
            </div>

            {/* Comparative Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* The Industry Default Card */}
              <div className="bg-white/80 dark:bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-red-200 dark:border-red-900/40 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-red-100 dark:border-red-900/20">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 flex items-center justify-center font-black text-lg">
                      ✕
                    </span>
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">Standard Industry Call</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">30-Minute Compressed Timer</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold">
                    Net Output: 0 Learning
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 space-y-1">
                    <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
                      <span>00:00 - 00:15 (15 Min)</span>
                      <span className="text-red-500">50% of call</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400">
                      Intros, pleasantries, and struggling to screen-share and explain the problem from scratch.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 space-y-1">
                    <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
                      <span>00:15 - 00:25 (10 Min)</span>
                      <span className="text-red-500">33% of call</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400">
                      High-level theory, surface-level pointers, and non-actionable blog-post recommendations.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 space-y-1">
                    <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
                      <span>00:25 - 00:30 (5 Min)</span>
                      <span className="text-red-500">17% of call</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 italic">
                      Rushed clock-watching: &ldquo;Hey, I have another hard stop call now, schedule another session tomorrow!&rdquo;
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/30 space-y-1 text-xs">
                  <p className="font-bold text-red-600 dark:text-red-400">The Outcome:</p>
                  <p className="text-slate-600 dark:text-slate-400">
                    You log off more confused than before, your bugs remain unresolved, and you waste another week spinning in circles.
                  </p>
                </div>
              </div>

              {/* The NextHour Model Card */}
              <div className="bg-white/80 dark:bg-slate-800/80 rounded-3xl p-6 sm:p-8 border-2 border-emerald-400 dark:border-emerald-600 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-100 dark:border-emerald-900/20">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-lg">
                      ✓
                    </span>
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">Grahak Setu - 1:1 Mentorship</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">1 to 2 Uncapped Full Hours</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                    Learn, Build & Earn
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 space-y-1">
                    <div className="flex justify-between font-bold text-emerald-800 dark:text-emerald-300">
                      <span>00:00 - 00:05 (5 Min)</span>
                      <span>Immediate Sync</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      Pre-submitted GitHub repo or Figma file already opened on screen. Target outcome locked instantly.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 space-y-1">
                    <div className="flex justify-between font-bold text-emerald-800 dark:text-emerald-300">
                      <span>00:05 - 00:50 (45 Min)</span>
                      <span>Live Pair Building</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      We take screen control, write schemas, hook webhooks, configure LLM chains, and build the real code.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 space-y-1">
                    <div className="flex justify-between font-bold text-emerald-800 dark:text-emerald-300">
                      <span>00:50 - 01:20 (30 Min)</span>
                      <span>Stress-Test &amp; Edge Cases</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      Testing failure scenarios, rate-limits, database triggers, and prompting robustness live with you.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 space-y-1">
                    <div className="flex justify-between font-bold text-emerald-800 dark:text-emerald-300">
                      <span>01:20 - 01:40+ (20+ Min)</span>
                      <span>Action Roadmap</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      Deploy to production server, test live webhooks, assign exact implementation milestones for the week.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-100/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 space-y-1 text-xs">
                  <p className="font-bold text-emerald-800 dark:text-emerald-300">The Outcome:</p>
                  <p className="text-slate-700 dark:text-slate-300">
                    You build the proejct, you learned, Doubts Solve and you get clients and customer for your brand.
                  </p>
                </div>
              </div>
            </div>

            {/* Time Utilization Visual */}
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-6 border border-pink-100 dark:border-white/10 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm sm:text-base">
                    Interactive Time Utilization Breakdown
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Where your actual minutes are spent across 1-on-1 sessions
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <span className="w-3 h-3 rounded bg-slate-400" /> 15% Strategy &amp; Sync
                  </span>
                  <span className="flex items-center gap-1.5 text-primary">
                    <span className="w-3 h-3 rounded bg-primary" /> 60% Build &amp; Code
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <span className="w-3 h-3 rounded bg-emerald-500" /> 25% Testing &amp; Deploy
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-4 rounded-full bg-slate-100 dark:bg-slate-700 flex overflow-hidden">
                <div className="h-full bg-slate-400" style={{ width: '15%' }} title="15% Alignment" />
                <div className="h-full bg-primary" style={{ width: '60%' }} title="60% Pair Execution" />
                <div className="h-full bg-emerald-500" style={{ width: '25%' }} title="25% Live Verification" />
              </div>

              <div className="grid grid-cols-3 text-center text-xs text-slate-600 dark:text-slate-400 pt-1">
                <div>15m Rapid Alignment</div>
                <div className="font-bold text-primary">60m Active Pair Execution</div>
                <div>25m Live Verification &amp; Client Demo</div>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive Skill Curriculum Section (All 17 Tracks - Clean Headlines Only) */}
        <section id="curriculum" className="w-full py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
                  17 Hands-On Mastery Tracks
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  Learn all about AI with Grahak Setu...
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsComingSoonOpen(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 flex items-center gap-1.5 self-start md:self-auto"
              >
                <span>View Services Plans</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Clean Track Headlines - No Cards, No Images, No Descriptions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 pt-2">
              {MENTORSHIP_SERVICES.map((s, idx) => (
                <div key={s.slug} className="flex items-start gap-3 py-1">
                  <span className="text-xs font-black text-primary shrink-0 mt-0.5">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                    {s.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Grahak Setu Advantage (Direct 50+ Brand Network) */}
        <section className="w-full bg-gradient-to-b from-pink-50/50 via-white to-pink-50/50 dark:from-slate-900/60 dark:via-slate-850/60 dark:to-slate-900/60 py-16 px-4 sm:px-6 lg:px-8 border-y border-pink-100 dark:border-white/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800/40">
                <Handshake className="w-4 h-4 text-emerald-600" />
                <span>THE UNFAIR DISTRIBUTION ADVANTAGE</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                You Don&apos;t Just Learn. You Pitch to{' '}
                <span className="text-emerald-600 dark:text-emerald-400">50+ Live Partner Brands</span>.
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Most courses leave you stranded with projects that sit abandoned in GitHub. Grahak Setu mentees get direct access to our verified{' '}
                <strong className="text-slate-900 dark:text-white font-bold">Grahak Setu brand pipeline</strong>.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <li className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Direct demo presentation slots to pre-vetted founders and D2C heads.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Instant client references that validate your portfolio credibility.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Opportunity to close ₹50,000 to ₹1,50,000 implementation contracts.</span>
                </li>
              </ul>

              <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-emerald-200 dark:border-emerald-900/40 shadow-sm flex items-center justify-between">
                <div>
                  <div className="font-black text-lg text-slate-900 dark:text-white">54 Active Brands</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Looking for AI &amp; WhatsApp Automation today</p>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-md">
                  100% Pipeline Access
                </span>
              </div>
            </div>

            {/* Network Placement Cards Visual */}
            <div className="lg:col-span-7 bg-white/95 dark:bg-slate-800/95 p-6 sm:p-8 rounded-3xl shadow-xl border border-pink-100 dark:border-white/10 space-y-5 backdrop-blur-sm">
              <div className="flex items-center justify-between pb-3 border-b border-pink-100 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-sm sm:text-base text-slate-800 dark:text-white">
                    Recent Mentee Placements &amp; Deployments
                  </span>
                </div>
                <span className="text-xs font-semibold text-primary">Verified by Grahak Setu</span>
              </div>

              {/* Sample Matches */}
              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-2xl bg-pink-50/50 dark:bg-slate-900/40 border border-pink-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">D2C Fashion Label (Mumbai)</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                        Contract Closed
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400">Automated WhatsApp Abandoned Cart &amp; Order Tracking Bot</p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">₹85,000 Retainer</span>
                    <p className="text-[11px] text-slate-400">Built by Mentee Rahul S.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-pink-50/50 dark:bg-slate-900/40 border border-pink-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">FinTech SaaS Partner</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                        Active Retainer
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400">LangChain RAG Knowledge Base for Inbound Lead Audit</p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">₹1,20,000 / mo</span>
                    <p className="text-[11px] text-slate-400">Built by Mentee Ananya P.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-pink-50/50 dark:bg-slate-900/40 border border-pink-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">Healthcare Clinic Chain</span>
                      <span className="px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-900 text-primary dark:text-pink-300 text-[10px] font-bold">
                        Demo Scheduled
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400">Voice AI Inbound Appointment Scheduling Agent</p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="font-black text-primary text-sm">₹65,000 Upfront</span>
                    <p className="text-[11px] text-slate-400">Pitch by Mentee Vikram K.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>*Brand introductions happen directly inside your weekly 1:1 sessions.</span>
                <span className="text-primary font-bold">No placement agent fees taken</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section (LAST SECTION ON THE PAGE) */}
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-900/50 border-t border-pink-100 dark:border-white/10">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
                Clarity First
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Everything you need to know about our 1-2 hour live mentorship format.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: "What happens if my technical doubt isn't resolved in 1 hour?",
                  a: "That is the exact reason we built Grahak Setu. Unlike marketplaces that cut your call off at 30 minutes on the dot, our standard session window is 1 to 2 full hours. If a complex database migration or webhook handler takes 105 minutes, your mentor remains on screen with you until it passes all integration tests.",
                },
                {
                  q: 'How does the Grahak Setu 50+ brand pipeline actually work?',
                  a: 'Grahak Setu is our sister network representing over 50 verified Indian and international brands seeking AI automations, chatbots, and modern web infrastructure. Once you build a deployable solution in our sprints, your mentor directly prepares and submits your solution to partner founders seeking vendors, opening high-probability paid contracts.',
                },
                {
                  q: 'Can I pause or cancel my ₹15,000 monthly retainer?',
                  a: 'Yes, completely. There are no 6-month or 12-month lock-ins. You can enroll for one month, ship a specific high-value client project or agency infrastructure, and pause anytime with zero penalty.',
                },
                {
                  q: 'Do I need prior coding experience to join?',
                  a: 'We work with both technical builders and non-technical agency operators. For non-technical operators, we utilize no-code and low-code frameworks (Make.com, n8n, OpenAI Assistants, FlutterFlow) while teaching you enough code mechanics to never be stuck. During the free diagnostic call, we map out the ideal stack for your capabilities.',
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-pink-100 dark:border-white/10 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-800 dark:text-white"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-primary shrink-0 transition-transform duration-200 ${
                        openFaq === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-pink-50 dark:border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Coming Soon Modal */}
      <ComingSoonView
        isModal
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
        title="Coming Soon"
        subtitle="Something Amazing is on the way! We are putting the finishing touches on our mentorship plans."
      />
    </div>
  );
}
