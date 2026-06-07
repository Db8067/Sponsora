"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Briefcase, MapPin, ExternalLink, Activity, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CategoryInternshipsPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug;

    const [category, setCategory] = useState<any>(null);
    const [internships, setInternships] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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
                console.error("Category not found", catError);
                setLoading(false);
                return;
            }
            setCategory(catData);

            // 2. Fetch Internships for this Category
            const { data: internshipsData, error: internshipsError } = await supabase
                .from('sponsora_posts')
                .select('*')
                .eq('category_id', catData.id)
                .order('sort_order', { ascending: true })
                .order('created_at', { ascending: false });
                
            if (!internshipsError && internshipsData) {
                setInternships(internshipsData);
            }
            setLoading(false);
        }

        fetchCategoryAndInternships();
    }, [slug]);

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
                <Activity size={48} className="text-muted-foreground mb-4 opacity-50" />
                <h1 className="text-3xl font-black mb-2">Category Not Found</h1>
                <p className="text-muted-foreground mb-8">This category doesn't exist or has been removed.</p>
                <button onClick={() => router.push('/internshipcategory')} className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">
                    <ArrowLeft size={18} /> Back to Categories
                </button>
            </div>
        );
    }

    return (
        <div className="relative min-h-[100dvh] w-full flex flex-col overflow-x-hidden pt-24 pb-12 selection:bg-primary/30 bg-gradient-to-b from-primary/5 to-background">
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none hidden dark:block"></div>

            <div className="relative z-10 flex flex-col w-full max-w-[1400px] px-4 md:px-6 lg:px-12 mx-auto">
                
                {/* Back button */}
                <button onClick={() => router.push('/internshipcategory')} className="w-fit flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-medium">
                    <ArrowLeft size={16} /> Back to Categories
                </button>

                {/* Header */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 mb-16 text-center md:text-left">
                    {category.image_url && (
                        <div className="size-24 md:size-32 rounded-3xl overflow-hidden shrink-0 bg-white/5 border border-white/10 shadow-2xl">
                            <img src={category.image_url} alt={category.name} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div>
                        <h1 className="font-heading font-black tracking-tighter text-foreground text-4xl sm:text-5xl drop-shadow-md mb-4">
                            {category.name}
                        </h1>
                        <p className="text-foreground/70 text-lg max-w-2xl leading-relaxed">
                            {category.description || `Explore the best ${category.name} internships.`}
                        </p>
                    </div>
                </div>

                {/* Internships Grid */}
                {internships.length === 0 ? (
                    <div className="py-20 text-center border-2 border-dashed border-white/10 rounded-[2rem] bg-white/5 backdrop-blur-sm">
                        <Briefcase size={48} className="text-muted-foreground mx-auto mb-4 opacity-50" />
                        <h3 className="text-xl font-bold text-foreground mb-2">No internships available yet</h3>
                        <p className="text-muted-foreground">Check back later for exciting upcoming internships in {category.name}.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {internships.map((internship) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={internship.id}
                                className="group flex flex-col bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl overflow-hidden hover:border-primary/30 transition-all hover:shadow-xl hover:-translate-y-1"
                            >
                                {internship.image_url ? (
                                    <div className="w-full h-48 overflow-hidden bg-white/5 border-b border-white/5">
                                        <img src={internship.image_url} alt={internship.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                ) : (
                                    <div className="w-full h-32 bg-primary/10 flex items-center justify-center border-b border-white/5">
                                        <Briefcase size={32} className="text-primary/50" />
                                    </div>
                                )}
                                
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">{internship.title}</h3>
                                    
                                    <div className="flex flex-col gap-2 mb-4 mt-auto pt-4">
                                        {internship.date_info && (
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                                <Calendar size={14} className="text-primary" /> {internship.date_info}
                                            </div>
                                        )}
                                        {internship.location && (
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                                <MapPin size={14} className="text-primary" /> {internship.location}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {internship.description && (
                                        <p className="text-sm text-foreground/60 line-clamp-3 mb-6">
                                            {internship.description}
                                        </p>
                                    )}

                                    {internship.apply_link && (
                                        <a 
                                            href={internship.apply_link} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="mt-auto w-full py-3 rounded-xl bg-foreground text-background font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                                        >
                                            Apply Now <ExternalLink size={14} />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
