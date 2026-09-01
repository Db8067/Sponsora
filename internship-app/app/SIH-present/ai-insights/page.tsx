"use client";
import React, { useState } from 'react';
import { aiInsightsData } from '../data/mockData';
import { BrainCircuit, Play, CheckCircle, RefreshCcw, Zap } from 'lucide-react';

export default function AIInsightsPage() {
  const [resolvingId, setResolvingId] = useState<number | null>(null);
  const [resolvedIds, setResolvedIds] = useState<number[]>([]);

  const handleAutoResolve = (id: number) => {
    setResolvingId(id);
    setTimeout(() => {
      setResolvedIds(prev => [...prev, id]);
      setResolvingId(null);
    }, 2500); // simulate AI doing work
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <BrainCircuit className="w-8 h-8 text-fuchsia-400" /> AI Decision Support & Self-Healing
        </h1>
        <p className="text-slate-400 mt-1">Proprietary AI model analyzing 1.2M data points/sec for autonomous infrastructure balancing.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {aiInsightsData.map(insight => {
          const isResolving = resolvingId === insight.id;
          const isResolved = resolvedIds.includes(insight.id);

          return (
            <div key={insight.id} className={`border rounded-2xl p-6 relative overflow-hidden transition-all ${isResolved ? 'bg-green-950/20 border-green-900/50' : 'bg-[#0B152A] border-indigo-900/40'}`}>
              {/* background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-1 bg-indigo-950/50 text-indigo-400 border border-indigo-900/50 rounded text-[10px] font-bold uppercase tracking-widest">{insight.category}</span>
                    <span className="text-xs font-mono text-slate-500">{insight.time}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{insight.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    <span className="font-semibold text-indigo-300">AI Diagnosis:</span> {insight.recommendation}
                  </p>
                  
                  <div className="flex gap-4 items-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-slate-500 font-semibold mb-1">Confidence</span>
                      <span className="text-sm font-bold text-green-400">{insight.confidence}%</span>
                    </div>
                    <div className="w-px h-8 bg-slate-800"></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-slate-500 font-semibold mb-1">Risk Level</span>
                      <span className={`text-sm font-bold ${insight.risk === 'HIGH' ? 'text-red-400' : 'text-amber-400'}`}>{insight.risk}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-auto min-w-[250px] bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center">
                  <h4 className="text-xs uppercase text-slate-400 font-bold mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" /> Autonomous Action
                  </h4>
                  
                  {isResolved ? (
                    <div className="flex flex-col items-center text-green-400 animate-in fade-in zoom-in">
                      <CheckCircle className="w-8 h-8 mb-2" />
                      <span className="text-sm font-bold">Action Executed</span>
                      <span className="text-[10px] text-green-500/70 mt-1">System rebalanced successfully</span>
                    </div>
                  ) : isResolving ? (
                    <div className="flex flex-col items-center text-indigo-400">
                      <RefreshCcw className="w-8 h-8 mb-2 animate-spin" />
                      <span className="text-sm font-bold">Executing Routine...</span>
                      <span className="text-[10px] text-indigo-500/70 mt-1">Re-routing power protocols</span>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleAutoResolve(insight.id)}
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" /> Execute AI Solution
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
