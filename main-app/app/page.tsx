import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden bg-gradient-to-b from-primary/10 to-background relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
      
      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 max-w-[1400px] mx-auto w-full flex-1 flex flex-col md:flex-row items-center justify-between pt-20 pb-10">
        
        {/* Left Content */}
        <div className="w-full md:w-[45%] z-10 shrink-0 flex flex-col justify-center">
          <h1 className="font-heading font-black tracking-tighter text-foreground text-4xl sm:text-5xl lg:text-6xl leading-[0.95] text-balance">
            Incredible <br /> events <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">start here.</span>
          </h1>
          <p className="mt-4 md:mt-8 text-base md:text-lg lg:text-xl leading-relaxed text-foreground/60 font-medium max-w-lg">
            Sponsora is the ultimate platform to host hackathons, cultural fests, and workshops. Manage your attendees and find the best sponsors, all in one place.
          </p>
          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center gap-4 md:gap-6">
            <Link href="/dashboard/organizer" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-foreground text-background px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
                Create Your First Event
              </button>
            </Link>
          </div>
        </div>

        {/* Right Graphic (Visible on all devices) */}
        <div className="flex w-full md:w-[50%] relative justify-center md:justify-end mt-8 md:mt-0 flex-1 min-h-0 overflow-hidden pb-4 md:pb-0">
          <div className="relative w-full h-full max-w-xl flex items-center justify-center">
            {/* The generated high quality doodle art image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[2rem] md:rounded-[3rem] blur-2xl md:blur-3xl opacity-50 max-h-[90%] md:max-h-[80%] my-auto mx-auto max-w-[90%] md:max-w-full"></div>
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

