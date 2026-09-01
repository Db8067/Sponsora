"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowLeft } from 'lucide-react';

const mediaList = [
  { type: 'video', src: '/present/1.mp4' },
  { type: 'image', src: '/present/2.jpg' },
  { type: 'image', src: '/present/3.jpg' },
  { type: 'video', src: '/present/4.mp4' },
];

export default function SIHPresentDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far down the container we've scrolled
      // When top is 0, scrolled is 0
      // When top is -(height - viewportHeight), scrolled is 1
      const scrollDistance = -top;
      const totalScrollable = height - viewportHeight;
      
      let progress = scrollDistance / totalScrollable;
      progress = Math.max(0, Math.min(1, progress));
      
      // We have 4 items, so progress 0-0.25 is item 0, 0.25-0.50 is item 1, etc.
      // Math.floor(progress * 4) would give 0, 1, 2, 3, 4. We clamp to 3 max.
      const newIndex = Math.min(3, Math.floor(progress * 4));
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  return (
    <div className="relative bg-black w-full" ref={containerRef} style={{ height: '400vh' }}>
      
      {/* Fixed UI Overlay */}
      <div className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <Link href="/SIH-present" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex gap-2">
          {mediaList.map((_, idx) => (
            <div 
              key={idx} 
              className={\`h-1.5 rounded-full transition-all duration-500 \${idx === activeIndex ? 'w-8 bg-white' : 'w-2 bg-white/30'}\`}
            />
          ))}
        </div>
      </div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 text-white/50 animate-bounce flex flex-col items-center">
        <span className="text-xs uppercase tracking-widest font-bold mb-2">Scroll to explore</span>
        <ChevronDown className="w-5 h-5" />
      </div>

      {/* Media Container (Sticky) */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black flex items-center justify-center">
        
        {mediaList.map((media, idx) => {
          const isActive = idx === activeIndex;
          
          return (
            <div
              key={idx}
              className={\`absolute inset-0 transition-opacity duration-1000 ease-in-out \${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}\`}
            >
              {media.type === 'video' ? (
                <video
                  src={media.src}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <div 
                  className="w-full h-full bg-center bg-cover bg-no-repeat"
                  style={{ backgroundImage: \`url(\${media.src})\` }}
                />
              )}
              
              {/* Optional dark overlay for text readability if needed */}
              <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
            </div>
          );
        })}

        {/* Narrative Text Overlays */}
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-end pb-32 px-10 md:px-24">
          <div className={\`transition-all duration-1000 max-w-3xl \${activeIndex === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}\`}>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">Antarctic Operations Command</h2>
            <p className="text-lg md:text-2xl text-slate-200 drop-shadow-md border-l-4 border-cyan-400 pl-4">A digital twin ecosystem ensuring the survival and efficiency of India's Maitri and Bharati research stations.</p>
          </div>
          
          <div className={\`absolute bottom-32 left-10 md:left-24 transition-all duration-1000 max-w-3xl \${activeIndex === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}\`}>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">Real-Time Situational Awareness</h2>
            <p className="text-lg md:text-2xl text-slate-200 drop-shadow-md border-l-4 border-blue-400 pl-4">Monitoring critical systems, telemetry, and environmental anomalies in the harshest continent on Earth.</p>
          </div>
          
          <div className={\`absolute bottom-32 left-10 md:left-24 transition-all duration-1000 max-w-3xl \${activeIndex === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}\`}>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">AI-Driven Predictive Maintenance</h2>
            <p className="text-lg md:text-2xl text-slate-200 drop-shadow-md border-l-4 border-yellow-400 pl-4">Anticipating hardware failures before they happen, protecting personnel and mission integrity.</p>
          </div>
          
          <div className={\`absolute bottom-32 left-10 md:left-24 transition-all duration-1000 max-w-3xl \${activeIndex === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}\`}>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">Seamless Logistics & Energy</h2>
            <p className="text-lg md:text-2xl text-slate-200 drop-shadow-md border-l-4 border-emerald-400 pl-4">Optimizing resource allocation and autonomous grid balancing for winter-over readiness.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
