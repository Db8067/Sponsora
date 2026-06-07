"use client";

import React, { useEffect, useState } from "react";
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, Calendar as CalendarIcon, MapPin } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*, organizer_profiles(org_name)")
          .order("created_at", { ascending: false });
        
        if (data) setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchEvents();
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Admin Events</h1>
          <p className="text-foreground/70 mt-1">Manage all events across the platform.</p>
        </div>
      </div>

      <div className="bg-background rounded-2xl shadow-sm border border-black/5 dark:border-white/10 overflow-hidden glass">
        <div className="p-4 border-b border-black/5 dark:border-white/10 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
            <input 
              type="text" 
              placeholder="Search events..." 
              className="w-full bg-white/5 rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-foreground/50 border border-black/5 dark:border-white/10 outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white/5 border border-black/5 dark:border-white/10 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        {/* Mobile View - Cards */}
        <div className="md:hidden divide-y divide-black/5 dark:divide-white/5">
          {loading ? (
            <div className="p-8 text-center text-foreground/50">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="p-8 text-center text-foreground/50">No events found.</div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="p-4 flex flex-col gap-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-foreground text-base line-clamp-1">{event.title}</span>
                    <span className="text-xs text-foreground/60">{event.organizer_profiles?.org_name || "Admin"}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                    event.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-black/5 text-foreground/70 dark:bg-white/10 dark:text-foreground/70'
                  }`}>
                    {event.status || "Draft"}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-foreground/70">
                  <div className="flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-primary" />
                    {event.start_at ? new Date(event.start_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "-"}
                  </div>
                  <div className="flex items-center gap-1.5 line-clamp-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    {event.venue_type === "online" ? "Online" : "In-Person"}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5 dark:border-white/5">
                  <div className="flex gap-2">
                    {event.is_featured && <span className="bg-accent/10 text-accent text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Featured</span>}
                  </div>
                  <div className="flex gap-3 text-foreground/50">
                    <button className="hover:text-primary transition-colors"><Eye className="w-4 h-4" /></button>
                    <button className="hover:text-blue-600 transition-colors"><Edit className="w-4 h-4" /></button>
                    <button className="hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View - Table */}
        <div className="hidden md:block overflow-x-auto min-h-[300px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-black/5 dark:bg-white/5 text-foreground/60">
              <tr>
                <th className="px-6 py-3 font-medium">Event Name</th>
                <th className="px-6 py-3 font-medium">Organizer</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-foreground/50">Loading events...</td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-foreground/50">No events found.</td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground max-w-[250px] truncate" title={event.title}>{event.title}</span>
                        {event.is_featured && <span className="bg-accent/10 text-accent text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Featured</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-foreground/70">
                      {event.organizer_profiles?.org_name || "Admin"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                        event.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-black/5 text-foreground/70 dark:bg-white/10 dark:text-foreground/70'
                      }`}>
                        {event.status ? event.status.charAt(0).toUpperCase() + event.status.slice(1) : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-foreground/70">
                      {event.start_at ? new Date(event.start_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 text-foreground/50">
                        <button className="p-1.5 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"><Eye className="w-4 h-4" /></button>
                        <button className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Edit className="w-4 h-4" /></button>
                        <button className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-foreground/60">
          <span>Showing {events.length > 0 ? 1 : 0} to {events.length} of {events.length} events</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-md border border-black/10 dark:border-white/10 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 rounded-md bg-primary text-white">1</button>
            <button className="px-3 py-1 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
