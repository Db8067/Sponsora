"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Building2, MapPin, IndianRupee, Clock, CalendarDays, ArrowLeft, Share2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function InternshipDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [internship, setInternship] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) return;
    
    async function fetchInternship() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('sponsora_posts')
        .select('*')
        .eq('id', id)
        .single();
        
      if (!error && data) {
        setInternship({
          ...data,
          metadata: data.metadata || {}
        });
      }
      setIsLoading(false);
    }
    
    fetchInternship();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-12 flex justify-center bg-background">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 bg-background text-center px-4">
        <h1 className="text-3xl font-black mb-2">Internship Not Found</h1>
        <button onClick={() => router.back()} className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold mt-4 flex items-center gap-2 mx-auto">
          <ArrowLeft size={18} /> Go Back
        </button>
      </div>
    );
  }

  const meta = internship.metadata || {};
  const skillsList = meta.skills ? meta.skills.split(',').map((s: string) => s.trim()).filter(Boolean) : [];
  const perksList = meta.perks ? meta.perks.split(',').map((s: string) => s.trim()).filter(Boolean) : [];

  const handleApplyClick = () => {
    if (internship.apply_link) {
      window.open(internship.apply_link, "_blank");
    } else {
      router.push("/subscribe");
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col overflow-x-hidden pt-24 pb-20 selection:bg-primary/30 bg-background text-foreground">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none hidden dark:block" />

      <div className="relative z-10 w-full max-w-[1000px] px-4 md:px-6 mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-6 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to listings
        </button>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Content (Left / Top) */}
          <div className="lg:col-span-2 flex flex-col gap-8 w-full">
            
            {/* Header Card */}
            <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 relative overflow-hidden shadow-sm">
              <div className="flex flex-col sm:flex-row gap-6 sm:items-start">
                <div className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center overflow-hidden">
                  {meta.company_logo_url ? (
                    <img src={meta.company_logo_url} alt={meta.company_name} className="w-full h-full object-cover" />
                  ) : (
                    <Building2 className="w-10 h-10 text-primary/50" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {meta.is_featured && (
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-accent/20 text-accent border border-accent/20">
                        Featured
                      </span>
                    )}
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                      Verified
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-2">
                    {internship.title}
                  </h1>
                  <p className="text-xl text-foreground/70 font-medium flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    {meta.company_name || 'Company Name'}
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Only Quick Details */}
            <div className="lg:hidden p-6 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 w-full shadow-sm">
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <IndianRupee className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 font-medium">Stipend</p>
                      <p className="font-bold text-sm text-foreground">₹{meta.stipend_min || '0'} - ₹{meta.stipend_max || '0'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 font-medium">Location</p>
                      <p className="font-bold text-sm text-foreground capitalize">{meta.location_type || 'Online'}{meta.city ? `, ${meta.city}` : ''}</p>
                    </div>
                  </div>
                </div>
                
                <div className="w-full h-[1px] bg-black/5 dark:bg-white/10 my-2" />

                <button 
                  onClick={handleApplyClick}
                  className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Apply Now <ShieldCheck className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* About Section */}
            <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">About the Role</h2>
              <div className="prose prose-invert max-w-none text-foreground/80 leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: internship.description || 'No description provided.' }} />

              {skillsList.length > 0 && (
                <>
                  <h3 className="text-xl font-bold mt-8 mb-4">Skills Required</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsList.map((skill: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm font-medium text-foreground/90">
                        {skill}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {perksList.length > 0 && (
                <>
                  <h3 className="text-xl font-bold mt-8 mb-4">Perks & Benefits</h3>
                  <div className="flex flex-col gap-3">
                    {perksList.map((perk: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 text-foreground/80">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

          </div>

          {/* Sidebar (Right) */}
          <div className="hidden lg:flex lg:col-span-1 flex-col gap-6 sticky top-24">
            
            {/* Quick Details Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm">
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <IndianRupee className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/50 font-medium">Stipend</p>
                    <p className="font-bold text-foreground">₹{meta.stipend_min || '0'} - ₹{meta.stipend_max || '0'}/mo</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/50 font-medium">Location</p>
                    <p className="font-bold text-foreground capitalize">{meta.location_type || 'Online'}{meta.city ? `, ${meta.city}` : ''}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-foreground/70" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/50 font-medium">Duration</p>
                    <p className="font-bold text-foreground">{meta.duration_months || '-'} Months</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <CalendarDays className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/50 font-medium">Apply By</p>
                    <p className="font-bold text-foreground">{meta.deadline ? new Date(meta.deadline).toLocaleDateString() : 'Rolling'}</p>
                  </div>
                </div>
              </div>

              <div className="w-full h-[1px] bg-black/5 dark:bg-white/10 my-6" />

              <button 
                onClick={handleApplyClick}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                Apply Now <ShieldCheck className="w-5 h-5" />
              </button>
            </div>

            <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors font-medium shadow-sm">
              <Share2 className="w-4 h-4" /> Share Opportunity
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
