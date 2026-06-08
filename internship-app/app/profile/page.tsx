"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useSubscription } from "@/components/SubscriptionContext";
import { useRouter } from "next/navigation";
import {
  User, Mail, Calendar, ShieldCheck, CheckCircle2, AlertTriangle, Monitor, LogOut, Loader2, Send, Clock
} from "lucide-react";

export default function ProfilePage() {
  const { user, isLoaded: userLoaded } = useUser();
  const { isPaid, planType, validUntil, applyLimitPerDay, appliesToday, refetch } = useSubscription();
  const router = useRouter();

  const [devices, setDevices] = useState<any[]>([]);
  const [loadingDevices, setLoadingDevices] = useState(false);
  const [terminatingId, setTerminatingId] = useState<string | null>(null);

  const [feedback, setFeedback] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [sendingFeedback, setSendingFeedback] = useState(false);

  const [timeLeft, setTimeLeft] = useState("");

  // Countdown timer for subscription expiry
  useEffect(() => {
    if (!isPaid || !validUntil) return;
    const updateCountdown = () => {
      const diff = new Date(validUntil).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h left`);
      } else {
        setTimeLeft(`${hours}h ${mins}m left`);
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [isPaid, validUntil]);

  // Fetch device sessions
  const fetchDevices = async () => {
    if (!user?.id) return;
    setLoadingDevices(true);
    try {
      const res = await fetch("/api/subscription/device-sessions", {
        headers: { "x-user-id": user.id },
      });
      const data = await res.json();
      setDevices(data.sessions || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDevices(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchDevices();
    }
  }, [user?.id]);

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
      await refetch();
    } catch (e) {
      console.error(e);
    } finally {
      setTerminatingId(null);
    }
  };

  const handleSendFeedback = async () => {
    if (!feedback.trim() || !user?.id) return;
    setSendingFeedback(true);
    try {
      await fetch("/api/subscription/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-id": user.id },
        body: JSON.stringify({ feedbackText: feedback }),
      });
      setFeedbackSent(true);
      setFeedback("");
    } catch (e) {
      console.error(e);
    } finally {
      setSendingFeedback(false);
    }
  };

  if (!userLoaded) return <div className="min-h-screen bg-transparent" />;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 text-center px-4">
        <h1 className="text-3xl font-black mb-2">Sign In Required</h1>
        <p className="text-foreground/60 max-w-sm mb-6">Please log in to view and manage your profile settings.</p>
        <button
          onClick={() => router.push("/sign-in?redirect_url=/profile")}
          className="px-8 py-3 bg-primary text-white font-bold rounded-full shadow-lg"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  const limitPercentage = applyLimitPerDay > 0 ? (appliesToday / applyLimitPerDay) * 100 : 0;

  return (
    <div className="relative min-h-[100dvh] w-full pt-28 pb-20 selection:bg-primary/30">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none hidden dark:block" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-6 flex flex-col md:grid md:grid-cols-3 gap-8 items-start">
        
        {/* Left Card - User Overview */}
        <div className="md:col-span-1 w-full p-6 rounded-3xl glass border border-white/10 dark:border-white/5 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full border-4 border-primary/20 overflow-hidden mb-4 bg-white/5">
            {user.imageUrl ? (
              <img src={user.imageUrl} alt={user.fullName || "User avatar"} className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-foreground/20 m-6" />
            )}
          </div>
          <h2 className="text-xl font-bold text-foreground mb-1">{user.fullName || "Sponsora User"}</h2>
          <p className="text-xs text-foreground/50 flex items-center gap-1.5 mb-6 justify-center">
            <Mail className="w-3.5 h-3.5" /> {user.primaryEmailAddress?.emailAddress}
          </p>

          <div className="w-full h-[1px] bg-white/10 mb-6" />

          {/* Subscription Status Block */}
          {isPaid ? (
            <div className="w-full bg-green-500/10 border border-green-500/20 rounded-2xl p-4 text-left">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-green-500 bg-green-500/15 px-2.5 py-1 rounded-full mb-3">
                <CheckCircle2 className="w-3 h-3" /> Premium Active
              </span>
              <p className="text-sm font-bold text-foreground mb-1">
                {planType === "1_day" ? "1 Day Pass" : planType === "7_day" ? "7 Day Pass" : "Monthly Pass"}
              </p>
              <p className="text-xs text-foreground/60 flex items-center gap-1">
                <Clock className="w-3 h-3 text-primary" /> {timeLeft}
              </p>
            </div>
          ) : (
            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-left flex flex-col items-start">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-foreground/40 bg-white/5 px-2.5 py-1 rounded-full mb-3">
                <AlertTriangle className="w-3 h-3" /> Free Member
              </span>
              <p className="text-sm text-foreground/60 leading-relaxed mb-4">
                Unlock direct applications and company names by purchasing a pass.
              </p>
              <button
                onClick={() => router.push("/subscribe")}
                className="w-full py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:shadow-lg transition-all"
              >
                Get Premium Pass 🚀
              </button>
            </div>
          )}
        </div>

        {/* Right Content - Stats, Devices, Feedback */}
        <div className="md:col-span-2 w-full flex flex-col gap-6">

          {/* Application Tracking Stats */}
          <div className="p-6 md:p-8 rounded-3xl glass border border-white/10 dark:border-white/5">
            <h3 className="text-lg font-bold text-foreground mb-4">Application Daily Tracker</h3>
            
            {isPaid ? (
              <div>
                <div className="flex justify-between items-end mb-2.5">
                  <span className="text-sm text-foreground/60 font-semibold">Today's Applies</span>
                  <span className="text-sm font-bold text-foreground">{appliesToday} / {applyLimitPerDay} used</span>
                </div>
                
                {/* Custom Progress Bar */}
                <div className="w-full h-3 bg-white/5 border border-white/5 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-violet-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(limitPercentage, 100)}%` }}
                  />
                </div>
                
                <p className="text-xs text-foreground/40 mt-1">
                  Your daily apply limits will reset automatically at midnight.
                </p>
              </div>
            ) : (
              <div className="py-2 text-center md:text-left">
                <p className="text-sm text-foreground/60 mb-2 leading-relaxed">
                  You have no active application limits. Free users cannot submit direct applications.
                </p>
                <button
                  onClick={() => router.push("/subscribe")}
                  className="text-xs font-bold text-primary hover:underline underline-offset-2"
                >
                  Upgrade to unlock limits →
                </button>
              </div>
            )}
          </div>

          {/* Active Devices Management */}
          <div className="p-6 md:p-8 rounded-3xl glass border border-white/10 dark:border-white/5">
            <h3 className="text-lg font-bold text-foreground mb-1">Active Device Sessions</h3>
            <p className="text-xs text-foreground/50 mb-4">
              To prevent account sharing, you are limited to 2 active sessions simultaneously.
            </p>

            {loadingDevices ? (
              <div className="flex justify-center py-6">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {devices.map((d) => (
                  <div key={d.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex gap-3 items-center min-w-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Monitor className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-foreground truncate">{d.browser_info || "Unknown Browser"}</p>
                        <p className="text-xs text-foreground/50 mt-0.5">{d.ip_address} · {d.city || "Unknown City"}</p>
                      </div>
                    </div>
                    
                    {d.isCurrent ? (
                      <span className="px-2.5 py-1 text-xs rounded-lg bg-green-500/10 text-green-500 font-bold">Current</span>
                    ) : (
                      <button
                        onClick={() => handleTerminateSession(d.device_id)}
                        disabled={terminatingId === d.device_id}
                        className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        {terminatingId === d.device_id ? <Loader2 className="w-3 h-3 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
                        Logout
                      </button>
                    )}
                  </div>
                ))}

                {devices.length === 0 && (
                  <p className="text-sm text-foreground/50 py-4 text-center">No active device sessions found.</p>
                )}
              </div>
            )}
          </div>

          {/* User Feedback & Support */}
          <div className="p-6 md:p-8 rounded-3xl glass border border-white/10 dark:border-white/5">
            <h3 className="text-lg font-bold text-foreground mb-1">Feedback & Support</h3>
            <p className="text-xs text-foreground/50 mb-4">
              Have questions, issues, or suggestions? Submit feedback directly to Sponsora Admin.
            </p>

            {feedbackSent ? (
              <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-semibold rounded-2xl text-center">
                ✓ Thank you for your feedback! Sponsora Admin will review it and follow up if needed.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <textarea
                  rows={3}
                  placeholder="Tell us what we can improve, or describe any issue you are facing..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-2xl bg-white dark:bg-black/20 border border-white/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-foreground resize-none"
                />
                <button
                  onClick={handleSendFeedback}
                  disabled={sendingFeedback || !feedback.trim()}
                  className="px-6 py-2.5 bg-primary text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-primary-dark transition-all disabled:opacity-50 w-fit self-end"
                >
                  {sendingFeedback ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Send Feedback
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
