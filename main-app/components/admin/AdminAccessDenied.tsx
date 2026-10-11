'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminAccessDenied({ userEmail }: { userEmail?: string }) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900 flex items-center justify-center p-4 sm:p-6">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Access Denied Card */}
      <div className="relative z-10 max-w-lg w-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl border border-pink-200 dark:border-white/10 shadow-2xl p-6 sm:p-8 text-center flex flex-col items-center">
        
        {/* Responsive Panda Admin Access Denied Artwork */}
        <div className="w-full max-w-[340px] sm:max-w-[380px] aspect-[4/3] relative rounded-2xl overflow-hidden border border-pink-100 dark:border-white/10 shadow-lg bg-pink-50/50 mb-6 group">
          <Image
            src="/admin-access-denied.jpg"
            alt="Admin Panel Access Denied"
            fill
            sizes="(max-width: 640px) 340px, 380px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 text-xs font-extrabold uppercase tracking-wider border border-rose-200 dark:border-rose-800/40 mb-3">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          Restricted Area · 403 Forbidden
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Admin Access Denied
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-sm">
          You do not have permission to view or manage the GrahakSetu Admin Panel.
        </p>

        {userEmail && (
          <div className="mt-3 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-xs font-mono text-slate-700 dark:text-slate-300 break-all">
            Signed in as: <strong className="text-slate-900 dark:text-white">{userEmail}</strong>
          </div>
        )}

        <div className="mt-2 text-[11px] text-slate-400">
          This portal is strictly authorized for administrative accounts only.
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full">
          <Link
            href="/"
            className="w-full sm:flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white shadow-lg shadow-primary/25 transition-all text-center"
          >
            Return to Homepage
          </Link>
          <Link
            href="/sign-in?redirect_url=%2Fadmin"
            className="w-full sm:flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-white transition-all text-center border border-slate-200 dark:border-white/10"
          >
            Switch Account
          </Link>
        </div>
      </div>
    </div>
  );
}
