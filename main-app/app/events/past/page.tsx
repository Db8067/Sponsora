import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Calendar, MapPin, ArrowUp, Zap, Users, History } from "lucide-react";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "Past Events Gallery | Sponsora",
  description: "Browse the hall of fame. Relive the magic of concluded events, check out past sponsors, and see what you missed.",
};

const mockPastEvents = [
  {
    id: 1,
    title: "Global AI Hackathon 2025",
    date: "Oct 15 - 17, 2025",
    location: "Online",
    participants: "12,000+",
    category: "Tech Event",
    image: "/images/past_events_doodle.png"
  },
  {
    id: 2,
    title: "Oasis 2025 - BITS Pilani",
    date: "Oct 28 - Nov 1, 2025",
    location: "Pilani, India",
    participants: "55,000+",
    category: "Cultural Fest",
    image: "/images/past_events_doodle.png"
  },
  {
    id: 3,
    title: "Advanced UI/UX Masterclass",
    date: "Aug 12 - 14, 2025",
    location: "Online",
    participants: "800+",
    category: "Workshop",
    image: "/images/past_events_doodle.png"
  }
];

export default function PastEventsPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-6 lg:px-12 selection:bg-primary/30">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none hidden dark:block"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Left Sidebar: Quick Switch & Filters */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm font-medium text-foreground/50">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Past Highlights</span>
          </nav>

          <div className="hidden lg:block bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold text-foreground mb-4">Categories</h3>
            <div className="flex flex-col gap-3">
              <Link href="/events/tech" className="text-foreground/60 hover:text-foreground transition-colors">Tech Events</Link>
              <Link href="/events/cultural" className="text-foreground/60 hover:text-foreground transition-colors">Cultural Fests</Link>
              <Link href="/events/workshops" className="text-foreground/60 hover:text-foreground transition-colors">Workshops</Link>
              <Link href="/events/seminars" className="text-foreground/60 hover:text-foreground transition-colors">Seminars</Link>
              <div className="my-2 h-[1px] bg-white/10" />
              <Link href="/events/past" className="text-primary font-bold flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Past Events
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          
          {/* Hero Section */}
          <div className="relative w-full h-[250px] md:h-[300px] rounded-[2rem] overflow-hidden mb-12 border border-white/10 glass shadow-2xl">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen"
              style={{ backgroundImage: "url('/images/past_events_doodle.png')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold w-fit mb-4 border border-primary/20">
                <History className="w-4 h-4" /> Hall of Fame
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Past Highlights</h1>
              <p className="text-white/70 max-w-xl text-lg font-medium">
                Relive the magic. Browse our gallery of concluded events, check out past sponsors, and see what you missed.
              </p>
            </div>
          </div>

          {/* Event Listings */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Concluded Events</h2>
            <span className="text-sm font-medium text-foreground/50">{mockPastEvents.length} Events</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-20">
            {mockPastEvents.map((event) => (
              <div key={event.id} className="group relative bg-[#1A1A1D] dark:bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col opacity-90 hover:opacity-100 grayscale hover:grayscale-0">
                <div className="w-full h-48 relative overflow-hidden bg-black/50">
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url('${event.image}')` }}
                  />
                  <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                    {event.category}
                  </div>
                  <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-full bg-red-500 text-white text-xs font-bold shadow-lg">
                    Concluded
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">{event.title}</h3>
                  <div className="flex flex-col gap-2 mt-auto">
                    <div className="flex items-center gap-2 text-foreground/60 text-sm">
                      <Calendar className="w-4 h-4" /> {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-foreground/60 text-sm">
                      <MapPin className="w-4 h-4" /> {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-foreground/60 text-sm">
                      <Users className="w-4 h-4" /> {event.participants} Participated
                    </div>
                  </div>
                  <button className="w-full mt-6 py-3 rounded-xl bg-white/5 hover:bg-white hover:text-black text-foreground font-semibold border border-white/10 hover:border-white transition-all duration-300">
                    View Gallery
                  </button>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>

      {/* Back to Top */}
      <BackToTop colorClass="bg-primary text-primary-foreground" />

    </div>
  );
}
