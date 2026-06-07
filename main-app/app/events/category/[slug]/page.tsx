"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Search, Filter, SlidersHorizontal, ArrowLeft } from "lucide-react";
import { EventCard, EventPost } from "@/components/EventCard";

export default function CategoryEventsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [category, setCategory] = useState<any>(null);
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
      const { supabase } = await import("@/lib/supabase");
      
      // 1. Fetch Category
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

      // 2. Fetch Events
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
    
    // Search
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filters
    const matchesVenue = filterVenue === "all" ? true : meta.venue_type?.toLowerCase() === filterVenue;
    const matchesTeam = filterTeam === "all" ? true : 
                        (filterTeam === "solo" ? !meta.team_allowed : meta.team_allowed);
                            
    return matchesSearch && matchesVenue && matchesTeam;
  }).sort((a, b) => {
    if (sortBy === "latest") return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
    // Assuming "featured" puts featured items first
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
    <div className="relative min-h-[100dvh] w-full flex flex-col overflow-x-hidden pt-24 pb-12 selection:bg-primary/30 bg-gradient-to-b from-primary/5 to-background">
      <div className="relative z-10 flex flex-col w-full max-w-[1200px] px-4 md:px-6 mx-auto">
        
        <button onClick={() => router.push('/events')} className="w-fit flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 font-medium">
          <ArrowLeft size={16} /> Back to Events
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              {category.name} Events
            </h1>
            <p className="text-foreground/70 mt-2">{category.description || "Discover exciting events and competitions."}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
              <input 
                type="text" 
                placeholder="Search events..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2.5 rounded-full bg-white dark:bg-[#1A1A1D] border border-black/5 dark:border-white/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary w-full md:w-64 text-sm"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2.5 rounded-full border transition-colors ${showFilters ? 'bg-primary border-primary text-primary-foreground' : 'bg-white dark:bg-[#1A1A1D] border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10'}`}
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
            
            <select 
              value={filterVenue} 
              onChange={(e) => setFilterVenue(e.target.value)}
              className="bg-black/5 dark:bg-white/5 border border-transparent rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary text-foreground"
            >
              <option value="all">All Venues</option>
              <option value="online">Online</option>
              <option value="in_person">In Person</option>
              <option value="hybrid">Hybrid</option>
            </select>

            <select 
              value={filterTeam} 
              onChange={(e) => setFilterTeam(e.target.value)}
              className="bg-black/5 dark:bg-white/5 border border-transparent rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary text-foreground"
            >
              <option value="all">Team & Solo</option>
              <option value="solo">Solo Only</option>
              <option value="team">Team Only</option>
            </select>

            <div className="flex-1" />

            <div className="flex items-center gap-2">
              <span className="text-foreground/70">Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black/5 dark:bg-white/5 border border-transparent rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary font-medium text-foreground"
              >
                <option value="latest">Latest First</option>
                <option value="featured">Featured First</option>
              </select>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {displayedEvents.length > 0 ? (
            displayedEvents.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} categorySlug={slug} />
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-white dark:bg-[#1A1A1D] border border-black/5 dark:border-white/10 rounded-3xl">
              <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-foreground/30" />
              </div>
              <h3 className="text-xl font-bold mb-2">No Events Found</h3>
              <p className="text-foreground/60 max-w-sm">
                We couldn't find any events matching your filters. Try adjusting your search criteria.
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

      </div>
    </div>
  );
}
