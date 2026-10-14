'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Snowfall from '@/components/Snowfall';
import SellerNavbar from '@/components/SellerNavbar';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Sparkles,
  BookOpen,
  Video,
  Loader2,
} from 'lucide-react';

const TIME_SLOTS = [
  '10am–12pm',
  '12pm–2pm',
  '2pm–4pm',
  '4pm–6pm',
  '6pm–8pm',
  '8pm–10pm',
];

const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export default function ClientScheduleMentorshipPage() {
  const router = useRouter();

  // Client Session Details
  const [username, setUsername] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  // Booking Form Fields
  const [sessionDate, setSessionDate] = useState('');
  const [sessionDay, setSessionDay] = useState('');
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successData, setSuccessData] = useState<any | null>(null);

  // Auto-fill from cookie session if present
  useEffect(() => {
    try {
      const match = document.cookie.match(/client_session=([^;]+)/);
      if (match) {
        const decoded = JSON.parse(decodeURIComponent(match[1]));
        if (decoded?.username) setUsername(decoded.username);
        if (decoded?.client_name) setClientName(decoded.client_name);
        if (decoded?.email) setClientEmail(decoded.email);
        if (decoded?.phone) setClientPhone(decoded.phone);
      }
    } catch {
      /* ignore */
    }

    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setSessionDate(dateStr);
    setSessionDay(DAYS_OF_WEEK[tomorrow.getDay()]);
  }, []);

  // Auto compute day when date changes
  const handleDateChange = (dateVal: string) => {
    setSessionDate(dateVal);
    if (!dateVal) {
      setSessionDay('');
      return;
    }
    // Parse date parts to prevent timezone offsets
    const [year, month, day] = dateVal.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    const dayName = DAYS_OF_WEEK[d.getDay()];
    setSessionDay(dayName || '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim()) {
      setErrorMsg('Please enter your Client Username (or log in from /client-dashboard).');
      return;
    }
    if (!sessionDate) {
      setErrorMsg('Please select a session date.');
      return;
    }
    if (!timeSlot) {
      setErrorMsg('Please choose a time slot.');
      return;
    }
    if (!topic.trim()) {
      setErrorMsg('Please provide a Topic Title for the mentorship session.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/client/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          client_name: clientName.trim() || username.trim(),
          client_email: clientEmail.trim(),
          client_phone: clientPhone.trim(),
          session_date: sessionDate,
          session_day: sessionDay,
          time_slot: timeSlot,
          topic: topic.trim(),
          description: description.trim(),
          meeting_link: 'https://meet.google.com/new',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to schedule mentorship session.');
      }

      setSuccessData(data.schedule);
    } catch (err: any) {
      setErrorMsg(err.message || 'Booking submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-pink-50/30 dark:bg-slate-950 relative selection:bg-pink-100 selection:text-primary">
      <Snowfall />
      <SellerNavbar />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/client-dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Client Dashboard</span>
          </Link>
          <span className="text-xs text-slate-400">1:1 Mentorship Session Scheduler</span>
        </div>

        {/* Success Confirmation Card */}
        {successData ? (
          <div className="bg-white/95 dark:bg-slate-900/95 rounded-3xl p-6 sm:p-10 border border-emerald-200 dark:border-emerald-800/40 shadow-2xl backdrop-blur-md text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
                Session Confirmed
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Mentorship Session Scheduled!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Your 1:1 mentorship call is confirmed. Your mentor has been notified with your topic and questions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 text-left max-w-lg mx-auto space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Date &amp; Day:</span>
                <span className="font-bold text-slate-800 dark:text-white">{successData.session_date} ({successData.session_day})</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Time Slot:</span>
                <span className="font-bold text-primary">{successData.time_slot}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Topic:</span>
                <span className="font-semibold text-slate-800 dark:text-white">{successData.topic}</span>
              </div>
              {successData.meeting_link && (
                <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Google Meet:</span>
                  <a
                    href={successData.meeting_link}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Link</span>
                  </a>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/client-dashboard"
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-primary to-pink-500 text-white shadow-lg shadow-primary/25 hover:from-primary-dark hover:to-pink-600 transition-all text-center"
              >
                Return to Client Dashboard
              </Link>
              <button
                type="button"
                onClick={() => setSuccessData(null)}
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all text-center"
              >
                Book Another Slot
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div className="bg-white/95 dark:bg-slate-900/95 rounded-3xl p-6 sm:p-8 md:p-10 border border-pink-200 dark:border-white/10 shadow-xl backdrop-blur-md space-y-6">
            
            <div className="pb-4 border-b border-slate-100 dark:border-white/10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/40 text-primary dark:text-pink-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>1:1 Deep Sprint Booking</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Schedule Mentorship Session
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Select your preferred date, computed day, and 2-hour unhurried time slot.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Client Info (Pre-filled if logged in) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    Client Username *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. client_rahul"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                  />
                </div>
              </div>

              {/* Date & Auto-Computed Day */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    Session Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      required
                      value={sessionDate}
                      onChange={(e) => handleDateChange(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    Day (Auto-Computed)
                  </label>
                  <input
                    type="text"
                    readOnly
                    placeholder="e.g. Sunday"
                    value={sessionDay ? `${sessionDay}` : 'Select a date'}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/70 dark:bg-slate-800/30 text-primary dark:text-pink-300 text-sm font-bold cursor-not-allowed outline-none"
                  />
                </div>
              </div>

              {/* 6 Time Slots Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                  Select Time Slot (2-Hour Live Window) *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = timeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`p-3.5 rounded-2xl border text-center font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                          isSelected
                            ? 'bg-primary text-white border-primary shadow-md shadow-primary/25 scale-[1.02]'
                            : 'bg-slate-50/60 dark:bg-slate-800/60 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-pink-300'
                        }`}
                      >
                        <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-primary'}`} />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Topic Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                  Topic Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. n8n WhatsApp Webhook Setup & Live Multi-Step AI Agent Architecture"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                  Detailed Questions / What do you want to build or debug?
                </label>
                <textarea
                  rows={4}
                  placeholder="Provide repository links, error logs, or specific goals for this 2-hour sprint..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl font-black text-sm bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white shadow-xl shadow-primary/25 transition-all text-center flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Confirm &amp; Book Mentorship Call</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

      </main>
    </div>
  );
}
