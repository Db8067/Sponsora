"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useSubscription } from "@/components/SubscriptionContext";
import { CheckCircle2, ShieldCheck, ArrowLeft, Loader2, Plus, Minus, Info, Tag, X } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const PLANS = {
  "1_day":   { baseAmount: 29,  label: "1 Day Pass",  days: 1, applyLimit: 10,  unit: "Day" },
  "7_day":   { baseAmount: 99,  label: "7 Day Pass",  days: 7, applyLimit: 12,  unit: "Week" },
  "monthly": { baseAmount: 199, label: "Monthly Pass", days: 30, applyLimit: 15, unit: "Month" },
};

declare global {
  interface Window { Razorpay: any; }
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan") || "7_day";
  const initialDiscountCode = searchParams.get("code") || "";
  
  const { user, isLoaded, isSignedIn } = useUser();
  const { refetch } = useSubscription();

  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  
  const [discountCode, setDiscountCode] = useState(initialDiscountCode);
  const [discountApplied, setDiscountApplied] = useState(!!initialDiscountCode);
  const [discountError, setDiscountError] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [isValidating, setIsValidating] = useState(false);

  const applyDiscount = async () => {
    if (!discountCode.trim()) return;
    setIsValidating(true);
    setDiscountError("");
    try {
      const res = await fetch(`/api/subscription/validate-discount`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: discountCode.trim().toUpperCase(), planType: planId })
      });
      const data = await res.json();
      if (data.success) {
        setDiscountApplied(true);
        setDiscountPercentage(data.discount_percentage);
      } else {
        setDiscountError(data.error || "Invalid or expired code.");
      }
    } catch {
      setDiscountError("Could not validate code. Try again.");
    } finally {
      setIsValidating(false);
    }
  };

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push(`/sign-in?redirect_url=/checkout?plan=${planId}`);
    }
  }, [isLoaded, isSignedIn, router, planId]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => setMaintenanceMode(true);
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const plan = PLANS[planId as keyof typeof PLANS];
  if (!plan) {
    return <div className="min-h-screen pt-32 text-center">Invalid Plan Selected.</div>;
  }

  let finalAmount = plan.baseAmount * quantity;
  if (discountApplied && discountPercentage > 0) {
    finalAmount = Math.round(finalAmount * (1 - discountPercentage / 100));
  }
  const totalDays = plan.days * quantity;
  const totalApplies = plan.applyLimit * totalDays;

  const handlePayment = async () => {
    if (!isSignedIn) return;
    if (!razorpayLoaded) { setMaintenanceMode(true); return; }

    setIsProcessing(true);
    try {
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planType: planId,
          discountCode: discountApplied && discountCode ? discountCode : undefined,
          userId: user.id,
          quantity, // passing quantity to backend
        }),
      });

      if (!res.ok) { setMaintenanceMode(true); return; }
      const order = await res.json();

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Pay on Razorpay",
        description: `${quantity}x ${order.planLabel}`,
        order_id: order.orderId,
        prefill: {
          name: user.fullName || "",
          email: user.primaryEmailAddress?.emailAddress || "",
        },
        notes: {
          planType: planId,
          userId: user.id,
          discountCode: discountApplied && discountCode ? discountCode : "",
          quantity: quantity.toString(),
        },
        theme: { color: "#6C63FF" },
        handler: async function() {
          await refetch();
          router.push("/internships/category/software-engineering?success=true");
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => setIsProcessing(false));
      rzp.open();
    } catch (error) {
      setMaintenanceMode(true);
    } finally {
      setIsProcessing(false);
    }
  };

  if (maintenanceMode) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-black mb-3">We're Fixing Things! 🔧</h1>
        <button onClick={() => setMaintenanceMode(false)} className="px-8 py-3 rounded-full bg-primary text-white font-bold">Try Again</button>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] pt-24 pb-20 px-4 md:px-8 bg-transparent selection:bg-primary/30">
      <div className="max-w-5xl mx-auto">
        <Link href="/subscribe" className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Plans
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-8">Checkout</h1>

        <div className="flex flex-col-reverse lg:flex-row gap-8 items-start">
          
          {/* Left Column: Benefits */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="p-6 md:p-8 rounded-3xl glass border border-white/10">
              <h2 className="text-xl font-bold mb-4">You have selected the <span className="text-primary">{plan.label}</span></h2>
              <p className="text-foreground/70 text-sm mb-6 leading-relaxed">
                Unlock full access to verified companies and direct apply links. Maximize your chances of getting hired by removing the blur and accessing premium opportunities instantly.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Full access to company names and details",
                  "Direct redirect to original apply links",
                  `${plan.applyLimit} apply limits per day`,
                  "Priority support and updates",
                  "Secure one-time payment",
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/20 flex gap-4 items-start">
              <Info className="w-6 h-6 text-blue-500 shrink-0" />
              <div>
                <h3 className="font-bold text-blue-500 mb-1">Total Apply Limit Calculation</h3>
                <p className="text-sm text-foreground/70">
                  You get {plan.applyLimit} applies per day. By buying {totalDays} days, you can apply to a total of <strong>{totalApplies} internships</strong> throughout your entire pass duration!
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Multiplier */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 md:p-8 rounded-3xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 shadow-2xl"
            >
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="flex justify-between items-center py-4 border-b border-black/5 dark:border-white/10">
                <span className="font-medium text-foreground/80">{plan.label}</span>
                <span className="font-bold">₹{plan.baseAmount}</span>
              </div>

              <div className="py-6 border-b border-black/5 dark:border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-foreground/80">Select Duration (Multiply)</span>
                  <div className="flex items-center gap-4 bg-foreground/5 rounded-full px-2 py-1">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full bg-background flex items-center justify-center shadow-sm hover:text-primary transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold w-4 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full bg-background flex items-center justify-center shadow-sm hover:text-primary transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-foreground/50 text-right">You are buying {quantity} {plan.unit}{quantity > 1 ? 's' : ''} ({totalDays} days)</p>
              </div>

              {/* Discount Code Section */}
              <div className="py-6 border-b border-black/5 dark:border-white/10">
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
                    className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-black/10 dark:border-white/10 focus:border-primary focus:outline-none text-sm font-mono uppercase"
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
                    <CheckCircle2 className="w-4 h-4" /> Discount applied! Calculated at checkout.
                  </p>
                )}
                {discountError && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1.5">
                    <X className="w-4 h-4" /> {discountError}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center py-6">
                <span className="text-lg font-bold">Total Amount</span>
                <span className="text-3xl font-black text-primary">₹{finalAmount}</span>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing || !isLoaded}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-violet-600 text-white font-black text-lg hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {isProcessing ? "Processing..." : `Pay ₹${finalAmount} securely`}
                {!isProcessing && <ShieldCheck className="w-5 h-5" />}
              </button>
              
              <p className="text-center text-xs text-foreground/40 mt-4 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Payments processed securely via Razorpay
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
