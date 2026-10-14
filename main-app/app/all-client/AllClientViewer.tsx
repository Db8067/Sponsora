'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Snowfall from '@/components/Snowfall';
import {
  Users,
  Search,
  School,
  DollarSign,
  Calendar,
  Key,
  Eye,
  EyeOff,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Filter,
  RefreshCw,
  Phone,
  Mail,
} from 'lucide-react';
import { slugify } from '@/lib/validators';

interface Credential {
  id: string;
  username: string;
  password: string;
  client_name: string;
  email?: string;
  phone?: string;
  is_active: boolean;
  created_at: string;
}

interface CourseRecord {
  id: string;
  username: string;
  course_name: string;
  total_fees: number;
  fees_paid: number;
  fees_due: number;
  payment_status: string;
}

interface ScheduleRecord {
  id: string;
  username: string;
  session_date: string;
  session_day: string;
  time_slot: string;
  exact_time?: string;
  duration?: string;
  topic: string;
  status: string;
}

interface Props {
  credentials: Credential[];
  courses: CourseRecord[];
  schedules: ScheduleRecord[];
}

export default function AllClientViewer({ credentials, courses, schedules }: Props) {
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'active' | 'has_due' | 'has_sessions'>('all');
  const [showPasswordIds, setShowPasswordIds] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = (txt: string, key: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Group courses and schedules by username
  const coursesByUsername: Record<string, CourseRecord[]> = {};
  courses.forEach((c) => {
    if (!coursesByUsername[c.username]) coursesByUsername[c.username] = [];
    coursesByUsername[c.username].push(c);
  });

  const schedulesByUsername: Record<string, ScheduleRecord[]> = {};
  schedules.forEach((s) => {
    if (!schedulesByUsername[s.username]) schedulesByUsername[s.username] = [];
    schedulesByUsername[s.username].push(s);
  });

  // Calculate aggregated stats
  const totalClients = credentials.length;
  const totalFeesAll = courses.reduce((acc, c) => acc + Number(c.total_fees || 0), 0);
  const totalPaidAll = courses.reduce((acc, c) => acc + Number(c.fees_paid || 0), 0);
  const totalDueAll = courses.reduce((acc, c) => acc + Number(c.fees_due || 0), 0);
  const totalCallsAll = schedules.length;

  const filteredClients = credentials.filter((c) => {
    const q = search.toLowerCase();
    const clientCourses = coursesByUsername[c.username] || [];
    const clientSchedules = schedulesByUsername[c.username] || [];
    const clientTotalDue = clientCourses.reduce((acc, cr) => acc + Number(cr.fees_due || 0), 0);

    const matchesSearch =
      !search ||
      c.client_name?.toLowerCase().includes(q) ||
      c.username?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.phone?.includes(q) ||
      clientCourses.some((cr) => cr.course_name?.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    if (filterMode === 'active') return c.is_active;
    if (filterMode === 'has_due') return clientTotalDue > 0;
    if (filterMode === 'has_sessions') return clientSchedules.length > 0;
    return true;
  });

  return (
    <div className="py-6 space-y-6 relative">
      <Snowfall />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-pink-100 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              All Clients Master Directory
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 text-[10px] font-black uppercase tracking-wider">
              {totalClients} Clients
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Centralized registry of client credentials, enrolled courses, financial balances, and booked mentorship sessions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/client-credential"
            className="px-4 py-2 rounded-xl bg-white border border-pink-200 text-slate-700 hover:text-primary text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 hover:bg-pink-50"
          >
            <Key className="w-3.5 h-3.5" />
            <span>Manage Credentials</span>
          </Link>
          <Link
            href="/client-information"
            className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary-dark transition-all flex items-center gap-1.5"
          >
            <School className="w-3.5 h-3.5" />
            <span>Assign Course</span>
          </Link>
        </div>
      </div>

      {/* 4 Summary Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-pink-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Registered Clients
          </span>
          <div className="text-2xl font-black text-slate-900">{totalClients}</div>
          <span className="text-xs text-slate-500 mt-1 inline-block">Active mentorship roster</span>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-pink-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block mb-1">
            Total Fees Collected
          </span>
          <div className="text-2xl font-black text-emerald-600">
            ₹{totalPaidAll.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-emerald-700/70 mt-1 inline-block">Paid across all courses</span>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-pink-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block mb-1">
            Total Balance Due
          </span>
          <div className="text-2xl font-black text-amber-600">
            ₹{totalDueAll.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-500 mt-1 inline-block">Outstanding course fees</span>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-pink-100 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary block mb-1">
            Mentorship Calls Booked
          </span>
          <div className="text-2xl font-black text-slate-900">{totalCallsAll}</div>
          <span className="text-xs text-slate-500 mt-1 inline-block">1:1 unhurried sessions</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-pink-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by client name, username, course, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Clients' },
            { id: 'active', label: 'Active Only' },
            { id: 'has_due', label: 'With Balance Due' },
            { id: 'has_sessions', label: 'Has Sessions' },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilterMode(f.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filterMode === f.id
                  ? 'bg-primary text-white shadow-sm shadow-primary/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Master Clients Table */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-pink-100 shadow-sm overflow-hidden relative z-10">
        {filteredClients.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No clients found matching the query.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-pink-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="py-3.5 px-4">Client Name</th>
                  <th className="py-3.5 px-4">Credentials</th>
                  <th className="py-3.5 px-4">Enrolled Courses</th>
                  <th className="py-3.5 px-4">Financials</th>
                  <th className="py-3.5 px-4">1:1 Mentorship</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-50">
                {filteredClients.map((c) => {
                  const clientSlug = slugify(c.client_name || c.username);
                  const isRevealed = !!showPasswordIds[c.id];
                  const clientCourses = coursesByUsername[c.username] || [];
                  const clientSchedules = schedulesByUsername[c.username] || [];

                  const totalFee = clientCourses.reduce((acc, cr) => acc + Number(cr.total_fees || 0), 0);
                  const paidFee = clientCourses.reduce((acc, cr) => acc + Number(cr.fees_paid || 0), 0);
                  const dueFee = clientCourses.reduce((acc, cr) => acc + Number(cr.fees_due || 0), 0);

                  return (
                    <tr key={c.id} className="hover:bg-pink-50/20 transition-colors">
                      {/* 1. Client Name (Clickable) */}
                      <td className="py-3.5 px-4">
                        <Link
                          href={`/client-credentail-${clientSlug}`}
                          className="font-black text-sm text-slate-900 hover:text-primary transition-colors flex items-center gap-1 group"
                          title="Open detailed client profile"
                        >
                          <span>{c.client_name}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                        </Link>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">@{c.username}</div>
                        {(c.email || c.phone) && (
                          <div className="text-[11px] text-slate-500 mt-1 flex flex-col gap-0.5">
                            {c.email && (
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3 text-slate-400" />
                                <span className="truncate max-w-[140px]">{c.email}</span>
                              </span>
                            )}
                            {c.phone && (
                              <span className="flex items-center gap-1 text-emerald-600">
                                <Phone className="w-3 h-3" />
                                <span>{c.phone}</span>
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* 2. Credentials */}
                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        <div className="font-bold text-slate-800">@{c.username}</div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-slate-500">
                            {isRevealed ? c.password : '••••••••'}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setShowPasswordIds((prev) => ({ ...prev, [c.id]: !prev[c.id] }))
                            }
                            className="text-slate-400 hover:text-slate-700"
                            title="Toggle reveal"
                          >
                            {isRevealed ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => copyText(`User: ${c.username} | Pass: ${c.password}`, c.id)}
                            className="text-slate-400 hover:text-primary"
                            title="Copy credentials"
                          >
                            {copiedKey === c.id ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* 3. Enrolled Courses */}
                      <td className="py-3.5 px-4 max-w-xs">
                        {clientCourses.length === 0 ? (
                          <span className="text-[11px] text-slate-400 italic">No courses enrolled</span>
                        ) : (
                          <div className="space-y-1">
                            <span className="px-2 py-0.5 rounded-md bg-pink-50 text-primary text-[10px] font-bold">
                              {clientCourses.length} Enrolled
                            </span>
                            <div className="font-bold text-slate-800 line-clamp-1">
                              {clientCourses[0].course_name}
                            </div>
                            {clientCourses.length > 1 && (
                              <span className="text-[10px] text-slate-400 block">
                                + {clientCourses.length - 1} more course{clientCourses.length > 2 ? 's' : ''}
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* 4. Financials */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">
                          Total: ₹{totalFee.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[11px] text-emerald-600 font-medium">
                          Paid: ₹{paidFee.toLocaleString('en-IN')}
                        </div>
                        {dueFee > 0 ? (
                          <div className="text-[11px] text-amber-600 font-bold">
                            Due: ₹{dueFee.toLocaleString('en-IN')}
                          </div>
                        ) : (
                          <div className="text-[10px] text-emerald-700 font-semibold">
                            Paid in Full
                          </div>
                        )}
                      </td>

                      {/* 5. Mentorship Sessions */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          <span className="font-bold text-slate-900">
                            {clientSchedules.length} Session{clientSchedules.length === 1 ? '' : 's'}
                          </span>
                        </div>
                        {clientSchedules.length > 0 && (
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            Latest: {clientSchedules[0].session_date}
                          </div>
                        )}
                      </td>

                      {/* 6. Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            c.is_active
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {c.is_active ? 'ACTIVE' : 'DISABLED'}
                        </span>
                      </td>

                      {/* 7. Action */}
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/client-credentail-${clientSlug}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-pink-50 text-primary hover:bg-primary hover:text-white transition-all text-xs font-bold shadow-sm"
                        >
                          <span>View Client</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
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
