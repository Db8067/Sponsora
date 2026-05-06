import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Events | AdminOS",
};

export default function AdminEventsPage() {
  const events = [
    { id: 1, title: "Global AI Hackathon 2026", organizer: "Tech Nexus Foundation", status: "Published", date: "Oct 15, 2026", registrations: 1250, featured: true },
    { id: 2, title: "Design Thinking Masterclass", organizer: "Sponsora Admin", status: "Published", date: "Nov 10, 2026", registrations: 450, featured: false },
    { id: 3, title: "Web3 Developers Summit", organizer: "Crypto India", status: "Draft", date: "Dec 05, 2026", registrations: 0, featured: false },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Events</h1>
          <p className="text-foreground/70 mt-1">Manage all events across the platform.</p>
        </div>
        <Link href="/events/create" className="bg-primary text-white px-4 py-2 rounded-xl font-medium shadow-sm hover:bg-primary-dark transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Event
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search events..." 
              className="w-full bg-gray-50 dark:bg-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-gray-500 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-sm font-medium">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-slate-800/50 text-foreground/60">
              <tr>
                <th className="px-6 py-3 font-medium">Event Name</th>
                <th className="px-6 py-3 font-medium">Organizer</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Registrations</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{event.title}</span>
                      {event.featured && <span className="bg-accent/10 text-accent text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Featured</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground/70">{event.organizer}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      event.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-gray-300'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-foreground/70">{event.date}</td>
                  <td className="px-6 py-4 font-medium">{event.registrations.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 text-foreground/50">
                      <button className="p-1.5 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Edit className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-sm text-foreground/60">
          <span>Showing 1 to 3 of 84 events</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 rounded-md bg-primary text-white">1</button>
            <button className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800">2</button>
            <button className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
