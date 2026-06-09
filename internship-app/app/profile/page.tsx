"use client";

import { useUser, UserProfile } from "@clerk/nextjs";
import { useSubscription } from "@/components/SubscriptionContext";
import { ShieldCheck, CalendarDays, Zap, AlertTriangle, ArrowRight, Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { isPaid, planType, validUntil, applyLimitPerDay, appliesToday, isLoading: isSubLoading } = useSubscription();

  if (!isLoaded || isSubLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
        <Link href="/sign-in?redirect_url=/profile" className="px-6 py-3 bg-primary text-white rounded-full font-bold">
          Sign In
        </Link>
      </div>
    );
  }

  const formatPlanName = (plan: string | null) => {
    if (plan === "1_day") return "1 Day Pass";
    if (plan === "7_day") return "7 Day Pass";
    if (plan === "monthly") return "Monthly Pass";
    return "Unknown Plan";
  };

  return (
    <div className="min-h-[100dvh] pt-24 pb-20 px-4 md:px-8 bg-transparent selection:bg-primary/30">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Side: Subscription & Stats */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl glass border border-white/10 relative overflow-hidden"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" />
              Your Subscription
            </h2>

            {isPaid ? (
              <div className="flex flex-col gap-5">
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <p className="text-sm text-primary font-bold mb-1">Active Plan</p>
                  <p className="text-2xl font-black text-foreground">{formatPlanName(planType)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs text-foreground/50 font-medium mb-1 flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5" /> Valid Until
                    </p>
                    <p className="font-bold text-sm">
                      {validUntil ? new Date(validUntil).toLocaleDateString() : "-"}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs text-foreground/50 font-medium mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Time
                    </p>
                    <p className="font-bold text-sm">
                      {validUntil ? new Date(validUntil).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "-"}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-xs text-foreground/50 font-medium flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" /> Applies Today
                    </p>
                    <p className="font-bold text-sm">
                      <span className={appliesToday >= applyLimitPerDay ? "text-red-500" : "text-primary"}>
                        {appliesToday}
                      </span>
                      {" "} / {applyLimitPerDay}
                    </p>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${appliesToday >= applyLimitPerDay ? "bg-red-500" : "bg-primary"}`}
                      style={{ width: `${Math.min((appliesToday / applyLimitPerDay) * 100, 100)}%` }}
                    />
                  </div>
                  {appliesToday >= applyLimitPerDay && (
                    <p className="text-xs text-red-500 mt-2 font-medium flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Limit reached for today.
                    </p>
                  )}
                </div>

                <Link 
                  href="/subscribe" 
                  className="mt-2 w-full py-3 rounded-xl border border-primary text-primary font-bold text-center hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  Upgrade or Renew <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center py-6">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-bold mb-2">No Active Subscription</h3>
                <p className="text-sm text-foreground/60 mb-6 leading-relaxed">
                  You are currently on the free tier. Company names and direct apply links are blurred.
                </p>
                <Link 
                  href="/subscribe" 
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
                >
                  View Plans <Zap className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
          
          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-3xl glass border border-white/10"
          >
            <h2 className="text-lg font-bold mb-4">Account Links</h2>
            <div className="flex flex-col gap-2">
              <Link href="/no-refund-policy" className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium flex items-center justify-between">
                Refund Policy <ArrowRight className="w-4 h-4 text-foreground/50" />
              </Link>
              <Link href="mailto:devanshb3456@gmail.com" className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium flex items-center justify-between">
                Contact Support <ArrowRight className="w-4 h-4 text-foreground/50" />
              </Link>
            </div>
          </motion.div>

          {/* Cute Message with Doodle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-3xl glass border border-white/10 text-center flex flex-col items-center"
          >
            <img src="/images/apply_limit.png" alt="Use Limits Wisely" className="w-40 h-40 object-contain mb-4 drop-shadow-lg" />
            <h3 className="text-lg font-bold text-primary mb-2">Use Your Limits Wisely! 🎯</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Every application is a step closer to your dream internship. Take your time to review the company details, tailor your resume, and apply to the roles that truly excite you. Quality always beats quantity!
            </p>
          </motion.div>
        </div>

        {/* Right Side: Clerk User Profile */}
        <div className="w-full lg:w-2/3 flex justify-center lg:justify-start">
          <UserProfile 
            appearance={{
              elements: {
                rootBox: "w-full shadow-none",
                cardBox: "w-full shadow-none border border-black/5 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur-xl rounded-3xl",
                navbar: "hidden md:flex",
                headerTitle: "text-foreground font-bold",
                headerSubtitle: "text-foreground/60",
                profileSectionTitleText: "text-foreground/80 font-bold border-b border-black/5 dark:border-white/10 pb-2",
              }
            }}
          />
        </div>

      </div>
    </div>
  );
}
