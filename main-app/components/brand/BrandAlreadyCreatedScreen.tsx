'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Snowfall from '@/components/Snowfall';
import SellerNavbar from '@/components/SellerNavbar';
import {
  Sparkles,
  ArrowRight,
  Store,
  ExternalLink,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  Rocket,
} from 'lucide-react';

export interface ActiveBrandInfo {
  id?: string;
  brand_name: string;
  founder_name?: string;
  slug?: string;
  logo?: string;
  city?: string;
  category?: string;
  phone?: string;
  email?: string;
  status?: string;
  website?: string;
  instagram?: string;
}

export default function BrandAlreadyCreatedScreen({
  brand,
  onRegisterAnother,
}: {
  brand: ActiveBrandInfo;
  onRegisterAnother?: () => void;
}) {
  const brandSlug = brand.slug || encodeURIComponent(brand.brand_name || 'brand');
  const subscriptionsUrl = `/brand-subscriptions?brand=${brandSlug}`;
  const passportUrl = `/admin-brandform-${brandSlug}`;

  return (
    <div className="min-h-screen flex flex-col bg-pink-50/30 dark:bg-slate-950 relative selection:bg-pink-100 selection:text-primary">
      <Snowfall />
      <SellerNavbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10 relative z-10">
        <div className="w-full max-w-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl border border-pink-200 dark:border-white/10 shadow-2xl p-6 sm:p-8 md:p-10 text-center flex flex-col items-center">
          
          {/* Cute Panda Artwork */}
          <div className="w-full max-w-[340px] sm:max-w-[400px] aspect-[4/3] relative rounded-3xl overflow-hidden shadow-xl bg-pink-50 dark:bg-slate-800 mb-6 group border border-pink-100 dark:border-white/10">
            <Image
              src="/brand-already-created.png"
              alt="Your Brand is already created"
              fill
              sizes="(max-width: 640px) 340px, 400px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-100 dark:bg-pink-900/40 text-primary dark:text-pink-300 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Profile Already Active</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
            🌸 Woohoo! Your Brand Profile is Already Live!
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-lg leading-relaxed">
            You have already set up a verified brand profile for <span className="font-extrabold text-primary">"{brand.brand_name}"</span> on Grahak Setu. There is no need to fill out the registration form again!
          </p>

          {/* Brand Card Preview */}
          <div className="w-full mt-6 p-4 sm:p-5 rounded-2xl bg-pink-50/60 dark:bg-slate-800/60 border border-pink-100 dark:border-white/10 text-left">
            <div className="flex items-center gap-4">
              {brand.logo ? (
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white dark:bg-slate-700 shadow-sm border border-pink-200 dark:border-white/10 relative shrink-0">
                  <Image src={brand.logo} alt={brand.brand_name} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl shadow-sm shrink-0">
                  {brand.brand_name?.charAt(0) || 'B'}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white truncate">
                    {brand.brand_name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 shrink-0">
                    <CheckCircle2 className="w-3 h-3" /> Live
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Founder: <span className="font-semibold text-slate-700 dark:text-slate-300">{brand.founder_name || 'Brand Founder'}</span>
                  {brand.city && ` • ${brand.city}`}
                </p>
              </div>
            </div>

            {/* Quick Details Chips */}
            <div className="mt-3 pt-3 border-t border-pink-100/80 dark:border-white/10 flex flex-wrap gap-2 text-[11px] text-slate-600 dark:text-slate-300">
              {brand.email && (
                <span className="inline-flex items-center gap-1 bg-white dark:bg-slate-700 px-2.5 py-1 rounded-lg border border-pink-100 dark:border-white/10">
                  <Mail className="w-3 h-3 text-primary" /> {brand.email}
                </span>
              )}
              {brand.phone && (
                <span className="inline-flex items-center gap-1 bg-white dark:bg-slate-700 px-2.5 py-1 rounded-lg border border-pink-100 dark:border-white/10">
                  <Phone className="w-3 h-3 text-emerald-600" /> {brand.phone}
                </span>
              )}
              {brand.instagram && (
                <span className="inline-flex items-center gap-1 bg-white dark:bg-slate-700 px-2.5 py-1 rounded-lg border border-pink-100 dark:border-white/10">
                  📷 {brand.instagram}
                </span>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
            <Link
              href={subscriptionsUrl}
              className="flex-1 py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white shadow-xl shadow-primary/25 transition-all text-center flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <Rocket className="w-4 h-4" />
              <span>Choose Growth Subscription</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={passportUrl}
              className="py-3.5 px-5 rounded-xl font-bold text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white transition-all text-center border border-slate-200 dark:border-white/10 flex items-center justify-center gap-1.5"
            >
              <Store className="w-4 h-4" />
              <span>View Brand Passport</span>
            </Link>
          </div>

          {/* Option to register another brand */}
          {onRegisterAnother && (
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/10 w-full text-center">
              <button
                type="button"
                onClick={onRegisterAnother}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-primary transition-colors inline-flex items-center gap-1 font-semibold"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Want to register a different / new brand? Click here</span>
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
