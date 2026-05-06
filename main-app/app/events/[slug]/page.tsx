import Link from "next/link";
import { Calendar, MapPin, Users, Trophy, Share2, Bookmark, ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return {
    title: `Event Detail: ${resolvedParams.slug} | Sponsora`,
    description: "Join this amazing event on Sponsora.",
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  // Placeholder data for the static UI
  const event = {
    title: "Global AI Hackathon 2026",
    slug: resolvedParams.slug,
    category: "Hackathon",
    date: "Oct 15 - 17, 2026",
    time: "09:00 AM IST",
    location: "Online / Virtual",
    participants: "1,500+",
    prize: "₹5,00,000",
    entryFee: "Free",
    teamSize: "1 - 4 Members",
    deadline: "Oct 10, 2026",
    organizer: {
      name: "Tech Nexus Foundation",
      verified: true
    },
    description: "Join the largest AI hackathon of the year! Build innovative solutions using generative AI, machine learning, and computer vision to solve real-world problems. Mentorship provided by industry experts.",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20">
      {/* Hero / Banner */}
      <div className="w-full h-64 md:h-80 lg:h-96 bg-gradient-to-br from-primary/80 to-accent/80 relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between py-6 relative z-10">
          <Link href="/events" className="inline-flex items-center text-white/80 hover:text-white transition-colors w-fit bg-black/30 backdrop-blur px-3 py-1.5 rounded-lg text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to events
          </Link>
          <div className="flex justify-between items-end">
            <div className="bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded-full shadow-md w-fit">
              {event.category.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8 mb-8">
              <div className="flex justify-between items-start mb-6">
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  {event.title}
                </h1>
                <div className="flex gap-2 shrink-0 ml-4">
                  <button className="p-2 bg-gray-50 dark:bg-slate-800 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-500">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-gray-50 dark:bg-slate-800 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-500">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  TN
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Organized by</p>
                  <p className="font-semibold text-foreground flex items-center gap-1">
                    {event.organizer.name}
                    {event.organizer.verified && (
                      <span className="text-primary" title="Verified Organizer">✓</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none font-sans text-foreground/80">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">About the Event</h3>
                <p className="mb-6 leading-relaxed">{event.description}</p>
                <p className="leading-relaxed">This is a great opportunity to network, learn from industry leaders, and win amazing cash prizes. Whether you're a beginner or a seasoned pro, there's a place for you here.</p>
              </div>
            </div>
            
            {/* Sponsors Section */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8">
               <h3 className="font-heading text-xl font-bold text-foreground mb-6">Our Sponsors</h3>
               <div className="flex flex-wrap gap-6 items-center justify-center opacity-60 grayscale hover:grayscale-0 transition-all">
                  {/* Placeholder Sponsor Logos */}
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="h-8 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 sticky top-24">
              <h3 className="font-heading text-lg font-bold text-foreground mb-6">Event Details</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{event.date}</p>
                    <p className="text-sm text-foreground/60">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Prize Pool</p>
                    <p className="text-sm text-foreground/60">{event.prize}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Team Size</p>
                    <p className="text-sm text-foreground/60">{event.teamSize}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-foreground/70 text-sm">Registration ends in</span>
                  <span className="font-bold text-accent">5 Days</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full w-[80%]"></div>
                </div>
                <p className="text-xs text-foreground/60 mt-2 text-center">Deadline: {event.deadline}</p>
              </div>

              <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-md transition-all hover:-translate-y-1">
                Register Now — {event.entryFee}
              </button>
              
              <div className="mt-4 text-center">
                <Link href={`/dashboard/sponsor?event=${event.slug}`} className="text-sm font-medium text-foreground/60 hover:text-primary transition-colors">
                  Interested in Sponsoring?
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
