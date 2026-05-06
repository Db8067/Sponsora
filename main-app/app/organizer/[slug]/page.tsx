"use client";

import { Globe, MapPin, ExternalLink, Calendar, Users, Award, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function OrganizerProfilePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
        
        {/* Header Profile Section */}
        <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary font-bold text-4xl shadow-xl border border-white/10 shrink-0">
              TC
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="font-heading text-4xl font-bold text-foreground">Tech Club HQ</h1>
                    <ShieldCheck className="w-6 h-6 text-success" title="Verified Organizer" />
                  </div>
                  <p className="text-xl text-foreground/70">Building the biggest tech communities in India.</p>
                </div>
                <button className="bg-primary text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-primary-dark transition-all flex items-center gap-2 whitespace-nowrap shrink-0">
                  Follow Organizer
                </button>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-foreground/60 mb-6">
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                  <Globe className="w-4 h-4" /> techclubhq.com
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                  <MapPin className="w-4 h-4" /> Bangalore, India
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 text-success font-medium">
                  <Award className="w-4 h-4" /> Top Organizer 2025
                </div>
              </div>

              <div className="flex gap-8 border-t border-white/10 pt-6 mt-6">
                <div>
                  <p className="text-3xl font-bold text-foreground">14</p>
                  <p className="text-sm text-foreground/60">Events Hosted</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">25k+</p>
                  <p className="text-sm text-foreground/60">Total Attendees</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">4.9</p>
                  <p className="text-sm text-foreground/60">Avg. Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="font-heading text-2xl font-bold text-foreground">Upcoming Events</h2>
            
            <div className="space-y-4">
              {[
                { name: "Global AI Hackathon 2026", date: "Oct 15-17, 2026", type: "Hackathon", mode: "In-Person" },
                { name: "Web3 Builders Meetup", date: "Nov 02, 2026", type: "Meetup", mode: "Online" },
              ].map((event, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 5 }}
                  className="glass p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex flex-col items-center justify-center border border-white/10 shrink-0">
                      <span className="text-xs font-bold text-foreground/60">{event.date.split(' ')[0]}</span>
                      <span className="text-lg font-bold text-foreground">{event.date.split(' ')[1].replace(',', '')}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{event.name}</h3>
                      <p className="text-sm text-foreground/60">{event.date} • {event.mode}</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="inline-flex items-center gap-1.5 bg-white/5 text-foreground/80 text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10">
                      {event.type}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="space-y-8">
            <div className="glass p-6 rounded-2xl border-t-4 border-t-primary">
              <h2 className="font-heading text-xl font-bold text-foreground mb-4">About Us</h2>
              <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                Tech Club HQ is a community-first organization dedicated to bridging the gap between student developers and the tech industry. We host India's largest hackathons and technical meetups.
              </p>
              <h3 className="font-bold text-sm text-foreground mb-3">Looking to Sponsor?</h3>
              <Link href="#" className="w-full bg-primary/20 text-primary border border-primary/30 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-primary/30 transition-all flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4" /> View Sponsorship Deck
              </Link>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
