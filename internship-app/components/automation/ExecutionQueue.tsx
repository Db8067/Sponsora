"use client";
import React from 'react';
import { 
  Play, Pause, Square, RotateCcw, Activity, 
  CheckCircle2, AlertTriangle, ShieldCheck, Zap, Globe
} from 'lucide-react';

interface ExecutionQueueProps {
  total: number;
  completed: number;
  inProgress: boolean;
  isPaused: boolean;
  currentQuery: { company: string; targetTitle: string; step: string } | null;
  foundCount: number;
  fallbackCount: number;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onRetryFailed: () => void;
}

export default function ExecutionQueue({
  total,
  completed,
  inProgress,
  isPaused,
  currentQuery,
  foundCount,
  fallbackCount,
  onPause,
  onResume,
  onStop,
  onRetryFailed,
}: ExecutionQueueProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="w-full bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      
      {/* Subtle background radar beam effect while running */}
      {inProgress && !isPaused && (
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      )}

      {/* Top Bar: Live Status & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            inProgress && !isPaused 
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30 animate-pulse' 
              : isPaused 
              ? 'bg-amber-600 text-white' 
              : 'bg-slate-800 text-slate-400'
          }`}>
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">Automated Batch Search Queue</h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                inProgress && !isPaused
                  ? 'bg-cyan-950 text-cyan-400 border border-cyan-800 animate-pulse'
                  : isPaused
                  ? 'bg-amber-950 text-amber-400 border border-amber-800'
                  : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
              }`}>
                {inProgress && !isPaused ? 'Searching Active' : isPaused ? 'Paused' : 'Queue Idle / Completed'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Processing {completed} of {total} records with intelligent anti-blocking delay pacing
            </p>
          </div>
        </div>

        {/* Queue Control Buttons */}
        <div className="flex items-center gap-2">
          {inProgress ? (
            <>
              {isPaused ? (
                <button
                  onClick={onResume}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-lg shadow-cyan-600/30"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Resume Search
                </button>
              ) : (
                <button
                  onClick={onPause}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-lg shadow-amber-600/30"
                >
                  <Pause className="w-3.5 h-3.5 fill-current" /> Pause Queue
                </button>
              )}
              <button
                onClick={onStop}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/80 text-slate-300 hover:text-rose-300 border border-slate-700 text-xs font-bold transition-all"
                title="Stop Queue"
              >
                <Square className="w-3.5 h-3.5" /> Stop
              </button>
            </>
          ) : fallbackCount > 0 ? (
            <button
              onClick={onRetryFailed}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800 text-xs font-bold transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retry Fallbacks ({fallbackCount})
            </button>
          ) : null}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full mb-6">
        <div className="flex justify-between items-center text-xs font-bold mb-2">
          <span className="text-slate-300 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            Batch Progress
          </span>
          <span className="text-cyan-400 font-mono text-sm">{percentage}%</span>
        </div>
        <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Real-time Telemetry Animation Box */}
      {inProgress && currentQuery && (
        <div className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/20 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Globe className="w-5 h-5 text-cyan-400 animate-spin" />
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur animate-ping" />
            </div>
            <div>
              <p className="text-xs font-bold text-white flex items-center gap-2">
                <span>Looking up:</span>
                <span className="text-cyan-300 font-semibold">{currentQuery.company}</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-300 font-normal">"{currentQuery.targetTitle}"</span>
              </p>
              <p className="text-[11px] text-cyan-400/90 font-mono mt-0.5">
                {currentQuery.step}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium px-3 py-1 rounded-lg bg-slate-900 border border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Priority 1: DuckDuckGo Free Proxy Active
          </div>
        </div>
      )}

      {/* Statistics Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total In Queue</p>
          <p className="text-xl font-black text-white mt-1">{total}</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Processed</p>
          <p className="text-xl font-black text-cyan-400 mt-1">{completed}</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Profiles Verified</p>
          <p className="text-xl font-black text-emerald-400 mt-1">{foundCount}</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Fallbacks / Missing</p>
          <p className="text-xl font-black text-amber-400 mt-1">{fallbackCount}</p>
        </div>
      </div>

    </div>
  );
}
