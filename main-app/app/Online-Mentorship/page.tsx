'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Snowfall from '@/components/Snowfall';
import SellerNavbar from '@/components/SellerNavbar';
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
  Bot,
  Mic,
  Laptop,
  Search,
  Globe,
  Video,
  Handshake,
  Users,
  ChevronDown,
  Check,
  X,
  Phone,
  Mail,
  Calendar,
  Sparkles,
  Zap,
  Building,
  Target,
} from 'lucide-react';

export default function OnlineMentorshipPage() {
  // Form submission state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    goal: 'whatsapp',
    stage: 'starter',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ Accordion open index
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate diagnostic request logging
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative selection:bg-pink-100 selection:text-primary">
      <Snowfall />

      {/* Global Navbar */}
      <SellerNavbar />

      {/* Top Protocol Announcement Bar */}
      <div className="bg-gradient-to-r from-pink-500/10 via-primary/15 to-pink-500/10 border-b border-pink-200/50 dark:border-white/10 py-2 px-4 text-center backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-pink-100">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary text-white text-[11px] font-extrabold uppercase tracking-wider">
            Unrushed Format
          </span>
          <span className="truncate">
            ⚡ 1-2 Hour Live 1:1 Sessions Until Every Doubt is Resolved • Zero 30-Min Rush • Direct Brand Access
          </span>
        </div>
      </div>

      <main className="flex-1 w-full relative z-10">
        {/* Cohort Trust Bar */}
        <section className="w-full bg-white/70 dark:bg-slate-900/70 border-b border-pink-100 dark:border-white/10 py-2.5 px-4 sm:px-8 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active Cohort Open
              </span>
              <span className="text-slate-600 dark:text-slate-300 hidden sm:inline">
                Strict limit: Only 12 mentees accepted per month for uncompromised mentor focus.
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 text-slate-600 dark:text-slate-300 font-medium">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" /> 100% Doubt Resolution Guarantee
              </span>
              <span className="hidden md:inline text-slate-300 dark:text-slate-700">•</span>
              <span className="hidden md:inline">Zero 30-Min Timers</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 dark:bg-pink-900/40 text-primary dark:text-pink-300 text-xs font-extrabold uppercase tracking-wider border border-pink-200 dark:border-pink-800/40 shadow-sm">
                <Clock className="w-3.5 h-3.5" />
                <span>THE UNRUSHED MENTORSHIP STANDARD</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                1:1 Personalized Mentorship:{' '}
                <span className="text-primary underline decoration-primary/30 decoration-wavy decoration-2">
                  1-2 Hour Live Sprints
                </span>{' '}
                Until Every Doubt Is Crystal Clear.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                Tired of 30-minute rushed consultations where 15 minutes are wasted just explaining your project? We sit with you 1-on-1 for 1 to 2 full hours, screen-sharing directly, writing code, and building your real systems together.
              </p>

              {/* Value Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-2xl border border-pink-100 dark:border-white/10 shadow-sm flex items-center gap-2.5 backdrop-blur-sm">
                  <Terminal className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white">Live Code Reviews</span>
                </div>
                <div className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-2xl border border-pink-100 dark:border-white/10 shadow-sm flex items-center gap-2.5 backdrop-blur-sm">
                  <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white">Mentor WhatsApp</span>
                </div>
                <div className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-2xl border border-pink-100 dark:border-white/10 shadow-sm flex items-center gap-2.5 backdrop-blur-sm">
                  <Share2 className="w-5 h-5 text-purple-600 shrink-0" />
                  <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white">Grahak Setu Access</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#apply"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-primary/25 transition-all hover:scale-[1.02] active:scale-95 text-center"
                >
                  <span>Book Free 1:1 Diagnostic Call</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#curriculum"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-white border border-pink-200 dark:border-white/10 font-bold text-sm sm:text-base transition-all hover:shadow-md text-center"
                >
                  <span>Explore Curriculum</span>
                  <BookOpen className="w-4 h-4" />
                </a>
              </div>

              {/* Rating Proof */}
              <div className="flex items-center gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex text-amber-400">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                </div>
                <span className="font-black text-slate-800 dark:text-white">4.98 / 5.0</span>
                <span>from 140+ real client builds & agency operators</span>
              </div>
            </div>

            {/* Right Column: Visual Showcase & Dual Retainer Card */}
            <div className="lg:col-span-5 relative space-y-4">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-pink-50/60 dark:bg-slate-900 border-2 border-pink-200/70 dark:border-white/10 group p-4 sm:p-6 flex items-center justify-center">
                <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden">
                  <Image
                    src="/hero-art.png"
                    alt="NextHour & Grahak Setu 1:1 Mentorship Doodle"
                    fill
                    sizes="(max-width: 640px) 340px, 460px"
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>

              {/* Transparent Highlight Retainer Card */}
              <div className="bg-white/95 dark:bg-slate-850/95 backdrop-blur-md p-6 rounded-3xl shadow-xl border-2 border-primary/40 space-y-4 relative -mt-8 mx-2 sm:mx-4 z-20">
                <div className="flex items-center justify-between pb-2 border-b border-pink-100 dark:border-white/10">
                  <span className="text-xs font-black uppercase tracking-wider text-primary">
                    Transparent Monthly Retainers
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold">
                    Zero Hidden Fees
                  </span>
                </div>

                {/* Tier 1: 1:1 Mentorship */}
                <div className="p-3.5 rounded-2xl bg-pink-50/60 dark:bg-slate-800/80 border border-pink-100 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-pink-200 text-pink-800">1:1 Deep Sprints</span>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-1">1:1 Live Mentorship</h4>
                    <p className="text-[11px] text-slate-500">1-2 hour sessions until doubt clear</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-primary">₹15,000</span>
                    <span className="text-[11px] text-slate-500 block">/ month</span>
                  </div>
                </div>

                {/* Tier 2: DFY Engine */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-slate-800/80 border border-emerald-100 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-200 text-emerald-800">Done-For-You</span>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-1">DFY Website + Clients</h4>
                    <p className="text-[11px] text-slate-500">We build site &amp; deliver clients</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">₹10,000</span>
                    <span className="text-[11px] text-slate-500 block">/ month</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 1-2 Hr Sprints
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Doubt Clear Guarantee
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Direct Mentor WhatsApp
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Pitch to 50+ Brands
                  </div>
                </div>

                <Link
                  href="/mentorship-subscription"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <span>View All Plans &amp; Enroll</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison: The Broken 30-Minute Model vs NextHour Deep Sprints */}
        <section className="w-full bg-white/60 dark:bg-slate-900/60 py-16 px-4 sm:px-6 lg:px-8 border-y border-pink-100 dark:border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
                The Mentor Reality Gap
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Why 30-Minute Mentorship Calls Are Completely Broken
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                You don't need generic advice. You need an elite operator sitting beside your IDE, untangling architecture, fixing edge cases, and pushing to production together.
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
                    Net Output: 0 Code
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
                      Rushed clock-watching: &ldquo;Hey, I have another hard stop call now, schedule another paid session!&rdquo;
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/30 space-y-1 text-xs">
                  <p className="font-bold text-red-600 dark:text-red-400">The Inevitable Outcome:</p>
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
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">NextHour 1:1 Deep Sprint</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">1 to 2 Uncapped Full Hours</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                    Shipped in Production
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
                      <span>Stress-Test & Edge Cases</span>
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
                  <p className="font-bold text-emerald-800 dark:text-emerald-300">The NextHour Outcome:</p>
                  <p className="text-slate-700 dark:text-slate-300">
                    A tested, deployed feature working on the live internet. Zero unanswered questions when the call finishes.
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
                    Where your actual minutes are spent across 1-on-1 sprint sessions
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <span className="w-3 h-3 rounded bg-slate-400" /> 15% Strategy & Sync
                  </span>
                  <span className="flex items-center gap-1.5 text-primary">
                    <span className="w-3 h-3 rounded bg-primary" /> 60% Build & Code
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <span className="w-3 h-3 rounded bg-emerald-500" /> 25% Testing & Deploy
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
                <div>25m Live Verification & Client Demo</div>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive Skill Curriculum Section (All 17 Tracks) */}
        <section id="curriculum" className="w-full py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-3xl space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
                  17 Hands-On Mastery Tracks
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  Everything We Build With You 1-on-1
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                  No generic slideshows or pre-recorded fluff. You pick any skill or combine them. Click any track to see the full deep-dive syllabus.
                </p>
              </div>
              <Link
                href="/mentorship-subscription"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 flex items-center gap-1.5 self-start md:self-auto"
              >
                <span>View Retainer Plans</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Curriculum Grid (17 Tracks) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MENTORSHIP_SERVICES.map((s, idx) => (
                <Link
                  key={s.slug}
                  href={`/online-mentorship/${s.slug}`}
                  className="group p-6 bg-white/85 dark:bg-slate-850/85 rounded-3xl border border-pink-100 dark:border-white/10 hover:border-pink-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between space-y-5 backdrop-blur-sm"
                >
                  <div className="space-y-4">
                    {/* Cute Doodle Header */}
                    <div className="w-full aspect-[16/10] relative rounded-2xl overflow-hidden bg-pink-50/50 dark:bg-slate-900 border border-pink-100 dark:border-white/10 shadow-inner flex items-center justify-center">
                      <Image
                        src={s.doodle}
                        alt={s.title}
                        fill
                        sizes="(max-width: 640px) 300px, 360px"
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider px-2 py-0.5 rounded bg-pink-100 dark:bg-pink-900/40">
                          Track {String(idx + 1).padStart(2, '0')} · {s.badge}
                        </span>
                        <span className="material-symbols-outlined text-slate-300 group-hover:text-pink-500 text-[18px] transition-colors">
                          arrow_forward
                        </span>
                      </div>
                      <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                        {s.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {s.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {s.tools.slice(0, 3).map((tool, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-pink-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-pink-100 dark:border-white/10"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-pink-100 dark:border-white/10 flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-500" /> 1-2 Hr Live Sprints
                    </span>
                    <span className="text-primary group-hover:underline flex items-center gap-0.5">
                      Explore Track →
                    </span>
                  </div>
                </Link>
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
                Most courses leave you stranded with projects that sit abandoned in GitHub. NextHour mentees get direct access to our verified{' '}
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
                  <p className="text-xs text-slate-500 dark:text-slate-400">Looking for AI & WhatsApp Automation today</p>
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
                    Recent Mentee Placements & Deployments
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
                    <p className="text-slate-500 dark:text-slate-400">Automated WhatsApp Abandoned Cart & Order Tracking Bot</p>
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

        {/* 3-Step Enrollment Path */}
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual presentation */}
            <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-2xl group border border-pink-200 dark:border-white/10 bg-white/90 dark:bg-slate-900 p-6 flex flex-col items-center justify-center">
              <div className="w-full aspect-[16/10] relative rounded-2xl overflow-hidden">
                <Image
                  src="/workshops_doodle.png"
                  alt="Live 1:1 Architecture & Production Sprints"
                  fill
                  sizes="(max-width: 640px) 340px, 500px"
                  className="object-contain group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="w-full pt-4 text-center sm:text-left">
                <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold mb-2">
                  PRODUCTION GRADE ARCHITECTURE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  From Blank Screen to Boardroom Demos
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mt-1">
                  Every workflow is designed so you can present it confidently to founders, CTOs, and non-technical stakeholders alike.
                </p>
              </div>
            </div>

            {/* 3 Steps */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
                  Zero Risk Onboarding
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  How Your Mentorship Sprints Begin
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  We don&apos;t accept anyone without making sure we can genuinely double their skills and client income.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-pink-100 dark:border-white/10 shadow-sm">
                  <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-base shrink-0 shadow-sm shadow-primary/30">
                    1
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      15-Minute Technical Diagnostic (Free)
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      We review your current skillset, target project, and agency or career goals to ensure a 100% fit.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-pink-100 dark:border-white/10 shadow-sm">
                  <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-base shrink-0 shadow-sm shadow-primary/30">
                    2
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Custom Sprint Roadmap & WhatsApp Onboarding
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      You receive your dedicated mentor channel, sprint calendar, and setup checklist on WhatsApp within 2 hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-800/40 shadow-sm">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-sm shadow-emerald-600/30">
                    3
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      First 2-Hour Deep Sprint
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      We dive straight into your primary blocker or project architecture. By minute 90, you have working code running live.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* High-Trust Booking Form Section */}
        <section id="apply" className="w-full py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/95 dark:bg-slate-850/95 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-pink-200 dark:border-white/10 backdrop-blur-md">
              {/* Form Side */}
              <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" /> 4 Cohort Spots Remaining For This Cycle
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    Lock In Your 1:1 Diagnostic Call
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    Speak directly with a lead mentor. We will audit your current project architecture and outline your exact 30-day build sprint. Completely free, no obligations.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-8 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl space-y-4 text-center border border-emerald-200 dark:border-emerald-800/40 animate-in fade-in zoom-in-95">
                    <div className="w-16 h-16 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/25">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                      Your Diagnostic Session is Requested!
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                      Our lead mentor will reach out on WhatsApp to <strong className="text-slate-900 dark:text-white">{formData.phone || 'your phone'}</strong> within 90 minutes with your direct Google Meet link and preparatory checklist.
                    </p>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-800 inline-flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-white/10 shadow-sm">
                      <MessageSquare className="w-4 h-4" /> Priority WhatsApp notification queued.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                          Your Full Name
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Aryan Mehra"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-pink-100 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                          WhatsApp Number (For Direct Call)
                        </label>
                        <input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-pink-100 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="aryan@yourcompany.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-pink-100 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        What is your primary goal or biggest technical blocker?
                      </label>
                      <select
                        value={formData.goal}
                        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-pink-100 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                      >
                        <option value="whatsapp">Building WhatsApp AI Bot for clients</option>
                        <option value="rag">Creating Custom AI Agent / RAG Pipeline</option>
                        <option value="clients">Closing International $2k-$5k Retainers</option>
                        <option value="voice">Building Real-time Voice AI Callers</option>
                        <option value="fullstack">Fullstack SaaS Application Deployment</option>
                        <option value="other">Multiple overlapping goals / Need audit</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        Current Monthly Revenue or Career Stage
                      </label>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        {['starter', 'growth', 'agency'].map((stg) => (
                          <label
                            key={stg}
                            className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer font-bold transition-all text-center ${
                              formData.stage === stg
                                ? 'bg-primary text-white border-primary shadow-sm shadow-primary/20'
                                : 'bg-slate-50 dark:bg-slate-800 border-pink-100 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-pink-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="stage"
                              value={stg}
                              checked={formData.stage === stg}
                              onChange={() => setFormData({ ...formData, stage: stg })}
                              className="sr-only"
                            />
                            <span>
                              {stg === 'starter' ? '₹0 - ₹50k' : stg === 'growth' ? '₹50k - ₹2L' : '₹2L+ (Agency)'}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-primary/25 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <span>
                          {isSubmitting ? 'Reserving...' : 'Confirm Diagnostic Booking & Lock ₹15,000 Rate'}
                        </span>
                        <Calendar className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
                      🔒 100% Privacy. We never share your data. Direct mentor WhatsApp response within 90 minutes.
                    </p>
                  </form>
                )}
              </div>

              {/* Pledge Side */}
              <div className="lg:col-span-5 bg-gradient-to-br from-pink-50/80 via-white to-pink-100/60 dark:from-slate-800 dark:via-slate-850 dark:to-slate-800 p-6 sm:p-10 flex flex-col justify-between space-y-6 border-t lg:border-t-0 lg:border-l border-pink-200 dark:border-white/10">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      MENTORSHIP COMMITMENT
                    </span>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                      The NextHour Pledge
                    </h4>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 shadow-sm border border-pink-100 dark:border-white/5 space-y-1">
                      <span className="font-bold flex items-center gap-1.5 text-slate-800 dark:text-white">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> Real 1-on-1, Never Pre-Recorded
                      </span>
                      <p className="text-slate-500 dark:text-slate-400">
                        Every minute is spent live with you on Google Meet or Screen-Share. Zero generic slides.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 shadow-sm border border-pink-100 dark:border-white/5 space-y-1">
                      <span className="font-bold flex items-center gap-1.5 text-slate-800 dark:text-white">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> Unrushed Doubt Resolution
                      </span>
                      <p className="text-slate-500 dark:text-slate-400">
                        If your bug takes 1 hour and 45 minutes to solve, we stay until it works in production.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 shadow-sm border border-pink-100 dark:border-white/5 space-y-1">
                      <span className="font-bold flex items-center gap-1.5 text-slate-800 dark:text-white">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> Grahak Setu Brand Backing
                      </span>
                      <p className="text-slate-500 dark:text-slate-400">
                        Access to 50+ enterprise and D2C brands looking for automation partners.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/95 dark:bg-slate-900/90 p-4 rounded-2xl border border-pink-200 dark:border-white/10 shadow-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Transparent Retainer</span>
                    <span className="text-xl font-black text-primary">₹15,000 / mo</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Flat, predictable, and cancelable with a single tap. No minimum lock-in period.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
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
                  a: "That is the exact reason we built NextHour. Unlike marketplaces that cut your call off at 30 minutes on the dot, our standard session window is 1 to 2 full hours. If a complex database migration or webhook handler takes 105 minutes, your mentor remains on screen with you until it passes all integration tests.",
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

        {/* Sticky Bottom Quick Conversion Bar */}
        <div className="sticky bottom-0 left-0 right-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md py-3 px-4 sm:px-8 z-40 shadow-2xl border-t-2 border-primary/20">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <span className="text-[10px] font-extrabold uppercase text-primary">1:1 Deep Mentorship</span>
                <p className="text-sm font-black text-slate-900 dark:text-white">
                  ₹15,000 <span className="text-xs font-normal text-slate-500">/ month flat</span>
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>1-2 Hr Sprints Guaranteed</span>
              </div>
            </div>

            <a
              href="#apply"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Apply For Diagnostic Call</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white/90 dark:bg-slate-950 border-t border-pink-100 dark:border-white/10 py-10 px-4 sm:px-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2025 NextHour & Grahak Setu Accelerator Network. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/subscriptions" className="hover:text-primary transition-colors">Subscriptions</Link>
            <Link href="/brand-register" className="hover:text-primary transition-colors">Brand Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
