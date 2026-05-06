"use client";

import { useState } from "react";
import { Plus, Search, Building2, Handshake, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const columns = [
  { id: "contacted", title: "Contacted" },
  { id: "negotiating", title: "Negotiating" },
  { id: "closed", title: "Closed Won" },
];

const initialLeads = [
  { id: 1, company: "TechFlow", status: "contacted", amount: "₹50k" },
  { id: 2, company: "CloudScale", status: "contacted", amount: "₹1L" },
  { id: 3, company: "Acme Corp", status: "negotiating", amount: "₹2L" },
  { id: 4, company: "DevTools Inc", status: "closed", amount: "₹75k" },
];

export default function SponsorsCRMPage() {
  const [leads, setLeads] = useState(initialLeads);

  // Simple move function for demonstration (no drag-and-drop library for MVP simplicity)
  const moveLead = (id: number, newStatus: string) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Sponsors CRM</h1>
          <p className="text-foreground/70 mt-1">Manage your sponsorship pipeline.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-all shadow-md hover:shadow-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Lead
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
        <input 
          type="text" 
          placeholder="Search sponsors..." 
          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="glass p-4 rounded-2xl flex flex-col h-[600px]">
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="font-bold text-foreground">{column.title}</h2>
              <span className="text-xs font-medium bg-white/10 px-2 py-1 rounded-full text-foreground/70">
                {leads.filter(l => l.status === column.id).length}
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 px-1">
              {leads.filter(l => l.status === column.id).map(lead => (
                <motion.div 
                  layoutId={`lead-${lead.id}`}
                  key={lead.id} 
                  className="bg-white/5 border border-white/10 p-4 rounded-xl cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                        {lead.company[0]}
                      </div>
                      <h3 className="font-bold text-sm text-foreground">{lead.company}</h3>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs font-semibold text-success bg-success/10 px-2 py-1 rounded-md">{lead.amount}</span>
                    
                    {/* Quick Move Actions */}
                    <div className="flex gap-1">
                      {column.id !== "contacted" && (
                        <button onClick={() => moveLead(lead.id, "contacted")} className="p-1.5 hover:bg-white/10 rounded-md text-foreground/50 hover:text-blue-500" title="Move to Contacted">
                          <Building2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {column.id !== "negotiating" && (
                        <button onClick={() => moveLead(lead.id, "negotiating")} className="p-1.5 hover:bg-white/10 rounded-md text-foreground/50 hover:text-orange-500" title="Move to Negotiating">
                          <Handshake className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {column.id !== "closed" && (
                        <button onClick={() => moveLead(lead.id, "closed")} className="p-1.5 hover:bg-white/10 rounded-md text-foreground/50 hover:text-green-500" title="Move to Closed">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
