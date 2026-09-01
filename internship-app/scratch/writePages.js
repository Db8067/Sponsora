const fs = require('fs');
const path = require('path');

const writePage = (route, content) => {
  const filePath = path.join(__dirname, '../app/SIH-present', route, 'page.tsx');
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${route}`);
};

// 1. Stations
writePage('stations', `"use client";
import React from 'react';
import { stationsData } from '../data/mockData';
import { Map, Activity, Thermometer, Wind, Zap, Fuel, Users, Navigation } from 'lucide-react';

export default function StationsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Map className="w-8 h-8 text-cyan-400" /> Research Stations
          </h1>
          <p className="text-slate-400 mt-1">Detailed telemetry for Indian Antarctic facilities.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {stationsData.map(station => (
          <div key={station.id} className="bg-[#0B152A] border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">{station.name}</h2>
                <div className="flex items-center gap-2 mt-1 text-slate-400 text-sm">
                  <Navigation className="w-4 h-4" /> {station.coordinates} | {station.altitude}
                </div>
              </div>
              <span className={\`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider \${station.status === 'operational' ? 'bg-green-950/50 text-green-500 border border-green-900/50' : 'bg-amber-950/50 text-amber-500 border border-amber-900/50'}\`}>
                {station.status}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/50">
                <Thermometer className="w-5 h-5 text-cyan-400 mb-2" />
                <p className="text-xs text-slate-500 uppercase">Temp</p>
                <p className="text-lg font-bold text-white">{station.temperature}°C</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/50">
                <Wind className="w-5 h-5 text-blue-400 mb-2" />
                <p className="text-xs text-slate-500 uppercase">Wind</p>
                <p className="text-lg font-bold text-white">{station.windSpeed} km/h</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/50">
                <Zap className="w-5 h-5 text-yellow-400 mb-2" />
                <p className="text-xs text-slate-500 uppercase">Load</p>
                <p className="text-lg font-bold text-white">{station.powerConsumption} kW</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/50">
                <Users className="w-5 h-5 text-purple-400 mb-2" />
                <p className="text-xs text-slate-500 uppercase">Personnel</p>
                <p className="text-lg font-bold text-white">{station.personnelCount}</p>
              </div>
            </div>
            
            <div className="border-t border-slate-800 pt-4 text-sm text-slate-500 flex justify-between">
              <span>Commissioned: {station.commissioned}</span>
              <span>Last Sync: {new Date(station.lastSync).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`);

// 2. Environment
writePage('environment', `"use client";
import React from 'react';
import { environmentHistory } from '../data/mockData';
import { ThermometerSnowflake, CloudRain, Wind, Gauge } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function EnvironmentPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <ThermometerSnowflake className="w-8 h-8 text-blue-400" /> Environment Monitoring
          </h1>
          <p className="text-slate-400 mt-1">Real-time severe weather tracking for polar operations.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: 'Outside Temp', val: '-28.4°C', icon: ThermometerSnowflake, c: 'text-blue-400' },
          { title: 'Wind Speed', val: '32.5 km/h', icon: Wind, c: 'text-cyan-400' },
          { title: 'Air Pressure', val: '982 hPa', icon: Gauge, c: 'text-purple-400' },
          { title: 'Snow Accum.', val: '14 cm', icon: CloudRain, c: 'text-white' },
        ].map((k,i) => (
          <div key={i} className="bg-[#0B152A] border border-slate-800 rounded-xl p-4 flex items-center gap-4">
            <div className="p-3 bg-slate-900 rounded-lg"><k.icon className={\`w-6 h-6 \${k.c}\`} /></div>
            <div>
              <p className="text-xs text-slate-500 uppercase">{k.title}</p>
              <p className="text-xl font-bold text-white">{k.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0B152A] border border-slate-800 rounded-2xl p-6 h-[400px]">
        <h2 className="text-lg font-bold text-white mb-4">24-Hour Temperature Profile</h2>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={environmentHistory} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="time" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }} />
            <Area type="monotone" dataKey="temperatureMaitri" name="Maitri °C" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
`);

// 3. Energy
writePage('energy', `"use client";
import React from 'react';
import { energyConsumptionBreakdown, energyForecast } from '../data/mockData';
import { Zap, Battery, Power } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function EnergyPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Zap className="w-8 h-8 text-yellow-400" /> Energy & Power Management
        </h1>
        <p className="text-slate-400 mt-1">Microgrid load balancing and generator analytics.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0B152A] border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">Real-Time Load Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={energyConsumptionBreakdown} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
                  {energyConsumptionBreakdown.map((entry, index) => (
                    <Cell key={\`cell-\${index}\`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {energyConsumptionBreakdown.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs text-slate-300">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0B152A] border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">7-Day Demand vs Generation Forecast</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={energyForecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="day" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 50', 'dataMax + 50']} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="expectedDemand" name="Demand (kW)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="expectedGeneration" name="Generation (kW)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
`);

// 4. Equipment
writePage('equipment', `"use client";
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
                      <div className={\`h-2 rounded-full \${eq.health > 80 ? 'bg-green-500' : eq.health > 50 ? 'bg-amber-500' : 'bg-red-500'}\`} style={{ width: \`\${eq.health}%\` }}></div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{eq.health}%</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-slate-300">{eq.runtime.toLocaleString()}</td>
                <td className="p-4 text-sm text-slate-300">{eq.vibration}</td>
                <td className="p-4">
                  <span className={\`text-sm font-bold \${eq.failProb > 50 ? 'text-red-400' : eq.failProb > 15 ? 'text-amber-400' : 'text-green-400'}\`}>{eq.failProb}%</span>
                </td>
                <td className="p-4">
                  <span className={\`px-2 py-1 rounded text-[10px] font-bold uppercase \${eq.status === 'Healthy' ? 'bg-green-950/50 text-green-500 border border-green-900' : 'bg-amber-950/50 text-amber-500 border border-amber-900'}\`}>{eq.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`);

// 5. Logistics
writePage('logistics', `"use client";
import React from 'react';
import { logisticsData } from '../data/mockData';
import { Package, Truck, Ship, AlertCircle } from 'lucide-react';

export default function LogisticsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Package className="w-8 h-8 text-orange-400" /> Logistics & Resource Management
        </h1>
        <p className="text-slate-400 mt-1">Inventory tracking for isolated winter-over operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {logisticsData.map(item => (
          <div key={item.id} className="bg-[#0B152A] border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-slate-800"></div>
            <div className={\`absolute top-0 left-0 w-1 h-full \${item.status === 'Critical' ? 'bg-red-500' : item.status === 'Warning' ? 'bg-amber-500' : 'bg-green-500'}\`}></div>
            
            <div className="flex justify-between items-start mb-4 pl-3">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">{item.category}</p>
                <h3 className="text-lg font-bold text-white leading-tight">{item.item}</h3>
              </div>
              {item.status !== 'Healthy' && <AlertCircle className={\`w-5 h-5 \${item.status === 'Critical' ? 'text-red-500' : 'text-amber-500'}\`} />}
            </div>

            <div className="pl-3 mb-4">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Current Stock</span>
                <span>{item.current.toLocaleString()} / {item.capacity.toLocaleString()} {item.unit}</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2.5">
                <div className={\`h-2.5 rounded-full \${item.status === 'Critical' ? 'bg-red-500' : item.status === 'Warning' ? 'bg-amber-500' : 'bg-cyan-500'}\`} style={{ width: \`\${(item.current / item.capacity) * 100}%\` }}></div>
              </div>
            </div>

            <div className="pl-3 flex items-center justify-between bg-slate-900/50 p-2 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400">Estimated Runway</span>
              <span className={\`text-sm font-bold \${item.daysRemaining < 30 ? 'text-red-400' : 'text-white'}\`}>{item.daysRemaining} Days</span>
            </div>
            
            {item.note && (
              <p className="pl-3 mt-3 text-[10px] text-red-400 font-semibold uppercase">* {item.note}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
`);

// 6. Analytics & 8. Reports can be simple for now
writePage('analytics', `"use client";
import React from 'react';
import { LineChart, BarChart } from 'lucide-react';
export default function Analytics() { return <div className="p-10 text-white"><h1 className="text-3xl font-bold flex items-center gap-3"><LineChart className="text-cyan-400 w-8 h-8"/> Operational Analytics</h1><p className="mt-4 text-slate-400">Advanced cross-domain correlations and historical performance metrics are processing...</p></div>; }
`);
writePage('reports', `"use client";
import React from 'react';
import { FileText } from 'lucide-react';
export default function Reports() { return <div className="p-10 text-white"><h1 className="text-3xl font-bold flex items-center gap-3"><FileText className="text-pink-400 w-8 h-8"/> Automated Reports</h1><p className="mt-4 text-slate-400">Ministry of Earth Sciences (MoES) formatted compliance reports are generated here daily.</p></div>; }
`);

// 7. AI Insights (with unique feature)
writePage('ai-insights', `"use client";
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
            <div key={insight.id} className={\`border rounded-2xl p-6 relative overflow-hidden transition-all \${isResolved ? 'bg-green-950/20 border-green-900/50' : 'bg-[#0B152A] border-indigo-900/40'}\`}>
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
                      <span className={\`text-sm font-bold \${insight.risk === 'HIGH' ? 'text-red-400' : 'text-amber-400'}\`}>{insight.risk}</span>
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
`);
