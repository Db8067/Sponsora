"use client";

import { useState, useEffect } from "react";
import { Search, Filter, MapPin, Users, Calendar, ArrowRight, Sparkles, Bookmark } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DiscoverEventsPage() {
  const [filterMode, setFilterMode] = useState("all");
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { supabase } = await import("@/lib/supabase");
      const { data: evs } = await supabase.from('sponsora_events').select('*, hackathon:hackathons(*), category:sponsora_categories(*)').eq('is_published', true);
      if (evs) {
        setEvents(evs);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Discover Events</h1>
        <p className="text-foreground/70 mt-1">Find high-ROI opportunities powered by AI matching.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
          <input 
            type="text" 
            placeholder="Search by event name, category, or location..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
          />
        </div>
        <button className="bg-white/5 border border-white/10 text-foreground px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {["All Matches", "High Budget (₹1L+)", "Low Budget (<₹50k)", "In-Kind Only"].map((filter, i) => (
          <button 
            key={i}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? "bg-primary text-white" : "bg-white/5 text-foreground/70 hover:bg-white/10 hover:text-foreground"}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {events.length === 0 ? (
        <p className="text-foreground/70">No live events available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <motion.div 
              key={event.id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl overflow-hidden flex flex-col group"
            >
              <div className="h-32 bg-gradient-to-br from-primary/20 to-accent/20 relative p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="bg-black/50 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-yellow-400" /> {event.match || "High"} Match
                  </span>
                  <button className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-4">
                  <p className="text-xs text-primary font-bold mb-1">{event.hackathon?.organization_name || event.org || "Organizer"}</p>
                  <h3 className="font-bold text-lg text-foreground line-clamp-1">{event.title || event.name || event.hackathon?.name || "Event Title"}</h3>
                </div>
                
                <div className="space-y-2 mb-6 text-sm text-foreground/70">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-foreground/40" /> {event.location || event.hackathon?.location || "TBA"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-foreground/40" /> {event.expected_attendees || event.attendees || "TBA"} attendees
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-foreground/40" /> {event.start_date || event.date ? new Date(event.start_date || event.date).toLocaleDateString() : "TBA"}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {event.tags ? event.tags.map((tag: string) => (
                    <span key={tag} className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded-md text-foreground/70">
                      {tag}
                    </span>
                  )) : (
                    <span className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded-md text-foreground/70">
                      {event.category?.name || "General"}
                    </span>
                  )}
                </div>

                <div className="pt-4 border-t border-black/5 dark:border-white/10 flex justify-between items-center mt-auto">
                  <div>
                    <p className="text-xs text-foreground/50">Sponsorship Ask</p>
                    <p className="font-bold text-foreground">{event.ask || "In-kind"}</p>
                  </div>
                  <Link href={`/events/${event.slug || event.id}`} className="bg-primary/10 hover:bg-primary hover:text-white text-primary px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2">
                    View <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
