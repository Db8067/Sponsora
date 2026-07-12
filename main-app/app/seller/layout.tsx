'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Store, Menu, X } from 'lucide-react';

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-transparent">
      {/* Seller Navigation */}
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
            <Link href="/sign-in" className="text-sm font-semibold text-slate-700 hover:text-primary dark:text-slate-200 transition-colors">
              Login
            </Link>
            <Link href="/seller/register" className="text-sm font-semibold bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
              Start Selling
            </Link>
          </div>

          <button className="lg:hidden p-2 text-slate-600 dark:text-slate-300" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-100 shadow-xl py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
            <Link href="/seller/sell-online" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-slate-700 dark:text-slate-200 hover:text-primary">
              Sell online
            </Link>
            <Link href="/seller/how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-slate-700 dark:text-slate-200 hover:text-primary">
              How it works
            </Link>
            <Link href="/seller/pricing-and-commission" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-slate-700 dark:text-slate-200 hover:text-primary">
              Pricing and Commission
            </Link>
            <Link href="/seller/shipping-and-routes" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-slate-700 dark:text-slate-200 hover:text-primary">
              Shipping and routes
            </Link>
            <Link href="/seller/grow-business" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-slate-700 dark:text-slate-200 hover:text-primary">
              Grow Business
            </Link>
            <Link href="/seller/no-gst" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-slate-700 dark:text-slate-200 hover:text-primary">
              Don't have a GST?
            </Link>
            <hr className="border-slate-100 my-2" />
            <Link href="/sign-in" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-slate-700 dark:text-slate-200 hover:text-primary text-center">
              Login
            </Link>
            <Link href="/seller/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center text-sm font-semibold bg-primary text-white px-5 py-3 rounded-xl hover:bg-primary-dark transition-colors">
              Start Selling
            </Link>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main>
        {children}
      </main>
    </div>
  );
}
