"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  globalKPIs, stationsData, environmentHistory, alertsData, aiInsightsData 
} from './data/mockData';
import { 
  Activity, ArrowUpRight, ArrowDownRight, Wind, Thermometer, Battery, ThermometerSnowflake,
  Zap, Fuel, ShieldAlert, CheckCircle2, ChevronRight, AlertTriangle, Box
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

export default function OverviewPage() {
  const [envTab, setEnvTab] = useState('Temperature');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Antarctic Operations Command Center</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time digital twin monitoring for India's Antarctic research stations</p>
        </div>
        <div className="flex items-center gap-3 bg-[#0B152A] border border-slate-700/50 rounded-xl px-4 py-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></div>
          <span className="text-sm font-semibold text-white">System Operational</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {globalKPIs.map((kpi, idx) => (
          <div key={idx} className="bg-[#0B152A] border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-cyan-900/50 transition-colors">
            <h3 className="text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">{kpi.title}</h3>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-white leading-none">{kpi.value}</span>
              {kpi.trend === 'up' && <ArrowUpRight className={`w-4 h-4 ${kpi.status === 'warning' ? 'text-amber-400' : 'text-green-400'}`} />}
              {kpi.trend === 'down' && <ArrowDownRight className={`w-4 h-4 ${kpi.status === 'warning' ? 'text-amber-400' : 'text-green-400'}`} />}
            </div>
            <p className={`text-[10px] font-medium mt-2 ${kpi.status === 'warning' ? 'text-amber-400' : kpi.status === 'critical' ? 'text-red-400' : 'text-cyan-400'}`}>
              {kpi.subtitle}
            </p>
          </div>
        ))}
      </div>

      {/* Station Overview & Digital Twin Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Stations List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <MapIcon className="w-5 h-5 text-cyan-500" /> Research Stations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stationsData.map((station) => (
              <div key={station.id} className="bg-[#081021] border border-slate-800 rounded-2xl overflow-hidden group">
                <div className={`h-1 w-full ${station.status === 'operational' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">{station.name}</h3>
                      <p className="text-xs text-slate-500">{station.location}</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                      <Activity className="w-3 h-3 text-cyan-500" />
                      <span className="text-xs font-bold text-white">{station.health}%</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-950/50 flex items-center justify-center text-blue-400"><Thermometer className="w-4 h-4" /></div>
                      <div className="flex flex-col"><span className="text-[10px] text-slate-500 uppercase">Temp</span><span className="text-sm font-semibold text-slate-200">{station.temperature}°C</span></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-cyan-950/50 flex items-center justify-center text-cyan-400"><Wind className="w-4 h-4" /></div>
                      <div className="flex flex-col"><span className="text-[10px] text-slate-500 uppercase">Wind</span><span className="text-sm font-semibold text-slate-200">{station.windSpeed} km/h</span></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-yellow-950/50 flex items-center justify-center text-yellow-400"><Zap className="w-4 h-4" /></div>
                      <div className="flex flex-col"><span className="text-[10px] text-slate-500 uppercase">Power</span><span className="text-sm font-semibold text-slate-200">{station.powerGeneration} kW</span></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-orange-950/50 flex items-center justify-center text-orange-400"><Fuel className="w-4 h-4" /></div>
                      <div className="flex flex-col"><span className="text-[10px] text-slate-500 uppercase">Fuel</span><span className="text-sm font-semibold text-slate-200">{station.fuelLevel}%</span></div>
                    </div>
                  </div>
                  
                  <Link href={`/SIH-present/stations/${station.id}`} className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-sm font-medium text-white transition-colors">
                    View Station <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Twin Preview */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Box className="w-5 h-5 text-indigo-400" /> Digital Twin Preview
          </h2>
          <div className="bg-[#081021] border border-slate-800 rounded-2xl p-1 h-[270px] relative flex flex-col items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518557984649-7b161c230cfa?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:scale-105 transition-transform duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#081021] to-transparent"></div>
            
            {/* Mock overlay nodes */}
            <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80] animate-pulse"></div>
            <div className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24] animate-pulse"></div>
            <div className="absolute bottom-1/3 left-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse"></div>
            
            <div className="relative z-10 text-center mt-auto pb-6 w-full px-4">
              <Link href="/SIH-present/digital-twin" className="block w-full py-2.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white font-semibold text-sm backdrop-blur-sm transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                Open Full Digital Twin
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Environment Chart */}
        <div className="bg-[#0B152A] border border-slate-800/80 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <ThermometerSnowflake className="w-5 h-5 text-cyan-400" /> Environmental Conditions
            </h2>
            <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
              {['Temperature', 'Wind', 'Humidity'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setEnvTab(tab)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${envTab === tab ? 'bg-cyan-900/50 text-cyan-300' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={environmentHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMaitri" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBharati" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey={envTab === 'Temperature' ? 'temperatureMaitri' : envTab === 'Wind' ? 'windSpeedMaitri' : 'humidityMaitri'} name="Maitri" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorMaitri)" />
                <Area type="monotone" dataKey={envTab === 'Temperature' ? 'temperatureBharati' : envTab === 'Wind' ? 'windSpeedBharati' : 'humidityBharati'} name="Bharati" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorBharati)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights & Alerts */}
        <div className="space-y-6">
          {/* AI Insights */}
          <div className="bg-indigo-950/20 border border-indigo-900/30 rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full blur-2xl"></div>
            <h2 className="text-lg font-semibold text-indigo-300 flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5" /> AI Operational Copilot
            </h2>
            <div className="space-y-3">
              {aiInsightsData.slice(0, 2).map((insight) => (
                <div key={insight.id} className="bg-[#081021]/80 backdrop-blur-sm border border-indigo-900/40 p-4 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/50 px-2 py-0.5 rounded">{insight.category}</span>
                    <span className="text-xs font-mono text-slate-500">{insight.time}</span>
                  </div>
                  <p className="text-sm text-slate-200 mb-3">{insight.title}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-indigo-300"><span className="font-semibold text-slate-400">Action:</span> {insight.recommendation}</p>
                    <span className="text-xs font-bold text-green-400 bg-green-950/30 px-2 py-1 rounded border border-green-900/30">{insight.confidence}% Conf.</span>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/SIH-present/ai-insights" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium mt-4 inline-flex items-center transition-colors">
              View all AI insights <ChevronRight className="w-3 h-3 ml-1" />
            </Link>
          </div>

          {/* Alerts */}
          <div className="bg-[#0B152A] border border-slate-800/80 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-500" /> Recent Alerts
              </h2>
              <Link href="/SIH-present/alerts" className="text-xs text-slate-400 hover:text-white transition-colors">View All</Link>
            </div>
            <div className="space-y-2">
              {alertsData.slice(0, 3).map(alert => (
                <div key={alert.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                  <div className="flex items-center gap-3">
                    {alert.severity === 'CRITICAL' ? (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    ) : alert.severity === 'WARNING' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Activity className="w-4 h-4 text-blue-500" />
                    )}
                    <div>
                      <p className="text-xs font-medium text-white">{alert.message}</p>
                      <p className="text-[10px] text-slate-500">{alert.station} • {alert.system}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-500">{alert.detected}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

// Dummy icon for Map if missing in import
function MapIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
      <line x1="9" y1="3" x2="9" y2="21"></line>
      <line x1="15" y1="3" x2="15" y2="21"></line>
    </svg>
  );
}
