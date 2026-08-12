import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import CategoryGrid from "@/components/CategoryGrid";

export default async function GlocalViewInternshipPage() {
  const { data: cats } = await supabase
    .from('sponsora_categories')
    .select('*')
    .eq('type', 'internship')
    .or('is_deleted.eq.false,is_deleted.is.null')
    .order('sort_order', { ascending: true });

  const categories = (cats || []).map((c: any) => ({
    title: c.name || c.title,
    description: c.description,
    href: `/internships/category/${c.slug || c.id}`,
    bgImage: c.image_url || "/images/se_internship_doodle.png"
  }));

  return (
    <>
      <div className="relative min-h-[100dvh] w-full flex flex-col overflow-x-hidden pt-24 md:pt-20 lg:pt-24 pb-12 md:pb-16 selection:bg-primary/30">
        
        {/* Background ambient lighting */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none hidden dark:block"></div>

        <div className="relative z-10 flex flex-col w-full max-w-[1400px] px-4 md:px-6 lg:px-12 mx-auto">
          
          {/* Header - Centered */}
          <div className="mb-12 md:mb-6 lg:mb-8 text-center max-w-3xl mx-auto flex flex-col items-center mt-8 md:mt-0">
            <h1 className="font-heading font-black tracking-tighter text-foreground text-4xl sm:text-5xl md:text-3xl lg:text-4xl xl:text-5xl text-balance drop-shadow-md mb-6 md:mb-3 lg:mb-4">
              Explore <br className="hidden md:block lg:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Internships</span>
            </h1>
            <p className="text-foreground/70 text-lg md:text-sm lg:text-base xl:text-lg font-medium max-w-2xl text-balance leading-relaxed">
              Find the perfect internship opportunity to kickstart your career.
            </p>
          </div>

          {/* Categories Section */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8 md:mb-4 lg:mb-6">
              <h2 className="text-2xl md:text-xl lg:text-2xl font-bold text-foreground tracking-tight">Browse Categories</h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
            </div>

            <CategoryGrid categories={categories} />
          </div>

        </div>
      </div>
    </>
  );
}
