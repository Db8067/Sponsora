"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const portalOptions = [
  {
    title: "Discover Events",
    href: "/sign-up?role=participant&redirect_url=/events",
    bgImage: "/images/india-gate.png",
  },
  {
    title: "Ask for Sponsorship",
    href: "/sign-up?role=organizer&redirect_url=/dashboard/organizer",
    bgImage: "/images/doodle_ask_sponsorship.png",
  },
  {
    title: "Become a Sponsor",
    href: "/sign-up?role=sponsor&redirect_url=/dashboard/sponsor",
    bgImage: "/images/doodle_become_sponsor_v2.png",
  },
];

export default function GetStartedPage() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigation = (href: string) => {
    setIsTransitioning(true);
    // Smooth transition overlay timeout before actually pushing
    setTimeout(() => {
      router.push(href);
    }, 1000);
  };

  return (
    <>
      {/* Full screen wrapper, preventing scroll on mobile, flex layout */}
      <div className="relative h-[100dvh] w-full flex flex-col overflow-hidden bg-gradient-to-b from-primary/10 to-background pt-24 md:pt-28 pb-4 md:pb-8">
        
        {/* Background ambient lighting (replaces video) */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none hidden dark:block"></div>

        <div className="relative z-10 flex flex-col h-full w-full max-w-[1400px] px-4 md:px-12 mx-auto">
          
          {/* Header - Centered on all devices */}
          <div className="mb-4 md:mb-8 text-center shrink-0">
            <h1 className="font-heading font-black tracking-tighter text-foreground text-3xl sm:text-5xl lg:text-6xl text-balance drop-shadow-md">
              Choose your path on <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Sponsora</span>
            </h1>
          </div>

          {/* Cards Flex/Grid - occupies remaining space fully, no scroll needed */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full min-h-0">
            {portalOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(option.href)}
                className="group relative flex flex-col justify-end w-full h-full rounded-2xl md:rounded-3xl overflow-hidden glass hover:scale-100 md:hover:scale-[1.02] active:scale-[0.96] transition-transform duration-300 ease-out text-left bg-black/90 dark:bg-transparent"
              >
                {/* Doodle Art Background Image */}
                <div 
                  className="absolute inset-0 z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300 md:group-hover:scale-110 ease-out bg-cover bg-center brightness-90 contrast-125 saturate-150"
                  style={{ backgroundImage: `url('${option.bgImage}')` }}
                />
                
                {/* Dark Gradient Overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />
                
                {/* Premium Neon Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-screen" />

                {/* Content */}
                <div className="relative z-20 p-3 sm:p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0">
                  <h3 className="text-base sm:text-lg md:text-2xl font-bold text-white transition-colors max-w-full md:max-w-[80%] leading-tight">
                    {option.title}
                  </h3>
                  <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 md:group-hover:bg-primary md:group-hover:border-primary transition-all duration-300">
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white transition-colors" />
                  </div>
                </div>
              </button>
            ))}
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
              transition={{ 
                duration: 0.5, 
                ease: "easeOut",
              }}
              className="flex flex-col items-center gap-6"
            >
              {/* Pulsing Logos */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <img src="/images/logo-light.png" alt="Sponsora Logo" className="h-16 md:h-20 w-auto dark:hidden block drop-shadow-2xl" />
                <img src="/images/logo-dark.png" alt="Sponsora Logo" className="h-16 md:h-20 w-auto hidden dark:block drop-shadow-2xl" />
              </motion.div>
              
              {/* Premium Loading Bar */}
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
