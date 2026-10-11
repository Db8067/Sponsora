'use client';

import React from 'react';
import Image from 'next/image';
import Snowfall from '@/components/Snowfall';
import { Mail, RefreshCw } from 'lucide-react';

export default function BrandDisabledScreen({ brandName }: { brandName?: string }) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-pink-50/40 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6">
      <Snowfall />

      <div className="relative z-10 max-w-lg w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl border border-pink-200 dark:border-white/10 shadow-2xl p-6 sm:p-8 text-center flex flex-col items-center">
        
        {/* Panda Disabled Artwork */}
        <div className="w-full max-w-[360px] aspect-[4/3] relative rounded-2xl overflow-hidden shadow-lg bg-pink-50 dark:bg-slate-800 mb-6 group border border-pink-100 dark:border-white/10">
          <Image
            src="/brand-disabled.png"
            alt="Your Brand is Disabled"
            fill
            sizes="(max-width: 640px) 340px, 380px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Oops! Your Brand is Disabled
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-sm leading-relaxed">
          {brandName ? `The brand account for "${brandName}"` : 'This brand profile'} has been decommissioned by the platform administrator.
        </p>

        <p className="text-[11px] text-pink-600 font-semibold mt-1">
          Please reach out to the GrahakSetu team to restore access.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full">
          <a
            href="mailto:devanshb3456@gmail.com?subject=Brand%20Reactivation%20Request"
            className="w-full sm:flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white shadow-lg shadow-primary/25 transition-all text-center flex items-center justify-center gap-1.5"
          >
            <Mail className="w-4 h-4" /> Contact Admin
          </a>
          <a
            href="/brand-register?reapply=true"
            className="w-full sm:flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white transition-all text-center border border-slate-200 dark:border-white/10 flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-4 h-4" /> Register Again
          </a>
        </div>
      </div>
    </div>
  );
}
