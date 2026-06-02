import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Calendar, MapPin, ArrowUp, Zap, Users, Mic } from "lucide-react";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "Seminars & Keynotes | Sponsora",
  description: "Attend insightful academic talks, keynotes, and seminars from renowned industry leaders and academicians.",
};

const mockSeminars = [
  {
    id: 1,
    title: "Future of AI in Education",
    date: "Sep 15, 2026",
    location: "London, UK",
    participants: "800+",
    sponsorship: true,
    image: "/images/seminars_doodle.png"
  },
  {
    id: 2,
    title: "Global Economics Summit",
    date: "Oct 22, 2026",
    location: "Online",
    participants: "5,000+",
    sponsorship: false,
    image: "/images/seminars_doodle.png"
  },
  {
    id: 3,
    title: "Sustainable Architecture Keynote",
    date: "Nov 10, 2026",
    location: "Singapore",
    participants: "1,200+",
    sponsorship: true,
    image: "/images/seminars_doodle.png"
  }
];

export default function SeminarsPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-6 lg:px-12 selection:bg-primary/30">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-background to-background pointer-events-none hidden dark:block"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Left Sidebar: Quick Switch & Filters */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm font-medium text-foreground/50">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Seminars</span>
          </nav>

          <div className="hidden lg:block bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold text-foreground mb-4">Categories</h3>
            <div className="flex flex-col gap-3">
              <Link href="/events/tech" className="text-foreground/60 hover:text-foreground transition-colors">Tech Events</Link>
              <Link href="/events/cultural" className="text-foreground/60 hover:text-foreground transition-colors">Cultural Fests</Link>
              <Link href="/events/workshops" className="text-foreground/60 hover:text-foreground transition-colors">Workshops</Link>
              <Link href="/events/seminars" className="text-purple-500 font-bold flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Seminars
              </Link>
              <div className="my-2 h-[1px] bg-white/10" />
              <Link href="/events/past" className="text-foreground/60 hover:text-foreground transition-colors">Past Events</Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          
          {/* Hero Section */}
          <div className="flex flex-col md:block relative w-full rounded-[2rem] md:h-[300px] md:overflow-hidden mb-12 md:border md:border-white/10 md:glass md:shadow-2xl">
            <div className="w-full h-[150px] md:absolute md:inset-0 md:h-full rounded-[2rem] md:rounded-none overflow-hidden relative">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-100 dark:opacity-60 opacity-90"
                style={{ backgroundImage: "url('/images/seminars_doodle.png')" }}
              />
              <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            </div>
            
            <div className="relative z-10 flex flex-col justify-center mt-6 md:mt-0 p-0 md:p-12 md:h-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-400 text-sm font-bold w-fit mb-4 border border-purple-500/20">
                <Mic className="w-4 h-4" /> Academic & Industry
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-foreground md:text-white mb-4 tracking-tight">Seminars</h1>
              <p className="hidden md:block text-foreground/70 md:text-white/70 max-w-xl text-lg font-medium">
                Expand your knowledge horizons. Attend elegant keynote presentations and talks by thought leaders.
              </p>
            </div>
          </div>

          {/* Event Listings */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Featured Upcoming</h2>
            <span className="text-sm font-medium text-foreground/50">{mockSeminars.length} Events</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-20">
            {mockSeminars.map((event) => (
              <div key={event.id} className="group relative bg-white dark:bg-[#1A1A1D] border border-black/5 dark:border-white/10 rounded-2xl md:rounded-3xl overflow-hidden hover:border-purple-500/50 dark:hover:border-purple-500/50 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-row md:flex-col">
                <div className="w-16 sm:w-20 md:w-full h-auto min-h-[80px] md:h-48 relative overflow-hidden shrink-0">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(`${event.image}`)` }}
                  />
                </div>
                <div className="p-3 md:p-6 flex flex-col flex-1 justify-center overflow-hidden">
                  <h3 className="text-[13px] sm:text-sm md:text-xl font-bold text-foreground mb-1 md:mb-3 line-clamp-2 leading-tight">{event.title}</h3>
                  <div className="flex flex-col gap-1 md:gap-2">
                    <div className="flex items-center gap-1.5 text-foreground/60 text-[10px] sm:text-[11px] md:text-sm">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4 shrink-0" /> <span className="truncate">{event.date}</span>
                    </div>
                  </div>
                  <button className="hidden md:block w-full mt-6 py-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-purple-500 hover:text-white text-foreground font-semibold border border-black/10 dark:border-white/10 hover:border-purple-500 transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Back to Top */}
      <BackToTop colorClass="bg-purple-500 text-white" />

    </div>
  );
}
