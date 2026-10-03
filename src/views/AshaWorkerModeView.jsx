import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  Plus, 
  QrCode, 
  WifiOff, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Users, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  LocateFixed,
  Loader2
} from 'lucide-react';

import { mockPatients } from '../data/mockPatients';
import { getLocalPatients, savePatientLocally } from '../engine/offlineStorageEngine';
import { analyzePatientHealth } from '../engine/aiScreeningEngine';
import useGeolocation from '../hooks/useGeolocation';

export default function AshaWorkerModeView({ onOpenPass }) {
  const geo = useGeolocation();
  const [patientList, setPatientList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('All');
  
  // Rapid Intake Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState(45);
  const [gender, setGender] = useState('Female');
  const [village, setVillage] = useState('');
  const [spo2, setSpo2] = useState(94);
  const [bpSys, setBpSys] = useState(135);
  const [bpDia, setBpDia] = useState(85);
  const [temp, setTemp] = useState(99.4);
  const [selectedSymptoms, setSelectedSymptoms] = useState(['High Fever (>100°F)']);

  // Auto-fill village from GPS
  useEffect(() => {
    if (geo.villageName && !village) setVillage(geo.villageName);
  }, [geo.villageName]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const local = getLocalPatients();
    const combined = [...local, ...mockPatients];
    setPatientList(combined);
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    if (!name) return;

    const vitals = { spo2, bpSystolic: bpSys, bpDiastolic: bpDia, temperature: temp };
    const triage = analyzePatientHealth({ age, vitals, selectedSymptoms });

    const newPatient = {
      name,
      age,
      gender,
      village,
      vitals,
      symptoms: selectedSymptoms,
      triageLevel: triage.triageLevel,
      priorityScore: triage.priorityScore,
      aiReasoning: triage.aiReasoning,
      recommendedAction: triage.recommendedAction,
      healthWorker: "ASHA Worker - Lakshmi Bai"
    };

    savePatientLocally(newPatient);
    loadData();
    setShowAddForm(false);
    setName('');
  };

  const filteredPatients = patientList.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVillage = selectedVillage === 'All' || p.village === selectedVillage;
    return matchesSearch && matchesVillage;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 p-6 rounded-2xl border border-emerald-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Feature 9 — ASHA & ANM Mobile Village Mode</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-white">
              Health Worker Door-to-Door Triage Interface
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              Field screening workflow built for community health workers. Operates 100% offline in rural hamlets, generating referral QR passes for PHC transfer.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-900/40 transition-all flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>New Rapid Patient Intake</span>
          </button>
        </div>
      </div>

      {/* Quick Add Patient Modal Form */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl relative">
            <h3 className="text-xl font-bold font-outfit text-white mb-4">
              ASHA Field Patient Screening
            </h3>

            <form onSubmit={handleAddPatient} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-semibold mb-1 block">Patient Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Parvathamma"
                    className="w-full bg-slate-950 border border-slate-800 text-white p-2.5 rounded-lg focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold mb-1 block">Age & Gender</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-1/2 bg-slate-950 border border-slate-800 text-white p-2.5 rounded-lg text-center font-bold"
                    />
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-1/2 bg-slate-950 border border-slate-800 text-white p-2.5 rounded-lg"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* GPS Location Badge */}
              {geo.lat && (
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg mb-3">
                  <LocateFixed className="w-3.5 h-3.5" />
                  <span>GPS: <strong>{geo.villageName}</strong>{geo.district ? `, ${geo.district}` : ''}</span>
                </div>
              )}

              <div>
                <label className="text-slate-400 font-semibold mb-1 block">Village / Hamlet</label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder={geo.loading ? 'Detecting GPS...' : 'Village / Area name'}
                  className={`w-full border text-white p-2.5 rounded-lg font-semibold focus:outline-none bg-slate-950 ${
                    geo.lat ? 'border-emerald-500/50 focus:border-emerald-400' : 'border-slate-800 focus:border-emerald-500'
                  }`}
                />
              </div>

              {/* Vitals Rapid Row */}
              <div className="grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold mb-1">
                    <span>SpO2 %</span>
                  </div>
                  <input
                    type="number"
                    min="70"
                    max="100"
                    value={spo2}
                    onChange={(e) => setSpo2(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 text-teal-400 text-center font-mono font-bold p-1.5 rounded"
                  />
                  <div className="flex justify-between text-[8px] text-slate-500 font-mono mt-1">
                    <span>Min: 70</span>
                    <span>Max: 100</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold mb-1">
                    <span>BP Sys</span>
                  </div>
                  <input
                    type="number"
                    min="60"
                    max="260"
                    value={bpSys}
                    onChange={(e) => setBpSys(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 text-white text-center font-mono font-bold p-1.5 rounded"
                  />
                  <div className="flex justify-between text-[8px] text-slate-500 font-mono mt-1">
                    <span>Min: 60</span>
                    <span>Max: 260</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold mb-1">
                    <span>Temp °F</span>
                  </div>
                  <input
                    type="number"
                    min="94"
                    max="108"
                    step="0.1"
                    value={temp}
                    onChange={(e) => setTemp(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 text-amber-300 text-center font-mono font-bold p-1.5 rounded"
                  />
                  <div className="flex justify-between text-[8px] text-slate-500 font-mono mt-1">
                    <span>Min: 94</span>
                    <span>Max: 108</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg"
                >
                  Save & Evaluate AI Triage
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Controls & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search patient name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-white text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Filter Village / Area:</span>
          {['All', 'Vijayawada', 'Eluru', 'Guntur'].map(v => (
            <button
              key={v}
              onClick={() => setSelectedVillage(v)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                selectedVillage === v
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Patient Village Queue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.map((patient, idx) => {
          const isUrgent = patient.triageLevel === 'URGENT';
          const isPriority = patient.triageLevel === 'PRIORITY';

          return (
            <div
              key={patient.id || idx}
              className={`bg-slate-900 p-5 rounded-2xl border transition-all hover:border-emerald-500/50 flex flex-col justify-between space-y-4 ${
                isUrgent ? 'border-rose-500/40 bg-rose-950/10' : 'border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-mono font-extrabold text-teal-400">
                      {patient.id || "P-1024"}
                    </span>
                    <h4 className="text-base font-bold text-white mt-0.5">{patient.name}</h4>
                    <p className="text-xs text-slate-400">
                      {patient.age} yrs • {patient.gender || "Female"} • Village {patient.village}
                    </p>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                    isUrgent
                      ? 'bg-rose-600 text-white animate-pulse'
                      : isPriority
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-emerald-500 text-slate-950'
                  }`}>
                    {patient.triageLevel}
                  </span>
                </div>

                {/* Vitals Summary Pill */}
                <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 my-3 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">SpO2:</span>
                    <span className={`font-mono font-bold ${patient.vitals?.spo2 < 93 ? 'text-rose-400' : 'text-teal-300'}`}>
                      {patient.vitals?.spo2 || 91}%
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">BP:</span>
                    <span className="font-mono font-bold text-slate-200">
                      {patient.vitals?.bpSystolic || 140}/{patient.vitals?.bpDiastolic || 90}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Temp:</span>
                    <span className="font-mono font-bold text-amber-300">
                      {patient.vitals?.temperature || 99.4}°F
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                  <p className="font-semibold text-slate-400">Action Recommendation:</p>
                  <p className="text-slate-200 mt-0.5">{patient.recommendedAction}</p>
                </div>
              </div>

              <button
                onClick={() => onOpenPass(patient, null)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
              >
                <QrCode className="w-4 h-4 text-teal-400" />
                <span>Issue / Print QR Referral Pass</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
