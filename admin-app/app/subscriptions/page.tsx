"use client";

import { CreditCard, ArrowUpRight, Search, MoreVertical, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminSubscriptionsPage() {
  const subs = [
    { id: 1, user: "Sarah Connor (Organizer)", plan: "Growth", status: "Active", amount: "₹2,999", next: "Jun 02, 2026" },
    { id: 2, user: "Acme Corp (Sponsor)", plan: "Pro", status: "Active", amount: "₹6,999", next: "Jun 10, 2026" },
    { id: 3, user: "John Doe (Organizer)", plan: "Starter", status: "Past Due", amount: "₹999", next: "Expired" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Subscriptions</h1>
          <p className="text-foreground/70 mt-1">Manage billing and recurring revenue.</p>
        </div>
        <div className="flex items-center gap-4 bg-success/10 px-4 py-2 rounded-xl border border-success/20">
          <TrendingUp className="w-5 h-5 text-success" />
          <div>
            <p className="text-[10px] uppercase font-bold text-success/70">Monthly Revenue</p>
            <p className="text-lg font-black text-success">₹1,45,280</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl">
          <p className="text-foreground/50 text-xs font-bold uppercase tracking-widest mb-1">Active Subs</p>
          <p className="text-3xl font-black text-foreground">142</p>
        </div>
        <div className="glass p-6 rounded-2xl">
          <p className="text-foreground/50 text-xs font-bold uppercase tracking-widest mb-1">Churn Rate</p>
          <p className="text-3xl font-black text-red-500">2.4%</p>
        </div>
        <div className="glass p-6 rounded-2xl">
          <p className="text-foreground/50 text-xs font-bold uppercase tracking-widest mb-1">Avg Ticket</p>
          <p className="text-3xl font-black text-primary">₹3,420</p>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 font-semibold text-foreground/80 text-sm">Subscriber</th>
                <th className="p-4 font-semibold text-foreground/80 text-sm">Plan</th>
                <th className="p-4 font-semibold text-foreground/80 text-sm">Status</th>
                <th className="p-4 font-semibold text-foreground/80 text-sm">Amount</th>
                <th className="p-4 font-semibold text-foreground/80 text-sm">Next Billing</th>
                <th className="p-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {subs.map((sub) => (
                <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-sm font-bold text-foreground">{sub.user}</td>
                  <td className="p-4">
                    <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded">{sub.plan}</span>
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${
                      sub.status === 'Active' ? 'text-success' : 'text-red-500'
                    }`}>
                      {sub.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {sub.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-bold text-foreground">{sub.amount}</td>
                  <td className="p-4 text-sm text-foreground/60">{sub.next}</td>
                  <td className="p-4 text-right">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-foreground/40 hover:text-foreground">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
