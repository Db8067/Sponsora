"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Calendar, Image as ImageIcon, MapPin, Tag, Video, Ticket, Link as LinkIcon, Upload, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";

const categories = [
  { id: 'tech', name: 'Tech Events', desc: 'Hackathons & coding competitions', icon: '💻', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  { id: 'cultural', name: 'Cultural Fests', desc: 'Music, dance & art events', icon: '🎭', color: 'bg-pink-500/10 text-pink-500 border-pink-500/20' },
  { id: 'workshops', name: 'Workshops', desc: 'Hands-on learning sessions', icon: '🛠️', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
  { id: 'seminars', name: 'Seminars', desc: 'Expert talks & conferences', icon: '🎤', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
  { id: 'past', name: 'Past Events', desc: 'Archived and concluded events', icon: '⏳', color: 'bg-gray-500/10 text-gray-500 border-gray-500/20' },
];

export default function CreateEventWorkflow({ formData, setFormData, onSuccess }: any) {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateForm = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep((p) => Math.min(p + 1, 4));
  const prevStep = () => setStep((p) => Math.max(p - 1, 0));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulating API call for now, since we need to fetch the category ID first
    // In real implementation:
    // 1. Fetch category ID using formData.category_slug
    // 2. Insert into supabase
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 1500);
  };

  const renderStepContent = () => {
    switch (step) {
      case 0: // Category Selection
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  updateForm("category_slug", cat.id);
                  nextStep();
                }}
                className={`p-6 rounded-2xl border text-left transition-all ${
                  formData.category_slug === cat.id 
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                    : "border-black/5 dark:border-white/10 bg-background hover:border-primary/30"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${cat.color} border`}>
                  {cat.icon}
                </div>
                <h3 className="font-bold text-lg text-foreground mb-1">{cat.name}</h3>
                <p className="text-sm text-foreground/60">{cat.desc}</p>
              </button>
            ))}
          </div>
        );
      
      case 1: // Basic Info
        return (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1.5">Event Title *</label>
              <input 
                type="text" 
                value={formData.title} 
                onChange={(e) => updateForm("title", e.target.value)}
                className="w-full bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/50 outline-none"
                placeholder="E.g. Global AI Hackathon 2026"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1.5">Short Summary *</label>
              <textarea 
                value={formData.short_summary} 
                onChange={(e) => updateForm("short_summary", e.target.value)}
                rows={2}
                className="w-full bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/50 outline-none resize-none"
                placeholder="A brief 1-2 sentence overview of the event"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1.5">Full Description (HTML Supported) *</label>
              <textarea 
                value={formData.description} 
                onChange={(e) => updateForm("description", e.target.value)}
                rows={5}
                className="w-full bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/50 outline-none"
                placeholder="Detailed description, schedule, speakers, etc."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">Start Date & Time *</label>
                <input 
                  type="datetime-local" 
                  value={formData.start_at} 
                  onChange={(e) => updateForm("start_at", e.target.value)}
                  className="w-full bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/50 outline-none [color-scheme:light] dark:[color-scheme:dark]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">Registration Deadline</label>
                <input 
                  type="datetime-local" 
                  value={formData.registration_deadline} 
                  onChange={(e) => updateForm("registration_deadline", e.target.value)}
                  className="w-full bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/50 outline-none [color-scheme:light] dark:[color-scheme:dark]"
                />
              </div>
            </div>
          </div>
        );

      case 2: // Venue
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-3">Venue Type *</label>
              <div className="flex gap-4">
                {['in_person', 'online', 'hybrid'].map((type) => (
                  <label key={type} className={`flex-1 flex flex-col items-center justify-center py-4 border rounded-xl cursor-pointer transition-all ${formData.venue_type === type ? 'border-primary bg-primary/5 text-primary' : 'border-black/10 dark:border-white/10 text-foreground/60 hover:border-primary/30'}`}>
                    <input type="radio" name="venue_type" value={type} checked={formData.venue_type === type} onChange={() => updateForm("venue_type", type)} className="sr-only" />
                    {type === 'in_person' && <MapPin className="w-6 h-6 mb-2" />}
                    {type === 'online' && <Video className="w-6 h-6 mb-2" />}
                    {type === 'hybrid' && <Users className="w-6 h-6 mb-2" />}
                    <span className="font-medium capitalize">{type.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            {(formData.venue_type === 'in_person' || formData.venue_type === 'hybrid') && (
              <div className="space-y-4 p-5 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/10">
                <h4 className="font-semibold flex items-center gap-2"><MapPin className="w-4 h-4 text-orange-500" /> Physical Location</h4>
                <div>
                  <label className="block text-sm text-foreground/70 mb-1.5">Search Address (Powered by OpenStreetMap)</label>
                  <input 
                    type="text" 
                    value={formData.venue_address} 
                    onChange={(e) => updateForm("venue_address", e.target.value)}
                    className="w-full bg-background border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary/50 outline-none"
                    placeholder="Start typing an address..."
                  />
                  <p className="text-xs text-foreground/50 mt-2">In production, this will show an interactive dropdown list of addresses.</p>
                </div>
              </div>
            )}

            {(formData.venue_type === 'online' || formData.venue_type === 'hybrid') && (
              <div className="space-y-4 p-5 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/10">
                <h4 className="font-semibold flex items-center gap-2"><Video className="w-4 h-4 text-blue-500" /> Virtual Platform</h4>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  {['Zoom', 'Google Meet', 'Microsoft Teams', 'Custom'].map((plat) => (
                    <button key={plat} type="button" className="px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-background text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                      {plat}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-sm text-foreground/70 mb-1.5">Meeting Link</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                    <input 
                      type="url" 
                      value={formData.venue_link} 
                      onChange={(e) => updateForm("venue_link", e.target.value)}
                      className="w-full bg-background border border-black/10 dark:border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary/50 outline-none"
                      placeholder="https://zoom.us/j/123456789"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 3: // Media
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Event Banner *</label>
              <div className="border-2 border-dashed border-black/20 dark:border-white/20 rounded-2xl p-8 text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-8 h-8 text-primary" />
                </div>
                <p className="font-medium text-foreground mb-1">Click to upload banner image</p>
                <p className="text-xs text-foreground/50">PNG, JPG or WEBP (Max 5MB)</p>
                <input 
                  type="text" 
                  value={formData.banner_url}
                  onChange={(e) => updateForm("banner_url", e.target.value)}
                  className="mt-4 w-full bg-background border border-black/10 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-foreground"
                  placeholder="Or paste Cloudinary URL for preview"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Gallery Images (Max 10)</label>
              <div className="border-2 border-dashed border-black/20 dark:border-white/20 rounded-2xl p-6 text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                <Upload className="w-6 h-6 text-foreground/40 mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Upload additional photos</p>
              </div>
            </div>
          </div>
        );

      case 4: // Ticketing & Details
        return (
          <div className="space-y-6">
            <div className="p-5 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Ticketing & Pricing</h4>
                  <p className="text-sm text-foreground/60">Is this a paid event?</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={formData.is_paid} onChange={(e) => updateForm("is_paid", e.target.checked)} />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:bg-gray-700 peer-checked:bg-primary"></div>
                </label>
              </div>

              {formData.is_paid && (
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1.5">Entry Fee (INR)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 font-medium">₹</span>
                    <input 
                      type="number" 
                      value={formData.entry_fee} 
                      onChange={(e) => updateForm("entry_fee", parseFloat(e.target.value))}
                      className="w-full bg-background border border-black/10 dark:border-white/10 rounded-xl pl-8 pr-4 py-2.5 text-foreground focus:ring-2 focus:ring-primary/50 outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">Prize Pool</label>
                <input 
                  type="text" 
                  value={formData.prize_pool} 
                  onChange={(e) => updateForm("prize_pool", e.target.value)}
                  className="w-full bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/50 outline-none"
                  placeholder="e.g. ₹50,000 + Swag"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">Team Size (Max)</label>
                <input 
                  type="number" 
                  value={formData.max_team} 
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    updateForm("max_team", val);
                    updateForm("team_allowed", val > 1);
                  }}
                  min="1"
                  className="w-full bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/50 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1.5">External Registration Link (CTA)</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <input 
                  type="url" 
                  value={formData.registration_link} 
                  onChange={(e) => updateForm("registration_link", e.target.value)}
                  className="w-full bg-white/5 border border-black/10 dark:border-white/10 rounded-xl pl-9 pr-4 py-3 text-foreground focus:ring-2 focus:ring-primary/50 outline-none"
                  placeholder="Link to external registration (e.g., Google Form, Luma)"
                />
              </div>
              <p className="text-xs text-foreground/50 mt-1.5">Users will be redirected here when they click "Register Now".</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-accent/5 rounded-xl border border-accent/20">
              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5 text-accent" />
                <div>
                  <h4 className="font-semibold text-accent">Feature this event</h4>
                  <p className="text-xs text-accent/80">Featured events appear prominently on the homepage.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={formData.is_featured} onChange={(e) => updateForm("is_featured", e.target.checked)} />
                <div className="w-11 h-6 bg-accent/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1.5">Publish Status</label>
              <select 
                value={formData.status}
                onChange={(e) => updateForm("status", e.target.value)}
                className="w-full bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/50 outline-none appearance-none"
              >
                <option value="draft" className="bg-background text-foreground">Draft (Hidden)</option>
                <option value="published" className="bg-background text-foreground">Published (Public)</option>
              </select>
            </div>
          </div>
        );
    }
  };

  const steps = ["Category", "Basic Info", "Venue", "Media", "Details"];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-bold text-foreground">
          {step === 0 ? "What kind of event are you creating?" : "Create New Event"}
        </h2>
        <p className="text-foreground/60 mt-1">
          {step === 0 ? "Select a category to get started." : "Fill out the details below. The preview will update automatically."}
        </p>
      </div>

      {/* Progress Bar (Hide on step 0) */}
      {step > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {steps.map((s, i) => {
              if (i === 0) return null; // Skip category in progress bar
              return (
                <div key={s} className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 transition-colors ${step === i ? 'bg-primary text-white ring-4 ring-primary/20' : step > i ? 'bg-primary/20 text-primary' : 'bg-black/5 dark:bg-white/10 text-foreground/40'}`}>
                    {step > i ? '✓' : i}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${step >= i ? 'text-foreground' : 'text-foreground/40'}`}>{s}</span>
                </div>
              );
            })}
          </div>
          <div className="h-2 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden ml-[12.5%] mr-[12.5%]">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out" 
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Form Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      {step > 0 && (
        <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
          <button 
            onClick={prevStep}
            className="px-5 py-2.5 rounded-xl font-medium text-foreground/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          
          {step < 4 ? (
            <button 
              onClick={nextStep}
              className="bg-foreground text-background hover:bg-foreground/90 px-6 py-2.5 rounded-xl font-medium transition-all shadow-md flex items-center gap-2"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-primary text-white hover:bg-primary/90 px-8 py-2.5 rounded-xl font-medium transition-all shadow-md flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Publishing...
                </>
              ) : (
                <>Publish Event <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
