"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useUser } from '@clerk/nextjs';
import { Upload, X, Loader2, ArrowLeft, Image as ImageIcon, FileText, CheckCircle2 } from 'lucide-react';
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
  const [customCategoryName, setCustomCategoryName] = useState('');
  const [applyLink, setApplyLink] = useState('');
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

  // Auto-save: Load Draft
  useEffect(() => {
    const draft = localStorage.getItem('sponsora_organizer_form_draft');
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        if (parsed.title) setTitle(parsed.title);
        if (parsed.description) setDescription(parsed.description);
        if (parsed.categoryId) setCategoryId(parsed.categoryId);
        if (parsed.customCategoryName) setCustomCategoryName(parsed.customCategoryName);
        if (parsed.applyLink) setApplyLink(parsed.applyLink);
        if (parsed.dateInfo) setDateInfo(parsed.dateInfo);
        if (parsed.venueType) setVenueType(parsed.venueType);
        if (parsed.venueAddress) setVenueAddress(parsed.venueAddress);
        if (parsed.prizePool) setPrizePool(parsed.prizePool);
        if (parsed.teamAllowed !== undefined) setTeamAllowed(parsed.teamAllowed);
        if (parsed.minTeam) setMinTeam(parsed.minTeam);
        if (parsed.maxTeam) setMaxTeam(parsed.maxTeam);
      } catch (e) {
        console.error("Failed to parse form draft", e);
      }
    }
  }, []);

  // Auto-save: Save Draft
  useEffect(() => {
    const timer = setTimeout(() => {
      const draft = {
        title, description, categoryId, customCategoryName, applyLink,
        dateInfo, venueType, venueAddress, prizePool, teamAllowed, minTeam, maxTeam
      };
      localStorage.setItem('sponsora_organizer_form_draft', JSON.stringify(draft));
    }, 1000);
    return () => clearTimeout(timer);
  }, [title, description, categoryId, customCategoryName, applyLink, dateInfo, venueType, venueAddress, prizePool, teamAllowed, minTeam, maxTeam]);

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
    
    if (!title) {
      setError('Event Title is required.');
      window.scrollTo(0, 0);
      return;
    }
    
    if (!categoryId && !customCategoryName) {
      setError('Please select or enter a Category.');
      window.scrollTo(0, 0);
      return;
    }

    setLoading(true);
    setError('');

    try {
      let finalCategoryId = categoryId;
      
      // Handle Custom Category
      if (categoryId === 'custom' && customCategoryName) {
        const customSlug = customCategoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const { data: existing } = await supabase.from('sponsora_categories').select('id').eq('slug', customSlug).single();
        
        if (existing) {
          finalCategoryId = existing.id;
        } else {
          const { data: newCat, error: catErr } = await supabase.from('sponsora_categories').insert([{
            name: customCategoryName.trim(),
            slug: customSlug,
            type: 'event',
            sort_order: 99
          }]).select().single();
          
          if (catErr) throw new Error("Failed to create category: " + catErr.message);
          finalCategoryId = newCat.id;
        }
      }

      // 1. Upload Poster (Optional now)
      let posterUrl = null;
      if (posterFile) {
        posterUrl = await handleFileUpload(posterFile, 'sponsora_posters');
      }
      
      // 2. Upload PDF (if any)
      let pdfUrl = null;
      if (pdfFile) {
        pdfUrl = await handleFileUpload(pdfFile, 'sponsora_pitch_decks');
      }

      // 3. Generate Slug
      const generatedSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.random().toString(36).substring(2, 6);

      // 4. Save to Database
      const payload = {
        category_id: finalCategoryId,
        title: title.trim(),
        description: description.trim() || null,
        image_url: posterUrl,
        apply_link: applyLink.trim() || null,
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

      // Success, clear draft and redirect to dashboard
      localStorage.removeItem('sponsora_organizer_form_draft');
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
                required={categoryId !== 'custom'}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
                <option value="custom">Other (Create New)</option>
              </select>
              {categoryId === 'custom' && (
                <input 
                  type="text" 
                  value={customCategoryName}
                  onChange={e => setCustomCategoryName(e.target.value)}
                  placeholder="Enter new category name..."
                  className="w-full mt-2 bg-black/5 dark:bg-white/5 border border-primary/30 rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-foreground transition-colors animate-in fade-in slide-in-from-top-2"
                  required
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Event Link (External Link)</label>
            <input 
              type="url" 
              value={applyLink}
              onChange={e => setApplyLink(e.target.value)}
              placeholder="e.g., https://lu.ma/event-page or unstop.com/..."
              className="w-full bg-black/5 dark:bg-white/5 border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-foreground transition-colors"
            />
            <p className="text-xs text-foreground/50">Link to Unstop, Luma, or your event portal where users can register.</p>
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
              <label className="text-sm font-bold text-foreground flex items-center justify-between">
                <span>Event Poster (Image)</span>
                <span className="text-xs font-medium text-foreground/40 font-normal">Optional</span>
              </label>
              
              {posterFile && (
                <div className="mb-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 text-green-700 dark:text-green-400 rounded-xl text-sm font-bold flex items-center gap-2 animate-in fade-in zoom-in-95">
                  <CheckCircle2 className="w-5 h-5" />
                  Image uploaded successfully!
                </div>
              )}
              
              <div className={`relative border-2 ${posterFile ? 'border-green-500/50 bg-green-500/5' : 'border-dashed border-black/10 dark:border-white/10'} rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer group overflow-hidden`}>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setPosterFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
                />
                
                {posterFile ? (
                  <div className="absolute inset-0 w-full h-full z-10 p-2">
                    <img 
                      src={URL.createObjectURL(posterFile)} 
                      alt="Preview" 
                      className="w-full h-full object-contain rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl m-2">
                      <p className="text-white text-sm font-bold">Click to replace image</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-foreground/30 group-hover:text-primary transition-colors mb-3 relative z-10" />
                    <p className="text-sm font-bold text-foreground relative z-10">Drop poster here or click to browse</p>
                    <p className="text-xs text-foreground/50 mt-1 relative z-10">Recommended: 16:9 or 1:1 ratio</p>
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

              {pdfFile && (
                <div className="mb-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 text-green-700 dark:text-green-400 rounded-xl text-sm font-bold flex items-center gap-2 animate-in fade-in zoom-in-95">
                  <CheckCircle2 className="w-5 h-5" />
                  PDF uploaded successfully!
                </div>
              )}

              <div className={`relative border-2 ${pdfFile ? 'border-green-500/50 bg-green-500/5' : 'border-dashed border-black/10 dark:border-white/10'} rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group overflow-hidden`}>
                <input 
                  type="file" 
                  accept=".pdf"
                  onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
                />
                
                {pdfFile ? (
                  <div className="absolute inset-0 w-full h-full z-10 p-2">
                    <iframe 
                      src={`${URL.createObjectURL(pdfFile)}#toolbar=0&navpanes=0&scrollbar=0`} 
                      className="w-full h-full rounded-xl pointer-events-none" 
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center rounded-xl m-2">
                      <FileText className="w-10 h-10 text-white mb-2" />
                      <p className="text-white text-sm font-bold truncate max-w-[80%]">{pdfFile.name}</p>
                      <p className="text-white/80 text-xs mt-1">Click to replace</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-foreground/30 group-hover:text-accent transition-colors mb-3 relative z-10" />
                    <p className="text-sm font-bold text-foreground relative z-10">Drop PDF here or click to browse</p>
                    <p className="text-xs text-foreground/50 mt-1 relative z-10">Max size: 10MB</p>
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
