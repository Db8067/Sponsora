"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Calendar, MapPin, Users, Ticket, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type EventType = {
  id: string;
  title: string;
  slug: string;
  short_summary: string;
  banner_url: string;
  start_at: string;
  venue_type: string;
  venue_address: string;
  is_paid: boolean;
  entry_fee: number;
  max_participants: number;
  status: string;
};

export default function EventGrid() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Initial Fetch
    const fetchEvents = async () => {
      const { data, error } = await (supabase.from("events") as any)
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(6);

      if (data) setEvents(data);
      setLoading(false);
    };

    fetchEvents();

    // 2. Real-time Subscription
    const channel = supabase
      .channel("public:events")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "events" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newEvent = payload.new as EventType;
            if (newEvent.status === "published") {
              setEvents((prev) => [newEvent, ...prev].slice(0, 6));
            }
          } else if (payload.eventType === "UPDATE") {
            const updatedEvent = payload.new as EventType;
            if (updatedEvent.status === "published") {
              setEvents((prev) => {
                const exists = prev.find((e) => e.id === updatedEvent.id);
                if (exists) {
                  return prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e));
                }
                return [updatedEvent, ...prev].slice(0, 6);
              });
            } else {
              // If status changed to draft
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (events.length === 0) {
    return null; // Hide section if no events exist yet
  }

  return (
    <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/5 relative">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div className="text-left">
          <div className="flex items-center gap-3 mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <p className="text-success font-bold uppercase tracking-widest text-xs">Live Feed</p>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tighter">LATEST EVENTS</h2>
        </div>
        <Link href="/events" className="flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all">
          View All Events <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div key={event.id} className="group relative glass rounded-3xl overflow-hidden hover:-translate-y-2 transition-all border border-white/5 hover:border-primary/30 flex flex-col h-full bg-white/5 dark:bg-[#121214]">
            {/* Banner */}
            <div className="relative h-56 w-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
              {event.banner_url ? (
                <img src={event.banner_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-primary/20 to-accent/20">
                  <Zap className="w-12 h-12 text-primary/40" />
                </div>
              )}
              {event.is_paid ? (
                <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1 shadow-lg">
                  <Ticket className="w-3 h-3" /> ₹{event.entry_fee}
                </div>
              ) : (
                <div className="absolute top-4 right-4 bg-green-500/90 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg uppercase tracking-wider">
                  Free
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-black text-xl mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {event.title}
              </h3>
              <p className="text-sm text-foreground/60 mb-6 line-clamp-2 min-h-[40px]">
                {event.short_summary || "No description provided."}
              </p>

              <div className="space-y-3 mt-auto">
                {event.start_at && (
                  <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                    <Calendar className="w-4 h-4 text-primary" />
                    {new Date(event.start_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="capitalize">{event.venue_type.replace('_', ' ')}</span>
                </div>
                {event.max_participants > 0 && (
                  <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                    <Users className="w-4 h-4 text-primary" />
                    {event.max_participants} Spots Limit
                  </div>
                )}
              </div>

              <Link href={`/events/${event.slug}`} className="mt-8 block w-full text-center bg-white/10 hover:bg-primary text-foreground hover:text-white py-3 rounded-xl font-bold transition-colors">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
