'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Snowfall from '@/components/Snowfall';
import {
  User,
  Key,
  School,
  DollarSign,
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Eye,
  EyeOff,
  ArrowLeft,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

interface ClientRecord {
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
  course_description?: string;
  mentor_name?: string;
  total_fees: number;
  fees_paid: number;
  fees_due: number;
  payment_status: string;
  batch_start_date?: string;
  created_at: string;
}

interface ScheduleRecord {
  id: string;
  username: string;
  client_name?: string;
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

interface Props {
  client: ClientRecord;
  courses: CourseRecord[];
  schedules: ScheduleRecord[];
}

export default function ClientDetailViewer({ client, courses, schedules }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = (txt: string, key: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const totalCourseFees = courses.reduce((acc, c) => acc + Number(c.total_fees || 0), 0);
  const totalFeesPaid = courses.reduce((acc, c) => acc + Number(c.fees_paid || 0), 0);
  const totalFeesDue = courses.reduce((acc, c) => acc + Number(c.fees_due || 0), 0);

  return (
    <div className="py-6 space-y-6 relative">
      <Snowfall />

      {/* Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-pink-100 relative z-10">
        <div className="flex items-center gap-3">
          <Link
            href="/client-credential"
            className="p-2 rounded-xl bg-white border border-pink-200 text-slate-700 hover:text-primary hover:bg-pink-50 transition-all shadow-sm"
            title="Back to Client Credentials"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                {client.client_name}
              </h1>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  client.is_active
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {client.is_active ? 'ACTIVE' : 'DISABLED'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive profile: credentials, course enrollments, fee financials &amp; mentorship calls.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/all-client"
            className="px-4 py-2 rounded-xl bg-white border border-pink-200 text-slate-700 hover:text-primary text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 hover:bg-pink-50"
          >
            <User className="w-3.5 h-3.5" />
            <span>All Clients Directory</span>
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

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-pink-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Course Fees
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              ₹
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            ₹{totalCourseFees.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-500 mt-1 inline-block">
            Across {courses.length} enrolled program{courses.length === 1 ? '' : 's'}
          </span>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-pink-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Fees Paid
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              ✓
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600">
            ₹{totalFeesPaid.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-emerald-700/70 mt-1 inline-block">
            Verified received payments
          </span>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-pink-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Fees Due
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              !
            </div>
          </div>
          <div className={`text-2xl font-black ${totalFeesDue > 0 ? 'text-amber-600' : 'text-slate-400'}`}>
            ₹{totalFeesDue.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-500 mt-1 inline-block">
            {totalFeesDue > 0 ? 'Outstanding balance to collect' : 'All fees settled in full'}
          </span>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-pink-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Mentorship Calls
            </span>
            <div className="w-8 h-8 rounded-xl bg-pink-50 text-primary flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {schedules.length}
          </div>
          <span className="text-xs text-slate-500 mt-1 inline-block">
            Booked 1:1 sessions
          </span>
        </div>
      </div>

      {/* Main Grid: Left Credential Card (4 cols), Right Courses & Schedules (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Left Column: Client Credentials Profile (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-pink-100 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-pink-50">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-pink-500 text-white flex items-center justify-center font-black text-lg shadow-md shadow-primary/20">
                {client.client_name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-black text-base text-slate-900 truncate">
                  {client.client_name}
                </h3>
                <span className="text-xs text-slate-400 font-mono">@{client.username}</span>
              </div>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Login Credentials
                </span>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Username:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900">{client.username}</span>
                      <button
                        type="button"
                        onClick={() => copyText(client.username, 'username')}
                        className="text-slate-400 hover:text-primary"
                        title="Copy username"
                      >
                        {copiedKey === 'username' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/50">
                    <span className="text-slate-500">Password:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900">
                        {showPassword ? client.password : '••••••••••••'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-slate-400 hover:text-slate-700"
                        title="Toggle reveal"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => copyText(client.password, 'password')}
                        className="text-slate-400 hover:text-primary"
                        title="Copy password"
                      >
                        {copiedKey === 'password' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Contact Information
                </span>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate text-slate-700 font-medium">
                      {client.email || 'No email provided'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-slate-700 font-medium">
                      {client.phone || 'No phone provided'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-400 text-[11px]">
                <span>Registered On:</span>
                <span className="font-medium text-slate-600">
                  {new Date(client.created_at).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Enrolled Courses & Mentorship Sessions (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1: Enrolled Courses */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-pink-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-pink-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-pink-100 text-primary flex items-center justify-center font-bold">
                  <School className="w-4 h-4" />
                </div>
                <h3 className="font-black text-base text-slate-900">
                  Enrolled Courses &amp; Retainer Details ({courses.length})
                </h3>
              </div>
              <Link
                href="/client-information"
                className="text-xs font-bold text-primary hover:underline"
              >
                + Assign New Course
              </Link>
            </div>

            {courses.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                No courses currently assigned to @{client.username}. Use "Assign Course" above to add program enrollments.
              </div>
            ) : (
              <div className="space-y-3">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-pink-200 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="font-black text-sm text-slate-900">
                          {course.course_name}
                        </h4>
                        <div className="text-xs text-slate-500 flex items-center gap-3 mt-1">
                          {course.mentor_name && (
                            <span>Mentor: <strong>{course.mentor_name}</strong></span>
                          )}
                          {course.batch_start_date && (
                            <span>• Starts: <strong>{course.batch_start_date}</strong></span>
                          )}
                        </div>
                      </div>

                      <span
                        className={`self-start sm:self-auto px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          course.payment_status === 'paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : course.payment_status === 'partial'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        Payment: {course.payment_status}
                      </span>
                    </div>

                    {course.course_description && (
                      <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-100">
                        {course.course_description}
                      </p>
                    )}

                    <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-200/60 text-xs">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-400 block">
                          Total Fees
                        </span>
                        <span className="font-bold text-slate-800">
                          ₹{Number(course.total_fees || 0).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase text-emerald-600 block">
                          Paid
                        </span>
                        <span className="font-bold text-emerald-700">
                          ₹{Number(course.fees_paid || 0).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase text-amber-600 block">
                          Remaining Due
                        </span>
                        <span className="font-black text-amber-700">
                          ₹{Number(course.fees_due || 0).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Mentorship Sessions Scheduled */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-pink-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-pink-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-pink-100 text-primary flex items-center justify-center font-bold">
                  <Calendar className="w-4 h-4" />
                </div>
                <h3 className="font-black text-base text-slate-900">
                  Mentorship Sessions Scheduled ({schedules.length})
                </h3>
              </div>
              <Link
                href="/client-schedule"
                className="text-xs font-bold text-primary hover:underline"
              >
                View in Schedule Hub
              </Link>
            </div>

            {schedules.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                No mentorship sessions booked yet by @{client.username}.
              </div>
            ) : (
              <div className="space-y-3">
                {schedules.map((s) => (
                  <div
                    key={s.id}
                    className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-pink-200 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="p-2 rounded-xl bg-white border border-slate-200 font-black text-xs text-slate-900">
                          {s.session_date}
                        </span>
                        <span className="text-xs font-bold text-primary">
                          {s.session_day}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{s.exact_time ? `${s.exact_time} (${s.time_slot})` : s.time_slot}</span>
                        </span>
                        {s.duration && (
                          <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                            {s.duration}
                          </span>
                        )}
                      </div>

                      <span
                        className={`self-start sm:self-auto px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          s.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : s.status === 'approved'
                            ? 'bg-blue-100 text-blue-800'
                            : s.status === 'cancelled_by_admin' || s.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {s.status === 'pending_approval' ? 'Approval Pending' : s.status}
                      </span>
                    </div>

                    <div>
                      <h5 className="font-bold text-xs text-slate-900">
                        Topic: {s.topic}
                      </h5>
                      {s.description && (
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {s.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                        <Video className="w-3.5 h-3.5 text-emerald-600" />
                        Platform: Google Meet
                      </span>

                      {s.meeting_link && (
                        <a
                          href={s.meeting_link}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-primary hover:underline inline-flex items-center gap-1"
                        >
                          <span>Open Google Meet</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
