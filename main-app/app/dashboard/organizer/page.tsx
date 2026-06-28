import React from 'react';
import Link from 'next/link';
import { Settings, Calendar, PlusCircle, ExternalLink, CalendarDays, MapPin } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function OrganizerDashboard() {
  const { userId } = await auth();
  
  // Fetch organizer's events
  let events: any[] = [];
  if (userId) {
    const { data } = await supabase
      .from('sponsora_posts')
      .select('*, sponsora_categories(name)')
      .contains('metadata', { organizer_id: userId })
      .or('is_deleted.is.null,is_deleted.eq.false')
      .order('created_at', { ascending: false });
    
    if (data) events = data;
  }

  const activeEventsCount = events.length;
  const pendingEventsCount = events.filter(e => e.metadata?.status === 'pending').length;

  if (activeEventsCount === 0) {
    redirect('/dashboard/organizer/create');
  }

  return (
    <div className="min-h-screen pt-24 px-6 md:px-12 max-w-[1400px] mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Organizer Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Manage your events and track sponsorships.</p>
        </div>
        <Link href="/dashboard/organizer/create" className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-2xl font-bold shadow-md transition-all hover:scale-105 active:scale-95">
          <PlusCircle size={20} /> Ask for Sponsorship
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-[#1A1A1D] p-6 rounded-3xl shadow-sm border border-black/5 dark:border-white/10 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">Total Events</p>
            <h3 className="text-4xl font-black text-foreground">{activeEventsCount}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <Calendar size={28} />
          </div>
        </div>
        
        <div className="bg-white dark:bg-[#1A1A1D] p-6 rounded-3xl shadow-sm border border-black/5 dark:border-white/10 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">Pending Review</p>
            <h3 className="text-4xl font-black text-foreground">{pendingEventsCount}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
            <Settings size={28} />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Your Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event.id} className="group flex flex-col bg-white dark:bg-[#1A1A1D] border border-black/5 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="h-48 relative overflow-hidden bg-black/5 dark:bg-white/5">
                 <img src={event.image_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute top-4 left-4">
                   <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm backdrop-blur-md ${event.metadata?.status === 'pending' ? 'bg-orange-500/90 text-white' : 'bg-green-500/90 text-white'}`}>
                     {event.metadata?.status === 'pending' ? 'Pending Review' : 'Active'}
                   </span>
                 </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">{event.sponsora_categories?.name}</div>
                <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">{event.title}</h3>
                <div className="flex items-center gap-4 text-sm text-foreground/60 mb-6">
                   {event.date_info && <span className="flex items-center gap-1"><Calendar size={14} /> {event.date_info}</span>}
                   {event.metadata?.venue_type && <span className="flex items-center gap-1 capitalize"><MapPin size={14} /> {event.metadata.venue_type.replace('_', ' ')}</span>}
                </div>
                
                <div className="mt-auto pt-4 border-t border-black/5 dark:border-white/10 flex gap-3">
                   <Link href={`/events/category/${event.sponsora_categories?.slug || 'unknown'}/${event.id}`} className="flex-1 text-center py-2.5 rounded-xl bg-black/5 dark:bg-white/5 font-bold text-sm hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                     View Listing
                   </Link>
                   {event.metadata?.pitch_deck_pdf && (
                     <Link href={event.metadata.pitch_deck_pdf} target="_blank" className="flex items-center justify-center w-10 rounded-xl bg-accent/10 text-accent hover:bg-accent/20 transition-colors">
                       <ExternalLink size={18} />
                     </Link>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
