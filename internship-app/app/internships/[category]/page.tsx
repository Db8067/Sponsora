"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Search, Filter, SlidersHorizontal, MapPin, Clock, IndianRupee } from "lucide-react";
import { InternshipCard, Internship } from "@/components/InternshipCard";
import { createClient } from "@supabase/supabase-js";

// Dummy data fallback if Supabase is empty
const DUMMY_INTERNSHIPS: Internship[] = [
  {
    id: "1",
    title: "Frontend Engineering Intern",
    slug: "frontend-eng-intern-1",
    company_name: "TechCorp",
    location_type: "remote",
    stipend_min: 15000,
    stipend_max: 20000,
    duration_months: 6,
    skills_required: ["React", "TypeScript", "Tailwind CSS"],
    is_featured: true,
    category_slug: "software-engineering",
    deadline: "2026-08-01"
  },
  {
    id: "2",
    title: "UI/UX Design Intern",
    slug: "ui-ux-design-intern-2",
    company_name: "CreativeStudios",
    location_type: "onsite",
    city: "Bangalore",
    stipend_min: 10000,
    duration_months: 3,
    skills_required: ["Figma", "User Research", "Prototyping"],
    is_featured: false,
    category_slug: "design",
    deadline: "2026-07-15"
  }
];

export default function CategoryPage() {
  const { category } = useParams();
  const router = useRouter();
  
  const [internships, setInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  
  // Filters state
  const [showFilters, setShowFilters] = useState(false);
  const [filterLocation, setFilterLocation] = useState("all");
  const [filterDuration, setFilterDuration] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
    // In a real app, fetch from Supabase. For now using dummy data filtered by category.
    setIsLoading(true);
    setTimeout(() => {
      const filtered = DUMMY_INTERNSHIPS.filter(i => 
        category === 'all' ? true : i.category_slug === category
      );
      setInternships(filtered.length > 0 ? filtered : []);
      setIsLoading(false);
    }, 800);
  }, [category]);

  // Apply filters
  const displayedInternships = internships.filter(i => {
    // Search
    const matchesSearch = i.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          i.company_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filters
    const matchesLocation = filterLocation === "all" ? true : i.location_type === filterLocation;
    const matchesDuration = filterDuration === "all" ? true : 
                            (filterDuration === "short" ? (i.duration_months || 0) <= 3 : (i.duration_months || 0) > 3);
                            
    return matchesSearch && matchesLocation && matchesDuration;
  }).sort((a, b) => {
    if (sortBy === "stipend") return (b.stipend_max || b.stipend_min || 0) - (a.stipend_max || a.stipend_min || 0);
    if (sortBy === "deadline") return new Date(a.deadline || "2099").getTime() - new Date(b.deadline || "2099").getTime();
    return 0; // "latest" fallback
  });

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col overflow-x-hidden pt-24 pb-12 selection:bg-primary/30">
      <div className="relative z-10 flex flex-col w-full max-w-[1200px] px-4 md:px-6 mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground capitalize tracking-tight">
              {(category as string).replace('-', ' ')} Internships
            </h1>
            <p className="text-foreground/70 mt-2">Find and apply to the best opportunities.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
              <input 
                type="text" 
                placeholder="Search roles, companies..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary w-full md:w-64 text-sm"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2.5 rounded-full border transition-colors ${showFilters ? 'bg-primary border-primary text-white' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Filter Bar */}
        {showFilters && (
          <div className="mb-8 p-4 rounded-2xl glass animate-in fade-in slide-in-from-top-4 flex flex-wrap gap-4 items-center text-sm">
            <div className="flex items-center gap-2 mr-4">
              <Filter className="w-4 h-4 text-primary" />
              <span className="font-semibold">Filters:</span>
            </div>
            
            <select 
              value={filterLocation} 
              onChange={(e) => setFilterLocation(e.target.value)}
              className="bg-background/50 border border-white/10 rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary"
            >
              <option value="all">All Locations</option>
              <option value="remote">Remote</option>
              <option value="onsite">On-site</option>
              <option value="hybrid">Hybrid</option>
            </select>

            <select 
              value={filterDuration} 
              onChange={(e) => setFilterDuration(e.target.value)}
              className="bg-background/50 border border-white/10 rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary"
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
                className="bg-background/50 border border-white/10 rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary font-medium"
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
          {isLoading ? (
            <div className="w-full py-20 flex justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          ) : displayedInternships.length > 0 ? (
            displayedInternships.map((internship, i) => (
              <InternshipCard key={internship.id} internship={internship} index={i} />
            ))
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center text-center glass rounded-3xl">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-foreground/30" />
              </div>
              <h3 className="text-xl font-bold mb-2">No Internships Found</h3>
              <p className="text-foreground/60 max-w-sm">
                We couldn't find any opportunities matching your filters. Try adjusting your search criteria.
              </p>
              <button 
                onClick={() => {setSearchQuery(''); setFilterLocation('all'); setFilterDuration('all');}}
                className="mt-6 px-6 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-semibold"
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
