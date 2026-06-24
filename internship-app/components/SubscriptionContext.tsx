"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useUser, useAuth } from "@clerk/nextjs";

interface SubscriptionData {
  isPaid: boolean;
  isBanned: boolean;
  isCancelled: boolean;
  adminGrantedDays: number;
  adminGrantedLimits: number;
  planType: string | null;
  validUntil: string | null;
  totalLimit: number;
  usedLimit: number;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionData>({
  isPaid: false,
  isBanned: false,
  isCancelled: false,
  adminGrantedDays: 0,
  adminGrantedLimits: 0,
  planType: null,
  validUntil: null,
  totalLimit: 0,
  usedLimit: 0,
  isLoading: true,
  refetch: async () => {},
});

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();
  const [data, setData] = useState<Omit<SubscriptionData, "isLoading" | "refetch" | "isBanned" | "isCancelled" | "adminGrantedDays" | "adminGrantedLimits">>({
    isPaid: false,
    planType: null,
    validUntil: null,
    totalLimit: 0,
    usedLimit: 0,
  });
  const [isBanned, setIsBanned] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [adminGrantedDays, setAdminGrantedDays] = useState(0);
  const [adminGrantedLimits, setAdminGrantedLimits] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
      });
      const json = await res.json();
      
      setIsBanned(json.isBanned ?? false);
      setIsCancelled(json.isCancelled ?? false);
      setAdminGrantedDays(json.adminGrantedDays ?? 0);
      setAdminGrantedLimits(json.adminGrantedLimits ?? 0);

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

  if (isBanned) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50/50">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-red-100 shadow-xl text-center space-y-4">
          <img src="/account_blocked_doodle.png" alt="Blocked Doodle" className="w-48 h-48 mx-auto object-contain mb-2 drop-shadow-sm" />
          <h1 className="text-2xl font-black text-gray-900">Account Blocked</h1>
          <p className="text-gray-500 font-medium">Your account has been blocked by the administrator. Please wait for admin approval to use our website.</p>
          <button 
             onClick={() => signOut()} 
             className="w-full py-4 mt-6 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold transition-all shadow-[0_4px_14px_0_rgb(220,38,38,0.39)]"
          >
             Change Account / Sign Out
          </button>
        </div>
      </div>
    );
  }

  if (isCancelled) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50/50">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-orange-100 shadow-xl text-center space-y-4">
          <img src="/sub_cancelled_doodle.png" alt="Cancelled Doodle" className="w-48 h-48 mx-auto object-contain mb-2 drop-shadow-sm" />
          <h1 className="text-2xl font-black text-gray-900">Subscription Cancelled</h1>
          <p className="text-gray-500 font-medium">Your subscription has been explicitly cancelled by the administrator. Please contact the admin for more information.</p>
          <button 
             onClick={() => signOut()} 
             className="w-full py-4 mt-6 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold transition-all shadow-[0_4px_14px_0_rgb(234,88,12,0.39)]"
          >
             Change Account / Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <SubscriptionContext.Provider value={{ ...data, isBanned, isCancelled, adminGrantedDays, adminGrantedLimits, isLoading, refetch: fetchStatus }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export const useSubscription = () => useContext(SubscriptionContext);
