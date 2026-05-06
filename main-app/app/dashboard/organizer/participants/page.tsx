"use client";

import { Users, Mail, Download, Search, Activity, Filter, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import ResponsiveTable from "@/components/ui/ResponsiveTable";

export default function ParticipantsAnalyticsPage() {
  const participants = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", event: "Global AI Hackathon", type: "General Admission", date: "Oct 01, 2026", status: "Checked In" },
    { id: 2, name: "Bob Smith", email: "bob@stanford.edu", event: "Global AI Hackathon", type: "VIP", date: "Sep 28, 2026", status: "Confirmed" },
    { id: 3, name: "Charlie Davis", email: "charlie@gmail.com", event: "React India Conf", type: "Student Pass", date: "Sep 15, 2026", status: "Cancelled" },
    { id: 4, name: "Diana Prince", email: "diana@amazon.com", event: "Web3 Meetup", type: "General Admission", date: "Oct 10, 2026", status: "Pending" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground tracking-tight">PARTICIPANTS</h1>
          <p className="text-foreground/50 text-sm mt-1 uppercase font-bold tracking-widest">Manage event attendees</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none glass border-white/10 text-foreground px-4 py-3 rounded-2xl text-sm font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            <Download className="w-4 h-4 text-primary" /> <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex-1 sm:flex-none bg-primary text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" /> <span className="hidden sm:inline">Mass Email</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="glass p-5 sm:p-6 rounded-3xl">
          <p className="text-foreground/40 text-[10px] font-black uppercase tracking-widest mb-1">Total Registered</p>
          <p className="text-2xl sm:text-4xl font-black text-foreground">3,242</p>
        </div>
        <div className="glass p-5 sm:p-6 rounded-3xl">
          <p className="text-foreground/40 text-[10px] font-black uppercase tracking-widest mb-1">Check-in Rate</p>
          <p className="text-2xl sm:text-4xl font-black text-success">84%</p>
        </div>
        <div className="glass p-5 sm:p-6 rounded-3xl col-span-2 lg:col-span-1">
          <p className="text-foreground/40 text-[10px] font-black uppercase tracking-widest mb-1">Top College</p>
          <p className="text-lg sm:text-xl font-bold text-foreground truncate">Stanford University</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="glass p-2 rounded-2xl flex gap-2 border-white/10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
            <input 
              type="text" 
              placeholder="Search by name, email, ticket..." 
              className="w-full bg-transparent border-none focus:outline-none focus:ring-0 pl-10 py-3 text-sm text-foreground"
            />
          </div>
          <button className="w-12 h-12 flex items-center justify-center hover:bg-white/5 rounded-xl transition-all">
            <Filter className="w-5 h-5 text-foreground/40" />
          </button>
        </div>

        <ResponsiveTable 
          data={participants}
          columns={[
            { 
              header: "Participant", 
              accessor: (p) => (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-[10px]">
                    {p.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm truncate">{p.name}</p>
                    <p className="text-[10px] text-foreground/40 truncate">{p.email}</p>
                  </div>
                </div>
              )
            },
            { header: "Event", accessor: "event", className: "hidden lg:table-cell" },
            { header: "Ticket", accessor: "type" },
            { header: "Date", accessor: "date", className: "hidden sm:table-cell" },
            { 
              header: "Status", 
              accessor: (p) => (
                <span className={`text-[10px] font-black uppercase tracking-tighter px-2.5 py-1 rounded-md ${
                  p.status === "Checked In" ? "bg-green-500/20 text-green-500" :
                  p.status === "Confirmed" ? "bg-blue-500/20 text-blue-500" :
                  p.status === "Cancelled" ? "bg-red-500/20 text-red-500" :
                  "bg-yellow-500/20 text-yellow-500"
                }`}>
                  {p.status}
                </span>
              )
            }
          ]}
          mobileCardTitle={(p) => p.name}
          mobileCardSubtitle={(p) => p.email}
          actions={(p) => (
            <button className="p-2 hover:bg-white/10 rounded-xl">
              <MoreVertical className="w-5 h-5 text-foreground/40" />
            </button>
          )}
        />
      </div>
    </div>
  );
}
