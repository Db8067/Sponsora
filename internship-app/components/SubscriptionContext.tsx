"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { ShieldCheck, Loader2, RefreshCw, X, LogOut, Send } from "lucide-react";

interface SubscriptionData {
  isPaid: boolean;
  planType: string | null;
  validUntil: string | null;
  applyLimitPerDay: number;
  appliesToday: number;
  isLoading: boolean;
  errorType: string | null;
  refetch: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionData>({
  isPaid: false,
  planType: null,
  validUntil: null,
  applyLimitPerDay: 0,
  appliesToday: 0,
  isLoading: true,
  errorType: null,
  refetch: async () => {},
});

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [data, setData] = useState<Omit<SubscriptionData, "isLoading" | "refetch" | "errorType">>({
    isPaid: false,
    planType: null,
    validUntil: null,
    applyLimitPerDay: 0,
    appliesToday: 0,
  });
  const [errorType, setErrorType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // For device list on lock screen
  const [devices, setDevices] = useState<any[]>([]);
  const [loadingDevices, setLoadingDevices] = useState(false);
  const [terminatingId, setTerminatingId] = useState<string | null>(null);

  // For support message on suspension screen
  const [supportMsg, setSupportMsg] = useState("");
  const [supportSent, setSupportSent] = useState(false);
  const [sendingSupport, setSendingSupport] = useState(false);

  const fetchStatus = useCallback(async () => {
    if (!user?.id) {
      setData({ isPaid: false, planType: null, validUntil: null, applyLimitPerDay: 0, appliesToday: 0 });
      setErrorType(null);
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/subscription/status", {
        headers: { "x-user-id": user.id },
      });
      const json = await res.json();
      if (json.errorType) {
        setErrorType(json.errorType);
        setData({ isPaid: false, planType: null, validUntil: null, applyLimitPerDay: 0, appliesToday: 0 });
      } else {
        setErrorType(null);
        setData({
          isPaid: json.isPaid ?? false,
          planType: json.planType ?? null,
          validUntil: json.validUntil ?? null,
          applyLimitPerDay: json.applyLimitPerDay ?? 0,
          appliesToday: json.appliesToday ?? 0,
        });
      }
    } catch (e) {
      setData({ isPaid: false, planType: null, validUntil: null, applyLimitPerDay: 0, appliesToday: 0 });
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (isLoaded) {
      fetchStatus();
    }
  }, [isLoaded, fetchStatus]);

  // Fetch active sessions if device limit exceeded
  const fetchDevices = useCallback(async () => {
    if (errorType !== "max_devices_exceeded" || !user?.id) return;
    setLoadingDevices(true);
    try {
      const res = await fetch("/api/subscription/device-sessions", {
        headers: { "x-user-id": user.id },
      });
      const json = await res.json();
      setDevices(json.sessions || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingDevices(false);
    }
  }, [errorType, user?.id]);

  useEffect(() => {
    if (errorType === "max_devices_exceeded") {
      fetchDevices();
    }
  }, [errorType, fetchDevices]);

  const handleTerminateSession = async (deviceId: string) => {
    if (!user?.id) return;
    setTerminatingId(deviceId);
    try {
      await fetch("/api/subscription/device-sessions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "x-user-id": user.id },
        body: JSON.stringify({ deviceId }),
      });
      await fetchDevices();
    } catch (e) {
      console.error(e);
    } finally {
      setTerminatingId(null);
    }
  };

