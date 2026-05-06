"use client";

import { Bookmark, MapPin, Users, Calendar, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function UserBookmarksPage() {
  const bookmarks = [
    { id: 1, name: "Global AI Hackathon 2026", org: "TechFlow", location: "San Francisco, CA", attendees: "5k+", date: "Oct 15-17", match: "98%", ask: "₹50k - ₹2L", tags: ["AI", "Web3", "Developers"] },
    { id: 2, name: "React India Conf", org: "ReactDevs", location: "Bangalore, India", attendees: "2k+", date: "Sep 10", match: "92%", ask: "₹1L - ₹5L", tags: ["Frontend", "React"] },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Saved Events</h1>
        <p className="text-foreground/70 mt-1">Events you are interested in attending.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {bookmarks.map((event, i) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl overflow-hidden flex flex-col group relative"
          >
            <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-red-500 hover:bg-black/70 transition-colors z-10">
              <X className="w-4 h-4" />
            </button>
            
            <div className="p-5 flex-1 flex flex-col pt-10">
              <div className="mb-4">
                <p className="text-xs text-primary font-bold mb-1">{event.org}</p>
                <h3 className="font-bold text-lg text-foreground line-clamp-1">{event.name}</h3>
              </div>
              
              <div className="space-y-2 mb-6 text-sm text-foreground/70">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-foreground/40" /> {event.location}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-foreground/40" /> {event.attendees} attendees
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-foreground/40" /> {event.date}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-between items-center mt-auto">
                <Link href={`/events/${event.id}`} className="w-full bg-primary/10 hover:bg-primary hover:text-white text-primary px-4 py-2 rounded-xl text-sm font-bold transition-all text-center">
                  Register Now
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
