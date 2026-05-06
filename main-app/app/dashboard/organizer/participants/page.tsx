"use client";

import { Users, Mail, Download, Search, Activity, Filter } from "lucide-react";
import { motion } from "framer-motion";

export default function ParticipantsAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Participants</h1>
          <p className="text-foreground/70 mt-1">Manage and analyze your event attendees.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/5 border border-white/10 text-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-all shadow-md flex items-center gap-2">
            <Mail className="w-4 h-4" /> Mass Email
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-foreground/60 text-sm font-medium mb-1">Total Registered</h3>
          <p className="text-3xl font-bold text-foreground">3,242</p>
        </div>
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-foreground/60 text-sm font-medium mb-1">Avg. Check-in Rate</h3>
          <p className="text-3xl font-bold text-foreground text-success">84%</p>
        </div>
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-foreground/60 text-sm font-medium mb-1">Top College/Org</h3>
          <p className="text-xl font-bold text-foreground mt-2 truncate">Stanford University</p>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden flex flex-col h-[500px]">
        <div className="p-4 border-b border-white/10 bg-white/5 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input 
              type="text" 
              placeholder="Search participants by name, email, or ticket ID..." 
              className="w-full bg-transparent border-none focus:outline-none focus:ring-0 pl-9 text-sm text-foreground"
            />
          </div>
          <button className="p-2 hover:bg-white/10 rounded-lg text-foreground/70 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/20 text-xs uppercase tracking-wider text-foreground/60 font-semibold sticky top-0 backdrop-blur-md">
                <th className="p-4">Participant</th>
                <th className="p-4">Event</th>
                <th className="p-4">Ticket Type</th>
                <th className="p-4">Registration Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: "Alice Johnson", email: "alice@example.com", event: "Global AI Hackathon", type: "General Admission", date: "Oct 01, 2026", status: "Checked In" },
                { name: "Bob Smith", email: "bob@stanford.edu", event: "Global AI Hackathon", type: "VIP", date: "Sep 28, 2026", status: "Confirmed" },
                { name: "Charlie Davis", email: "charlie@gmail.com", event: "React India Conf", type: "Student Pass", date: "Sep 15, 2026", status: "Cancelled" },
                { name: "Diana Prince", email: "diana@amazon.com", event: "Web3 Meetup", type: "General Admission", date: "Oct 10, 2026", status: "Pending" },
              ].map((user, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors cursor-pointer">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-foreground">{user.name}</p>
                        <p className="text-xs text-foreground/60">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-foreground/80">{user.event}</td>
                  <td className="p-4 text-sm font-medium">{user.type}</td>
                  <td className="p-4 text-sm text-foreground/60">{user.date}</td>
                  <td className="p-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                      user.status === "Checked In" ? "bg-green-500/20 text-green-500" :
                      user.status === "Confirmed" ? "bg-blue-500/20 text-blue-500" :
                      user.status === "Cancelled" ? "bg-red-500/20 text-red-500" :
                      "bg-yellow-500/20 text-yellow-500"
                    }`}>
                      {user.status}
                    </span>
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
