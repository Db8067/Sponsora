'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { useRouter, useSearchParams } from 'next/navigation';
import Snowfall from '@/components/Snowfall';
import SellerNavbar from '@/components/SellerNavbar';
import { useUser } from '@clerk/nextjs';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Sparkles,
  User,
  Phone,
  Mail,
  Zap,
  Target,
  Code2,
  HelpCircle,
  AlertCircle,
  Clock,
} from 'lucide-react';

interface MentorshipCheckoutPlan {
  id: string;
  tier: string;
  badge: string;
  tagline: string;
  description: string;
  monthlyPrice: number;
  quarterlyPrice: number;
  monthlyStrikethrough: number;
  quarterlyStrikethrough: number;
  features: string[];
}

const CHECKOUT_MENTORSHIP_PLANS: Record<string, MentorshipCheckoutPlan> = {
  'dfy-engine': {
    id: 'dfy-engine',
    tier: 'Track 01: DFY Tech & Clients',
    badge: 'Done-For-You',
    tagline: 'We build your high-converting website and bring real paying clients directly to you.',
    description: 'Complete hands-off solution: Our team develops your production website and delivers paying client leads directly to your WhatsApp.',
    monthlyPrice: 10000,
    quarterlyPrice: 24000,
    monthlyStrikethrough: 18000,
    quarterlyStrikethrough: 48000,
    features: [
      'Complete custom website built in Next.js 15 & Tailwind',
      '0.8s mobile Core Web Vitals speed & conversion copy',
      'Real paying client lead delivery directly to your WhatsApp',
      'Automated WhatsApp booking flow & CRM sync',
      'Technical SEO & Generative Engine Optimization (GEO)',
      'Zero technical skills or coding required from your side',
    ],
  },
  '1on1-mentorship': {
    id: '1on1-mentorship',
    tier: 'Track 02: 1:1 Live Tech Mentorship',
    badge: 'Most Popular',
    tagline: '1-2 hour live pair-coding sprints until every single doubt is 100% resolved.',
    description: 'Unrushed 1-on-1 implementation sprints with screen-sharing, live architecture reviews, and direct WhatsApp mentor access.',
    monthlyPrice: 15000,
    quarterlyPrice: 36000,
    monthlyStrikethrough: 28000,
    quarterlyStrikethrough: 72000,
    features: [
      '1 to 2 hour uncapped live sprints (zero 30-min rush timers)',
      '100% doubt clearance guarantee with live pair coding',
      'Direct WhatsApp access to lead mentor (sub-60min response)',
      'Master AI Agents, WhatsApp APIs, Voice AI, Next.js & RAG',
      'Foreign client closing blueprint ($2,000 – $5,000/mo retainers)',
      'Pitch your solutions directly to 50+ Grahak Setu partner brands',
    ],
  },
  'hybrid-accelerator': {
    id: 'hybrid-accelerator',
    tier: 'Track 03: Full Hybrid Accelerator',
    badge: 'Maximum Acceleration',
    tagline: '1:1 Live Mentorship + DFY Website & Clients + VIP 50+ Brand Boardroom Access.',
    description: 'The ultimate growth package combining uncapped 1:1 live tech mentorship sprints with a complete DFY website and direct brand boardroom introductions.',
    monthlyPrice: 22000,
    quarterlyPrice: 52000,
    monthlyStrikethrough: 44000,
    quarterlyStrikethrough: 110000,
    features: [
      'Everything in 1:1 Live Tech Mentorship (₹15,000 value)',
      'Everything in DFY Website + Client Acquisition (₹10,000 value)',
      'VIP Boardroom Pitching to 50+ Grahak Setu D2C founders',
      'Live Zoom sales rehearsal calls for foreign client pitches',
      'Priority 24/7 dedicated lead mentor escalation & sprint booking',
      'Co-branded case study validation to win enterprise deals',
    ],
  },
};

function ClientCheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();

  // Read URL params & resolve plan
  const rawPlanParam = searchParams.get('plan') || '1on1-mentorship';
  const planKey =
    rawPlanParam === 'dfy-engine' || rawPlanParam === '1' || rawPlanParam === 'dfy'
      ? 'dfy-engine'
      : rawPlanParam === 'hybrid-accelerator' || rawPlanParam === '3' || rawPlanParam === 'hybrid'
      ? 'hybrid-accelerator'
      : '1on1-mentorship';

  const billingParam = searchParams.get('billing') === 'quarterly' ? 'quarterly' : 'monthly';
  const plan = CHECKOUT_MENTORSHIP_PLANS[planKey];

  const finalPrice = billingParam === 'quarterly' ? plan.quarterlyPrice : plan.monthlyPrice;
  const originalPrice = billingParam === 'quarterly' ? plan.quarterlyStrikethrough : plan.monthlyStrikethrough;
  const totalSavings = originalPrice - finalPrice;

  // Form Fields
  const [clientName, setClientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [primaryGoal, setPrimaryGoal] = useState('whatsapp');
  const [projectNotes, setProjectNotes] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Prefill from user session / cookies
  useEffect(() => {
    try {
      const match = document.cookie.match(/client_session=([^;]+)/);
      if (match) {
        const c = JSON.parse(decodeURIComponent(match[1]));
        if (c.client_name) setClientName((prev) => prev || c.client_name);
        if (c.phone) setPhoneNumber((prev) => prev || c.phone);
        if (c.email) setEmailAddress((prev) => prev || c.email);
      }
    } catch {
      /* ignore */
    }

    if (user) {
      if (user.fullName) setClientName((prev) => prev || user.fullName || '');
      const clerkEmail = user.primaryEmailAddress?.emailAddress;
      if (clerkEmail) setEmailAddress((prev) => prev || clerkEmail);
    }
  }, [user]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!clientName.trim()) {
      setErrorMsg('Please enter your Full Name.');
      return;
    }
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit WhatsApp phone number.');
      return;
    }
    if (!emailAddress.trim() || !emailAddress.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsProcessing(true);

    // Save client session cookie
    try {
      const cookiePayload = {
        client_name: clientName.trim(),
        phone: cleanPhone.slice(-10),
        email: emailAddress.trim().toLowerCase(),
        plan: plan.tier,
        amount: String(finalPrice),
      };
      const expires = new Date();
      expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
      document.cookie = `client_session=${encodeURIComponent(JSON.stringify(cookiePayload))};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`;
      localStorage.setItem('client_session', JSON.stringify(cookiePayload));
    } catch {
      /* ignore */
    }

    try {
      const res = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalPrice,
          planId: `Mentorship: ${plan.tier} (${clientName.trim()})`,
        }),
      });

      const orderData = await res.json();
      if (!res.ok) {
        throw new Error(orderData.error || 'Unable to initialize Razorpay payment.');
      }

      // Log checkout intake in Supabase client_payments
      try {
        await fetch('/api/client-checkout/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client_name: clientName.trim(),
            phone: cleanPhone.slice(-10),
            email: emailAddress.trim().toLowerCase(),
            goal: primaryGoal,
            project_notes: projectNotes.trim(),
            plan_id: plan.id,
            plan_tier: plan.tier,
            billing_cycle: billingParam,
            amount: finalPrice,
            original_amount: originalPrice,
            savings: totalSavings,
            razorpay_order_id: orderData.id,
            payment_status: 'initiated',
          }),
        });
      } catch (saveErr) {
        console.warn('[client-checkout] initial save notice:', saveErr);
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'GrahakSetu Mentorship',
        description: `Enrollment: ${plan.tier} (${billingParam})`,
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            await fetch('/api/client-checkout/save', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                client_name: clientName.trim(),
                phone: cleanPhone.slice(-10),
                email: emailAddress.trim().toLowerCase(),
                goal: primaryGoal,
                project_notes: projectNotes.trim(),
                plan_id: plan.id,
                plan_tier: plan.tier,
                billing_cycle: billingParam,
                amount: finalPrice,
                razorpay_order_id: orderData.id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                payment_status: 'paid',
              }),
            });
          } catch (updateErr) {
            console.error('[client-checkout] paid update error:', updateErr);
          }
          router.push('/client-schedule-mentorship?enrolled=true');
        },
        prefill: {
          name: clientName.trim(),
          email: emailAddress.trim(),
          contact: cleanPhone.slice(-10),
        },
        theme: {
          color: '#e11d48',
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      if ((window as any).Razorpay) {
        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', async function (resp: any) {
          setErrorMsg('Payment Failed: ' + (resp.error?.description || 'Transaction canceled.'));
          setIsProcessing(false);
          try {
            await fetch('/api/client-checkout/save', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                client_name: clientName.trim(),
                phone: cleanPhone.slice(-10),
                email: emailAddress.trim().toLowerCase(),
                goal: primaryGoal,
                project_notes: projectNotes.trim(),
                plan_id: plan.id,
                plan_tier: plan.tier,
                billing_cycle: billingParam,
                amount: finalPrice,
                razorpay_order_id: orderData.id,
                payment_status: 'failed',
                metadata: { error: resp.error?.description || 'Failed' },
              }),
            });
          } catch {
            /* ignore */
          }
        });
        rzp.open();
      } else {
        router.push('/client-schedule-mentorship?enrolled=true');
      }
    } catch (err: any) {
      console.error('[client-checkout error]:', err);
      setErrorMsg(err.message || 'Payment initiation failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-white/10 pb-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/40 text-primary dark:text-pink-300 text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Mentorship Onboarding Checkout
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Checkout &amp; Mentorship Sprint Activation
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Bank-grade 256-bit encrypted checkout powered by Razorpay. 100% doubt clearance guarantee.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 self-start sm:self-auto">
          <Lock className="w-4 h-4 text-emerald-600" />
          <span>SSL 256-Bit Secure Transaction</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Review Package */}
        <div className="order-2 lg:order-1 lg:col-span-8 space-y-6">
          {/* Section 1: Mentee Details Form */}
          <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-pink-200 dark:border-white/10 shadow-sm backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-primary text-white font-black text-xs flex items-center justify-center">
                  1
                </span>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  Mentee Details &amp; Contact Information
                </h2>
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Required</span>
            </div>

            <form onSubmit={handlePlaceOrder} id="client-checkout-form" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Full Name */}
                <div>
                  <label htmlFor="clientName" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      id="clientName"
                      type="text"
                      required
                      placeholder="e.g. Aryan Mehra"
                      value={clientName}
                      onChange={(e) => {
                        setClientName(e.target.value);
                        if (errorMsg) setErrorMsg('');
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                    />
                  </div>
                </div>

                {/* 2. WhatsApp Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    WhatsApp Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      id="phoneNumber"
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        if (errorMsg) setErrorMsg('');
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                    />
                  </div>
                </div>

                {/* 3. Email Address */}
                <div className="sm:col-span-2">
                  <label htmlFor="emailAddress" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    Email Address (For Calendar Invites &amp; GitHub Access) *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      id="emailAddress"
                      type="email"
                      required
                      placeholder="e.g. aryan@company.com"
                      value={emailAddress}
                      onChange={(e) => {
                        setEmailAddress(e.target.value);
                        if (errorMsg) setErrorMsg('');
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                    />
                  </div>
                </div>

                {/* 4. Primary Goal */}
                <div className="sm:col-span-2">
                  <label htmlFor="primaryGoal" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    Primary Goal or Target Architecture
                  </label>
                  <div className="relative">
                    <Target className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <select
                      id="primaryGoal"
                      value={primaryGoal}
                      onChange={(e) => setPrimaryGoal(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                    >
                      <option value="whatsapp">Meta WhatsApp API Automation &amp; CRM Bot</option>
                      <option value="ai-agents">Custom AI Agents &amp; Multi-Agent Swarm (LangChain)</option>
                      <option value="voice-ai">Real-Time Voice AI Agent &amp; Telephony</option>
                      <option value="website-app">High-Converting Web App (Next.js 15 &amp; Tailwind)</option>
                      <option value="dfy-clients">Done-For-You Tech &amp; Client Acquisition</option>
                      <option value="foreign-retainers">Closing $2k–$5k/mo Foreign Client Retainers</option>
                    </select>
                  </div>
                </div>

                {/* 5. Additional Project Notes */}
                <div className="sm:col-span-2">
                  <label htmlFor="projectNotes" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    Current Blocker or Project Link (Optional)
                  </label>
                  <input
                    id="projectNotes"
                    type="text"
                    placeholder="e.g. GitHub repo link, Figma design, or specific error you want to debug"
                    value={projectNotes}
                    onChange={(e) => setProjectNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Section 2: Review Selected Mentorship Plan */}
          <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-pink-200 dark:border-white/10 shadow-sm backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-primary text-white font-black text-xs flex items-center justify-center">
                  2
                </span>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  Review Mentorship Retainer
                </h2>
              </div>
              <Link href="/mentorship-subscription" className="text-xs font-bold text-primary hover:underline">
                Change Plan
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-pink-50/50 dark:bg-slate-800/50 border border-pink-100 dark:border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-lg text-slate-900 dark:text-white">
                    {plan.tier}
                  </h3>
                  <span className="bg-pink-100 text-primary text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                    {plan.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {plan.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 pt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>1 to 2 Uncapped Full Hours per Sprint (Zero 30-min timers)</span>
                </div>
              </div>

              <div className="text-right sm:shrink-0">
                <div className="text-xs text-slate-400 line-through">
                  ₹{originalPrice.toLocaleString('en-IN')}
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  ₹{finalPrice.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-slate-500">
                    {billingParam === 'quarterly' ? ' / quarter' : ' / mo'}
                  </span>
                </div>
              </div>
            </div>

            {/* Feature Bullets */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/10">
              <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider block mb-2">
                Included with your {plan.tier} retainer
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 3: Payment Method (Razorpay Guarantee) */}
          <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl p-6 border border-pink-200 dark:border-white/10 shadow-sm backdrop-blur-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/40 text-primary flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  Razorpay Verified Gateway
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Supports UPI (Google Pay, PhonePe, Paytm), All Debit/Credit Cards &amp; NetBanking.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">
              100% Secure
            </span>
          </div>
        </div>

        {/* Right Column: Sticky Order Summary Card */}
        <div className="order-1 lg:order-2 lg:col-span-4 relative lg:sticky lg:top-24 space-y-4">
          <div className="bg-white/95 dark:bg-slate-900/95 rounded-3xl p-6 sm:p-7 border-2 border-pink-200 dark:border-white/10 shadow-xl backdrop-blur-md space-y-5">
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight pb-3 border-b border-slate-100 dark:border-white/10">
              Order Summary
            </h3>

            {/* Price Line Items */}
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Items (Original M.R.P.):</span>
                <span className="line-through text-slate-400">₹{originalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-primary font-bold">
                <span>Platform Launch Savings:</span>
                <span>- ₹{totalSavings.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>1-2 Hr Sprints Duration:</span>
                <span className="text-emerald-600 font-bold">INCLUDED</span>
              </div>
              <div className="flex justify-between">
                <span>Mentor WhatsApp Channel:</span>
                <span className="text-emerald-600 font-bold">INCLUDED</span>
              </div>
              <div className="flex justify-between">
                <span>100% Doubt Clearance Guarantee:</span>
                <span className="text-emerald-600 font-bold">ACTIVE</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 dark:border-white/10 pt-2.5">
                <span>Subtotal Before Tax:</span>
                <span>₹{finalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (Estimated):</span>
                <span>₹0.00</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-3 border-t-2 border-dashed border-slate-200 dark:border-white/10 flex items-baseline justify-between">
              <div>
                <span className="text-sm font-black text-slate-900 dark:text-white block">
                  Order Total:
                </span>
                <span className="text-[10px] text-slate-400">{billingParam} retainer</span>
              </div>
              <span className="text-3xl font-black text-primary">
                ₹{finalPrice.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Pay Button */}
            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full py-4 px-6 rounded-2xl font-black text-sm bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white shadow-xl shadow-primary/25 transition-all text-center flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 disabled:opacity-60"
            >
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay ₹{finalPrice.toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Security Guarantee text */}
            <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 text-center space-y-1">
              <p>By placing your order, you agree to GrahakSetu&apos;s Mentorship Terms.</p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Instant activation: Sprint channel invitation sent to your WhatsApp.
              </p>
            </div>
          </div>

          {/* Quick Support Card */}
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-pink-100 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-primary shrink-0" />
            <p>
              Need assistance? WhatsApp our mentor desk directly at{' '}
              <a href="https://wa.me/918527296771" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">
                +91 85272 96771
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ClientCheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-pink-50/40 dark:bg-slate-950 relative selection:bg-pink-100 selection:text-primary">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <Snowfall />
      <SellerNavbar />

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        <Suspense
          fallback={
            <div className="max-w-6xl mx-auto flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          }
        >
          <ClientCheckoutContent />
        </Suspense>
      </main>
    </div>
  );
}
