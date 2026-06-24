"use client";

import { useSubscription } from "./SubscriptionContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function formatTime(ms: number) {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function CountdownBanner() {
  const { isPaid, isBanned, planType, validUntil } = useSubscription();
  const router = useRouter();
  const pathname = usePathname();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [expired, setExpired] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!isPaid || !validUntil) return;

    const update = () => {
      const remaining = new Date(validUntil).getTime() - Date.now();
      if (remaining <= 0) {
        setTimeLeft(0);
        setExpired(true);
        return;
      }
      setTimeLeft(remaining);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [isPaid, validUntil]);

  // When expired while browsing, redirect after showing message
  // But NEVER redirect if user is banned — ban popup takes priority
  // Also DO NOT redirect if the user is already on the subscribe or checkout pages
  useEffect(() => {
    if (expired && !isBanned && pathname !== '/subscribe' && pathname !== '/checkout') {
      const timeout = setTimeout(() => {
        router.push("/subscribe?expired=true");
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [expired, isBanned, pathname, router]);

  // Only show for 1-day pass within 12 hours OR 7-day pass in last 2 hours
  const shouldShow = isPaid && validUntil && !expired && (() => {
    const remaining = new Date(validUntil).getTime() - Date.now();
    if (planType === "1_day") return remaining < 12 * 60 * 60 * 1000;
    if (planType === "7_day") return remaining < 2 * 60 * 60 * 1000;
    if (planType === "monthly") return remaining < 2 * 60 * 60 * 1000;
    return false;
  })();

  useEffect(() => {
    if (!shouldShow) return;
    
    // Show initially after 5 seconds
    const initialTimeout = setTimeout(() => setShowPopup(true), 5000);
    // Then every 30 minutes
    const interval = setInterval(() => setShowPopup(true), 30 * 60 * 1000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [shouldShow]);

  // Don't show expired popup if user is banned (ban popup takes priority)
  // And DO NOT show it on the subscribe or checkout pages (let users pay/renew in peace)
  if (expired && !isBanned && pathname !== '/subscribe' && pathname !== '/checkout') {
    return (
      <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl px-6 text-center">
        <img src="/images/subscription_expired.png" alt="Subscription Expired" className="w-52 h-52 object-contain mb-6" />
        <h2 className="text-2xl font-black text-foreground mb-2">Your Pass Has Expired! 😢</h2>
        <p className="text-foreground/60 max-w-sm leading-relaxed mb-6">
          Aww, looks like your time is up! Company names are locked again. Subscribe to keep exploring top internship opportunities.
        </p>
        <button
          onClick={() => router.push("/subscribe")}
          className="px-8 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-full hover:shadow-lg transition-all"
        >
          Renew My Pass 🔄
        </button>
        <p className="text-xs text-foreground/40 mt-4">Redirecting in a moment...</p>
      </div>
    );
  }

  if (!shouldShow || !showPopup) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 md:p-8 max-w-sm w-full shadow-2xl relative flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
        <button 
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
        >
          ✕
        </button>
        <img src="/images/popup-doodle.png" alt="Reminder" className="w-40 h-40 object-contain mb-4" />
        <h3 className="text-xl font-bold text-foreground mb-2">
          Your {planType === "1_day" ? "1 Day" : planType === "7_day" ? "7 Day" : "Monthly"} pass expires in
        </h3>
        <div className="text-3xl font-black text-primary tabular-nums tracking-tight mb-6">
          {formatTime(timeLeft)}
        </div>
        <button
          onClick={() => {
            setShowPopup(false);
            router.push("/subscribe");
          }}
          className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
        >
          Renew Now
        </button>
      </div>
    </div>
  );
}
