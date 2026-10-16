'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Snowfall from '@/components/Snowfall';
import SellerNavbar from '@/components/SellerNavbar';
import {
  Lock,
  Sparkles,
  ArrowRight,
  LayoutDashboard,
  ShieldAlert,
  LogIn,
  Home,
} from 'lucide-react';

export interface RestrictedDashboardScreenProps {
  mode: 'login_required' | 'restricted_tier';
  requestedTier: '99' | '499' | '1499';
  slug?: string;
  brandName?: string;
  activePaidTier?: '99' | '499' | '1499' | null;
  currentPath?: string;
}

const TIER_INFO: Record<
  '99' | '499' | '1499',
  { name: string; price: string; period: string }
> = {
  '99': { name: 'Starter Maker', price: '99', period: '/month' },
  '499': { name: 'Growth Pro', price: '499', period: '/month' },
  '1499': { name: 'Business Scale', price: '1499', period: '/month' },
};

export default function RestrictedDashboardScreen({
  mode,
  requestedTier,
  slug = 'brand',
  brandName = 'Your Brand',
  activePaidTier = null,
  currentPath,
}: RestrictedDashboardScreenProps) {
  const targetPlan = TIER_INFO[requestedTier] || TIER_INFO['499'];
  const cleanSlug = slug.replace(/-welcome-(99|499|1499)$/i, '') || 'brand';
  const redirectTarget = currentPath || `/${cleanSlug}-welcome-${requestedTier}`;

  const checkoutHref = `/brand-checkout?plan=${encodeURIComponent(
    targetPlan.name
  )}&price=${encodeURIComponent(targetPlan.price)}&period=${encodeURIComponent(
    targetPlan.period
  )}&brand=${encodeURIComponent(brandName)}`;

  const activeDashboardHref = activePaidTier
    ? `/${cleanSlug}-welcome-${activePaidTier}`
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-pink-50/30 dark:bg-slate-950 relative selection:bg-pink-100 selection:text-primary">
      <Snowfall />
      <SellerNavbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10 relative z-10">
        <div className="w-full max-w-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl border border-pink-200 dark:border-white/10 shadow-2xl p-6 sm:p-8 md:p-10 text-center flex flex-col items-center">
          {/* Uploaded Panda Restricted Artwork */}
          <div className="w-full max-w-[360px] sm:max-w-[420px] aspect-[4/3] relative rounded-3xl overflow-hidden shadow-xl bg-pink-50 dark:bg-slate-800 mb-6 group border border-pink-100 dark:border-white/10">
            <Image
              src="/images/restricted-dashboard.jpg"
              alt="Restricted Subscription Dashboard"
              fill
              sizes="(max-width: 640px) 360px, 420px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>

          {mode === 'login_required' ? (
            <>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-black uppercase tracking-wider mb-3 border border-amber-200 dark:border-amber-800">
                <Lock className="w-3.5 h-3.5" />
                <span>Authentication Required</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                Please Sign In to Open Your Brand Dashboard
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-lg leading-relaxed">
                For your brand&apos;s security, you must be logged in with the registered account for{' '}
                <span className="font-extrabold text-primary">{brandName}</span> before accessing your live subscription dashboard.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
                <Link
                  href={`/sign-in?redirect_url=${encodeURIComponent(redirectTarget)}`}
                  className="w-full sm:flex-1 py-4 px-6 rounded-2xl font-black text-sm bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white shadow-xl shadow-primary/25 transition-all text-center flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login to Brand Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/"
                  className="w-full sm:w-auto py-4 px-6 rounded-2xl font-bold text-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all text-center flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-black uppercase tracking-wider mb-3 border border-rose-200 dark:border-rose-800">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Subscription Tier Restricted • ₹{targetPlan.price}/mo {targetPlan.name}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                Restricted for this Subscription Dashboard — Pay to Avail It
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-lg leading-relaxed">
                Your account does not have an active{' '}
                <span className="font-extrabold text-primary">
                  ₹{targetPlan.price}/mo ({targetPlan.name})
                </span>{' '}
                subscription. Upgrade or purchase the {targetPlan.name} plan to unlock this dashboard!
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-lg">
                <Link
                  href={checkoutHref}
                  className="w-full sm:flex-1 py-4 px-6 rounded-2xl font-black text-sm bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white shadow-xl shadow-primary/25 transition-all text-center flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Pay ₹{targetPlan.price} to Avail {targetPlan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {activeDashboardHref ? (
                  <Link
                    href={activeDashboardHref}
                    className="w-full sm:w-auto py-4 px-5 rounded-2xl font-bold text-sm bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 transition-all text-center flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Open Your Active ₹{activePaidTier} Dashboard</span>
                  </Link>
                ) : (
                  <Link
                    href={`/brand-subscriptions?brand=${encodeURIComponent(cleanSlug)}`}
                    className="w-full sm:w-auto py-4 px-5 rounded-2xl font-bold text-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all text-center flex items-center justify-center gap-2"
                  >
                    <span>View All Plans</span>
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
