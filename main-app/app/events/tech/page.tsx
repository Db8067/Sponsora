import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Calendar, Code, CalendarX } from "lucide-react";
import BackToTop from "@/components/BackToTop";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Tech Events & Hackathons | Sponsora",
  description: "Discover upcoming hackathons, coding competitions, and AI summits. Find sponsorships or participate in the biggest tech events on Sponsora.",
};

export default async function TechEventsPage() {
  const { data: events, error } = await supabase
    .from('events')
    .select('*, categories!inner(*)')
    .eq('categories.slug', 'tech')
    .eq('status', 'published')
    .order('start_at', { ascending: true });

  const techEvents = events || [];

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 md:px-6 lg:px-12 selection:bg-primary/30 bg-gradient-to-b from-primary/10 to-background">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none hidden dark:block"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Left Sidebar: Quick Switch & Filters */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm font-medium text-foreground/50">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Tech</span>
          </nav>

          <div className="hidden lg:block bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold text-foreground mb-4">Categories</h3>
            <div className="flex flex-col gap-3">
              <Link href="/events/tech" className="text-primary font-bold flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Tech Events
              </Link>
              <Link href="/events/cultural" className="text-foreground/60 hover:text-foreground transition-colors">Cultural Fests</Link>
              <Link href="/events/workshops" className="text-foreground/60 hover:text-foreground transition-colors">Workshops</Link>
              <Link href="/events/seminars" className="text-foreground/60 hover:text-foreground transition-colors">Seminars</Link>
              <div className="my-2 h-[1px] bg-white/10" />
              <Link href="/events/past" className="text-foreground/60 hover:text-foreground transition-colors">Past Events</Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          
          {/* Mobile Only Header (Heading on left, badge on right) */}
          <div className="flex md:hidden items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl font-black text-foreground tracking-tight">Tech Events</h1>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/20 shrink-0">
              <Code className="w-3.5 h-3.5" /> Technology
            </div>
          </div>

          {/* Hero Section for Tech Events */}
          <div className="relative w-full rounded-[2rem] md:h-[300px] md:overflow-hidden mb-8 md:mb-12 md:border md:border-white/10 md:glass md:shadow-2xl">
            <div className="w-full h-[150px] md:absolute md:inset-0 md:h-full rounded-[2rem] md:rounded-none overflow-hidden relative">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-100 dark:opacity-60 opacity-90"
                style={{ backgroundImage: "url('/images/tech_events_doodle.png')" }}
              />
              <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            </div>
            
            <div className="hidden md:flex relative z-10 flex-col justify-center md:p-12 md:h-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-400 text-sm font-bold w-fit mb-4 border border-blue-500/20">
                <Code className="w-4 h-4" /> Technology
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-foreground md:text-white mb-4 tracking-tight">Tech Events</h1>
              <p className="hidden md:block text-foreground/70 md:text-white/70 max-w-xl text-lg font-medium">
                Dive into the world of innovation. Discover hackathons, coding competitions, and global AI summits happening near you.
              </p>
            </div>
          </div>

          {/* Event Listings */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Featured Upcoming</h2>
            <span className="text-sm font-medium text-foreground/50">{techEvents.length} Events</span>
          </div>

          {techEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                <CalendarX className="w-10 h-10 text-foreground/30" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">No Events Found</h3>
              <p className="text-foreground/60 max-w-md">There are currently no published events in this category. Check back later for upcoming tech events!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-20">
              {techEvents.map((event: any) => (
                <div key={event.id} className="group relative bg-white dark:bg-[#1A1A1D] border border-black/5 dark:border-white/10 rounded-2xl md:rounded-3xl overflow-hidden hover:border-primary/50 dark:hover:border-primary/50 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-row md:flex-col">
                  <div className="w-16 sm:w-20 md:w-full h-auto min-h-[80px] md:h-48 relative overflow-hidden shrink-0">
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${event.banner_url || '/images/tech_events_doodle.png'})` }}
                    />
                  </div>
                  <div className="p-3 md:p-6 flex flex-col flex-1 justify-center overflow-hidden">
                    <h3 className="text-[13px] sm:text-sm md:text-xl font-bold text-foreground mb-1 md:mb-3 line-clamp-2 leading-tight">{event.title}</h3>
                    <div className="flex flex-col gap-1 md:gap-2">
                      <div className="flex items-center gap-1.5 text-foreground/60 text-[10px] sm:text-[11px] md:text-sm">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4 shrink-0" /> 
                        <span className="truncate">
                          {event.start_at ? new Date(event.start_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'}
                        </span>
                      </div>
                    </div>
                    <Link href={`/events/${event.slug || event.id}`} className="hidden md:flex items-center justify-center w-full mt-6 py-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-primary hover:text-white text-foreground font-semibold border border-black/10 dark:border-white/10 hover:border-primary transition-all duration-300">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Back to Top */}
      <BackToTop colorClass="bg-primary text-primary-foreground" />

    </div>
  );
}
