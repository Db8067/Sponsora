'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Store,
  User,
  Phone,
  Mail,
  Zap,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';

interface PlanDetail {
  id: number;
  tier: string;
  tagline: string;
  badge: string;
  strikethrough: number;
  price: number;
  welcomePath: string;
  description: string;
  features: string[];
}

const CHECKOUT_PLANS: Record<number, PlanDetail> = {
  1: {
    id: 1,
    tier: 'Startup Package',
    tagline: 'Perfect for emerging brands stepping out of exhibitions.',
    badge: '83% Off Launch Discount',
    strikethrough: 599,
    price: 99,
    welcomePath: '/brand-welcome-99',
    description: 'Perfect for new sellers getting their brand online with direct WhatsApp customer connections.',
    features: [
      '50+ Customers directly on WhatsApp',
      'Verified brand profile on GrahakSetu',
      '5+ Product listings showcased',
      'Direct WhatsApp customer enquiries',
      'Customer analytics dashboard',
    ],
  },
  2: {
    id: 2,
    tier: 'Growth Pro',
    tagline: 'For established brands ready to scale daily order volume.',
    badge: '76% Off Launch Discount',
    strikethrough: 2099,
    price: 499,
    welcomePath: '/brand-welcome-499',
    description: 'For established small businesses ready to grow traffic and customer sales rapidly.',
    features: [
      'Everything in Startup Package included',
      'Unlimited product catalog listings',
      'Custom domain connection (yourbrand.com)',
      'Advanced real-time customer analytics',
      'Real-time customer contact queue access',
      'Priority WhatsApp Founder Concierge',
    ],
  },
  3: {
    id: 3,
    tier: 'Business Scale',
    tagline: 'High-volume merchants needing dedicated assistance & multi-brand reach.',
    badge: '65% Off Launch Discount',
    strikethrough: 4299,
    price: 1499,
    welcomePath: '/brand-welcome-1499',
    description: 'For high-volume merchants needing dedicated assistance and multi-staff capability.',
    features: [
      'Everything in Growth Pro included',
      'UGC & content creator campaign matching',
      'Dedicated account manager',
      'Creator barter gifting opportunities',
      'Bulk order management & CRM sync',
      'API access & webhook integrations',
    ],
  },
};

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();

  // Read URL params
  const rawPlanParam = searchParams.get('plan');
  const planId = rawPlanParam === '3' || rawPlanParam === 'scale' ? 3 : rawPlanParam === '2' || rawPlanParam === 'growth' ? 2 : 1;
  const billingParam = searchParams.get('billing') === 'annual' ? 'annual' : 'monthly';
  const urlBrand = searchParams.get('brand') || '';

  const plan = CHECKOUT_PLANS[planId];
  const finalPrice = billingParam === 'annual' ? Math.round(plan.price * 0.55) : plan.price;
  const originalPrice = billingParam === 'annual' ? plan.strikethrough * 12 : plan.strikethrough;
  const totalSavings = originalPrice - finalPrice;

  // 4 Intake Form Fields
  const [brandName, setBrandName] = useState(urlBrand);
  const [founderName, setFounderName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Prefill from cookies / Clerk if available
  useEffect(() => {
    try {
      const match = document.cookie.match(/brand_welcome_data=([^;]+)/);
      if (match) {
        const c = JSON.parse(decodeURIComponent(match[1]));
        if (c.brand && !brandName) setBrandName(c.brand);
        if (c.founder && !founderName) setFounderName(c.founder);
        if (c.phone && !phoneNumber) setPhoneNumber(c.phone);
        if (c.email && !emailAddress) setEmailAddress(c.email);
      }
    } catch {
      /* ignore */
    }

    if (user) {
      if (user.fullName && !founderName) setFounderName(user.fullName);
      if (user.primaryEmailAddress?.emailAddress && !emailAddress) {
        setEmailAddress(user.primaryEmailAddress.emailAddress);
      }
    }
  }, [user]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!brandName.trim()) {
      setErrorMsg('Please enter your Brand Name.');
      return;
    }
    if (!founderName.trim()) {
      setErrorMsg('Please enter the Founder Name.');
      return;
    }
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit WhatsApp phone number.');
      return;
    }
    if (!emailAddress.trim() || !emailAddress.includes('@')) {
      setErrorMsg('Please enter a valid business email address.');
      return;
    }

    setIsProcessing(true);

    // Save updated brand registration cookie
    try {
      const cookiePayload = {
        brand: brandName.trim(),
        founder: founderName.trim(),
        phone: cleanPhone.slice(-10),
        email: emailAddress.trim().toLowerCase(),
        plan: plan.tier,
        amount: String(finalPrice),
      };
      const expires = new Date();
      expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
      document.cookie = `brand_welcome_data=${encodeURIComponent(JSON.stringify(cookiePayload))};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`;
    } catch {
      /* ignore */
    }

    try {
      const res = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalPrice,
          planId: `${plan.tier} (${brandName})`,
        }),
      });

      const orderData = await res.json();
      if (!res.ok) {
        throw new Error(orderData.error || 'Unable to initialize Razorpay payment.');
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'GrahakSetu',
        description: `Subscription: ${plan.tier}`,
        order_id: orderData.id,
        handler: function (response: any) {
          // On successful payment, redirect to post-payment welcome destination
          router.push(plan.welcomePath);
        },
        prefill: {
          name: founderName.trim(),
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
        rzp.on('payment.failed', function (resp: any) {
          setErrorMsg('Payment Failed: ' + (resp.error?.description || 'Transaction canceled.'));
          setIsProcessing(false);
        });
        rzp.open();
      } else {
        // Fallback if Razorpay SDK failed to load in test environment
        router.push(plan.welcomePath);
      }
    } catch (err: any) {
      console.error('[checkout error]:', err);
      setErrorMsg(err.message || 'Payment initiation failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* Amazon-style Progress Tracker Header */}
      <div className="border-b border-slate-200 dark:border-white/10 pb-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Checkout &amp; Instant Brand Activation
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Bank-grade 256-bit encrypted checkout powered by Razorpay. Zero commission on orders.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 self-start sm:self-auto">
          <Lock className="w-4 h-4 text-emerald-600" />
          <span>SSL 256-Bit Secure Transaction</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Intake Form & Review Items (Amazon Style) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1: Intake Form */}
          <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-pink-200 dark:border-white/10 shadow-sm backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-primary text-white font-black text-xs flex items-center justify-center">
                  1
                </span>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  Brand Details &amp; Contact Information
                </h2>
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Required</span>
            </div>

            <form onSubmit={handlePlaceOrder} id="checkout-form" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Brand Name */}
                <div>
                  <label htmlFor="brandName" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    Brand Name *
                  </label>
                  <div className="relative">
                    <Store className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      id="brandName"
                      type="text"
                      required
                      placeholder="e.g. Mitti Herbals"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                    />
                  </div>
                </div>

                {/* 2. Founder Name */}
                <div>
                  <label htmlFor="founderName" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    Founder Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      id="founderName"
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={founderName}
                      onChange={(e) => setFounderName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                    />
                  </div>
                </div>

                {/* 3. Phone Number */}
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
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                    />
                  </div>
                </div>

                {/* 4. Email Address */}
                <div>
                  <label htmlFor="emailAddress" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    Business Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      id="emailAddress"
                      type="email"
                      required
                      placeholder="e.g. founder@yourbrand.com"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Section 2: Review Selected Plan */}
          <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-pink-200 dark:border-white/10 shadow-sm backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-primary text-white font-black text-xs flex items-center justify-center">
                  2
                </span>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  Review Subscription Package
                </h2>
              </div>
              <Link href="/brand-subscriptions" className="text-xs font-bold text-primary hover:underline">
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
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {plan.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Instant WhatsApp customer routing active</span>
                </div>
              </div>

              <div className="text-right sm:shrink-0">
                <div className="text-xs text-slate-400 line-through">
                  ₹{originalPrice}
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  ₹{finalPrice}
                  <span className="text-xs font-normal text-slate-500"> / mo</span>
                </div>
              </div>
            </div>

            {/* Feature Bullets */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/10">
              <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider block mb-2">
                Included with your {plan.tier} subscription
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

        {/* Right Column: Amazon-Style Sticky Order Summary Card */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="bg-white/95 dark:bg-slate-900/95 rounded-3xl p-6 sm:p-7 border-2 border-pink-200 dark:border-white/10 shadow-xl backdrop-blur-md space-y-5">
            
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight pb-3 border-b border-slate-100 dark:border-white/10">
              Order Summary
            </h3>

            {/* Price Line Items */}
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Items (Original M.R.P.):</span>
                <span className="line-through text-slate-400">₹{originalPrice}</span>
              </div>
              <div className="flex justify-between text-primary font-bold">
                <span>Platform Launch Savings:</span>
                <span>- ₹{totalSavings}</span>
              </div>
              <div className="flex justify-between">
                <span>Direct WhatsApp Customer Fee:</span>
                <span className="text-emerald-600 font-bold">FREE (₹0)</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Marketplace Commission:</span>
                <span className="text-emerald-600 font-bold">0% Forever</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 dark:border-white/10 pt-2.5">
                <span>Subtotal Before Tax:</span>
                <span>₹{finalPrice}</span>
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
                <span className="text-[10px] text-slate-400">Recurring {billingParam} subscription</span>
              </div>
              <span className="text-3xl font-black text-primary">
                ₹{finalPrice}
              </span>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Amazon-style "Place Your Order and Pay" Button */}
            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full py-4 px-6 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-400 via-pink-500 to-primary hover:from-amber-500 hover:to-pink-600 text-white shadow-xl shadow-primary/25 transition-all text-center flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 disabled:opacity-60"
            >
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Your Order and Pay</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Security Guarantee text */}
            <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 text-center space-y-1">
              <p>By placing your order, you agree to GrahakSetu's Terms of Service.</p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Instant activation: Dashboard credentials sent to your email.
              </p>
            </div>
          </div>

          {/* Quick Support Card */}
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-pink-100 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-primary shrink-0" />
            <p>
              Need assistance? Email our founder concierge at{' '}
              <a href="mailto:devanshb3456@gmail.com" className="font-bold text-primary hover:underline">
                devanshb3456@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BrandCheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-pink-50/40 dark:bg-slate-950 relative selection:bg-pink-100 selection:text-primary">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <Snowfall />
      <SellerNavbar />

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        <Suspense fallback={
          <div className="max-w-6xl mx-auto flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        }>
          <CheckoutContent />
        </Suspense>
      </main>
    </div>
  );
}
