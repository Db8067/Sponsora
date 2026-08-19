'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SellerNavbar from '@/components/SellerNavbar';

export default function SellerOnboardMysteryBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOpenBox = () => {
    if (isOpen) return;
    setIsOpen(true);
    setShowConfetti(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative overflow-hidden">
      <SellerNavbar />
      
      {/* Confetti Particles (CSS Only) */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
          {[...Array(35)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full animate-confetti-pop"
              style={{
                backgroundColor: ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)],
                '--tx': `${(Math.random() - 0.5) * 450}px`,
                '--ty': `${(Math.random() - 0.5) * 450}px`,
                '--r': `${Math.random() * 360}deg`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center p-4 z-10 relative">
        <Link href="/" className="absolute top-8 left-4 md:left-8 inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-medium transition-colors z-20">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* The Image Container */}
        {/* Optimized animation: Use a smaller scale (e.g., scale-150 or scale-0 depending on intent), faster duration, and will-change-transform for smooth 60fps rendering */}
        <div 
          onClick={handleOpenBox}
          className={`
            relative cursor-pointer group transition-all duration-700 ease-out mt-8
            ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 hover:scale-105'}
          `}
          style={{ willChange: 'transform, opacity' }}
        >
          <div className={`
            relative flex flex-col items-center justify-center
            ${!isOpen ? 'animate-bounce-slow' : ''}
          `}>
            
            {/* Doodle Image */}
            <img 
              src="/doodle_girl_products_tap.jpg" 
              alt="Tap to unlock" 
              className="w-64 h-64 md:w-96 md:h-96 object-contain rounded-3xl shadow-xl border-4 border-white dark:border-slate-800 bg-white"
            />
            
          </div>
        </div>

        {/* Floating instruction text */}
        {!isOpen && (
          <p className="mt-12 text-slate-500 dark:text-slate-400 font-medium animate-pulse text-sm">
            Tap the Image to unlock!
          </p>
        )}
      </div>

      {/* Global styles for the custom confetti animation and slow bounce */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
          50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }

        @keyframes confetti-pop {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) rotate(var(--r)) scale(0);
            opacity: 0;
          }
        }
        .animate-confetti-pop {
          animation: confetti-pop 1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}} />
    </div>
  );
}
