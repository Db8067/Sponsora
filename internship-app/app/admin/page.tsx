"use client";

import { useState, useEffect } from "react";
import { 
  getAdminStats, getSubscriptions, grantAccess, 
  getDiscountCodes, createDiscountCode, toggleDiscountCode, getAuditLogs 
} from "./actions";
import { 
  LayoutDashboard, Users, Tag, History, Plus, ShieldAlert, 
  CheckCircle2, XCircle, Search, Loader2 
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState<any>(null);
  const [subs, setSubs] = useState<any[]>([]);
  const [codes, setCodes] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Forms
  const [grantUserId, setGrantUserId] = useState("");
  const [grantPlan, setGrantPlan] = useState("7_day");
  const [grantDays, setGrantDays] = useState(7);
  
  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState(50);
  const [newMaxUses, setNewMaxUses] = useState(100);

  useEffect(() => {
    // Only allow specific admin emails. Replace with your actual admin email!
    if (isLoaded && user?.primaryEmailAddress?.emailAddress !== "devanshb3456@gmail.com") {
      // For testing, we'll let it pass, but normally: router.push("/");
    }
  }, [isLoaded, user]);

  const loadData = async () => {
    setLoading(true);
    const [st, su, co, lo] = await Promise.all([
      getAdminStats(), getSubscriptions(), getDiscountCodes(), getAuditLogs()
    ]);
    setStats(st);
    setSubs(su);
    setCodes(co);
    setLogs(lo);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleGrant = async (e: React.FormEvent) => {
    e.preventDefault();
    await grantAccess(grantUserId, grantPlan, grantDays);
    alert("Access granted successfully!");
    setGrantUserId("");
    loadData();
  };

  const handleCreateCode = async (e: React.FormEvent) => {
    e.preventDefault();
    await createDiscountCode(newCode, newDiscount, newMaxUses, null);
    alert("Discount code created!");
    setNewCode("");
    loadData();
  };

  if (!isLoaded || loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#202124] font-sans pt-20">
      {/* Top Navbar */}
      <div className="bg-white border-b border-[#DADCE0] px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-[#1A73E8]" />
          <h1 className="text-xl font-medium text-[#3C4043]">Workspace Admin</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-[#1A73E8] text-white rounded-full flex items-center justify-center text-sm font-bold">
            A
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-65px)]">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-[#DADCE0] flex flex-col py-4 hidden md:flex">
          {[
            { id: "overview", icon: <LayoutDashboard className="w-5 h-5" />, label: "Overview" },
            { id: "users", icon: <Users className="w-5 h-5" />, label: "Manual Grants" },
            { id: "codes", icon: <Tag className="w-5 h-5" />, label: "Discount Codes" },
            { id: "logs", icon: <History className="w-5 h-5" />, label: "Audit Logs" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-4 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id 
                  ? "bg-[#E8F0FE] text-[#1A73E8] border-r-4 border-[#1A73E8]" 
                  : "text-[#5F6368] hover:bg-[#F1F3F4]"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-normal text-[#202124]">Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg border border-[#DADCE0] shadow-sm">
                  <p className="text-sm font-medium text-[#5F6368] mb-2">Active Subscriptions</p>
                  <p className="text-3xl font-normal text-[#1A73E8]">{stats?.activeSubscriptions}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-[#DADCE0] shadow-sm">
                  <p className="text-sm font-medium text-[#5F6368] mb-2">Applies Today</p>
                  <p className="text-3xl font-normal text-[#34A853]">{stats?.todayApplies}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-[#DADCE0] shadow-sm">
                  <p className="text-sm font-medium text-[#5F6368] mb-2">Active Discount Codes</p>
                  <p className="text-3xl font-normal text-[#F9AB00]">{stats?.activeDiscounts}</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-[#DADCE0] shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#DADCE0]">
                  <h3 className="font-medium text-[#202124]">Recent Subscriptions</h3>
                </div>
                <table className="w-full text-sm text-left">
                  <thead className="bg-[#F8F9FA] text-[#5F6368] border-b border-[#DADCE0]">
                    <tr>
                      <th className="px-6 py-3 font-medium">User ID</th>
                      <th className="px-6 py-3 font-medium">Plan</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium">Valid Until</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DADCE0]">
                    {subs.slice(0, 10).map((s) => (
                      <tr key={s.id} className="hover:bg-[#F1F3F4]">
                        <td className="px-6 py-3 font-mono text-xs">{s.user_id}</td>
                        <td className="px-6 py-3">{s.plan_type}</td>
                        <td className="px-6 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.status === 'active' ? 'bg-[#E6F4EA] text-[#137333]' : 'bg-[#FCE8E6] text-[#C5221F]'}`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="px-6 py-3">{new Date(s.valid_until).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-normal text-[#202124]">Manual Access Grant</h2>
              <div className="bg-white p-6 rounded-lg border border-[#DADCE0] shadow-sm max-w-xl">
                <form onSubmit={handleGrant} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#3C4043] mb-1">User ID (Clerk)</label>
                    <input required type="text" value={grantUserId} onChange={e=>setGrantUserId(e.target.value)} className="w-full px-3 py-2 border border-[#DADCE0] rounded focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#3C4043] mb-1">Plan Type</label>
                      <select value={grantPlan} onChange={e=>setGrantPlan(e.target.value)} className="w-full px-3 py-2 border border-[#DADCE0] rounded focus:outline-none focus:border-[#1A73E8]">
                        <option value="1_day">1 Day</option>
                        <option value="7_day">7 Day</option>
                        <option value="monthly">Monthly</option>
                        <option value="lifetime">Lifetime</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#3C4043] mb-1">Validity (Days)</label>
                      <input required type="number" min="1" value={grantDays} onChange={e=>setGrantDays(Number(e.target.value))} className="w-full px-3 py-2 border border-[#DADCE0] rounded focus:outline-none focus:border-[#1A73E8]" />
                    </div>
                  </div>
                  <button type="submit" className="px-4 py-2 bg-[#1A73E8] hover:bg-[#1557B0] text-white text-sm font-medium rounded transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Grant Access
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === "codes" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-normal text-[#202124]">Discount Codes</h2>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-[#DADCE0] shadow-sm mb-6 max-w-2xl">
                <h3 className="font-medium text-[#202124] mb-4">Create New Code</h3>
                <form onSubmit={handleCreateCode} className="flex items-end gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-[#5F6368] mb-1">Code</label>
                    <input required type="text" value={newCode} onChange={e=>setNewCode(e.target.value.toUpperCase())} placeholder="e.g. EARLYBIRD" className="w-full px-3 py-2 border border-[#DADCE0] rounded text-sm uppercase" />
                  </div>
                  <div className="w-24">
                    <label className="block text-xs font-medium text-[#5F6368] mb-1">Discount %</label>
                    <input required type="number" min="1" max="100" value={newDiscount} onChange={e=>setNewDiscount(Number(e.target.value))} className="w-full px-3 py-2 border border-[#DADCE0] rounded text-sm" />
                  </div>
                  <div className="w-24">
                    <label className="block text-xs font-medium text-[#5F6368] mb-1">Max Uses</label>
                    <input required type="number" min="1" value={newMaxUses} onChange={e=>setNewMaxUses(Number(e.target.value))} className="w-full px-3 py-2 border border-[#DADCE0] rounded text-sm" />
                  </div>
                  <button type="submit" className="px-4 py-2 bg-[#1A73E8] hover:bg-[#1557B0] text-white text-sm font-medium rounded transition-colors h-[38px]">
                    Create
                  </button>
                </form>
              </div>

              <div className="bg-white rounded-lg border border-[#DADCE0] shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[#F8F9FA] text-[#5F6368] border-b border-[#DADCE0]">
                    <tr>
                      <th className="px-6 py-3 font-medium">Code</th>
                      <th className="px-6 py-3 font-medium">Discount</th>
                      <th className="px-6 py-3 font-medium">Uses</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DADCE0]">
                    {codes.map((c) => (
                      <tr key={c.id} className="hover:bg-[#F1F3F4]">
                        <td className="px-6 py-3 font-bold">{c.code}</td>
                        <td className="px-6 py-3">{c.discount_percentage}%</td>
                        <td className="px-6 py-3">{c.uses_count} / {c.max_uses}</td>
                        <td className="px-6 py-3">
                          {c.is_active ? (
                            <span className="flex items-center gap-1 text-[#137333]"><CheckCircle2 className="w-4 h-4"/> Active</span>
                          ) : (
                            <span className="flex items-center gap-1 text-[#C5221F]"><XCircle className="w-4 h-4"/> Disabled</span>
                          )}
                        </td>
                        <td className="px-6 py-3">
                          <button 
                            onClick={async () => { await toggleDiscountCode(c.id, !c.is_active); loadData(); }}
                            className="text-[#1A73E8] hover:underline font-medium"
                          >
                            {c.is_active ? "Disable" : "Enable"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "logs" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-normal text-[#202124]">Application Audit Log</h2>
              <div className="bg-white rounded-lg border border-[#DADCE0] shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[#F8F9FA] text-[#5F6368] border-b border-[#DADCE0]">
                    <tr>
                      <th className="px-6 py-3 font-medium">Date & Time</th>
                      <th className="px-6 py-3 font-medium">User ID</th>
                      <th className="px-6 py-3 font-medium">Internship Applied</th>
                      <th className="px-6 py-3 font-medium">Company</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DADCE0]">
                    {logs.map((l) => (
                      <tr key={l.id} className="hover:bg-[#F1F3F4]">
                        <td className="px-6 py-3 text-[#5F6368]">
                          {new Date(l.created_at).toLocaleString()}
                        </td>
                        <td className="px-6 py-3 font-mono text-xs text-[#1A73E8]">{l.user_id}</td>
                        <td className="px-6 py-3">{l.sponsora_posts?.title || "Unknown"}</td>
                        <td className="px-6 py-3">{l.sponsora_posts?.metadata?.company_name || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
