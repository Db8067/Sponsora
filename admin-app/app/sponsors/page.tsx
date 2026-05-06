"use client";

import { Building2, Mail, ExternalLink, Search, MoreVertical, XCircle, CheckCircle2, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminSponsorsPage() {
  const sponsors = [
    { id: 1, name: "Acme Corp", industry: "SaaS", status: "Active", tier: "Growth", revenue: "₹2,999/mo" },
    { id: 2, name: "CloudScale", industry: "Infrastructure", status: "Active", tier: "Pro", revenue: "₹6,999/mo" },
    { id: 3, name: "DevTools Inc", industry: "DevOps", status: "Inactive", tier: "Free", revenue: "₹0/mo" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Sponsors</h1>
          <p className="text-foreground/70 mt-1">Manage and track company accounts.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
          <input 
            type="text" 
            placeholder="Search companies..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
          />
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 font-semibold text-foreground/80 text-sm">Company</th>
                <th className="p-4 font-semibold text-foreground/80 text-sm">Industry</th>
                <th className="p-4 font-semibold text-foreground/80 text-sm">Status</th>
                <th className="p-4 font-semibold text-foreground/80 text-sm">Subscription</th>
                <th className="p-4 font-semibold text-foreground/80 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sponsors.map((sponsor) => (
                <tr key={sponsor.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent font-bold text-sm shrink-0">
                        {sponsor.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-foreground">{sponsor.name}</p>
                        <p className="text-xs text-foreground/60">{sponsor.industry}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-foreground/80">{sponsor.industry}</td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 w-fit ${
                      sponsor.status === 'Active' ? 'bg-success/20 text-success' : 'bg-red-500/20 text-red-500'
                    }`}>
                      {sponsor.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-sm font-bold text-foreground">{sponsor.tier}</p>
                      <p className="text-xs text-foreground/60">{sponsor.revenue}</p>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white/10 rounded-lg text-foreground/70 hover:text-primary transition-colors" title="Message">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg text-foreground/70 hover:text-accent transition-colors" title="View Profile">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
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
