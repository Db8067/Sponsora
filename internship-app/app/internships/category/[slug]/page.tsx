"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Search, Filter, SlidersHorizontal, ArrowLeft } from "lucide-react";
import { InternshipCard, InternshipPost } from "@/components/InternshipCard";

export default function CategoryInternshipsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [category, setCategory] = useState<any>(null);
  const [internships, setInternships] = useState<InternshipPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  // Filters state
  const [showFilters, setShowFilters] = useState(false);
  const [filterLocation, setFilterLocation] = useState("all");
  const [filterDuration, setFilterDuration] = useState("all");

  useEffect(() => {
    if (!slug) return;
    
    async function fetchCategoryAndInternships() {
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

      // 2. Fetch Internships
      const { data: postsData, error: postsError } = await supabase
        .from('sponsora_posts')
        .select('*')
        .eq('category_id', catData.id)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });
          
      if (!postsError && postsData) {
        // Parse metadata to ensure it's available
        const parsedPosts = postsData.map(post => ({
          ...post,
          metadata: post.metadata || {}
        }));
        setInternships(parsedPosts);
      }
      setLoading(false);
    }

    fetchCategoryAndInternships();
  }, [slug]);

  // Apply filters
  const displayedInternships = internships.filter(i => {
    const meta = i.metadata || {};
    
    // Search
    const matchesSearch = 
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (meta.company_name && meta.company_name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filters
    const matchesLocation = filterLocation === "all" ? true : meta.location_type?.toLowerCase() === filterLocation;
    const matchesDuration = filterDuration === "all" ? true : 
                            (filterDuration === "short" ? (meta.duration_months || 0) <= 3 : (meta.duration_months || 0) > 3);
                            
    return matchesSearch && matchesLocation && matchesDuration;
  }).sort((a, b) => {
    const metaA = a.metadata || {};
    const metaB = b.metadata || {};
    
    if (sortBy === "stipend") return (Number(metaB.stipend_max) || Number(metaB.stipend_min) || 0) - (Number(metaA.stipend_max) || Number(metaA.stipend_min) || 0);
    if (sortBy === "deadline") return new Date(metaA.deadline || "2099").getTime() - new Date(metaB.deadline || "2099").getTime();
    return 0; // "latest" fallback, already sorted by created_at in SQL
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
        <button onClick={() => router.push('/internshipcategory')} className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold mt-4 flex items-center gap-2 mx-auto">
          <ArrowLeft size={18} /> Back to Categories
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col overflow-x-hidden pt-24 pb-12 selection:bg-primary/30 bg-gradient-to-b from-primary/5 to-background">
      <div className="relative z-10 flex flex-col w-full max-w-[1200px] px-4 md:px-6 mx-auto">
        
        {/* Back button */}
        <button onClick={() => router.push('/internshipcategory')} className="w-fit flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 font-medium">
          <ArrowLeft size={16} /> Back to Categories
        </button>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              {category.name} Internships
            </h1>
            <p className="text-foreground/70 mt-2">{category.description || "Find and apply to the best opportunities."}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
              <input 
                type="text" 
                placeholder="Search roles, companies..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2.5 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary w-full md:w-64 text-sm"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2.5 rounded-full border transition-colors ${showFilters ? 'bg-primary border-primary text-primary-foreground' : 'bg-white dark:bg-white/5 border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10'}`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Filter Bar */}
        {showFilters && (
          <div className="mb-8 p-4 rounded-2xl glass bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 flex flex-wrap gap-4 items-center text-sm shadow-sm">
            <div className="flex items-center gap-2 mr-4">
              <Filter className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground">Filters:</span>
            </div>
            
            <select 
              value={filterLocation} 
              onChange={(e) => setFilterLocation(e.target.value)}
              className="bg-background/50 border border-black/10 dark:border-white/10 rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary text-foreground"
            >
              <option value="all">All Locations</option>
              <option value="remote">Remote</option>
              <option value="onsite">Onsite</option>
              <option value="hybrid">Hybrid</option>
            </select>

            <select 
              value={filterDuration} 
              onChange={(e) => setFilterDuration(e.target.value)}
              className="bg-background/50 border border-black/10 dark:border-white/10 rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary text-foreground"
            >
              <option value="all">Any Duration</option>
              <option value="short">1-3 Months</option>
              <option value="long">3+ Months</option>
            </select>

            <div className="flex-1" /> {/* Spacer */}

            <div className="flex items-center gap-2">
              <span className="text-foreground/70">Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-background/50 border border-black/10 dark:border-white/10 rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary font-medium text-foreground"
              >
                <option value="latest">Latest First</option>
                <option value="stipend">Highest Stipend</option>
                <option value="deadline">Ending Soon</option>
              </select>
            </div>
          </div>
        )}

        {/* Listings */}
        <div className="flex flex-col gap-4">
          {displayedInternships.length > 0 ? (
            displayedInternships.map((internship, i) => (
              <InternshipCard key={internship.id} internship={internship} index={i} categorySlug={slug} />
            ))
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center text-center bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl">
              <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-foreground/30" />
              </div>
              <h3 className="text-xl font-bold mb-2">No Internships Found</h3>
              <p className="text-foreground/60 max-w-sm">
                We couldn't find any opportunities matching your filters. Try adjusting your search criteria.
              </p>
              <button 
                onClick={() => {setSearchQuery(''); setFilterLocation('all'); setFilterDuration('all');}}
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
