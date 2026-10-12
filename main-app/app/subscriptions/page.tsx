'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { useSearchParams, useRouter } from 'next/navigation';
import { Check, Sparkles, HelpCircle, X, Loader2, User, ArrowRight, Star } from 'lucide-react';
import SellerNavbar from '@/components/SellerNavbar';
import Snowfall from '@/components/Snowfall';
import { useUser } from '@clerk/nextjs';

function PopupModal() {
  const searchParams = useSearchParams();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (searchParams.get('from') === 'storefront') {
      setShowPopup(true);
    }
  }, [searchParams]);

  if (!showPopup) return null;

  return (
    <div id="subscription-popup" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
        <button 
          type="button"
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="w-56 h-56 mb-6 rounded-2xl overflow-hidden shadow-inner border border-slate-100 dark:border-slate-700 bg-white flex items-center justify-center">
          <img src="/subscription-doodle.jpg" alt="Get your Brand Page" className="w-full h-full object-cover" />
        </div>

        <h3 className="text-xl font-black text-pink-600 dark:text-pink-400 mb-2">
          Get your Brand Page now !!
        </h3>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
          Please Buy a Subscription plan to continue adding products and get more Customers!
        </p>

        <button 
          type="button"
          onClick={() => setShowPopup(false)}
          className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold shadow-lg shadow-primary/30 transition-all active:scale-95"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

const PLANS = [
  {
    id: 1,
    tier: 'Startup package',
    monthlyPrice: 99,
    annualPrice: 82,
    strikethrough: '₹599',
    badge: '83% off',
    tagline: 'Perfect for new sellers getting their brand online.',
    description: 'Perfect for new brands stepping out of exhibitions.',
    highlight: false,
    features: [
      '50+ Customers on whatsapp',
      'Brand profile on GrahakSetu',
      '5+ Product listing',
      'Direct WhatsApp customer enquiries',
      'Customer analytics Dashboard',
      'Brand dashboard access',
    ],
  },
  {
    id: 2,
    tier: 'Growth Pro',
    monthlyPrice: 499,
    annualPrice: 414,
    strikethrough: '₹2,099',
    badge: '76% off',
    tagline: 'For established small businesses ready to grow traffic and sales rapidly.',
    description: 'For established brands ready to scale daily volume.',
    highlight: true,
    features: [
      '0% Commission forever',
      'Unlimited product catalog',
      'Custom domain (yourbrand.com)',
      'Advanced real-time analytics',
      'Realtime customer lead access',
      'Priority WhatsApp support',
    ],
  },
  {
    id: 3,
    tier: 'Business Scale',
    monthlyPrice: 1499,
    annualPrice: 1244,
    strikethrough: '₹4,299',
    badge: '65% off',
    tagline: 'For high-volume merchants needing dedicated assistance.',
    description: 'Multi-brand / agency accounts at scale.',
    highlight: false,
    features: [
      'Everything in Growth Pro',
      'UGC & content campaign opportunities',
      'Dedicated Account Manager',
      'Creator campaign matching',
      'Bulk order management',
      'API access & integrations',
    ],
  },
];

function SubscriptionsContent() {
  const searchParams = useSearchParams();
  const initialBilling = searchParams.get('billing') === 'annual' ? 'annual' : 'monthly';
  const [billing, setBilling] = useState<'monthly' | 'annual'>(initialBilling);
  const [selectedPlan, setSelectedPlan] = useState<number>(2);
  const [isProcessing, setIsProcessing] = useState<number | null>(null);
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get('billing') === 'annual') {
      setBilling('annual');
    }
  }, [searchParams]);

  const handlePayment = async (amount: number, planName: string, planId: number) => {
    if (!isSignedIn) {
      router.push(`/sign-in?redirect_url=${encodeURIComponent('/subscriptions?billing=' + billing)}`);
      return;
    }

    try {
      setIsProcessing(planId);
      const res = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, planId: `${planName} (${billing})` }),
      });

      const orderData = await res.json();
      
      if (!res.ok) {
        alert('Failed to initialize payment: ' + (orderData.error || 'Unknown error'));
        return;
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'GrahakSetu',
        description: `Subscription for ${planName} (${billing})`,
        order_id: orderData.id,
        handler: function (response: any) {
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
          router.push('/seller-onboard?payment=success');
        },
        prefill: {
          name: user?.fullName || 'GrahakSetu Seller',
          email: user?.primaryEmailAddress?.emailAddress || 'seller@example.com',
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
    } catch (error) {
      console.error(error);
      alert('Network error while processing payment.');
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative">
      <Snowfall />

      {/* Global Navbar */}
      <SellerNavbar />

      {/* Hero Header */}
      <section className="pt-10 pb-6 px-4 md:px-12 text-center max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 text-primary dark:text-pink-300 px-4 py-1.5 rounded-full font-bold text-xs md:text-sm mb-4 border border-pink-200 dark:border-white/10 shadow-sm">
          <User className="w-4 h-4 fill-primary" />
          A platform where you get Customers for your brand
        </div>
        <h1 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-white mb-3 tracking-tight">
          Simple, Transparent Subscriptions
        </h1>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          No hidden fees or profit cuts. Keep 100% of your customer payments and choose a subscription plan designed to scale with your business.
        </p>

        {/* Billing Toggle (Monthly / Annual) */}
        <div className="mt-6 inline-flex items-center p-1.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-pink-200 dark:border-white/10 shadow-sm backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setBilling('monthly')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              billing === 'monthly'
                ? 'bg-primary text-white shadow-md shadow-primary/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBilling('annual')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              billing === 'annual'
                ? 'bg-primary text-white shadow-md shadow-primary/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Annual</span>
            <span className="bg-pink-100 dark:bg-pink-900/60 text-primary dark:text-pink-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Save 45%
            </span>
          </button>
        </div>
      </section>

      {/* Subscription Pricing Cards */}
      <section className="py-6 px-4 md:px-12 lg:px-20 w-full max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch mt-2">
          {PLANS.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            const price = billing === 'annual' ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                onMouseEnter={() => setSelectedPlan(plan.id)}
                onTouchStart={() => setSelectedPlan(plan.id)}
                className={`cursor-pointer group relative flex flex-col justify-between p-6 md:p-8 rounded-3xl backdrop-blur-md transition-all duration-200 ${
                  plan.highlight ? 'md:-translate-y-2' : ''
                } ${
                  isSelected
                    ? 'bg-white/95 dark:bg-slate-800/95 border-2 border-primary shadow-2xl shadow-primary/10 scale-[1.02]'
                    : 'bg-white/70 dark:bg-slate-800/70 border border-pink-100 dark:border-white/10 shadow-lg hover:shadow-xl hover:border-pink-300'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-md flex items-center gap-1.5 uppercase tracking-wider">
                    <Star className="w-3 h-3 fill-white" /> Most Popular
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-bold text-primary uppercase tracking-wider">{plan.tier}</div>
                    <div className="bg-pink-100 text-primary dark:bg-pink-900/40 dark:text-pink-300 font-bold px-2.5 py-0.5 rounded-full text-xs shadow-sm">
                      {plan.badge}
                    </div>
                  </div>
                  <div className="mb-1 text-sm font-semibold text-slate-400 dark:text-slate-500 line-through">
                    {plan.strikethrough}
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                      ₹{price}
                    </span>
                    <span className="text-sm text-slate-500 font-medium">/month</span>
                  </div>
                  {billing === 'annual' && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-2">
                      Billed annually (₹{price * 12}/year)
                    </p>
                  )}
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-6">
                    {plan.tagline}
                  </p>

                  <div className="h-px bg-slate-200 dark:bg-slate-700 mb-6" />

                  <ul className="space-y-3.5 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 space-y-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePayment(price, plan.tier, plan.id);
                    }}
                    disabled={isProcessing === plan.id}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 ${
                      isSelected
                        ? 'bg-primary text-white shadow-lg shadow-primary/25 border-2 border-primary'
                        : 'bg-white dark:bg-slate-800 border-2 border-pink-200 dark:border-white/20 text-slate-800 dark:text-white hover:bg-primary hover:border-primary hover:text-white group-hover:bg-primary group-hover:border-primary group-hover:text-white shadow-sm'
                    }`}
                  >
                    {isProcessing === plan.id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Pay ₹{price} <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-slate-400 dark:text-slate-500">
                    Pay Securely by Razorpay · Cancel anytime
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits / FAQ Banner */}
        <div className="mt-16 mb-20 bg-white/70 dark:bg-slate-800/70 p-8 md:p-12 rounded-3xl backdrop-blur-md border border-pink-100 dark:border-white/10 shadow-lg">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-xl md:text-3xl font-bold text-slate-800 dark:text-white mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Clear answers to common questions about our subscriptions and platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-base mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                Are there really zero commissions?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Yes! We never take a percentage cut from your customer transactions. Customers pay you directly via UPI or cash.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-base mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                Do I need a GST number to subscribe?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                No GSTIN is required to register or use our website builder tools. You can get started immediately.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-base mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                Can I cancel or change plans anytime?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Absolutely. You can upgrade, downgrade, or cancel your subscription at any time straight from your merchant dashboard.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-base mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                How do WhatsApp orders work?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                When a customer clicks to purchase a product on your site, an automated WhatsApp message with order details is sent directly to your phone number.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <PopupModal />
      </Suspense>

      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
    </div>
  );
}

export default function SubscriptionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950 animate-pulse" />}>
      <SubscriptionsContent />
    </Suspense>
  );
}
