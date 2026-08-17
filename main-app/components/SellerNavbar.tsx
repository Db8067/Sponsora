'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function SellerNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-slate-900 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <img src="/images/logo-light.png" alt="Sponsora Logo" className="h-6 md:h-8 w-auto dark:hidden block" />
            <img src="/images/logo-dark.png" alt="Sponsora Logo" className="h-6 md:h-8 w-auto hidden dark:block" />
          </Link>
        </div>
        
        <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          <Link href="/seller/sell-online" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors whitespace-nowrap">
            Sell online
          </Link>
          <Link href="/seller/how-it-works" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors whitespace-nowrap">
            How it works
          </Link>
          <Link href="/seller/pricing-and-commission" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors whitespace-nowrap">
            Pricing and Commission
          </Link>
          <Link href="/seller/shipping-and-routes" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors whitespace-nowrap">
            Shipping and routes
          </Link>
          <Link href="/seller/grow-business" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors whitespace-nowrap">
            Grow Business
          </Link>
          <Link href="/seller/no-gst" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors whitespace-nowrap">
            Don't have a GST?
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link href="/sign-in" className="text-sm font-semibold text-slate-700 hover:text-pink-600 dark:text-slate-200 transition-colors">
            Login
          </Link>
          <Link href="/seller/register" className="text-sm font-semibold bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
            Start Selling
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <Link href="/sign-in" className="text-sm font-semibold border border-primary text-primary px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors mr-2">
            Login
          </Link>
          <button className="p-2 text-slate-600 dark:text-slate-300 relative z-50 overflow-hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <div className={`transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90 opacity-0 absolute' : 'rotate-0 opacity-100'}`}>
              <Menu className="w-6 h-6" />
            </div>
            <div className={`transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0 absolute'}`}>
              <X className="w-6 h-6" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 z-40 bg-white dark:bg-slate-900 transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-12">
            <Link href="/" className="flex items-center">
              <img src="/images/logo-light.png" alt="Sponsora Logo" className="h-6 w-auto dark:hidden block" />
              <img src="/images/logo-dark.png" alt="Sponsora Logo" className="h-6 w-auto hidden dark:block" />
            </Link>
          </div>
          
          <div className="flex flex-col items-center justify-center flex-1 gap-8">
            <Link href="/seller/sell-online" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors text-center">
              Sell online
            </Link>
            <Link href="/seller/how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors text-center">
              How it works
            </Link>
            <Link href="/seller/pricing-and-commission" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors text-center">
              Pricing & Commission
            </Link>
            <Link href="/seller/shipping-and-routes" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors text-center">
              Shipping & routes
            </Link>
            <Link href="/seller/grow-business" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors text-center">
              Grow Business
            </Link>
            <Link href="/seller/no-gst" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors text-center">
              Don't have a GST?
            </Link>
            
            <div className="mt-8 w-full max-w-xs flex flex-col gap-4">
              <Link href="/seller/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center text-lg font-semibold bg-primary text-white px-6 py-4 rounded-2xl shadow-lg shadow-primary/30 active:scale-95 transition-all">
                Start Selling Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
