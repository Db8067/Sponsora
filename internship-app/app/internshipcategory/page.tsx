"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const internshipCategories = [
  {
    title: "Software Engineering",
    description: "Frontend, Backend, Fullstack, AI & DevOps",
    href: "/internships/software-engineering",
    bgImage: "/images/se_internship_doodle.png",
  },
  {
    title: "Design & UI/UX",
    description: "Product Design, Graphic Design, Web Design",
    href: "/internships/design",
    bgImage: "/images/design_internship_doodle.png",
  },
  {
    title: "Marketing & Growth",
    description: "Digital Marketing, SEO, Social Media & Content",
    href: "/internships/marketing",
    bgImage: "/images/marketing_internship_doodle.png",
  },
  {
    title: "Finance & Accounting",
    description: "Financial Analysis, Accounting, Investment Banking",
    href: "/internships/finance",
    bgImage: "/images/finance_internship_doodle.png",
  },
  {
    title: "Operations & HR",
    description: "Human Resources, Business Ops & Management",
    href: "/internships/operations",
    bgImage: "/images/hr_internship_doodle.png",
  },
];

export default function InternshipCategoryPage() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigation = (href: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(href);
    }, 1000);
  };

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3 xl:gap-6 w-full">
              {internshipCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(category.href)}
                  className="group relative flex flex-row items-center md:flex-col md:justify-end w-full h-auto p-4 sm:p-5 md:p-0 md:h-[280px] lg:h-[300px] xl:h-[320px] rounded-2xl md:rounded-[2rem] overflow-hidden glass md:hover:-translate-y-2 active:scale-[0.98] transition-all duration-300 ease-out text-left bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-primary/20 dark:hover:border-white/20 shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-primary/20"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 md:absolute md:inset-0 md:w-full md:h-full opacity-100 md:opacity-60 md:group-hover:opacity-100 transition-all duration-500 md:group-hover:scale-110 ease-out bg-cover bg-center rounded-xl md:rounded-none dark:opacity-60 md:opacity-80"
                       style={{ backgroundImage: `url('${category.bgImage}')` }} />
                  
                  <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20 z-10 transition-opacity duration-300 group-hover:opacity-80" />
                  <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-10 " />

                  <div className="relative z-20 flex-1 md:flex-none md:w-full ml-4 md:ml-0 md:p-6 lg:p-4 xl:p-6 flex flex-col gap-1 md:gap-3">
                    <h3 className="text-base sm:text-lg lg:text-lg xl:text-2xl font-bold text-foreground md:text-white transition-colors leading-tight">
                      {category.title}
                    </h3>
                    <p className="hidden md:block text-white/70 text-sm font-medium lg:line-clamp-1 xl:line-clamp-2">
                      {category.description}
                    </p>
                    <div className="hidden md:flex mt-4 w-10 h-10 rounded-full bg-white/10 items-center justify-center backdrop-blur-md border border-white/20 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center gap-6"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <img src="/images/logo-light.png" alt="Sponsora Logo" className="h-16 md:h-20 w-auto dark:hidden block drop-shadow-2xl" />
                <img src="/images/logo-dark.png" alt="Sponsora Logo" className="h-16 md:h-20 w-auto hidden dark:block drop-shadow-2xl" />
              </motion.div>
              
              <div className="w-40 h-1.5 bg-white/5 rounded-full overflow-hidden mt-4 relative">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
