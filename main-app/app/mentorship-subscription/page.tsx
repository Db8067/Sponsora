'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import Snowfall from '@/components/Snowfall';
import SellerNavbar from '@/components/SellerNavbar';
import { useUser } from '@clerk/nextjs';
import {
  Check, ArrowRight, Loader2, Sparkles, ShieldCheck,
  Clock, Zap, Star, Terminal, MessageSquare, Handshake, Globe,
} from 'lucide-react';
import { MENTORSHIP_SERVICES } from '@/lib/mentorship-data';

interface MentorshipPlan {
  id: string;
  tier: string;
  badge: string;
  price: number;
  period: string;
  strikethrough?: string;
  tagline: string;
  highlight?: boolean;
  doodle: string;
  features: string[];
}

const MENTORSHIP_PLANS: MentorshipPlan[] = [
  {
    id: 'dfy-engine',
    tier: 'DFY Growth Engine (Website + Clients)',
    badge: 'Done-For-You',
    price: 10000,
    period: '/month',
    strikethrough: '₹18,000',
    tagline: 'We build your high-converting website and deliver paying clients directly to you.',
    highlight: false,
    doodle: '/hero-art.png',
    features: [
      'We build your complete modern website from scratch',
      'High-converting copywriting & 0.8s mobile PageSpeed',
      'We bring real paying clients directly to you',
      'Automated WhatsApp booking & lead handoff',
      'SEO & GEO setup to rank on Google & ChatGPT',
      'Full monthly maintenance & conversion optimization',
      'No technical skill or coding required from your side',
    ],
  },
  {
    id: '1on1-mentorship',
    tier: '1:1 Live Deep Mentorship',
    badge: 'Most Popular',
    price: 15000,
    period: '/month',
    strikethrough: '₹28,000',
    tagline: '1-2 hour live sprints until every doubt is resolved. Zero 30-min rushed calls.',
    highlight: true,
    doodle: '/tech_events_doodle.png',
    features: [
      '1 to 2 hour uncapped live sprints (no 30-min timers)',
      '100% doubt clearance guarantee with live pair building',
      'Direct Mentor WhatsApp channel (sub-60min response)',
      'All 17 tracks: AI Agents, WhatsApp, Voice AI, SEO, GEO',
      'Foreign client closing blueprint ($2,000 - $5,000/mo)',
      'Pitch your solutions to 50+ Grahak Setu partner brands',
      'GitHub repo reviews, production deployments & architecture',
    ],
  },
  {
    id: 'elite-combo',
    tier: 'All-Access Mastery Combo',
    badge: 'Ultimate Value',
    price: 22500,
    period: '/month',
    strikethrough: '₹46,000',
    tagline: '1:1 Live Mentorship + DFY Website & Clients + VIP Grahak Setu 50+ Brand Access.',
    highlight: false,
    doodle: '/subscription-doodle.jpg',
    features: [
      'Everything in 1:1 Live Mentorship (₹15,000 value)',
      'Everything in DFY Website + Client Acquisition (₹10,000 value)',
      'VIP Boardroom Pitching to 50+ Grahak Setu D2C founders',
      'Live Zoom closing rehearsals for foreign client pitches',
      'Priority 24/7 dedicated lead mentor escalation',
      'Co-branded case study validation to win enterprise deals',
      'Save ₹2,500/mo with bundled accelerator pricing',
    ],
  },
];

