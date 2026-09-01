"use client";
import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Activity, CheckCircle2, Search, Filter } from 'lucide-react';
import { alertsData } from '../data/mockData';

export default function AlertsPage() {
  const [filter, setFilter] = useState('All');

  const filteredAlerts = filter === 'All' ? alertsData : alertsData.filter(a => a.severity === filter);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-amber-500" /> Alerts & Incident Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">Real-time anomaly detection and operational alerts.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#0B152A] border border-slate-800 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-slate-600 transition-all" onClick={() => setFilter('CRITICAL')}>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Critical</h3>
          <span className="text-3xl font-black text-red-500">1</span>
        </div>
        <div className="bg-[#0B152A] border border-slate-800 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-slate-600 transition-all" onClick={() => setFilter('WARNING')}>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Warning</h3>
          <span className="text-3xl font-black text-amber-500">2</span>
        </div>
        <div className="bg-[#0B152A] border border-slate-800 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-slate-600 transition-all" onClick={() => setFilter('INFO')}>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Information</h3>
          <span className="text-3xl font-black text-blue-500">1</span>
        </div>
        <div className="bg-[#0B152A] border border-slate-800 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-slate-600 transition-all" onClick={() => setFilter('All')}>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Active</h3>
          <span className="text-3xl font-black text-white">4</span>
        </div>
      </div>

      <div className="bg-[#0B152A] border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search alerts..." className="bg-slate-900 border border-slate-700 text-sm text-white rounded-lg py-1.5 pl-9 pr-4 focus:outline-none focus:border-cyan-700" />
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sm font-medium text-slate-300 rounded-lg transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#060D1A] text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4 font-semibold">Severity</th>
                <th className="p-4 font-semibold">Station</th>
                <th className="p-4 font-semibold">System</th>
                <th className="p-4 font-semibold">Message</th>
                <th className="p-4 font-semibold">Detected</th>
                <th className="p-4 font-semibold">Duration</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredAlerts.map(alert => (
                <tr key={alert.id} className="hover:bg-slate-900/50 transition-colors cursor-pointer group">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {alert.severity === 'CRITICAL' ? <AlertTriangle className="w-4 h-4 text-red-500" /> : alert.severity === 'WARNING' ? <AlertTriangle className="w-4 h-4 text-amber-500" /> : <Activity className="w-4 h-4 text-blue-500" />}
                      <span className={`text-xs font-bold ${alert.severity === 'CRITICAL' ? 'text-red-400' : alert.severity === 'WARNING' ? 'text-amber-400' : 'text-blue-400'}`}>{alert.severity}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-medium text-white">{alert.station}</td>
                  <td className="p-4 text-sm text-slate-300">{alert.system}</td>
                  <td className="p-4 text-sm text-slate-300">{alert.message}</td>
                  <td className="p-4 text-sm font-mono text-slate-400">{alert.detected}</td>
                  <td className="p-4 text-sm text-slate-400">{alert.duration}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${alert.status === 'Open' ? 'bg-amber-950/50 text-amber-500 border border-amber-900/50' : alert.status === 'Investigating' ? 'bg-blue-950/50 text-blue-500 border border-blue-900/50' : 'bg-green-950/50 text-green-500 border border-green-900/50'}`}>
                      {alert.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
