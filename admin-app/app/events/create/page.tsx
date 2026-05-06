import { ArrowLeft, Upload, Calendar, Clock, MapPin, DollarSign, Users } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Create Event | AdminOS",
};

export default function AdminCreateEventPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <Link href="/events" className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground/70" />
        </Link>
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Create New Event</h1>
          <p className="text-foreground/70 text-sm mt-1">Publish a new event to the platform.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 sm:p-8">
        <form className="space-y-8">
          
          {/* Banner Upload */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Event Banner</label>
            <div className="w-full h-48 sm:h-64 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-800/50 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5 text-primary" />
              </div>
              <p className="font-medium text-foreground">Click to upload banner</p>
              <p className="text-sm text-foreground/50 mt-1">PNG, JPG or WEBP (Max 5MB)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg font-bold font-heading border-b border-gray-100 dark:border-gray-800 pb-2">Basic Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Event Title *</label>
                <input type="text" placeholder="e.g., Global AI Hackathon 2026" className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary/50 outline-none" required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1">Category *</label>
                  <select className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary/50 outline-none" required>
                    <option value="">Select Category</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="cultural">Cultural Fest</option>
                    <option value="workshop">Workshop</option>
                    <option value="sports">Sports Event</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1">Organizer (Optional)</label>
                  <select className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary/50 outline-none">
                    <option value="admin">Admin (Self)</option>
                    <option value="org_1">Tech Nexus Foundation</option>
                  </select>
                  <p className="text-xs text-foreground/50 mt-1">Assign this event to an approved organizer.</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Description *</label>
                <textarea rows={5} placeholder="Provide details about the event..." className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary/50 outline-none resize-none" required></textarea>
              </div>
            </div>

            {/* Date & Time */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-heading border-b border-gray-100 dark:border-gray-800 pb-2 flex items-center gap-2"><Calendar className="w-5 h-5 text-blue-500" /> Date & Time</h3>
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Start Date & Time *</label>
                <input type="datetime-local" className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary/50 outline-none" required />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">End Date & Time *</label>
                <input type="datetime-local" className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary/50 outline-none" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Registration Deadline *</label>
                <input type="datetime-local" className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary/50 outline-none" required />
              </div>
            </div>

            {/* Location & Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-heading border-b border-gray-100 dark:border-gray-800 pb-2 flex items-center gap-2"><MapPin className="w-5 h-5 text-orange-500" /> Location & Specs</h3>
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Venue Type *</label>
                <select className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary/50 outline-none" required>
                  <option value="online">Online / Virtual</option>
                  <option value="physical">Physical Venue</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Venue Address / Link *</label>
                <input type="text" placeholder="Zoom link or Physical Address" className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary/50 outline-none" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1 flex items-center gap-1"><Users className="w-3 h-3" /> Team Size</label>
                  <input type="text" placeholder="e.g., 1-4 Members" className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary/50 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1 flex items-center gap-1"><DollarSign className="w-3 h-3" /> Entry Fee</label>
                  <input type="text" placeholder="0 for Free" className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary/50 outline-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800 pt-6 flex justify-end gap-4">
            <button type="button" className="px-6 py-2.5 rounded-xl font-medium text-foreground/70 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
              Save as Draft
            </button>
            <button type="button" className="bg-primary text-white px-8 py-2.5 rounded-xl font-medium shadow-sm hover:bg-primary-dark transition-all">
              Publish Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
