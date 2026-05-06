"use client";

import { Users, CalendarDays, DollarSign, Activity, ArrowUpRight, ShieldCheck, Ticket } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function AdminDashboard() {
  const stats = [
    { name: "Total Users", value: "12,405", change: "+14.5%", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Active Events", value: "84", change: "+5.2%", icon: CalendarDays, color: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "Registrations (30d)", value: "3,291", change: "+22.4%", icon: Ticket, color: "text-orange-500", bg: "bg-orange-500/10" },
    { name: "Revenue (30d)", value: "₹1,45,000", change: "+18.1%", icon: DollarSign, color: "text-green-500", bg: "bg-green-500/10" },
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <motion.div variants={item}>
        <h1 className="font-heading text-3xl font-bold text-foreground">Overview</h1>
        <p className="text-foreground/70 mt-1">Platform analytics and recent activity.</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.name}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass p-6 rounded-2xl group transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-success bg-success/10 px-2 py-1 rounded-md">
                  <ArrowUpRight className="w-4 h-4" />
                  {stat.change}
                </div>
              </div>
              <h3 className="text-foreground/60 text-sm font-medium">{stat.name}</h3>
              <p className="text-3xl font-bold text-foreground mt-1 group-hover:text-primary transition-colors">{stat.value}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Approvals Needed */}
        <motion.div variants={item} className="glass rounded-2xl flex flex-col min-h-[300px]">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="font-heading text-lg font-bold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-accent" /> Organizer Approvals
            </h2>
            <button className="text-sm text-primary font-medium hover:text-primary-dark">View All</button>
          </div>
          <div className="flex-1 p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3 border border-white/5">
                <ShieldCheck className="w-8 h-8 text-foreground/20" />
              </div>
              <p className="font-medium text-foreground">You're all caught up!</p>
              <p className="text-sm text-foreground/60 mt-1">No pending organizer approvals.</p>
            </div>
          </div>
        </motion.div>

        {/* System Health */}
        <motion.div variants={item} className="glass rounded-2xl flex flex-col">
          <div className="p-6 border-b border-white/10">
            <h2 className="font-heading text-lg font-bold flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" /> System Status
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="group">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Database (Supabase)</span>
                <span className="text-success font-medium">Healthy</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "12%" }}
                  className="bg-success h-full"
                />
              </div>
              <p className="text-xs text-foreground/60 mt-1">12% capacity</p>
            </div>
            
            <div className="group">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Auth (Clerk)</span>
                <span className="text-success font-medium">Healthy</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "25%" }}
                  className="bg-success h-full"
                />
              </div>
              <p className="text-xs text-foreground/60 mt-1">2,405 MAU</p>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Payments (Razorpay)</span>
                <span className="text-success font-medium">Operational</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
