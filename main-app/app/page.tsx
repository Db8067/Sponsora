import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 sm:pt-40 sm:pb-32 lg:px-12 max-w-[1400px] mx-auto w-full flex flex-col md:flex-row items-center justify-between min-h-[90vh]">
        
        {/* Left Content */}
        <div className="w-full md:w-[45%] z-10">
          <h1 className="font-heading font-black tracking-tighter text-foreground text-5xl sm:text-7xl lg:text-8xl leading-[0.95] text-balance">
            Incredible <br /> events <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">start here.</span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl leading-relaxed text-foreground/60 font-medium max-w-lg">
            Sponsora is the ultimate platform to host hackathons, cultural fests, and workshops. Manage your attendees and find the best sponsors, all in one place.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
            <Link href="/dashboard/organizer" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-foreground text-background px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
                Create Your First Event
              </button>
            </Link>
          </div>
        </div>

        {/* Right Graphic (Hidden on mobile as requested, but stunning on desktop) */}
        <div className="hidden md:flex w-full md:w-[50%] relative justify-end mt-16 md:mt-0">
          <div className="relative w-full max-w-2xl aspect-square">
            {/* The generated high quality doodle art image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[3rem] blur-3xl opacity-50"></div>
            <img 
              src="/images/hero-art.png" 
              alt="Sponsora Event Art" 
              className="relative z-10 w-full h-full object-cover rounded-[3rem] shadow-2xl border border-white/5"
            />
          </div>
        </div>

        {/* Mobile Minimal Aesthetic Addition */}
        <div className="md:hidden w-full mt-16 flex flex-col items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>
          <Link href="/events" className="flex items-center gap-2 text-primary font-bold">
            Discover upcoming events <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </section>
    </div>
  );
}

