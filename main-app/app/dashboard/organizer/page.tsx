"use client";

import { Users, CalendarDays, Eye, Briefcase, ArrowUpRight, Plus } from "lucide-react";
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

export default function OrganizerDashboardHome() {
  const stats = [
    { name: "Total Tickets Sold", value: "842", change: "+12.5%", icon: Ticket, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Page Views", value: "14.2k", change: "+48.2%", icon: Eye, color: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "Sponsor Inquiries", value: "24", change: "+4.1%", icon: Briefcase, color: "text-orange-500", bg: "bg-orange-500/10" },
    { name: "Active Events", value: "3", change: "0%", icon: CalendarDays, color: "text-green-500", bg: "bg-green-500/10" },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item} className="flex justify-between items-end">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Organizer Dashboard</h1>
          <p className="text-foreground/70 mt-1">Manage your events, participants, and sponsors.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Events */}
        <motion.div variants={item} className="glass p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading text-xl font-bold">Recent Events</h2>
            <Link href="/dashboard/organizer/events" className="text-primary text-sm font-medium hover:text-primary-dark">View all</Link>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                <div>
                  <h3 className="font-bold text-foreground">Global AI Hackathon 2026</h3>
                  <p className="text-sm text-foreground/60">Oct 15-17 • San Francisco</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">342</p>
                  <p className="text-xs text-foreground/60">Registered</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sponsor Pipeline (Mini CRM) */}
        <motion.div variants={item} className="glass p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading text-xl font-bold">Sponsor Pipeline</h2>
            <Link href="/dashboard/organizer/sponsors" className="text-primary text-sm font-medium hover:text-primary-dark">Open CRM</Link>
          </div>
          <div className="space-y-4">
            {[
              { company: "Acme Corp", status: "Negotiating", color: "bg-orange-500/20 text-orange-500" },
              { company: "TechFlow", status: "Contacted", color: "bg-blue-500/20 text-blue-500" },
              { company: "CloudScale", status: "Closed", color: "bg-green-500/20 text-green-500" }
            ].map((lead, i) => (
              <div key={i} className="flex justify-between items-center p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {lead.company[0]}
                  </div>
                  <h3 className="font-bold text-foreground">{lead.company}</h3>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${lead.color}`}>
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

import { Ticket } from "lucide-react";
