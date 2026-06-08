"use client";

import { useSubscription } from "./SubscriptionContext";
import { useRouter } from "next/navigation";
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
  const { isPaid, planType, validUntil } = useSubscription();
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [expired, setExpired] = useState(false);

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
  useEffect(() => {
    if (expired) {
      const timeout = setTimeout(() => {
        router.push("/subscribe?expired=true");
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [expired, router]);

  // Only show for 1-day pass within 12 hours OR 7-day pass in last 2 hours
  const shouldShow = isPaid && validUntil && !expired && (() => {
    const remaining = new Date(validUntil).getTime() - Date.now();
    if (planType === "1_day") return remaining < 12 * 60 * 60 * 1000;
    if (planType === "7_day") return remaining < 2 * 60 * 60 * 1000;
    if (planType === "monthly") return remaining < 2 * 60 * 60 * 1000;
    return false;
  })();

  if (expired) {
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

  if (!shouldShow) return null;

  const urgency = timeLeft < 30 * 60 * 1000; // less than 30 min = red

  return (
    <div className={`fixed top-0 left-0 right-0 z-[100] py-2 px-4 flex items-center justify-center gap-3 text-sm font-semibold text-white transition-colors ${urgency ? "bg-red-500/90" : "bg-primary/90"} backdrop-blur-sm`}>
      <span>⏳</span>
      <span>
        Your {planType === "1_day" ? "1 Day" : planType === "7_day" ? "7 Day" : "Monthly"} pass expires in&nbsp;
        <span className="font-black tabular-nums">{formatTime(timeLeft)}</span>
      </span>
      <button
        onClick={() => router.push("/subscribe")}
        className="ml-2 underline underline-offset-2 font-bold hover:no-underline"
      >
        Renew
      </button>
    </div>
  );
}
