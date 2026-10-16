'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Snowfall from '@/components/Snowfall';
import SellerNavbar from '@/components/SellerNavbar';
import ComingSoonView from '@/components/ComingSoonView';
import {
  Check,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  Handshake,
  CheckCircle2,
  X,
  Code2,
} from 'lucide-react';

export interface MentorshipPlan {
  id: string;
  tier: string;
  badge: string;
  tagline: string;
  monthlyPrice: number;
  quarterlyPrice: number;
  monthlyStrikethrough: string;
  quarterlyStrikethrough: string;
  highlight?: boolean;
  features: string[];
}

export const PLANS: MentorshipPlan[] = [
  {
    id: 'dfy-engine',
    tier: 'Track 01: DFY Tech & Clients',
    badge: 'Done-For-You',
    tagline: 'We build your high-converting website and bring real paying clients directly to you. Zero coding required.',
    monthlyPrice: 10000,
    quarterlyPrice: 24000, // ₹8,000/mo effective (20% off)
    monthlyStrikethrough: '₹18,000',
    quarterlyStrikethrough: '₹48,000',
    highlight: false,
    features: [
      'Complete modern custom website built from scratch in Next.js 15',
      'High-converting copywriting & 0.8s mobile Core Web Vitals speed',
      'We bring real paying clients directly to your doorstep',
      'Automated WhatsApp booking flow & instant lead handoff',
      'Technical SEO & Generative Engine Optimization (GEO) setup',
      'Full monthly website maintenance & performance tuning',
      'Zero technical skills or coding required from your side',
    ],
  },
  {
    id: '1on1-mentorship',
    tier: 'Track 02: 1:1 Live Tech Mentorship',
    badge: 'Most Popular',
    tagline: '1-2 hour live pair-coding sprints until every doubt is 100% resolved. Zero rushed 30-minute timers.',
    monthlyPrice: 15000,
    quarterlyPrice: 36000, // ₹12,000/mo effective (20% off)
    monthlyStrikethrough: '₹28,000',
    quarterlyStrikethrough: '₹72,000',
    highlight: true,
    features: [
      '1 to 2 hour uncapped live sprints (no 30-min timers or rush)',
      '100% doubt clearance guarantee with live pair building & coding',
      'Direct WhatsApp access to lead mentor (sub-60min response)',
      'Master all 17 tracks: AI Agents, WhatsApp API, Voice AI, SEO, GEO',
      'Foreign client closing blueprint ($2,000 – $5,000/mo retainers)',
      'Pitch your solutions to 50+ Grahak Setu partner brands directly',
      'GitHub repo reviews, production cloud deployments & architecture',
    ],
  },
  {
    id: 'hybrid-accelerator',
    tier: 'Track 03: Full Hybrid Accelerator',
    badge: 'Maximum Acceleration',
    tagline: '1:1 Live Mentorship + DFY Website & Clients + VIP 50+ Brand Boardroom Access.',
    monthlyPrice: 22000,
    quarterlyPrice: 52000, // ₹17,333/mo effective (20% off)
    monthlyStrikethrough: '₹44,000',
    quarterlyStrikethrough: '₹1,10,000',
    highlight: false,
    features: [
      'Everything in 1:1 Live Tech Mentorship (₹15,000 value)',
      'Everything in DFY Website + Client Acquisition (₹10,000 value)',
      'VIP Boardroom Pitching to 50+ Grahak Setu D2C founders',
      'Live Zoom closing rehearsals for foreign client sales calls',
      'Priority 24/7 dedicated lead mentor escalation & sprint booking',
      'Co-branded case study validation to win enterprise deals',
      'Save ₹3,000/month compared to standalone services',
    ],
  },
];

const MATRIX_DATA = [
  { feature: 'Live Session Duration', track1: 'DFY (No Calls Needed)', track2: '1 to 2 Full Hours', track3: '1 to 2 Full Hours (Priority)' },
  { feature: 'Rushed Timers Policy', track1: 'N/A', track2: 'Zero 30-min Rush', track3: 'Zero 30-min Rush' },
  { feature: 'High-Converting Website Build', track1: true, track2: 'Self-Built in Sprint', track3: true },
  { feature: 'Client Acquisition Delivery', track1: true, track2: 'Mentorship Guided', track3: true },
  { feature: 'Mentor Direct WhatsApp Channel', track1: 'Support Desk', track2: true, track3: '24/7 VIP Escalation' },
  { feature: 'Foreign Client Blueprint ($2k-$5k)', track1: false, track2: true, track3: true },
  { feature: 'Pitch Access to Grahak Setu 50+ Brands', track1: false, track2: true, track3: 'VIP Boardroom Priority' },
  { feature: 'Code Review & Deployment Audits', track1: true, track2: true, track3: true },
];

