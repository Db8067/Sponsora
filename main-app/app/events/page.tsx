"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Filter, Calendar, Users, Trophy, Ticket, MapPin, Zap } from "lucide-react";
import { supabase } from "@/lib/supabase";

type EventType = {
  id: string;
  title: string;
  slug: string;
  short_summary: string;
  banner_url: string;
  start_at: string;
  venue_type: string;
  is_paid: boolean;
  entry_fee: number;
  max_participants: number;
  status: string;
  is_featured: boolean;
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (data) setEvents(data);
      setLoading(false);
    };

    fetchEvents();

    const channel = supabase
      .channel("public:events_main")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "events" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newEvent = payload.new as EventType;
            if (newEvent.status === "published") {
              setEvents((prev) => [newEvent, ...prev]);
            }
          } else if (payload.eventType === "UPDATE") {
            const updatedEvent = payload.new as EventType;
            if (updatedEvent.status === "published") {
              setEvents((prev) => {
                const exists = prev.find((e) => e.id === updatedEvent.id);
                if (exists) {
                  return prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e));
                }
                return [updatedEvent, ...prev];
              });
            } else {
              setEvents((prev) => prev.filter((e) => e.id !== updatedEvent.id));
            }
          } else if (payload.eventType === "DELETE") {
            setEvents((prev) => prev.filter((e) => e.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Explore Events</h1>
          <p className="text-foreground/70 text-lg">Discover and register for upcoming events across the country.</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search events by name, organizer, or city..." 
              className="w-full bg-gray-50 dark:bg-slate-800 rounded-xl pl-12 pr-4 py-3 text-foreground placeholder:text-gray-500 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <button className="flex items-center gap-2 whitespace-nowrap bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
              <Filter className="w-4 h-4" /> Category
            </button>
            <button className="flex items-center gap-2 whitespace-nowrap bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
              <Calendar className="w-4 h-4" /> Date
            </button>
            <button className="flex items-center gap-2 whitespace-nowrap bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
              Free / Paid
            </button>
          </div>
        </div>

        {/* Active Filters / Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">All Events</span>
          <span className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-full text-sm hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors">Hackathons</span>
          <span className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-full text-sm hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors">Cultural Fests</span>
          <span className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-full text-sm hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors">Workshops</span>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full py-20 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="col-span-full py-20 text-center text-foreground/50">
              <p>No events found.</p>
            </div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all group flex flex-col">
                <div className="h-48 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 w-full relative overflow-hidden">
                  {event.banner_url ? (
                    <img src={event.banner_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Zap className="w-12 h-12 text-primary/40" />
                    </div>
                  )}
                  {event.is_featured && (
                    <div className="absolute top-4 right-4 bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-widest">
                      FEATURED
                    </div>
                  )}
                  {event.is_paid ? (
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-foreground flex items-center gap-1 shadow-md uppercase tracking-widest">
                      <Ticket className="w-3 h-3" /> PAID
                    </div>
                  ) : (
                    <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-md uppercase tracking-widest">
                      FREE
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors mb-4 line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-foreground/60 mb-6 line-clamp-2">
                      {event.short_summary || "No description provided."}
                    </p>
                    <div className="space-y-3 mb-6 text-sm font-medium text-foreground/80">
                      {event.start_at && (
                        <div className="flex items-center gap-3"><Calendar className="w-4 h-4 text-primary" /> {new Date(event.start_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                      )}
                      <div className="flex items-center gap-3 capitalize"><MapPin className="w-4 h-4 text-primary" /> {event.venue_type.replace('_', ' ')}</div>
                      {event.max_participants > 0 && <div className="flex items-center gap-3"><Users className="w-4 h-4 text-primary" /> {event.max_participants} Limit</div>}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center mt-auto">
                    <span className={`font-semibold ${event.is_paid ? 'text-foreground' : 'text-success'}`}>
                      {event.is_paid ? `₹${event.entry_fee}` : 'Free Entry'}
                    </span>
                    <Link href={`/events/${event.slug}`} className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {events.length > 0 && (
          <div className="mt-12 text-center">
            <button className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 text-foreground px-8 py-3 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
              Load More Events
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
