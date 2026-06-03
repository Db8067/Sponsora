"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EventsComingSoonPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center pt-24 pb-12 px-4 selection:bg-primary/30 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none hidden dark:block"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center max-w-2xl text-center"
      >
        <div className="mb-8">
          <img src="/images/logo-light.png" alt="Sponsora Logo" className="h-12 md:h-16 w-auto mx-auto dark:hidden block mb-6" />
          <img src="/images/logo-dark.png" alt="Sponsora Logo" className="h-12 md:h-16 w-auto mx-auto hidden dark:block mb-6" />
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img 
            src="/images/coming_soon_doodle.png" 
            alt="Coming Soon Doodle" 
            className="w-64 h-64 md:w-80 md:h-80 object-contain mb-8 drop-shadow-2xl"
          />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
          Events are <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Coming Soon!</span>
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/70 mb-10 text-balance max-w-xl">
          We are building the ultimate experience for discovering and organizing events. Stay tuned for updates!
        </p>

        <Link 
          href="/internshipcategory"
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-bold text-lg hover:shadow-xl hover:shadow-primary/30 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Internships
        </Link>
      </motion.div>
    </div>
  );
}
