"use client";

import { Handshake, TrendingUp, Search, MessageSquare, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function SponsorDashboardHome() {
  const stats = [
    { name: "Active Sponsorships", value: "4", change: "+1", icon: Handshake, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Est. Impressions", value: "1.2M", change: "+15%", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "Messages", value: "12", change: "3 unread", icon: MessageSquare, color: "text-orange-500", bg: "bg-orange-500/10" },
    { name: "Saved Events", value: "18", change: "4 this week", icon: Search, color: "text-green-500", bg: "bg-green-500/10" },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item} className="flex justify-between items-end">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Sponsor Portal</h1>
          <p className="text-foreground/70 mt-1">Track ROI and discover high-impact events.</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.name} whileHover={{ y: -5, scale: 1.02 }} className="glass p-6 rounded-2xl group transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-foreground/60 px-2 py-1 rounded-md bg-white/5">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change}
                </div>
              </div>
              <h3 className="text-foreground/60 text-sm font-medium">{stat.name}</h3>
              <p className="text-3xl font-bold text-foreground mt-1 group-hover:text-primary transition-colors">{stat.value}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ROI Tracker */}
        <motion.div variants={item} className="glass p-6 rounded-2xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading text-xl font-bold">ROI Tracker (Past 6 Months)</h2>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-6">
            <div className="group">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Brand Awareness (Impressions)</span>
                <span className="text-primary font-bold">High</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} className="bg-primary h-full" />
              </div>
            </div>
            <div className="group">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Lead Generation (Scans/Signups)</span>
                <span className="text-accent font-bold">Medium</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: "60%" }} className="bg-accent h-full" />
              </div>
            </div>
            <div className="group">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Talent Acquisition (Resumes)</span>
                <span className="text-success font-bold">Very High</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: "95%" }} className="bg-success h-full" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div variants={item} className="glass p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h2 className="font-heading text-xl font-bold">AI Recommended Events</h2>
            <Link href="/dashboard/sponsor/discover" className="text-primary text-sm font-medium hover:text-primary-dark">View all</Link>
          </div>
          <div className="space-y-4 relative z-10">
            {[
              { name: "FinTech Summit '26", match: "98%", ask: "₹50k - ₹2L" },
              { name: "React India Conf", match: "92%", ask: "₹1L - ₹5L" },
              { name: "Web3 Builders Meet", match: "88%", ask: "In-kind" }
            ].map((event, i) => (
              <div key={i} className="flex justify-between items-center p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors cursor-pointer bg-black/20 backdrop-blur-sm">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-success bg-success/10 px-2 py-0.5 rounded-md">{event.match} Match</span>
                  </div>
                  <h3 className="font-bold text-foreground">{event.name}</h3>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-foreground/80">{event.ask}</p>
                  <p className="text-xs text-foreground/50">Budget</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
