"use client";
import React, { useState } from 'react';
import { Activity, Box, Search, Layers, Zap, Thermometer, Radio, Cpu, Plus, Minus, Maximize, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function DigitalTwinPage() {
  const [activeLayer, setActiveLayer] = useState('All');
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const nodes = [
    { id: 'main', name: 'Main Research Building', type: 'Infrastructure', x: 50, y: 40, status: 'Healthy', health: 96, temp: 21, lastMaint: '15 Aug 2026' },
    { id: 'gen1', name: 'Power Plant (Gen #01)', type: 'Energy', x: 25, y: 30, status: 'Healthy', health: 98, temp: 75, lastMaint: '01 Aug 2026' },
    { id: 'gen2', name: 'Power Plant (Gen #02)', type: 'Energy', x: 25, y: 50, status: 'Warning', health: 68, temp: 83, lastMaint: '12 Jul 2026', warning: 'High vibration detected' },
    { id: 'fuel', name: 'Fuel Storage Facility', type: 'Logistics', x: 15, y: 70, status: 'Healthy', health: 92, temp: -15, lastMaint: '28 Jul 2026' },
    { id: 'comm', name: 'Satellite Uplink', type: 'Communication', x: 70, y: 20, status: 'Healthy', health: 99, temp: -20, lastMaint: '10 Aug 2026' },
    { id: 'weather', name: 'Meteorological Station', type: 'Environment', x: 80, y: 60, status: 'Healthy', health: 94, temp: -28, lastMaint: '05 Aug 2026' },
    { id: 'lab', name: 'Ice Core Laboratory', type: 'Infrastructure', x: 65, y: 40, status: 'Healthy', health: 95, temp: -10, lastMaint: '18 Aug 2026' },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10 flex flex-col h-[calc(100vh-120px)]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Box className="w-8 h-8 text-indigo-400" /> Digital Twin
          </h1>
          <p className="text-sm text-slate-400 mt-1">Interactive 2D spatial representation of Maitri Station infrastructure.</p>
        </div>
        <div className="flex gap-2">
          {['All', 'Infrastructure', 'Energy', 'Environment', 'Logistics'].map(layer => (
            <button 
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${activeLayer === layer ? 'bg-indigo-900/50 text-indigo-300 border-indigo-700/50 shadow-[0_0_10px_rgba(79,70,229,0.2)]' : 'bg-[#0B152A] text-slate-400 border-slate-700 hover:bg-slate-800'}`}
            >
              {layer}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Main Viewer */}
        <div className="flex-1 bg-[#081021] border border-slate-800 rounded-2xl relative overflow-hidden flex flex-col">
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 bg-[#050A15]/80 backdrop-blur-sm p-1.5 rounded-xl border border-slate-800">
            <button className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"><Plus className="w-4 h-4" /></button>
            <button className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"><Minus className="w-4 h-4" /></button>
            <button className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white mt-2"><Maximize className="w-4 h-4" /></button>
          </div>

          <div className="flex-1 relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-10">
            {/* Base Grid/Ice Texture */}
            <div className="absolute inset-0 bg-slate-900/40"></div>
            
            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path d="M 25% 40% L 50% 40%" stroke="#1e293b" strokeWidth="2" strokeDasharray="5,5" />
              <path d="M 25% 60% L 50% 40%" stroke="#1e293b" strokeWidth="2" strokeDasharray="5,5" />
              <path d="M 70% 20% L 50% 40%" stroke="#1e293b" strokeWidth="2" strokeDasharray="5,5" />
              <path d="M 80% 60% L 65% 40%" stroke="#1e293b" strokeWidth="2" strokeDasharray="5,5" />
            </svg>

            {/* Nodes */}
            {nodes.filter(n => activeLayer === 'All' || n.type === activeLayer).map(node => (
              <button 
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-xl flex items-center justify-center cursor-pointer transition-all ${selectedNode?.id === node.id ? 'scale-110 z-20 ring-2 ring-white' : 'hover:scale-105 z-10'}`}
                style={{ left: `${node.x}%`, top: `${node.y}%`, backgroundColor: node.status === 'Healthy' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(69, 26, 3, 0.9)', borderColor: node.status === 'Healthy' ? '#06b6d4' : '#f59e0b', borderWidth: '1px' }}
              >
                {node.status === 'Warning' && <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-ping"></span>}
                {node.status === 'Warning' && <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full"></span>}
                
                {node.type === 'Energy' && <Zap className={`w-5 h-5 ${node.status === 'Warning' ? 'text-amber-500' : 'text-cyan-400'}`} />}
                {node.type === 'Infrastructure' && <Box className="w-5 h-5 text-indigo-400" />}
                {node.type === 'Environment' && <Thermometer className="w-5 h-5 text-emerald-400" />}
                {node.type === 'Communication' && <Radio className="w-5 h-5 text-purple-400" />}
                {node.type === 'Logistics' && <Activity className="w-5 h-5 text-blue-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Inspector Panel */}
        <div className="w-80 bg-[#0B152A] border border-slate-800 rounded-2xl p-5 flex flex-col shrink-0 overflow-y-auto">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">System Inspector</h2>
          
          {selectedNode ? (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${selectedNode.status === 'Warning' ? 'bg-amber-950/50 text-amber-500 border border-amber-900/50' : 'bg-green-950/50 text-green-500 border border-green-900/50'}`}>
                    {selectedNode.status}
                  </span>
                  <span className="text-xs text-slate-500">{selectedNode.type}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{selectedNode.name}</h3>
              </div>

              {selectedNode.warning && (
                <div className="bg-amber-950/30 border border-amber-900/50 rounded-xl p-3 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-amber-400">Active Alert</p>
                    <p className="text-xs text-amber-200/70 mt-1">{selectedNode.warning}</p>
                    <button className="mt-2 text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 px-3 py-1.5 rounded-lg transition-colors">Acknowledge</button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold mb-1">Health Score</p>
                  <p className="text-xl font-bold text-white">{selectedNode.health}%</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold mb-1">Temperature</p>
                  <p className="text-xl font-bold text-white">{selectedNode.temp}°C</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">AI Diagnostics</h4>
                <div className="bg-indigo-950/20 border border-indigo-900/30 rounded-xl p-3">
                  {selectedNode.status === 'Warning' ? (
                    <p className="text-xs text-slate-300 leading-relaxed">
                      AI prediction engine detects a <span className="text-amber-400 font-bold">72% probability of failure</span> within the next 5 days due to mounting vibration harmonics. Immediate inspection recommended.
                    </p>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <p className="text-xs text-slate-300">All parameters within normal operational baseline. No anomalies detected.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <p className="text-xs text-slate-500 mb-1">Last Maintenance</p>
                <p className="text-sm font-medium text-slate-200">{selectedNode.lastMaint}</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <Cpu className="w-12 h-12 text-slate-700 mb-4" />
              <p className="text-slate-500 text-sm">Select a node in the digital twin view to inspect its real-time telemetry and AI diagnostics.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
