import { CalendarCheck, MapPin, Users, ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "My Registrations | Sponsora",
};

export default function RegistrationsPage() {
  const registrations = [
    {
      id: 1,
      title: "Global AI Hackathon 2026",
      date: "Oct 15 - 17, 2026",
      location: "Online",
      status: "Upcoming",
      team: "The Innovators",
      members: 4,
    },
    {
      id: 2,
      title: "Design Thinking Masterclass",
      date: "Nov 10, 2026",
      location: "New Delhi, India",
      status: "Upcoming",
      team: null,
      members: 1,
    },
    {
      id: 3,
      title: "Web3 Developers Summit",
      date: "Aug 5 - 6, 2025",
      location: "Bangalore, India",
      status: "Completed",
      team: null,
      members: 1,
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">My Registrations</h1>
        <p className="text-foreground/70 mt-1">Manage all your upcoming and past event registrations.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="border-b border-gray-100 dark:border-gray-800 p-4 flex gap-4 bg-gray-50 dark:bg-slate-800/50">
          <button className="px-4 py-2 bg-white dark:bg-slate-800 text-foreground shadow-sm rounded-lg font-medium text-sm">All</button>
          <button className="px-4 py-2 text-foreground/60 hover:text-foreground font-medium text-sm transition-colors">Upcoming</button>
          <button className="px-4 py-2 text-foreground/60 hover:text-foreground font-medium text-sm transition-colors">Completed</button>
        </div>
        
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {registrations.map((reg) => (
            <div key={reg.id} className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 shrink-0 flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700">
                  <span className="text-xs font-bold text-foreground/60">{reg.date.substring(0, 3).toUpperCase()}</span>
                  <span className="text-lg font-bold text-foreground">{reg.date.match(/\d+/)?.[0]}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-foreground">{reg.title}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      reg.status === 'Upcoming' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {reg.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60">
                    <span className="flex items-center gap-1"><CalendarCheck className="w-4 h-4" /> {reg.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {reg.location}</span>
                    {reg.team && <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {reg.team} ({reg.members})</span>}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-auto flex md:flex-col gap-2">
                <Link href={`/events/demo-${reg.id}`} className="flex-1 md:flex-none text-center bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                  View Details
                </Link>
                {reg.status === 'Upcoming' && (
                  <button className="flex-1 md:flex-none text-center bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                    Enter Portal <ExternalLink className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
