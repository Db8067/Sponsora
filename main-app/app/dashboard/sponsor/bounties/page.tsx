"use client";

import { Plus, Target, Users, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function BountiesPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Sponsorship Bounties</h1>
          <p className="text-foreground/70 mt-1">Post your requirements and let organizers apply to you.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-all shadow-md hover:shadow-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Bounty
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* Active Bounty Card */}
        <motion.div whileHover={{ y: -5 }} className="glass rounded-2xl p-6 border-l-4 border-l-primary flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">Active</span>
            <span className="text-lg font-bold text-success">₹1,00,000</span>
          </div>
          <h3 className="font-heading text-xl font-bold mb-2 text-foreground">Looking for AI Hackathons in India</h3>
          <p className="text-sm text-foreground/70 mb-6 flex-1">We want to sponsor student-run AI hackathons with at least 500+ attendees. Seeking keynote speaking slot and booth space.</p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <Users className="w-4 h-4" /> 500+ Attendees min.
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <MapPin className="w-4 h-4" /> India (Any City)
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-between items-center mt-auto">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-white/10 border-2 border-background flex items-center justify-center text-xs font-bold text-foreground/50">
                  {i}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-white/5 border-2 border-background flex items-center justify-center text-xs font-bold text-foreground/50">
                +4
              </div>
            </div>
            <button className="text-sm font-semibold text-primary hover:text-primary-dark">View 7 Applications</button>
          </div>
        </motion.div>

        {/* Draft Bounty Card */}
        <motion.div whileHover={{ y: -5 }} className="glass rounded-2xl p-6 border-l-4 border-l-foreground/20 flex flex-col opacity-70">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold text-foreground/50 bg-white/10 px-2.5 py-1 rounded-full">Draft</span>
            <span className="text-lg font-bold text-foreground/70">In-Kind</span>
          </div>
          <h3 className="font-heading text-xl font-bold mb-2 text-foreground">Cloud Credits for Web3 Events</h3>
          <p className="text-sm text-foreground/70 mb-6 flex-1">Offering $5k in cloud computing credits for blockchain and Web3 developer events globally.</p>
          
          <div className="pt-4 border-t border-white/10 flex justify-between items-center mt-auto">
            <span className="text-sm text-foreground/50">Last edited 2 days ago</span>
            <button className="text-sm font-semibold text-foreground hover:text-primary">Edit Draft</button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
