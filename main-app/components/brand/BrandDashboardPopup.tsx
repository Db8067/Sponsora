'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import {
  X,
  LayoutDashboard,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export default function BrandDashboardPopup() {
  const { user, isLoaded } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [brandInfo, setBrandInfo] = useState<{
    brand_name: string;
    slug: string;
    dashboard_url: string;
  } | null>(null);

  useEffect(() => {
    // Read from cookie first for instant check
    let cookieEmail = '';
    let cookieBrand = '';
    try {
      const match = document.cookie.match(/brand_welcome_data=([^;]+)/);
      if (match) {
        const c = JSON.parse(decodeURIComponent(match[1]));
        cookieEmail = c.email || '';
        cookieBrand = c.brand || '';
      }
    } catch {
      /* ignore */
    }

    const checkEmail = user?.primaryEmailAddress?.emailAddress || cookieEmail;
    if (!checkEmail && !isLoaded) return;

    const checkPaidStatus = async () => {
      try {
        const q = checkEmail
          ? `?email=${encodeURIComponent(checkEmail)}`
          : cookieBrand
          ? `?brand=${encodeURIComponent(cookieBrand)}`
          : '';

        const res = await fetch(`/api/brand/check-status${q}`);
        const data = await res.json().catch(() => null);

        if (data?.registered && data?.has_paid && data?.brand) {
          const info = {
            brand_name: data.brand.brand_name || 'Your Brand',
            slug: data.brand.slug || 'brand',
            dashboard_url: data.dashboard_url || `/${data.brand.slug}-welcome-499`,
          };
          setBrandInfo(info);
          // Show popup automatically on initial open of the website
          const dismissedSession = sessionStorage.getItem('brand_popup_initial_dismissed');
          if (!dismissedSession) {
            setIsOpen(true);
          }
        }
      } catch (err) {
        console.error('[checkPaidStatus error]:', err);
      }
    };

    checkPaidStatus();
  }, [user, isLoaded]);

  // Intercept "Get Customers" or "Brand Register" clicks if brand has paid subscription
  useEffect(() => {
    if (!brandInfo) return;

    const handleIntercept = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a, button');
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const text = (target.textContent || '').toLowerCase();

      if (
        href.includes('/brand-register') ||
        text.includes('get customer') ||
        text.includes('brand register')
      ) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
      }
    };

    document.addEventListener('click', handleIntercept, true);
    return () => document.removeEventListener('click', handleIntercept, true);
  }, [brandInfo]);

  if (!isOpen || !brandInfo) return null;

  const handleClose = () => {
    sessionStorage.setItem('brand_popup_initial_dismissed', 'true');
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-pink-200 dark:border-white/10 shadow-2xl p-6 sm:p-8 text-center flex flex-col items-center">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Panda Artwork Image */}
        <div className="w-full max-w-[320px] aspect-[4/3] relative rounded-2xl overflow-hidden shadow-lg bg-pink-50 dark:bg-slate-800 mb-5 group border border-pink-100 dark:border-white/10">
          <Image
            src="/brand-dashboard-popup.png"
            alt="Go to your Brand Dashboard"
            fill
            sizes="320px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-black uppercase tracking-wider mb-2 border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Active Subscription Verified</span>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          🌸 Go to your Brand Dashboard
        </h2>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 max-w-sm">
          Your brand <span className="font-bold text-primary">"{brandInfo.brand_name}"</span> is active with verified 0% commission direct WhatsApp buyer routing!
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <Link
            href={brandInfo.dashboard_url}
            onClick={handleClose}
            className="w-full sm:flex-1 py-3.5 px-5 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white shadow-xl shadow-primary/25 transition-all text-center flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Go to your Brand Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={handleClose}
            className="w-full sm:w-auto py-3.5 px-5 rounded-2xl font-bold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all text-center"
          >
            Continue to Landing Page
          </button>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10 text-[11px] text-slate-400 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          <span>24/7 Founder Concierge &amp; Live WhatsApp Routing Active</span>
        </div>
      </div>
    </div>
  );
}
