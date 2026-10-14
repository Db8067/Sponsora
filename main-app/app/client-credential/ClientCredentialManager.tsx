'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { slugify } from '@/lib/validators';
import {
  UserPlus,
  Key,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Copy,
  Check,
  Shield,
  RefreshCw,
  Search,
  ExternalLink,
} from 'lucide-react';

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

export default function ClientCredentialManager() {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // New credential form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMsg, setFormMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Show/hide passwords
  const [showPasswordIds, setShowPasswordIds] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchCredentials = async () => {
    try {
      const res = await fetch('/api/admin/client-credential');
      const data = await res.json();
      if (res.ok && data.credentials) {
        setCredentials(data.credentials);
      }
    } catch (err) {
      console.error('[fetchCredentials error]:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCredentials();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMsg(null);

    if (!username.trim() || !password.trim() || !clientName.trim()) {
      setFormMsg({ type: 'error', text: 'Username, password, and client name are required.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/client-credential', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
          client_name: clientName.trim(),
          email: email.trim() || null,
          phone: phone.trim() || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create client credential.');
      }

      setFormMsg({ type: 'success', text: `Created credentials for "${username.trim()}".` });
      setUsername('');
      setPassword('');
      setClientName('');
      setEmail('');
      setPhone('');
      fetchCredentials();
    } catch (err: any) {
      setFormMsg({ type: 'error', text: err.message || 'Creation failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/admin/client-credential', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_active: !currentStatus }),
      });
      if (res.ok) fetchCredentials();
    } catch (err) {
      console.error('[toggleActive error]:', err);
    }
  };

  const handleDelete = async (id: string, uname: string) => {
    if (!window.confirm(`Are you sure you want to delete client credentials for "${uname}"?`)) return;
    try {
      const res = await fetch(`/api/admin/client-credential?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) fetchCredentials();
    } catch (err) {
      console.error('[handleDelete error]:', err);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = credentials.filter((c) => {
    const q = search.toLowerCase();
    return (
      !search ||
      c.username?.toLowerCase().includes(q) ||
      c.client_name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.phone?.includes(q)
    );
  });

  return (
    <div className="py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Client Mentorship Credentials
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Create and manage username/password logins for mentees to access /client-dashboard (NO Clerk).
          </p>
        </div>

        <button
          type="button"
          onClick={fetchCredentials}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white border border-pink-200 text-slate-700 hover:text-primary text-xs font-bold shadow-sm transition-all flex items-center gap-2 hover:bg-pink-50"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Create Credential Form (4 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-pink-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-pink-50">
            <div className="w-8 h-8 rounded-xl bg-pink-100 text-primary flex items-center justify-center font-bold">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900">Issue New Client Credentials</h2>
              <p className="text-[11px] text-slate-400">Generate credentials for student login</p>
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
              <label className="block font-bold text-slate-700 mb-1">Client Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Username *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. client_rahul"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Password *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mentor2026@"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-primary font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address (Optional)</label>
              <input
                type="email"
                placeholder="client@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">WhatsApp Phone (Optional)</label>
              <input
                type="tel"
                placeholder="9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl font-bold bg-primary hover:bg-primary-dark text-white shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 mt-2"
            >
              <Key className="w-4 h-4" />
              <span>Create Client Credential</span>
            </button>
          </form>
        </div>

        {/* Existing Credentials Table (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-pink-100 shadow-sm flex items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search credentials by username, name, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <span className="text-xs text-slate-400 shrink-0 font-semibold">
              Total: {credentials.length}
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-10 text-center text-xs text-slate-400">Loading credentials...</div>
            ) : filtered.length === 0 ? (
              <div className="p-10 text-center text-xs text-slate-400">No credentials found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-pink-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Username &amp; Password</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pink-50">
                    {filtered.map((c) => {
                      const isRevealed = !!showPasswordIds[c.id];
                      return (
                        <tr key={c.id} className="hover:bg-pink-50/20">
                          <td className="py-3 px-4">
                            <Link
                              href={`/client-credentail-${slugify(c.client_name)}`}
                              className="font-bold text-slate-900 hover:text-primary transition-colors flex items-center gap-1 group"
                              title="View full client details"
                            >
                              <span>{c.client_name}</span>
                              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                            </Link>
                            <div className="text-[11px] text-slate-400">{c.email || c.phone || 'No contact'}</div>
                          </td>

                          <td className="py-3 px-4 font-mono text-[11px]">
                            <div className="font-bold text-slate-800">@{c.username}</div>
                            <div className="flex items-center gap-1.5 mt-0.5">
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
                                onClick={() => copyToClipboard(`User: ${c.username} | Pass: ${c.password}`, c.id)}
                                className="text-slate-400 hover:text-primary"
                                title="Copy login"
                              >
                                {copiedId === c.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                              </button>
                            </div>
                          </td>

                          <td className="py-3 px-4">
                            <button
                              type="button"
                              onClick={() => toggleActive(c.id, c.is_active)}
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                c.is_active
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-200 text-slate-600'
                              }`}
                            >
                              {c.is_active ? 'ACTIVE' : 'DISABLED'}
                            </button>
                          </td>

                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleDelete(c.id, c.username)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete credentials"
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
