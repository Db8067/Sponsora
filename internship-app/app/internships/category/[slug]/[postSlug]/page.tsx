"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Building2, MapPin, IndianRupee, Clock, CalendarDays, ArrowLeft, ShieldCheck, Zap, Briefcase, Users, Star, Target, CheckCircle2, Award, FileText, MousePointerClick, Eye } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { useSubscription } from "@/components/SubscriptionContext";

export default function InternshipDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postSlug = params.postSlug as string;
  
  const { isSignedIn } = useUser();
  const { isPaid } = useSubscription();
  const isBlurred = !isPaid;
  
  const [internship, setInternship] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [hasApplied, setHasApplied] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);

  useEffect(() => {
    if (isSignedIn && internship?.id) {
      fetch(`/api/subscription/check-apply?internshipId=${internship.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.hasApplied) setHasApplied(true);
        })
        .catch(console.error);
    }
  }, [isSignedIn, internship?.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!postSlug) return;
    
    async function fetchInternship() {
      setIsLoading(true);
      const { data, error } = await (supabase.from('sponsora_posts') as any)
        .select('*')
        .eq('slug', postSlug)
        .single();
        
      if (!error && data) {
        setInternship({
          ...data,
          metadata: data.metadata || {}
        });
      }
      setIsLoading(false);
      window.dispatchEvent(new Event("sponsora-page-loaded"));
    }
    
    fetchInternship();
  }, [postSlug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-transparent" />
    );
  }

  if (!internship || internship.is_deleted) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center pt-20 bg-transparent text-center px-4">
        <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck size={40} />
        </div>
        <h1 className="text-4xl font-black mb-3 tracking-tight">Opportunity Not Found</h1>
        <p className="text-foreground/60 max-w-md mx-auto mb-8">The internship or event you're looking for might have expired or been removed by the organizer.</p>
        <button onClick={() => router.back()} className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
          <ArrowLeft size={18} /> Back to Listings
        </button>
      </div>
    );
  }

  const meta = internship.metadata || {};
  const perksList = meta.perks ? meta.perks.split(',').map((s: string) => s.trim()).filter(Boolean) : [];
  
  const handleCompanyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSignedIn) {
      router.push("/sign-in?redirect_url=" + encodeURIComponent(window.location.pathname));
      return;
    }
    router.push("/subscribe");
  };

  const handleApplyClick = () => {
    if (!isSignedIn) {
      router.push("/sign-in?redirect_url=" + encodeURIComponent(window.location.pathname));
      return;
    }
    if (!isPaid) {
      router.push("/subscribe");
      return;
    }

    if (hasApplied && internship.apply_link) {
      window.open(internship.apply_link, "_blank");
      return;
    }

    if (internship.apply_link) {
      setShowApplyModal(true);
    } else {
      router.push("/subscribe");
    }
  };

  const handleEmailClick = () => {
    if (!isSignedIn) {
      router.push("/sign-in?redirect_url=" + encodeURIComponent(window.location.pathname));
      return;
    }
    if (!isPaid) {
      router.push("/subscribe");
      return;
    }
    // Automatically handled by mailto: link for paid users, but we can log click if needed
  };

  const handleImageClick = () => {
    if (!isSignedIn) {
      router.push("/sign-in?redirect_url=" + encodeURIComponent(window.location.pathname));
      return;
    }
    if (!isPaid) {
      router.push("/subscribe");
      return;
    }
    setFullscreenImage(meta.apply_image_url);
  };

  const handleConfirmApply = async () => {
    setIsApplying(true);
    setApplyError("");
    
    try {
      const res = await fetch("/api/subscription/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ internshipId: internship.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "daily_limit_exceeded") {
          setApplyError(`Daily limit of ${data.limit} reached. Please try again tomorrow!`);
        } else {
          setApplyError(data.error || "Something went wrong.");
        }
        setIsApplying(false);
        return;
      }

      if (data.applyLink) {
        const newTab = window.open(data.applyLink, "_blank");
        if (!newTab) {
          window.location.href = data.applyLink; // Fallback if popup blocked
        }
        setShowApplyModal(false);
      } else {
        setApplyError("Apply link not found.");
      }
    } catch (err) {
      setApplyError("Network error. Please try again.");
    } finally {
      setIsApplying(false);
    }
  };

  // Calculate days left
  let daysLeftText = "Rolling";
  if (meta.deadline) {
    const diffTime = new Date(meta.deadline).getTime() - new Date().getTime();
    if (diffTime > 0) {
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        daysLeftText = `${diffDays} Days Left`;
    } else {
        daysLeftText = "Expired";
    }
  }

  // REUSABLE COMPONENTS FOR DIFFERENT LAYOUTS
  const TitleLogoCard = () => (
    <div className="p-6 md:p-8 rounded-[2rem] bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="w-20 h-20 md:w-28 md:h-28 shrink-0 rounded-2xl bg-white dark:bg-black/50 border border-black/5 flex items-center justify-center overflow-hidden relative">
            {isBlurred ? (
              <>
                <div className="absolute inset-0 backdrop-blur-md bg-white/20 dark:bg-black/30 z-10 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-primary/70" />
                </div>
                <Building2 className="w-12 h-12 text-foreground/20" />
              </>
            ) : meta.company_logo_url ? (
                <img src={meta.company_logo_url} alt={meta.company_name} className="w-full h-full object-cover" />
            ) : (
                <Building2 className="w-10 h-10 text-primary/40" />
            )}
        </div>
        <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-3 leading-tight tracking-tight">{internship.title}</h1>
            <div className="flex items-center gap-2 mt-1">
                <Building2 className="w-5 h-5 text-foreground/70 shrink-0" /> 
                {isBlurred ? (
                  <button
                    onClick={handleCompanyClick}
                    className="flex items-center gap-2 group/blur"
                    title="Unlock to see company"
                  >
                    <span
                      className="font-bold text-lg text-foreground/70 select-none pointer-events-none"
                      style={{
                        filter: "blur(8px)",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        color: "transparent",
                        textShadow: "0 0 12px rgba(108,99,255,0.6)",
                        letterSpacing: "3px",
                      }}
                    >
                      {meta.company_name || "████████████"}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold group-hover/blur:bg-primary group-hover/blur:text-white transition-all ml-2 cursor-pointer">
                      <Eye className="w-4 h-4" /> See Company details
                    </span>
                  </button>
                ) : (
                  <span className="text-foreground/70 font-bold text-lg">
                    {meta.company_name}
                  </span>
                )}
            </div>
        </div>
    </div>
  );

  const ApplyCard = () => (
    <div className="relative mt-10 lg:mt-0">
        {/* Days Left Tab */}
        <div className="absolute -top-10 left-0 bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-t-2xl font-black flex items-center gap-2">
            <span className="text-red-500">{daysLeftText.split(' ')[0]}</span> {daysLeftText.split(' ').slice(1).join(' ')}
        </div>
        
        {/* Main Apply Card */}
        <div className="bg-white dark:bg-[#111] rounded-[2rem] rounded-tl-none border-2 border-black/10 dark:border-white/10 p-6 md:p-8 shadow-2xl relative z-10 w-full flex flex-col gap-6">
            
            {!internship.apply_link && !meta.company_email && !meta.apply_image_url && (
                <button 
                    onClick={handleApplyClick}
                    className="w-full py-5 rounded-2xl bg-[#0066FF] hover:bg-[#0055DD] text-white font-black text-xl active:scale-95 transition-all shadow-xl shadow-blue-500/25"
                >
                    Apply Now
                </button>
            )}

            {internship.apply_link && (
                <button 
                    onClick={handleApplyClick}
                    className="w-full py-5 rounded-2xl bg-[#0066FF] hover:bg-[#0055DD] text-white font-black text-xl active:scale-95 transition-all shadow-xl shadow-blue-500/25"
                >
                    Apply Now
                </button>
            )}

            {meta.company_email && (
                isPaid ? (
                    <button 
                        onClick={() => setShowEmailModal(true)}
                        className="w-full py-5 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-black text-xl active:scale-95 transition-all shadow-xl shadow-slate-500/25 flex items-center justify-center"
                    >
                        Click me to see Email
                    </button>
                ) : (
                    <button 
                        onClick={handleEmailClick}
                        className="w-full py-5 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-black text-xl active:scale-95 transition-all shadow-xl shadow-slate-500/25"
                    >
                        See Company email id
                    </button>
                )
            )}

            {meta.apply_image_url && (
                <div className="relative w-full rounded-2xl overflow-hidden border-2 border-black/5 dark:border-white/5 bg-gray-50 dark:bg-black/20 group cursor-pointer" onClick={handleImageClick}>
                    <img 
                        src={meta.apply_image_url} 
                        alt="Apply Info" 
                        className={`w-full h-auto max-h-[300px] object-cover transition-all duration-300 ${!isPaid ? 'blur-md grayscale opacity-50' : 'group-hover:scale-105'}`} 
                    />
                    {!isPaid && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm gap-2">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30">
                                <Eye className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-bold text-white text-sm tracking-widest uppercase shadow-sm">See now</span>
                        </div>
                    )}
                </div>
            )}

            <div className="mt-2 flex items-center justify-center gap-2 text-foreground/60 font-black text-lg cursor-default group">
                <MousePointerClick size={20} className="group-hover:text-primary transition-colors" />
                <span className="group-hover:text-primary transition-colors">{internship.applied_count || meta.applied_count || '0'} Applied</span>
            </div>
        </div>
    </div>
  );

  const AdditionalInfoCard = () => (
    <div className="p-6 md:p-8 rounded-[2rem] bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            <h3 className="text-xl font-black">Additional Information</h3>
        </div>
        
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-foreground/5 hover:bg-foreground/[0.02] transition-colors">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600 shrink-0"><CalendarDays size={24} /></div>
                <div>
                    <p className="font-bold text-foreground">Internship Duration</p>
                    <p className="text-sm text-foreground/60">{meta.duration_months || '-'} months</p>
                </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-foreground/5 hover:bg-foreground/[0.02] transition-colors">
                <div className="w-12 h-12 flex items-center justify-center bg-green-50 dark:bg-green-500/10 rounded-xl text-green-600 shrink-0"><IndianRupee size={24} /></div>
                <div>
                    <p className="font-bold text-foreground">Internship Type</p>
                    <p className="text-sm text-foreground/60">{meta.is_unpaid ? 'Unpaid' : `Paid (₹${meta.stipend_min} - ₹${meta.stipend_max})`}</p>
                </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl border border-foreground/5 hover:bg-foreground/[0.02] transition-colors">
                <div className="w-12 h-12 flex items-center justify-center bg-purple-50 dark:bg-purple-500/10 rounded-xl text-purple-600 shrink-0"><Briefcase size={24} /></div>
                <div>
                    <p className="font-bold text-foreground">Work Detail</p>
                    <p className="text-sm text-foreground/60">Working Days: {meta.working_days || '5 Days'}</p>
                </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl border border-foreground/5 hover:bg-foreground/[0.02] transition-colors">
                <div className="w-12 h-12 flex items-center justify-center bg-orange-50 dark:bg-orange-500/10 rounded-xl text-orange-600 shrink-0"><Clock size={24} /></div>
                <div>
                    <p className="font-bold text-foreground">Internship Type/Timing</p>
                    <p className="text-sm text-foreground/60">Internship Type: {meta.location_type || 'Work From Home'}</p>
                    <p className="text-sm text-foreground/60">Internship Timing: {meta.timing || 'Full Time'}</p>
                </div>
            </div>

            {perksList.length > 0 && (
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-foreground/5 hover:bg-foreground/[0.02] transition-colors">
                    <div className="w-12 h-12 flex items-center justify-center bg-pink-50 dark:bg-pink-500/10 rounded-xl text-pink-600 shrink-0"><Award size={24} /></div>
                    <div>
                        <p className="font-bold text-foreground mb-1">Perks</p>
                        {perksList.map((p: string, i: number) => <p key={i} className="text-sm text-foreground/60 leading-relaxed">{p}</p>)}
                    </div>
                </div>
            )}
        </div>
    </div>
  );

  const AboutInternshipCard = () => {
    const defaultOrder = [
        ...(meta.custom_sections || []).map((_: any, i: number) => `custom_${i}`),
        'eligibility', 'roles', 'responsibilities', 'preferred_skills', 'what_you_will_gain', 'internship_details', 'who_should_apply'
    ];
    const currentOrder = meta.section_order || defaultOrder;

    return (
    <div className="p-6 md:p-8 rounded-[2rem] bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            <h3 className="text-xl font-black">About the Internship</h3>
        </div>
        
        <div className="space-y-10">
            {currentOrder.map((secKey: string, idx: number) => {
                const isCustom = secKey.startsWith('custom_');
                const customIdx = isCustom ? parseInt(secKey.split('_')[1]) : -1;
                
                if (isCustom && !meta.custom_sections?.[customIdx]) return null;

                const legacyTitles: Record<string, string> = {
                    eligibility: 'Eligibility',
                    roles: 'Roles',
                    responsibilities: 'Responsibility',
                    preferred_skills: 'Preferred / Technical Skills',
                    what_you_will_gain: 'What You Will Gain',
                    internship_details: 'Internship Details',
                    who_should_apply: 'Who Should Apply'
                };
                
                const title = isCustom ? (meta.custom_sections[customIdx]?.title || 'Custom Section') : (legacyTitles[secKey] || secKey);
                const content = isCustom ? (meta.custom_sections[customIdx]?.content || '') : (meta[secKey] || '');
                
                if (!content) return null;
                
                return (
                    <div key={idx}>
                        <h4 className="font-bold text-lg mb-3 text-foreground/90">{title}</h4>
                        <div className="text-[15px] text-foreground/70 leading-relaxed whitespace-pre-line">{content}</div>
                    </div>
                );
            })}

            {internship.description && (
                <div>
                    <h4 className="font-bold text-lg mb-3 text-foreground/90">Description</h4>
                    <div className="text-[15px] text-foreground/70 leading-relaxed prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: internship.description }} />
                </div>
            )}
        </div>
    </div>
  )};

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col pt-24 pb-24 bg-transparent text-foreground overflow-x-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-4 md:px-8 mx-auto flex flex-col gap-6">
        
        <div className="flex items-center justify-between w-full">
          <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-foreground/50 hover:text-foreground transition-colors text-sm font-bold bg-foreground/5 px-4 py-2 rounded-full w-fit hover:bg-foreground/10"
          >
              <ArrowLeft className="w-4 h-4" /> Back to listings
          </button>
          
          <div className="flex items-center gap-2">
              <button
                  onClick={() => {
                      const url = window.location.href;
                      navigator.clipboard.writeText(url);
                      alert("Link copied to clipboard!");
                  }}
                  className="flex items-center gap-2 text-foreground/50 hover:text-foreground transition-colors text-sm font-bold bg-foreground/5 p-2 md:px-4 md:py-2 rounded-full w-fit hover:bg-foreground/10"
                  title="Copy Link"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                  <span className="hidden md:inline">Copy Link</span>
              </button>
              <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this opportunity: ${internship.title}\n\n`)}${typeof window !== 'undefined' ? window.location.href : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#25D366] hover:text-[#128C7E] transition-colors text-sm font-bold bg-[#25D366]/10 p-2 md:px-4 md:py-2 rounded-full w-fit hover:bg-[#25D366]/20"
                  title="Share on WhatsApp"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  <span className="hidden md:inline">Share</span>
              </a>
          </div>
        </div>

        {/* --- MOBILE VIEW --- */}
        <div className="flex flex-col gap-6 lg:hidden w-full">
            <TitleLogoCard />
            <ApplyCard />
            <AdditionalInfoCard />
            <AboutInternshipCard />
        </div>

        {/* --- LAPTOP VIEW --- */}
        <div className="hidden lg:grid grid-cols-5 gap-10 items-start w-full">
            <div className="col-span-3 flex flex-col gap-6 w-full">
                <TitleLogoCard />
                <AboutInternshipCard />
            </div>
            <div className="col-span-2 flex flex-col gap-6 sticky top-28">
                <ApplyCard />
                <AdditionalInfoCard />
            </div>
        </div>
        </div>

      {/* Apply Limits Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-white/10 relative text-center flex flex-col items-center"
          >
            <button 
              onClick={() => setShowApplyModal(false)}
              className="absolute top-4 right-4 text-foreground/50 hover:text-foreground transition-colors"
            >
              ✕
            </button>
            <img src="/images/warning_doodle.png" alt="Use Limits Wisely" className="w-40 h-40 object-contain mb-4 drop-shadow-lg" />
            <h3 className="text-xl font-black mb-2">Use Limit Wisely! 🎯</h3>
            <p className="text-sm text-foreground/70 leading-relaxed mb-6">
              Clicking continue will securely redirect you to the original application form and consume <strong className="text-primary">1 Apply Limit</strong> from your daily quota.
            </p>
            
            {applyError && (
              <div className="w-full p-3 mb-6 rounded-xl bg-red-500/10 text-red-500 text-sm font-bold">
                {applyError}
              </div>
            )}

            <button
              onClick={handleConfirmApply}
              disabled={isApplying}
              className="w-full py-4 rounded-2xl bg-[#0066FF] hover:bg-[#0055DD] text-white font-black text-lg active:scale-95 transition-all shadow-xl shadow-blue-500/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isApplying ? "Processing..." : "Confirm & Apply"}
            </button>
            <button
              onClick={() => setShowApplyModal(false)}
              className="mt-4 text-sm font-bold text-foreground/50 hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}

      {/* Fullscreen Image Viewer Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md">
            <button 
              onClick={() => setFullscreenImage(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md border border-white/10"
            >
              <ArrowLeft className="w-6 h-6 rotate-180" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={fullscreenImage} 
              alt="Fullscreen Apply Image" 
              className="max-w-full max-h-full rounded-xl object-contain shadow-2xl"
            />
          </div>
        )}
      </AnimatePresence>

      {/* Email Modal */}
      <AnimatePresence>
        {showEmailModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-white/10 relative text-center flex flex-col items-center overflow-hidden"
            >
              <button 
                onClick={() => setShowEmailModal(false)}
                className="absolute top-4 right-4 p-2 text-foreground/40 hover:text-foreground/80 bg-foreground/5 hover:bg-foreground/10 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </button>

              <div className="w-16 h-16 bg-slate-500/10 text-slate-600 dark:text-slate-400 rounded-full flex items-center justify-center mb-6">
                <FileText size={32} />
              </div>
              
              <h2 className="text-2xl font-black mb-2 text-foreground">Company Email ID</h2>
              <p className="text-foreground/60 mb-8 max-w-sm">
                You can send your application directly to the company using the email address below.
              </p>

              <div className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-6 overflow-x-auto custom-scrollbar">
                <span className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                    {meta.company_email}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row w-full gap-3">
                <button 
                  onClick={() => {
                      navigator.clipboard.writeText(meta.company_email);
                      alert("Email copied to clipboard!");
                  }}
                  className="w-full py-4 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                >
                  Copy Email
                </button>
                <a 
                  href={`mailto:${meta.company_email}`}
                  onClick={() => setShowEmailModal(false)}
                  className="w-full py-4 rounded-xl font-bold text-white bg-[#0066FF] hover:bg-[#0055DD] transition-colors flex items-center justify-center"
                >
                  Open Mail App
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
