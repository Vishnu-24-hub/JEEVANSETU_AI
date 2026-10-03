import React from 'react';
import { X, QrCode, Printer, Download, CheckCircle2, ShieldAlert, Hospital, MapPin, Calendar, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReferralPassModal({ patient, facility, isOpen, onClose }) {
  if (!isOpen || !patient) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleTriggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 text-slate-100 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Official Referral Ticket Issued</span>
          </div>
          <h3 className="text-2xl font-bold font-outfit text-white">JEEVANSETU HEALTH PASS</h3>
          <p className="text-xs text-slate-400">Emergency & Triage Prioritization Pass</p>
        </div>

        {/* Pass Printable Card */}
        <div className="bg-slate-950 border-2 border-dashed border-teal-500/40 rounded-xl p-5 relative overflow-hidden print:bg-white print:text-black">
          
          {/* Triage Urgency Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Patient Referral ID</p>
              <p className="text-lg font-mono font-extrabold text-teal-400">{patient.id || "P-1024"}</p>
            </div>
            <div className={`px-3 py-1 rounded-lg text-xs font-extrabold ${
              patient.triageLevel === 'URGENT'
                ? 'bg-rose-600 text-white animate-pulse'
                : patient.triageLevel === 'PRIORITY'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-emerald-500 text-slate-950'
            }`}>
              {patient.triageLevel || "URGENT"}
            </div>
          </div>

          {/* Patient Vitals Summary */}
          <div className="my-4 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 font-medium">Name:</span>
              <p className="font-semibold text-white">{patient.name}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Age & Gender:</span>
              <p className="font-semibold text-white">{patient.age} yrs / {patient.gender || "Female"}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">SpO2 Oxygen:</span>
              <p className={`font-mono font-bold ${patient.vitals?.spo2 < 93 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {patient.vitals?.spo2 || 91}%
              </p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Blood Pressure:</span>
              <p className="font-mono font-bold text-slate-200">
                {patient.vitals?.bpSystolic || 154}/{patient.vitals?.bpDiastolic || 96} mmHg
              </p>
            </div>
          </div>

          {/* Facility Destination Card */}
          <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 mb-4">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold mb-1">
              <Hospital className="w-4 h-4" />
              <span>Referred Hospital / Center:</span>
            </div>
            <p className="text-sm font-bold text-white">{facility?.name || "Community Health Center (Emergency Beds Ready)"}</p>
            <div className="flex items-center gap-3 text-[11px] text-slate-300 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-400" />
                {facility?.distanceKm || 8.5} km away
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">
                {facility?.emergencyBedsAvailable || 12} Emergency Beds Free
              </span>
            </div>
          </div>

          {/* QR Code Placeholder for scanning at hospital desk */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <div className="text-[11px] text-slate-400 leading-tight pr-4">
              <p className="font-bold text-slate-300">Scan at PHC Desk:</p>
              <p>Instant clinical record sync & fast-track admission queue.</p>
            </div>
            <div className="bg-white p-2 rounded-lg flex-shrink-0 shadow-md">
              {/* Simulated QR Code SVG */}
              <svg className="w-14 h-14" viewBox="0 0 100 100">
                <rect width="100" height="100" fill="#ffffff" />
                <path d="M10,10 h30 v30 h-30 z M15,15 h20 v20 h-20 z M22,22 h6 v6 h-6 z" fill="#000000" />
                <path d="M60,10 h30 v30 h-30 z M65,15 h20 v20 h-20 z M72,22 h6 v6 h-6 z" fill="#000000" />
                <path d="M10,60 h30 v30 h-30 z M15,65 h20 v20 h-20 z M22,72 h6 v6 h-6 z" fill="#000000" />
                <rect x="45" y="10" width="10" height="10" fill="#000000" />
                <rect x="50" y="25" width="5" height="15" fill="#000000" />
                <rect x="45" y="45" width="20" height="10" fill="#000000" />
                <rect x="70" y="60" width="20" height="20" fill="#000000" />
                <rect x="60" y="85" width="30" height="5" fill="#000000" />
              </svg>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={handlePrint}
            className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
          >
            <Printer className="w-4 h-4 text-teal-400" />
            <span>Print Pass / PDF</span>
          </button>
          <button
            onClick={handleTriggerConfetti}
            className="py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-teal-900/40"
          >
            <Download className="w-4 h-4" />
            <span>Save to Mobile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