export default function MentorshipSubscriptionPage() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const [selectedPlan, setSelectedPlan] = useState<string>('1on1-mentorship');
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handleSubscribe = async (plan: MentorshipPlan) => {
    setIsProcessing(plan.id);

    if (!isSignedIn) {
      router.push(`/sign-in?redirect_url=${encodeURIComponent('/mentorship-subscription')}`);
      return;
    }

    try {
      const res = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: plan.price,
          planId: `Mentorship: ${plan.tier}`,
        }),
      });

      const orderData = await res.json();
      if (!res.ok) {
        alert('Failed to initialize subscription: ' + (orderData.error || 'Server error'));
        return;
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'NextHour Mentorship',
        description: `Enrollment in ${plan.tier}`,
        order_id: orderData.id,
        handler: function (response: any) {
          alert('Enrollment successful! Payment ID: ' + response.razorpay_payment_id + '\nOur lead mentor will connect on WhatsApp within 60 minutes.');
          router.push('/Online-Mentorship?enrolled=true');
        },
        prefill: {
          name: user?.fullName || 'Mentee',
          email: user?.primaryEmailAddress?.emailAddress || '',
        },
        theme: {
          color: '#e11d48',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        alert('Payment Failed: ' + response.error.description);
      });
      rzp.open();
    } catch (err: any) {
      console.error(err);
      alert('Network error while processing subscription.');
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative selection:bg-pink-100 selection:text-primary">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <Snowfall />
      <SellerNavbar />

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-pink-500/10 via-primary/15 to-pink-500/10 border-b border-pink-200/50 dark:border-white/10 py-2.5 px-4 text-center backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-pink-100">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary text-white text-[11px] font-extrabold uppercase tracking-wider">
            Unrushed Live Sprints
          </span>
          <span className="truncate">
            ⚡ 1-2 Full Hours Until Doubts Are Resolved • Direct Grahak Setu 50+ Brand Pitching • Zero 30-Min Timers
          </span>
        </div>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 dark:bg-pink-900/40 text-primary dark:text-pink-300 text-xs font-extrabold uppercase tracking-wider border border-pink-200 dark:border-pink-800/40 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRANSPARENT MONTHLY RETAINERS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Choose Your Mentorship &amp; Growth Retainer
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Whether you want un-rushed 1-on-1 live coding sprints or our Done-For-You engine to build your website and deliver paying clients, select the ideal tier below. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
          {MENTORSHIP_PLANS.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`cursor-pointer rounded-3xl p-6 sm:p-8 transition-all flex flex-col justify-between relative backdrop-blur-md ${
                  plan.highlight
                    ? 'bg-white/95 dark:bg-slate-850/95 border-2 border-primary shadow-2xl scale-[1.02] lg:-translate-y-2 ring-4 ring-primary/10'
                    : 'bg-white/80 dark:bg-slate-800/80 border border-pink-100 dark:border-white/10 shadow-lg hover:shadow-xl hover:border-pink-300'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-pink-500 text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                    ⭐ MOST POPULAR FOR BUILDERS
                  </div>
                )}

                <div className="space-y-6">
                  {/* Doodle Art Card */}
                  <div className="w-full aspect-[16/10] relative rounded-2xl overflow-hidden bg-pink-50/50 dark:bg-slate-900 border border-pink-100 dark:border-white/10 shadow-inner flex items-center justify-center">
                    <Image
                      src={plan.doodle}
                      alt={plan.tier}
                      fill
                      sizes="(max-width: 640px) 320px, 400px"
                      className="object-contain p-2"
                      priority={plan.highlight}
                    />
                  </div>

                  {/* Header */}
                  <div>
                    <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-pink-100 dark:bg-pink-900/40 text-primary dark:text-pink-300">
                      {plan.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-2">
                      {plan.tier}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="pt-2 border-t border-pink-100 dark:border-white/10">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                        ₹{plan.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">{plan.period}</span>
                      {plan.strikethrough && (
                        <span className="text-xs font-bold text-slate-400 line-through ml-auto">
                          {plan.strikethrough}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                      ✓ Flat monthly investment · Cancel anytime
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3 pt-2 text-xs text-slate-700 dark:text-slate-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="pt-8 space-y-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubscribe(plan);
                    }}
                    disabled={isProcessing === plan.id}
                    className={`w-full py-4 px-6 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-xl flex items-center justify-center gap-2 ${
                      plan.highlight
                        ? 'bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white shadow-primary/25 hover:scale-[1.01]'
                        : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-primary dark:hover:bg-primary hover:text-white shadow-slate-900/10'
                    }`}
                  >
                    {isProcessing === plan.id ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Enrolling…</>
                    ) : (
                      <>
                        Enroll in {plan.badge} <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-slate-400">
                    🔒 256-bit Secure Razorpay Checkout · Immediate WhatsApp Sync
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 17 Skills Included Banner */}
        <div className="bg-white/80 dark:bg-slate-800/80 rounded-3xl p-6 sm:p-10 border border-pink-100 dark:border-white/10 shadow-lg space-y-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
                17 High-Demand Skills
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Everything Included In Your 1:1 Live Mentorship
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Pick any track or combine them based on client projects. Click any skill to explore full curriculum.
              </p>
            </div>
            <Link
              href="/Online-Mentorship"
              className="px-5 py-2.5 rounded-xl bg-pink-100 text-pink-700 hover:bg-pink-200 text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>Explore Tracks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-2">
            {MENTORSHIP_SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/online-mentorship/${s.slug}`}
                className="group p-3 rounded-xl bg-pink-50/50 dark:bg-slate-900/40 border border-pink-100 dark:border-white/5 hover:border-pink-300 hover:bg-white dark:hover:bg-slate-850 transition-all text-center flex flex-col items-center justify-center space-y-1"
              >
                <span className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors line-clamp-1">
                  {s.title}
                </span>
                <span className="text-[10px] text-pink-600 font-semibold">{s.badge}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Why Unrushed FAQ */}
        <div className="max-w-3xl mx-auto space-y-6 pt-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Unrushed Guarantee</span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Mentorship FAQs
            </h3>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How does the 1-2 hour live session format work?',
                a: 'Unlike platforms that cut calls after 30 minutes, our standard 1-on-1 sprint is 1 to 2 full hours. We open screen-share, look at your IDE or Figma, write schemas, deploy webhooks, and stay until your doubt is 100% resolved and working in production.',
              },
              {
                q: 'What is included in the DFY ₹10,000/month plan?',
                a: 'In the Done-For-You tier, our team designs and builds your complete high-converting website from scratch, implements PageSpeed optimization, and directly delivers paying clients to you through our outreach channels.',
              },
              {
                q: 'How do I pitch to 50+ brands in Grahak Setu network?',
                a: 'Once your solution or portfolio is verified during mentorship sprints, your mentor directly prepares your demo and introduces your agency/product to our 50+ partner D2C and enterprise brands seeking automation partners.',
              },
              {
                q: 'Can I cancel or pause my retainer anytime?',
                a: 'Yes, absolutely. All retainers are month-to-month with no long-term lock-in. Cancel with a single click inside your dashboard.',
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-pink-100 dark:border-white/10 space-y-2 shadow-sm"
              >
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{faq.q}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white/90 dark:bg-slate-950 border-t border-pink-100 dark:border-white/10 py-10 px-4 sm:px-8 text-xs text-slate-500 dark:text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2025 NextHour &amp; Grahak Setu Accelerator Network. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/Online-Mentorship" className="hover:text-primary transition-colors">Mentorship</Link>
            <Link href="/mentorship-subscription" className="hover:text-primary transition-colors">Pricing</Link>
            <Link href="/brand-register" className="hover:text-primary transition-colors">Brand Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
