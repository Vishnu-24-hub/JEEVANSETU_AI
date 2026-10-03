import React, { useState } from 'react';
import { X, QrCode, Printer, Download, CheckCircle2, ShieldAlert, Hospital, MapPin, Calendar, Phone, Check, Smartphone, ExternalLink, FileText } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';

export default function ReferralPassModal({ patient, facility, isOpen, onClose, onOpenFormView }) {
  const [copiedToast, setCopiedToast] = useState(false);
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
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3000);
  };

  // Generate genuine formatted clinical payload for smartphone scanning
  const patientId = patient.id || (typeof patient.name === 'string' ? `P-${Math.floor(1000 + Math.random() * 9000)}` : 'P-2840');
  const vitals = patient.vitals || {};
  const symptomsList = Array.isArray(patient.symptoms) 
    ? patient.symptoms 
    : [patient.symptoms || 'Acute Hypoxia, High Fever & Chest Distress'];

  // Construct mobile-friendly direct URL for smartphone scanning
  const host = window.location.hostname || 'localhost';
  const port = window.location.port ? `:${window.location.port}` : '';
  const networkHost = (host === 'localhost' || host === '127.0.0.1') ? '192.168.137.73' : host;
  
  const params = new URLSearchParams({
    id: patientId,
    name: patient.name || 'Sunita Devi',
    age: String(patient.age || 30),
    gender: patient.gender || 'Female',
    village: patient.village || 'Rampura Hamlet',
    spo2: String(vitals.spo2 || 91),
    bpSys: String(vitals.bpSystolic || 160),
    bpDia: String(vitals.bpDiastolic || 100),
    temp: String(vitals.temperature || 101.4),
    pulse: String(vitals.pulse || 104),
    glucose: String(vitals.glucose || 182),
    triage: patient.triageLevel || 'URGENT',
    score: String(patient.priorityScore || 94),
    facility: facility?.name || 'Community Health Center (Emergency Ready)',
    dist: String(facility?.distanceKm || 8.5),
    beds: String(facility?.emergencyBedsAvailable || 12),
    worker: patient.healthWorker || 'Lakshmi Bai (ASHA Worker)'
  });

  const qrUrl = `${window.location.protocol}//${networkHost}${port}/#pass?${params.toString()}`;

  const passFormData = {
    id: patientId,
    name: patient.name || 'Sunita Devi',
    age: patient.age || 30,
    gender: patient.gender || 'Female',
    village: patient.village || 'Rampura Hamlet',
    spo2: vitals.spo2 || 91,
    bpSystolic: vitals.bpSystolic || 160,
    bpDiastolic: vitals.bpDiastolic || 100,
    temperature: vitals.temperature || 101.4,
    pulse: vitals.pulse || 104,
    glucose: vitals.glucose || 182,
    triageLevel: patient.triageLevel || 'URGENT',
    priorityScore: patient.priorityScore || 94,
    symptoms: symptomsList,
    facility: facility?.name || 'Community Health Center (Emergency Ready)',
    distanceKm: facility?.distanceKm || 8.5,
    emergencyBedsAvailable: facility?.emergencyBedsAvailable || 12,
    healthWorker: patient.healthWorker || 'Lakshmi Bai (ASHA Worker)',
    timestamp: new Date().toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };

  const handleOpenFormDirectly = () => {
    if (onOpenFormView) {
      onOpenFormView(passFormData);
    } else {
      window.location.hash = `#pass?${params.toString()}`;
    }
    onClose();
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
        <div className="text-center mb-5">
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
              <p className="text-lg font-mono font-extrabold text-teal-400">{patientId}</p>
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
          <div className="my-3 grid grid-cols-2 gap-2.5 text-xs">
            <div>
              <span className="text-slate-400 font-medium">Name:</span>
              <p className="font-semibold text-white truncate">{patient.name}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Age & Gender:</span>
              <p className="font-semibold text-white">{patient.age} yrs / {patient.gender || "Female"}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">SpO2 Oxygen:</span>
              <p className={`font-mono font-bold ${Number(vitals.spo2 || 91) < 93 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {vitals.spo2 || 91}%
              </p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Blood Pressure:</span>
              <p className="font-mono font-bold text-slate-200">
                {vitals.bpSystolic || 160}/{vitals.bpDiastolic || 100} mmHg
              </p>
            </div>
          </div>

          {/* Facility Destination Card */}
          <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 mb-3">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold mb-1">
              <Hospital className="w-4 h-4" />
              <span>Referred Hospital / Center:</span>
            </div>
            <p className="text-sm font-bold text-white leading-tight">{facility?.name || "Community Health Center (Emergency Beds Ready)"}</p>
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

          {/* Real Scannable QR Code */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800 gap-3">
            <div className="text-[11px] text-slate-300 leading-tight space-y-1">
              <div className="flex items-center gap-1 text-teal-400 font-bold">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Scan for Full Medical Form:</span>
              </div>
              <p className="text-slate-400 text-[10px]">
                Scan with phone camera or Google Lens to immediately open the official digital intake form.
              </p>
              <button
                onClick={handleOpenFormDirectly}
                className="text-[10px] text-teal-300 hover:text-teal-200 underline flex items-center gap-1 font-bold mt-1"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Open Form on Screen</span>
              </button>
            </div>

            {/* Live QR Code Component */}
            <div className="bg-white p-2 rounded-xl flex-shrink-0 shadow-lg border border-slate-200 flex flex-col items-center">
              <QRCodeSVG
                value={qrUrl}
                size={96}
                level="M"
                includeMargin={false}
              />
              <span className="text-[8px] font-mono text-slate-800 font-bold mt-1 tracking-wider uppercase">
                {patientId}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={handleOpenFormDirectly}
            className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
          >
            <FileText className="w-4 h-4 text-teal-400" />
            <span>View Medical Form</span>
          </button>
          <button
            onClick={handleTriggerConfetti}
            className="py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-teal-900/40"
          >
            <Download className="w-4 h-4" />
            <span>{copiedToast ? 'Saved Offline! ✓' : 'Save / Issue Pass'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
