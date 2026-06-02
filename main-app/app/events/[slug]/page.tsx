import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Calendar, MapPin, Users, Trophy, ExternalLink, ShieldCheck, Video } from "lucide-react";
import BackToTop from "@/components/BackToTop";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import MapDisplay from "@/components/MapDisplay";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data: event } = await supabase
    .from("events")
    .select("title, short_summary")
    .eq("slug", params.slug)
    .single();

  return {
    title: event ? `${event.title} | Sponsora` : "Event Not Found | Sponsora",
    description: event?.short_summary || "Event details",
  };
}

export default async function EventDetailsPage({ params }: { params: { slug: string } }) {
  // First try to match slug, if no match, try matching id (in case we used ID in the URL)
  let { data: event, error } = await supabase
    .from('events')
    .select('*, categories(*), organizer_profiles(*)')
    .eq('slug', params.slug)
    .single();

  if (error || !event) {
    // Try matching ID just in case
    const { data: eventById, error: idError } = await supabase
      .from('events')
      .select('*, categories(*), organizer_profiles(*)')
      .eq('id', params.slug)
      .single();
    
    if (idError || !eventById) {
      notFound();
    }
    event = eventById;
  }

  const category = event.categories;
  const organizer = event.organizer_profiles;
  
  // Format dates
  const dateDisplay = event.start_at 
    ? new Date(event.start_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'Date TBD';

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 md:px-6 lg:px-12 selection:bg-primary/30 bg-gradient-to-b from-primary/10 to-background">
      
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none hidden dark:block"></div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm font-medium text-foreground/50 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
          <ChevronRight className="w-4 h-4" />
          {category && (
            <>
              <Link href={`/events/${category.slug}`} className="hover:text-primary transition-colors">{category.name}</Link>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
          <span className="text-foreground truncate max-w-[200px]">{event.title}</span>
        </nav>

        {/* Hero Section */}
        <div className="w-full bg-white dark:bg-[#1A1A1D] rounded-[2rem] border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden mb-12">
          {/* Banner */}
          <div className="w-full h-[300px] md:h-[400px] relative">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${event.banner_url || '/images/tech_events_doodle.png'})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
              {event.is_featured && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-accent-light text-xs font-bold border border-accent/40 mb-4 uppercase tracking-wider shadow-lg backdrop-blur-md">
                  Featured Event
                </div>
              )}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight leading-tight">{event.title}</h1>
              <p className="text-white/80 max-w-2xl text-lg">{event.short_summary}</p>
            </div>
          </div>

          {/* Quick Info Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-black/5 dark:divide-white/10 border-b border-black/5 dark:border-white/10">
            <div className="p-6 flex flex-col gap-1 items-center justify-center text-center">
              <Calendar className="w-6 h-6 text-primary mb-1" />
              <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Date</span>
              <span className="font-semibold text-foreground text-sm md:text-base">{dateDisplay}</span>
            </div>
            <div className="p-6 flex flex-col gap-1 items-center justify-center text-center">
              {event.venue_type === 'online' ? <Video className="w-6 h-6 text-blue-500 mb-1" /> : <MapPin className="w-6 h-6 text-orange-500 mb-1" />}
              <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Venue</span>
              <span className="font-semibold text-foreground text-sm md:text-base line-clamp-1">
                {event.venue_type === 'online' ? 'Online' : (event.venue_type === 'hybrid' ? 'Hybrid' : 'In-Person')}
              </span>
            </div>
            <div className="p-6 flex flex-col gap-1 items-center justify-center text-center">
              <Users className="w-6 h-6 text-purple-500 mb-1" />
              <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Team Size</span>
              <span className="font-semibold text-foreground text-sm md:text-base">
                {event.team_allowed ? `${event.min_team} - ${event.max_team} Members` : 'Individual'}
              </span>
            </div>
            <div className="p-6 flex flex-col gap-1 items-center justify-center text-center">
              <Trophy className="w-6 h-6 text-green-500 mb-1" />
              <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Prize Pool</span>
              <span className="font-semibold text-foreground text-sm md:text-base">{event.prize_pool || 'None'}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white dark:bg-[#1A1A1D] rounded-3xl border border-black/5 dark:border-white/10 p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">About This Event</h2>
              <div 
                className="prose dark:prose-invert prose-lg max-w-none text-foreground/80 font-medium leading-relaxed prose-headings:font-heading prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary-dark"
                dangerouslySetInnerHTML={{ __html: event.description || "<p>No description provided.</p>" }}
              />
            </div>

            {/* Gallery Section */}
            {event.gallery_urls && event.gallery_urls.length > 0 && (
              <div className="bg-white dark:bg-[#1A1A1D] rounded-3xl border border-black/5 dark:border-white/10 p-8 shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.gallery_urls.map((url: string, index: number) => (
                    <div key={index} className="aspect-square rounded-xl overflow-hidden relative group">
                      <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: `url(${url})` }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Map Section */}
            {(event.venue_type === 'in_person' || event.venue_type === 'hybrid') && event.venue_address && (
              <div className="bg-white dark:bg-[#1A1A1D] rounded-3xl border border-black/5 dark:border-white/10 p-8 shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 font-heading flex items-center gap-2">
                  <MapPin className="text-orange-500" /> Location Map
                </h2>
                <p className="text-foreground/70 mb-4">{event.venue_address}</p>
                
                {/* Embedded Maps */}
                <div className="w-full h-[400px] rounded-xl overflow-hidden border border-black/10 dark:border-white/10 z-0 relative mb-4">
                  <MapDisplay address={event.venue_address} />
                </div>
                
                <div className="w-full h-[300px] rounded-xl overflow-hidden border border-black/10 dark:border-white/10 z-0 relative">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_KEY_HERE&q=${encodeURIComponent(event.venue_address)}`}
                    allowFullScreen
                  />
                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center backdrop-blur-sm">
                    <p className="bg-white dark:bg-black px-4 py-2 rounded-lg font-medium shadow-xl">Google Maps requires API Key</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-28 space-y-6">
              
              {/* Registration Card */}
              <div className="bg-white dark:bg-[#1A1A1D] rounded-3xl border border-black/5 dark:border-white/10 p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
                
                <h3 className="text-sm font-bold text-foreground/50 uppercase tracking-wider mb-2">Registration</h3>
                <div className="text-3xl font-black text-foreground mb-6">
                  {event.is_paid && event.entry_fee > 0 ? `₹${event.entry_fee}` : "Free Entry"}
                </div>

                {event.registration_link ? (
                  <Link 
                    href={event.registration_link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-primary text-white hover:bg-primary-dark transition-colors py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 group"
                  >
                    Register Now <ExternalLink className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ) : (
                  <button disabled className="w-full bg-gray-200 dark:bg-white/5 text-gray-500 dark:text-foreground/30 py-4 rounded-xl font-bold cursor-not-allowed">
                    Registration Closed
                  </button>
                )}
                
                {event.registration_deadline && (
                  <p className="text-center text-xs text-foreground/60 mt-4 font-medium">
                    Deadline: {new Date(event.registration_deadline).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Organizer Card */}
              {organizer && (
                <div className="bg-white dark:bg-[#1A1A1D] rounded-3xl border border-black/5 dark:border-white/10 p-8 shadow-lg">
                  <h3 className="text-sm font-bold text-foreground/50 uppercase tracking-wider mb-4">Organized By</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
                      {organizer.logo_url ? (
                        <img src={organizer.logo_url} alt={organizer.org_name} className="w-full h-full object-cover" />
                      ) : (
                        <ShieldCheck className="w-8 h-8 text-foreground/30" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-foreground">{organizer.org_name}</h4>
                      <Link href={`/organizer/${organizer.slug}`} className="text-sm text-primary hover:underline font-medium">
                        View Profile
                      </Link>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/70 line-clamp-3 mb-4">{organizer.description}</p>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>

      <BackToTop colorClass="bg-primary text-primary-foreground" />
    </div>
  );
}
