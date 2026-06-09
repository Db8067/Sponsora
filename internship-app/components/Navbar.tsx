"use client";

import Link from "next/link";
import { Menu, X, Calendar, ChevronRight, Briefcase, Home } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
  id: string;
  name: string;
  slug: string;
  type: string;
}

export default function Navbar() {
  const { isSignedIn, isLoaded, user } = useUser();
  
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch internship categories for mobile nav
  useEffect(() => {
    async function fetchCategories() {
      try {
        const { supabase } = await import("@/lib/supabase");
        const { data } = await supabase
          .from('sponsora_categories')
          .select('id, name, slug, type')
          .eq('type', 'internship')
          .or('is_deleted.eq.false,is_deleted.is.null')
          .order('sort_order', { ascending: true });
        if (data) setCategories(data);
      } catch (e) {
        console.error("Failed to fetch categories for nav", e);
      }
    }
    fetchCategories();
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/80 backdrop-blur-xl py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/images/logo-light.png" alt="Sponsora Logo" className="h-10 md:h-12 w-auto dark:hidden block" />
          <img src="/images/logo-dark.png" alt="Sponsora Logo" className="h-10 md:h-12 w-auto hidden dark:block" />
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8">
            {!isSignedIn && isLoaded && (
              <Link href="/sign-in" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
                Sign In
              </Link>
            )}
            {isSignedIn && isLoaded && (
              <UserButton />
            )}
            <Link href="/events" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
              Discover Events
            </Link>
          </div>

          <div className="h-4 w-px bg-foreground/10" />

           <div className="flex items-center gap-6">
             <ThemeToggle />
           </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex items-center justify-center text-foreground active:scale-90 transition-transform"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/95 backdrop-blur-xl z-[55] md:hidden"
            />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 right-0 bg-background z-[60] md:hidden p-6 flex flex-col border-b border-white/5 max-h-[90dvh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <img src="/images/logo-light.png" alt="Sponsora Logo" className="h-10 w-auto dark:hidden block" />
                  <img src="/images/logo-dark.png" alt="Sponsora Logo" className="h-10 w-auto hidden dark:block" />
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Homepage Navigation */}
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-4 flex items-center gap-2">
                  <Home className="w-3.5 h-3.5" /> Navigation
                </p>
                <div className="flex flex-col gap-1">
                  <Link
                    href="/internshipcategory"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all font-semibold text-lg group"
                  >
                    <span className="flex items-center gap-3">
                      <Home className="w-5 h-5 text-primary" />
                      Homepage
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>

              {/* Categories Section */}
              {categories.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-4 flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5" /> Internship Categories
                  </p>
                  <div className="flex flex-col gap-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/internships/category/${cat.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between px-4 py-3 rounded-2xl text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all font-semibold text-lg group"
                      >
                        <span>{cat.name}</span>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="h-px bg-white/10 mb-6" />

              {/* Discover Events - always last */}
              <Link 
                href="/events"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-2xl text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all font-semibold text-lg group mb-4"
              >
                <span className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  Discover Events
                </span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
