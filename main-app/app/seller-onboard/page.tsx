'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Store, User, Phone, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';
import SellerNavbar from '@/components/SellerNavbar';
import { useAuth, useClerk } from '@clerk/nextjs';

export default function SellerOnboardPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const clerk = useClerk();
  
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleOpenBox = () => {
    if (isOpen) return;
    setIsOpen(true);
    setShowConfetti(true);
    
    // Open Clerk Sign In modal after a short delay for animation
    setTimeout(() => {
      clerk.openSignIn({
        forceRedirectUrl: '/seller-onboard',
        signUpForceRedirectUrl: '/seller-onboard'
      });
      // Reset animation state just in case modal closes without logging in
      setTimeout(() => {
        setIsOpen(false);
        setShowConfetti(false);
      }, 1000);
    }, 700);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
  };

  // While Clerk is loading auth state
  if (!isLoaded) {
    return (
      <div className="flex flex-col min-h-screen bg-transparent">
        <SellerNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  // If user is logged in, show the brand onboard form
  if (isSignedIn) {
    if (isFormSubmitted) {
      return (
        <div className="flex flex-col min-h-screen bg-transparent">
          <SellerNavbar />
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-white/80 dark:bg-slate-900/80 p-8 rounded-[2rem] shadow-2xl backdrop-blur-xl border border-white/50 dark:border-white/10 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-purple-500"></div>
              <div className="w-24 h-24 bg-green-100/80 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">Brand Setup Complete!</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                Your brand profile has been successfully submitted. We are preparing your personalized dashboard.
              </p>
              <Link href="/">
                <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]">
                  Return to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col min-h-screen bg-transparent">
        <SellerNavbar />
        <div className="flex-1 w-full max-w-2xl mx-auto py-12 px-4 md:px-8">
          <div className="bg-white/70 dark:bg-slate-900/70 p-8 md:p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-xl border border-white/50 dark:border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="text-center mb-10 relative z-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mb-2">
                Let's setup your Brand!
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Provide a few details so we can get your store ready for customers.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Brand / Store Name *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Store className="w-4 h-4 text-pink-500" />
                  </div>
                  <input required type="text" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow" placeholder="E.g. Trends Boutique" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Name *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <User className="w-4 h-4 text-pink-500" />
                    </div>
                    <input required type="text" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow" placeholder="John Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">WhatsApp Number *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Phone className="w-4 h-4 text-pink-500" />
                    </div>
                    <input required type="tel" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow" placeholder="+91 98765 43210" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Business Address *</label>
                <textarea required className="w-full h-24 p-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow resize-none" placeholder="Where do you operate from?"></textarea>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2">
                  Launch My Brand
                  <Sparkles className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // If user is NOT logged in, show the animation image to click
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
