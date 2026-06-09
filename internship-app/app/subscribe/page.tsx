"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useSubscription } from "@/components/SubscriptionContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, ShieldCheck, Zap, Clock, Star, Users, Tag, X, Loader2, LockKeyhole, TrendingUp
} from "lucide-react";

const PLANS = [
  {
    id: "1_day",
    label: "1 Day Pass",
    price: 29,
    originalPrice: 99,
    period: "/ day",
    applyLimit: 10,
    color: "from-blue-500 to-indigo-600",
    icon: <Zap className="w-5 h-5" />,
    features: [
      "Full 24-hour access",
      "10 direct applications/day",
      "All company names unlocked",
      "Verified internship listings",
      "Direct apply links",
    ],
  },
  {
    id: "7_day",
    label: "7 Day Pass",
    price: 99,
    originalPrice: 299,
    period: "/ week",
    applyLimit: 12,
    color: "from-violet-600 to-purple-700",
    icon: <Star className="w-5 h-5" />,
    popular: true,
    features: [
      "Full 7-day access",
      "12 direct applications/day",
      "All company names unlocked",
      "Priority listings first",
      "Featured internships access",
      "Share internship links",
    ],
  },
  {
    id: "monthly",
    label: "Monthly Pass",
    price: 199,
    originalPrice: 599,
    period: "/ month",
    applyLimit: 15,
    color: "from-emerald-500 to-teal-600",
    icon: <TrendingUp className="w-5 h-5" />,
    features: [
      "Full 30-day access",
      "15 direct applications/day",
      "All company names unlocked",
      "Resume review tips",
      "Priority notifications",
      "Featured + verified listings",
      "Weekly digest emails",
    ],
  },
];

declare global {
  interface Window { Razorpay: any; }
}

import { Suspense } from "react";

export default function SubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <SubscribeContent />
    </Suspense>
  );
}

