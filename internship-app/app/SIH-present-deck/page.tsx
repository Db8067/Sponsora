"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';

interface Slide {
  type: 'video' | 'image';
  src: string;
  title: string;
  desc: string;
  accent: string;
}

const slides: Slide[] = [
  {
    type: 'video',
    src: '/present/1.mp4',
    title: 'Antarctic Operations Command',
    desc: "A digital twin ecosystem ensuring the survival and efficiency of India's Maitri and Bharati research stations.",
    accent: 'border-cyan-400',
  },
  {
    type: 'image',
    src: '/present/2.jpg',
    title: 'Real-Time Situational Awareness',
    desc: 'Monitoring critical systems, telemetry, and environmental anomalies in the harshest continent on Earth.',
    accent: 'border-blue-400',
  },
  {
    type: 'image',
    src: '/present/3.jpg',
    title: 'AI-Driven Predictive Maintenance',
    desc: 'Anticipating hardware failures before they happen, protecting personnel and mission integrity.',
    accent: 'border-yellow-400',
  },
  {
    type: 'video',
    src: '/present/4.mp4',
    title: 'Seamless Logistics & Energy',
    desc: 'Optimizing resource allocation and autonomous grid balancing for winter-over readiness.',
    accent: 'border-emerald-400',
  },
];

export default function SIHPresentDeck() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      if (maxScroll <= 0) return;
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      
      // Calculate active slide index based on scroll progress (4 equal sections: 0-25%, 25-50%, 50-75%, 75-100%)
      const index = Math.min(slides.length - 1, Math.floor(progress * slides.length));
      setActiveIndex(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSlide = (index: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = (index / slides.length) * maxScroll + 10;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full bg-black min-h-[400vh]">
      
      {/* Fixed Fullscreen Presentation Stage (z-0 ensures it is visible above page background and below overlay controls) */}
      <div className="fixed inset-0 w-full h-full overflow-hidden bg-black z-0 pointer-events-none">
        
        {/* Render all slides with crossfade */}
        {slides.map((slide, idx) => {
          const isActive = idx === activeIndex;
          
          return (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {slide.type === 'video' ? (
                <video
                  src={slide.src}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                />
              ) : (
                <img
                  src={slide.src}
                  className="w-full h-full object-cover"
                  alt={slide.title}
                />
              )}
              
              {/* Subtle gradient vignette for high legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 pointer-events-none" />
            </div>
          );
        })}

        {/* Narrative Text Overlays Synchronized with Active Slide */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-24 md:pb-32 px-6 sm:px-12 md:px-24 pointer-events-none">
          {slides.map((slide, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={idx}
                className={`transition-all duration-700 max-w-3xl absolute bottom-24 md:bottom-32 left-6 sm:left-12 md:left-24 right-6 ${
                  isActive
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
              >
                <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold tracking-wider text-cyan-300 uppercase mb-3 border border-white/10">
                  Slide {idx + 1} of {slides.length}
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-2xl">
                  {slide.title}
                </h2>
                <p className={`text-base sm:text-xl md:text-2xl text-slate-200 drop-shadow-lg border-l-4 ${slide.accent} pl-4 leading-relaxed font-light`}>
                  {slide.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>

      {/* Fixed UI Header (z-50 for always-clickable buttons) */}
      <div className="fixed top-0 left-0 w-full p-4 sm:p-6 z-50 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-auto">
        <Link 
          href="/SIH-present" 
          className="flex items-center gap-2 text-white/80 hover:text-white transition-all bg-black/50 hover:bg-black/80 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 text-sm font-medium shadow-lg hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        
        {/* Clickable Progress Dots */}
        <div className="flex gap-2 bg-black/40 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              title={`Jump to Slide ${idx + 1}`}
              aria-label={`Jump to Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Manual Next / Prev Floating Navigation Controls */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 pointer-events-auto hidden md:flex">
        <button
          onClick={() => scrollToSlide(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
          className="p-3 rounded-full bg-black/60 hover:bg-black text-white/80 hover:text-white border border-white/15 backdrop-blur-md disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scrollToSlide(Math.min(slides.length - 1, activeIndex + 1))}
          disabled={activeIndex === slides.length - 1}
          className="p-3 rounded-full bg-black/60 hover:bg-black text-white/80 hover:text-white border border-white/15 backdrop-blur-md disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Scroll indicator prompt at bottom */}
      {activeIndex < slides.length - 1 && (
        <div 
          onClick={() => scrollToSlide(activeIndex + 1)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 text-white/70 hover:text-white cursor-pointer animate-bounce flex flex-col items-center pointer-events-auto bg-black/40 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md transition-colors"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll Down</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      )}

    </div>
  );
}
