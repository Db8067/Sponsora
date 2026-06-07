"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Building2, MapPin, IndianRupee, Clock, CalendarDays, ArrowLeft, Share2, ShieldCheck, CheckCircle2, Briefcase, Zap, Star } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

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
      <div className="min-h-[100dvh] pt-32 pb-12 flex justify-center items-center bg-background">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <p className="text-foreground/50 font-medium animate-pulse">Loading opportunity...</p>
        </div>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center pt-20 bg-background text-center px-4">
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
    <div className="relative min-h-[100dvh] w-full flex flex-col overflow-x-hidden pt-24 pb-24 bg-background text-foreground selection:bg-primary/30">
      
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-4 md:px-8 mx-auto flex flex-col gap-8">
        
        {/* Navigation & Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 text-foreground/50 hover:text-foreground transition-colors mb-2 text-sm font-bold bg-foreground/5 px-4 py-2 rounded-full w-fit hover:bg-foreground/10"
            >
                <ArrowLeft className="w-4 h-4" /> Back to listings
            </button>
        </motion.div>

        {/* Hero Banner Area */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full relative rounded-[2rem] md:rounded-[3rem] bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 shadow-xl shadow-black/5 overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-32 md:h-48 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/10" />
            
            <div className="relative pt-20 md:pt-32 px-6 pb-8 md:px-12 md:pb-12 flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-end">
                {/* Logo Card */}
                <div className="w-24 h-24 md:w-36 md:h-36 shrink-0 rounded-3xl bg-white dark:bg-black/50 border-4 border-white dark:border-[#121212] flex items-center justify-center overflow-hidden shadow-2xl relative z-10">
                    {meta.company_logo_url ? (
                        <img src={meta.company_logo_url} alt={meta.company_name} className="w-full h-full object-cover" />
                    ) : (
                        <Building2 className="w-12 h-12 text-primary/40" />
                    )}
                </div>

                {/* Title & Company */}
                <div className="flex-1 min-w-0 pb-2">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        {meta.is_featured && (
                            <span className="px-3 py-1 text-xs font-black tracking-widest uppercase rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center gap-1.5">
                                <Star size={12} className="fill-amber-500" /> Featured
                            </span>
                        )}
                        <span className="px-3 py-1 text-xs font-black tracking-widest uppercase rounded-full bg-green-500/10 text-green-500 border border-green-500/20 flex items-center gap-1.5">
                            <ShieldCheck size={12} /> Verified
                        </span>
                        <span className="px-3 py-1 text-xs font-black tracking-widest uppercase rounded-full bg-foreground/5 text-foreground/60 border border-foreground/10">
                            {meta.duration_months ? 'Internship' : 'Event'}
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1] mb-3">
                        {internship.title}
                    </h1>
                    <div className="flex items-center gap-2 text-lg md:text-xl font-bold text-foreground/70">
                        <Building2 className="w-5 h-5 text-primary" />
                        {meta.company_name || 'Company Name'}
                    </div>
                </div>

                {/* Desktop Apply Button (Floating right) */}
                <div className="hidden lg:flex shrink-0 pb-2">
                    <button 
                        onClick={handleApplyClick}
                        className="px-10 py-5 rounded-2xl bg-primary text-primary-foreground font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/25 flex items-center gap-3"
                    >
                        Apply Now <Zap className="fill-primary-foreground" size={20} />
                    </button>
                </div>
            </div>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          
            {/* Left Content Column */}
            <div className="xl:col-span-2 flex flex-col gap-8 w-full">
                
                {/* Mobile/Tablet Apply Button & Highlights */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                    className="lg:hidden flex flex-col gap-4"
                >
                    <button 
                        onClick={handleApplyClick}
                        className="w-full py-5 rounded-2xl bg-primary text-primary-foreground font-black text-lg active:scale-[0.98] transition-all shadow-xl shadow-primary/25 flex items-center justify-center gap-3"
                    >
                        Apply Now <Zap className="fill-primary-foreground" size={20} />
                    </button>
                </motion.div>

                {/* About Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                    className="p-6 md:p-10 rounded-[2rem] bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 shadow-sm relative overflow-hidden group"
                >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary to-accent opacity-50 group-hover:opacity-100 transition-opacity" />
                    <h2 className="text-2xl font-black mb-6 flex items-center gap-3"><Briefcase className="text-primary" /> About the Role</h2>
                    <div className="prose prose-lg prose-p:text-foreground/80 prose-headings:text-foreground prose-a:text-primary dark:prose-invert max-w-none leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: internship.description || 'No description provided.' }} />
                </motion.div>

                {/* Skills & Perks Grid */}
                {(skillsList.length > 0 || perksList.length > 0) && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {skillsList.length > 0 && (
                            <div className="p-6 md:p-8 rounded-[2rem] bg-foreground/[0.02] border border-foreground/5 shadow-sm">
                                <h3 className="text-lg font-black mb-5 text-foreground/90 uppercase tracking-widest text-xs">Required Skills</h3>
                                <div className="flex flex-wrap gap-2.5">
                                    {skillsList.map((skill: string, i: number) => (
                                        <span key={i} className="px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 text-sm font-bold text-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-default">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {perksList.length > 0 && (
                            <div className="p-6 md:p-8 rounded-[2rem] bg-foreground/[0.02] border border-foreground/5 shadow-sm">
                                <h3 className="text-lg font-black mb-5 text-foreground/90 uppercase tracking-widest text-xs">Perks & Benefits</h3>
                                <div className="flex flex-col gap-4">
                                    {perksList.map((perk: string, i: number) => (
                                        <div key={i} className="flex items-center gap-3 text-foreground/80 font-medium">
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            </div>
                                            <span>{perk}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Right Sidebar (Logistics Grid) */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                className="xl:col-span-1 flex flex-col gap-6 sticky top-28"
            >
                <div className="p-6 md:p-8 rounded-[2rem] bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 shadow-sm flex flex-col gap-6">
                    <h3 className="font-black text-lg border-b border-black/5 dark:border-white/10 pb-4">Key Details</h3>
                    
                    {/* Detail Items */}
                    <div className="grid grid-cols-2 xl:grid-cols-1 gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/20">
                                <IndianRupee className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-xs text-foreground/50 font-bold uppercase tracking-wider mb-0.5">Stipend</p>
                                <p className="font-black text-foreground">
                                    {meta.is_unpaid ? 'Unpaid' : `₹${meta.stipend_min || '0'} - ₹${meta.stipend_max || '0'}/mo`}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                                <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-xs text-foreground/50 font-bold uppercase tracking-wider mb-0.5">Location</p>
                                <p className="font-black text-foreground capitalize">
                                    {meta.location_type || 'Online'}{meta.city ? `, ${meta.city}` : ''}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
                                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <p className="text-xs text-foreground/50 font-bold uppercase tracking-wider mb-0.5">Duration</p>
                                <p className="font-black text-foreground">{meta.duration_months || '-'} Months</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center shrink-0 border border-rose-500/20">
                                <CalendarDays className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                            </div>
                            <div>
                                <p className="text-xs text-foreground/50 font-bold uppercase tracking-wider mb-0.5">Apply By</p>
                                <p className="font-black text-foreground">{meta.deadline ? new Date(meta.deadline).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : 'Rolling'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 transition-colors font-bold shadow-sm">
                    <Share2 className="w-4 h-4" /> Share with Friends
                </button>
            </motion.div>
        </div>
      </div>
    </div>
  );
}
