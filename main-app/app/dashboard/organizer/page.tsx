import React from 'react';
import Link from 'next/link';
import { Settings, Calendar, PlusCircle } from 'lucide-react';

export default function OrganizerDashboard() {
  return (
    <div className="min-h-screen pt-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Organizer Dashboard</h1>
          <p className="text-gray-500 font-medium">Manage your events and track sponsorships.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-md transition-all">
          <PlusCircle size={18} /> Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Active Events</p>
            <h3 className="text-3xl font-black text-gray-900">0</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Calendar size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Total Sponsors</p>
            <h3 className="text-3xl font-black text-gray-900">0</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
            <Settings size={24} />
          </div>
        </div>
      </div>

      <div className="mt-12 bg-gray-50 rounded-3xl border border-gray-100 p-12 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">No events yet!</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">You haven't created any events. Start hosting amazing events and find sponsors today.</p>
      </div>
    </div>
  );
}
