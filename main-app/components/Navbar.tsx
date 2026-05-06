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
    { name: "Browse Events", href: "/events", icon: Calendar },
    { name: "Blog", href: "/blog", icon: BookText },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass h-16' : 'bg-transparent h-20'}`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <Rocket className="h-6 w-6" />
          </div>
          <span className="font-heading font-black text-2xl tracking-tighter text-foreground">SPONSORA</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-sm font-bold text-foreground/70 hover:text-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="h-6 w-px bg-white/10 mx-2" />

           <div className="flex items-center gap-4">
             {!isLoaded ? (
               <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
             ) : isSignedIn ? (
               <>
                 <Link 
                   href={`/dashboard/${user.publicMetadata.role || 'user'}`}
                   className="flex items-center gap-2 text-sm font-bold bg-white/5 px-4 py-2 rounded-xl hover:bg-white/10 transition-all"
                 >
                   <LayoutDashboard className="w-4 h-4" /> Dashboard
                 </Link>
                 <UserProfile />
               </>
             ) : (
               <>
                 <button className="text-sm font-bold text-foreground/70 hover:text-foreground">Log in</button>
                 <CustomButton className="ml-4">
                   Sign up
                 </CustomButton>
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
            className="w-10 h-10 flex items-center justify-center rounded-xl glass border-white/20 text-foreground active:scale-90 transition-transform"
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-background border-l border-white/10 z-[60] md:hidden shadow-2xl p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="font-heading font-black text-xl tracking-tighter">MENU</span>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-lg">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6 mb-auto">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link 
                      key={link.name} 
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 text-2xl font-bold text-foreground/70 hover:text-primary transition-all group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all">
                        <Icon className="w-6 h-6" />
                      </div>
                      {link.name}
                    </Link>
                  );
                })}
              </div>

               <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
                 {isSignedIn ? (
                   <>
                     <Link 
                       href={`/dashboard/${user.publicMetadata.role || 'user'}`}
                       onClick={() => setIsOpen(false)}
                       className="flex items-center justify-center gap-3 bg-primary text-white py-4 rounded-2xl font-bold text-lg"
                     >
                       <LayoutDashboard className="w-6 h-6" /> Dashboard
                     </Link>
                     <UserProfile />
                   </>
                 ) : (
                   <>
                     <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 font-bold text-lg">Log in</button>
                     <CustomButton className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20">
                       Sign up
                     </CustomButton>
                   </>
                 )}
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
