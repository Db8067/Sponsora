import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Calendar, MapPin, Trophy, Users, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/ShareButtons";
import EventImageCarousel from "@/components/EventImageCarousel";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string, postSlug: string }> }): Promise<Metadata> {
  const { postSlug } = await params;
  const { supabase } = await import("@/lib/supabase");
  const { data: post } = await supabase
    .from("sponsora_posts")
    .select("title, description, image_url, metadata")
    .eq("id", postSlug)
    .single();

  const previewImage = post?.image_url || "/images/event_doodle_preview.png";

  return {
    title: post ? `${post.title} | Sponsora` : "Event Not Found | Sponsora",
    description: post?.description?.slice(0, 150) || "Event details",
    openGraph: {
      images: [previewImage]
    }
  };
}

export default async function EventDetailsPage({ params }: { params: Promise<{ slug: string, postSlug: string }> }) {
  const { slug, postSlug } = await params;
  const { supabase } = await import("@/lib/supabase");
  
  const { data: post, error } = await supabase
    .from('sponsora_posts')
    .select('*')
    .eq('id', postSlug)
    .single();

  if (error || !post) {
    return <div>Error loading event: {error?.message || 'No post found'}</div>;
  }

  const { data: category } = await supabase
    .from('sponsora_categories')
    .select('*')
    .eq('slug', slug)
    .single();

  const meta = post.metadata || {};
  const skillsList = meta.skills ? meta.skills.split(',').map((s: string) => s.trim()).filter(Boolean) : [];
  
  // Combine all images (fallback to main image_url if no event_images)
  const allImages = meta.event_images && meta.event_images.length > 0 
    ? meta.event_images 
    : post.image_url ? [post.image_url] : [];

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col overflow-x-hidden pt-28 pb-12 selection:bg-primary/30 bg-background">
      <div className="relative z-10 flex flex-col w-full max-w-[1000px] px-4 md:px-6 mx-auto gap-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm font-medium text-foreground/50">
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

        {/* Title and Share Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white dark:bg-[#1A1A1D] p-8 rounded-[2rem] border border-black/5 dark:border-white/10 shadow-lg">
            <div>
              {meta.is_featured && (
                  <span className="inline-block px-3 py-1 mb-4 text-xs font-bold rounded-full bg-accent/10 text-accent uppercase tracking-wider shadow-sm border border-accent/20">
                      Featured Event
                  </span>
              )}
              <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-2">
                  {post.title}
              </h1>
              <p className="text-lg text-foreground/60 font-medium">
                  {category?.name || "Event"}
              </p>
            </div>
            
            <ShareButtons title={post.title} />
        </div>

        {/* Carousel Section */}
        {allImages.length > 0 && (
          <div className="w-full shadow-2xl rounded-[2rem]">
            <EventImageCarousel images={allImages} />
          </div>
        )}

        {/* Register CTA (Shifted above About section) */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-[2rem] border border-primary/20 p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-black text-foreground">Ready to participate?</h3>
            <p className="text-foreground/70 font-medium max-w-sm">Secure your spot before registrations close. Join thousands of other attendees!</p>
          </div>

          {post.apply_link ? (
            <Link 
              href={post.apply_link} 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-w-[200px] bg-primary text-primary-foreground hover:bg-primary-dark transition-all hover:scale-105 active:scale-95 py-4 px-8 rounded-2xl font-black shadow-xl shadow-primary/25 flex items-center justify-center gap-2 group text-lg"
            >
              Register Now <ExternalLink className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : (
            <button disabled className="w-full sm:w-auto min-w-[200px] bg-black/5 dark:bg-white/5 text-foreground/50 py-4 px-8 rounded-2xl font-black cursor-not-allowed text-lg">
              Registrations Closed
            </button>
          )}
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-[#1A1A1D] rounded-2xl border border-black/5 dark:border-white/10 p-6 flex flex-col gap-2 items-center justify-center text-center shadow-sm">
            <Calendar className="w-8 h-8 text-indigo-500 mb-2" />
            <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Date</span>
            <span className="font-semibold text-foreground text-sm">{post.date_info || "TBD"}</span>
          </div>
          <div className="bg-white dark:bg-[#1A1A1D] rounded-2xl border border-black/5 dark:border-white/10 p-6 flex flex-col gap-2 items-center justify-center text-center shadow-sm">
            <MapPin className="w-8 h-8 text-orange-500 mb-2" />
            <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Venue</span>
            <span className="font-semibold text-foreground text-sm capitalize">{meta.venue_type || 'TBD'}</span>
          </div>
          <div className="bg-white dark:bg-[#1A1A1D] rounded-2xl border border-black/5 dark:border-white/10 p-6 flex flex-col gap-2 items-center justify-center text-center shadow-sm">
            <Trophy className="w-8 h-8 text-yellow-500 mb-2" />
            <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Prize Pool</span>
            <span className="font-semibold text-foreground text-sm">{meta.prize_pool || "Glory"}</span>
          </div>
          <div className="bg-white dark:bg-[#1A1A1D] rounded-2xl border border-black/5 dark:border-white/10 p-6 flex flex-col gap-2 items-center justify-center text-center shadow-sm">
            <Users className="w-8 h-8 text-blue-500 mb-2" />
            <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Team Size</span>
            <span className="font-semibold text-foreground text-sm">{meta.team_allowed ? `${meta.min_team}-${meta.max_team}` : 'Solo'}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-4">
          {/* Main Content */}
          <div className="w-full flex flex-col gap-8">
            
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
              <div className="bg-white dark:bg-[#1A1A1D] rounded-[2rem] border border-black/5 dark:border-white/10 p-8 md:p-10 shadow-lg mb-8">
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
        </div>

      </div>
    </div>
  );
}
