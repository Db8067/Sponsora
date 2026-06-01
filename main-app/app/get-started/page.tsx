import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Get Started | Sponsora",
  description: "Choose your path on Sponsora. Discover events, organize your own, ask for sponsorship, or become a sponsor.",
};

const portalOptions = [
  {
    title: "Discover Events",
    href: "/events",
    bgImage: "/images/india-gate.png",
  },
  {
    title: "Organise Event",
    href: "/dashboard/organizer",
    bgImage: "/images/qutub-minar.png",
  },
  {
    title: "Ask for Sponsorship",
    href: "/sponsorship/request",
    bgImage: "/images/red-fort.png",
  },
  {
    title: "Become a Sponsor",
    href: "/dashboard/sponsor",
    bgImage: "/images/lotus-temple.png",
  },
];

export default function GetStartedPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden items-center justify-center pt-20 pb-12">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 brightness-75"
      >
        <source src="/videos/Sponsoravideo.mp4" type="video/mp4" />
      </video>

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col w-full max-w-[1400px] px-6 lg:px-12 mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="font-heading font-black tracking-tighter text-foreground text-4xl sm:text-5xl lg:text-6xl text-balance drop-shadow-lg">
            Choose your path on <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Sponsora</span>
          </h1>
        </div>

        {/* Cards Row Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {portalOptions.map((option, index) => (
            <Link
              key={index}
              href={option.href}
              className="group relative flex flex-col justify-end h-[300px] sm:h-[400px] rounded-3xl overflow-hidden glass hover:scale-[1.02] transition-transform duration-300 ease-out"
            >
              {/* Doodle Art Background Image */}
              <div 
                className="absolute inset-0 z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-110 ease-out bg-cover bg-center"
                style={{ backgroundImage: `url('${option.bgImage}')` }}
              />
              
              {/* Dark Gradient Overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />
              
              {/* Premium Neon Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-screen" />

              {/* Content */}
              <div className="relative z-20 p-6 sm:p-8 flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary-foreground transition-colors max-w-[80%]">
                  {option.title}
                </h3>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                  <ArrowRight className="w-5 h-5 text-foreground group-hover:text-background transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
