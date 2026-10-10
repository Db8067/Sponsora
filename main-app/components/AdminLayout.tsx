'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Snowfall from '@/components/Snowfall';

const NAV = [
  { href: '/admin', label: 'Overview & Metrics', icon: 'grid_view', match: (p: string) => p === '/admin' },
  { href: '/admin-brandform', label: 'Brand Approvals (Realtime)', icon: 'verified', badge: 'New', match: (p: string) => p.startsWith('/admin-brandform') },
  { href: '/admin-users', label: 'Users & Activity', icon: 'group', match: (p: string) => p.startsWith('/admin-users') },
];

type Props = { name?: string; imageUrl?: string; children: React.ReactNode };

export default function AdminLayout({ name, imageUrl, children }: Props) {
  const pathname = usePathname() || '';
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <div className="antialiased relative min-h-screen overflow-x-hidden">
      <Snowfall />

      <div className="relative z-10">
        {/* Mobile overlay */}
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        />

        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-0 h-full w-[18.5rem] max-w-[85vw] bg-white/90 lg:bg-white/80 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between border-r border-pink-100 transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex flex-col min-h-0">
            <div className="flex items-center justify-between bg-white/50 border-b border-pink-50 pr-3">
              <Link href="/" className="py-3 px-5 flex items-center" aria-label="Go to landing page">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="GrahakSetu Logo" className="h-12 sm:h-14 md:h-[4.5rem] w-auto object-contain" src="/images/logo-light.png" />
              </Link>
              <button onClick={() => setOpen(false)} className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-pink-50" aria-label="Close menu">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="px-4 pt-4 overflow-y-auto">
              <span className="px-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Platform Ops</span>
              <nav className="flex flex-col gap-1">
                {NAV.map((n) => {
                  const active = n.match(pathname);
                  return (
                    <Link
                      key={n.href}
                      href={n.href}
                      className={`flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg transition-colors ${active ? 'bg-pink-50 text-pink-700 font-bold' : 'text-slate-600 hover:bg-pink-50 hover:text-slate-900'}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="material-symbols-outlined text-[20px] shrink-0">{n.icon}</span>
                        <span className="text-sm">{n.label}</span>
                      </div>
                      {n.badge && <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold shrink-0">{n.badge}</span>}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
          <div className="p-4 m-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">System Status</span>
              <span className="w-2 h-2 rounded-full bg-green-500" />
            </div>
            <p className="text-xs text-slate-500">All services operational</p>
          </div>
        </aside>

        <div className="lg:pl-[18.5rem]">
          {/* Top bar */}
          <header className="fixed top-0 left-0 lg:left-[18.5rem] right-0 h-16 bg-white/70 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-30 px-3 sm:px-6 flex items-center justify-between gap-3 border-b border-pink-50">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <button onClick={() => setOpen(true)} className="lg:hidden p-2 -ml-1 rounded-lg text-slate-700 hover:bg-pink-50" aria-label="Open menu">
                <span className="material-symbols-outlined">menu</span>
              </button>
              <Link href="/" className="lg:hidden shrink-0" aria-label="Go to landing page">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="GrahakSetu" className="h-9 w-auto object-contain" src="/images/logo-light.png" />
              </Link>
              <div className="relative hidden md:flex items-center w-64 xl:w-80">
                <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[18px]">search</span>
                <input className="w-full h-10 pl-9 pr-4 rounded-lg bg-slate-100/60 text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500" placeholder="Search brands, users..." type="text" />
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-6 shrink-0">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-100">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-wider">Live Operations</span>
              </div>
              <div className="flex items-center gap-3 sm:pl-3 sm:border-l sm:border-slate-200">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-sm text-slate-800 font-bold leading-tight">{name || 'Admin'}</span>
                  <span className="text-xs text-slate-500">Platform Admin</span>
                </div>
                {imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imageUrl} alt="avatar" className="w-8 h-8 rounded-full border border-pink-200" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center text-sm font-bold">{(name || 'A')[0]}</div>
                )}
              </div>
            </div>
          </header>

          <main className="relative pt-16 w-full px-3 sm:px-6 min-h-screen">{children}</main>
        </div>
      </div>
    </div>
  );
}
