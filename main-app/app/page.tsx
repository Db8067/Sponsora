import Link from "next/link";
import { ArrowRight, Search, Calendar, Users, Trophy, DollarSign } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-24 sm:py-32 lg:px-8 bg-gradient-to-b from-primary/10 to-background overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-6xl text-balance">
            Where Great Events Meet <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">Incredible Sponsors</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/80 font-sans">
            Sponsora is the ultimate platform for finding hackathons, cultural fests, and sports events. 
            Register as a participant, or connect with organizers as a sponsor.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/events"
              className="rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark hover:-translate-y-1 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary flex items-center gap-2"
            >
              Explore Events <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/dashboard/sponsor" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">
              Become a Sponsor <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Quick Search */}
        <div className="mt-16 mx-auto max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-2 sm:p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for hackathons, fests..." 
              className="w-full bg-transparent pl-12 pr-4 py-3 text-foreground placeholder:text-gray-400 border-none outline-none focus:ring-0"
            />
          </div>
          <button className="bg-foreground text-background px-8 py-3 rounded-xl font-medium hover:bg-foreground/90 transition-colors">
            Search
          </button>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <h2 className="font-heading text-3xl font-bold text-center mb-12">Discover Opportunities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Hackathons", icon: <Trophy className="w-6 h-6" />, color: "bg-blue-100 text-blue-600", count: "120+ Events" },
            { title: "Cultural Fests", icon: <Users className="w-6 h-6" />, color: "bg-purple-100 text-purple-600", count: "85+ Events" },
            { title: "Workshops", icon: <Calendar className="w-6 h-6" />, color: "bg-orange-100 text-orange-600", count: "200+ Events" },
            { title: "Sponsorships", icon: <DollarSign className="w-6 h-6" />, color: "bg-green-100 text-green-600", count: "50+ Active" },
          ].map((cat, i) => (
            <Link href={`/events?category=${cat.title.toLowerCase()}`} key={i} className="group relative bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all hover:-translate-y-1">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${cat.color}`}>
                {cat.icon}
              </div>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{cat.title}</h3>
              <p className="text-sm text-foreground/60 mt-1">{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Events Preview */}
      <section className="py-20 px-6 lg:px-8 bg-gray-50 dark:bg-slate-950 border-t border-b border-gray-100 dark:border-gray-900 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-heading text-3xl font-bold">Trending Events</h2>
              <p className="text-foreground/70 mt-2">The most popular events happening soon.</p>
            </div>
            <Link href="/events" className="text-primary font-medium hover:text-primary-dark hidden sm:flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder Event Cards */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all group">
                <div className="h-48 bg-gradient-to-tr from-primary/20 to-accent/20 w-full relative">
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-primary">
                    HACKATHON
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors">Global AI Hackathon 2026</h3>
                  </div>
                  <div className="space-y-2 mb-6 text-sm text-foreground/70">
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Oct 15 - 17, 2026</div>
                    <div className="flex items-center gap-2"><Users className="w-4 h-4" /> 1,500+ Participants</div>
                    <div className="flex items-center gap-2"><Trophy className="w-4 h-4" /> ₹5,00,000 Prize Pool</div>
                  </div>
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <span className="font-semibold text-success">Free Entry</span>
                    <Link href={`/events/demo-${i}`} className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link href="/events" className="text-primary font-medium hover:text-primary-dark flex items-center justify-center gap-1">
              View all events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 sm:p-16 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl"></div>
          
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6 relative z-10">Ready to host your next big event?</h2>
          <p className="text-primary-50 text-lg mb-10 max-w-2xl mx-auto relative z-10 opacity-90">
            Join thousands of organizers who use Sponsora to manage registrations, find sponsors, and deliver unforgettable experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link href="/dashboard/organizer" className="bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-lg">
              Start Organizing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
