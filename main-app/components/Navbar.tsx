"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { Menu, X, Rocket, LayoutDashboard, Calendar, BookText } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import CustomButton from "./ui/CustomButton";
import { motion, AnimatePresence } from "framer-motion";
import UserProfile from "./UserProfile";

export default function Navbar() {
  const isLoaded = true;
  const isSignedIn = false;
  const user: any = { publicMetadata: { role: 'user' } };
  
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Discover Events", href: "/events", icon: Calendar },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/80 backdrop-blur-xl py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/images/logo-light.png" alt="Sponsora Logo" className="h-8 md:h-10 dark:hidden block" />
          <img src="/images/logo-dark.png" alt="Sponsora Logo" className="h-8 md:h-10 hidden dark:block" />
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="h-4 w-px bg-foreground/10" />

           <div className="flex items-center gap-6">
             {!isLoaded ? (
               <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
             ) : isSignedIn ? (
               <>
                 <Link 
                   href={`/dashboard/${user.publicMetadata.role || 'user'}`}
                   className="text-sm font-medium hover:text-primary transition-colors"
                 >
                   Dashboard
                 </Link>
                 <UserProfile />
               </>
             ) : (
               <>
                 <Link href="/sign-in" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">Sign In</Link>
                 <Link href="/sign-up" className="text-sm font-medium bg-foreground text-background px-4 py-2 rounded-full hover:scale-105 transition-transform">
                   Get Started
                 </Link>
               </>
             )}
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
              className="fixed top-0 left-0 right-0 bg-background z-[60] md:hidden p-6 flex flex-col border-b border-white/5"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <img src="/images/logo-light.png" alt="Sponsora Logo" className="h-8 dark:hidden block" />
                  <img src="/images/logo-dark.png" alt="Sponsora Logo" className="h-8 hidden dark:block" />
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6 mb-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

               <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
                 {isSignedIn ? (
                   <>
                     <Link 
                       href={`/dashboard/${user.publicMetadata.role || 'user'}`}
                       onClick={() => setIsOpen(false)}
                       className="text-lg font-bold"
                     >
                       Dashboard
                     </Link>
                     <UserProfile />
                   </>
                 ) : (
                   <div className="flex items-center gap-4">
                     <Link href="/sign-in" className="flex-1 text-center py-3 rounded-full border border-white/10 font-medium">Sign In</Link>
                     <Link href="/sign-up" className="flex-1 text-center py-3 rounded-full bg-foreground text-background font-medium">Get Started</Link>
                   </div>
                 )}
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
