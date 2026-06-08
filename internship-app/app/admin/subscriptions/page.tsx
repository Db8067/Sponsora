"use client";

import { useState, useEffect, useCallback } from "react";
import {
  TrendingUp, Users, Tag, AlertTriangle, ShieldCheck, Plus, RefreshCw, Send, Loader2, Key, Search, Mail
} from "lucide-react";

type TabName = "overview" | "subscriptions" | "discounts" | "audit" | "feedback";

export default function AdminSubscriptionsPage() {
  const [activeTab, setActiveTab] = useState<TabName>("overview");
  const [data, setData] = useState<any>({
    stats: { totalRevenue: 0, activeSubscriptionsCount: 0, expiredSubscriptionsCount: 0, totalSubscriptionsCount: 0 },
    subscriptions: [],
    discountCodes: [],
    auditLogs: [],
    feedbacks: [],
  });
  const [loading, setLoading] = useState(true);
  const [adminKey, setAdminKey] = useState("sponsora_secret_admin_key");
  const [isAuthorized, setIsAuthorized] = useState(true);

  // Grant access form
  const [grantUser, setGrantUser] = useState("");
  const [grantPlan, setGrantPlan] = useState("monthly");
  const [grantDuration, setGrantDuration] = useState("months");
  const [grantVal, setGrantVal] = useState(1);
  const [grantLoading, setGrantLoading] = useState(false);
  const [grantMsg, setGrantMsg] = useState("");

  // Create discount code form
  const [newCode, setNewCode] = useState("");
  const [newDisc, setNewDisc] = useState(10);
  const [newMax, setNewMax] = useState(5);
  const [newExpiry, setNewExpiry] = useState("");
  const [discLoading, setDiscLoading] = useState(false);
  const [discMsg, setDiscMsg] = useState("");

  // Feedback reply modal
  const [replyFeedback, setReplyFeedback] = useState<any | null>(null);
  const [replyEmail, setReplyEmail] = useState("");
  const [replySubject, setReplySubject] = useState("Sponsora Support Review");
  const [replyBody, setReplyBody] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const [replyMsg, setReplyMsg] = useState("");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats", {
        headers: { "x-admin-key": adminKey },
      });
      if (res.status === 403) {
        setIsAuthorized(false);
        setLoading(false);
        return;
      }
      const json = await res.json();
      setData(json);
      setIsAuthorized(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [adminKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleGrantAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!grantUser.trim()) return;
    setGrantLoading(true);
    setGrantMsg("");
    try {
      const res = await fetch("/api/admin/grant-access", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({
          userId: grantUser.trim(),
          planType: grantPlan,
          durationType: grantDuration,
          durationValue: grantVal,
        }),
      });
      const resJson = await res.json();
      if (resJson.success) {
        setGrantMsg("✓ Manual access granted successfully!");
        setGrantUser("");
        fetchData();
      } else {
        setGrantMsg("✗ Failed: " + (resJson.error || "unknown error"));
      }
    } catch {
      setGrantMsg("✗ Failed: Connection error");
    } finally {
      setGrantLoading(false);
    }
  };

  const handleCreateDiscount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;
    setDiscLoading(true);
    setDiscMsg("");
    try {
      const res = await fetch("/api/admin/discount-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({
          code: newCode.toUpperCase().trim(),
          discountPercentage: newDisc,
          maxUses: newMax,
          expiresAt: newExpiry || null,
        }),
      });
      const resJson = await res.json();
      if (resJson.success) {
        setDiscMsg("✓ Discount code created successfully!");
        setNewCode("");
        fetchData();
      } else {
        setDiscMsg("✗ Failed: " + (resJson.error || "unknown error"));
      }
    } catch {
      setDiscMsg("✗ Failed: Connection error");
    } finally {
      setDiscLoading(false);
    }
  };

  const handleToggleDiscountCode = async (id: string, activeStatus: boolean) => {
    try {
      await fetch("/api/admin/discount-codes", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({ id, isActive: activeStatus }),
      });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyFeedback || !replyEmail || !replyBody.trim()) return;
    setReplyLoading(true);
    setReplyMsg("");
    try {
      const res = await fetch("/api/admin/reply-email", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({
          feedbackId: replyFeedback.id,
          userEmail: replyEmail.trim(),
          replySubject,
          replyBody,
        }),
      });
      const resJson = await res.json();
      if (resJson.success) {
        setReplyMsg("✓ Email response sent successfully!");
        setReplyBody("");
        setTimeout(() => {
          setReplyFeedback(null);
          setReplyMsg("");
        }, 1500);
        fetchData();
      } else {
        setReplyMsg("✗ Failed to send reply");
      }
    } catch {
      setReplyMsg("✗ Failed to send reply");
    } finally {
      setReplyLoading(false);
    }
  };

  const openReplyModal = (f: any) => {
    setReplyFeedback(f);
    setReplyEmail(""); // In live mode, lookup email via Clerk or ask admin to paste
    setReplySubject(`Regarding Sponsora Premium - Account Status`);
    setReplyBody(`Hello,\n\nThank you for reaching out. We have reviewed your account details.\n\n[Explain decision/solution here...]\n\nBest regards,\nSponsora Support Team`);
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center pt-24 bg-gray-50 text-gray-900 selection:bg-blue-100">
        <Key className="w-12 h-12 text-red-500 mb-4" />
        <h1 className="text-2xl font-black mb-2 tracking-tight">Access Restricted</h1>
        <p className="text-sm text-gray-500 max-w-sm mb-6">You must log in with an authorized Sponsora admin email (`devanshb3456@gmail.com`) to access this page.</p>
        <div className="flex gap-2">
          <input
            type="password"
            placeholder="Enter Dev Admin Secret Key..."
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button onClick={fetchData} className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl text-sm hover:bg-blue-700">
            Submit
          </button>
        </div>
      </div>
    );
  }

  // Filtered subscriptions list
  const filteredSubs = (data.subscriptions || []).filter((s: any) => 
    s.user_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.plan_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-28 pb-20 selection:bg-blue-100 font-sans">
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col lg:flex-row gap-8">
        
        {/* Workspace Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-1.5 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm h-fit">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-wider px-3 mb-2">Sponsora Workspace</h2>
          {[
            { id: "overview", label: "Dashboard Overview", icon: <TrendingUp className="w-4 h-4" /> },
            { id: "subscriptions", label: "User Pass Status", icon: <Users className="w-4 h-4" /> },
            { id: "discounts", label: "Discount Management", icon: <Tag className="w-4 h-4" /> },
            { id: "audit", label: "User Audit Logs", icon: <ShieldCheck className="w-4 h-4" /> },
            { id: "feedback", label: "Feedback & Appeals", icon: <AlertTriangle className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabName)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 pl-2.5"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
          <div className="h-px bg-gray-200 my-4" />
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh Workspace
          </button>
        </aside>

        {/* Admin Working Space */}
        <main className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <p className="text-xs font-bold text-gray-400">Loading workspace data...</p>
            </div>
          ) : (
            <>
              {/* Tab 1: Dashboard Overview */}
              {activeTab === "overview" && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h1 className="text-2xl font-black tracking-tight">Console Dashboard</h1>
                    <p className="text-xs text-gray-500">Live operational telemetry for Sponsora passes.</p>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Active Revenue Today", val: `₹${data.stats.totalRevenue.toLocaleString()}`, color: "text-green-600", desc: "Based on active passes" },
                      { label: "Active Passes", val: data.stats.activeSubscriptionsCount, color: "text-blue-600", desc: "Users currently active" },
                      { label: "Expired Passes", val: data.stats.expiredSubscriptionsCount, color: "text-orange-600", desc: "Passes that completed duration" },
                      { label: "Total Accounts", val: data.stats.totalSubscriptionsCount, color: "text-gray-900", desc: "User accounts registered" },
                    ].map((stat, i) => (
                      <div key={i} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                        <p className="text-xs font-semibold text-gray-500">{stat.label}</p>
                        <p className={`text-2xl font-black my-1 ${stat.color}`}>{stat.val}</p>
                        <p className="text-[10px] font-medium text-gray-400">{stat.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-gray-200 my-2" />

                  {/* Manual Override Action */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl border border-gray-200 bg-white">
                      <h3 className="text-sm font-bold mb-1">Grant Manual Premium Override</h3>
                      <p className="text-xs text-gray-500 mb-4">Grant manual free service pass duration to influencers or testers.</p>
                      <form onSubmit={handleGrantAccess} className="flex flex-col gap-3">
                        <div>
                          <label className="text-xs font-bold text-gray-500 block mb-1">Clerk User ID:</label>
                          <input
                            type="text"
                            placeholder="user_..."
                            required
                            value={grantUser}
                            onChange={(e) => setGrantUser(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-bold text-gray-500 block mb-1">Plan Tier:</label>
                            <select value={grantPlan} onChange={(e) => setGrantPlan(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm cursor-pointer">
                              <option value="1_day">1 Day Pass</option>
                              <option value="7_day">7 Day Pass</option>
                              <option value="monthly">Monthly Pass</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-gray-500 block mb-1">Duration Unit:</label>
                            <select value={grantDuration} onChange={(e) => setGrantDuration(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm cursor-pointer">
                              <option value="days">Days</option>
                              <option value="months">Months</option>
                              <option value="lifetime">Lifetime Access</option>
                            </select>
                          </div>
                        </div>
                        {grantDuration !== "lifetime" && (
                          <div>
                            <label className="text-xs font-bold text-gray-500 block mb-1">Duration Value:</label>
                            <input
                              type="number"
                              min={1}
                              value={grantVal}
                              onChange={(e) => setGrantVal(Number(e.target.value))}
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            />
                          </div>
                        )}
                        <button
                          type="submit"
                          disabled={grantLoading}
                          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 disabled:opacity-50"
                        >
                          {grantLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                          Grant Access
                        </button>
                        {grantMsg && <p className="text-xs font-semibold text-blue-600 mt-1">{grantMsg}</p>}
                      </form>
                    </div>

                    <div className="p-5 rounded-2xl border border-gray-200 bg-white">
                      <h3 className="text-sm font-bold mb-1">Create Discount Coupon</h3>
                      <p className="text-xs text-gray-500 mb-4">Generate custom discount percentages for promotion or influencer outreach.</p>
                      <form onSubmit={handleCreateDiscount} className="flex flex-col gap-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-bold text-gray-500 block mb-1">Code Name:</label>
                            <input
                              type="text"
                              placeholder="DISCOUNT50"
                              required
                              value={newCode}
                              onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm font-mono font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-gray-500 block mb-1">Discount %:</label>
                            <input
                              type="number"
                              min={1}
                              max={100}
                              required
                              value={newDisc}
                              onChange={(e) => setNewDisc(Number(e.target.value))}
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-bold text-gray-500 block mb-1">Max Uses:</label>
                            <input
                              type="number"
                              min={1}
                              value={newMax}
                              onChange={(e) => setNewMax(Number(e.target.value))}
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-gray-500 block mb-1">Expiry Date:</label>
                            <input
                              type="date"
                              value={newExpiry}
                              onChange={(e) => setNewExpiry(e.target.value)}
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm cursor-pointer"
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          disabled={discLoading}
                          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 disabled:opacity-50"
                        >
                          {discLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Tag className="w-4 h-4" />}
                          Create Coupon
                        </button>
                        {discMsg && <p className="text-xs font-semibold text-blue-600 mt-1">{discMsg}</p>}
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: User Pass Status */}
              {activeTab === "subscriptions" && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-black tracking-tight">Active User Subscriptions</h1>
                      <p className="text-xs text-gray-500">View and manage subscription statuses for Sponsora users.</p>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search User ID or Plan..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full md:w-56"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto border border-gray-200 rounded-xl">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-200">
                          <th className="p-3">Clerk User ID</th>
                          <th className="p-3">Plan Type</th>
                          <th className="p-3">Status</th>
                          <th className="p-3">Valid Until</th>
                          <th className="p-3">Apply Limit/Day</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredSubs.map((sub: any) => (
                          <tr key={sub.id} className="hover:bg-gray-50/50">
                            <td className="p-3 font-mono text-xs text-gray-600">{sub.user_id}</td>
                            <td className="p-3 font-semibold uppercase">{sub.plan_type.replace('_',' ')}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                sub.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                              }`}>
                                {sub.status}
                              </span>
                            </td>
                            <td className="p-3 text-xs text-gray-500">{new Date(sub.valid_until).toLocaleString()}</td>
                            <td className="p-3 font-bold text-gray-700">{sub.apply_limit_per_day}</td>
                          </tr>
                        ))}
                        {filteredSubs.length === 0 && (
                          <tr>
                            <td colSpan={5} className="p-6 text-center text-gray-400">No active subscriptions found matching search.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab 3: Discount Management */}
              {activeTab === "discounts" && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h1 className="text-2xl font-black tracking-tight">Discount Code Catalog</h1>
                    <p className="text-xs text-gray-500">Manage promotional coupons and influencers discount codes.</p>
                  </div>

                  <div className="overflow-x-auto border border-gray-200 rounded-xl">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-200">
                          <th className="p-3">Code</th>
                          <th className="p-3">Discount</th>
                          <th className="p-3">Uses / Max</th>
                          <th className="p-3">Expires At</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {data.discountCodes.map((code: any) => (
                          <tr key={code.id} className="hover:bg-gray-50/50">
                            <td className="p-3 font-mono font-bold text-gray-800 text-base">{code.code}</td>
                            <td className="p-3 font-bold text-green-600">{code.discount_percentage}% OFF</td>
                            <td className="p-3 text-gray-600">{code.uses_count || 0} / {code.max_uses}</td>
                            <td className="p-3 text-xs text-gray-500">{code.expires_at ? new Date(code.expires_at).toLocaleDateString() : "Never"}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                code.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                              }`}>
                                {code.is_active ? "Active" : "Disabled"}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => handleToggleDiscountCode(code.id, !code.is_active)}
                                className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                                  code.is_active ? "hover:bg-red-50 hover:text-red-600 text-gray-600" : "hover:bg-green-50 hover:text-green-600 text-gray-600"
                                }`}
                              >
                                {code.is_active ? "Deactivate" : "Activate"}
                              </button>
                            </td>
                          </tr>
                        ))}
                        {data.discountCodes.length === 0 && (
                          <tr>
                            <td colSpan={6} className="p-6 text-center text-gray-400">No discount codes created yet. Use panel on dashboard to create one.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab 4: User Audit Logs */}
              {activeTab === "audit" && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h1 className="text-2xl font-black tracking-tight">Security Audit Logs</h1>
                    <p className="text-xs text-gray-500">Review recent apply actions to inspect potential abuse or scraper behavior.</p>
                  </div>

                  <div className="overflow-x-auto border border-gray-200 rounded-xl">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-200">
                          <th className="p-3">User ID</th>
                          <th className="p-3">Internship ID</th>
                          <th className="p-3">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {data.auditLogs.map((log: any) => (
                          <tr key={log.id} className="hover:bg-gray-50/50">
                            <td className="p-3 font-mono text-xs text-gray-600">{log.user_id}</td>
                            <td className="p-3 font-mono text-xs text-gray-500">{log.internship_id}</td>
                            <td className="p-3 text-xs text-gray-500">{new Date(log.created_at).toLocaleString()}</td>
                          </tr>
                        ))}
                        {data.auditLogs.length === 0 && (
                          <tr>
                            <td colSpan={3} className="p-6 text-center text-gray-400">No application clicks recorded yet.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab 5: Feedback & Appeals */}
              {activeTab === "feedback" && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h1 className="text-2xl font-black tracking-tight">User Feedback & Appeals</h1>
                    <p className="text-xs text-gray-500">Respond to suspension appeals or general feedback from users.</p>
                  </div>

                  <div className="flex flex-col gap-4">
                    {data.feedbacks.map((f: any) => (
                      <div key={f.id} className="p-5 rounded-2xl border border-gray-200 bg-gray-50/30 flex flex-col gap-3">
                        <div className="flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-gray-500">Clerk User ID:</p>
                            <p className="font-mono text-xs text-gray-600 truncate">{f.user_id}</p>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold shrink-0 ${
                            f.admin_replied ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700 animate-pulse"
                          }`}>
                            {f.admin_replied ? "✓ Replied" : "Pending Action"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 bg-white p-3 rounded-xl border border-gray-100 whitespace-pre-line leading-relaxed">
                          {f.feedback_text}
                        </p>
                        <div className="flex justify-between items-center text-xs text-gray-400">
                          <span>Received: {new Date(f.created_at).toLocaleString()}</span>
                          <button
                            onClick={() => openReplyModal(f)}
                            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 transition-all text-xs"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            Email Reply
                          </button>
                        </div>
                      </div>
                    ))}
                    {data.feedbacks.length === 0 && (
                      <p className="p-6 text-center text-gray-400 border border-gray-200 rounded-2xl">No feedback or appeals found.</p>
                    )}
                  </div>

                  {/* Feedback Reply Modal Overlay */}
                  {replyFeedback && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 backdrop-blur-sm px-6">
                      <div className="bg-white border border-gray-200 rounded-3xl p-6 w-full max-w-lg shadow-2xl">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Mail className="w-5 h-5 text-blue-600" />
                          Compose Email Response
                        </h2>
                        <form onSubmit={handleSendReply} className="flex flex-col gap-4">
                          <div>
                            <label className="text-xs font-bold text-gray-500 block mb-1">To Email:</label>
                            <input
                              type="email"
                              required
                              placeholder="user@example.com (copy email address from clerk)"
                              value={replyEmail}
                              onChange={(e) => setReplyEmail(e.target.value)}
                              className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-gray-500 block mb-1">Subject:</label>
                            <input
                              type="text"
                              required
                              value={replySubject}
                              onChange={(e) => setReplySubject(e.target.value)}
                              className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-gray-500 block mb-1">Message Body:</label>
                            <textarea
                              rows={6}
                              required
                              value={replyBody}
                              onChange={(e) => setReplyBody(e.target.value)}
                              className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm font-medium resize-none leading-relaxed"
                            />
                          </div>

                          <div className="flex gap-3 mt-2">
                            <button
                              type="button"
                              onClick={() => setReplyFeedback(null)}
                              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={replyLoading}
                              className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-1.5 disabled:opacity-50"
                            >
                              {replyLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                              Send Email
                            </button>
                          </div>
                          {replyMsg && <p className="text-xs font-semibold text-blue-600 text-center">{replyMsg}</p>}
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
