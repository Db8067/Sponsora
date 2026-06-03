"use client";

import { motion } from "framer-motion";
import { Sparkles, Compass } from "lucide-react";

export default function AnimatedEmptyState({ category }: { category?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="relative mb-8"
      >
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150" />
        <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-[2rem] flex items-center justify-center relative overflow-hidden backdrop-blur-sm transform rotate-3 shadow-2xl">
          <motion.div 
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <Compass className="w-14 h-14 text-primary" />
          </motion.div>
          <motion.div
            className="absolute top-4 right-4"
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Sparkles className="w-4 h-4 text-accent" />
          </motion.div>
        </div>
      </motion.div>
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-black text-foreground mb-3 font-heading"
      >
        No Events Found
      </motion.h3>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-foreground/60 max-w-md text-lg"
      >
        {category 
          ? `There are currently no published events for ${category}.`
          : "There are currently no published events."}
        <br />Check back later for upcoming drops!
      </motion.p>
    </div>
  );
}
