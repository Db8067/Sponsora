import { Bookmark, Calendar, MapPin } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Saved Events | Sponsora",
};

export default function BookmarksPage() {
  const bookmarks = [
    {
      id: 1,
      title: "Web3 Developers Summit",
      date: "Aug 5 - 6, 2026",
      location: "Bangalore, India",
      category: "CONFERENCE",
      price: "₹999",
      image: "from-blue-500/20 to-cyan-500/20"
    },
    {
      id: 2,
      title: "UI/UX Design Challenge",
      date: "Sep 12 - 14, 2026",
      location: "Online",
      category: "COMPETITION",
      price: "Free",
      image: "from-pink-500/20 to-rose-500/20"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Saved Events</h1>
        <p className="text-foreground/70 mt-1">Events you've bookmarked for later.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookmarks.map((event) => (
          <div key={event.id} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col group relative">
            <button className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur rounded-full text-primary hover:bg-white transition-colors shadow-sm">
              <Bookmark className="w-5 h-5 fill-current" />
            </button>
            <div className={`h-32 bg-gradient-to-tr ${event.image} w-full relative`}>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-foreground/80">
                {event.category}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors mb-3">
                {event.title}
              </h3>
              <div className="space-y-2 mb-6 text-sm text-foreground/70 flex-1">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {event.date}</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {event.location}</div>
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <span className="font-semibold text-foreground">{event.price}</span>
                <Link href={`/events/demo-${event.id}`} className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {bookmarks.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 border-dashed">
          <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground">No saved events yet</h3>
          <p className="text-foreground/60 mt-1 mb-6">When you find an event you like, bookmark it to save it here.</p>
          <Link href="/events" className="bg-primary text-white px-6 py-2 rounded-xl font-medium shadow-sm hover:bg-primary-dark transition-all">
            Browse Events
          </Link>
        </div>
      )}
    </div>
  );
}
