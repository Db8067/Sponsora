'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  School,
  DollarSign,
  PlusCircle,
  Trash2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  User,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { slugify } from '@/lib/validators';

interface CourseRecord {
  id: string;
  username: string;
  course_name: string;
  course_description?: string;
  mentor_name?: string;
  total_fees: number;
  fees_paid: number;
  fees_due: number;
  payment_status: string;
  batch_start_date?: string;
  created_at: string;
}

interface CredentialOption {
  username: string;
  client_name: string;
}

export default function ClientInformationManager() {
  const [courses, setCourses] = useState<CourseRecord[]>([]);
  const [clients, setClients] = useState<CredentialOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Form states
  const [username, setUsername] = useState('');
  const [courseName, setCourseName] = useState('Elite 1:1 Personal Mentorship & Retainer Architecture');
  const [courseDescription, setCourseDescription] = useState('1 to 2 hour live hands-on coding and automation sprints until doubt clear. Build real production AI systems with pitch access to 50+ Grahak Setu brands.');
  const [mentorName, setMentorName] = useState('Senior Solutions Lead');
  const [totalFees, setTotalFees] = useState(15000);
  const [feesPaid, setFeesPaid] = useState(15000);
  const [batchStartDate, setBatchStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMsg, setFormMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchData = async () => {
    try {
      const [resCourses, resClients] = await Promise.all([
        fetch('/api/admin/client-information'),
        fetch('/api/admin/client-credential'),
      ]);

      const dataCourses = await resCourses.json();
      const dataClients = await resClients.json();

      if (resCourses.ok && dataCourses.courses) {
        setCourses(dataCourses.courses);
      }
      if (resClients.ok && dataClients.credentials) {
        setClients(
          dataClients.credentials.map((c: any) => ({
            username: c.username,
            client_name: c.client_name,
          }))
        );
        if (!username && dataClients.credentials.length > 0) {
          setUsername(dataClients.credentials[0].username);
        }
      }
    } catch (err) {
      console.error('[fetchData error]:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const feesDue = Math.max(0, Number(totalFees) - Number(feesPaid));

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMsg(null);

    if (!username.trim() || !courseName.trim()) {
      setFormMsg({ type: 'error', text: 'Username and course name are required.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/client-information', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          course_name: courseName.trim(),
          course_description: courseDescription.trim(),
          mentor_name: mentorName.trim(),
          total_fees: Number(totalFees),
          fees_paid: Number(feesPaid),
          batch_start_date: batchStartDate,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to assign course details.');
      }

      setFormMsg({ type: 'success', text: `Course enrollment assigned for "${username}".` });
      fetchData();
    } catch (err: any) {
      setFormMsg({ type: 'error', text: err.message || 'Creation failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, uname: string) => {
    if (!window.confirm(`Delete course record for "${uname}"?`)) return;
    try {
      const res = await fetch(`/api/admin/client-information?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error('[handleDelete error]:', err);
    }
  };

  const filtered = courses.filter((c) => {
    const q = search.toLowerCase();
    return (
      !search ||
      c.username?.toLowerCase().includes(q) ||
      c.course_name?.toLowerCase().includes(q) ||
      c.mentor_name?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="py-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-pink-100">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Client Courses, Fees &amp; Retainer Tracking
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 text-[10px] font-black uppercase tracking-wider">
              {courses.length} Enrolled
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Assign enrolled courses, track total fees, recorded payments, and remaining balances displayed on client dashboards.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchData}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white border border-pink-200 text-slate-700 hover:text-primary text-xs font-bold shadow-sm transition-all flex items-center gap-2 hover:bg-pink-50"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Records</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form: Assign Course / Fee (5 cols on lg, spacious and clean) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-pink-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-pink-50">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-primary flex items-center justify-center font-bold shadow-sm">
              <School className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">Assign Course &amp; Fee Details</h2>
              <p className="text-xs text-slate-400">Map client to course enrollment and fee structure</p>
            </div>
          </div>

          {formMsg && (
            <div
              className={`p-3.5 rounded-2xl text-xs flex items-center gap-2.5 ${
                formMsg.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {formMsg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <span className="font-medium">{formMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleCreate} className="space-y-4">
            
            {/* 1. Client Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Client Account *
              </label>
              {clients.length > 0 ? (
                <div className="relative">
                  <select
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-xs font-semibold bg-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                  >
                    {clients.map((cl) => (
                      <option key={cl.username} value={cl.username}>
                        {cl.client_name} (@{cl.username})
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-3.5 pointer-events-none text-slate-400 text-xs">
                    ▼
                  </div>
                </div>
              ) : (
                <input
                  type="text"
                  required
                  placeholder="e.g. client_rahul"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                />
              )}
            </div>

            {/* 2. Course Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Course / Program Name *
              </label>
              <input
                type="text"
                required
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-xs font-semibold outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* 3. Mentor & Batch Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Mentor Name
                </label>
                <input
                  type="text"
                  value={mentorName}
                  onChange={(e) => setMentorName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Batch Start Date
                </label>
                <input
                  type="date"
                  value={batchStartDate}
                  onChange={(e) => setBatchStartDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                />
              </div>
            </div>

            {/* 4. Financials Calculation Box */}
            <div className="p-4 rounded-2xl bg-pink-50/40 border border-pink-100 space-y-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                Fee Breakdown &amp; Status
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Total Fees (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={totalFees}
                    onChange={(e) => setTotalFees(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs font-bold bg-white outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Fees Paid (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={feesPaid}
                    onChange={(e) => setFeesPaid(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs font-bold bg-white outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-pink-100">
                <span className="text-slate-600 font-bold">Remaining Balance Due:</span>
                <span className={`font-black text-sm px-2.5 py-0.5 rounded-full ${feesDue > 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                  ₹{feesDue.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* 5. Course Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Course Description &amp; Scope
              </label>
              <textarea
                rows={3}
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none font-normal"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl font-black text-xs bg-primary hover:bg-primary-dark text-white shadow-md shadow-primary/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isSubmitting ? 'Saving Enrollment...' : 'Save Course Enrollment'}</span>
            </button>
          </form>
        </div>

        {/* Existing Courses Table (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-pink-100 shadow-sm flex items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses by username, course name, or mentor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
              />
            </div>
            <span className="text-xs text-slate-400 shrink-0 font-semibold px-2">
              Total: {courses.length}
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-pink-100 shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-xs text-slate-400">Loading course records...</div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center text-xs text-slate-400">No course records found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/70 border-b border-pink-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="py-3.5 px-4">Client</th>
                      <th className="py-3.5 px-4">Course Details</th>
                      <th className="py-3.5 px-4">Financials</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pink-50">
                    {filtered.map((c) => {
                      const matchedClient = clients.find((cl) => cl.username === c.username);
                      const displayName = matchedClient?.client_name || c.username;
                      const clientSlug = slugify(displayName);

                      return (
                        <tr key={c.id} className="hover:bg-pink-50/20 transition-colors">
                          <td className="py-3.5 px-4">
                            <Link
                              href={`/client-credentail-${clientSlug}`}
                              className="font-bold text-slate-900 hover:text-primary transition-colors flex items-center gap-1 group"
                              title="View full client details"
                            >
                              <span>{displayName}</span>
                              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                            </Link>
                            <div className="text-[11px] text-slate-400 font-mono">@{c.username}</div>
                          </td>

                          <td className="py-3.5 px-4 max-w-xs">
                            <div className="font-bold text-slate-800 line-clamp-1">{c.course_name}</div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                              {c.mentor_name && <span>Mentor: {c.mentor_name}</span>}
                              {c.batch_start_date && (
                                <span className="text-[10px] text-slate-400">
                                  • Starts {c.batch_start_date}
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">
                              ₹{Number(c.total_fees || 0).toLocaleString('en-IN')}
                            </div>
                            <div className="text-[11px] text-emerald-600 font-medium">
                              Paid: ₹{Number(c.fees_paid || 0).toLocaleString('en-IN')}
                            </div>
                            {Number(c.fees_due || 0) > 0 && (
                              <div className="text-[11px] text-amber-600 font-bold">
                                Due: ₹{Number(c.fees_due || 0).toLocaleString('en-IN')}
                              </div>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                c.payment_status === 'paid'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : c.payment_status === 'partial'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {c.payment_status}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleDelete(c.id, c.username)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
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

      </div>
    </div>
  );
}
