import React from 'react';
import Link from 'next/link';
import { Store, UserCircle } from 'lucide-react';

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-xs font-bold uppercase ml-2 dark:bg-blue-900/50 dark:text-blue-400">
              Seller Hub
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <Link href="/seller/sell-online" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors">
              Sell online
            </Link>
            <Link href="/seller/how-it-works" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors">
              How it works
            </Link>
            <Link href="/seller/pricing-and-commission" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors">
              Pricing and Commission
            </Link>
            <Link href="/seller/shipping-and-routes" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors">
              Shipping and routes
            </Link>
            <Link href="/seller/grow-business" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors">
              Grow Business
            </Link>
            <Link href="/seller/no-gst" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors">
              Don't have a GST?
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-sm font-semibold text-slate-700 hover:text-primary dark:text-slate-200 transition-colors">
              Login
            </Link>
            <Link href="/seller/register" className="text-sm font-semibold bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
              Start Selling
            </Link>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main>
        {children}
      </main>
    </div>
  );
}
