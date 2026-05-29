import Link from "next/link";
import { ArrowRight, Search, Calendar, Users, Trophy, DollarSign, Sparkles, ShieldCheck, Zap, TrendingUp, Handshake } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LiquidButton } from "@/components/ui/LiquidButton";
import EventGrid from "@/components/events/EventGrid";

export default function Home() {


  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 sm:pt-40 sm:pb-32 lg:px-8 bg-gradient-to-b from-primary/10 to-background overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-heading font-black tracking-tighter text-foreground sm:text-7xl text-balance leading-[0.9]">
            WHERE EVENTS MEET <span className="text-primary italic">SPONSORS</span>
          </h1>
          <p className="mt-8 text-base sm:text-xl leading-relaxed text-foreground/70 font-medium max-w-2xl mx-auto px-4">
            The ultimate platform for hackathons, cultural fests, and sports. 
            Connect with organizers as a sponsor or join as a participant.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 px-6">
            <Link href="/events" className="w-full sm:w-auto flex justify-center">
              <LiquidButton>
                Explore Events <ArrowRight className="w-5 h-5 ml-2" />
              </LiquidButton>
            </Link>
            <Link href="/search-sponsors" className="w-full sm:w-auto">
              <Button variant="default" size="lg" className="w-full font-bold">
                Search for Sponsor
              </Button>
            </Link>
            <Link href="/dashboard/sponsor" className="w-full sm:w-auto">
              <Button variant="default" size="lg" className="w-full font-bold">
                Become a Sponsor
              </Button>
            </Link>
          </div>




        </div>


        {/* Quick Search */}
        <div className="mt-16 mx-auto max-w-3xl glass rounded-3xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
            <input 
              type="text" 
              placeholder="Search hackathons, fests..." 
              className="w-full bg-transparent pl-12 pr-4 py-4 text-foreground placeholder:text-foreground/30 border-none outline-none focus:ring-0 text-sm sm:text-base"
            />
          </div>
          <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-dark transition-all">
            Find Now
          </button>
        </div>
      </section>

      {/* Real-time Events Feed */}
      <EventGrid />

      {/* Stats / Trust Bar */}
      <section className="py-12 border-y border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Active Events", val: "120+" },
            { label: "Sponsors", val: "450+" },
            { label: "Participants", val: "25k+" },
            { label: "Prize Pools", val: "₹5Cr+" },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-4xl font-black text-foreground">{stat.val}</p>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-foreground/40 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Categories - Responsive Grid */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="text-left">
            <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tighter">DISCOVER</h2>
            <p className="text-foreground/50 font-bold uppercase tracking-widest text-xs mt-2">Browse by category</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { title: "Hackathons", icon: <Trophy />, color: "from-blue-500/20 to-indigo-500/20", count: "120+ Events" },
            { title: "Cultural Fests", icon: <Sparkles />, color: "from-purple-500/20 to-pink-500/20", count: "85+ Events" },
            { title: "Workshops", icon: <Zap />, color: "from-orange-500/20 to-red-500/20", count: "200+ Events" },
            { title: "Sponsorships", icon: <DollarSign />, color: "from-green-500/20 to-emerald-500/20", count: "50+ Active" },
          ].map((cat, i) => (
            <Link href={`/events?category=${cat.title.toLowerCase()}`} key={i} className="group relative glass rounded-3xl p-8 hover:-translate-y-2 transition-all">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${cat.color} text-foreground`}>
                {cat.icon}
              </div>
              <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">{cat.title}</h3>
              <p className="text-sm font-bold text-foreground/40 mt-2">{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Events - Carousel on Mobile */}
      <section className="py-24 bg-black/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tighter">TRENDING</h2>
              <p className="text-foreground/50 font-bold uppercase tracking-widest text-xs mt-2">Hot opportunities</p>
            </div>
            <Link href="/events" className="hidden sm:flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="carousel-container gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="carousel-item bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-primary/50 transition-all group">
                <div className="h-56 bg-gradient-to-tr from-primary/20 to-accent/20 w-full relative">
                  <div className="absolute top-6 left-6 glass px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
                    HACKATHON
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-black text-2xl group-hover:text-primary transition-colors leading-tight mb-6">Global AI Hackathon 2026</h3>
                  <div className="space-y-4 mb-8 text-sm font-bold text-foreground/60">
                    <div className="flex items-center gap-3"><Calendar className="w-5 h-5 text-primary" /> Oct 15 - 17, 2026</div>
                    <div className="flex items-center gap-3"><Users className="w-5 h-5 text-primary" /> 1,500+ Participants</div>
                    <div className="flex items-center gap-3"><Trophy className="w-5 h-5 text-primary" /> ₹5,00,000 Pool</div>
                  </div>
                  <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                    <span className="font-black text-success uppercase tracking-widest text-xs">Free Entry</span>
                    <Link href={`/events/demo-${i}`} className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-xs hover:bg-primary-dark transition-colors">
                      DETAILS
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Link href="/events" className="sm:hidden flex items-center justify-center gap-2 text-sm font-bold text-primary mt-12 py-4 bg-primary/10 rounded-2xl">
            View All Events <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Sponsora Journey - Mobile Optimized Timeline */}
      <section className="py-32 px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-24">
          <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tighter uppercase">The Journey</h2>
          <p className="text-foreground/50 font-bold uppercase tracking-widest text-xs mt-2">How it works</p>
        </div>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary/50 via-accent/50 to-transparent" />
          
          <div className="space-y-24">
            {[
              { title: "Dream & Design", desc: "Create your event page with our AI-powered builder and define your sponsorship goals.", icon: <Sparkles />, side: "left" },
              { title: "Match & Connect", desc: "Our AI matches your event with the perfect sponsors based on industry and target audience.", icon: <Handshake />, side: "right" },
              { title: "Secure & Manage", desc: "Generate legal agreements instantly and manage participant check-ins with ease.", icon: <ShieldCheck />, side: "left" },
              { title: "Impact & Growth", desc: "Track ROI for sponsors and attendee satisfaction with automated reports.", icon: <TrendingUp />, side: "right" },
            ].map((step, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-start md:items-center gap-12 ${step.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                <div className={`flex-1 pl-16 md:pl-0 ${step.side === 'right' ? 'md:text-left' : 'md:text-right'}`}>
                  <div className="glass p-8 rounded-[2rem] border-l-4 border-l-primary relative">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 md:mx-0 inline-flex">
                      {step.icon}
                    </div>
                    <h3 className="font-black text-2xl mb-3 text-foreground uppercase tracking-tight">{step.title}</h3>
                    <p className="text-sm font-medium text-foreground/60 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-2xl bg-background border-4 border-primary flex items-center justify-center font-black text-primary shadow-2xl">
                  {i + 1}
                </div>
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Responsive */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-[3rem] p-10 sm:p-20 text-white shadow-2xl relative overflow-hidden text-center sm:text-left">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-heading text-4xl sm:text-6xl font-black tracking-tighter leading-[0.9] mb-8">READY TO HOST YOUR NEXT BIG EVENT?</h2>
            <p className="text-primary-100 text-lg sm:text-xl font-medium mb-12 opacity-90">
              Join thousands of organizers who use Sponsora to manage registrations and find the best sponsors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard/organizer" className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all shadow-xl">
                Start Organizing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

