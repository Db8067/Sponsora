"use client";

import { LifeBuoy, Plus, MessageCircle, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SupportTicketPage() {
  const tickets = [
    { id: "TKT-1042", subject: "Payout for Global AI Hackathon", status: "Open", priority: "High", updated: "2 hours ago" },
    { id: "TKT-1041", subject: "How to export participant data?", status: "Resolved", priority: "Low", updated: "3 days ago" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Support Tickets</h1>
          <p className="text-foreground/70 mt-1">Contact Super Admins for platform assistance.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-all shadow-md hover:shadow-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-2 space-y-4">
          {tickets.map((ticket, i) => (
            <motion.div 
              key={ticket.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  ticket.status === 'Open' ? 'bg-orange-500/20 text-orange-500' : 'bg-success/20 text-success'
                }`}>
                  {ticket.status === 'Open' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">{ticket.subject}</h3>
                  <div className="flex items-center gap-3 text-sm mt-1 text-foreground/60">
                    <span className="font-medium text-foreground/80">{ticket.id}</span>
                    <span>•</span>
                    <span>Updated {ticket.updated}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                  ticket.priority === 'High' ? 'bg-red-500/20 text-red-500' : 'bg-white/10 text-foreground/70'
                }`}>
                  {ticket.priority} Priority
                </span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                  ticket.status === 'Open' ? 'bg-orange-500/20 text-orange-500' : 'bg-success/20 text-success'
                }`}>
                  {ticket.status}
                </span>
              </div>
            </motion.div>
          ))}

          {tickets.length === 0 && (
            <div className="glass p-12 rounded-2xl text-center flex flex-col items-center">
              <LifeBuoy className="w-12 h-12 text-foreground/20 mb-4" />
              <h3 className="font-bold text-lg text-foreground mb-1">No Support Tickets</h3>
              <p className="text-foreground/60 text-sm">You haven't opened any support tickets yet.</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl border-t-4 border-t-accent">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-5 h-5 text-accent" />
              <h2 className="font-bold text-lg text-foreground">Help Center</h2>
            </div>
            <p className="text-sm text-foreground/70 mb-4">
              Before creating a ticket, check out our comprehensive knowledge base for quick answers to common questions.
            </p>
            <ul className="space-y-3 text-sm mb-6">
              <li>
                <a href="#" className="text-primary hover:text-primary-dark font-medium transition-colors hover:underline">How do I process refunds?</a>
              </li>
              <li>
                <a href="#" className="text-primary hover:text-primary-dark font-medium transition-colors hover:underline">Setting up Razorpay payouts</a>
              </li>
              <li>
                <a href="#" className="text-primary hover:text-primary-dark font-medium transition-colors hover:underline">Guide to Sponsor Matchmaking</a>
              </li>
            </ul>
            <button className="w-full bg-white/5 border border-white/10 text-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors">
              Browse Knowledge Base
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
