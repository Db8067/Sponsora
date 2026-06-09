"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";

interface SubscriptionData {
  isPaid: boolean;
  planType: string | null;
  validUntil: string | null;
  totalLimit: number;
  usedLimit: number;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionData>({
  isPaid: false,
  planType: null,
  validUntil: null,
  totalLimit: 0,
  usedLimit: 0,
  isLoading: true,
  refetch: async () => {},
});

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [data, setData] = useState<Omit<SubscriptionData, "isLoading" | "refetch">>({
    isPaid: false,
    planType: null,
    validUntil: null,
    totalLimit: 0,
    usedLimit: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    if (!user?.id) {
      setData({ isPaid: false, planType: null, validUntil: null, totalLimit: 0, usedLimit: 0 });
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/subscription/status", {
        headers: { "x-user-id": user.id },
      });
      const json = await res.json();
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

  return (
    <SubscriptionContext.Provider value={{ ...data, isLoading, refetch: fetchStatus }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export const useSubscription = () => useContext(SubscriptionContext);
