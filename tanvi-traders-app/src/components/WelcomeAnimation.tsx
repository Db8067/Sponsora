"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function WelcomeAnimation() {
  const [isVisible, setIsVisible] = useState(true);

  // We can automatically hide it after a certain time, or let the user click a button.
  // Let's add a "Continue to Site" button so they have time to read the text.
  useEffect(() => {
    // Optional: Auto-hide after 8 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-pink-50 overflow-hidden"
        >
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute inset-0 bg-pink-900/40 z-10 mix-blend-multiply"></div>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=2000"
            >
              {/* Using a reliable free stock video for makeup/cosmetics */}
              <source src="https://videos.pexels.com/video-files/4058225/4058225-hd_1920_1080_25fps.mp4" type="video/mp4" />
              <source src="https://cdn.pixabay.com/video/2021/08/25/86270-592651034_large.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
            className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center h-full"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Sparkles className="w-16 h-16 text-pink-300 mb-6 mx-auto animate-pulse" />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 leading-tight drop-shadow-2xl">
              Welcome to Contest for <br/>
              <span className="text-pink-300">Free Sugar Cosmetic</span> products
            </h1>
            
            <p className="text-lg md:text-2xl text-pink-100 mb-10 max-w-2xl mx-auto font-medium drop-shadow-lg">
              Join the ultimate beauty giveaway and get your favorite cosmetic products absolutely free!
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsVisible(false)}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold text-lg shadow-[0_0_40px_rgba(236,72,153,0.6)] hover:shadow-[0_0_60px_rgba(236,72,153,0.8)] transition-all flex items-center gap-2"
            >
              Enter Site <Sparkles className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
