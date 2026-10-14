'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Snowfall from '@/components/Snowfall';
import SellerNavbar from '@/components/SellerNavbar';
import {
  GraduationCap,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  LogOut,
  User,
  Lock,
  Loader2,
  Sparkles,
  BookOpen,
  DollarSign,
  Video,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface ClientSession {
  id?: string;
  username: string;
  client_name: string;
  email?: string;
  phone?: string;
}

interface ClientCourse {
  id: string;
  course_name: string;
  course_description?: string;
  mentor_name?: string;
  total_fees: number;
  fees_paid: number;
  fees_due: number;
  payment_status: string;
  batch_start_date?: string;
}

interface MentorshipSchedule {
  id: string;
  session_date: string;
  session_day: string;
  time_slot: string;
  exact_time?: string;
  duration?: string;
  topic: string;
  description?: string;
  meeting_link?: string;
  status: string;
}

export default function ClientDashboardPage() {
  const [client, setClient] = useState<ClientSession | null>(null);
  const [loading, setLoading] = useState(true);

  // Login form state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard data state
  const [courses, setCourses] = useState<ClientCourse[]>([]);
  const [schedules, setSchedules] = useState<MentorshipSchedule[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Check existing session (cookie or localStorage)
  useEffect(() => {
    try {
      let session = null;
      const match = document.cookie.match(/client_session=([^;]+)/);
      if (match) {
        session = JSON.parse(decodeURIComponent(match[1]));
      } else {
        const stored = localStorage.getItem('client_session');
        if (stored) session = JSON.parse(stored);
      }
      if (session?.username) {
        setClient(session);
        fetchDashboardData(session.username);
      }
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDashboardData = async (uname: string) => {
    setDataLoading(true);
    try {
      const res = await fetch(`/api/client/data?username=${encodeURIComponent(uname)}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setCourses(data.courses || []);
        setSchedules(data.schedules || []);
      }
    } catch (err) {
      console.error('[fetchDashboardData error]:', err);
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!usernameInput.trim() || !passwordInput.trim()) {
      setAuthError('Please enter both username and password.');
      return;
    }

    setIsLoggingIn(true);
    try {
      const res = await fetch('/api/client/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usernameInput.trim(),
          password: passwordInput.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed. Please verify credentials.');
      }

      setClient(data.client);
      try {
        localStorage.setItem('client_session', JSON.stringify(data.client));
      } catch {
        /* ignore */
      }
      fetchDashboardData(data.client.username);
    } catch (err: any) {
      setAuthError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/client/auth', { method: 'DELETE' });
    } catch {
      /* ignore */
    }
    try {
      localStorage.removeItem('client_session');
    } catch {
      /* ignore */
    }
    document.cookie = 'client_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setClient(null);
    setCourses([]);
    setSchedules([]);
  };

  // 1) Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // 2) Unauthenticated View: Client Login Screen
  if (!client) {
    return (
      <div className="min-h-screen flex flex-col bg-pink-50/30 dark:bg-slate-950 relative selection:bg-pink-100 selection:text-primary">
        <Snowfall />
        <SellerNavbar />

        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10 relative z-10">
          <div className="w-full max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl border border-pink-200 dark:border-white/10 shadow-2xl p-6 sm:p-8 text-center flex flex-col items-center">
            
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-pink-500 text-white flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
              <GraduationCap className="w-7 h-7" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/40 text-primary dark:text-pink-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Client Mentorship Portal</span>
            </div>

            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Sign In to Your Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6">
              Enter your assigned client credentials to access your course details, fees, and schedule 1:1 sessions.
            </p>

            {authError && (
              <div className="w-full p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 flex items-start gap-2 mb-4 text-left">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="w-full space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                  Client Username
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. client_rahul"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 px-6 rounded-xl font-black text-sm bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white shadow-xl shadow-primary/25 transition-all text-center flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 disabled:opacity-60"
              >
                {isLoggingIn ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Enter Client Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 text-center text-xs text-slate-400">
              <span className="flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Credentials managed by GrahakSetu Mentorship Ops</span>
              </span>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 3) Authenticated Client View
  const activeCourse = courses[0] || null;
  const totalFees = courses.reduce((acc, c) => acc + (Number(c.total_fees) || 0), 0);
  const totalPaid = courses.reduce((acc, c) => acc + (Number(c.fees_paid) || 0), 0);
  const remainingDue = courses.reduce((acc, c) => acc + (Number(c.fees_due) || 0), 0);
  const upcomingSchedules = schedules.filter((s) => s.status !== 'completed');
  const completedSchedules = schedules.filter((s) => s.status === 'completed');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 relative selection:bg-pink-100 selection:text-primary">
      <Snowfall />
      <SellerNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-pink-200/80 dark:border-white/10 shadow-xl backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active Mentorship Student</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Welcome back, {client.client_name || client.username}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Username: <span className="font-semibold text-primary">{client.username}</span>
              {client.email && ` • ${client.email}`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/client-schedule-mentorship"
              className="py-3 px-5 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-primary to-pink-500 hover:from-primary-dark hover:to-pink-600 text-white shadow-xl shadow-primary/25 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>SCHEDULE Mentorship Session</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="py-3 px-4 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Financial & Course Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/80 dark:bg-slate-900/80 rounded-2xl p-5 border border-pink-100 dark:border-white/10 shadow-sm backdrop-blur-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Course Enrollment
            </span>
            <div className="text-lg font-black text-slate-900 dark:text-white truncate">
              {activeCourse ? activeCourse.course_name : 'Elite 1:1 Production AI Systems'}
            </div>
            <span className="text-xs text-primary font-semibold mt-1 inline-block">
              Mentor: {activeCourse?.mentor_name || 'Assigned Senior Lead'}
            </span>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 rounded-2xl p-5 border border-pink-100 dark:border-white/10 shadow-sm backdrop-blur-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Total Course Fees
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              ₹{totalFees.toLocaleString('en-IN')}
            </div>
            <span className="text-xs text-slate-500 mt-1 inline-block">Comprehensive 1:1 Retainer</span>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 rounded-2xl p-5 border border-emerald-100 dark:border-emerald-900/30 shadow-sm backdrop-blur-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
              Fees Paid
            </span>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              ₹{totalPaid.toLocaleString('en-IN')}
            </div>
            <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified on Record
            </span>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 rounded-2xl p-5 border border-pink-100 dark:border-white/10 shadow-sm backdrop-blur-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Remaining Balance / Due
            </span>
            <div className={`text-2xl font-black ${remainingDue > 0 ? 'text-amber-500' : 'text-slate-900 dark:text-white'}`}>
              ₹{remainingDue.toLocaleString('en-IN')}
            </div>
            <span className="text-xs text-slate-500 mt-1 inline-block">
              {remainingDue === 0 ? 'All fees settled' : 'Balance payable before completion'}
            </span>
          </div>
        </div>

        {/* Detailed Course Description Section */}
        <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-pink-200 dark:border-white/10 shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-white/10">
            <div className="w-9 h-9 rounded-xl bg-pink-100 dark:bg-pink-900/40 text-primary flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                Course Description &amp; Sprint Blueprint
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Live 1:1 hands-on curriculum tailored to your agency and technical objectives.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              {activeCourse?.course_description || (
                'You are enrolled in the Elite 1:1 Personal Mentorship program. Each session is a dedicated 1 to 2 hour unhurried sprint where your mentor reviews your codebase, builds production automations and AI systems alongside you, and directly prepares your pipeline to pitch to verified Grahak Setu partner brands and foreign retainer clients.'
              )}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 text-xs">
                <span className="font-black text-slate-800 dark:text-white block mb-1">⚡ Unrushed Sprints</span>
                <span className="text-slate-500">Zero 30-minute timers. Sessions run until doubts are resolved.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 text-xs">
                <span className="font-black text-slate-800 dark:text-white block mb-1">🤝 Direct Pitch Access</span>
                <span className="text-slate-500">Solutions reviewed and submitted to 50+ Grahak Setu brand founders.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 text-xs">
                <span className="font-black text-slate-800 dark:text-white block mb-1">💼 Retainer Architecture</span>
                <span className="text-slate-500">Learn how to land and retain $2,000–$5,000/mo foreign clients.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 1. Booked & Upcoming Mentorship Sessions */}
        <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-pink-200 dark:border-white/10 shadow-sm backdrop-blur-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  Your Booked Mentorship Sessions
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-pink-100 dark:bg-pink-900/40 text-primary dark:text-pink-300 text-xs font-bold">
                  {upcomingSchedules.length} Active
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Upcoming 1:1 sessions, live status approvals, and Google Meet details.
              </p>
            </div>

            <Link
              href="/client-schedule-mentorship"
              className="py-2.5 px-4 rounded-xl font-bold text-xs bg-primary hover:bg-primary-dark text-white transition-all inline-flex items-center gap-1.5 self-start sm:self-auto shadow-md shadow-primary/20"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book New Session Slot</span>
            </Link>
          </div>

          {upcomingSchedules.length === 0 ? (
            <div className="text-center py-10 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-white/10">
              <Calendar className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">No active mentorship sessions scheduled</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Click the button above to pick a date, 2-hour window, and exact start time that fits your schedule.
              </p>
              <Link
                href="/client-schedule-mentorship"
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs"
              >
                Schedule Session Slot
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/10 text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4">Date &amp; Day</th>
                    <th className="py-3 px-4">Time &amp; Exact Slot</th>
                    <th className="py-3 px-4">Session Topic</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Platform &amp; Duration</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {upcomingSchedules.map((s) => {
                    const isPending = s.status === 'pending_approval' || s.status === 'scheduled';
                    const isApproved = s.status === 'approved';
                    const isCancelled = s.status === 'cancelled_by_admin' || s.status === 'cancelled';

                    return (
                      <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                          {s.session_date}
                          <span className="text-xs text-slate-500 font-normal block">{s.session_day}</span>
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {s.exact_time ? (
                            <div>
                              <span className="font-bold text-indigo-600 dark:text-indigo-400 block">
                                {s.exact_time}
                              </span>
                              <span className="text-[10px] text-slate-400">Window: {s.time_slot}</span>
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-50 dark:bg-pink-900/30 text-primary dark:text-pink-300 font-bold text-xs">
                              <Clock className="w-3 h-3" />
                              {s.time_slot}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 max-w-xs font-semibold text-slate-800 dark:text-slate-200">
                          {s.topic}
                          {s.description && (
                            <span className="text-xs text-slate-400 font-normal block truncate mt-0.5">
                              {s.description}
                            </span>
                          )}
                        </td>

                        {/* Status requirement:
                            - If not approved yet -> "Approval Pending"
                            - If approved -> "Approved"
                            - If cancelled -> "Meeting Cancelled by Admin"
                        */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                              isApproved
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : isCancelled
                                ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            }`}
                          >
                            {isApproved
                              ? 'Approved'
                              : isCancelled
                              ? 'Meeting Cancelled by Admin'
                              : 'Approval Pending'}
                          </span>
                        </td>

                        {/* Platform & Duration requirement:
                            - If approved -> show duration and text "Platform: Google Meet"
                        */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="space-y-0.5">
                            <span className="font-medium text-slate-700 dark:text-slate-300 text-xs flex items-center gap-1">
                              <Video className="w-3.5 h-3.5 text-emerald-600" />
                              Platform: Google Meet
                            </span>
                            {isApproved && (
                              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 block">
                                Duration: {s.duration || '1 hour'}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          {isApproved ? (
                            <a
                              href={s.meeting_link || 'https://meet.google.com/new'}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 font-bold text-xs transition-colors"
                            >
                              <Video className="w-3.5 h-3.5" />
                              <span>Join Meet</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : isCancelled ? (
                            <Link
                              href="/client-schedule-mentorship"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white font-bold text-xs transition-colors"
                            >
                              <span>Reschedule</span>
                            </Link>
                          ) : (
                            <span className="text-[11px] text-amber-600 font-medium italic">
                              Pending Review
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 2. Dedicated Section: Completed Mentorship Sessions */}
        {completedSchedules.length > 0 && (
          <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-emerald-200/80 dark:border-emerald-800/30 shadow-sm backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">
                    Completed Mentorship Sessions ({completedSchedules.length})
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Finished 1:1 sprints successfully held with your mentor.
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/10 text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4">Date &amp; Day</th>
                    <th className="py-3 px-4">Time &amp; Duration</th>
                    <th className="py-3 px-4">Topic Covered</th>
                    <th className="py-3 px-4">Platform</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {completedSchedules.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                        {s.session_date}
                        <span className="text-xs text-slate-500 font-normal block">{s.session_day}</span>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-bold text-slate-800 dark:text-slate-200 block">
                          {s.exact_time || s.time_slot}
                        </span>
                        <span className="text-[11px] text-slate-400 font-semibold">
                          Duration: {s.duration || '1 hour'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs font-semibold text-slate-800 dark:text-slate-200">
                        {s.topic}
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 font-medium text-xs">
                          <Video className="w-3.5 h-3.5 text-emerald-600" />
                          Platform: Google Meet
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
