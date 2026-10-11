'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useClerk } from '@clerk/nextjs';
import Snowfall from '@/components/Snowfall';

export default function AdminAccessDenied({ userEmail }: { userEmail?: string }) {
  const { signOut } = useClerk();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white via-pink-50/20 to-white flex items-center justify-center p-4 sm:p-6 text-slate-800">
      <Snowfall />

      {/* Access Denied Card */}
      <div className="relative z-10 max-w-lg w-full bg-white/95 backdrop-blur-md rounded-3xl border border-pink-100 shadow-2xl p-6 sm:p-8 text-center flex flex-col items-center">
        
        {/* Responsive Panda Admin Access Denied Artwork */}
        <div className="w-full max-w-[340px] sm:max-w-[380px] aspect-[4/3] relative rounded-2xl overflow-hidden border border-pink-100 shadow-lg bg-pink-50/50 mb-6 group">
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-extrabold uppercase tracking-wider border border-rose-200 mb-3">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          Restricted Area · 403 Forbidden
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Admin Access Denied
        </h1>

        <p className="text-sm text-slate-600 mt-2 max-w-sm">
          You do not have permission to view or manage the GrahakSetu Admin Panel.
        </p>

        {userEmail && (
          <div className="mt-3 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 break-all">
            Signed in as: <strong className="text-slate-900">{userEmail}</strong>
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
          <button
            type="button"
            onClick={() => signOut({ redirectUrl: '/sign-in?redirect_url=/admin' })}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all text-center border border-slate-200 shadow-sm"
          >
            Switch Account
          </button>
        </div>
      </div>
    </div>
  );
}
