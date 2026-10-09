'use client';
import React, { useEffect, useState } from 'react';
import { useUser, RedirectToSignIn } from '@clerk/nextjs';
import Snowfall from '@/components/Snowfall';

export default function AdminPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const email = user.primaryEmailAddress?.emailAddress;
      if (email === 'devanshb3456@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><p>Loading...</p></div>;
  if (!isSignedIn) return <RedirectToSignIn />;
  if (isAdmin === false) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><h1 className="text-2xl font-bold text-red-500">Access Denied. You are not an admin.</h1></div>;
  if (isAdmin === null) return null;

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased relative min-h-screen">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Snowfall />
      </div>
      
      {/* Admin UI Content (Converted from HTML) */}
      <div className="relative z-10">
        <aside className="fixed left-0 top-0 h-full w-72 bg-white/80 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between border-r border-pink-100">
          <div className="flex flex-col">
            <div className="h-16 px-6 flex items-center gap-3 bg-white/50 border-b border-pink-50">
              <img alt="BrandGrahak Logo" className="h-8 w-auto object-contain" src="/images/logo-light.png" />
              <div className="flex flex-col">
                <span className="font-bold text-slate-800 leading-none tracking-tight">GrahakSetu</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Admin Control</span>
              </div>
            </div>
            <div className="px-4 pt-4">
              <span className="px-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Platform Ops</span>
              <nav className="flex flex-col gap-1">
                <a className="flex items-center justify-between px-4 py-2 rounded-lg text-slate-600 hover:bg-pink-50 hover:text-slate-900 transition-colors bg-pink-50/50 text-pink-700 font-bold" href="/admin">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">grid_view</span>
                    <span className="text-sm">Overview & Metrics</span>
                  </div>
                </a>
                <a className="flex items-center justify-between px-4 py-2 rounded-lg text-slate-600 hover:bg-pink-50 hover:text-slate-900 transition-colors" href="/admin-brandform">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                    <span className="text-sm">Brand Approvals (Realtime)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">New</span>
                </a>
                <a className="flex items-center justify-between px-4 py-2 rounded-lg text-slate-600 hover:bg-pink-50 hover:text-slate-900 transition-colors" href="/admin-users">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">group</span>
                    <span className="text-sm">Users & Activity</span>
                  </div>
                </a>
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
                  <span className="text-sm text-slate-800 font-bold leading-tight">Devansh Bhardwaj</span>
                  <span className="text-xs text-slate-500">Platform Admin</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold">
                  D
                </div>
              </div>
            </div>
          </header>

          <main className="relative pt-16 w-full px-6 min-h-screen">
            <div className="flex flex-col w-full pb-12 pt-6">
              <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-10">
                <div className="flex flex-col gap-2 max-w-3xl">
                  <h1 className="text-3xl text-slate-900 font-extrabold tracking-tight">Platform Operations & Growth Center</h1>
                  <p className="text-slate-500 leading-relaxed">
                    Real-time telemetry across all GrahakSetu brands and users.
                  </p>
                </div>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-pink-100 flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Total Users</span>
                      <h2 className="text-2xl text-slate-800 font-extrabold tracking-tight">1,248</h2>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600">
                      <span className="material-symbols-outlined text-[22px]">group</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div className="bg-pink-500 h-full rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-pink-100 flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Active Brands</span>
                      <h2 className="text-2xl text-slate-800 font-extrabold tracking-tight">142</h2>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                      <span className="material-symbols-outlined text-[22px]">storefront</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-pink-100">
                 <h2 className="text-lg text-slate-800 font-bold mb-4">Quick Links</h2>
                 <div className="flex gap-4">
                    <a href="/admin-brandform" className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-sm font-bold shadow-md transition-colors">View Brand Form Submissions</a>
                    <a href="/admin-users" className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-bold shadow-md transition-colors">View Registered Users</a>
                 </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
