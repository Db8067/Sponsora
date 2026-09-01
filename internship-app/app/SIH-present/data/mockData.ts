// app/SIH-present/data/mockData.ts

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
}

export const stationsData: Station[] = [
  {
    id: "maitri",
    name: "Maitri Research Station",
    status: "operational",
    health: 96,
    temperature: -28.4,
    windSpeed: 32,
    powerGeneration: 418,
    powerConsumption: 312,
    fuelLevel: 72,
    personnelCount: 24,
    location: "Schirmacher Oasis, Antarctica",
    lastSync: new Date().toISOString()
  },
  {
    id: "bharati",
    name: "Bharati Research Station",
    status: "warning",
    health: 93,
    temperature: -24.7,
    windSpeed: 28,
    powerGeneration: 391,
    powerConsumption: 380,
    fuelLevel: 81,
    personnelCount: 18,
    location: "Larsmann Hills, Antarctica",
    lastSync: new Date().toISOString()
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
  { title: "Station Health", value: "96%", subtitle: "Excellent", trend: 'up', status: 'good' },
  { title: "Active Alerts", value: "04", subtitle: "1 Critical", trend: 'up', status: 'warning' },
  { title: "Energy Status", value: "87%", subtitle: "Stable", trend: 'stable', status: 'good' },
  { title: "Equipment Health", value: "94%", subtitle: "Healthy", trend: 'down', status: 'good' },
  { title: "Fuel Reserve", value: "72%", subtitle: "18 days estimated", trend: 'down', status: 'good' },
  { title: "Environmental Risk", value: "LOW", subtitle: "No immediate threat", trend: 'stable', status: 'good' },
];

export const environmentHistory = Array.from({ length: 24 }).map((_, i) => ({
  time: `${String(i).padStart(2, '0')}:00`,
  temperatureMaitri: -25 - Math.random() * 5,
  temperatureBharati: -22 - Math.random() * 4,
  windSpeedMaitri: 20 + Math.random() * 15,
  windSpeedBharati: 15 + Math.random() * 20,
  humidityMaitri: 40 + Math.random() * 10,
  humidityBharati: 45 + Math.random() * 10,
}));

export const alertsData = [
  { id: 1, severity: 'CRITICAL', station: 'Maitri', system: 'Generator #02', message: 'High vibration detected', detected: '07:18', status: 'Open', duration: '42m' },
  { id: 2, severity: 'WARNING', station: 'Bharati', system: 'Fuel System', message: 'Consumption above baseline', detected: '06:42', status: 'Investigating', duration: '1h 18m' },
  { id: 3, severity: 'INFO', station: 'Maitri', system: 'Weather Station', message: 'Routine calibration complete', detected: '05:30', status: 'Resolved', duration: 'N/A' },
  { id: 4, severity: 'WARNING', station: 'Bharati', system: 'Comm Link', message: 'High latency detected', detected: '04:15', status: 'Open', duration: '3h 45m' }
];

export const equipmentData = [
  { id: 'gen-01-maitri', name: 'Generator #01', station: 'Maitri', health: 98, temp: 75, vibration: 2.1, runtime: 4500, failProb: 5, status: 'Healthy', lastMaint: '01 Aug 2026' },
  { id: 'gen-02-maitri', name: 'Generator #02', station: 'Maitri', health: 68, temp: 83, vibration: 7.4, runtime: 5200, failProb: 72, status: 'Warning', lastMaint: '12 Jul 2026' },
  { id: 'gen-01-bharati', name: 'Generator #01', station: 'Bharati', health: 92, temp: 78, vibration: 3.0, runtime: 3200, failProb: 12, status: 'Healthy', lastMaint: '15 Aug 2026' },
];

export const logisticsData = [
  { id: 1, item: 'Diesel Fuel', level: 72, unit: '%', daysRemaining: 18, status: 'Healthy' },
  { id: 2, item: 'Medical Supplies', level: 84, unit: '%', daysRemaining: 31, status: 'Healthy' },
  { id: 3, item: 'Spare Parts', level: 61, unit: '%', daysRemaining: 22, status: 'Warning' },
  { id: 4, item: 'Food Rations', level: 90, unit: '%', daysRemaining: 120, status: 'Healthy' },
];

export const aiInsightsData = [
  { id: 1, category: 'Predictive Maintenance', title: 'Generator #02 at Maitri is showing abnormal vibration.', confidence: 92, risk: 'HIGH', recommendation: 'Schedule inspection within 24 hours.', time: '07:22' },
  { id: 2, category: 'Energy Optimization', title: 'Fuel consumption at Bharati is 8% above baseline.', confidence: 88, risk: 'MEDIUM', recommendation: 'Review generator load distribution.', time: '06:50' },
  { id: 3, category: 'Environment', title: 'Approaching blizzard conditions at Maitri expected in 48h.', confidence: 95, risk: 'HIGH', recommendation: 'Secure outside equipment and check backup power.', time: '05:10' },
];

export const energyForecast = Array.from({ length: 7 }).map((_, i) => ({
  day: `Day ${i+1}`,
  expectedDemand: 400 + Math.random() * 50,
  expectedGeneration: 450 + Math.random() * 20
}));