const TECH_STACK = [
  { name: 'LangChain & LlamaIndex', role: 'Multi-Agent RAG' },
  { name: 'Meta Cloud API', role: 'Official WhatsApp Bots' },
  { name: 'ElevenLabs & Twilio', role: 'Low-Latency Voice AI' },
  { name: 'Next.js 15 & Tailwind', role: 'Blazing Fast Frontends' },
  { name: 'n8n & Make', role: 'Visual Enterprise Automations' },
  { name: 'Supabase pgvector', role: 'Vector Search & Auth' },
];

export default function MentorshipSubscriptionPage() {
  const router = useRouter();
  const [billing, setBilling] = useState<'monthly' | 'quarterly'>('monthly');
  const [highlightedCardId, setHighlightedCardId] = useState<string>('1on1-mentorship');
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Scroll detection to highlight card and change button to pink when scrolled through
  useEffect(() => {
    const handleScroll = () => {
      const windowCenter = window.innerHeight / 2;
      let closestId = highlightedCardId;
      let minDistance = Infinity;

      Object.entries(cardRefs.current).forEach(([id, el]) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(windowCenter - cardCenter);

        if (rect.bottom > 100 && rect.top < window.innerHeight - 80) {
          if (distance < minDistance) {
            minDistance = distance;
            closestId = id;
          }
        }
      });

      if (closestId && closestId !== highlightedCardId) {
        setHighlightedCardId(closestId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [highlightedCardId]);

  const handleGoToCheckout = (plan: MentorshipPlan) => {
    router.push(`/client-checkout?plan=${encodeURIComponent(plan.id)}&billing=${encodeURIComponent(billing)}`);
  };

  // Display Coming Soon view as requested
  const SHOW_COMING_SOON = true;

  if (SHOW_COMING_SOON) {
    return (
      <div className="flex flex-col min-h-screen bg-transparent relative selection:bg-pink-100 selection:text-primary">
        <Snowfall />
        <SellerNavbar />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 flex items-center justify-center relative z-10">
          <ComingSoonView
            title="Coming Soon"
            subtitle="Something Amazing is on the way! We are currently putting the finishing touches on our mentorship plans."
            backHref="/Online-Mentorship"
            backText="Back to Mentorship"
          />
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative selection:bg-pink-100 selection:text-primary">
      <Snowfall />
      <SellerNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-14 relative z-10">
        
        {/* Header & Billing Switcher */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 dark:bg-pink-900/40 text-primary dark:text-pink-300 text-xs font-black uppercase tracking-wider border border-pink-200 dark:border-pink-800/40 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ELITE MENTORSHIP &amp; DFY RETAINERS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Choose Your Mentorship &amp; Growth Retainer
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Unrushed 1-to-2 hour live coding sprints until every single doubt is cleared. Or let our team build your full tech stack and deliver clients directly. Zero rushed 30-min timers.
          </p>

          {/* Interactive Billing Switcher */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-pink-200 dark:border-white/10 shadow-sm mt-3 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setBilling('monthly')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                billing === 'monthly'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Monthly Retainer
            </button>
            <button
              type="button"
              onClick={() => setBilling('quarterly')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                billing === 'quarterly'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Quarterly Sprint
              <span className="bg-pink-100 text-primary text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid (Images Removed, Scroll-Highlighted with White to Pink Button) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-2">
          {PLANS.map((plan) => {
            const isHighlighted = highlightedCardId === plan.id;
            const price = billing === 'quarterly' ? plan.quarterlyPrice : plan.monthlyPrice;
            const period = billing === 'quarterly' ? '/ quarter' : '/ month';
            const strikethrough = billing === 'quarterly' ? plan.quarterlyStrikethrough : plan.monthlyStrikethrough;

            return (
              <div
                key={plan.id}
                ref={(el) => {
                  cardRefs.current[plan.id] = el;
                }}
                onMouseEnter={() => setHighlightedCardId(plan.id)}
                onClick={() => setHighlightedCardId(plan.id)}
                className={`cursor-pointer rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between relative backdrop-blur-md group ${
                  isHighlighted
                    ? 'bg-white/95 dark:bg-slate-900/95 border-2 border-primary shadow-2xl shadow-primary/25 scale-[1.02] ring-2 ring-primary/20 z-20'
                    : 'bg-white/85 dark:bg-slate-900/85 border border-pink-100 dark:border-white/10 shadow-lg hover:border-pink-300 hover:shadow-xl'
                }`}
              >
                <div>
                  {/* Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider transition-colors duration-300 ${
                        isHighlighted
                          ? 'bg-primary text-white'
                          : 'bg-pink-100 dark:bg-pink-900/40 text-primary dark:text-pink-300'
                      }`}
                    >
                      {plan.badge}
                    </span>
                    {billing === 'quarterly' && (
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                        20% Discount Applied
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-2 mb-6">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      {plan.tier}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed min-h-[44px]">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="p-4 rounded-2xl bg-pink-50/50 dark:bg-slate-800/50 border border-pink-100 dark:border-white/10 mb-6">
                    <div className="text-xs font-semibold text-slate-400 line-through">
                      {strikethrough}
                    </div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                        ₹{price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {period}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {billing === 'quarterly' ? 'Billed quarterly · Priority Sprint Slots' : 'Monthly recurring retainer · Cancel anytime'}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                      Included in this Retainer
                    </span>
                    <ul className="space-y-2.5">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Subscription Card Action Button: White by default, Pink when scrolled through */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGoToCheckout(plan);
                  }}
                  className={`w-full py-4 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:scale-[1.02] active:scale-95 ${
                    isHighlighted
                      ? 'bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white shadow-pink-500/25 ring-2 ring-pink-500/30'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 hover:border-pink-300 shadow-sm'
                  }`}
                >
                  <span>Pay ₹{price.toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* ── Production Tool Stack ── */}
        <section className="bg-white/80 dark:bg-slate-800/80 rounded-3xl p-6 sm:p-10 border border-pink-100 dark:border-white/10 shadow-sm backdrop-blur-sm space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase text-primary tracking-wider">Enterprise Tools</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              The Modern Production Tech Stack
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              You will configure, code, and deploy directly with the industry-standard developer platforms.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
            {TECH_STACK.map((t, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-pink-50/40 dark:bg-slate-900/40 border border-pink-100/60 dark:border-white/5 text-center space-y-1 flex flex-col items-center justify-center"
              >
                <Code2 className="w-5 h-5 text-primary mb-1" />
                <span className="font-bold text-xs text-slate-800 dark:text-white block">
                  {t.name}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {t.role}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Full Feature Matrix Table ── */}
        <section className="bg-white/90 dark:bg-slate-800/90 rounded-3xl border border-pink-100 dark:border-white/10 shadow-sm overflow-hidden backdrop-blur-sm">
          <div className="p-6 bg-pink-50/50 dark:bg-slate-900/40 border-b border-pink-100 dark:border-white/10">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Side-by-Side Track Comparison
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Complete transparency into each track&apos;s live sprint access and deliverable commitments.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-pink-100 dark:border-white/10 bg-pink-50/20 dark:bg-slate-900/20">
                  <th className="py-4 px-4 sm:px-6 font-bold text-slate-800 dark:text-white w-2/5">
                    Feature &amp; Deliverable
                  </th>
                  <th className="py-4 px-3 sm:px-4 text-center font-bold text-slate-700 dark:text-slate-300 w-1/5">
                    Track 01: DFY Tech
                  </th>
                  <th className="py-4 px-3 sm:px-4 text-center font-bold text-primary bg-pink-50/40 dark:bg-pink-900/20 w-1/5">
                    Track 02: 1:1 Live Sprints
                  </th>
                  <th className="py-4 px-3 sm:px-4 text-center font-bold text-slate-700 dark:text-slate-300 w-1/5">
                    Track 03: Accelerator
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-50 dark:divide-white/5">
                {MATRIX_DATA.map((row, i) => (
                  <tr key={i} className="hover:bg-pink-50/30 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-800 dark:text-slate-200">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-3 sm:px-4 text-center text-slate-600 dark:text-slate-300">
                      {typeof row.track1 === 'boolean' ? (
                        row.track1 ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />
                      ) : (
                        <span className="font-semibold text-xs">{row.track1}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 sm:px-4 text-center text-primary bg-pink-50/20 dark:bg-pink-900/10 font-bold">
                      {typeof row.track2 === 'boolean' ? (
                        row.track2 ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />
                      ) : (
                        <span className="font-bold text-xs">{row.track2}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 sm:px-4 text-center text-slate-600 dark:text-slate-300">
                      {typeof row.track3 === 'boolean' ? (
                        row.track3 ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />
                      ) : (
                        <span className="font-semibold text-xs text-primary">{row.track3}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Trust Pillars & Unrushed Sprints Guarantee ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-pink-100 dark:border-white/10 shadow-sm flex items-start gap-4">
            <Clock className="w-8 h-8 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-black text-sm text-slate-900 dark:text-white">
                Zero 30-Minute Rushed Timers
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                We sit with you for 1 to 2 full hours. If a code review takes 90 minutes, we stay until you understand every line.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-pink-100 dark:border-white/10 shadow-sm flex items-start gap-4">
            <Handshake className="w-8 h-8 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-black text-sm text-slate-900 dark:text-white">
                50+ Grahak Setu Brands Access
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Direct boardroom pitch introductions to live Indian D2C brand founders ready to implement AI bots &amp; websites.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-pink-100 dark:border-white/10 shadow-sm flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-black text-sm text-slate-900 dark:text-white">
                100% Doubt Clearance Guarantee
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                If your deployment hits an error or blocker between calls, ping your mentor directly on WhatsApp for an unblocked solution.
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
