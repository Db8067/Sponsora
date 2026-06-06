"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Calendar, MapPin, Users, Sparkles, Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const upcomingCategories = [
  {
    title: "Tech Events",
    description: "Hackathons, Coding Competitions & AI Summits",
    href: "/events/tech",
    bgImage: "/images/tech_events_doodle.png",
  },
  {
    title: "Cultural Fests",
    description: "Music, Dance, Arts & College Festivals",
    href: "/events/cultural",
    bgImage: "/images/cultural_events_doodle.png",
  },
  {
    title: "Workshops",
    description: "Hands-on Learning & Skill Building",
    href: "/events/workshops",
    bgImage: "/images/workshops_doodle.png",
  },
  {
    title: "Seminars",
    description: "Keynotes, Guest Lectures & Academic Talks",
    href: "/events/seminars",
    bgImage: "/images/seminars_doodle.png",
  },
  {
    title: "Past Events",
    description: "Relive the magic of our concluded events & sponsors",
    href: "/events/past",
    bgImage: "/images/past_events_doodle.png",
  },
];

export default function EventsPage() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [categories, setCategories] = useState<any[]>(upcomingCategories);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { supabase } = await import("@/lib/supabase");
      const { data: cats } = await supabase.from('sponsora_categories').select('*').eq('type', 'event');
      if (cats && cats.length > 0) {
        setCategories(cats.map((c: any, index: number) => ({
          title: c.name || c.title,
          description: c.description,
          href: `/events/category/${c.slug || c.id}`,
          bgImage: c.image_url || upcomingCategories[index % upcomingCategories.length].bgImage
        })));
      }
      
      const { data: evs } = await supabase.from('sponsora_events').select('*, hackathon:hackathons(*), category:sponsora_categories(*)').eq('is_published', true);
      if (evs) {
        setEvents(evs);
      }
    }
    fetchData();
  }, []);

  const handleNavigation = (href: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(href);
    }, 1000);
  };

  return (
    <>
      <div className="relative min-h-[100dvh] w-full flex flex-col overflow-x-hidden pt-24 md:pt-20 lg:pt-24 pb-12 md:pb-16 selection:bg-primary/30 bg-gradient-to-b from-primary/10 to-background">
        
        {/* Background ambient lighting */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none hidden dark:block"></div>

        <div className="relative z-10 flex flex-col w-full max-w-[1400px] px-4 md:px-6 lg:px-12 mx-auto">
          
          {/* Header - Centered */}
          <div className="mb-12 md:mb-6 lg:mb-8 text-center max-w-3xl mx-auto flex flex-col items-center mt-8 md:mt-0">
            <h1 className="font-heading font-black tracking-tighter text-foreground text-4xl sm:text-5xl md:text-3xl lg:text-4xl xl:text-5xl text-balance drop-shadow-md mb-6 md:mb-3 lg:mb-4">
              Discover <br className="hidden md:block lg:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Events</span>
            </h1>
            <p className="text-foreground/70 text-lg md:text-sm lg:text-base xl:text-lg font-medium max-w-2xl text-balance leading-relaxed">
              Explore upcoming hackathons, college fests, hands-on workshops, and insightful seminars.
            </p>
          </div>

          {/* Upcoming Categories Section */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8 md:mb-4 lg:mb-6">
              <h2 className="text-2xl md:text-xl lg:text-2xl font-bold text-foreground tracking-tight">Browse Categories</h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3 xl:gap-6 w-full">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(category.href)}
                  className="group relative flex flex-row items-center md:flex-col md:justify-end w-full h-auto p-4 sm:p-5 md:p-0 md:h-[280px] lg:h-[300px] xl:h-[320px] rounded-2xl md:rounded-[2rem] overflow-hidden glass md:hover:-translate-y-2 active:scale-[0.98] transition-all duration-300 ease-out text-left bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-primary/20 dark:hover:border-white/20 shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-primary/20"
                >
                  {/* Image container: Square on mobile (left side), background on desktop */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 md:absolute md:inset-0 md:w-full md:h-full opacity-100 md:opacity-60 md:group-hover:opacity-100 transition-all duration-500 md:group-hover:scale-110 ease-out bg-cover bg-center rounded-xl md:rounded-none dark:opacity-60 md:opacity-80"
                       style={{ backgroundImage: `url('${category.bgImage}')` }} />
                  
                  {/* Desktop overlays (hidden on mobile) */}
                  <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20 z-10 transition-opacity duration-300 group-hover:opacity-80" />
                  <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-10 " />

                  {/* Content: text on right for mobile, bottom for desktop */}
                  <div className="relative z-20 flex-1 md:flex-none md:w-full ml-4 md:ml-0 md:p-6 lg:p-4 xl:p-6 flex flex-col gap-1 md:gap-3">
                    <h3 className="text-base sm:text-lg lg:text-lg xl:text-2xl font-bold text-foreground md:text-white transition-colors leading-tight">
                      {category.title}
                    </h3>
                    {/* Description is hidden on mobile */}
                    <p className="hidden md:block text-white/70 text-sm font-medium lg:line-clamp-1 xl:line-clamp-2">
                      {category.description}
                    </p>
                    <div className="hidden md:flex mt-4 w-10 h-10 rounded-full bg-white/10 items-center justify-center backdrop-blur-md border border-white/20 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Live Events Section */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8 md:mb-4 lg:mb-6">
              <h2 className="text-2xl md:text-xl lg:text-2xl font-bold text-foreground tracking-tight">Live Events</h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
            </div>
            
            {events.length === 0 ? (
              <p className="text-foreground/70">No live events at the moment.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                          <Sparkles className="w-3 h-3 text-yellow-400" /> {event.category?.name || "Event"}
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

                      <div className="pt-4 border-t border-black/5 dark:border-white/10 flex justify-between items-center mt-auto">
                        <Link href={`/events/${event.slug || event.id}`} className="bg-primary/10 hover:bg-primary hover:text-white text-primary px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 w-full justify-center">
                          View Details <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Page Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center gap-6"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <img src="/images/logo-light.png" alt="Sponsora Logo" className="h-16 md:h-20 w-auto dark:hidden block drop-shadow-2xl" />
                <img src="/images/logo-dark.png" alt="Sponsora Logo" className="h-16 md:h-20 w-auto hidden dark:block drop-shadow-2xl" />
              </motion.div>
              
              <div className="w-40 h-1.5 bg-white/5 rounded-full overflow-hidden mt-4 relative">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
