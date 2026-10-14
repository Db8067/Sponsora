'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Video,
  ExternalLink,
  Search,
  Filter,
  RefreshCw,
  User,
  Phone,
  Mail,
  MoreVertical,
} from 'lucide-react';

interface MentorshipSchedule {
  id: string;
  username: string;
  client_name?: string;
  client_email?: string;
  client_phone?: string;
  session_date: string;
  session_day: string;
  time_slot: string;
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
  const [statusFilter, setStatusFilter] = useState<'all' | 'scheduled' | 'completed' | 'cancelled'>('all');
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

    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const scheduledCount = schedules.filter((s) => s.status === 'scheduled').length;
  const completedCount = schedules.filter((s) => s.status === 'completed').length;

  return (
    <div className="py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Booked 1:1 Mentorship Sessions
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-primary text-[10px] font-black uppercase tracking-wider">
              {scheduledCount} Upcoming
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Review booked student mentorship appointments, 2-hour slots, topics, and join Google Meet calls.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchSchedules}
          disabled={isRefreshing}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white border border-pink-200 text-slate-700 hover:text-primary text-xs font-bold shadow-sm transition-all flex items-center gap-2 hover:bg-pink-50 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-primary' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Total Sessions Booked
          </span>
          <div className="text-2xl font-black text-slate-900">{schedules.length}</div>
          <span className="text-xs text-slate-500 mt-1 inline-block">All-time mentorship bookings</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block mb-1">
            Scheduled / Upcoming
          </span>
          <div className="text-2xl font-black text-blue-600">{scheduledCount}</div>
          <span className="text-xs text-slate-500 mt-1 inline-block">Awaiting live sprint call</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block mb-1">
            Completed Sprints
          </span>
          <div className="text-2xl font-black text-emerald-600">{completedCount}</div>
          <span className="text-xs text-slate-500 mt-1 inline-block">Doubt resolution satisfied</span>
        </div>
      </div>

      {/* Search & Status Filters */}
      <div className="bg-white rounded-2xl p-4 border border-pink-100 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by client, topic, date, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {(['all', 'scheduled', 'completed', 'cancelled'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors shrink-0 ${
                statusFilter === st
                  ? 'bg-pink-100 text-primary'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Booked Sessions Table */}
      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading scheduled calls...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">No mentorship sessions found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-pink-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="py-3.5 px-4">Date &amp; Day</th>
                  <th className="py-3.5 px-4">Time Slot</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Topic &amp; Objectives</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Meeting Link</th>
                  <th className="py-3.5 px-4 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-50">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-pink-50/20 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-black text-slate-900">{s.session_date}</div>
                      <span className="text-[11px] text-primary font-bold">{s.session_day}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-50 text-primary font-bold text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        {s.time_slot}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{s.client_name || s.username}</div>
                      <div className="text-[11px] text-slate-400">@{s.username}</div>
                      {s.client_phone && (
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-emerald-600" />
                          <span>{s.client_phone}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-bold text-slate-800">{s.topic}</div>
                      {s.description && (
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                          {s.description}
                        </p>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          s.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : s.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <a
                        href={s.meeting_link || 'https://meet.google.com/new'}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs transition-colors"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Open Meet</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        {s.status !== 'completed' && (
                          <button
                            type="button"
                            onClick={() => updateStatus(s.id, 'completed')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[11px] font-bold"
                            title="Mark as completed"
                          >
                            Mark Done
                          </button>
                        )}
                        {s.status === 'scheduled' && (
                          <button
                            type="button"
                            onClick={() => updateStatus(s.id, 'cancelled')}
                            className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 text-[11px] font-bold"
                            title="Cancel call"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
