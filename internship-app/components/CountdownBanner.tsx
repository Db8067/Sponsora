"use client";

import { useSubscription } from "./SubscriptionContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

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
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [expired, setExpired] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [dismissedExpired, setDismissedExpired] = useState(false);
  const [hasSeenExpired, setHasSeenExpired] = useState(false);

  // Sync hasSeenExpired status with localStorage
  useEffect(() => {
    if (user?.id && validUntil) {
      const key = `hasSeenExpired_${user.id}_${validUntil}`;
      setHasSeenExpired(localStorage.getItem(key) === "true");
    } else {
      setHasSeenExpired(false);
    }
  }, [user?.id, validUntil]);

  // Reset state when signed out
  useEffect(() => {
    if (!isSignedIn) {
      setExpired(false);
      setDismissedExpired(false);
      setShowPopup(false);
    }
  }, [isSignedIn]);

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

  // Only show for 1-day pass within 12 hours OR 7-day pass in last 2 hours
  const shouldShow = isPaid && validUntil && !expired && (() => {
    const remaining = new Date(validUntil).getTime() - Date.now();
    if (planType === "1_day") return remaining < 12 * 60 * 60 * 1000;
    if (planType === "7_day") return remaining < 2 * 60 * 60 * 1000;
    if (planType === "monthly") return remaining < 2 * 60 * 60 * 1000;
    return false;
  })();

  useEffect(() => {
    if (!shouldShow || !isSignedIn) return;
    
    // Show initially after 5 seconds
    const initialTimeout = setTimeout(() => setShowPopup(true), 5000);
    // Then every 30 minutes
    const interval = setInterval(() => setShowPopup(true), 30 * 60 * 1000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [shouldShow, isSignedIn]);

  const handleCloseExpired = () => {
    setDismissedExpired(true);
    if (user?.id && validUntil) {
      const key = `hasSeenExpired_${user.id}_${validUntil}`;
      localStorage.setItem(key, "true");
    }
  };

  const handleRenew = () => {
    handleCloseExpired();
    router.push("/subscribe");
  };

  // Determine if we should show the expired modal
  const isExcludedPath = pathname === '/subscribe' || pathname === '/checkout' || pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
  const showExpiredModal = isSignedIn && expired && !isBanned && !hasSeenExpired && !dismissedExpired && !isExcludedPath;

  if (showExpiredModal) {
    return (
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[200] flex items-center justify-center px-4 w-full md:w-auto pointer-events-none">
        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 md:p-8 max-w-[340px] w-full shadow-2xl relative flex flex-col items-center text-center animate-in slide-in-from-bottom-10 fade-in duration-300 pointer-events-auto border border-orange-100 dark:border-orange-900/30">
          <button 
            onClick={handleCloseExpired}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors text-foreground"
          >
            ✕
          </button>
          <img src="/images/subscription_expired.png" alt="Subscription Expired" className="w-40 h-40 object-contain mb-4" />
          <h2 className="text-2xl font-black text-foreground mb-2">Your Pass Has Expired! 😢</h2>
          <p className="text-foreground/60 text-sm leading-relaxed mb-6">
            Aww, looks like your time is up! Company names are locked again. Subscribe to keep exploring top internship opportunities.
          </p>
          <button
            onClick={handleRenew}
            className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            Renew My Pass 🔄
          </button>
        </div>
      </div>
    );
  }

  if (!shouldShow || !showPopup) return null;

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[200] flex items-center justify-center px-4 w-full md:w-auto pointer-events-none">
      <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 md:p-8 max-w-[340px] w-full shadow-2xl relative flex flex-col items-center text-center animate-in slide-in-from-bottom-10 fade-in duration-300 pointer-events-auto border border-blue-100 dark:border-blue-900/30">
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
