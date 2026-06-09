"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Building2, MapPin, IndianRupee, Clock, CalendarDays, ArrowLeft, ShieldCheck, Zap, Briefcase, Users, Star, Target, CheckCircle2, Award, FileText, MousePointerClick } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { useSubscription } from "@/components/SubscriptionContext";
import { useUser } from "@clerk/nextjs";

export default function InternshipDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postSlug = params.postSlug as string;
  
  const [internship, setInternship] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isPaid } = useSubscription();
  const { isSignedIn } = useUser();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!postSlug) return;
    
    async function fetchInternship() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('sponsora_posts')
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
  
  const handleApplyClick = () => {
    if (!isSignedIn) {
      router.push("/sign-up?redirect_url=" + encodeURIComponent(window.location.pathname));
    } else if (!isPaid) {
      router.push("/subscribe");
    } else if (internship.apply_link) {
      window.open(internship.apply_link, "_blank");
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
            {!isPaid ? (
                <>
                  <div className="absolute inset-0 backdrop-blur-md bg-white/20 dark:bg-black/30 z-10 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-8 h-8 text-primary/70" />
                  </div>
                  <Building2 className="w-10 h-10 text-foreground/20" />
                </>
            ) : meta.company_logo_url ? (
                <img src={meta.company_logo_url} alt={meta.company_name} className="w-full h-full object-cover" />
            ) : (
                <Building2 className="w-10 h-10 text-primary/40" />
            )}
        </div>
        <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-3 leading-tight tracking-tight">{internship.title}</h1>
            <div className="flex items-center gap-2 text-foreground/70 font-bold text-lg">
                <Building2 className="w-5 h-5" /> 
                {!isPaid ? (
                    <span
                      className="select-none pointer-events-none"
                      style={{
                        filter: "blur(6px)",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        color: "transparent",
                        textShadow: "0 0 10px rgba(108,99,255,0.5)",
                        letterSpacing: "2px",
                      }}
                    >
                      {meta.company_name || "████████████"}
                    </span>
                ) : (
                    meta.company_name
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
        <div className="bg-white dark:bg-[#111] rounded-[2rem] rounded-tl-none border-2 border-black/10 dark:border-white/10 p-6 md:p-8 shadow-2xl relative z-10 w-full">
            <button 
                onClick={handleApplyClick}
                className="w-full py-5 rounded-2xl bg-[#0066FF] hover:bg-[#0055DD] text-white font-black text-xl active:scale-95 transition-all shadow-xl shadow-blue-500/25"
            >
                Apply Now
            </button>
            
            <div className="mt-8 flex items-center justify-center gap-2 text-foreground/60 font-black text-lg cursor-default group">
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
        
        <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-foreground/50 hover:text-foreground transition-colors text-sm font-bold bg-foreground/5 px-4 py-2 rounded-full w-fit hover:bg-foreground/10"
        >
            <ArrowLeft className="w-4 h-4" /> Back to listings
        </button>

        {/* --- MOBILE VIEW --- */}
        <div className="flex flex-col gap-6 lg:hidden w-full">
            <TitleLogoCard />
            <ApplyCard />
            <AdditionalInfoCard />
            <AboutInternshipCard />
        </div>

        {/* --- LAPTOP VIEW --- */}
        <div className="hidden lg:grid grid-cols-3 gap-12 items-start w-full">
            <div className="col-span-2 flex flex-col gap-6 w-full">
                <TitleLogoCard />
                <AboutInternshipCard />
            </div>
            <div className="col-span-1 flex flex-col gap-6 sticky top-28">
                <ApplyCard />
                <AdditionalInfoCard />
            </div>
        </div>

      </div>
    </div>
  );
}
