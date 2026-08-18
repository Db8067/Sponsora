'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles, Zap, ShieldCheck, HelpCircle } from 'lucide-react';
import SellerNavbar from '@/components/SellerNavbar';

export default function SubscriptionsPage() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* Global Navbar */}
      <SellerNavbar />

      {/* Hero Header */}
      <section className="pt-10 pb-8 px-4 md:px-12 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-4 py-1.5 rounded-full font-bold text-xs md:text-sm mb-4">
          <Zap className="w-4 h-4 fill-pink-500" />
          A platfrom where you get Customers for your brand
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
          Simple, Transparent Subscriptions
        </h1>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          No hidden fees or profit cuts. Keep 100% of your customer payments and choose a subscription plan designed to scale with your business.
        </p>
      </section>

      {/* Subscription Pricing Cards */}
      <section className="py-6 px-4 md:px-12 lg:px-20 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Plan 1: Starter */}
          <div 
            onClick={() => setSelectedPlan(1)}
            className={`cursor-pointer flex flex-col justify-between p-6 md:p-8 rounded-3xl backdrop-blur-md transition-all ${
              selectedPlan === 1 
                ? 'bg-white/80 dark:bg-slate-800/80 border-2 border-primary shadow-2xl scale-[1.02]' 
                : 'bg-white/60 dark:bg-slate-800/60 border border-white/40 dark:border-white/10 shadow-lg hover:shadow-xl'
            }`}
          >
            <div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Startup package</div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">₹99</span>
                <span className="text-sm text-slate-500 font-medium">/month</span>
              </div>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-6">
                Perfect for new sellers getting their brand online.
              </p>
              
              <div className="h-px bg-slate-200 dark:bg-slate-700 mb-6"></div>

              <ul className="space-y-3.5 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span><strong>0% Commission</strong> on all orders</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Up to <strong>10 product uploading for 1 month</strong></span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Customized brand page and link</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Direct WhatsApp order button</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Brand Dashboard Access</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <Link href="/seller-onboard" className="block w-full text-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white py-3 rounded-xl font-bold text-sm transition-colors">
                Get Startup package
              </Link>
            </div>
          </div>

          {/* Plan 2: Pro Growth (Highlighted optionally by default or when clicked) */}
          <div 
            onClick={() => setSelectedPlan(2)}
            className={`cursor-pointer relative flex flex-col justify-between p-6 md:p-8 rounded-3xl backdrop-blur-md transition-all ${
              selectedPlan === 2 || selectedPlan === null // Keep default highlighted unless another is selected
                ? 'bg-white/80 dark:bg-slate-800/80 border-2 border-primary shadow-2xl scale-[1.02]'
                : 'bg-white/60 dark:bg-slate-800/60 border border-white/40 dark:border-white/10 shadow-lg hover:shadow-xl'
            }`}
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-md flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Most Popular
            </div>
            <div>
              <div className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Growth Pro</div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">₹499</span>
                <span className="text-sm text-slate-500 font-medium">/month</span>
              </div>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-6">
                For established small businesses ready to grow traffic and sales rapidly.
              </p>

              <div className="h-px bg-slate-200 dark:bg-slate-700 mb-6"></div>

              <ul className="space-y-3.5 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span><strong>0% Commission</strong> forever</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span><strong>Unlimited</strong> product catalog</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Custom domain support (yourbrand.com)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Advanced real-time analytics & clicks</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Realtime access of customers</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Priority WhatsApp seller support</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <Link href="/seller-onboard" className="block w-full text-center bg-primary hover:bg-primary-dark text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/30 transition-all hover:scale-[1.02]">
                Get Growth Pro
              </Link>
            </div>
          </div>

          {/* Plan 3: Business Scale */}
          <div 
            onClick={() => setSelectedPlan(3)}
            className={`cursor-pointer flex flex-col justify-between p-6 md:p-8 rounded-3xl backdrop-blur-md transition-all ${
              selectedPlan === 3 
                ? 'bg-white/80 dark:bg-slate-800/80 border-2 border-primary shadow-2xl scale-[1.02]' 
                : 'bg-white/60 dark:bg-slate-800/60 border border-white/40 dark:border-white/10 shadow-lg hover:shadow-xl'
            }`}
          >
            <div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Business Scale</div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">₹1,499</span>
                <span className="text-sm text-slate-500 font-medium">/month</span>
              </div>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-6">
                For high-volume merchants needing dedicated assistance and multi-staff accounts.
              </p>

              <div className="h-px bg-slate-200 dark:bg-slate-700 mb-6"></div>

              <ul className="space-y-3.5 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span><strong>Everything in Growth Pro</strong></span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Dedicated Account Manager</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Bulk catalog import assistance</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Multi-staff dashboard logins</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span>Custom marketing promotional banners</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <Link href="/seller-onboard" className="block w-full text-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white py-3 rounded-xl font-bold text-sm transition-colors">
                Choose Business Scale
              </Link>
            </div>
          </div>

        </div>

        {/* Benefits / FAQ Banner */}
        <div className="mt-16 mb-20 bg-white/60 dark:bg-slate-800/60 p-8 md:p-12 rounded-3xl backdrop-blur-md border border-white/40 dark:border-white/10 shadow-lg">
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
                <HelpCircle className="w-4 h-4 text-pink-500 shrink-0" />
                Are there really zero commissions?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Yes! We never take a percentage cut from your customer transactions. Customers pay you directly via UPI or cash.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-base mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-pink-500 shrink-0" />
                Do I need a GST number to subscribe?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                No GSTIN is required to register or use our website builder tools. You can get started immediately.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-base mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-pink-500 shrink-0" />
                Can I cancel or change plans anytime?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Absolutely. You can upgrade, downgrade, or cancel your subscription at any time straight from your merchant dashboard.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-base mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-pink-500 shrink-0" />
                How do WhatsApp orders work?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                When a customer clicks to purchase a product on your site, an automated WhatsApp message with order details is sent directly to your phone number.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
