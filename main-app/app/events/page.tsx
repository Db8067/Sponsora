"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Filter, Calendar, Zap, MapPin, Trophy, Sparkles, Code, Palette, DollarSign, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

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
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 lg:px-12 max-w-[1000px] mx-auto">
      
      {/* Header & Search */}
      <div className="mb-16">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-4 tracking-tight">Discover Events</h1>
        <p className="text-foreground/60 text-lg mb-8 max-w-2xl">
          Explore popular events near you, browse by category, or check out some of the great community calendars.
        </p>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <input 
              type="text" 
              placeholder="Search hackathons, fests..." 
              className="w-full bg-transparent pl-12 pr-4 py-3 text-foreground placeholder:text-foreground/40 border-none outline-none focus:ring-0"
            />
          </div>
          <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-foreground px-6 py-3 rounded-xl font-medium transition-colors border border-white/5">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      {/* Popular Events */}
      <section className="mb-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-xl font-bold text-foreground">Popular Events</h2>
            <p className="text-foreground/50 text-sm mt-1">New Delhi</p>
          </div>
          <Link href="/events" className="hidden sm:flex items-center gap-2 text-sm font-medium bg-white/5 px-4 py-1.5 rounded-full hover:bg-white/10 border border-white/5 transition-colors">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="py-20 text-foreground/50 text-sm border border-white/5 rounded-2xl flex items-center justify-center bg-white/5">
            <p>No events found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {events.map((event) => (
              <Link href={`/events/${event.slug}`} key={event.id} className="group flex gap-4 items-start">
                {/* Compact Square Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl bg-white/5 overflow-hidden border border-white/5">
                  {event.banner_url ? (
                    <img src={event.banner_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Zap className="w-6 h-6 text-foreground/20" />
                    </div>
                  )}
                </div>
                
                {/* Event Details */}
                <div className="flex-1 min-w-0 py-1">
                  {event.start_at && (
                    <p className="text-xs sm:text-sm font-medium text-primary mb-1">
                      {new Date(event.start_at).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}, {new Date(event.start_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </p>
                  )}
                  <h3 className="font-bold text-base sm:text-lg text-foreground leading-tight mb-1 truncate">
                    {event.title}
                  </h3>
                  <p className="text-sm text-foreground/50 truncate">
                    {event.venue_type === 'online' ? 'Online' : (event.venue_address || 'TBA')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Browse by Category */}
      <section className="mb-20">
        <h2 className="text-xl font-bold text-foreground mb-8">Browse by Category</h2>
        <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar snap-x snap-mandatory">
          {[
            { name: "Tech", count: "4K Events", icon: Code, color: "text-blue-400" },
            { name: "Arts & Culture", count: "2K Events", icon: Palette, color: "text-purple-400" },
            { name: "Hackathons", count: "800 Events", icon: Trophy, color: "text-yellow-400" },
            { name: "Sponsorships", count: "1K Opportunities", icon: DollarSign, color: "text-green-400" },
            { name: "Workshops", count: "3K Events", icon: Sparkles, color: "text-pink-400" },
          ].map((cat, idx) => (
            <Link href={`/events?category=${cat.name.toLowerCase()}`} key={idx} className="snap-start shrink-0 w-64 p-4 rounded-[1.5rem] bg-[#1A1A1D] border border-white/5 hover:border-white/10 hover:bg-[#222226] transition-all flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                <cat.icon className={`w-6 h-6 ${cat.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{cat.name}</h3>
                <p className="text-sm text-foreground/50">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Explore Local Events (Mocked) */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-6">Explore Local Events</h2>
        
        {/* Regions */}
        <div className="flex overflow-x-auto gap-6 pb-6 hide-scrollbar text-sm font-medium text-foreground/50 border-b border-white/10 mb-8">
          <button className="text-foreground shrink-0 border-b-2 border-foreground pb-4 -mb-[25px]">Asia & Pacific</button>
          <button className="shrink-0 hover:text-foreground transition-colors pb-4">Europe</button>
          <button className="shrink-0 hover:text-foreground transition-colors pb-4">Africa</button>
          <button className="shrink-0 hover:text-foreground transition-colors pb-4">North America</button>
          <button className="shrink-0 hover:text-foreground transition-colors pb-4">South America</button>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
          {[
            { city: "Bengaluru", count: "30 Events", color: "bg-yellow-500/20 text-yellow-500" },
            { city: "New Delhi", count: "16 Events", color: "bg-orange-500/20 text-orange-500" },
            { city: "Mumbai", count: "12 Events", color: "bg-red-500/20 text-red-500" },
            { city: "Singapore", count: "35 Events", color: "bg-green-500/20 text-green-500" },
            { city: "Tokyo", count: "27 Events", color: "bg-pink-500/20 text-pink-500" },
            { city: "Seoul", count: "14 Events", color: "bg-blue-500/20 text-blue-500" },
            { city: "Sydney", count: "16 Events", color: "bg-amber-500/20 text-amber-500" },
            { city: "Dubai", count: "12 Events", color: "bg-purple-500/20 text-purple-500" },
          ].map((loc, idx) => (
            <Link href={`/events?city=${loc.city.toLowerCase()}`} key={idx} className="flex items-center gap-3 group">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${loc.color}`}>
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{loc.city}</h3>
                <p className="text-xs text-foreground/50">{loc.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
