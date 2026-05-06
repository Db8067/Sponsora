"use client";

import { useState } from "react";
import { Plus, Search, Building2, Handshake, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [activeTab, setActiveTab] = useState("contacted");

  const moveLead = (id: number, newStatus: string) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">Sponsors CRM</h1>
          <p className="text-foreground/70 text-sm mt-1">Manage your sponsorship pipeline.</p>
        </div>
        <button className="w-full sm:w-auto bg-primary text-white px-5 py-3 rounded-2xl text-sm font-bold hover:bg-primary-dark transition-all shadow-lg flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" /> Add Lead
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
        <input 
          type="text" 
          placeholder="Search sponsors..." 
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
        />
      </div>

      {/* Mobile Tab Bar */}
      <div className="flex md:hidden bg-white/5 p-1.5 rounded-2xl border border-white/10 overflow-x-auto scrollbar-hide">
        {columns.map((column) => (
          <button
            key={column.id}
            onClick={() => setActiveTab(column.id)}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === column.id ? 'bg-primary text-white shadow-lg' : 'text-foreground/50 hover:text-foreground'
            }`}
          >
            {column.title} ({leads.filter(l => l.status === column.id).length})
          </button>
        ))}
      </div>

      {/* Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {columns.map((column) => (
          <div 
            key={column.id} 
            className={`glass p-4 sm:p-5 rounded-3xl flex flex-col h-[500px] sm:h-[600px] transition-all duration-300 ${
              activeTab === column.id ? 'flex' : 'hidden md:flex'
            }`}
          >
            <div className="flex items-center justify-between mb-6 px-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${column.id === 'closed' ? 'bg-success' : column.id === 'negotiating' ? 'bg-orange-500' : 'bg-primary'}`} />
                <h2 className="font-bold text-foreground uppercase tracking-widest text-xs">{column.title}</h2>
              </div>
              <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded-lg text-foreground/70">
                {leads.filter(l => l.status === column.id).length}
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 px-1 scrollbar-hide">
              <AnimatePresence mode="popLayout">
                {leads.filter(l => l.status === column.id).map(lead => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={lead.id} 
                    className="bg-white/5 border border-white/10 p-5 rounded-2xl cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary font-bold">
                        {lead.company[0]}
                      </div>
                      <h3 className="font-bold text-foreground">{lead.company}</h3>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <span className="text-sm font-bold text-success bg-success/10 px-3 py-1 rounded-lg">{lead.amount}</span>
                      
                      <div className="flex gap-2">
                        {column.id !== "contacted" && (
                          <button onClick={() => moveLead(lead.id, "contacted")} className="p-2 hover:bg-white/10 rounded-xl text-foreground/50 hover:text-primary transition-all" title="Move to Contacted">
                            <Building2 className="w-4 h-4" />
                          </button>
                        )}
                        {column.id !== "negotiating" && (
                          <button onClick={() => moveLead(lead.id, "negotiating")} className="p-2 hover:bg-white/10 rounded-xl text-foreground/50 hover:text-orange-500 transition-all" title="Move to Negotiating">
                            <Handshake className="w-4 h-4" />
                          </button>
                        )}
                        {column.id !== "closed" && (
                          <button onClick={() => moveLead(lead.id, "closed")} className="p-2 hover:bg-white/10 rounded-xl text-foreground/50 hover:text-success transition-all" title="Move to Closed">
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {leads.filter(l => l.status === column.id).length === 0 && (
                <div className="h-full flex flex-col items-center justify-center opacity-20">
                  <Plus className="w-8 h-8 mb-2" />
                  <p className="text-sm font-medium uppercase tracking-widest">No Leads</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
