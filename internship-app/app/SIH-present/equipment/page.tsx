"use client";
import React from 'react';
import { equipmentData } from '../data/mockData';
import { Cpu, Settings2, ShieldAlert } from 'lucide-react';

export default function EquipmentPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Cpu className="w-8 h-8 text-indigo-400" /> Equipment & Predictive Maintenance
        </h1>
        <p className="text-slate-400 mt-1">IoT sensor telemetry and AI health scores for mission-critical hardware.</p>
      </div>
      
      <div className="bg-[#0B152A] border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#060D1A] border-b border-slate-800 text-xs uppercase text-slate-500">
            <tr>
              <th className="p-4">Equipment / ID</th>
              <th className="p-4">Station</th>
              <th className="p-4">Health</th>
              <th className="p-4">Runtime (Hrs)</th>
              <th className="p-4">Vibration (mm/s)</th>
              <th className="p-4">Fail Prob.</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {equipmentData.map(eq => (
              <tr key={eq.id} className="hover:bg-slate-900/50 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-white text-sm">{eq.name}</p>
                  <p className="text-xs text-slate-500 font-mono">{eq.id}</p>
                </td>
                <td className="p-4 text-sm text-slate-300">{eq.station}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-slate-800 rounded-full h-2 max-w-[80px]">
                      <div className={`h-2 rounded-full ${eq.health > 80 ? 'bg-green-500' : eq.health > 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${eq.health}%` }}></div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{eq.health}%</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-slate-300">{eq.runtime.toLocaleString()}</td>
                <td className="p-4 text-sm text-slate-300">{eq.vibration}</td>
                <td className="p-4">
                  <span className={`text-sm font-bold ${eq.failProb > 50 ? 'text-red-400' : eq.failProb > 15 ? 'text-amber-400' : 'text-green-400'}`}>{eq.failProb}%</span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${eq.status === 'Healthy' ? 'bg-green-950/50 text-green-500 border border-green-900' : 'bg-amber-950/50 text-amber-500 border border-amber-900'}`}>{eq.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
