'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function SellerRegistration() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Registration Submitted!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Your application is currently <span className="font-semibold text-yellow-600 dark:text-yellow-500">Pending Admin Approval</span>. 
            We will review your details and notify you via email within 24 hours.
          </p>
          <Link href="/seller">
            <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium py-3 rounded-xl transition-colors">
              Return to Seller Hub
            </button>
          </Link>
          <div className="mt-4">
            <Link href="/seller/dashboard">
              <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-xl transition-colors">
                [Mock] Go to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Link href="/seller" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>
      
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
        <h1 className="text-3xl font-bold mb-2">Register your business</h1>
        <p className="text-muted-foreground mb-8">Start selling your products to millions of customers.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Business Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Business Name *</label>
                <input required type="text" className="w-full h-11 px-4 rounded-xl border bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="E.g. XYZ Electronics" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">GSTIN (Optional)</label>
                <input type="text" className="w-full h-11 px-4 rounded-xl border bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="22AAAAA0000A1Z5" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Business Address *</label>
              <textarea required className="w-full h-24 p-4 rounded-xl border bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary outline-none transition-all resize-none" placeholder="Full address for pickup..."></textarea>
            </div>
          </div>
          
          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-semibold border-b pb-2">Contact Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name *</label>
                <input required type="text" className="w-full h-11 px-4 rounded-xl border bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number *</label>
                <input required type="tel" className="w-full h-11 px-4 rounded-xl border bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="+91 98765 43210" />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button type="submit" className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl hover:scale-[1.02] duration-300">
              Submit Registration
            </button>
            <p className="text-xs text-center text-muted-foreground mt-4">
              By submitting, you agree to BazaarX's Seller Terms & Conditions.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
