'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Video,
  ExternalLink,
  Search,
  RefreshCw,
  User,
  Phone,
  Mail,
  XCircle,
  Check,
} from 'lucide-react';
import { slugify } from '@/lib/validators';

const DURATION_OPTIONS = ['30 min', '1 hour', '1.5 hours', '2 hours', '3 hours'];

interface MentorshipSchedule {
  id: string;
  username: string;
  client_name?: string;
  client_email?: string;
  client_phone?: string;
  session_date: string;
  session_day: string;
  time_slot: string;
  exact_time?: string;
  duration?: string;
  topic: string;
  description?: string;
  meeting_link?: string;
  status: string;
  created_at: string;
}

export default function ClientScheduleViewer() {
  const [schedules, setSchedules] = useState<MentorshipSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'completed' | 'cancelled'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchSchedules = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/client/schedule');
      const data = await res.json();
      if (res.ok && data.schedules) {
        setSchedules(data.schedules);
      }
    } catch (err) {
      console.error('[fetchSchedules error]:', err);
    } finally {
      setIsRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/client/schedule', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) fetchSchedules();
    } catch (err) {
      console.error('[updateStatus error]:', err);
    }
  };

  const updateDuration = async (id: string, newDuration: string) => {
    try {
      const res = await fetch('/api/client/schedule', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, duration: newDuration }),
      });
      if (res.ok) fetchSchedules();
    } catch (err) {
      console.error('[updateDuration error]:', err);
    }
  };

  const filtered = schedules.filter((s) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      s.username?.toLowerCase().includes(q) ||
      s.client_name?.toLowerCase().includes(q) ||
      s.topic?.toLowerCase().includes(q) ||
      s.client_email?.toLowerCase().includes(q) ||
      s.client_phone?.includes(q) ||
      s.session_date?.includes(q);

    if (!matchesSearch) return false;

    if (statusFilter === 'pending') {
      return s.status === 'pending_approval' || s.status === 'scheduled';
    }
    if (statusFilter === 'approved') return s.status === 'approved';
    if (statusFilter === 'completed') return s.status === 'completed';
    if (statusFilter === 'cancelled') {
      return s.status === 'cancelled_by_admin' || s.status === 'cancelled';
    }
    return true;
  });

  const pendingCount = schedules.filter((s) => s.status === 'pending_approval' || s.status === 'scheduled').length;
  const approvedCount = schedules.filter((s) => s.status === 'approved').length;
  const completedCount = schedules.filter((s) => s.status === 'completed').length;
  const cancelledCount = schedules.filter((s) => s.status === 'cancelled_by_admin' || s.status === 'cancelled').length;

  return (
    <div className="py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-pink-100">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Booked 1:1 Mentorship Sessions
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-wider">
              {pendingCount} Pending Approval
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Review incoming student bookings, assign session durations, approve, cancel, or mark sessions as done.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchSchedules}
          disabled={isRefreshing}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white border border-pink-200 text-slate-700 hover:text-primary text-xs font-bold shadow-sm transition-all flex items-center gap-2 hover:bg-pink-50 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-primary' : ''}`} />
          <span>Refresh Sessions</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Total Bookings
          </span>
          <div className="text-2xl font-black text-slate-900">{schedules.length}</div>
          <span className="text-xs text-slate-500 mt-1 inline-block">All-time student calls</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block mb-1">
            Approval Pending
          </span>
          <div className="text-2xl font-black text-amber-600">{pendingCount}</div>
          <span className="text-xs text-slate-500 mt-1 inline-block">Needs admin review</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block mb-1">
            Approved Sessions
          </span>
          <div className="text-2xl font-black text-blue-600">{approvedCount}</div>
          <span className="text-xs text-slate-500 mt-1 inline-block">Ready to host</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block mb-1">
            Completed Calls
          </span>
          <div className="text-2xl font-black text-emerald-600">{completedCount}</div>
          <span className="text-xs text-emerald-700/70 mt-1 inline-block">Successfully held</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-pink-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by client name, username, date, or topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: `All (${schedules.length})` },
            { id: 'pending', label: `Pending (${pendingCount})` },
            { id: 'approved', label: `Approved (${approvedCount})` },
            { id: 'completed', label: `Completed (${completedCount})` },
            { id: 'cancelled', label: `Cancelled (${cancelledCount})` },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setStatusFilter(f.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                statusFilter === f.id
                  ? 'bg-primary text-white shadow-sm shadow-primary/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sessions Table */}
      <div className="bg-white rounded-3xl border border-pink-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading scheduled sessions...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">No mentorship sessions found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-pink-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="py-3.5 px-4">Date &amp; Day</th>
                  <th className="py-3.5 px-4">Time &amp; Exact Slot</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Topic / Scope</th>
                  <th className="py-3.5 px-4">Duration</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Platform</th>
                  <th className="py-3.5 px-4 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-50">
                {filtered.map((s) => {
                  const clientSlug = slugify(s.client_name || s.username);
                  const isPending = s.status === 'pending_approval' || s.status === 'scheduled';
                  const isApproved = s.status === 'approved';
                  const isCompleted = s.status === 'completed';
                  const isCancelled = s.status === 'cancelled_by_admin' || s.status === 'cancelled';

                  return (
                    <tr key={s.id} className="hover:bg-pink-50/20 transition-colors">
                      {/* Date & Day */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-black text-slate-900">{s.session_date}</div>
                        <span className="text-[11px] text-primary font-bold">{s.session_day}</span>
                      </td>

                      {/* Time Window & Exact Time */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {s.exact_time ? (
                          <div>
                            <div className="font-black text-indigo-600 text-xs flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{s.exact_time}</span>
                            </div>
                            <span className="text-[10px] text-slate-400">Window: {s.time_slot}</span>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-50 text-primary font-bold text-xs">
                            <Clock className="w-3.5 h-3.5" />
                            {s.time_slot}
                          </span>
                        )}
                      </td>

                      {/* Client */}
                      <td className="py-3.5 px-4">
                        <Link
                          href={`/client-credentail-${clientSlug}`}
                          className="font-bold text-slate-900 hover:text-primary transition-colors flex items-center gap-1 group"
                          title="View full client details"
                        >
                          <span>{s.client_name || s.username}</span>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                        </Link>
                        <div className="text-[11px] text-slate-400 font-mono">@{s.username}</div>
                        {s.client_phone && (
                          <div className="text-[11px] text-emerald-600 flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3" />
                            <span>{s.client_phone}</span>
                          </div>
                        )}
                      </td>

                      {/* Topic & Description */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-bold text-slate-800 line-clamp-1">{s.topic}</div>
                        {s.description && (
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                            {s.description}
                          </p>
                        )}
                      </td>

                      {/* Mentorship Duration Selector */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <select
                          value={s.duration || '1 hour'}
                          onChange={(e) => updateDuration(s.id, e.target.value)}
                          className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-800 text-xs font-bold bg-white outline-none focus:border-primary cursor-pointer"
                          title="Select mentorship duration"
                        >
                          {DURATION_OPTIONS.map((dur) => (
                            <option key={dur} value={dur}>
                              {dur}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800'
                              : isApproved
                              ? 'bg-blue-100 text-blue-800'
                              : isCancelled
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {isPending ? 'Approval Pending' : isCancelled ? 'Meeting Cancelled by Admin' : s.status}
                        </span>
                      </td>

                      {/* Platform / Meet */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <a
                          href={s.meeting_link || 'https://meet.google.com/new'}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs transition-colors"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Google Meet</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>

                      {/* Admin Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          {/* 1. Approve Meeting */}
                          {isPending && (
                            <button
                              type="button"
                              onClick={() => updateStatus(s.id, 'approved')}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1"
                              title="Approve Meeting"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Approve</span>
                            </button>
                          )}

                          {/* 2. Mark as Done */}
                          {isApproved && (
                            <button
                              type="button"
                              onClick={() => updateStatus(s.id, 'completed')}
                              className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold transition-all flex items-center gap-1"
                              title="Mark as Done"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Mark Done</span>
                            </button>
                          )}

                          {/* 3. Cancel Meeting */}
                          {!isCancelled && !isCompleted && (
                            <button
                              type="button"
                              onClick={() => updateStatus(s.id, 'cancelled_by_admin')}
                              className="px-2.5 py-1.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-xs font-bold transition-all flex items-center gap-1"
                              title="Cancel Meeting"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Cancel</span>
                            </button>
                          )}

                          {/* Re-approve if cancelled */}
                          {isCancelled && (
                            <button
                              type="button"
                              onClick={() => updateStatus(s.id, 'approved')}
                              className="px-2.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold transition-all"
                              title="Re-Approve Meeting"
                            >
                              Re-Approve
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
