'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Snowfall from '@/components/Snowfall';
import { LogIn, Home, Shield } from 'lucide-react';

export default function AdminLoggedOutScreen() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white via-pink-50/20 to-white flex items-center justify-center p-4 sm:p-6 text-slate-800">
      <Snowfall />

      {/* Main Container */}
      <div className="relative z-10 max-w-lg w-full bg-white/95 backdrop-blur-md rounded-3xl border border-pink-100 shadow-2xl p-6 sm:p-8 text-center flex flex-col items-center">
        
        {/* Responsive Artwork Image 5 */}
        <div className="w-full max-w-[360px] sm:max-w-[400px] aspect-[4/3] relative rounded-2xl overflow-hidden border border-pink-100 shadow-lg bg-pink-50/50 mb-6 group">
          <Image
            src="/admin-logged-out.png"
            alt="Logged Out from Admin Panel"
            fill
            sizes="(max-width: 640px) 340px, 400px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider border border-slate-200 mb-3">
          <Shield className="w-3.5 h-3.5 text-pink-600" />
          Admin Session Terminated
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Logged Out of Admin Panel
        </h1>

        <p className="text-sm text-slate-600 mt-2 max-w-sm leading-relaxed">
          You have successfully logged out from the GrahakSetu Admin Console. Please sign in with your administrative account to access system controls.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full">
          <Link
            href="/sign-in?redirect_url=%2Fadmin"
            className="w-full sm:flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white shadow-lg shadow-primary/25 transition-all text-center flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" /> Log In to Admin
          </Link>
          <Link
            href="/"
            className="w-full sm:flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all text-center border border-slate-200 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
