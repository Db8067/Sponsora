import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] md:h-[100dvh] overflow-hidden bg-background relative selection:bg-primary/30">
      
      {/* Animated Luma-like Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/30 dark:bg-primary/10 blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent/20 dark:bg-accent/10 blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[10%] w-[50%] h-[50%] rounded-full bg-primary-dark/20 dark:bg-primary-dark/10 blur-[120px] animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-background/50 dark:bg-background/80 backdrop-blur-[80px]"></div>
      </div>
      
      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 max-w-[1400px] mx-auto w-full flex-1 flex flex-col md:flex-row items-center justify-between pt-28 md:pt-20 pb-8 md:pb-10 overflow-y-auto md:overflow-visible">
        
        {/* Left Content */}
        <div className="w-full md:w-[45%] z-10 shrink-0 flex flex-col justify-center items-start text-left">
          
          {/* Mobile Top Row: Heading + Image */}
          <div className="flex flex-row items-center justify-between w-full md:block">
            <h1 className="w-[65%] md:w-full font-heading font-black tracking-tighter text-foreground text-[2.75rem] leading-[1.05] sm:text-5xl lg:text-6xl md:leading-[0.95] text-balance">
              Everything <br /> 
              under <br className="md:hidden" />
              <span className="hidden md:inline">one</span><br className="hidden md:block" />
              <span className="md:hidden">one <br /></span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">roof.</span>
            </h1>
            
            <div className="w-[35%] flex md:hidden justify-end pb-4">
              <div className="relative w-full flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-2xl blur-xl opacity-70"></div>
                <img 
                  src="/images/hero-art.png" 
                  alt="Sponsora Event Art" 
                  className="relative z-10 w-full h-auto object-contain rounded-2xl shadow-xl border border-white/5"
                />
              </div>
            </div>
          </div>

          <p className="mt-5 md:mt-8 text-sm md:text-lg lg:text-xl leading-relaxed text-foreground/60 font-medium max-w-lg text-left">
            Organize events, manage QR ticketing, secure sponsors, and book venues. Discover hackathons, fests, and internships—all in one place.
          </p>
          <div className="mt-6 md:mt-12 flex flex-col sm:flex-row items-start justify-start gap-4 md:gap-6 w-full">
            <Link href="/events" className="w-auto flex justify-start">
              <button className="w-auto bg-foreground text-background px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
                Explore now
              </button>
            </Link>
          </div>
        </div>

        {/* Right Graphic (Visible on Desktop only) */}
        <div className="hidden md:flex w-full md:w-[50%] relative justify-center md:justify-end mt-4 md:mt-0 flex-1 min-h-0 overflow-hidden pb-2 md:pb-0">
          <div className="relative w-full h-full max-w-xl flex items-center justify-center">
            {/* The generated high quality doodle art image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-[2rem] md:rounded-[3rem] blur-2xl md:blur-3xl opacity-50 max-h-[90%] md:max-h-[80%] my-auto mx-auto max-w-[90%] md:max-w-full"></div>
            <img 
              src="/images/hero-art.png" 
              alt="Sponsora Event Art" 
              className="relative z-10 w-auto h-full max-h-[90%] md:max-h-[80%] object-contain md:object-cover rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-white/5 my-auto"
            />
          </div>
        </div>

      </section>
    </div>
  );
}

