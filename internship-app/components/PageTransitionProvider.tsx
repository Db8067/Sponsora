"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Trigger animation on initial client mount if starting on a dynamic page
  useEffect(() => {
    const path = window.location.pathname;
    const isDynamic = path.includes("/internships/category/") || path.includes("/internships/") || path === "/internshipcategory";
    if (isDynamic) {
      setIsTransitioning(true);
    }
  }, []);

  // Control transition state when path changes
  useEffect(() => {
    const isDynamic = pathname.includes("/internships/category/") || pathname.includes("/internships/");
    let timeoutId: NodeJS.Timeout;

    if (isDynamic) {
      // Dynamic page: wait for the custom 'sponsora-page-loaded' event,
      // but have a safety timeout of 2.5 seconds.
      timeoutId = setTimeout(() => {
        setIsTransitioning(false);
      }, 2500);
    } else {
      // Static page: hide transition after a small delay (600ms)
      timeoutId = setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  // Listen to custom window event to complete transition immediately when data finishes fetching
  useEffect(() => {
    const handleLoaded = () => {
      setIsTransitioning(false);
    };
    window.addEventListener("sponsora-page-loaded", handleLoaded);
    return () => {
      window.removeEventListener("sponsora-page-loaded", handleLoaded);
    };
  }, []);

  // Intercept relative link clicks to show transition overlay
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (anchor.hasAttribute("data-no-transition")) return;

      // Ignore hash links
      if (href.startsWith("#")) return;

      // Ignore javascript:void(0) or similar
      if (href.startsWith("javascript:")) return;

      // Only handle internal links
      const isInternal = href.startsWith("/") || href.startsWith(window.location.origin);
      const isDownload = anchor.hasAttribute("download");
      const isExternalTarget = anchor.getAttribute("target") === "_blank";
      const isModified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

      if (isInternal && !isDownload && !isExternalTarget && !isModified) {
        // Parse paths to check if they are identical to current location
        const currentPath = window.location.pathname;
        const targetUrl = new URL(href, window.location.origin);
        
        if (targetUrl.pathname === currentPath) {
          return; // Already on this page, do not show transition or re-navigate
        }

        // Intercept and animate
        e.preventDefault();
        setIsTransitioning(true);

        // Perform the navigation
        router.push(href);
      }
    };

    window.addEventListener("click", handleLinkClick, { capture: true });
    return () => {
      window.removeEventListener("click", handleLinkClick, { capture: true });
    };
  }, [router]);

  // Intercept browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setIsTransitioning(true);
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Listen for manual trigger
  useEffect(() => {
    const handleManualTrigger = () => setIsTransitioning(true);
    window.addEventListener("trigger-page-transition", handleManualTrigger);
    return () => window.removeEventListener("trigger-page-transition", handleManualTrigger);
  }, []);

  return (
    <>
      {children}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center backdrop-blur-lg"
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
