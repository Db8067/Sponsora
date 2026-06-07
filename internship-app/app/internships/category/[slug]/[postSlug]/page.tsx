import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Calendar, MapPin, IndianRupee, Clock, ArrowLeft, ExternalLink, CheckCircle2, Building2, CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string, postSlug: string } }): Promise<Metadata> {
  const { supabase } = await import("@/lib/supabase");
  const { data: post } = await supabase
    .from("sponsora_posts")
    .select("title, description")
    .eq("id", params.postSlug)
    .single();

  return {
    title: post ? `${post.title} | Sponsora` : "Internship Not Found | Sponsora",
    description: post?.description?.slice(0, 150) || "Internship details",
  };
}

export default async function InternshipDetailsPage({ params }: { params: { slug: string, postSlug: string } }) {
  const { supabase } = await import("@/lib/supabase");
  
  const { data: post, error } = await supabase
    .from('sponsora_posts')
    .select('*, sponsora_categories(*)')
    .eq('id', params.postSlug)
    .single();

  if (error || !post) {
    notFound();
  }

  const category = post.sponsora_categories;
  const meta = post.metadata || {};

  const formatStipend = () => {
    if (!meta.stipend_min && !meta.stipend_max) return "Unpaid";
    if (meta.stipend_min && !meta.stipend_max) return `₹${Number(meta.stipend_min).toLocaleString()}/mo`;
    return `₹${Number(meta.stipend_min).toLocaleString()} - ₹${Number(meta.stipend_max).toLocaleString()}/mo`;
  };

  const skillsList = meta.skills ? meta.skills.split(',').map((s: string) => s.trim()).filter(Boolean) : [];
  const perksList = meta.perks ? meta.perks.split(',').map((s: string) => s.trim()).filter(Boolean) : [];

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col overflow-x-hidden pt-28 pb-12 selection:bg-primary/30 bg-background">
      <div className="relative z-10 flex flex-col w-full max-w-[1200px] px-4 md:px-6 mx-auto">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm font-medium text-foreground/50 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/internshipcategory" className="hover:text-primary transition-colors">Categories</Link>
          <ChevronRight className="w-4 h-4" />
          {category && (
            <>
              <Link href={`/internships/category/${category.slug}`} className="hover:text-primary transition-colors capitalize">{category.name}</Link>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
          <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
        </nav>

        {/* Hero Section */}
        <div className="w-full bg-white dark:bg-[#1A1A1D] rounded-[2rem] border border-black/5 dark:border-white/10 shadow-xl overflow-hidden mb-8">
          <div className="w-full h-[200px] md:h-[250px] relative bg-primary/10 flex items-center justify-center">
             {post.image_url && (
               <img src={post.image_url} alt={post.title} className="w-full h-full object-cover opacity-60 mix-blend-overlay absolute inset-0" />
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div className="relative px-6 md:px-12 pb-12 -mt-16">
            <div className="flex flex-col md:flex-row md:items-end gap-6 justify-between">
              
              <div className="flex flex-col md:flex-row gap-6 md:items-end">
                <div className="h-24 w-24 md:h-32 md:w-32 shrink-0 rounded-2xl bg-white border-4 border-background shadow-lg flex items-center justify-center overflow-hidden z-10">
                  {meta.company_logo_url ? (
                    <img src={meta.company_logo_url} alt={meta.company_name} className="h-full w-full object-cover" />
                  ) : (
                    <Building2 className="w-12 h-12 text-primary/50" />
                  )}
                </div>
                
                <div className="z-10 pb-2">
                  {meta.is_featured && (
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-bold rounded-full bg-accent/20 text-accent border border-accent/20 uppercase tracking-wider">
                      Featured Opportunity
                    </span>
                  )}
                  <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-2">
                    {post.title}
                  </h1>
                  <p className="text-lg text-foreground/70 font-medium flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    {meta.company_name || "Company Name"}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Info Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-black/5 dark:divide-white/10 border-t border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5">
            <div className="p-6 flex flex-col gap-1 items-center justify-center text-center">
              <IndianRupee className="w-6 h-6 text-green-500 mb-1" />
              <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Stipend</span>
              <span className="font-semibold text-foreground">{formatStipend()}</span>
            </div>
            <div className="p-6 flex flex-col gap-1 items-center justify-center text-center">
              <MapPin className="w-6 h-6 text-primary mb-1" />
              <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Location</span>
              <span className="font-semibold text-foreground line-clamp-1">
                {meta.location_type === 'Remote' ? 'Remote' : `${meta.location_type} ${meta.city ? `- ${meta.city}` : ''}`}
              </span>
            </div>
            <div className="p-6 flex flex-col gap-1 items-center justify-center text-center">
              <Clock className="w-6 h-6 text-accent mb-1" />
              <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Duration</span>
              <span className="font-semibold text-foreground">{meta.duration_months ? `${meta.duration_months} Months` : 'Variable'}</span>
            </div>
            <div className="p-6 flex flex-col gap-1 items-center justify-center text-center">
              <CalendarDays className="w-6 h-6 text-red-500 mb-1" />
              <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Apply By</span>
              <span className="font-semibold text-foreground">{meta.deadline ? new Date(meta.deadline).toLocaleDateString() : 'Rolling'}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8">
            
            <div className="bg-white dark:bg-[#1A1A1D] rounded-[2rem] border border-black/5 dark:border-white/10 p-8 md:p-10 shadow-lg">
              <h2 className="text-2xl font-bold text-foreground mb-6">About the Role</h2>
              <div 
                className="prose dark:prose-invert max-w-none text-foreground/80 leading-relaxed whitespace-pre-line"
              >
                {post.description || "No description provided for this internship."}
              </div>
            </div>

            {skillsList.length > 0 && (
              <div className="bg-white dark:bg-[#1A1A1D] rounded-[2rem] border border-black/5 dark:border-white/10 p-8 md:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-foreground mb-6">Skills Required</h2>
                <div className="flex flex-wrap gap-3">
                  {skillsList.map((skill: string, i: number) => (
                    <span key={i} className="px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-sm font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {perksList.length > 0 && (
              <div className="bg-white dark:bg-[#1A1A1D] rounded-[2rem] border border-black/5 dark:border-white/10 p-8 md:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-foreground mb-6">Perks & Benefits</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {perksList.map((perk: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-foreground/80 font-medium">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-28">
              
              <div className="bg-white dark:bg-[#1A1A1D] rounded-[2rem] border border-black/5 dark:border-white/10 p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-accent" />
                
                <h3 className="text-xl font-bold text-foreground mb-2">Ready to apply?</h3>
                <p className="text-foreground/60 text-sm mb-8">
                  Make sure your profile and resume are up to date before applying.
                </p>

                {post.apply_link ? (
                  <Link 
                    href={post.apply_link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary-dark transition-colors py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 group"
                  >
                    Apply Now <ExternalLink className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ) : (
                  <button disabled className="w-full bg-black/5 dark:bg-white/5 text-foreground/50 py-4 rounded-xl font-bold cursor-not-allowed">
                    Applications Closed
                  </button>
                )}
                
                <div className="mt-6 flex flex-col gap-3 text-sm text-foreground/60 border-t border-black/5 dark:border-white/10 pt-6">
                  <div className="flex justify-between items-center">
                    <span>Posted On</span>
                    <span className="font-semibold text-foreground">{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Deadline</span>
                    <span className="font-semibold text-foreground">{meta.deadline ? new Date(meta.deadline).toLocaleDateString() : 'Rolling'}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
