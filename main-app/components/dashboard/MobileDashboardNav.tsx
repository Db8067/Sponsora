"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface LinkItem {
  name: string;
  href: string;
  icon: any;
}

interface MobileDashboardNavProps {
  links: LinkItem[];
  orgName: string;
  orgRole: string;
  orgLogo: string;
  createLink?: string;
  createLabel?: string;
  publicProfileLink?: string;
}

export default function MobileDashboardNav({
  links,
  orgName,
  orgRole,
  orgLogo,
  createLink,
  createLabel = "Create",
  publicProfileLink
}: MobileDashboardNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 left-6 z-[55] md:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-2xl bg-primary text-white shadow-2xl flex items-center justify-center active:scale-90 transition-transform"
        >
          <Menu className="w-7 h-7" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-background border-r border-white/10 z-[65] md:hidden shadow-2xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {orgLogo}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{orgName}</p>
                    <p className="text-xs text-foreground/60">{orgRole}</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-lg">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {createLink && (
                <Link 
                  href={createLink}
                  onClick={() => setIsOpen(false)}
                  className="w-full mb-8 bg-primary text-white flex items-center justify-center gap-2 py-4 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20"
                >
                  <Plus className="w-5 h-5" /> {createLabel}
                </Link>
              )}

              <nav className="flex-1 space-y-2 overflow-y-auto">
                {links.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                  
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-4 px-4 py-3.5 rounded-2xl text-lg font-bold transition-all",
                        isActive
                          ? "bg-primary text-white shadow-lg"
                          : "text-foreground/70 hover:bg-white/5"
                      )}
                    >
                      <Icon className={cn("w-6 h-6", isActive ? "text-white" : "text-foreground/40")} />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              {publicProfileLink && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <Link 
                    href={publicProfileLink}
                    onClick={() => setIsOpen(false)}
                    className="w-full py-4 rounded-2xl border border-primary text-primary font-bold text-center block"
                  >
                    View Public Profile
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
