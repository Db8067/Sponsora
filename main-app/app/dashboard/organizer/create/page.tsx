"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useUser } from '@clerk/nextjs';
import { Upload, X, Loader2, ArrowLeft, Image as ImageIcon, FileText } from 'lucide-react';
import Link from 'next/link';

export default function CreateEventPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [dateInfo, setDateInfo] = useState('');
  const [venueType, setVenueType] = useState('online');
  const [venueAddress, setVenueAddress] = useState('');
  const [prizePool, setPrizePool] = useState('');
  const [teamAllowed, setTeamAllowed] = useState(false);
  const [minTeam, setMinTeam] = useState('1');
  const [maxTeam, setMaxTeam] = useState('4');
  
  // Files
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase
        .from('sponsora_categories')
        .select('*')
        .eq('type', 'event')
        .or('is_deleted.is.null,is_deleted.eq.false')
        .order('sort_order', { ascending: true });
      if (data) setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleFileUpload = async (file: File, folder: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Upload failed');
    }
    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !user) return;
    if (!title || !categoryId || !posterFile) {
      setError('Title, Category, and Poster Image are required.');
      window.scrollTo(0, 0);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Upload Poster
      const posterUrl = await handleFileUpload(posterFile, 'sponsora_posters');
      
      // 2. Upload PDF (if any)
      let pdfUrl = null;
      if (pdfFile) {
        pdfUrl = await handleFileUpload(pdfFile, 'sponsora_pitch_decks');
      }

      // 3. Generate Slug
      const generatedSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.random().toString(36).substring(2, 6);

      // 4. Save to Database
      const payload = {
        category_id: categoryId,
        title: title.trim(),
        description: description.trim() || null,
        image_url: posterUrl,
        slug: generatedSlug,
        date_info: dateInfo.trim() || null,
        metadata: {
          organizer_id: user.id,
          venue_type: venueType,
          venue_address: venueAddress.trim() || null,
          prize_pool: prizePool.trim() || null,
          team_allowed: teamAllowed,
          min_team: teamAllowed ? parseInt(minTeam, 10) : 1,
          max_team: teamAllowed ? parseInt(maxTeam, 10) : 1,
          pitch_deck_pdf: pdfUrl,
          status: 'pending' // For admin review if needed
        }
      };

      const { error: dbError } = await supabase.from('sponsora_posts').insert([payload]);
      
      if (dbError) throw new Error(dbError.message);

      // Success, redirect to dashboard
      router.push('/dashboard/organizer');
      
    } catch (err: any) {
      setError(err.message || 'Something went wrong while submitting.');
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link href="/dashboard/organizer" className="inline-flex items-center text-sm font-medium text-foreground/50 hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-2">
          Ask for Sponsorship
        </h1>
        <p className="text-foreground/60 text-lg">
          Submit your event details and pitch deck to start finding sponsors.
        </p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 rounded-2xl text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Basic Info */}
        <div className="bg-white dark:bg-[#1A1A1D] p-6 md:p-8 rounded-[2rem] border border-black/5 dark:border-white/10 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-foreground">1. Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Event Title *</label>
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g., TechNova 2026"
                className="w-full bg-black/5 dark:bg-white/5 border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-foreground transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Category *</label>
              <select 
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                className="w-full bg-black/5 dark:bg-white/5 border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-foreground transition-colors"
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Event Description</label>
            <textarea 
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Tell sponsors what makes your event special..."
              rows={5}
              className="w-full bg-black/5 dark:bg-white/5 border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-foreground transition-colors resize-none"
            />
          </div>
        </div>

        {/* Section 2: Event Details */}
        <div className="bg-white dark:bg-[#1A1A1D] p-6 md:p-8 rounded-[2rem] border border-black/5 dark:border-white/10 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-foreground">2. Event Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Dates / Timeline</label>
              <input 
                type="text" 
                value={dateInfo}
                onChange={e => setDateInfo(e.target.value)}
                placeholder="e.g., Oct 24 - Oct 26"
                className="w-full bg-black/5 dark:bg-white/5 border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-foreground transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Prize Pool</label>
              <input 
                type="text" 
                value={prizePool}
                onChange={e => setPrizePool(e.target.value)}
                placeholder="e.g., $10,000 or ₹1,00,000"
                className="w-full bg-black/5 dark:bg-white/5 border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-foreground transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Venue Type</label>
              <select 
                value={venueType}
                onChange={e => setVenueType(e.target.value)}
                className="w-full bg-black/5 dark:bg-white/5 border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-foreground transition-colors"
              >
                <option value="online">Online / Virtual</option>
                <option value="in_person">In Person</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            {venueType !== 'online' && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Venue Address</label>
                <input 
                  type="text" 
                  value={venueAddress}
                  onChange={e => setVenueAddress(e.target.value)}
                  placeholder="e.g., MIT Campus, Boston"
                  className="w-full bg-black/5 dark:bg-white/5 border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-foreground transition-colors"
                />
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              id="teamAllowed"
              checked={teamAllowed}
              onChange={(e) => setTeamAllowed(e.target.checked)}
              className="w-5 h-5 rounded border-black/10 text-primary focus:ring-primary"
            />
            <label htmlFor="teamAllowed" className="text-sm font-bold text-foreground cursor-pointer">Allow Team Participation?</label>
          </div>

          {teamAllowed && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/70 uppercase">Min Team</label>
                  <input 
                    type="number" 
                    value={minTeam}
                    onChange={e => setMinTeam(e.target.value)}
                    min="1"
                    className="w-full bg-white dark:bg-[#1A1A1D] border border-transparent rounded-lg px-3 py-2 focus:outline-none focus:border-primary text-foreground text-sm"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/70 uppercase">Max Team</label>
                  <input 
                    type="number" 
                    value={maxTeam}
                    onChange={e => setMaxTeam(e.target.value)}
                    min="1"
                    className="w-full bg-white dark:bg-[#1A1A1D] border border-transparent rounded-lg px-3 py-2 focus:outline-none focus:border-primary text-foreground text-sm"
                  />
               </div>
            </div>
          )}
        </div>

        {/* Section 3: Media */}
        <div className="bg-white dark:bg-[#1A1A1D] p-6 md:p-8 rounded-[2rem] border border-black/5 dark:border-white/10 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-foreground">3. Upload Media</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Poster Upload */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground">Event Poster (Image) *</label>
              <div className="relative border-2 border-dashed border-black/10 dark:border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setPosterFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  required
                />
                {posterFile ? (
                  <>
                    <ImageIcon className="w-10 h-10 text-primary mb-3" />
                    <p className="text-sm font-bold text-foreground">{posterFile.name}</p>
                    <p className="text-xs text-foreground/50 mt-1">Click to replace</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-foreground/30 group-hover:text-primary transition-colors mb-3" />
                    <p className="text-sm font-bold text-foreground">Drop poster here or click to browse</p>
                    <p className="text-xs text-foreground/50 mt-1">Recommended: 16:9 or 1:1 ratio</p>
                  </>
                )}
              </div>
            </div>

            {/* PDF Upload */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground flex items-center justify-between">
                <span>Pitch Deck (PDF)</span>
                <span className="text-xs font-medium text-foreground/40 font-normal">Optional but highly recommended</span>
              </label>
              <div className="relative border-2 border-dashed border-black/10 dark:border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                <input 
                  type="file" 
                  accept=".pdf"
                  onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                {pdfFile ? (
                  <>
                    <FileText className="w-10 h-10 text-accent mb-3" />
                    <p className="text-sm font-bold text-foreground">{pdfFile.name}</p>
                    <p className="text-xs text-foreground/50 mt-1">Click to replace</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-foreground/30 group-hover:text-accent transition-colors mb-3" />
                    <p className="text-sm font-bold text-foreground">Drop PDF here or click to browse</p>
                    <p className="text-xs text-foreground/50 mt-1">Max size: 10MB</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4 pb-20">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full md:w-auto bg-primary text-primary-foreground py-4 px-10 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/25 flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" /> Uploading Event...
              </>
            ) : (
              'Submit Event for Sponsorship'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
