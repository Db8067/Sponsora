"use client";

import { Building2, Globe, MapPin, ExternalLink, Calendar, Users, Briefcase } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SponsorProfilePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
        
        {/* Header Profile Section */}
        <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary font-bold text-4xl shadow-xl border border-white/10 shrink-0">
              AC
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                <div>
                  <h1 className="font-heading text-4xl font-bold text-foreground mb-2">Acme Corp</h1>
                  <p className="text-xl text-foreground/70">Empowering the next generation of builders.</p>
                </div>
                <button className="bg-primary text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-primary-dark transition-all flex items-center gap-2 whitespace-nowrap shrink-0">
                  <Briefcase className="w-4 h-4" /> Message Sponsor
                </button>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-foreground/60 mb-6">
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                  <Globe className="w-4 h-4" /> acmecorp.com
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                  <MapPin className="w-4 h-4" /> San Francisco, CA
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                  <Building2 className="w-4 h-4" /> Enterprise Software
                </div>
              </div>

              <p className="text-foreground/80 leading-relaxed max-w-3xl">
                Acme Corp is a leading provider of enterprise cloud infrastructure. We are passionate about supporting student developers, hackathons, and open-source initiatives. We actively sponsor events that promote diversity in tech and innovative AI solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="font-heading text-2xl font-bold text-foreground">Previously Sponsored Events</h2>
            
            <div className="space-y-4">
              {[
                { name: "Global Hack Week '25", org: "MLH", date: "Aug 2025", impact: "10,000+ Hackers" },
                { name: "React India Conf", org: "ReactDevs", date: "Sep 2025", impact: "2,500 Attendees" },
                { name: "Web3 Builders Meetup", org: "CryptoHub", date: "Nov 2025", impact: "500 Developers" },
              ].map((event, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 5 }}
                  className="glass p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-foreground/40 group-hover:text-primary transition-colors border border-white/5">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{event.name}</h3>
                      <p className="text-sm text-foreground/60">Organized by {event.org} • {event.date}</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="inline-flex items-center gap-1.5 bg-success/10 text-success text-xs font-bold px-3 py-1.5 rounded-lg">
                      <Users className="w-3.5 h-3.5" /> {event.impact}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="space-y-8">
            <div className="glass p-6 rounded-2xl border-t-4 border-t-primary">
              <h2 className="font-heading text-xl font-bold text-foreground mb-4">Sponsorship Goals</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-foreground/80">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">1</div>
                  Support student-led hackathons globally.
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground/80">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">2</div>
                  Recruit top engineering talent.
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground/80">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">3</div>
                  Increase developer adoption of our APIs.
                </li>
              </ul>
            </div>

            <div className="glass p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <h2 className="font-heading text-xl font-bold text-foreground mb-2">Careers at Acme</h2>
                <p className="text-sm text-foreground/70 mb-6">We're always looking for brilliant minds. Check out our open roles.</p>
                <Link href="#" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-primary transition-colors">
                  View Job Board <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
