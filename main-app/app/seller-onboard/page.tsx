'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Store, User, Phone, Mail, Calendar, FileText, 
  MapPin, Sparkles, CheckCircle2, ChevronRight, Loader2, 
  Image as ImageIcon, ExternalLink, Rocket
} from 'lucide-react';
import SellerNavbar from '@/components/SellerNavbar';
import { useUser, useClerk } from '@clerk/nextjs';

export default function SellerOnboardPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const clerk = useClerk();
  const router = useRouter();
  
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Multi-step form state
  const [formStep, setFormStep] = useState(1);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [submittedBrandSlug, setSubmittedBrandSlug] = useState('sponsora');
  const [countdown, setCountdown] = useState(5);
  
  // Form input states
  const [personalName, setPersonalName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [brandName, setBrandName] = useState('');
  const [establishmentDate, setEstablishmentDate] = useState('');
  const [gstMsmeNumber, setGstMsmeNumber] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  
  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedLogo, setUploadedLogo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingProfile, setIsCheckingProfile] = useState(true);

  // Prefill personal info from Clerk if available
  useEffect(() => {
    if (user) {
      if (!personalName && user.fullName) {
        setPersonalName(user.fullName);
      }
      if (!emailAddress && user.primaryEmailAddress?.emailAddress) {
        setEmailAddress(user.primaryEmailAddress.emailAddress);
      }
    }
  }, [user]);

  // Check if existing user
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const checkProfile = async () => {
        try {
          const email = user?.primaryEmailAddress?.emailAddress || '';
          const res = await fetch(`/api/vendor-profile?email=${encodeURIComponent(email)}`);
          if (res.ok) {
            const data = await res.json();
            if (data.profile && data.profile.brand_name) {
              const slug = data.profile.brand_name.trim().toLowerCase().replace(/\s+/g, '-') || 'sponsora';
              router.replace(`/${slug}`);
              return; // Stay on loading state while redirecting
            }
          }
        } catch (error) {
          console.error("Error checking profile:", error);
        } finally {
          setIsCheckingProfile(false);
        }
      };
      checkProfile();
    } else if (isLoaded && !isSignedIn) {
      setIsCheckingProfile(false);
    }
  }, [isLoaded, isSignedIn, user, router]);

  // Auto-redirect countdown effect
  useEffect(() => {
    if (!isFormSubmitted) return;

    setShowConfetti(true);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.replace(`/${submittedBrandSlug}?new=true`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFormSubmitted, submittedBrandSlug, router]);

  const handleOpenBox = () => {
    if (isOpen) return;
    setIsOpen(true);
    setShowConfetti(true);
    
    setTimeout(() => {
      clerk.openSignIn({
        forceRedirectUrl: '/seller-onboard',
        signUpForceRedirectUrl: '/seller-onboard'
      });
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

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedLogo) {
      alert('Please upload a brand logo first.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const slug = brandName.trim().toLowerCase().replace(/\s+/g, '-') || 'sponsora';
      setSubmittedBrandSlug(slug);

      const res = await fetch('/api/vendor-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalName,
          whatsappNumber,
          emailAddress,
          brandName,
          establishmentDate,
          brandLogoUrl: uploadedLogo,
          gstMsmeNumber,
          businessAddress
        })
      });
      
      if (res.ok) {
        setIsFormSubmitted(true);
      } else {
        const error = await res.json();
        alert('Failed to save profile: ' + (error.details || error.error));
      }
    } catch (error) {
      console.error(error);
      alert('Network error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded || (isSignedIn && isCheckingProfile)) {
    return (
      <div className="flex flex-col min-h-screen bg-transparent">
        <SellerNavbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-9 h-9 text-pink-500 animate-spin" />
          <p className="text-sm font-semibold text-slate-500 animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (isSignedIn) {
    if (isFormSubmitted) {
      return (
        <div className="flex flex-col min-h-screen bg-transparent relative overflow-hidden">
          <SellerNavbar />

          {/* Confetti Particles */}
          <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
            {[...Array(40)].map((_, i) => (
              <div 
                key={i} 
                className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full animate-confetti-pop"
                style={{
                  backgroundColor: ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 6)],
                  '--tx': `${(Math.random() - 0.5) * 600}px`,
                  '--ty': `${(Math.random() - 0.5) * 600}px`,
                  '--r': `${Math.random() * 360}deg`,
                } as React.CSSProperties}
              />
            ))}
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 z-10">
            <div className="max-w-lg w-full bg-white/85 dark:bg-slate-900/85 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-2xl border border-white/60 dark:border-white/10 text-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
              {/* Top Accent Gradient */}
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
              
              {/* Logo / Success Badge */}
              <div className="relative mx-auto mb-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl p-1 bg-gradient-to-tr from-pink-500 via-purple-500 to-emerald-400 mx-auto shadow-xl flex items-center justify-center">
                  <div className="w-full h-full bg-white dark:bg-slate-800 rounded-[1.35rem] flex items-center justify-center overflow-hidden p-2">
                    {uploadedLogo ? (
                      <img src={uploadedLogo} alt={brandName} className="w-full h-full object-contain" />
                    ) : (
                      <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    )}
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full shadow-lg">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              {/* Title & Brand Name */}
              <div className="space-y-2 mb-6">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Setup Successful
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  Welcome, {brandName || 'Partner'}!
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-md mx-auto">
                  Your brand profile is live. Your store dashboard is ready with 0% sales commission and customer access.
                </p>
              </div>

              {/* Progress & Countdown Section */}
              <div className="p-4 rounded-2xl bg-pink-50/80 dark:bg-pink-950/30 border border-pink-100 dark:border-pink-900/30 mb-8 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-pink-600 dark:text-pink-400">
                  <span className="flex items-center gap-1.5">
                    <Rocket className="w-4 h-4 animate-bounce" /> Redirecting to dashboard...
                  </span>
                  <span>{countdown} seconds</span>
                </div>
                <div className="w-full h-2 bg-pink-200/60 dark:bg-pink-900/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-1000 ease-linear rounded-full"
                    style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Destination: <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">/{submittedBrandSlug}</span>
                </p>
              </div>

              {/* Direct Access CTA */}
              <Link href={`/${submittedBrandSlug}?new=true`}>
                <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-extrabold py-4 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
                  <span>Go to {brandName || 'Brand'} Dashboard Now</span>
                  <ExternalLink className="w-4 h-4" />
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
                    <input value={personalName} onChange={e => setPersonalName(e.target.value)} required type="text" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow" placeholder="John Doe" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">WhatsApp Number *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Phone className="w-4 h-4 text-pink-500" />
                      </div>
                      <input value={whatsappNumber} onChange={e => setWhatsappNumber(e.target.value)} required type="tel" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow" placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Mail className="w-4 h-4 text-pink-500" />
                      </div>
                      <input value={emailAddress} onChange={e => setEmailAddress(e.target.value)} required type="email" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow" placeholder="john@example.com" />
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
                      <input value={brandName} onChange={e => setBrandName(e.target.value)} required type="text" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow" placeholder="E.g. Sponsora" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Establishment Date *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Calendar className="w-4 h-4 text-pink-500" />
                      </div>
                      <input value={establishmentDate} onChange={e => setEstablishmentDate(e.target.value)} required type="date" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow text-sm" />
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
                      disabled={isUploading || isSubmitting}
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
                    <input value={gstMsmeNumber} onChange={e => setGstMsmeNumber(e.target.value)} type="text" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow" placeholder="Enter GSTIN / Udyam No." />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Business Address *</label>
                  <div className="relative">
                    <div className="absolute top-3.5 left-0 pl-3.5 pointer-events-none">
                      <MapPin className="w-4 h-4 text-pink-500" />
                    </div>
                    <textarea value={businessAddress} onChange={e => setBusinessAddress(e.target.value)} required className="w-full h-24 pl-10 p-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow resize-none" placeholder="Where do you operate from?"></textarea>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setFormStep(1)} className="px-6 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    Back
                  </button>
                  <button type="submit" disabled={isUploading || isSubmitting} className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100">
                    {isSubmitting ? 'Submitting...' : 'Submit Brand Details'}
                    {!isSubmitting && <Sparkles className="w-5 h-5" />}
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
            <img 
              src="/doodle_girl_products_tap.jpg" 
              alt="Tap to unlock" 
              className="w-64 h-64 md:w-96 md:h-96 object-contain rounded-3xl shadow-xl border-4 border-white dark:border-slate-800 bg-white"
            />
          </div>
        </div>

        {!isOpen && (
          <p className="mt-12 text-slate-500 dark:text-slate-400 font-medium animate-pulse text-sm">
            Tap anywhere to unlock!
          </p>
        )}
      </div>

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
