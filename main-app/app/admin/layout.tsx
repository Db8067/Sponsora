import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, ShoppingBag, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex fixed h-screen">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <img src="/images/logo-dark.png" alt="Sponsora Logo" className="h-6 md:h-8 w-auto" />
            <span className="text-xs bg-red-600 px-2 py-0.5 rounded-full uppercase text-white font-bold">Admin</span>
          </Link>
          
          <nav className="space-y-1">
            <Link href="/admin" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
              <LayoutDashboard className="w-5 h-5" /> Dashboard Overview
            </Link>
            <Link href="/admin/vendors" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
              <Users className="w-5 h-5" /> Vendor Approvals
            </Link>
            <Link href="/admin/content" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
              <ShoppingBag className="w-5 h-5" /> Content Review
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
              <Settings className="w-5 h-5" /> Platform Settings
            </Link>
          </nav>
        </div>
        
        <div className="mt-auto p-6">
          <button className="flex items-center gap-3 px-3 py-3 w-full rounded-lg hover:bg-slate-800 hover:text-white transition-colors text-left text-slate-400">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
