import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] md:h-[100dvh] overflow-x-hidden md:overflow-hidden relative selection:bg-primary/30">
      
      {/* Animated Luma-like Background (Dark Mode Only) */}
      <div className="absolute inset-0 z-0 overflow-hidden hidden dark:block">
        <div className="absolute top-[-15%] left-[-15%] w-[65%] h-[65%] rounded-full bg-primary/15 blur-[100px] animate-blob"></div>
        <div className="absolute top-[15%] right-[-15%] w-[75%] h-[75%] rounded-full bg-accent/12 blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-25%] left-[5%] w-[65%] h-[65%] rounded-full bg-primary-dark/12 blur-[120px] animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-background/75 backdrop-blur-[60px]"></div>
      </div>
      
      {/* Hero Section */}
      <section className="relative z-10 px-6 lg:px-12 max-w-[1400px] mx-auto w-full flex-1 flex flex-col md:flex-row items-center justify-center md:justify-between pt-32 md:pt-20 pb-16 md:pb-10 gap-12 md:gap-0">
        
        {/* Left Content */}
        <div className="w-full md:w-[45%] flex flex-col justify-center items-center md:items-start text-center md:text-left mt-4 md:mt-0">
          <h1 className="w-full font-heading font-black tracking-tighter text-foreground text-5xl sm:text-6xl md:text-[3.5rem] lg:text-6xl leading-[1.15] md:leading-[0.95] text-balance">
            Everything <br className="hidden md:block" /> 
            under <br className="md:hidden" />
            <span className="hidden md:inline">one</span><br className="hidden md:block" />
            <span className="md:hidden">one </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">roof.</span>
          </h1>

          <p className="mt-6 md:mt-8 text-base md:text-lg lg:text-xl leading-relaxed text-foreground/60 font-medium max-w-lg">
            Organize events, manage QR ticketing, secure sponsors, and book venues. Discover hackathons, fests, and internships—all in one place.
          </p>
          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start w-full">
            <Link href="/get-started" className="w-auto flex justify-center">
              <button className="w-auto bg-foreground text-background px-8 py-4 rounded-full font-bold text-base md:text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-xl shadow-foreground/5">
                Explore now
              </button>
            </Link>
          </div>
        </div>

        {/* Right Graphic */}
        <div className="flex w-full md:w-[50%] relative justify-center md:justify-end mt-4 md:mt-0 flex-1 min-h-[350px] md:min-h-0 pb-12 md:pb-0">
          <div className="relative w-full h-full max-w-sm sm:max-w-md md:max-w-xl flex items-center justify-center">
            {/* The generated high quality doodle art image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-[2rem] md:rounded-[3rem] blur-2xl md:blur-3xl opacity-50 max-h-[100%] md:max-h-[80%] my-auto mx-auto max-w-[100%] md:max-w-full"></div>
            <img 
              src="/images/hero-art.png" 
              alt="Sponsora Event Art" 
              className="relative z-10 w-full h-full md:h-auto object-contain md:rounded-[3rem] shadow-2xl border border-white/5 my-auto"
            />
          </div>
        </div>

      </section>
    </div>
  );
}

