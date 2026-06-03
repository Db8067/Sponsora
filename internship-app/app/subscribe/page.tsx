"use client";

import { CheckCircle2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState<string>("monthly");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleSubscribe = () => {
    setIsProcessing(true);
    // In a real implementation, this would open Razorpay checkout
    setTimeout(() => {
      alert("Redirecting to Razorpay checkout...");
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-x-hidden pt-24 pb-20 selection:bg-primary/30">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none hidden dark:block" />

      <div className="relative z-10 w-full max-w-4xl px-4 md:px-6 mx-auto flex flex-col items-center">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
            Unlock Full <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Internship Access</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-xl mx-auto">
            Get exclusive access to apply directly to top companies, view hidden stipend details, and get priority support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
          
          {/* Daily Plan */}
          <div 
            onClick={() => setSelectedPlan('daily')}
            className={`cursor-pointer relative p-6 rounded-3xl border-2 transition-all duration-300 ${
              selectedPlan === 'daily' 
                ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10 scale-[1.02]' 
                : 'border-white/10 glass hover:border-white/20'
            }`}
          >
            <h3 className="text-xl font-bold mb-2">1 Day Pass</h3>
            <div className="flex items-end gap-1 mb-4">
              <span className="text-3xl font-black">₹29</span>
              <span className="text-foreground/60 mb-1">/day</span>
            </div>
            <ul className="flex flex-col gap-3 text-sm text-foreground/80">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Full 24-hour access</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Unlimited applies</li>
            </ul>
          </div>

          {/* Monthly Plan */}
          <div 
            onClick={() => setSelectedPlan('monthly')}
            className={`cursor-pointer relative p-6 rounded-3xl border-2 transition-all duration-300 ${
              selectedPlan === 'monthly' 
                ? 'border-primary bg-primary/5 shadow-xl shadow-primary/20 scale-[1.05] z-10' 
                : 'border-white/10 glass hover:border-white/20'
            }`}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-primary to-primary-dark text-white text-xs font-bold rounded-full shadow-lg">
              MOST POPULAR
            </div>
            <h3 className="text-xl font-bold mb-2">Monthly</h3>
            <div className="flex items-end gap-1 mb-4">
              <span className="text-3xl font-black">₹299</span>
              <span className="text-foreground/60 mb-1">/mo</span>
            </div>
            <ul className="flex flex-col gap-3 text-sm text-foreground/80">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Unlimited applies</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Resume review guide</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Priority notifications</li>
            </ul>
          </div>

          {/* Annual Plan */}
          <div 
            onClick={() => setSelectedPlan('annual')}
            className={`cursor-pointer relative p-6 rounded-3xl border-2 transition-all duration-300 ${
              selectedPlan === 'annual' 
                ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10 scale-[1.02]' 
                : 'border-white/10 glass hover:border-white/20'
            }`}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg">
              SAVE 66%
            </div>
            <h3 className="text-xl font-bold mb-2">Annual</h3>
            <div className="flex items-end gap-1 mb-4">
              <span className="text-3xl font-black">₹1200</span>
              <span className="text-foreground/60 mb-1">/yr</span>
            </div>
            <ul className="flex flex-col gap-3 text-sm text-foreground/80">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> All Monthly perks</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Verified Student Badge</li>
            </ul>
          </div>

        </div>

        <button 
          onClick={handleSubscribe}
          disabled={isProcessing}
          className="mt-12 w-full max-w-sm py-4 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-lg hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isProcessing ? "Processing..." : "Pay with Razorpay"} 
          {!isProcessing && <ShieldCheck className="w-5 h-5" />}
        </button>

        <p className="mt-4 text-sm text-foreground/50 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> Secure checkout provided by Razorpay
        </p>

      </div>
    </div>
  );
}
