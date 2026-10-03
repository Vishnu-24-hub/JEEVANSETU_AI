import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  BarChart3, 
  AlertTriangle, 
  ShieldAlert, 
  Activity, 
  TrendingUp, 
  Users, 
  Building2, 
  MapPin, 
  CheckCircle2,
  Bell
} from 'lucide-react';

import { mockVillageStats } from '../data/mockVillageStats';

const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#64748b'];

export default function PopulationHealthView() {
  const [selectedVillage, setSelectedVillage] = useState(mockVillageStats[0]);

  const pieData = Object.entries(selectedVillage.symptomDistribution).map(([name, value]) => ({
    name: name.toUpperCase(),
    value
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-slate-950 p-6 rounded-2xl border border-rose-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Feature 10 — Population Health & Anomaly Detection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-white">
              Village Health Status & Outbreak Cluster Radar
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              Monitors disease patterns across rural hamlets. Automatically flags statistical symptom spikes to trigger early public health intervention.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 font-semibold">Select Village:</span>
            {mockVillageStats.map(v => (
              <button
                key={v.villageId}
                onClick={() => setSelectedVillage(v)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  selectedVillage.villageId === v.villageId
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                {v.villageName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Outbreak Anomaly Alert Trigger Box */}
      {selectedVillage.anomalyDetails ? (
        <div className="bg-rose-500/10 border-2 border-rose-500/50 p-5 rounded-2xl animate-pulse flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-rose-600 text-white rounded-xl shadow-lg shadow-rose-900/50">
              <AlertTriangle className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold bg-rose-600 text-white px-2 py-0.5 rounded">
                  ANOMALY DETECTED
                </span>
                <span className="text-xs text-rose-300 font-mono font-bold">
                  +{selectedVillage.anomalyDetails.increasePercentage}% Surge in 48 hrs
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-white mt-1">
                {selectedVillage.anomalyDetails.title} in Village {selectedVillage.villageName}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                <strong>Suspected Trigger:</strong> {selectedVillage.anomalyDetails.suspectedTrigger} • {selectedVillage.anomalyDetails.affectedHouseholds} Households Affected
              </p>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-rose-500/40 text-xs space-y-1">
            <span className="text-rose-400 font-bold block">Recommended Public Health Action:</span>
            <p className="text-slate-200 font-medium">{selectedVillage.anomalyDetails.recommendedGovtAction}</p>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xs text-slate-200 font-semibold">
              Village {selectedVillage.villageName} Baseline: Normal Symptom Distribution. No Outbreak Detected.
            </span>
          </div>
        </div>
      )}

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Symptom Spike Trend (Area Chart) */}
        <div className="lg:col-span-7 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-outfit text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-teal-400" />
              <span>7-Day Symptom Cluster Trend (Village {selectedVillage.villageName})</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Daily Screenings</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={selectedVillage.trendData}>
                <defs>
                  <linearGradient id="colorFever" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="fever" stroke="#ef4444" fillOpacity={1} fill="url(#colorFever)" name="Fever Cases" />
                <Area type="monotone" dataKey="respiratory" stroke="#14b8a6" fillOpacity={1} fill="url(#colorResp)" name="Respiratory Complaints" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Symptom Share Pie Chart */}
        <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold font-outfit text-white">
            Symptom Distribution Breakdown
          </h3>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                <span className="text-slate-300 font-medium">{d.name}: {d.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
