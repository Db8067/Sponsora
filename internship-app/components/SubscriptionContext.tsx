"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface SubscriptionData {
  isPaid: boolean;
  isBanned: boolean;
  isCancelled: boolean;
  adminGrantedDays: number;
  adminGrantedLimits: number;
  systemLimits: number;
  planType: string | null;
  validUntil: string | null;
  totalLimit: number;
  usedLimit: number;
  blockedReason: string | null;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionData>({
  isPaid: false,
  isBanned: false,
  isCancelled: false,
  adminGrantedDays: 0,
  adminGrantedLimits: 0,
  systemLimits: 0,
  planType: null,
  validUntil: null,
  totalLimit: 0,
  usedLimit: 0,
  blockedReason: null,
  isLoading: true,
  refetch: async () => {},
});

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();
  const [data, setData] = useState<Omit<SubscriptionData, "isLoading" | "refetch" | "isBanned" | "isCancelled" | "adminGrantedDays" | "adminGrantedLimits" | "systemLimits" | "blockedReason">>({
    isPaid: false,
    planType: null,
    validUntil: null,
    totalLimit: 0,
    usedLimit: 0,
  });
  const [isBanned, setIsBanned] = useState(false);
  const [blockedReason, setBlockedReason] = useState<string | null>(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [adminGrantedDays, setAdminGrantedDays] = useState(0);
  const [adminGrantedLimits, setAdminGrantedLimits] = useState(0);
  const [systemLimits, setSystemLimits] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCancelPopup, setShowCancelPopup] = useState(true);

  const prevAdminGrantedLimitsRef = useRef(0);
  const prevAdminGrantedDaysRef = useRef(0);
  const hasInitiallyLoaded = useRef(false);

  const pathname = usePathname();

  const fetchStatus = useCallback(async () => {
    if (!user?.id) {
      setData({ isPaid: false, planType: null, validUntil: null, totalLimit: 0, usedLimit: 0 });
      setIsBanned(false);
      setIsCancelled(false);
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/subscription/status", {
        headers: { "x-user-id": user.id },
        cache: 'no-store',
      });
      const json = await res.json();

      if (hasInitiallyLoaded.current) {
        if ((json.adminGrantedLimits ?? 0) > prevAdminGrantedLimitsRef.current) {
          setToastMessage("Admin has increased your application limits!");
          setTimeout(() => setToastMessage(null), 6000);
        }
        if ((json.adminGrantedDays ?? 0) > prevAdminGrantedDaysRef.current) {
          setToastMessage("Admin has extended your subscription!");
          setTimeout(() => setToastMessage(null), 6000);
        }
      }

      prevAdminGrantedLimitsRef.current = json.adminGrantedLimits ?? 0;
      prevAdminGrantedDaysRef.current = json.adminGrantedDays ?? 0;
      hasInitiallyLoaded.current = true;

      setIsBanned(json.isBanned ?? false);
      setBlockedReason(json.blockedReason ?? null);
      setIsCancelled(json.isCancelled ?? false);
      setAdminGrantedDays(json.adminGrantedDays ?? 0);
      setAdminGrantedLimits(json.adminGrantedLimits ?? 0);
      setSystemLimits(json.systemLimits ?? 0);

      setData({
        isPaid: json.isPaid ?? false,
        planType: json.planType ?? null,
        validUntil: json.validUntil ?? null,
        totalLimit: json.totalLimit ?? 0,
        usedLimit: json.usedLimit ?? 0,
      });
    } catch (e) {
      setData({ isPaid: false, planType: null, validUntil: null, totalLimit: 0, usedLimit: 0 });
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (isLoaded) {
      fetchStatus();
    }
  }, [isLoaded, fetchStatus]);

  // REALTIME: Listen to user_subscriptions, payments, and block_logs
  useEffect(() => {
    if (!user?.id) return;

    const subChannel = supabase
      .channel(`sub-changes-${user.id}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_subscriptions',
        filter: `user_id=eq.${user.id}`,
      }, () => { fetchStatus(); })
      .subscribe();

    const paymentsChannel = supabase
      .channel(`payments-changes-${user.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'payments',
        filter: `user_id=eq.${user.id}`,
      }, () => { fetchStatus(); })
      .subscribe();

    const blockChannel = supabase
      .channel(`block-changes-${user.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'block_logs',
        filter: `user_id=eq.${user.id}`,
      }, () => { fetchStatus(); })
      .subscribe();

    return () => {
      supabase.removeChannel(subChannel);
      supabase.removeChannel(paymentsChannel);
      supabase.removeChannel(blockChannel);
    };
  }, [user?.id, fetchStatus]);

  // POLLING FALLBACK: every 30 seconds
  useEffect(() => {
    if (!user?.id) return;
    const intervalId = setInterval(() => { fetchStatus(); }, 30000);
    return () => clearInterval(intervalId);
  }, [user?.id, fetchStatus]);

  if (isBanned && !pathname.startsWith('/profile') && !pathname.startsWith('/chat')) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-red-100 shadow-2xl text-center space-y-4 max-h-[90vh] overflow-y-auto">
          <img src="/account_blocked_doodle.png" alt="Blocked Doodle" className="w-48 h-48 mx-auto object-contain mb-2 drop-shadow-sm" />
          <h1 className="text-2xl font-black text-gray-900">Account Blocked</h1>
          <p className="text-gray-500 font-medium">Your account has been blocked by the administrator. Please contact support.</p>
          {blockedReason && (
             <div className="p-3 bg-red-50 text-red-700 text-sm font-bold rounded-xl border border-red-100">
               Reason: {blockedReason}
             </div>
          )}
          <div className="space-y-3 pt-4">
             <Link href="/profile" className="block w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-2xl font-bold transition-all text-center">
                Visit Profile &amp; Settings
             </Link>
             <Link href="/chat" className="block w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold transition-all text-center shadow-[0_4px_14px_0_rgb(5,150,105,0.39)]">
                Chat with Admin
             </Link>
             <button
                onClick={() => signOut({ redirectUrl: '/sign-in' })}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold transition-all shadow-[0_4px_14px_0_rgb(220,38,38,0.39)]"
             >
                Sign in with a different account
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SubscriptionContext.Provider value={{ ...data, isBanned, blockedReason, isCancelled, adminGrantedDays, adminGrantedLimits, systemLimits, isLoading, refetch: fetchStatus }}>
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000] bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold flex items-center gap-3 animate-in slide-in-from-top-4 fade-in">
          <span>{toastMessage}</span>
        </div>
      )}
      
      {isCancelled && showCancelPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl text-center space-y-4 relative animate-in zoom-in-95">
            <button 
              onClick={() => setShowCancelPopup(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <img src="/sub_cancelled_doodle.png" alt="Cancelled Doodle" className="w-32 h-32 md:w-48 md:h-48 mx-auto object-contain mb-2 drop-shadow-sm" />
            <h1 className="text-xl md:text-2xl font-black text-gray-900">Subscription Cancelled</h1>
            <p className="text-gray-500 font-medium text-sm md:text-base">Your subscription has been explicitly cancelled by the administrator. You will not be able to unlock any internships until you purchase a new pass.</p>
            
            <div className="space-y-3 pt-4">
              <Link href="/subscribe" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl font-bold transition-all text-center shadow-[0_4px_14px_0_rgb(234,88,12,0.39)]">
                 Purchase New Subscription
              </Link>
              <Link href="/chat" className="block w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold transition-all text-center shadow-[0_4px_14px_0_rgb(5,150,105,0.39)]">
                 Chat with Admin
              </Link>
              <button
                 onClick={() => signOut({ redirectUrl: '/sign-in' })}
                 className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-2xl font-bold transition-all"
              >
                 Change Account / Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {children}
    </SubscriptionContext.Provider>
  );
}

export const useSubscription = () => useContext(SubscriptionContext);
