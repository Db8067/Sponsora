'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useClerk, useUser } from '@clerk/nextjs';
import {
  Settings,
  LogOut,
  Activity,
  Shield,
  User,
  Mail,
  ArrowRight,
  Database,
  Cloud,
  CheckCircle2,
  Lock,
  Loader2,
} from 'lucide-react';

export default function SettingClient({
  adminName,
  adminImage,
}: {
  adminName: string;
  adminImage?: string;
}) {
  const { signOut } = useClerk();
  const { user } = useUser();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut({ redirectUrl: '/admin' });
    } catch {
      window.location.href = '/admin';
    }
  };

  const email = user?.primaryEmailAddress?.emailAddress || 'devanshb3456@gmail.com';

  return (
    <div className="pt-5 sm:pt-6 pb-16 w-full space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider mb-2">
          <Settings className="w-3.5 h-3.5" /> Preferences &amp; Access
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Admin Settings &amp; Platform Controls
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Manage administrative credentials, system sessions, and inspect API connectivity health across your services.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Admin Identity & Logout */}
        <div className="lg:col-span-1 space-y-6">
          {/* Identity Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-pink-100 p-6 shadow-sm flex flex-col items-center text-center">
            <div className="relative mb-4">
              {adminImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={adminImage}
                  alt={adminName}
                  className="w-20 h-20 rounded-full border-2 border-pink-300 object-cover shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-pink-400 text-white flex items-center justify-center text-2xl font-black shadow-md">
                  {adminName[0] || 'A'}
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow-sm flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </span>
            </div>

            <h2 className="text-lg font-black text-slate-900 tracking-tight">{adminName}</h2>
            <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{email}</span>
            </div>

            <div className="mt-3 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-[11px] font-bold uppercase tracking-wider border border-pink-100">
              Super Admin · Full Privileges
            </div>

            <div className="w-full mt-6 pt-5 border-t border-pink-50 text-left space-y-2 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Auth Identity:</span>
                <span className="font-mono font-semibold">Clerk Session</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Access Level:</span>
                <span className="font-semibold text-emerald-600">Root Administrator</span>
              </div>
            </div>
          </div>

          {/* Logout Action Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-rose-100 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <LogOut className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Admin Sign Out</h3>
                <p className="text-xs text-slate-500">Terminate active platform session</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-5">
              Signing out will end your administrative privileges on this device. You will need to log back in to review brands or perform operations.
            </p>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loggingOut ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Signing Out…
                </>
              ) : (
                <>
                  <LogOut className="w-4 h-4" /> Sign Out from Admin Panel
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Platform Services & Configuration */}
        <div className="lg:col-span-2 space-y-6">

          {/* Platform Configuration Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-pink-100 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" /> Integrated Platform Services
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Database Engine</div>
                <div className="font-bold text-slate-900">Supabase PostgreSQL</div>
                <div className="text-slate-500 font-mono text-[11px] truncate">kquqeulykizlhnumouqc.supabase.co</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Media CDN</div>
                <div className="font-bold text-slate-900">Cloudinary Media Cloud</div>
                <div className="text-slate-500 font-mono text-[11px]">dph8s80s2 (Authenticated)</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Auth Engine</div>
                <div className="font-bold text-slate-900">Clerk Identity Provider</div>
                <div className="text-slate-500 font-mono text-[11px]">Admin Email: {email}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Code Repository</div>
                <div className="font-bold text-slate-900">GitHub</div>
                <div className="text-slate-500 font-mono text-[11px]">github.com/Db8067/Sponsora (main)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
