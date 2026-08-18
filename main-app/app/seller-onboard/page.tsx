'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Gift, Sparkles } from 'lucide-react';
import SellerNavbar from '@/components/SellerNavbar';

export default function SellerOnboardMysteryBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOpenBox = () => {
    if (isOpen) return;
    setIsOpen(true);
    setShowConfetti(true);
    
    // Here you can redirect the user to the next page after the animation finishes
    // setTimeout(() => {
    //   window.location.href = '/next-page';
    // }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative overflow-hidden">
      <SellerNavbar />
      
      {/* Confetti Particles (CSS Only) */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full animate-confetti-pop"
              style={{
                backgroundColor: ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)],
                '--tx': `${(Math.random() - 0.5) * 400}px`,
                '--ty': `${(Math.random() - 0.5) * 400}px`,
                '--r': `${Math.random() * 360}deg`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center p-4 z-10 relative">
        <Link href="/" className="absolute top-8 left-4 md:left-8 inline-flex items-center gap-2 text-slate-500 hover:text-pink-600 font-medium transition-colors z-20">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* The Mystery Box Container */}
        <div 
          onClick={handleOpenBox}
          className={`
            relative cursor-pointer group transition-all duration-1000 ease-in-out
            ${isOpen ? 'scale-[30] md:scale-[50] opacity-0 pointer-events-none' : 'scale-100 hover:scale-110'}
          `}
        >
          {/* Glowing Aura behind box */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity animate-pulse"></div>
          
          {/* Box Body */}
          <div className={`
            relative flex flex-col items-center justify-center w-64 h-64 md:w-80 md:h-80 
            bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl shadow-2xl border-4 border-white/20
            ${!isOpen ? 'animate-bounce-slow' : ''}
          `}>
            
            {/* Box Icon */}
            <Gift className="w-24 h-24 md:w-32 md:h-32 text-white drop-shadow-lg mb-4" />
            
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white font-bold text-sm md:text-base text-center shadow-lg">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              Open me and get 1 day free access
            </div>
            
          </div>
        </div>

        {/* Floating text to click */}
        {!isOpen && (
          <p className="mt-12 text-slate-500 dark:text-slate-400 font-medium animate-pulse">
            Tap the Mystery Box to unlock!
          </p>
        )}
      </div>

      {/* Global styles for the custom confetti animation and slow bounce */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-10%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
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
