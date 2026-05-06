"use client";

import { Trophy, CalendarCheck, Target, ArrowRight } from "lucide-react";
import Link from "next/link";
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

export default function UserDashboardHome() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <motion.div variants={item}>
        <h1 className="font-heading text-3xl font-bold text-foreground">Welcome back, Participant</h1>
        <p className="text-foreground/70 mt-1">Here's a summary of your event journey.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { icon: CalendarCheck, label: "Events Joined", value: "12", color: "blue" },
          { icon: Trophy, label: "Badges Earned", value: "4", color: "purple" },
          { icon: Target, label: "Global Rank", value: "#4,021", color: "orange" },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass p-6 rounded-2xl flex items-center gap-4 group transition-all"
          >
            <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/20 text-${stat.color}-500 flex items-center justify-center`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-foreground/60 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Events */}
        <motion.div variants={item} className="glass p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading text-xl font-bold">Upcoming Events</h2>
            <Link href="/dashboard/user/registrations" className="text-primary text-sm font-medium hover:text-primary-dark">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 5 }}
                className="flex gap-4 p-4 rounded-xl border border-white/10 dark:hover:bg-white/5 transition-all cursor-pointer"
              >
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 shrink-0 flex flex-col items-center justify-center border border-white/10">
                  <span className="text-xs font-bold text-foreground/60">OCT</span>
                  <span className="text-lg font-bold text-foreground">15</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground line-clamp-1">Global AI Hackathon 2026</h3>
                  <p className="text-sm text-foreground/60 mb-2">Team: The Innovators</p>
                  <span className="text-xs font-medium px-2 py-1 bg-green-500/20 text-green-500 rounded-md">Confirmed</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Badges */}
        <motion.div variants={item} className="glass p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading text-xl font-bold">Recent Achievements</h2>
            <Link href="/dashboard/user/badges" className="text-primary text-sm font-medium hover:text-primary-dark">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center text-center p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center mb-3">
                <Trophy className="w-6 h-6" />
              </div>
              <p className="font-bold text-sm">Hackathon Winner</p>
              <p className="text-xs text-foreground/60 mt-1">Oct 2025</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center text-center p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center mb-3">
                <Target className="w-6 h-6" />
              </div>
              <p className="font-bold text-sm">Top 10 Finalist</p>
              <p className="text-xs text-foreground/60 mt-1">Sep 2025</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Recommended Events */}
      <motion.div 
        variants={item}
        whileHover={{ scale: 1.01 }}
        className="glass p-6 sm:p-8 rounded-2xl border-primary/30 flex flex-col sm:flex-row justify-between items-center gap-6 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Ready for your next challenge?</h2>
          <p className="text-foreground/70">Check out the latest hackathons matching your skills.</p>
        </div>
        <Link href="/events" className="relative z-10 bg-primary text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-primary-dark transition-all flex items-center gap-2 whitespace-nowrap">
          Explore Events <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
