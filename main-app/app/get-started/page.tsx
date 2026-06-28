"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { useUser } from "@clerk/nextjs";

const portalOptions = [
  {
    title: "Discover Events",
    href: "/sign-up?role=participant&redirect_url=/events",
    directHref: "/events",
    bgImage: "/images/india-gate.png",
  },
  {
    title: "Ask for Sponsorship",
    href: "/sign-up?role=organizer&redirect_url=/dashboard/organizer",
    directHref: "/dashboard/organizer",
    bgImage: "/images/doodle_ask_sponsorship.png",
  },
  {
    title: "Become a Sponsor",
    href: "/sign-up?role=sponsor&redirect_url=/dashboard/sponsor",
    directHref: "/dashboard/sponsor",
    bgImage: "/images/doodle_become_sponsor_v2.png",
  },
];

export default function GetStartedPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleNavigation = (option: typeof portalOptions[0]) => {
    // Skip the /sign-up route if already signed in!
    router.push(isSignedIn ? option.directHref : option.href);
  };

  return (
    <>
      {/* Full screen wrapper, preventing scroll on mobile, flex layout */}
      <div className="relative h-[100dvh] w-full flex flex-col overflow-hidden bg-gradient-to-b from-primary/10 to-background pt-24 md:pt-28 pb-4 md:pb-8">
        
        {/* Background ambient lighting (replaces video) */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none hidden dark:block"></div>

        <div className="relative z-10 flex flex-col h-full w-full max-w-[1400px] px-4 md:px-12 mx-auto">
          
          {/* Header - Centered on all devices */}
          <div className="mb-4 md:mb-8 text-center shrink-0">
            <h1 className="font-heading font-black tracking-tighter text-foreground text-3xl sm:text-5xl lg:text-6xl text-balance drop-shadow-md">
              Choose your path on <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Sponsora</span>
            </h1>
          </div>

          {/* Cards Flex/Grid - occupies remaining space fully, no scroll needed */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full min-h-0">
            {portalOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(option)}
                className="group relative flex flex-col justify-end w-full h-full rounded-2xl md:rounded-3xl overflow-hidden glass hover:scale-100 md:hover:scale-[1.02] active:scale-[0.96] transition-transform duration-300 ease-out text-left bg-black/90 dark:bg-transparent"
              >
                {/* Doodle Art Background Image */}
                <div 
                  className="absolute inset-0 z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300 md:group-hover:scale-110 ease-out bg-cover bg-center brightness-90 contrast-125 saturate-150"
                  style={{ backgroundImage: `url('${option.bgImage}')` }}
                />
                
                {/* Dark Gradient Overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />
                
                {/* Premium Neon Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-screen" />

                {/* Content */}
                <div className="relative z-20 p-3 sm:p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0">
                  <h3 className="text-base sm:text-lg md:text-2xl font-bold text-white transition-colors max-w-full md:max-w-[80%] leading-tight">
                    {option.title}
                  </h3>
                  <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 md:group-hover:bg-primary md:group-hover:border-primary transition-all duration-300">
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white transition-colors" />
                  </div>
                </div>
              </button>
            ))}
          </div>

        </div>
      </div>
  );
}
