import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Printer, 
  Download, 
  ArrowLeft, 
  Heart, 
  Wind, 
  Thermometer, 
  Droplet, 
  Activity, 
  Hospital, 
  MapPin, 
  User, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  FileCheck,
  Stethoscope,
  Phone,
  QrCode
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function DigitalReferralFormView({ passData, onBack }) {
  const [doctorSigned, setDoctorSigned] = useState(false);
  const [admissionStatus, setAdmissionStatus] = useState('FAST-TRACK ADMITTED');

  // Fallback data if opened directly from URL
  const data = passData || {
    id: 'P-2840',
    name: 'Sunita Devi',
    age: 30,
    gender: 'Female',
    village: 'Rampura Hamlet, Block 4',
    spo2: 91,
    bpSystolic: 160,
    bpDiastolic: 100,
    temperature: 101.4,
    pulse: 104,
    glucose: 182,
    triageLevel: 'URGENT',
    priorityScore: 94,
    symptoms: ['Severe Chest Pain / Pressure', 'Difficulty Breathing', 'High Fever (>100°F)'],
    facility: 'Community Health Center, Ramnagar',
    distanceKm: 8.5,
    emergencyBedsAvailable: 12,
    healthWorker: 'Lakshmi Bai (ASHA Worker - ID: ASHA-782)',
    timestamp: new Date().toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };

  const handlePrint = () => {
    window.print();
  };

  const isUrgent = data.triageLevel === 'URGENT';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Navigation & Action Bar */}
        <div className="flex items-center justify-between print:hidden">
          <button
            onClick={onBack || (() => window.history.back())}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-teal-400" />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3.5 py-2 rounded-xl transition-all shadow-md"
            >
              <Printer className="w-4 h-4 text-teal-400" />
              <span>Print Official Medical Form</span>
            </button>
          </div>
        </div>

        {/* Official Medical Form Container */}
        <div className="bg-slate-900 border-2 border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 text-slate-100 print:bg-white print:text-black print:border-black print:shadow-none print:p-4">
          
          {/* Form Header */}
          <div className="border-b-2 border-slate-800 pb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:border-black">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 p-0.5 shadow-lg flex-shrink-0 print:border print:border-black">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-teal-400 font-black text-xl print:bg-white print:text-black">
                  JS
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black font-outfit tracking-wide text-white print:text-black">
                    JEEVANSETU AI
                  </h1>
                  <span className="bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[10px] font-extrabold px-2 py-0.5 rounded print:border-black print:text-black">
                    OFFICIAL MEDICAL REFERRAL FORM
                  </span>
                </div>
                <p className="text-xs text-slate-400 print:text-gray-600">
                  National Rural Health & Emergency Triage Allocation Protocol (Form RT-2026)
                </p>
              </div>
            </div>

            {/* Verification Stamp & QR */}
            <div className="flex items-center gap-3 self-end sm:self-center bg-slate-950 p-2.5 rounded-xl border border-slate-800 print:bg-white print:border-black">
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-mono print:text-black">Tracking Ref ID:</p>
                <p className="text-sm font-mono font-extrabold text-teal-400 print:text-black">{data.id}</p>
                <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold justify-end mt-0.5 print:text-green-800">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>OFFLINE VERIFIED</span>
                </div>
              </div>
              <div className="bg-white p-1 rounded-lg">
                <QRCodeSVG
                  value={window.location.href}
                  size={48}
                  level="M"
                />
              </div>
            </div>
          </div>

          {/* Triage Urgency Banner */}
          <div className={`p-4 rounded-xl border flex items-center justify-between ${
            isUrgent
              ? 'bg-rose-500/15 border-rose-500/40 text-rose-300 print:bg-rose-100 print:text-rose-900 print:border-rose-900'
              : 'bg-amber-500/15 border-amber-500/40 text-amber-300 print:bg-amber-100 print:text-amber-900 print:border-amber-900'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                isUrgent ? 'bg-rose-600 text-white' : 'bg-amber-500 text-slate-950'
              }`}>
                !
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Clinical Triage Classification:</span>
                  <span className="text-sm font-extrabold px-2 py-0.5 rounded bg-rose-600 text-white font-mono">
                    {data.triageLevel}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5 print:text-black">
                  Priority Risk Score: <strong>{data.priorityScore}/100</strong> • Fast-Track Emergency Ward Allocation Required
                </p>
              </div>
            </div>
            <div className="hidden sm:block text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 print:text-black">Allocated Status:</span>
              <p className="text-xs font-bold text-emerald-400 font-mono print:text-black">{admissionStatus}</p>
            </div>
          </div>

          {/* Form Section 1: Patient Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-teal-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-1.5 print:text-black print:border-black">
              <User className="w-3.5 h-3.5" />
              <span>Section 1 — Patient Demographics & Field Origin</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 print:bg-gray-50 print:border-gray-300">
                <span className="text-slate-400 block font-medium print:text-gray-600">Patient Full Name</span>
                <strong className="text-white text-sm block mt-0.5 print:text-black">{data.name}</strong>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 print:bg-gray-50 print:border-gray-300">
                <span className="text-slate-400 block font-medium print:text-gray-600">Age & Gender</span>
                <strong className="text-white text-sm block mt-0.5 print:text-black">{data.age} Yrs / {data.gender}</strong>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 print:bg-gray-50 print:border-gray-300 sm:col-span-2">
                <span className="text-slate-400 block font-medium print:text-gray-600">Village / Residential Hamlet</span>
                <strong className="text-white text-sm block mt-0.5 print:text-black">{data.village}</strong>
              </div>
            </div>
          </div>

          {/* Form Section 2: Vitals Assessment */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-teal-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-1.5 print:text-black print:border-black">
              <Activity className="w-3.5 h-3.5" />
              <span>Section 2 — Recorded Physiological Metrics (ASHA Field Kit)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center print:bg-gray-50 print:border-gray-300">
                <span className="text-slate-400 block text-[10px] font-bold mb-1 print:text-gray-600">SpO2 Oxygen</span>
                <span className={`text-base font-mono font-black ${Number(data.spo2) < 93 ? 'text-rose-400' : 'text-teal-400'} print:text-black`}>
                  {data.spo2}%
                </span>
                <span className="text-[9px] text-rose-400 block font-semibold mt-0.5">Hypoxia Alert</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center print:bg-gray-50 print:border-gray-300">
                <span className="text-slate-400 block text-[10px] font-bold mb-1 print:text-gray-600">Blood Pressure</span>
                <span className="text-base font-mono font-black text-white print:text-black">
                  {data.bpSystolic}/{data.bpDiastolic}
                </span>
                <span className="text-[9px] text-slate-400 block mt-0.5">mmHg (Elevated)</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center print:bg-gray-50 print:border-gray-300">
                <span className="text-slate-400 block text-[10px] font-bold mb-1 print:text-gray-600">Temperature</span>
                <span className="text-base font-mono font-black text-amber-300 print:text-black">
                  {data.temperature}°F
                </span>
                <span className="text-[9px] text-amber-400 block mt-0.5">High Fever</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center print:bg-gray-50 print:border-gray-300">
                <span className="text-slate-400 block text-[10px] font-bold mb-1 print:text-gray-600">Heart Rate</span>
                <span className="text-base font-mono font-black text-emerald-400 print:text-black">
                  {data.pulse} BPM
                </span>
                <span className="text-[9px] text-slate-400 block mt-0.5">Tachycardia</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center print:bg-gray-50 print:border-gray-300 col-span-2 sm:col-span-1">
                <span className="text-slate-400 block text-[10px] font-bold mb-1 print:text-gray-600">Blood Glucose</span>
                <span className="text-base font-mono font-black text-purple-400 print:text-black">
                  {data.glucose} mg/dL
                </span>
                <span className="text-[9px] text-slate-400 block mt-0.5">Random BSL</span>
              </div>
            </div>
          </div>

          {/* Form Section 3: Observed Symptoms & Primary Assessment */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-teal-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-1.5 print:text-black print:border-black">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Section 3 — Clinical Symptoms & Primary Diagnostic Flags</span>
            </h3>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs print:bg-gray-50 print:border-gray-300">
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(data.symptoms) ? data.symptoms : [data.symptoms || 'Acute Hypoxia & Fever']).map((sym, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-rose-500/15 border border-rose-500/30 text-rose-300 rounded-lg font-semibold text-[11px] print:bg-gray-200 print:text-black print:border-black">
                    ⚠️ {sym}
                  </span>
                ))}
              </div>
              <p className="text-slate-300 text-xs pt-2 border-t border-slate-800/80 leading-relaxed print:text-black">
                <strong>AI Clinical Decision Rule:</strong> Patient exhibits acute hypoxia combined with elevated systolic blood pressure and respiratory stress. Immediate high-flow O2 administration and emergency bed reservation executed under Rule #CR-104.
              </p>
            </div>
          </div>

          {/* Form Section 4: Destination Hospital & Bed Allocation */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-teal-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-1.5 print:text-black print:border-black">
              <Hospital className="w-3.5 h-3.5" />
              <span>Section 4 — Destination Facility & Bed Reservation</span>
            </h3>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs print:bg-gray-50 print:border-gray-300">
              <div>
                <span className="text-slate-400 block font-medium print:text-gray-600">Referred Hospital</span>
                <strong className="text-white text-sm block mt-0.5 print:text-black">{data.facility}</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-medium print:text-gray-600">Transit Distance</span>
                <strong className="text-white text-sm block mt-0.5 print:text-black">{data.distanceKm} km (ETA: ~18 mins)</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-medium print:text-gray-600">Emergency Beds Status</span>
                <strong className="text-emerald-400 text-sm block mt-0.5 print:text-green-800">{data.emergencyBedsAvailable} Beds Available (Bed #04 Reserved)</strong>
              </div>
            </div>
          </div>

          {/* Form Footer & Doctor Confirmation */}
          <div className="pt-4 border-t-2 border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs print:border-black">
            <div>
              <span className="text-slate-400 block font-medium print:text-gray-600">Screened & Issued By:</span>
              <p className="text-white font-bold mt-0.5 print:text-black">{data.healthWorker}</p>
              <p className="text-slate-400 text-[10px] print:text-gray-600">Timestamp: {data.timestamp}</p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between print:bg-white print:border-black">
              <div>
                <span className="text-slate-400 block text-[10px] print:text-gray-600">Attending Doctor Sign-Off:</span>
                <p className="text-teal-400 font-serif font-bold text-sm italic print:text-black">
                  {doctorSigned ? 'Dr. R. V. Sharma (Confirmed ✓)' : 'Dr. R. V. Sharma, MD'}
                </p>
                <p className="text-[9px] text-slate-400">Duty Emergency Officer</p>
              </div>
              <button
                onClick={() => setDoctorSigned(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all print:hidden ${
                  doctorSigned 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-teal-600 hover:bg-teal-500 text-white shadow-md'
                }`}
              >
                {doctorSigned ? 'Verified ✓' : 'Sign & Admit'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
