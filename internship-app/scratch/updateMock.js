const fs = require('fs');
const path = require('path');

const fileData = `// app/SIH-present/data/mockData.ts

export interface Station {
  id: string;
  name: string;
  status: 'operational' | 'warning' | 'critical';
  health: number;
  temperature: number;
  windSpeed: number;
  powerGeneration: number;
  powerConsumption: number;
  fuelLevel: number;
  personnelCount: number;
  location: string;
  lastSync: string;
  commissioned: string;
  altitude: string;
  coordinates: string;
}

export const stationsData: Station[] = [
  {
    id: "maitri",
    name: "Maitri Research Station",
    status: "operational",
    health: 96,
    temperature: -28.4,
    windSpeed: 32.5,
    powerGeneration: 418,
    powerConsumption: 312,
    fuelLevel: 72,
    personnelCount: 24,
    location: "Schirmacher Oasis, Queen Maud Land",
    lastSync: new Date().toISOString(),
    commissioned: "1989",
    altitude: "50 meters (160 ft)",
    coordinates: "70°45′58″S 11°43′56″E"
  },
  {
    id: "bharati",
    name: "Bharati Research Station",
    status: "warning",
    health: 93,
    temperature: -24.7,
    windSpeed: 28.1,
    powerGeneration: 391,
    powerConsumption: 380,
    fuelLevel: 81,
    personnelCount: 18,
    location: "Larsmann Hills, Princess Elizabeth Land",
    lastSync: new Date().toISOString(),
    commissioned: "2012",
    altitude: "35 meters (115 ft)",
    coordinates: "69°24′28″S 76°11′14″E"
  }
];

export interface KPI {
  title: string;
  value: string | number;
  subtitle: string;
  trend?: 'up' | 'down' | 'stable';
  status?: 'good' | 'warning' | 'critical';
}

export const globalKPIs: KPI[] = [
  { title: "Network Status", value: "96%", subtitle: "Uplink Stable", trend: 'up', status: 'good' },
  { title: "Active Incidents", value: "04", subtitle: "1 Critical", trend: 'up', status: 'warning' },
  { title: "Grid Load", value: "87%", subtitle: "Nominal", trend: 'stable', status: 'good' },
  { title: "Equipment Health", value: "94%", subtitle: "1 Sensor Offline", trend: 'down', status: 'good' },
  { title: "Avg Exterior Temp", value: "-26.5°C", subtitle: "Dropping", trend: 'down', status: 'warning' },
  { title: "Blizzard Warning", value: "LOW", subtitle: "Next 48 Hrs", trend: 'stable', status: 'good' },
];

export const environmentHistory = Array.from({ length: 24 }).map((_, i) => ({
  time: \`\${String(i).padStart(2, '0')}:00\`,
  temperatureMaitri: -25 - Math.random() * 5,
  temperatureBharati: -22 - Math.random() * 4,
  windSpeedMaitri: 20 + Math.random() * 15,
  windSpeedBharati: 15 + Math.random() * 20,
  humidityMaitri: 40 + Math.random() * 10,
  humidityBharati: 45 + Math.random() * 10,
  snowAccumulationMaitri: 5 + Math.random() * 2,
  snowAccumulationBharati: 8 + Math.random() * 3,
  airPressureMaitri: 980 + Math.random() * 10,
  airPressureBharati: 985 + Math.random() * 8,
}));

export const alertsData = [
  { id: 1, severity: 'CRITICAL', station: 'Maitri', system: 'Trigeneration Plant #1', message: 'CHP engine vibration harmonic resonance detected.', detected: '07:18', status: 'Open', duration: '42m' },
  { id: 2, severity: 'WARNING', station: 'Bharati', system: 'Microgrid Controller', message: 'Phase imbalance in wind turbine array.', detected: '06:42', status: 'Investigating', duration: '1h 18m' },
  { id: 3, severity: 'INFO', station: 'Maitri', system: 'AWS (Auto Weather)', message: 'Anemometer de-icing cycle complete.', detected: '05:30', status: 'Resolved', duration: 'N/A' },
  { id: 4, severity: 'WARNING', station: 'Bharati', system: 'HVAC Sector B', message: 'Heat recovery efficiency dropped 14%.', detected: '04:15', status: 'Open', duration: '3h 45m' }
];

export const equipmentData = [
  { id: 'chp-01-m', name: 'CHP GenSet #1 (Cummins 250kVA)', station: 'Maitri', type: 'Energy', health: 98, temp: 75, vibration: 2.1, runtime: 4500, failProb: 5, status: 'Healthy', lastMaint: '01 Aug 2026' },
  { id: 'chp-02-m', name: 'CHP GenSet #2 (Cummins 250kVA)', station: 'Maitri', type: 'Energy', health: 68, temp: 83, vibration: 7.4, runtime: 5200, failProb: 72, status: 'Warning', lastMaint: '12 Jul 2026' },
  { id: 'aws-01-m', name: 'Automatic Weather Station (Vaisala)', station: 'Maitri', type: 'Environment', health: 99, temp: -28, vibration: 0.1, runtime: 12400, failProb: 1, status: 'Healthy', lastMaint: '10 Aug 2026' },
  { id: 'wt-01-b', name: 'Wind Turbine #1 (30kW)', station: 'Bharati', type: 'Energy', health: 85, temp: -20, vibration: 4.5, runtime: 8500, failProb: 18, status: 'Warning', lastMaint: '22 Jul 2026' },
  { id: 'hvac-m', name: 'Heat Recovery Unit (AHU-1)', station: 'Maitri', type: 'Infrastructure', health: 92, temp: 22, vibration: 1.5, runtime: 2100, failProb: 8, status: 'Healthy', lastMaint: '15 Aug 2026' },
  { id: 'sat-m', name: 'K-Band SATCOM Terminal', station: 'Bharati', type: 'Comms', health: 99, temp: 15, vibration: 0, runtime: 9800, failProb: 0.1, status: 'Healthy', lastMaint: '30 Jul 2026' }
];

export const logisticsData = [
  { id: 'ATF', item: 'Aviation Turbine Fuel (ATF)', current: 45000, capacity: 60000, unit: 'Liters', daysRemaining: 120, status: 'Healthy', category: 'Fuel' },
  { id: 'HSD', item: 'High Speed Diesel (Winter Grade)', current: 185000, capacity: 250000, unit: 'Liters', daysRemaining: 210, status: 'Healthy', category: 'Fuel' },
  { id: 'FOOD', item: 'Dry/Frozen Rations', current: 4200, capacity: 5000, unit: 'kg', daysRemaining: 250, status: 'Healthy', category: 'Provisions' },
  { id: 'MED', item: 'Trauma & Emergency Meds', current: 85, capacity: 100, unit: '%', daysRemaining: 365, status: 'Healthy', category: 'Medical' },
  { id: 'SPARE', item: 'Critical Genset Spares', current: 4, capacity: 15, unit: 'kits', daysRemaining: 45, status: 'Warning', category: 'Maintenance' },
  { id: 'HELI', item: 'Kamov-32 Payload Capacity', current: 0, capacity: 5000, unit: 'kg', daysRemaining: 0, status: 'Critical', category: 'Transport', note: 'Awaiting resupply vessel' },
];

export const energyConsumptionBreakdown = [
  { name: 'HVAC & Space Heating', value: 45, color: '#06b6d4' },
  { name: 'Research Labs & Servers', value: 25, color: '#8b5cf6' },
  { name: 'Life Support & Water', value: 15, color: '#10b981' },
  { name: 'Lighting & Aux', value: 10, color: '#f59e0b' },
  { name: 'Comms & SAT', value: 5, color: '#ec4899' }
];

export const aiInsightsData = [
  { id: 1, category: 'PREDICTIVE MAINTENANCE', title: 'GenSet #2 Main Bearing Degradation', confidence: 92, risk: 'HIGH', recommendation: 'Switch base load to GenSet #1. Schedule bearing inspection. Estimated time to failure: 14 Days.', time: '07:22' },
  { id: 2, category: 'ENERGY OPTIMIZATION', title: 'Thermal Envelope Inefficiency', confidence: 88, risk: 'MEDIUM', recommendation: 'Bharati Module C shows 8% faster heat loss. Recommend thermal camera inspection on exterior seals.', time: '06:50' },
  { id: 3, category: 'ENVIRONMENTAL MODELING', title: 'Category 3 Blizzard Trajectory', confidence: 95, risk: 'HIGH', recommendation: 'Winds exceeding 110km/h expected in 48h. Secure heli-pad, retract exterior solar arrays.', time: '05:10' },
  { id: 4, category: 'RESOURCE LOGISTICS', title: 'Spare Parts Deficit', confidence: 99, risk: 'MEDIUM', recommendation: 'Current spare inventory for Cummins GenSet falls below winter-over safety margins. Add to next vessel manifest.', time: '01:15' },
];

export const energyForecast = Array.from({ length: 7 }).map((_, i) => ({
  day: \`Day \${i+1}\`,
  expectedDemand: 380 + Math.random() * 40,
  expectedGeneration: 400 + Math.random() * 20
}));
`;

fs.writeFileSync(path.join(__dirname, '../app/SIH-present/data/mockData.ts'), fileData);
console.log('mockData updated!');
