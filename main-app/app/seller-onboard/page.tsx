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
import { useUser, useClerk } from '@/lib/mock-auth';

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
  const [countdown, setCountdown] = useState(10);
  
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
      if (!emailAddress && user.primaryEmailAddress?.emailAddress) {
        setEmailAddress(user.primaryEmailAddress.emailAddress);
      }
    }
  }, [user]);

  // Check if existing user
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const checkProfile = async () => {
        let shouldRedirect = false;
        try {
          const email = user?.primaryEmailAddress?.emailAddress || '';
          const res = await fetch(`/api/vendor-profile?email=${encodeURIComponent(email)}`);
          if (res.ok) {
            const data = await res.json();
            if (data.profile && data.profile.brand_name) {
              const slug = data.profile.brand_name.trim().toLowerCase().replace(/\s+/g, '-') || 'sponsora';
              shouldRedirect = true;
              router.replace(`/${slug}`);
            }
          }
        } catch (error) {
          console.error("Error checking profile:", error);
        } finally {
          if (!shouldRedirect) {
            setIsCheckingProfile(false);
          }
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
        router.replace(`/${slug}`);
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
                    <input value={personalName} onChange={e => setPersonalName(e.target.value)} required type="text" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow text-base" placeholder="John Doe" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">WhatsApp Number *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Phone className="w-4 h-4 text-pink-500" />
                      </div>
                      <input value={whatsappNumber} onChange={e => setWhatsappNumber(e.target.value)} required type="tel" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow text-base" placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Mail className="w-4 h-4 text-pink-500" />
                      </div>
                      <input value={emailAddress} onChange={e => setEmailAddress(e.target.value)} required type="email" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow text-base" placeholder="john@example.com" />
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
                      <input value={brandName} onChange={e => setBrandName(e.target.value)} required type="text" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow text-base" placeholder="E.g. Sponsora" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Establishment Date *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Calendar className="w-4 h-4 text-pink-500" />
                      </div>
                      <input value={establishmentDate} onChange={e => setEstablishmentDate(e.target.value)} required type="date" className="w-full max-w-full h-12 pl-10 pr-2 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow text-base text-ellipsis" />
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
                    <input value={gstMsmeNumber} onChange={e => setGstMsmeNumber(e.target.value)} type="text" className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow text-base" placeholder="Enter GSTIN / Udyam No." />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Business Address *</label>
                  <div className="relative">
                    <div className="absolute top-3.5 left-0 pl-3.5 pointer-events-none">
                      <MapPin className="w-4 h-4 text-pink-500" />
                    </div>
                    <textarea value={businessAddress} onChange={e => setBusinessAddress(e.target.value)} required className="w-full h-24 pl-10 p-4 rounded-xl border-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-shadow text-base resize-none" placeholder="Where do you operate from?"></textarea>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setFormStep(1)} className="px-6 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    Back
                  </button>
                  <button type="submit" disabled={isUploading || isSubmitting} className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100">
                    {isSubmitting ? 'Submitting...' : 'Submit Brand Details'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Authentication removed: onboarding is publicly accessible.
  return null; // Fallback in case none of the above conditions hit
}
