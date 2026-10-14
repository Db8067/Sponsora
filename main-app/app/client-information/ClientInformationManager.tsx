'use client';

import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';

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

      setFormMsg({ type: 'success', text: `Course information assigned for "${username}".` });
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Client Courses, Fees &amp; Retainer Tracking
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Assign enrolled courses, track total fees, recorded payments, and remaining balances displayed on /client-dashboard.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchData}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white border border-pink-200 text-slate-700 hover:text-primary text-xs font-bold shadow-sm transition-all flex items-center gap-2 hover:bg-pink-50"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Form: Assign Course / Fee (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-pink-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-pink-50">
            <div className="w-8 h-8 rounded-xl bg-pink-100 text-primary flex items-center justify-center font-bold">
              <School className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900">Assign Course &amp; Fee Details</h2>
              <p className="text-[11px] text-slate-400">Map client to course enrollment and fee structure</p>
            </div>
          </div>

          {formMsg && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
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
              <span>{formMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Select Client Username *</label>
              {clients.length > 0 ? (
                <select
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-primary font-semibold bg-white"
                >
                  {clients.map((cl) => (
                    <option key={cl.username} value={cl.username}>
                      {cl.client_name} (@{cl.username})
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  required
                  placeholder="e.g. client_rahul"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-primary"
                />
              )}
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Course Name *</label>
              <input
                type="text"
                required
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-primary font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Mentor Name</label>
                <input
                  type="text"
                  value={mentorName}
                  onChange={(e) => setMentorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Batch Start Date</label>
                <input
                  type="date"
                  value={batchStartDate}
                  onChange={(e) => setBatchStartDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Fee Calculations */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Fees (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={totalFees}
                    onChange={(e) => setTotalFees(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 font-bold outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fees Paid (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={feesPaid}
                    onChange={(e) => setFeesPaid(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 font-bold outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200">
                <span className="text-slate-500 font-bold">Remaining Balance Due:</span>
                <span className={`font-black text-sm ${feesDue > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  ₹{feesDue.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Course Description &amp; Scope</label>
              <textarea
                rows={3}
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-primary resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl font-bold bg-primary hover:bg-primary-dark text-white shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 mt-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Save Course Enrollment</span>
            </button>
          </form>
        </div>

        {/* Existing Courses Table (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-pink-100 shadow-sm flex items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses by username, course name, or mentor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <span className="text-xs text-slate-400 shrink-0 font-semibold">
              Total: {courses.length}
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-10 text-center text-xs text-slate-400">Loading course records...</div>
            ) : filtered.length === 0 ? (
              <div className="p-10 text-center text-xs text-slate-400">No course records found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-pink-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Course</th>
                      <th className="py-3 px-4">Financials</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pink-50">
                    {filtered.map((c) => (
                      <tr key={c.id} className="hover:bg-pink-50/20">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          @{c.username}
                          <span className="text-[11px] text-slate-400 font-normal block">
                            Mentor: {c.mentor_name || 'Lead'}
                          </span>
                        </td>

                        <td className="py-3 px-4 max-w-[180px]">
                          <div className="font-semibold text-slate-800 truncate">{c.course_name}</div>
                          {c.batch_start_date && (
                            <span className="text-[10px] text-slate-400 block">
                              Batch: {c.batch_start_date}
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <div className="text-emerald-600 font-bold">
                            Paid: ₹{Number(c.fees_paid || 0).toLocaleString('en-IN')}
                          </div>
                          <div className="text-slate-400 text-[11px]">
                            Due: ₹{Number(c.fees_due || 0).toLocaleString('en-IN')}
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
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

                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleDelete(c.id, c.username)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
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