  const handleSendSupport = async () => {
    if (!supportMsg.trim() || !user?.id) return;
    setSendingSupport(true);
    try {
      // Save feedback
      await fetch("/api/subscription/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-id": user.id },
        body: JSON.stringify({ feedbackText: supportMsg }),
      });
      setSupportSent(true);
    } catch (e) {
      console.error(e);
    } finally {
      setSendingSupport(false);
    }
  };

  const renderOverlay = () => {
    if (errorType === "vpn_detected") {
      return (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl px-6 text-center select-none">
          <img src="/images/restricted_area.png" alt="Restricted Area" className="w-56 h-56 object-contain mb-6" />
          <h2 className="text-2xl font-black text-foreground mb-2">VPN or Proxy Detected! 🛡️</h2>
          <p className="text-foreground/60 max-w-sm leading-relaxed mb-6">
            We noticed you are using a VPN or Proxy service. To ensure the integrity of our platform and prevent scrapers, VPN access is restricted.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-full hover:shadow-lg transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
        </div>
      );
    }

    if (errorType === "max_devices_exceeded") {
      return (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl px-6 py-10 text-center overflow-y-auto">
          <img src="/images/restricted_area.png" alt="Device Limit" className="w-44 h-44 object-contain mb-4" />
          <h2 className="text-2xl font-black text-foreground mb-2">Device Limit Reached! 📱</h2>
          <p className="text-foreground/60 max-w-md leading-relaxed mb-6">
            Your Sponsora pass allows active access from up to **2 devices** at a time. Please terminate one of your other active sessions to continue.
          </p>

          <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-4 text-left mb-6">
            <h3 className="text-sm font-bold text-foreground/80 mb-3">Active Device Sessions:</h3>
            {loadingDevices ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {devices.map((d) => (
                  <div key={d.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs">
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-foreground truncate">{d.browser_info || "Unknown Browser"}</p>
                      <p className="text-foreground/50 mt-0.5">{d.ip_address} · {d.city || "Unknown City"}</p>
                    </div>
                    {d.isCurrent ? (
                      <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 font-bold shrink-0">Current</span>
                    ) : (
                      <button
                        onClick={() => handleTerminateSession(d.device_id)}
                        disabled={terminatingId === d.device_id}
                        className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 font-bold transition-all flex items-center gap-1 shrink-0"
                      >
                        {terminatingId === d.device_id ? <Loader2 className="w-3 h-3 animate-spin" /> : <LogOut className="w-3 h-3" />}
                        Deactivate
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={fetchStatus}
            className="px-8 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-full hover:shadow-lg transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> I've cleared a session, Try Again
          </button>
        </div>
      );
    }

    if (errorType === "account_sharing_suspended") {
      return (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl px-6 text-center select-none overflow-y-auto py-10">
          <img src="/images/restricted_area.png" alt="Suspended" className="w-48 h-48 object-contain mb-4" />
          <h2 className="text-2xl font-black text-foreground mb-2">Account Temporarily Locked! 🚫</h2>
          <p className="text-foreground/60 max-w-md leading-relaxed mb-6">
            Our system detected simultaneous access to your account from different locations (different cities), which violates our fair use policy.
          </p>

          <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-5 text-left mb-6">
            <h3 className="text-sm font-bold text-foreground/80 mb-2">Request Account Review:</h3>
            <p className="text-xs text-foreground/50 mb-3">Provide details if this was a mistake (e.g. you were traveling) to request manual activation.</p>
            {supportSent ? (
              <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-semibold rounded-xl text-center">
                ✓ Message sent successfully! Sponsora Admin will review and reply within 12 hours.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <textarea
                  rows={3}
                  placeholder="Explain details here..."
                  value={supportMsg}
                  onChange={(e) => setSupportMsg(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-white dark:bg-black/20 border border-white/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-foreground resize-none"
                />
                <button
                  onClick={handleSendSupport}
                  disabled={sendingSupport || !supportMsg.trim()}
                  className="w-full py-2.5 bg-primary text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-primary-dark transition-all disabled:opacity-50"
                >
                  {sendingSupport ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Submit Request
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <SubscriptionContext.Provider value={{ ...data, errorType, isLoading, refetch: fetchStatus }}>
      {renderOverlay()}
      {children}
    </SubscriptionContext.Provider>
  );
}

export const useSubscription = () => useContext(SubscriptionContext);
