"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Search, Filter, SlidersHorizontal, ArrowLeft, ChevronRight, Zap, Code, Palette, Presentation, Users, CalendarDays } from "lucide-react";
import Link from "next/link";
import { EventCard, EventPost } from "@/components/EventCard";
import BackToTop from "@/components/BackToTop";
import { supabase } from "@/lib/supabase";

const getDoodleImage = (slug: string) => {
  const map: Record<string, string> = {
    'tech': 'tech_events_doodle.png',
    'cultural': 'cultural_events_doodle.png',
    'workshops': 'workshops_doodle.png',
    'seminars': 'seminars_doodle.png',
    'past': 'past_events_doodle.png'
  };
  return map[slug] || 'coming_soon_doodle.png';
};

const getCategoryIcon = (slug: string) => {
  switch (slug) {
    case 'tech': return <Code className="w-4 h-4" />;
    case 'cultural': return <Palette className="w-4 h-4" />;
    case 'workshops': return <Users className="w-4 h-4" />;
    case 'seminars': return <Presentation className="w-4 h-4" />;
    default: return <CalendarDays className="w-4 h-4" />;
  }
};

export default function CategoryEventsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [category, setCategory] = useState<any>(null);
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [events, setEvents] = useState<EventPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  // Filters state
  const [showFilters, setShowFilters] = useState(false);
  const [filterVenue, setFilterVenue] = useState("all");
  const [filterTeam, setFilterTeam] = useState("all");

  useEffect(() => {
    if (!slug) return;
    
    async function fetchCategoryAndEvents() {
      setLoading(true);
      
      // Fetch all categories for sidebar
      const { data: allCats } = await supabase.from('sponsora_categories').select('*').eq('type', 'event').order('sort_order', { ascending: true });
      if (allCats) setAllCategories(allCats);
      
      // Fetch Category
      const { data: catData, error: catError } = await supabase
        .from('sponsora_categories')
        .select('*')
        .eq('slug', slug)
        .single();
          
      if (catError || !catData) {
        setLoading(false);
        return;
      }
      setCategory(catData);

      // Fetch Events
      const { data: postsData, error: postsError } = await supabase
        .from('sponsora_posts')
        .select('*')
        .eq('category_id', catData.id)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });
          
      if (!postsError && postsData) {
        const parsedPosts = postsData.map(post => ({
          ...post,
          metadata: post.metadata || {}
        }));
        setEvents(parsedPosts);
      }
      setLoading(false);
    }

    fetchCategoryAndEvents();
  }, [slug]);

  // Apply filters
  const displayedEvents = events.filter(e => {
    const meta = e.metadata || {};
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVenue = filterVenue === "all" ? true : meta.venue_type?.toLowerCase() === filterVenue;
    const matchesTeam = filterTeam === "all" ? true : (filterTeam === "solo" ? !meta.team_allowed : meta.team_allowed);
    return matchesSearch && matchesVenue && matchesTeam;
  }).sort((a, b) => {
    if (sortBy === "latest") return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
    if (sortBy === "featured") {
        const aFeat = a.metadata?.is_featured ? 1 : 0;
        const bFeat = b.metadata?.is_featured ? 1 : 0;
        return bFeat - aFeat;
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-background">
        <div className="size-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 bg-background text-center px-4">
        <h1 className="text-3xl font-black mb-2">Category Not Found</h1>
        <button onClick={() => router.push('/events')} className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold mt-4 flex items-center gap-2 mx-auto">
          <ArrowLeft size={18} /> Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-28 pb-20 px-4 md:px-6 lg:px-12 selection:bg-primary/30">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-background to-background pointer-events-none hidden dark:block"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* Left Sidebar: Quick Switch & Filters */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm font-medium text-foreground/50">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">{category.name}</span>
          </nav>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md hidden lg:block">
            <h3 className="text-lg font-bold text-foreground mb-4">Categories</h3>
            <div className="flex flex-col gap-3">
              {allCategories.map(cat => {
                const isActive = cat.slug === slug;
                return (
                  <Link 
                    key={cat.id} 
                    href={`/events/category/${cat.slug}`} 
                    className={`flex items-center gap-2 transition-colors ${isActive ? 'text-primary font-bold' : 'text-foreground/60 hover:text-foreground'}`}
                  >
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />} 
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          


          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h2 className="text-2xl font-bold text-foreground">Featured Upcoming</h2>
                <span className="text-sm font-medium text-foreground/50">{events.length} Events</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                <input 
                  type="text" 
                  placeholder="Search events..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2.5 rounded-full bg-white dark:bg-[#1A1A1D] border border-black/5 dark:border-white/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary w-full md:w-56 text-sm"
                />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2.5 rounded-full border transition-colors ${showFilters ? 'bg-primary border-primary text-white' : 'bg-white dark:bg-[#1A1A1D] border-black/5 dark:border-white/10'}`}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mb-8 p-4 rounded-2xl bg-white dark:bg-[#1A1A1D] border border-black/5 dark:border-white/10 flex flex-wrap gap-4 items-center text-sm shadow-sm">
              <div className="flex items-center gap-2 mr-4">
                <Filter className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">Filters:</span>
              </div>
              
              <select value={filterVenue} onChange={(e) => setFilterVenue(e.target.value)} className="bg-black/5 dark:bg-white/5 border border-transparent rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary text-foreground">
                <option value="all">All Venues</option>
                <option value="online">Online</option>
                <option value="in_person">In Person</option>
                <option value="hybrid">Hybrid</option>
              </select>

              <select value={filterTeam} onChange={(e) => setFilterTeam(e.target.value)} className="bg-black/5 dark:bg-white/5 border border-transparent rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary text-foreground">
                <option value="all">Team & Solo</option>
                <option value="solo">Solo Only</option>
                <option value="team">Team Only</option>
              </select>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <span className="text-foreground/70">Sort by:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-black/5 dark:bg-white/5 border border-transparent rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary font-medium text-foreground">
                  <option value="latest">Latest First</option>
                  <option value="featured">Featured First</option>
                </select>
              </div>
            </div>
          )}

          {/* Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-20">
            {displayedEvents.length > 0 ? (
              displayedEvents.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} categorySlug={slug} />
              ))
            ) : (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-white dark:bg-[#1A1A1D] border border-black/5 dark:border-white/10 rounded-3xl">
                <div className="w-48 h-48 mb-6 overflow-hidden flex items-center justify-center relative">
                   <img src={category?.image_url || `/images/${getDoodleImage(slug)}`} alt="No Events" className="w-full h-full object-contain opacity-90 drop-shadow-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">No Events Found</h3>
                <p className="text-foreground/60 max-w-sm">
                  We couldn't find any events matching your criteria. Be the first to host one!
                </p>
                <button 
                  onClick={() => {setSearchQuery(''); setFilterVenue('all'); setFilterTeam('all');}}
                  className="mt-6 px-6 py-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-sm font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

        </main>
      </div>

      <BackToTop colorClass="bg-primary text-primary-foreground" />
    </div>
  );
}
