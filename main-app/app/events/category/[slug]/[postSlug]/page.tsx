import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Calendar, MapPin, Trophy, Users, ExternalLink, CheckCircle2 } from "lucide-react";
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
    title: post ? `${post.title} | Sponsora` : "Event Not Found | Sponsora",
    description: post?.description?.slice(0, 150) || "Event details",
  };
}

export default async function EventDetailsPage({ params }: { params: { slug: string, postSlug: string } }) {
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
  const skillsList = meta.skills ? meta.skills.split(',').map((s: string) => s.trim()).filter(Boolean) : [];

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col overflow-x-hidden pt-28 pb-12 selection:bg-primary/30 bg-background">
      <div className="relative z-10 flex flex-col w-full max-w-[1200px] px-4 md:px-6 mx-auto">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm font-medium text-foreground/50 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
          <ChevronRight className="w-4 h-4" />
          {category && (
            <>
              <Link href={`/events/category/${category.slug}`} className="hover:text-primary transition-colors capitalize">{category.name}</Link>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
          <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
        </nav>

        {/* Hero Section */}
        <div className="w-full bg-white dark:bg-[#1A1A1D] rounded-[2rem] border border-black/5 dark:border-white/10 shadow-xl overflow-hidden mb-8">
          <div className="w-full h-[250px] md:h-[350px] relative bg-primary/10 flex items-center justify-center">
             {post.image_url ? (
               <img src={post.image_url} alt={post.title} className="w-full h-full object-cover absolute inset-0" />
             ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 absolute inset-0" />
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
             
             <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
                {meta.is_featured && (
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-bold rounded-full bg-accent text-accent-foreground uppercase tracking-wider shadow-lg">
                        Featured Event
                    </span>
                )}
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">
                    {post.title}
                </h1>
                <p className="text-lg text-white/80 font-medium">
                    {category?.name || "Event"}
                </p>
             </div>
          </div>

          {/* Quick Info Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-black/5 dark:divide-white/10 border-t border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5">
            <div className="p-6 flex flex-col gap-1 items-center justify-center text-center">
              <Calendar className="w-6 h-6 text-indigo-500 mb-1" />
              <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Date</span>
              <span className="font-semibold text-foreground">{post.date_info || "TBD"}</span>
            </div>
            <div className="p-6 flex flex-col gap-1 items-center justify-center text-center">
              <MapPin className="w-6 h-6 text-orange-500 mb-1" />
              <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Venue</span>
              <span className="font-semibold text-foreground capitalize line-clamp-1">
                {meta.venue_type || 'TBD'}
              </span>
            </div>
            <div className="p-6 flex flex-col gap-1 items-center justify-center text-center">
              <Trophy className="w-6 h-6 text-yellow-500 mb-1" />
              <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Prize Pool</span>
              <span className="font-semibold text-foreground">{meta.prize_pool || "Glory"}</span>
            </div>
            <div className="p-6 flex flex-col gap-1 items-center justify-center text-center">
              <Users className="w-6 h-6 text-blue-500 mb-1" />
              <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Team Size</span>
              <span className="font-semibold text-foreground">{meta.team_allowed ? `${meta.min_team}-${meta.max_team}` : 'Solo'}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8">
            
            <div className="bg-white dark:bg-[#1A1A1D] rounded-[2rem] border border-black/5 dark:border-white/10 p-8 md:p-10 shadow-lg">
              <h2 className="text-2xl font-bold text-foreground mb-6">About the Event</h2>
              <div className="prose dark:prose-invert max-w-none text-foreground/80 leading-relaxed whitespace-pre-line">
                {post.description || "No description provided for this event."}
              </div>
            </div>

            {(meta.venue_address || meta.venue_type) && (
              <div className="bg-white dark:bg-[#1A1A1D] rounded-[2rem] border border-black/5 dark:border-white/10 p-8 md:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-primary" /> Location Details
                </h2>
                <div className="flex flex-col gap-2">
                    <p className="font-semibold text-lg capitalize">{meta.venue_type}</p>
                    {meta.venue_address && (
                        <p className="text-foreground/70">{meta.venue_address}</p>
                    )}
                </div>
              </div>
            )}

            {skillsList.length > 0 && (
              <div className="bg-white dark:bg-[#1A1A1D] rounded-[2rem] border border-black/5 dark:border-white/10 p-8 md:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-foreground mb-6">Tags / Categories</h2>
                <div className="flex flex-wrap gap-3">
                  {skillsList.map((skill: string, i: number) => (
                    <span key={i} className="px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-sm font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-28">
              
              <div className="bg-white dark:bg-[#1A1A1D] rounded-[2rem] border border-black/5 dark:border-white/10 p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500" />
                
                <h3 className="text-xl font-bold text-foreground mb-2">Join the Event</h3>
                <p className="text-foreground/60 text-sm mb-8">
                  Register now to secure your spot in this event.
                </p>

                {post.apply_link ? (
                  <Link 
                    href={post.apply_link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary-dark transition-colors py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 group"
                  >
                    Register Now <ExternalLink className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ) : (
                  <button disabled className="w-full bg-black/5 dark:bg-white/5 text-foreground/50 py-4 rounded-xl font-bold cursor-not-allowed">
                    Registrations Closed
                  </button>
                )}
                
                <div className="mt-6 flex flex-col gap-3 text-sm text-foreground/60 border-t border-black/5 dark:border-white/10 pt-6">
                  <div className="flex justify-between items-center">
                    <span>Posted On</span>
                    <span className="font-semibold text-foreground">{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Location</span>
                    <span className="font-semibold text-foreground capitalize">{post.location || meta.venue_type || "TBD"}</span>
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
