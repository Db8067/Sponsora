'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Snowfall from '@/components/Snowfall';
import SellerNavbar from '@/components/SellerNavbar';
import { useUser } from '@clerk/nextjs';
import {
  Sparkles,
  ArrowRight,
  Store,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Home,
  LayoutDashboard,
} from 'lucide-react';

export interface PaidBrandInfo {
  brand_name: string;
  founder_name?: string;
  slug?: string;
  logo?: string;
  email?: string;
  dashboard_url?: string;
  plan_tier?: string;
  amount?: number;
}

export default function PaidBrandDashboardScreen({
  brand,
}: {
  brand: PaidBrandInfo;
}) {
  const { isSignedIn } = useUser();
  const brandSlug = brand.slug || encodeURIComponent(brand.brand_name || 'brand');
  const rawDashboardHref =
    brand.dashboard_url ||
    (brand.amount === 99
      ? `/${brandSlug}-welcome-99`
      : brand.amount === 1499
      ? `/${brandSlug}-welcome-1499`
      : `/${brandSlug}-welcome-499`);
  const dashboardHref = isSignedIn
    ? rawDashboardHref
    : `/sign-in?redirect_url=${encodeURIComponent(rawDashboardHref)}`;

  return (
    <div className="min-h-screen flex flex-col bg-pink-50/30 dark:bg-slate-950 relative selection:bg-pink-100 selection:text-primary">
      <Snowfall />
      <SellerNavbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10 relative z-10">
        <div className="w-full max-w-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl border border-pink-200 dark:border-white/10 shadow-2xl p-6 sm:p-8 md:p-10 text-center flex flex-col items-center">
          
          {/* Panda "Go to your Brand Dashboard" Artwork */}
          <div className="w-full max-w-[360px] sm:max-w-[420px] aspect-[4/3] relative rounded-3xl overflow-hidden shadow-xl bg-pink-50 dark:bg-slate-800 mb-6 group border border-pink-100 dark:border-white/10">
            <Image
              src="/brand-dashboard-popup.png"
              alt="Go to your Brand Dashboard"
              fill
              sizes="(max-width: 640px) 360px, 420px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-black uppercase tracking-wider mb-3 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Active Growth Subscription Verified</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
            🌸 Go to your Brand Dashboard!
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-lg leading-relaxed">
            Welcome, <span className="font-extrabold text-primary">{brand.brand_name}</span>! Your verified subscription package is active. You do not need to register again. You can manage your live customer queue and store details right from your dashboard.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
            <Link
              href={dashboardHref}
              className="w-full sm:flex-1 py-4 px-6 rounded-2xl font-black text-sm bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white shadow-xl shadow-primary/25 transition-all text-center flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{isSignedIn ? 'Go to your Brand Dashboard' : 'Login to Open Brand Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto py-4 px-6 rounded-2xl font-bold text-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all text-center flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Visit Landing Page</span>
            </Link>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 text-xs text-slate-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>0% Commission • Real-Time WhatsApp Direct Buyer Routing Active</span>
          </div>
        </div>
      </main>
    </div>
  );
}
