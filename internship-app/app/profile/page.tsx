"use client";

import { useState, useEffect } from "react";
import { useUser, UserProfile } from "@clerk/nextjs";
import { useSubscription } from "@/components/SubscriptionContext";
import { ShieldCheck, CalendarDays, Zap, AlertTriangle, ArrowRight, Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { isPaid, planType, validUntil, totalLimit, systemLimits, usedLimit, adminGrantedDays, adminGrantedLimits, isLoading: isSubLoading, refetch } = useSubscription();
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoadingTx, setIsLoadingTx] = useState(true);

  useEffect(() => {
    if (isSignedIn) {
      refetch().then(() => setIsRefreshing(false));
      fetch('/api/user/transactions')
        .then(res => res.json())
        .then(data => {
           if (data.transactions) setTransactions(data.transactions);
           setIsLoadingTx(false);
        })
        .catch(() => setIsLoadingTx(false));
    } else if (isLoaded) {
      setIsRefreshing(false);
    }
  }, [isSignedIn, isLoaded, refetch]);

  if (!isLoaded || isSubLoading || isRefreshing) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-transparent">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-foreground/60 font-medium animate-pulse">Syncing your account...</p>
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

  const getLegacyLimits = (plan: string, qty: number = 1) => {
    if (plan === "1_day") return { days: 1 * qty, limits: 10 * qty };
    if (plan === "7_day") return { days: 7 * qty, limits: 84 * qty };
    if (plan === "monthly") return { days: 30 * qty, limits: 450 * qty };
    return { days: 0, limits: 0 };
  };

  return (
    <div className="min-h-[100dvh] pt-24 pb-20 px-4 md:px-8 bg-transparent selection:bg-primary/30">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        
        {/* Left Side */}
        <div className="contents lg:flex lg:w-1/3 lg:flex-col lg:gap-6">
          
          {/* Your Subscription */}
          <div className="w-full order-1 lg:order-none">
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
                      <Zap className="w-3.5 h-3.5" /> Total Applies Used
                    </p>
                    <p className="font-bold text-sm">
                      <span className={usedLimit >= totalLimit ? "text-red-500" : "text-primary"}>
                        {usedLimit}
                      </span>
                      {" "} / {totalLimit}
                    </p>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${usedLimit >= totalLimit ? "bg-red-500" : "bg-primary"}`}
                      style={{ width: `${Math.min((usedLimit / (totalLimit || 1)) * 100, 100)}%` }}
                    />
                  </div>
                  {usedLimit >= totalLimit && (
                    <p className="text-xs text-red-500 mt-2 font-medium flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> You have run out of apply limits.
                    </p>
                  )}
                </div>

                {(adminGrantedDays > 0 || adminGrantedLimits > 0 || systemLimits > 0) && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {systemLimits > 0 && (
                      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col justify-center items-center text-center">
                        <p className="text-xs text-blue-500 font-bold mb-1 uppercase tracking-wider">System Limits</p>
                        <p className="text-xl font-black text-blue-600 dark:text-blue-400">{systemLimits} Applies</p>
                      </div>
                    )}
                    {adminGrantedLimits > 0 && (
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col justify-center items-center text-center">
                        <p className="text-xs text-emerald-500 font-bold mb-1 uppercase tracking-wider">Admin Bonus</p>
                        <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">+{adminGrantedLimits} Applies</p>
                      </div>
                    )}
                    {adminGrantedDays > 0 && (
                      <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 flex flex-col justify-center items-center text-center col-span-full">
                        <p className="text-xs text-purple-500 font-bold mb-1 uppercase tracking-wider">Admin Time Bonus</p>
                        <p className="text-xl font-black text-purple-600 dark:text-purple-400">+{adminGrantedDays} Days</p>
                      </div>
                    )}
                  </div>
                )}

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
          </div>
        
          {/* Account Links */}
          <div className="w-full order-5 lg:order-none">
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
          </div>

          {/* Cute Message with Doodle */}
          <div className="w-full order-4 lg:order-none">
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
          
        </div>

        {/* Right Side */}
        <div className="contents lg:flex lg:w-2/3 lg:flex-col lg:gap-6">

          {/* Clerk Profile */}
          <div className="w-full order-3 lg:order-none flex justify-center lg:justify-start">
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

          {/* Transaction History */}
          <div className="w-full order-2 lg:order-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 md:p-8 rounded-3xl glass border border-white/10"
          >
            <h2 className="text-xl font-bold mb-6">Transaction History</h2>
            {isLoadingTx ? (
              <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
            ) : transactions.length === 0 ? (
              <p className="text-sm text-foreground/60 text-center py-8">No transaction history found.</p>
            ) : (
              <div className="w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-black/10 dark:border-white/10 text-[10px] md:text-xs uppercase text-foreground/50 tracking-wider">
                      <th className="pb-3 pr-2 md:pr-4 font-semibold">Date</th>
                      <th className="pb-3 pr-2 md:pr-4 font-semibold">Pass</th>
                      <th className="pb-3 pr-2 md:pr-4 font-semibold">Amt</th>
                      <th className="pb-3 pr-2 md:pr-4 font-semibold">Validity</th>
                      <th className="pb-3 font-semibold text-right">Limits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => {
                      const addedDays = tx.added_days || getLegacyLimits(tx.plan_type, tx.quantity || 1).days;
                      const addedLimits = tx.added_limits || getLegacyLimits(tx.plan_type, tx.quantity || 1).limits;
                      
                      return (
                      <tr key={tx.id} className="border-b border-black/5 dark:border-white/5 last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <td className="py-3 md:py-4 pr-2 md:pr-4 text-[11px] md:text-sm whitespace-normal md:whitespace-nowrap">
                          {new Date(tx.created_at).toLocaleDateString()}
                          <span className="block md:inline text-[9px] md:text-xs text-foreground/50 md:ml-2">{new Date(tx.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </td>
                        <td className="py-3 md:py-4 pr-2 md:pr-4 text-[11px] md:text-sm whitespace-normal md:whitespace-nowrap font-medium text-primary">
                          {formatPlanName(tx.plan_type)} {tx.quantity > 1 ? `(x${tx.quantity})` : ''}
                        </td>
                        <td className="py-3 md:py-4 pr-2 md:pr-4 text-[11px] md:text-sm font-bold">
                          {tx.currency === 'INR' ? '₹' : '$'}{tx.amount}
                        </td>
                        <td className="py-3 md:py-4 pr-2 md:pr-4 text-[11px] md:text-sm whitespace-normal md:whitespace-nowrap text-foreground/70">
                          {addedDays ? `+${addedDays} d` : '-'}
                        </td>
                        <td className="py-3 md:py-4 text-[11px] md:text-sm whitespace-normal md:whitespace-nowrap font-bold text-right text-green-500">
                          {addedLimits ? `+${addedLimits}` : '-'}
                        </td>
                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
          </div>

        </div>

      </div>
    </div>
  );
}
