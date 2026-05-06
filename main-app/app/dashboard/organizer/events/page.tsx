"use client";

import { useState } from "react";
import { Plus, MoreVertical, Edit3, Image as ImageIcon, XCircle, Award, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ManageEventsPage() {
  const [events] = useState([
    { id: 1, name: "Global AI Hackathon 2026", date: "Oct 15, 2026", status: "Published", registrations: 342, revenue: "₹45,000" },
    { id: 2, name: "Web3 Builders Meetup", date: "Nov 02, 2026", status: "Draft", registrations: 0, revenue: "₹0" },
    { id: 3, name: "React India Conf", date: "Sep 10, 2026", status: "Completed", registrations: 850, revenue: "₹1,20,000" },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Manage Events</h1>
          <p className="text-foreground/70 mt-1">Create, edit, and track your events.</p>
        </div>
        <Link href="/dashboard/organizer/events/create" className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-all shadow-md hover:shadow-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Event
        </Link>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 font-semibold text-foreground/80 text-sm">Event Name</th>
                <th className="p-4 font-semibold text-foreground/80 text-sm">Date</th>
                <th className="p-4 font-semibold text-foreground/80 text-sm">Status</th>
                <th className="p-4 font-semibold text-foreground/80 text-sm">Registrations</th>
                <th className="p-4 font-semibold text-foreground/80 text-sm">Revenue</th>
                <th className="p-4 font-semibold text-foreground/80 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4 font-bold text-foreground">{event.name}</td>
                  <td className="p-4 text-sm text-foreground/70">{event.date}</td>
                  <td className="p-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      event.status === "Published" ? "bg-green-500/20 text-green-500" :
                      event.status === "Draft" ? "bg-yellow-500/20 text-yellow-500" :
                      "bg-blue-500/20 text-blue-500"
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="p-4 font-medium">{event.registrations}</td>
                  <td className="p-4 font-medium text-success">{event.revenue}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button title="Edit" className="p-2 hover:bg-white/10 rounded-lg text-foreground/70 hover:text-primary transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button title="Gallery" className="p-2 hover:bg-white/10 rounded-lg text-foreground/70 hover:text-accent transition-colors">
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button title="Issue Certificates" className="p-2 hover:bg-white/10 rounded-lg text-foreground/70 hover:text-purple-500 transition-colors">
                        <Award className="w-4 h-4" />
                      </button>
                      <button title="Check-in App" className="p-2 hover:bg-white/10 rounded-lg text-foreground/70 hover:text-green-500 transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button title="Cancel Event" className="p-2 hover:bg-red-500/10 rounded-lg text-foreground/70 hover:text-red-500 transition-colors">
                        <XCircle className="w-4 h-4" />
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
