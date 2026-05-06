"use client";

import { Check, Zap, Rocket, Star, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  { name: "Starter", price: "₹999", period: "/mo", desc: "For new organizers", features: ["10 events / mo", "Basic Analytics", "View Sponsor Listings", "Priority Support"] },
  { name: "Growth", price: "₹2,999", period: "/mo", desc: "For growing communities", features: ["Unlimited Events", "Full Analytics", "Chat with Admin", "Discount Codes"], recommended: true },
  { name: "Pro", price: "₹6,999", period: "/mo", desc: "For large institutions", features: ["Verified Badge", "Dedicated Manager", "Priority Placement", "API Access"] },
];

export default function OrganizerSubscriptionPage() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground">Upgrade Your Plan</h1>
        <p className="text-foreground/70 mt-2">Unlock powerful features to scale your events.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div 
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass rounded-3xl p-8 flex flex-col relative overflow-hidden ${plan.recommended ? 'border-primary ring-1 ring-primary' : ''}`}
          >
            {plan.recommended && (
              <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                Recommended
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-1">{plan.name}</h3>
              <p className="text-sm text-foreground/60">{plan.desc}</p>
            </div>

            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-black text-foreground">{plan.price}</span>
              <span className="text-foreground/50 font-medium">{plan.period}</span>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map(feat => (
                <li key={feat} className="flex items-start gap-3 text-sm text-foreground/80">
                  <div className="w-5 h-5 rounded-full bg-success/10 text-success flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  {feat}
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-xl font-bold transition-all ${
              plan.recommended ? 'bg-primary text-white shadow-lg hover:bg-primary-dark shadow-primary/20' : 'bg-white/5 border border-white/10 text-foreground hover:bg-white/10'
            }`}>
              Select {plan.name}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="glass p-8 rounded-3xl max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6 border-l-4 border-l-accent">
        <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
          <Star className="w-8 h-8" />
        </div>
        <div className="text-center sm:text-left flex-1">
          <h3 className="font-bold text-lg text-foreground">Need a custom enterprise solution?</h3>
          <p className="text-sm text-foreground/70 mt-1">Contact our sales team for bespoke plans and institutional discounts.</p>
        </div>
        <button className="text-sm font-bold text-accent hover:text-accent-dark transition-colors whitespace-nowrap">
          Contact Sales →
        </button>
      </div>
    </div>
  );
}
