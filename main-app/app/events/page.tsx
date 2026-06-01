"use client";

import { useState } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
];

export default function EventsPage() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigation = (href: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(href);
    }, 1000);
  };

  return (
    <>
      <div className="relative min-h-[100dvh] w-full flex flex-col overflow-x-hidden pt-24 md:pt-32 pb-12 md:pb-24 selection:bg-primary/30">
        
        {/* Background ambient lighting */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none hidden dark:block"></div>

        <div className="relative z-10 flex flex-col w-full max-w-[1400px] px-6 lg:px-12 mx-auto">
          
          {/* Header - Centered */}
          <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto flex flex-col items-center mt-8 md:mt-0">
            <h1 className="font-heading font-black tracking-tighter text-foreground text-4xl sm:text-5xl lg:text-6xl text-balance drop-shadow-md mb-6">
              Discover <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Events</span>
            </h1>
            <p className="text-foreground/70 text-lg md:text-xl font-medium max-w-2xl text-balance leading-relaxed">
              Explore upcoming hackathons, college fests, hands-on workshops, and insightful seminars. Or take a trip down memory lane with our past event highlights.
            </p>
          </div>

          {/* Upcoming Events Section (4-column grid) */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Upcoming Events</h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
              {upcomingCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(category.href)}
                  className="group relative flex flex-col justify-end w-full h-[280px] md:h-[350px] rounded-[2rem] overflow-hidden glass md:hover:-translate-y-2 active:scale-[0.98] transition-all duration-300 ease-out text-left bg-[#1A1A1D] dark:bg-black/40 border border-white/10 hover:border-white/20 shadow-xl md:hover:shadow-2xl md:hover:shadow-primary/20"
                >
                  {/* Doodle Art Background Image */}
                  <div 
                    className="absolute inset-0 z-0 opacity-60 md:group-hover:opacity-100 transition-all duration-500 md:group-hover:scale-110 ease-out bg-cover bg-center mix-blend-screen"
                    style={{ backgroundImage: `url('${category.bgImage}')` }}
                  />
                  
                  {/* Dark Gradient Overlay for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20 z-10 transition-opacity duration-300 group-hover:opacity-80" />
                  
                  {/* Premium Neon Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-screen" />

                  {/* Content */}
                  <div className="relative z-20 p-6 flex flex-col gap-2 md:gap-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white transition-colors leading-tight">
                      {category.title}
                    </h3>
                    <p className="text-white/70 text-sm font-medium line-clamp-2">
                      {category.description}
                    </p>
                    <div className="mt-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 md:group-hover:bg-primary md:group-hover:border-primary transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Past Events Section (Equal Visual Weight - Large Full Width Card) */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Past Highlights</h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
            </div>

            <button
              onClick={() => handleNavigation("/events/past")}
              className="group relative flex flex-col md:flex-row items-center w-full min-h-[300px] md:min-h-[350px] rounded-[2rem] overflow-hidden glass md:hover:-translate-y-2 active:scale-[0.98] transition-all duration-300 ease-out text-left bg-[#1A1A1D] dark:bg-black/40 border border-white/10 hover:border-white/20 shadow-xl md:hover:shadow-2xl md:hover:shadow-accent/20"
            >
              {/* Image Side (Left on Desktop, Top on Mobile) */}
              <div className="absolute inset-0 z-0 md:relative md:w-1/2 h-full min-h-[200px] md:min-h-full">
                 <div 
                  className="absolute inset-0 w-full h-full opacity-50 md:opacity-80 md:group-hover:opacity-100 transition-all duration-500 md:group-hover:scale-105 ease-out bg-cover bg-center mix-blend-screen"
                  style={{ backgroundImage: `url('/images/past_events_doodle.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/60 to-black/95 hidden md:block z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20 md:hidden z-10" />
              </div>

              {/* Text Side */}
              <div className="relative z-20 w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center h-full mt-auto md:mt-0">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-bold w-fit mb-4">
                  <Calendar className="w-4 h-4" /> Archive
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
                  Relive the <br className="hidden md:block"/> Magic.
                </h3>
                <p className="text-white/70 text-base md:text-lg font-medium mb-8 max-w-md">
                  Browse our gallery of concluded events, check out past sponsors, and see what you missed.
                </p>
                <div className="flex items-center gap-3 text-white font-bold md:group-hover:text-accent transition-colors">
                  View Past Events
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 md:group-hover:bg-accent md:group-hover:border-accent transition-all duration-300">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </button>
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
