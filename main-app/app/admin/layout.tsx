'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, ShoppingBag, Settings, LogOut, Globe, Menu, X } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-transparent relative">
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/10 dark:bg-black/20 backdrop-blur-md border-b border-white/20 dark:border-white/10 flex items-center justify-between px-4 z-50">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo-dark.png" alt="Sponsora Logo" className="h-6 w-auto" />
          <span className="text-[10px] bg-red-600 px-2 py-0.5 rounded-full uppercase text-white font-bold">Admin</span>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-foreground">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Admin Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-xl border-r border-white/10 text-slate-300 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 pt-20 md:pt-6">
          <Link href="/" className="hidden md:flex items-center gap-2 mb-8">
            <img src="/images/logo-dark.png" alt="Sponsora Logo" className="h-6 md:h-8 w-auto" />
            <span className="text-xs bg-red-600 px-2 py-0.5 rounded-full uppercase text-white font-bold">Admin</span>
          </Link>
          
          <nav className="space-y-1">
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/admin" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors">
              <LayoutDashboard className="w-5 h-5" /> Dashboard Overview
            </Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/admin/vendors" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors">
              <Users className="w-5 h-5" /> Vendor Approvals
            </Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/admin/content" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors">
              <ShoppingBag className="w-5 h-5" /> Content Review
            </Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/admin/landing-page" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors">
              <Globe className="w-5 h-5" /> Landing Page
            </Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/admin/settings" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-colors">
              <Settings className="w-5 h-5" /> Platform Settings
            </Link>
          </nav>
        </div>
        
        <div className="mt-auto p-6">
          <button className="flex items-center gap-3 px-3 py-3 w-full rounded-lg hover:bg-white/10 hover:text-white transition-colors text-left text-slate-400">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pt-20 md:pt-8 p-4 md:p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}
