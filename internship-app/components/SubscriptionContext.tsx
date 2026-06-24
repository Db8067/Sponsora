"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";

interface SubscriptionData {
  isPaid: boolean;
  isBanned: boolean;
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
  const [data, setData] = useState<Omit<SubscriptionData, "isLoading" | "refetch" | "isBanned" | "adminGrantedDays" | "adminGrantedLimits">>({
    isPaid: false,
    planType: null,
    validUntil: null,
    totalLimit: 0,
    usedLimit: 0,
  });
  const [isBanned, setIsBanned] = useState(false);
  const [adminGrantedDays, setAdminGrantedDays] = useState(0);
  const [adminGrantedLimits, setAdminGrantedLimits] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    if (!user?.id) {
      setData({ isPaid: false, planType: null, validUntil: null, totalLimit: 0, usedLimit: 0 });
      setIsBanned(false);
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/subscription/status", {
        headers: { "x-user-id": user.id },
      });
      const json = await res.json();
      
      setIsBanned(json.isBanned ?? false);
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
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-600 mb-4 border-4 border-red-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>
          </div>
          <h1 className="text-2xl font-black text-gray-900">Account Restricted</h1>
          <p className="text-gray-500 font-medium">Your account has been temporarily restricted by the administrator. Please contact support if you believe this is a mistake.</p>
        </div>
      </div>
    );
  }

  return (
    <SubscriptionContext.Provider value={{ ...data, isBanned, adminGrantedDays, adminGrantedLimits, isLoading, refetch: fetchStatus }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export const useSubscription = () => useContext(SubscriptionContext);
