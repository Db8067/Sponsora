"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Search, Filter, SlidersHorizontal, ArrowLeft, ChevronRight, Briefcase, MapPin, Monitor, Handshake } from "lucide-react";
import Link from "next/link";
import { InternshipCard, InternshipPost } from "@/components/InternshipCard";
import { supabase } from "@/lib/supabase";

const getDoodleImage = (slug: string) => {
  const map: Record<string, string> = {
    'software-engineering': 'se_internship_doodle.png',
    'design': 'design_internship_doodle.png',
    'finance': 'finance_internship_doodle.png',
    'marketing': 'marketing_internship_doodle.png',
    'human-resources': 'hr_internship_doodle.png'
  };
  return map[slug] || 'coming_soon_doodle.png';
};

const getCategoryIcon = (slug: string) => {
  switch (slug) {
    case 'software-engineering': return <Monitor className="w-4 h-4" />;
    case 'design': return <MapPin className="w-4 h-4" />;
    case 'finance': return <Handshake className="w-4 h-4" />;
    default: return <Briefcase className="w-4 h-4" />;
  }
};

export default function CategoryInternshipsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [category, setCategory] = useState<any>(null);
  const [allCategories, setAllCategories] = useState<any[]>([]);
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
      
      // Fetch all categories for sidebar
      const { data: allCats } = await supabase.from('sponsora_categories').select('*').eq('app_type', 'internship');
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

      // Fetch Internships
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
        setInternships(parsedPosts);
      }
      setLoading(false);
    }

    fetchCategoryAndInternships();
  }, [slug]);

  // Apply filters
  const displayedInternships = internships.filter(i => {
    const meta = i.metadata || {};
    const matchesSearch = i.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (meta.company_name && meta.company_name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = filterLocation === "all" ? true : meta.location_type?.toLowerCase() === filterLocation;
    const matchesDuration = filterDuration === "all" ? true : 
                            (filterDuration === "short" ? (meta.duration_months || 0) <= 3 : (meta.duration_months || 0) > 3);
                            
    return matchesSearch && matchesLocation && matchesDuration;
  }).sort((a, b) => {
    const metaA = a.metadata || {};
    const metaB = b.metadata || {};
    if (sortBy === "stipend") return (Number(metaB.stipend_max) || Number(metaB.stipend_min) || 0) - (Number(metaA.stipend_max) || Number(metaA.stipend_min) || 0);
    if (sortBy === "deadline") return new Date(metaA.deadline || "2099").getTime() - new Date(metaB.deadline || "2099").getTime();
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
        <button onClick={() => router.push('/internshipcategory')} className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold mt-4 flex items-center gap-2 mx-auto">
          <ArrowLeft size={18} /> Back to Categories
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-28 pb-20 px-4 md:px-6 lg:px-12 selection:bg-primary/30">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none hidden dark:block"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* Left Sidebar: Quick Switch & Filters */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm font-medium text-foreground/50">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/internshipcategory" className="hover:text-primary transition-colors">Internships</Link>
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
                    href={`/internships/category/${cat.slug}`} 
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
          
          {/* Hero Section */}
          <div className="relative w-full h-[250px] md:h-[300px] rounded-[2rem] overflow-hidden mb-12 border border-black/5 dark:border-white/10 shadow-xl bg-[#1A1A1D]">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen"
              style={{ backgroundImage: `url('/images/${getDoodleImage(slug)}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-light text-sm font-bold w-fit mb-4 border border-primary/20 text-white">
                {getCategoryIcon(slug)} {category.name}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight capitalize">{category.name}</h1>
              <p className="text-white/70 max-w-xl text-lg font-medium line-clamp-2">
                {category.description || `Find the best ${category.name} internships and launch your career.`}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h2 className="text-2xl font-bold text-foreground">Open Roles</h2>
                <span className="text-sm font-medium text-foreground/50">{internships.length} Internships</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                <input 
                  type="text" 
                  placeholder="Search roles..." 
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
              
              <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} className="bg-black/5 dark:bg-white/5 border border-transparent rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary text-foreground">
                <option value="all">All Locations</option>
                <option value="remote">Remote</option>
                <option value="onsite">Onsite</option>
                <option value="hybrid">Hybrid</option>
              </select>

              <select value={filterDuration} onChange={(e) => setFilterDuration(e.target.value)} className="bg-black/5 dark:bg-white/5 border border-transparent rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary text-foreground">
                <option value="all">Any Duration</option>
                <option value="short">1-3 Months</option>
                <option value="long">3+ Months</option>
              </select>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <span className="text-foreground/70">Sort by:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-black/5 dark:bg-white/5 border border-transparent rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary font-medium text-foreground">
                  <option value="latest">Latest First</option>
                  <option value="stipend">Highest Stipend</option>
                  <option value="deadline">Ending Soon</option>
                </select>
              </div>
            </div>
          )}

          {/* Listings */}
          <div className="flex flex-col gap-4 mb-20">
            {displayedInternships.length > 0 ? (
              displayedInternships.map((internship, i) => (
                <InternshipCard key={internship.id} internship={internship} index={i} categorySlug={slug} />
              ))
            ) : (
              <div className="w-full py-20 flex flex-col items-center justify-center text-center bg-white dark:bg-[#1A1A1D] border border-black/5 dark:border-white/10 rounded-3xl">
                <div className="w-32 h-32 mb-6 opacity-80">
                   <img src={`/images/${getDoodleImage(slug)}`} alt="No Internships" className="w-full h-full object-contain drop-shadow-2xl" />
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

        </main>
      </div>
    </div>
  );
}
