"use client";

import { Shield, UserPlus, Settings2, MoreVertical, ShieldCheck, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function TeamManagementPage() {
  const team = [
    { id: 1, name: "Sarah Connor", email: "sarah@techclub.hq", role: "Owner", access: "Full Access" },
    { id: 2, name: "John Doe", email: "john@techclub.hq", role: "Event Manager", access: "Events & Participants" },
    { id: 3, name: "Alex Chen", email: "alex@techclub.hq", role: "Sponsorships", access: "CRM & Chat Only" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Team & Access</h1>
          <p className="text-foreground/70 mt-1">Manage co-organizers and their permissions.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-all shadow-md hover:shadow-lg flex items-center gap-2">
          <UserPlus className="w-4 h-4" /> Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-2 space-y-4">
          <h2 className="font-bold text-lg mb-4 text-foreground">Active Team Members</h2>
          
          {team.map((member) => (
            <motion.div 
              key={member.id}
              whileHover={{ x: 5 }}
              className="glass p-4 rounded-xl flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-foreground font-bold">
                  {member.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{member.name}</h3>
                  <div className="flex items-center gap-3 text-xs mt-1">
                    <span className="text-foreground/60 flex items-center gap-1"><Mail className="w-3 h-3" /> {member.email}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-foreground">{member.role}</p>
                  <p className="text-xs text-primary font-medium">{member.access}</p>
                </div>
                {member.role !== "Owner" && (
                  <button className="p-2 hover:bg-white/10 rounded-lg text-foreground/50 hover:text-foreground transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                )}
                {member.role === "Owner" && (
                  <div className="p-2 text-success">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl border-t-4 border-t-accent">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-accent" />
              <h2 className="font-bold text-lg text-foreground">Role Permissions</h2>
            </div>
            <ul className="space-y-4 text-sm">
              <li>
                <span className="font-bold text-foreground">Owner</span>
                <p className="text-foreground/60 mt-1">Full access to settings, billing, team management, and deletions.</p>
              </li>
              <li>
                <span className="font-bold text-foreground">Event Manager</span>
                <p className="text-foreground/60 mt-1">Can create/edit events, export participants, and send mass emails.</p>
              </li>
              <li>
                <span className="font-bold text-foreground">Sponsorships</span>
                <p className="text-foreground/60 mt-1">Can access CRM, view deals, and chat with sponsors.</p>
              </li>
            </ul>
            <button className="mt-6 text-sm font-medium text-primary hover:text-primary-dark transition-colors flex items-center gap-1">
              <Settings2 className="w-4 h-4" /> Manage Roles
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
