import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Calendar, MapPin, ArrowUp, Zap, Users, PenTool } from "lucide-react";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "Creative Workshops | Sponsora",
  description: "Join hands-on workshops, masterclasses, and skill-building sessions hosted by experts.",
};

const mockWorkshops = [
  {
    id: 1,
    title: "Advanced UI/UX Masterclass",
    date: "Aug 12 - 14, 2026",
    location: "Online",
    participants: "500+",
    sponsorship: true,
    image: "/images/workshops_doodle.png"
  },
  {
    id: 2,
    title: "Robotics Build-a-thon",
    date: "Sep 2, 2026",
    location: "Chennai, India",
    participants: "200+",
    sponsorship: false,
    image: "/images/workshops_doodle.png"
  },
  {
    id: 3,
    title: "Startup Fundraising 101",
    date: "Oct 5, 2026",
    location: "New York, USA",
    participants: "1,000+",
    sponsorship: true,
    image: "/images/workshops_doodle.png"
  }
];

export default function WorkshopsPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-6 lg:px-12 selection:bg-primary/30">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/10 via-background to-background pointer-events-none hidden dark:block"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Left Sidebar: Quick Switch & Filters */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm font-medium text-foreground/50">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Workshops</span>
          </nav>

          <div className="hidden lg:block bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold text-foreground mb-4">Categories</h3>
            <div className="flex flex-col gap-3">
              <Link href="/events/tech" className="text-foreground/60 hover:text-foreground transition-colors">Tech Events</Link>
              <Link href="/events/cultural" className="text-foreground/60 hover:text-foreground transition-colors">Cultural Fests</Link>
              <Link href="/events/workshops" className="text-pink-500 font-bold flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500" /> Workshops
              </Link>
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
            <h1 className="text-3xl font-black text-foreground tracking-tight">Workshops</h1>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 dark:bg-pink-500/20 text-pink-400 text-xs font-bold border border-pink-500/20 shrink-0">
              <PenTool className="w-3.5 h-3.5" /> Learning
            </div>
          </div>

          {/* Hero Section */}
          <div className="relative w-full rounded-[2rem] md:h-[300px] md:overflow-hidden mb-8 md:mb-12 md:border md:border-white/10 md:glass md:shadow-2xl">
            <div className="w-full h-[150px] md:absolute md:inset-0 md:h-full rounded-[2rem] md:rounded-none overflow-hidden relative">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-100 dark:opacity-60 opacity-90"
                style={{ backgroundImage: "url('/images/workshops_doodle.png')" }}
              />
              <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            </div>
            
            <div className="hidden md:flex relative z-10 flex-col justify-center md:p-12 md:h-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 dark:bg-pink-500/20 text-pink-400 text-sm font-bold w-fit mb-4 border border-pink-500/20">
                <PenTool className="w-4 h-4" /> Learning
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-foreground md:text-white mb-4 tracking-tight">Workshops</h1>
              <p className="hidden md:block text-foreground/70 md:text-white/70 max-w-xl text-lg font-medium">
                Get hands-on experience and build your skills. Join interactive sessions led by industry experts and creators.
              </p>
            </div>
          </div>

          {/* Event Listings */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Featured Upcoming</h2>
            <span className="text-sm font-medium text-foreground/50">{mockWorkshops.length} Events</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-20">
            {mockWorkshops.map((event) => (
              <div key={event.id} className="group relative bg-white dark:bg-[#1A1A1D] border border-black/5 dark:border-white/10 rounded-2xl md:rounded-3xl overflow-hidden hover:border-pink-500/50 dark:hover:border-pink-500/50 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-row md:flex-col">
                <div className="w-16 sm:w-20 md:w-full h-auto min-h-[80px] md:h-48 relative overflow-hidden shrink-0">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${event.image})` }}
                  />
                </div>
                <div className="p-3 md:p-6 flex flex-col flex-1 justify-center overflow-hidden">
                  <h3 className="text-[13px] sm:text-sm md:text-xl font-bold text-foreground mb-1 md:mb-3 line-clamp-2 leading-tight">{event.title}</h3>
                  <div className="flex flex-col gap-1 md:gap-2">
                    <div className="flex items-center gap-1.5 text-foreground/60 text-[10px] sm:text-[11px] md:text-sm">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4 shrink-0" /> <span className="truncate">{event.date}</span>
                    </div>
                  </div>
                  <button className="hidden md:block w-full mt-6 py-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-pink-500 hover:text-white text-foreground font-semibold border border-black/10 dark:border-white/10 hover:border-pink-500 transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Back to Top */}
      <BackToTop colorClass="bg-pink-500 text-white" />

    </div>
  );
}