function SubscribeContent() {
  const [selectedPlan, setSelectedPlan] = useState("7_day");
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountError, setDiscountError] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isSignedIn } = useUser();
  const { refetch } = useSubscription();
  const isExpired = searchParams.get("expired") === "true";

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => setMaintenanceMode(true);
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const selectedPlanData = PLANS.find((p) => p.id === selectedPlan)!;

  const applyDiscount = async () => {
    if (!discountCode.trim()) return;
    setIsValidating(true);
    setDiscountError("");
    try {
      const res = await fetch(`/api/subscription/validate-discount?code=${discountCode.trim().toUpperCase()}&userId=${user?.id || ""}`);
      const data = await res.json();
      if (data.valid) {
        setDiscountApplied(true);
      } else {
        setDiscountError(data.reason || "Invalid or expired code.");
      }
    } catch {
      setDiscountError("Could not validate code. Try again.");
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubscribe = async () => {
    if (!isSignedIn) {
      router.push("/sign-in?redirect_url=/subscribe");
      return;
    }
    const qs = new URLSearchParams({ plan: selectedPlan });
    if (discountApplied && discountCode) {
      qs.set('code', discountCode.toUpperCase());
    }
    router.push(`/checkout?${qs.toString()}`);
  };

  if (maintenanceMode) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24">
        <img src="/images/maintenance_robot.png" alt="Maintenance" className="w-56 h-56 object-contain mb-6 drop-shadow-2xl" />
        <h1 className="text-3xl font-black mb-3">We're Fixing Things! 🔧</h1>
        <p className="text-foreground/60 max-w-md leading-relaxed mb-6">
          Our little robot is fixing a loose wire on the payment system. Please check back in a few minutes. We're sorry for the inconvenience!
        </p>
        <button onClick={() => setMaintenanceMode(false)} className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden pt-24 pb-20 selection:bg-primary/30">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none hidden dark:block" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6">

        {/* Expired Notice */}
        {isExpired && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-start gap-3"
          >
            <span className="text-2xl">😢</span>
            <div>
              <p className="font-bold text-orange-500">Your Pass Has Expired</p>
              <p className="text-sm text-foreground/60">Renew now to keep accessing verified companies and direct apply links!</p>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
            <LockKeyhole className="w-4 h-4" /> Unlock Premium Access
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-balance">
            Find Your Dream{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400">
              Internship
            </span>
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Unlock verified company names, direct apply links, and get up to 15 applications per day. Simple, transparent, no subscription traps.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative cursor-pointer rounded-3xl border-2 p-6 transition-all duration-300 ${
                selectedPlan === plan.id
                  ? "border-primary bg-primary/5 shadow-2xl shadow-primary/15 scale-[1.02]"
                  : "border-white/10 glass hover:border-white/20 hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-600 to-purple-700 text-white text-xs font-black rounded-full shadow-lg whitespace-nowrap">
                  ✨ MOST POPULAR
                </div>
              )}

              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                {plan.icon}
              </div>

              <h3 className="text-xl font-bold mb-1">{plan.label}</h3>
              <p className="text-xs text-foreground/50 mb-4">{plan.applyLimit} applies per day</p>

              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-black">₹{plan.price}</span>
                <span className="text-foreground/50 mb-1.5 text-sm">{plan.period}</span>
              </div>
              <p className="text-sm text-foreground/40 line-through mb-5">₹{plan.originalPrice}</p>

              <ul className="flex flex-col gap-2.5 text-sm">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2.5 text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {selectedPlan === plan.id && (
                <div className="mt-5 pt-4 border-t border-primary/20 flex items-center gap-2 text-primary text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Selected
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Discount Code + CTA */}
        <div className="max-w-md mx-auto">
          {/* Discount Code */}
          <div className="mb-6 p-4 rounded-2xl glass border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground/80">Have a discount code?</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter code..."
                value={discountCode}
                onChange={(e) => { setDiscountCode(e.target.value.toUpperCase()); setDiscountApplied(false); setDiscountError(""); }}
                disabled={discountApplied}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-black/20 border border-white/10 focus:border-primary focus:outline-none text-sm font-mono uppercase"
              />
              <button
                onClick={applyDiscount}
                disabled={isValidating || discountApplied || !discountCode.trim()}
                className="px-4 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isValidating ? <Loader2 className="w-4 h-4 animate-spin" /> : discountApplied ? "✓ Applied" : "Apply"}
              </button>
            </div>
            {discountApplied && (
              <p className="text-green-500 text-sm mt-2 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Discount applied successfully!
              </p>
            )}
            {discountError && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1.5">
                <X className="w-4 h-4" /> {discountError}
              </p>
            )}
          </div>

          {/* Subscribe Button */}
          <button
            onClick={handleSubscribe}
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-violet-600 text-white font-black text-lg hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
            {isProcessing ? "Opening Checkout..." : `Pay ₹${selectedPlanData.price} with Razorpay`}
            {!isProcessing && <ShieldCheck className="w-5 h-5" />}
          </button>

          <p className="text-center text-xs text-foreground/40 mt-3 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Secured by Razorpay ·
            <button onClick={() => router.push("/no-refund-policy")} className="underline hover:text-foreground/70">No Refund Policy</button>
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { icon: <ShieldCheck className="w-6 h-6 text-green-500 mx-auto mb-2" />, title: "100% Secure", desc: "Payments via Razorpay UPI, Cards, Net Banking" },
            { icon: <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />, title: "Verified Listings", desc: "Every internship manually verified by our team" },
            { icon: <Clock className="w-6 h-6 text-purple-500 mx-auto mb-2" />, title: "Instant Access", desc: "Get unlocked immediately after payment success" },
          ].map((b, i) => (
            <div key={i} className="p-5 rounded-2xl glass border border-white/10">
              {b.icon}
              <h4 className="font-bold mb-1">{b.title}</h4>
              <p className="text-sm text-foreground/50">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
