import { User, Globe, Trophy, ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Public Profile | Sponsora",
};

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-foreground/70 mt-1">Manage your public profile and portfolio.</p>
        </div>
        <button className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 text-foreground px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-2">
          <ExternalLink className="w-4 h-4" /> View Public Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Edit */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
            <h2 className="font-heading text-xl font-bold mb-6">Basic Information</h2>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 relative group cursor-pointer overflow-hidden border-2 border-primary/20">
                <User className="w-10 h-10" />
                <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white text-xs font-medium backdrop-blur-sm">
                  Change
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1">First Name</label>
                    <input type="text" defaultValue="John" className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary/50 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1">Last Name</label>
                    <input type="text" defaultValue="Doe" className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary/50 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1">Bio</label>
                  <textarea rows={3} defaultValue="Full-stack developer passionate about building cool things. Looking for teammates for upcoming hackathons!" className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary/50 outline-none resize-none"></textarea>
                </div>
              </div>
            </div>
            
            <h2 className="font-heading text-xl font-bold mb-6 border-t border-gray-100 dark:border-gray-800 pt-6">Social Links</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-foreground/60 shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <input type="url" placeholder="https://social.com/username" className="flex-1 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-foreground focus:ring-2 focus:ring-primary/50 outline-none" />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-medium shadow-sm hover:bg-primary-dark transition-all">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Public Preview Summary */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-primary/10 p-6">
            <h3 className="font-heading font-bold mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent" /> Public Portfolio Status
            </h3>
            <p className="text-sm text-foreground/70 mb-4">Your public profile is currently visible to organizers and other participants.</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-foreground/60">Badges Displayed</span>
                <span className="font-medium">4</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-foreground/60">Past Events Shown</span>
                <span className="font-medium">12</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">JD</div>
                <div>
                  <p className="text-sm font-bold leading-none">John Doe</p>
                  <p className="text-xs text-foreground/60 mt-1">@johndoe</p>
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                <div className="w-6 h-6 rounded bg-yellow-100 flex items-center justify-center" title="Hackathon Winner"><Trophy className="w-3 h-3 text-yellow-600" /></div>
                <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center" title="Top Contributor"><Trophy className="w-3 h-3 text-blue-600" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
