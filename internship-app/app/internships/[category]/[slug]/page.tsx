"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Building2, MapPin, IndianRupee, Clock, CalendarDays, ArrowLeft, Share2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Internship } from "@/components/InternshipCard";

// Mock fetching single internship
const getMockInternship = (slug: string): Internship & { description: string; perks: string[] } => ({
  id: "1",
  title: "Frontend Engineering Intern",
  slug: slug,
  company_name: "TechCorp Global",
  location_type: "remote",
  stipend_min: 15000,
  stipend_max: 20000,
  duration_months: 6,
  skills_required: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  is_featured: true,
  category_slug: "software-engineering",
  deadline: "2026-08-01",
  description: `We are looking for a passionate Frontend Engineering Intern to join our core product team. You will be working directly with senior engineers to build and ship features that reach millions of users. 
  
As an intern, you will not just be fixing bugs — you will own entire features from ideation to deployment. Our tech stack is heavily reliant on Next.js, React 19, and Tailwind CSS. We value performance, accessibility, and clean architecture.`,
  perks: ["Flexible Working Hours", "Mentorship from Senior Devs", "Pre-Placement Offer (PPO) available", "Free Swag kit"]
});

export default function InternshipDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  
  const [internship, setInternship] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setInternship(getMockInternship(slug as string));
      setIsLoading(false);
    }, 600);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-12 flex justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!internship) return null;

  const handleApplyClick = () => {
    // Redirect to the subscription page instead of external link
    router.push("/subscribe");
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col overflow-x-hidden pt-24 pb-20 selection:bg-primary/30">
      
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Content (Left / Top) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Header Card */}
            <div className="p-6 md:p-8 rounded-3xl glass border border-white/10 dark:border-white/5 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row gap-6 sm:items-start">
                <div className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                  <Building2 className="w-10 h-10 text-primary/50" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {internship.is_featured && (
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-accent/20 text-accent border border-accent/20">
                        Top Internship
                      </span>
                    )}
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                      Verified Company
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-2">
                    {internship.title}
                  </h1>
                  <p className="text-xl text-foreground/70 font-medium flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    {internship.company_name}
                  </p>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="p-6 md:p-8 rounded-3xl glass border border-white/10 dark:border-white/5">
              <h2 className="text-2xl font-bold mb-4">About the Role</h2>
              <div className="prose prose-invert max-w-none text-foreground/80 leading-relaxed whitespace-pre-line">
                {internship.description}
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4">Skills Required</h3>
              <div className="flex flex-wrap gap-2">
                {internship.skills_required.map((skill: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-foreground/90">
                    {skill}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4">Perks & Benefits</h3>
              <div className="flex flex-col gap-3">
                {internship.perks.map((perk: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-foreground/80">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-1 flex flex-col gap-6 sticky top-24">
            
            {/* Quick Details Card */}
            <div className="p-6 rounded-3xl glass border border-white/10 dark:border-white/5">
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <IndianRupee className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/50 font-medium">Stipend</p>
                    <p className="font-bold text-foreground">₹{internship.stipend_min.toLocaleString()} - ₹{internship.stipend_max.toLocaleString()}/mo</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/50 font-medium">Location</p>
                    <p className="font-bold text-foreground capitalize">{internship.location_type}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-foreground/70" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/50 font-medium">Duration</p>
                    <p className="font-bold text-foreground">{internship.duration_months} Months</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <CalendarDays className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/50 font-medium">Apply By</p>
                    <p className="font-bold text-foreground">{new Date(internship.deadline).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="w-full h-[1px] bg-white/10 my-6" />

              <button 
                onClick={handleApplyClick}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-lg hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Apply Now <ShieldCheck className="w-5 h-5" />
              </button>
              <p className="text-center text-xs text-foreground/50 mt-3 flex items-center justify-center gap-1">
                Sponsora Premium Required
              </p>
            </div>

            <button className="flex items-center justify-center gap-2 py-3 rounded-xl glass hover:bg-white/5 transition-colors font-medium">
              <Share2 className="w-4 h-4" /> Share Opportunity
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
