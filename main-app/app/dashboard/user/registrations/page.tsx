"use client";

import { Calendar, MapPin, Ticket, ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function UserRegistrationsPage() {
  const registrations = [
    { id: 1, name: "Global AI Hackathon 2026", date: "Oct 15, 2026", venue: "San Francisco / Online", status: "Confirmed", ticket: "HACK-4021" },
    { id: 2, name: "React India Conf", date: "Sep 10, 2026", venue: "Bangalore", status: "Waitlisted", ticket: "N/A" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">My Registrations</h1>
        <p className="text-foreground/70 mt-1">Events you've signed up for.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {registrations.map((reg, i) => (
          <motion.div 
            key={reg.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-primary/50 transition-all"
          >
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex flex-col items-center justify-center border border-white/10 shrink-0">
                <span className="text-xs font-bold text-foreground/60">{reg.date.split(' ')[0]}</span>
                <span className="text-lg font-bold text-foreground">{reg.date.split(' ')[1].replace(',', '')}</span>
              </div>
              <div>
                <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">{reg.name}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-foreground/60 mt-2">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {reg.date}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {reg.venue}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <div className="text-right sm:text-right w-full sm:w-auto">
                <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-1">Status</p>
                <span className={`text-sm font-bold ${reg.status === 'Confirmed' ? 'text-success' : 'text-orange-500'}`}>
                  {reg.status}
                </span>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                {reg.status === 'Confirmed' && (
                  <button className="flex-1 sm:flex-none bg-white/5 border border-white/10 text-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Ticket
                  </button>
                )}
                <Link href={`/events/${reg.id}`} className="flex-1 sm:flex-none bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-all shadow-md flex items-center justify-center gap-2">
                  Event Page <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
