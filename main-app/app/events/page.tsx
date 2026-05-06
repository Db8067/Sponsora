import Link from "next/link";
import { Search, Filter, Calendar, Users, Trophy } from "lucide-react";

export const metadata = {
  title: "Browse Events | Sponsora",
  description: "Find the best hackathons, cultural fests, workshops, and sports events.",
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Explore Events</h1>
          <p className="text-foreground/70 text-lg">Discover and register for upcoming events across the country.</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search events by name, organizer, or city..." 
              className="w-full bg-gray-50 dark:bg-slate-800 rounded-xl pl-12 pr-4 py-3 text-foreground placeholder:text-gray-500 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <button className="flex items-center gap-2 whitespace-nowrap bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
              <Filter className="w-4 h-4" /> Category
            </button>
            <button className="flex items-center gap-2 whitespace-nowrap bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
              <Calendar className="w-4 h-4" /> Date
            </button>
            <button className="flex items-center gap-2 whitespace-nowrap bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
              Free / Paid
            </button>
          </div>
        </div>

        {/* Active Filters / Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">All Events</span>
          <span className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-full text-sm hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors">Hackathons</span>
          <span className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-full text-sm hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors">Cultural Fests</span>
          <span className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-full text-sm hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors">Workshops</span>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all group flex flex-col">
              <div className="h-48 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 w-full relative">
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-primary">
                  {i % 2 === 0 ? "HACKATHON" : "WORKSHOP"}
                </div>
                {i === 1 && (
                  <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    FEATURED
                  </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                  <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors mb-4">
                    {i % 2 === 0 ? "National Code Sprint 2026" : "Design Thinking Masterclass"}
                  </h3>
                  <div className="space-y-2 mb-6 text-sm text-foreground/70">
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Nov 10 - 12, 2026</div>
                    <div className="flex items-center gap-2"><Users className="w-4 h-4" /> {i * 150}+ Participants</div>
                    {i % 2 === 0 && <div className="flex items-center gap-2"><Trophy className="w-4 h-4" /> ₹{i}0,000 Prize Pool</div>}
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center mt-auto">
                  <span className={`font-semibold ${i % 3 === 0 ? 'text-foreground' : 'text-success'}`}>
                    {i % 3 === 0 ? '₹499 Entry' : 'Free Entry'}
                  </span>
                  <Link href={`/events/demo-event-${i}`} className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 text-foreground px-8 py-3 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
            Load More Events
          </button>
        </div>
      </div>
    </div>
  );
}
