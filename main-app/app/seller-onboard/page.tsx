'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Store, User, Phone, Briefcase, Mail, Sparkles, ShieldCheck } from 'lucide-react';
import SellerNavbar from '@/components/SellerNavbar';

export default function SellerOnboardPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen bg-transparent">
        <SellerNavbar />
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          <div className="max-w-md w-full bg-white/80 dark:bg-slate-900/80 p-8 rounded-[2rem] shadow-2xl backdrop-blur-xl border border-white/50 dark:border-white/10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-purple-500"></div>
            <div className="w-24 h-24 bg-green-100/80 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner shadow-green-200 dark:shadow-none">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">You're All Set!</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 text-sm md:text-base leading-relaxed">
              Your profile is currently <span className="font-bold text-yellow-600 dark:text-yellow-400">Pending Review</span>. 
              We're setting up your dashboard and will email you within 24 hours.
            </p>
            <div className="space-y-3">
              <Link href="/">
                <button className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold py-3.5 rounded-xl transition-colors">
                  Return Home
                </button>
              </Link>
              <Link href="/seller/dashboard">
                <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]">
                  Go to Dashboard (Mock)
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <SellerNavbar />
      
      <div className="flex-1 max-w-4xl w-full mx-auto py-12 px-4 md:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-pink-600 dark:text-slate-400 dark:hover:text-pink-400 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-white/70 dark:bg-slate-900/70 rounded-[2.5rem] shadow-2xl backdrop-blur-xl border border-white/50 dark:border-white/10 overflow-hidden relative">
          
          {/* Left / Top Banner Area */}
          <div className="lg:col-span-2 bg-gradient-to-br from-pink-500 to-purple-600 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-black/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <ShieldCheck className="w-12 h-12 text-white/90 mb-6" />
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                Launch Your <br/> Business Online
              </h2>
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                Join thousands of small businesses selling across India with 0% commission. Quick setup, powerful tools, and full control over your brand.
              </p>
            </div>

            <div className="relative z-10 mt-12 space-y-4 hidden lg:block">
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/20">
                <Sparkles className="w-5 h-5 text-pink-200 shrink-0" />
                <span className="text-sm font-medium">Free forever plan available</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/20">
                <Store className="w-5 h-5 text-pink-200 shrink-0" />
                <span className="text-sm font-medium">Custom website in minutes</span>
              </div>
            </div>
          </div>
          
          {/* Right Form Area */}
          <div className="lg:col-span-3 p-8 md:p-12 relative">
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-pink-500" />
                    Personal Details
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <User className="w-4 h-4 text-slate-400" />
                      </div>
                      <input required type="text" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow" placeholder="John Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Phone className="w-4 h-4 text-slate-400" />
                      </div>
                      <input required type="tel" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow" placeholder="+91 98765 43210" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-500" />
                    Business Details
                  </h3>
                </div>
                
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Business / Store Name *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Store className="w-4 h-4 text-slate-400" />
                      </div>
                      <input required type="text" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-shadow" placeholder="E.g. XYZ Electronics" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Business Address *</label>
                    <textarea required className="w-full h-24 p-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-shadow resize-none leading-relaxed" placeholder="Full address for operations..."></textarea>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button type="submit" className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2 text-base">
                  Create My Store
                  <Sparkles className="w-5 h-5" />
                </button>
                <p className="text-xs text-center text-slate-500 mt-4 leading-relaxed px-4">
                  By joining, you agree to our <Link href="#" className="underline hover:text-slate-800 dark:hover:text-white">Terms of Service</Link> and <Link href="#" className="underline hover:text-slate-800 dark:hover:text-white">Privacy Policy</Link>.
                </p>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}
