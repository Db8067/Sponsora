import React from 'react';
import Snowfall from '@/components/Snowfall';
import Link from 'next/link';

export default function AdminLayout({ children, user }: { children: React.ReactNode, user: any }) {
  return (
    <div className="antialiased relative min-h-screen">
      <Snowfall />
      
      <div className="relative z-10">
        <aside className="fixed left-0 top-0 h-full w-72 bg-white/80 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between border-r border-pink-100">
          <div className="flex flex-col">
            <Link href="/" className="py-4 px-6 flex items-center gap-2 bg-white/50 border-b border-pink-50" aria-label="Go to landing page">
              <img alt="GrahakSetu Logo" className="h-12 sm:h-14 md:h-[4.5rem] w-auto object-contain" src="/images/logo-light.png" />
            </Link>
            <div className="px-4 pt-4">
              <span className="px-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Platform Ops</span>
              <nav className="flex flex-col gap-1">
                <Link className="flex items-center justify-between px-4 py-2 rounded-lg text-slate-600 hover:bg-pink-50 hover:text-slate-900 transition-colors" href="/admin">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">grid_view</span>
                    <span className="text-sm">Overview & Metrics</span>
                  </div>
                </Link>
                <Link className="flex items-center justify-between px-4 py-2 rounded-lg text-slate-600 hover:bg-pink-50 hover:text-slate-900 transition-colors" href="/admin-brandform">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                    <span className="text-sm">Brand Approvals (Realtime)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">New</span>
                </Link>
                <Link className="flex items-center justify-between px-4 py-2 rounded-lg text-slate-600 hover:bg-pink-50 hover:text-slate-900 transition-colors" href="/admin-users">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">group</span>
                    <span className="text-sm">Users & Activity</span>
                  </div>
                </Link>
              </nav>
            </div>
          </div>
          <div className="p-4 m-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">System Status</span>
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            </div>
            <p className="text-xs text-slate-500">All services operational</p>
          </div>
        </aside>

        <div className="pl-72">
          <header className="fixed top-0 left-72 right-0 h-16 bg-white/60 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 px-6 flex items-center justify-between border-b border-pink-50">
            <div className="flex items-center gap-4">
              <div className="relative flex items-center w-80">
                <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[18px]">search</span>
                <input className="w-full h-10 pl-9 pr-4 rounded-lg bg-slate-100/50 text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500" placeholder="Search brands, users..." type="text" />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-100">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] uppercase font-bold tracking-wider">Live Operations</span>
              </div>
              <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                <div className="flex flex-col text-right">
                  <span className="text-sm text-slate-800 font-bold leading-tight">{user?.firstName || 'Admin'} {user?.lastName || ''}</span>
                  <span className="text-xs text-slate-500">Platform Admin</span>
                </div>
                <img src={user?.imageUrl || ''} alt="avatar" className="w-8 h-8 rounded-full border border-pink-200" />
              </div>
            </div>
          </header>

          <main className="relative pt-16 w-full px-6 min-h-screen">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
