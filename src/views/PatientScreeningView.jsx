import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles, 
  Hospital, 
  MapPin, 
  ArrowRight,
  Info,
  Sliders,
  ChevronRight,
  Heart,
  Thermometer,
  Wind,
  Droplet,
  LocateFixed,
  Loader2
} from 'lucide-react';
import useGeolocation from '../hooks/useGeolocation';

import { commonSymptoms } from '../data/symptomRules';
import { analyzePatientHealth } from '../engine/aiScreeningEngine';
import { findBestFacility } from '../engine/facilityRoutingEngine';
import { savePatientLocally } from '../engine/offlineStorageEngine';

export default function PatientScreeningView({ onOpenPass, onOpenVoiceModal }) {
  const geo = useGeolocation();

  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Female");
  const [village, setVillage] = useState("");

  // Auto-fill village from GPS once detected
  useEffect(() => {
    if (geo.villageName && !village) {
      setVillage(geo.villageName);
    }
  }, [geo.villageName]);
  
  // Vitals
  const [spo2, setSpo2] = useState(91);
  const [bpSystolic, setBpSystolic] = useState(154);
  const [bpDiastolic, setBpDiastolic] = useState(96);
  const [temperature, setTemperature] = useState(101.4);
  const [pulse, setPulse] = useState(104);
  const [glucose, setGlucose] = useState(182);

  // Symptoms Selection
  const [selectedSymptoms, setSelectedSymptoms] = useState([
    "High Fever (>100°F)",
    "Persistent Cough",
    "Difficulty Breathing / Shortness of Breath"
  ]);

  // AI Screening Result State
  const [screeningResult, setScreeningResult] = useState(null);
  const [matchedFacility, setMatchedFacility] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const toggleSymptom = (symptomName) => {
    if (selectedSymptoms.includes(symptomName)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptomName));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomName]);
    }
  };

  const handleRunScreening = () => {
    const vitalsData = { spo2, bpSystolic, bpDiastolic, temperature, pulse, glucose };
    
    // Run AI Risk Screening Engine
    const result = analyzePatientHealth({
      age,
      vitals: vitalsData,
      selectedSymptoms
    });

    // Run Capacity-Aware GIS Facility Matching Engine (uses live GPS location)
    const facilityMatch = findBestFacility(result.triageLevel, selectedSymptoms, vitalsData, geo);

    setScreeningResult(result);
    setMatchedFacility(facilityMatch);

    // Save record to local storage / offline queue
    const newRecord = {
      name: patientName,
      age,
      gender,
      village,
      vitals: vitalsData,
      symptoms: selectedSymptoms,
      triageLevel: result.triageLevel,
      priorityScore: result.priorityScore,
      aiReasoning: result.aiReasoning,
      recommendedAction: result.recommendedAction,
      recommendedFacilityId: facilityMatch.recommendedFacility.id
    };

    savePatientLocally(newRecord);
    setIsSaved(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-slate-950 p-6 rounded-2xl border border-teal-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Feature 1 & 2 — AI Triage Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-white">
              AI Risk Screening & Explainable Triage
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              Provides early risk stratification (Routine, Priority, Urgent) with transparent Explainable AI (XAI) feature attribution. Non-diagnostic preliminary support.
            </p>
          </div>

          <button
            onClick={onOpenVoiceModal}
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-teal-900/40 transition-all flex-shrink-0"
          >
            <span>Speak Symptoms (Voice Assistant)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Form Intake (Vitals & Symptoms) */}
        <div className="lg:col-span-6 bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold font-outfit text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-teal-400" />
              <span>Patient Clinical Intake</span>
            </h3>
            <span className="text-xs text-slate-400">Step 1 of 2</span>
          </div>

          {/* Demographic Data */}
          {/* GPS Auto-Location Status */}
          {(geo.loading || geo.lat) && (
            <div className={`flex items-center gap-2 text-[11px] px-3 py-2 rounded-lg border ${
              geo.loading
                ? 'bg-slate-950 border-slate-800 text-slate-400'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            }`}>
              {geo.loading
                ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                : <LocateFixed className="w-3.5 h-3.5" />}
              <span className="font-medium">
                {geo.loading
                  ? 'Detecting your GPS location…'
                  : `GPS: ${geo.villageName}${geo.district ? ', ' + geo.district : ''}`
                }
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="text-slate-400 font-semibold mb-1 block">Patient Name</label>
              <input
                type="text"
                placeholder="Enter patient name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold mb-1 block">Age (Years)</label>
              <input
                type="number"
                placeholder="e.g. 45"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold mb-1 block flex items-center gap-1">
                Village / Area
                {geo.lat && <span className="text-[9px] text-emerald-400 font-bold ml-1">📍 GPS AUTO-FILLED</span>}
              </label>
              <input
                type="text"
                placeholder={geo.loading ? 'Detecting...' : 'Enter village/area'}
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className={`w-full bg-slate-950 border text-white rounded-lg p-2.5 focus:outline-none ${
                  geo.lat ? 'border-emerald-500/50 focus:border-emerald-400' : 'border-slate-800 focus:border-teal-500'
                }`}
              />
            </div>
          </div>

          {/* Key Vitals Inputs & Sliders */}
          <div className="space-y-4 pt-2 border-t border-slate-800/80">
            <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              Vitals & Physiological Metrics
            </h4>

            {/* SpO2 Slider */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 shadow-inner">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-cyan-400" />
                  SpO2 Blood Oxygen:
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 px-2 py-0.5 rounded-full font-mono font-medium">
                    Min 70% — Max 100%
                  </span>
                  <span className={`font-mono font-extrabold text-sm ${spo2 < 92 ? 'text-rose-400 animate-pulse' : 'text-teal-400'}`}>
                    {spo2}% {spo2 < 92 && '(Hypoxia Alert)'}
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="70"
                max="100"
                value={spo2}
                onChange={(e) => setSpo2(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full accent-teal-500 bg-slate-800 h-2.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between items-center text-[11px] font-mono mt-2 px-1">
                <span className="bg-slate-900 border border-slate-700/80 text-slate-300 px-2 py-0.5 rounded font-bold">
                  Min: 70%
                </span>
                <span className="text-emerald-400 font-medium bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded text-[10px]">
                  ✓ Normal: 95% – 100%
                </span>
                <span className="bg-slate-900 border border-slate-700/80 text-slate-300 px-2 py-0.5 rounded font-bold">
                  Max: 100%
                </span>
              </div>
            </div>

            {/* BP & Temperature */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between gap-1 text-slate-300 font-semibold mb-2">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-400" />
                    <span>BP (Systolic/Dia):</span>
                  </div>
                  <span className="text-[10px] bg-rose-950/60 text-rose-300 border border-rose-800/50 px-1.5 py-0.5 rounded font-mono">
                    mmHg
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <input
                      type="number"
                      min="60"
                      max="260"
                      value={bpSystolic}
                      onChange={(e) => setBpSystolic(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full bg-slate-900 text-center font-mono font-bold text-white text-base p-2 rounded-lg border border-slate-700 focus:border-teal-500 focus:outline-none"
                      placeholder="120"
                    />
                    <div className="text-center text-[9px] text-slate-400 font-mono mt-1">
                      Sys (60–260)
                    </div>
                  </div>
                  <span className="self-center font-bold text-slate-500 text-lg">/</span>
                  <div className="w-1/2">
                    <input
                      type="number"
                      min="40"
                      max="160"
                      value={bpDiastolic}
                      onChange={(e) => setBpDiastolic(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full bg-slate-900 text-center font-mono font-bold text-white text-base p-2 rounded-lg border border-slate-700 focus:border-teal-500 focus:outline-none"
                      placeholder="80"
                    />
                    <div className="text-center text-[9px] text-slate-400 font-mono mt-1">
                      Dia (40–160)
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-2 pt-1.5 border-t border-slate-800/60">
                  <span className="text-slate-400">Min: <strong className="text-slate-200">60/40</strong></span>
                  <span className="text-slate-400">Max: <strong className="text-slate-200">260/160</strong></span>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between gap-1 text-slate-300 font-semibold mb-2">
                  <div className="flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-amber-400" />
                    <span>Temperature (°F):</span>
                  </div>
                  <span className="text-[10px] bg-amber-950/60 text-amber-300 border border-amber-800/50 px-1.5 py-0.5 rounded font-mono">
                    °F
                  </span>
                </div>
                <input
                  type="number"
                  min="94"
                  max="108"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-slate-900 text-center font-mono font-bold text-amber-300 text-base p-2 rounded-lg border border-slate-700 focus:border-teal-500 focus:outline-none"
                  placeholder="98.6"
                />
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-2 pt-1.5 border-t border-slate-800/60">
                  <span className="text-slate-400">Min: <strong className="text-slate-200">94.0°F</strong></span>
                  <span className="text-amber-400/80 font-medium">Norm: 98.6°F</span>
                  <span className="text-slate-400">Max: <strong className="text-slate-200">108.0°F</strong></span>
                </div>
              </div>
            </div>

            {/* Glucose & Pulse */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between gap-1 text-slate-300 font-semibold mb-2">
                  <div className="flex items-center gap-1.5">
                    <Droplet className="w-4 h-4 text-purple-400" />
                    <span>Blood Glucose:</span>
                  </div>
                  <span className="text-[10px] bg-purple-950/60 text-purple-300 border border-purple-800/50 px-1.5 py-0.5 rounded font-mono">
                    mg/dL
                  </span>
                </div>
                <input
                  type="number"
                  min="40"
                  max="600"
                  value={glucose}
                  onChange={(e) => setGlucose(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-slate-900 text-center font-mono font-bold text-white text-base p-2 rounded-lg border border-slate-700 focus:border-teal-500 focus:outline-none"
                  placeholder="100"
                />
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-2 pt-1.5 border-t border-slate-800/60">
                  <span className="text-slate-400">Min: <strong className="text-slate-200">40</strong></span>
                  <span className="text-purple-300/80 font-medium">Norm: 70–140</span>
                  <span className="text-slate-400">Max: <strong className="text-slate-200">600</strong></span>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between gap-1 text-slate-300 font-semibold mb-2">
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span>Heart Rate:</span>
                  </div>
                  <span className="text-[10px] bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 px-1.5 py-0.5 rounded font-mono">
                    BPM
                  </span>
                </div>
                <input
                  type="number"
                  min="30"
                  max="240"
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-slate-900 text-center font-mono font-bold text-white text-base p-2 rounded-lg border border-slate-700 focus:border-teal-500 focus:outline-none"
                  placeholder="72"
                />
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-2 pt-1.5 border-t border-slate-800/60">
                  <span className="text-slate-400">Min: <strong className="text-slate-200">30</strong></span>
                  <span className="text-emerald-400/80 font-medium">Norm: 60–100</span>
                  <span className="text-slate-400">Max: <strong className="text-slate-200">240</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Symptoms Checklist */}
          <div className="pt-2 border-t border-slate-800/80">
            <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">
              Select Observed Symptoms:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {commonSymptoms.map((sym) => {
                const isSelected = selectedSymptoms.includes(sym.name);
                return (
                  <button
                    key={sym.id}
                    onClick={() => toggleSymptom(sym.name)}
                    className={`p-2.5 rounded-xl text-left font-medium transition-all flex items-center justify-between border ${
                      isSelected
                        ? 'bg-teal-500/20 text-teal-200 border-teal-500/50 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <span>{sym.name}</span>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      isSelected ? 'bg-teal-500 text-slate-950 font-bold' : 'border border-slate-700'
                    }`}>
                      {isSelected ? "✓" : ""}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Run Screening Action Button */}
          <button
            onClick={handleRunScreening}
            className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-teal-900/50 transition-all scale-100 active:scale-95"
          >
            <Sparkles className="w-5 h-5" />
            <span>Generate AI Risk Stratification & Facility Match</span>
          </button>
        </div>

        {/* Right Column: AI Triage Output & XAI Explainability */}
        <div className="lg:col-span-6 space-y-6">
          
          {screeningResult ? (
            <div className="bg-slate-900 p-5 sm:p-6 rounded-2xl border border-teal-500/40 space-y-5 animate-fadeIn">
              
              {/* Triage Urgency Header Card */}
              <div className={`p-4 rounded-xl border flex items-center justify-between ${
                screeningResult.triageLevel === 'URGENT'
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  : screeningResult.triageLevel === 'PRIORITY'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              }`}>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                    AI Triage Stratification Output
                  </span>
                  <div className="text-2xl font-black font-outfit mt-0.5">
                    {screeningResult.triageLevel} PRIORITY
                  </div>
                  <p className="text-xs font-semibold mt-1">
                    {screeningResult.recommendedAction}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-black font-mono">
                    {screeningResult.priorityScore}<span className="text-xs text-slate-400">/100</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Clinical Risk Score</span>
                </div>
              </div>

              {/* Explainable AI (XAI) Feature Attribution Graph */}
              <div>
                <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Info className="w-4 h-4" />
                  <span>Explainable AI (XAI) Feature Attribution:</span>
                </h4>
                
                <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {screeningResult.aiReasoning.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-200">{item.factor}</span>
                        <span className="font-mono text-teal-400 font-bold">+{item.weight}% Risk</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(item.weight * 2, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-[11px] text-slate-400 italic">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Facility Capacity Match Recommendation */}
              {matchedFacility && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Hospital className="w-4 h-4" />
                      <span>Matched Nearest Suitable Facility:</span>
                    </span>
                    <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                      Capacity-Aware USP
                    </span>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <h5 className="text-sm font-bold text-white">
                      {matchedFacility.recommendedFacility.name}
                    </h5>
                    <div className="flex items-center gap-4 text-xs text-slate-300 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        {matchedFacility.recommendedFacility.distanceKm} km away ({matchedFacility.recommendedFacility.travelTimeMins} mins)
                      </span>
                      <span className="text-emerald-400 font-bold">
                        {matchedFacility.recommendedFacility.emergencyBedsAvailable} Emergency Beds Ready
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 italic bg-teal-950/30 p-2.5 rounded-lg border border-teal-500/20">
                    💡 <strong>Routing USP Rationale:</strong> {matchedFacility.capacityRoutingUSPReason}
                  </p>

                  <button
                    onClick={() => onOpenPass(
                      { name: patientName, age, gender, village, vitals: { spo2, bpSystolic, bpDiastolic }, triageLevel: screeningResult.triageLevel },
                      matchedFacility.recommendedFacility
                    )}
                    className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-md shadow-teal-900/40"
                  >
                    <span>Generate Referral QR Ticket Pass</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-900/60 p-8 rounded-2xl border border-dashed border-slate-800 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="p-4 rounded-full bg-slate-800 text-slate-500 mb-3">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-300">Ready for AI Risk Screening</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Enter patient vitals and symptoms on the left, then click "Generate AI Risk Stratification" to view explainable triage reasoning.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
