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
          
          <nav className="flex items-center gap-6">
            <Link href="/seller" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300">
              Overview
            </Link>
            <Link href="/seller/dashboard" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300">
              Dashboard
            </Link>
            <div className="flex items-center gap-2 pl-4 border-l">
              <UserCircle className="w-6 h-6 text-slate-400" />
            </div>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main>
        {children}
      </main>
    </div>
  );
}
