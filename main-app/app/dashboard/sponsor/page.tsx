import React from 'react';
import Link from 'next/link';
import { Search, Briefcase, Star } from 'lucide-react';

export default function SponsorDashboard() {
  return (
    <div className="min-h-screen pt-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Sponsor Dashboard</h1>
          <p className="text-gray-500 font-medium">Find events to sponsor and manage your partnerships.</p>
        </div>
        <Link href="/search-sponsors">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-md transition-all">
            <Search size={18} /> Find Events
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Active Sponsorships</p>
            <h3 className="text-3xl font-black text-gray-900">0</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Briefcase size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Saved Events</p>
            <h3 className="text-3xl font-black text-gray-900">0</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center">
            <Star size={24} />
          </div>
        </div>
      </div>

      <div className="mt-12 bg-gray-50 rounded-3xl border border-gray-100 p-12 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">No partnerships yet!</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">You haven't sponsored any events yet. Start searching the catalog to find the perfect match.</p>
      </div>
    </div>
  );
}
