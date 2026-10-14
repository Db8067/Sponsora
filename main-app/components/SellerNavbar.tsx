'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, LayoutDashboard } from 'lucide-react';

import { useUser, UserButton } from "@clerk/nextjs";

export default function SellerNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const [brandInfo, setBrandInfo] = useState<{ brand_name: string; slug: string; dashboard_url?: string } | null>(null);

  useEffect(() => {
    if (!isSignedIn || !user) {
      setBrandInfo(null);
      return;
    }
    const email = user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress;
    if (!email) return;

    fetch(`/api/brand/check-status?email=${encodeURIComponent(email)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.registered && data?.brand?.brand_name) {
          setBrandInfo({
            brand_name: data.brand.brand_name,
            slug: data.brand.slug || '',
            dashboard_url: data.dashboard_url || `/brand-subscriptions?brand=${data.brand.slug}`,
          });
        }
      })
      .catch(() => {});
  }, [isSignedIn, user]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-slate-900 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <img src="/images/logo-light.png" alt="GrahakSetu Logo" className="h-12 sm:h-14 md:h-[4.5rem] w-auto dark:hidden block object-contain" />
            <img src="/images/logo-dark.png" alt="GrahakSetu Logo" className="h-12 sm:h-14 md:h-[4.5rem] w-auto hidden dark:block object-contain" />
          </Link>
        </div>
        
        <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          <Link href="/brand-register" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors whitespace-nowrap">
            Brand Register
          </Link>
          <Link href="/sell-online" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors whitespace-nowrap">
            Sell online
          </Link>
          
          <Link href="/subscriptions" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors whitespace-nowrap">
            Subscriptions
          </Link>

          <Link href="/Online-Mentorship" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors whitespace-nowrap">
            Mentorship
          </Link>

          <Link href="/marketplace" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors whitespace-nowrap">
            Marketplace
          </Link>

          <span className="text-sm font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap cursor-not-allowed" title="Soon to be added">
            Creator program <span className="text-[10px] font-bold bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400 px-1.5 py-0.5 rounded-md ml-1 shadow-sm border border-pink-200 dark:border-pink-800">Soon</span>
          </span>
          
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          {brandInfo && (
            <Link
              href={brandInfo.dashboard_url || `/brand-subscriptions?brand=${brandInfo.slug}`}
              className="text-xs font-black text-primary bg-primary/10 hover:bg-primary hover:text-white px-3 py-1.5 rounded-full border border-primary/20 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{brandInfo.brand_name} Dashboard</span>
            </Link>
          )}

          {!isLoaded ? (
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse" />
          ) : isSignedIn ? (
            <UserButton />
          ) : (
            <Link href="/sign-in" className="text-sm font-semibold text-slate-700 hover:text-pink-600 dark:text-slate-200 transition-colors">
              Login
            </Link>
          )}
          <Link href="/brand-register" className="text-sm font-semibold bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
            Get Customers
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          {!isLoaded ? (
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse mr-2" />
          ) : isSignedIn ? (
            <div className="mr-2">
              <UserButton />
            </div>
          ) : (
            <Link href="/sign-in" className="text-sm font-semibold border border-primary text-primary px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors mr-2">
              Login
            </Link>
          )}
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
              <img src="/images/logo-light.png" alt="GrahakSetu Logo" className="h-12 sm:h-14 md:h-[4.5rem] w-auto dark:hidden block object-contain" />
              <img src="/images/logo-dark.png" alt="GrahakSetu Logo" className="h-12 sm:h-14 md:h-[4.5rem] w-auto hidden dark:block object-contain" />
            </Link>
          </div>
          
          <div className="flex flex-col items-center justify-center flex-1 gap-8">
            {brandInfo && (
              <Link
                href={brandInfo.dashboard_url || `/brand-subscriptions?brand=${brandInfo.slug}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-black text-primary bg-primary/10 border border-primary/20 px-5 py-3 rounded-2xl flex items-center justify-center gap-2 w-full max-w-xs shadow-sm"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>{brandInfo.brand_name} Dashboard</span>
              </Link>
            )}

            <Link href="/brand-register" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors text-center">
              Brand Register
            </Link>
              
            <Link href="/sell-online" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors text-center">
              Sell online
            </Link>
            
            <Link href="/subscriptions" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors text-center">
              Subscriptions
            </Link>

            <Link href="/Online-Mentorship" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors text-center">
              Mentorship
            </Link>

            <Link href="/marketplace" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors text-center">
              Marketplace
            </Link>

            <span className="text-2xl font-bold text-slate-400 dark:text-slate-500 text-center flex flex-col items-center gap-1">
              Creator program
              <span className="text-[12px] font-bold bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400 px-2 py-0.5 rounded-md shadow-sm border border-pink-200 dark:border-pink-800 tracking-wider uppercase">Soon</span>
            </span>
            
            <div className="mt-8 w-full max-w-xs flex flex-col gap-4">
              <Link href="/brand-register" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center text-lg font-semibold bg-primary text-white px-6 py-4 rounded-2xl shadow-lg shadow-primary/30 active:scale-95 transition-all">
                Get Customers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
