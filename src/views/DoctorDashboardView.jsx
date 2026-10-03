import React, { useState } from 'react';
import { 
  Stethoscope, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Video, 
  Sparkles, 
  ChevronRight, 
  TrendingUp,
  History,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

import { mockPatients } from '../data/mockPatients';

export default function DoctorDashboardView({ onOpenPass }) {
  const [selectedPatient, setSelectedPatient] = useState(mockPatients[0]);
  const [doctorNotes, setDoctorNotes] = useState('');
  const [noteSavedToast, setNoteSavedToast] = useState(false);

  const handleSaveNotes = () => {
    setNoteSavedToast(true);
    setTimeout(() => setNoteSavedToast(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 p-6 rounded-2xl border border-blue-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Feature 7 & 8 — Doctor Clinical Dashboard</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-white">
              Doctor Review & Longitudinal Patient Timeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              Provides qualified medical professionals with prioritized patient triage queues, explainable AI reasoning, and longitudinal multi-month health history.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs">
            <div>
              <p className="text-[10px] text-slate-400">Log-in Doctor:</p>
              <p className="font-bold text-white">Dr. R. V. Sharma (Duty Medical Officer)</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
          </div>
        </div>
      </div>

      {/* Triage Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Urgent Triage Cases</span>
            <div className="text-2xl font-black text-white font-mono mt-1">7 Patients</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
            !
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Priority Cases</span>
            <div className="text-2xl font-black text-white font-mono mt-1">14 Patients</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            14
          </div>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Routine Checkups</span>
            <div className="text-2xl font-black text-white font-mono mt-1">28 Patients</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            ✓
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Triage Queue */}
        <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold font-outfit text-white border-b border-slate-800 pb-3 flex items-center justify-between">
            <span>Today's Referred Triage Queue</span>
            <span className="text-xs text-slate-400 font-mono">Synced Live</span>
          </h3>

          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {mockPatients.map((patient) => {
              const isSelected = selectedPatient?.id === patient.id;
              const isUrgent = patient.triageLevel === 'URGENT';

              return (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-teal-500/80 shadow-lg'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-teal-400">{patient.id}</span>
                      <h4 className="text-sm font-bold text-white mt-0.5">{patient.name}</h4>
                      <p className="text-xs text-slate-400">
                        {patient.age} yrs • Village {patient.village}
                      </p>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      isUrgent
                        ? 'bg-rose-600 text-white'
                        : patient.triageLevel === 'PRIORITY'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-emerald-500 text-slate-950'
                    }`}>
                      {patient.triageLevel}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                    <span className="font-mono">SpO2: {patient.vitals?.spo2}%</span>
                    <span className="flex items-center gap-1 text-teal-400 font-semibold">
                      <span>View Record & Timeline</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Clinical Record & Longitudinal Timeline */}
        <div className="lg:col-span-7 space-y-6">
          {selectedPatient && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold font-outfit text-white">{selectedPatient.name}</h3>
                    <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                      {selectedPatient.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {selectedPatient.age} Years Old • {selectedPatient.gender} • Village {selectedPatient.village}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenPass(selectedPatient, null)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-bold rounded-lg border border-slate-700 flex items-center gap-1"
                  >
                    <span>Pass Ticket</span>
                  </button>

                  <button className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-md shadow-teal-900/40">
                    <Video className="w-3.5 h-3.5" />
                    <span>Start Tele-Consult</span>
                  </button>
                </div>
              </div>

              {/* Vitals Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block font-medium">SpO2 Oxygen</span>
                  <span className={`text-lg font-mono font-black ${selectedPatient.vitals?.spo2 < 93 ? 'text-rose-400' : 'text-teal-400'}`}>
                    {selectedPatient.vitals?.spo2}%
                  </span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block font-medium">Blood Pressure</span>
                  <span className="text-lg font-mono font-black text-white">
                    {selectedPatient.vitals?.bpSystolic}/{selectedPatient.vitals?.bpDiastolic}
                  </span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block font-medium">Temperature</span>
                  <span className="text-lg font-mono font-black text-amber-300">
                    {selectedPatient.vitals?.temperature}°F
                  </span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block font-medium">Heart Pulse</span>
                  <span className="text-lg font-mono font-black text-emerald-400">
                    {selectedPatient.vitals?.pulse || 88} BPM
                  </span>
                </div>
              </div>

              {/* Feature 8 — Patient Health Timeline (Longitudinal View) */}
              <div>
                <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <History className="w-4 h-4" />
                  <span>Feature 8 — Longitudinal Patient Health Timeline:</span>
                </h4>

                <div className="relative border-l-2 border-slate-800 ml-3 pl-4 space-y-4">
                  {selectedPatient.longitudinalTimeline?.map((visit, vIdx) => (
                    <div key={vIdx} className="relative">
                      <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-teal-500 border-2 border-slate-900"></div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-white">{visit.event}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{visit.date}</span>
                        </div>
                        <p className="text-slate-300">{visit.symptoms}</p>
                        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                          <span className="font-mono">{visit.vitals}</span>
                          <span className="font-bold text-teal-400">{visit.triage}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Doctor Review Notes & Decision Confirmation */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Doctor Clinical Decision & Prescription Notes:
                </h4>
                <textarea
                  rows="3"
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  placeholder="Enter medical doctor advice, oxygen order, prescription, or PHC admission note..."
                  className="w-full bg-slate-950 border border-slate-800 text-white text-xs p-3 rounded-xl focus:border-teal-500 focus:outline-none"
                ></textarea>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                    Doctor digital signature attached to referral record.
                  </span>

                  <button
                    onClick={handleSaveNotes}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg shadow-md shadow-teal-900/40"
                  >
                    Confirm & Authorize Referral
                  </button>
                </div>

                {noteSavedToast && (
                  <p className="text-xs text-emerald-400 font-semibold text-right">
                    ✓ Doctor clinical note successfully updated to patient EHR!
                  </p>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
