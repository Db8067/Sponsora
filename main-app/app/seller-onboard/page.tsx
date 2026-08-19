'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Store, User, Phone, Mail, Calendar, Upload, FileText, MapPin, Sparkles, CheckCircle2, ChevronRight, Loader2, Image as ImageIcon } from 'lucide-react';
import SellerNavbar from '@/components/SellerNavbar';
import { useAuth, useClerk } from '@clerk/nextjs';

export default function SellerOnboardPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const clerk = useClerk();
  
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Multi-step form state
  const [formStep, setFormStep] = useState(1);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  
  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedLogo, setUploadedLogo] = useState('');

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

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'brand_logos');
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.secure_url) {
        setUploadedLogo(data.secure_url);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to upload logo. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedLogo) {
      alert('Please upload a brand logo first.');
      return;
    }
    setIsFormSubmitted(true);
  };

  // While Clerk is loading auth state
  if (!isLoaded) {
    return (
      <div className="flex flex-col min-h-screen bg-transparent">
        <SellerNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full"></div>
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
          <div className="bg-white/70 dark:bg-slate-900/70 p-8 md:p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-xl border border-white/50 dark:border-white/10 relative overflow-hidden transition-all duration-500">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="text-center mb-8 relative z-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${formStep === 1 ? 'bg-pink-100 text-pink-600' : 'bg-green-100 text-green-600'}`}>Step 1: Personal Details</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${formStep === 2 ? 'bg-pink-100 text-pink-600' : 'bg-slate-100 text-slate-500'}`}>Step 2: Brand Details</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mb-2">
                {formStep === 1 ? 'Personal Details' : 'Brand Details'}
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                {formStep === 1 
                  ? "Let's start with your personal contact information." 
                  : "Tell us about your brand so we can get your store ready for customers."}
              </p>
            </div>

            {formStep === 1 ? (
              <form onSubmit={handleStep1Submit} className="space-y-6 relative z-10 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Name *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <User className="w-4 h-4 text-pink-500" />
                    </div>
                    <input required type="text" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow" placeholder="John Doe" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">WhatsApp Number *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Phone className="w-4 h-4 text-pink-500" />
                      </div>
                      <input required type="tel" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow" placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Mail className="w-4 h-4 text-pink-500" />
                      </div>
                      <input required type="email" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow" placeholder="john@example.com" />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full bg-slate-800 hover:bg-slate-900 dark:bg-pink-600 dark:hover:bg-pink-700 text-white font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2">
                    Next Step
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleStep2Submit} className="space-y-6 relative z-10 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Brand Name *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Store className="w-4 h-4 text-pink-500" />
                      </div>
                      <input required type="text" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow" placeholder="E.g. Trends Boutique" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Establishment Date *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Calendar className="w-4 h-4 text-pink-500" />
                      </div>
                      <input required type="date" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow text-sm" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                    <span>Brand Logo *</span>
                    {uploadedLogo && <span className="text-green-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Uploaded</span>}
                  </label>
                  <div className={`relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-colors ${uploadedLogo ? 'border-green-400 bg-green-50/50 dark:bg-green-900/10' : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50'}`}>
                    {uploadedLogo ? (
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden border shadow-sm bg-white">
                        <img src={uploadedLogo} alt="Logo" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                        {isUploading ? <Loader2 className="w-5 h-5 text-pink-500 animate-spin" /> : <ImageIcon className="w-5 h-5 text-pink-500" />}
                      </div>
                    )}
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {isUploading ? 'Uploading...' : uploadedLogo ? 'Logo Uploaded' : 'Click to upload your logo'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleLogoUpload}
                      disabled={isUploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">GST or MSME Number <span className="text-slate-400 lowercase font-normal">(Optional)</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <FileText className="w-4 h-4 text-pink-500" />
                    </div>
                    <input type="text" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow" placeholder="Enter GSTIN / Udyam No." />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Business Address *</label>
                  <div className="relative">
                    <div className="absolute top-3.5 left-0 pl-3.5 pointer-events-none">
                      <MapPin className="w-4 h-4 text-pink-500" />
                    </div>
                    <textarea required className="w-full h-24 pl-10 p-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow resize-none" placeholder="Where do you operate from?"></textarea>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setFormStep(1)} className="px-6 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    Back
                  </button>
                  <button type="submit" disabled={isUploading} className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100">
                    Submit Brand Details
                    <Sparkles className="w-5 h-5" />
                  </button>
                </div>
              </form>
            )}
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

      {/* Full screen click area */}
      <div 
        className="flex-1 flex flex-col items-center justify-center p-4 z-10 relative cursor-pointer"
        onClick={handleOpenBox}
      >
        <Link 
          href="/" 
          onClick={(e) => e.stopPropagation()}
          className="absolute top-8 left-4 md:left-8 inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-medium transition-colors z-20"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* The Image Container */}
        <div 
          className={`
            relative transition-all duration-700 ease-out mt-8
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
            Tap anywhere to unlock!
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
