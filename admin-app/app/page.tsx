"use client";

import { Users, CalendarDays, DollarSign, Activity, ArrowUpRight, ShieldCheck, Ticket, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
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
    { name: "Registrations", value: "3,291", change: "+22.4%", icon: Ticket, color: "text-orange-500", bg: "bg-orange-500/10" },
    { name: "Revenue", value: "₹1.4L", change: "+18.1%", icon: DollarSign, color: "text-green-500", bg: "bg-green-500/10" },
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 sm:space-y-10"
    >
      <motion.div variants={item} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-4xl font-black tracking-tight text-foreground uppercase">Overview</h1>
          <p className="text-foreground/50 font-bold uppercase tracking-widest text-[10px] mt-1">Platform analytics & health</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold text-foreground/60 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" /> Live System
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.name}
              whileHover={{ y: -5 }}
              className="glass p-5 sm:p-6 rounded-3xl group transition-all border-white/10"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-black text-success bg-success/10 px-2 py-1 rounded-lg uppercase tracking-tight">
                  {stat.change}
                </div>
              </div>
              <h3 className="text-foreground/40 text-[10px] font-black uppercase tracking-widest">{stat.name}</h3>
              <p className="text-xl sm:text-3xl font-black text-foreground mt-1 group-hover:text-primary transition-colors">{stat.value}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Platform Growth Chart */}
        <motion.div variants={item} className="glass rounded-[2.5rem] flex flex-col lg:col-span-2 overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div>
              <h2 className="font-heading text-lg font-black uppercase tracking-tight flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" /> Platform Growth
              </h2>
            </div>
            <select className="bg-transparent text-xs font-black uppercase tracking-widest border-none focus:ring-0 cursor-pointer text-foreground/40">
              <option>6 Months</option>
              <option>1 Year</option>
            </select>
          </div>
          <div className="p-8 sm:p-12 h-[280px] sm:h-[350px] flex items-end justify-between gap-2 sm:gap-6">
            {[40, 65, 45, 90, 75, 100].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group h-full justify-end">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.1, duration: 1 }}
                  className="w-full max-w-[40px] bg-gradient-to-t from-primary/10 via-primary/50 to-primary rounded-2xl group-hover:to-accent transition-all relative shadow-lg shadow-primary/20"
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest">
                    {height * 100}
                  </div>
                </motion.div>
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/20">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* System Status / Side panel */}
        <motion.div variants={item} className="space-y-6">
          <div className="glass rounded-[2.5rem] p-8 space-y-8">
            <h2 className="font-heading text-lg font-black uppercase tracking-tight flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" /> Status
            </h2>
            
            <div className="space-y-6">
              {[
                { label: "Database", status: "Healthy", val: 12, color: "bg-success" },
                { label: "Auth (Clerk)", status: "Healthy", val: 25, color: "bg-success" },
                { label: "Payments", status: "Active", val: 100, color: "bg-success" }
              ].map(sys => (
                <div key={sys.label} className="group">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3">
                    <span className="text-foreground/40">{sys.label}</span>
                    <span className="text-success">{sys.status}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${sys.val}%` }}
                      className={`${sys.color} h-full rounded-full shadow-lg`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-[2.5rem] p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-black text-sm uppercase tracking-tight">Security</p>
                <p className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest">Last audit 2h ago</p>
              </div>
            </div>
            <button className="w-full py-4 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all">
              Run Check
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

