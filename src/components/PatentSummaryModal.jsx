import React from 'react';
import { X, Award, ShieldCheck, Cpu, MapPin, Radio, Zap, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function PatentSummaryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-teal-500/40 rounded-2xl max-w-2xl w-full p-6 text-slate-100 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-xl bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title Header */}
        <div className="flex items-center gap-3 mb-5 border-b border-slate-800 pb-4">
          <div className="p-3 bg-gradient-to-br from-amber-500/20 to-teal-500/20 border border-amber-500/40 rounded-2xl text-amber-400">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-300 px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-amber-500/20 mb-1">
              <span>Smart India Hackathon 2026 Pitch Deck & Patent Dossier</span>
            </div>
            <h2 className="text-2xl font-extrabold font-outfit text-white">
              JEEVANSETU AI — Patent Architecture
            </h2>
            <p className="text-xs text-slate-400">
              Problem Statement SIH26133 • MedTech / HealthTech Innovation
            </p>
          </div>
        </div>

        {/* Core Novel Patent Claims */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            <span>Key Patentable Innovations & Claims:</span>
          </h3>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-teal-500/20 text-teal-400 rounded-lg mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">1. Capacity-Aware Intelligent Triage Routing System</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Unlike traditional navigation systems that calculate shortest distance, our patented algorithm dynamically correlates real-time emergency bed availability, ICU capability, and oxygen supply against patient SpO2 hypoxia markers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg mt-0.5">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">2. Offline Mesh Sync & Multilingual Voice Protocol</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Enables zero-connectivity village field screening for ASHA health workers via Web-Assembly local rule evaluation, auto-generating encrypted QR referral passes that auto-sync once internet connectivity is restored.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-purple-500/20 text-purple-400 rounded-lg mt-0.5">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">3. Explainable AI (XAI) Feature Attribution for Clinical Trust</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Provides transparent, non-diagnostic percentage weights for vital indicators (SpO2, BP, Glucose, Age) so rural healthcare staff and district doctors can audit AI recommendations without clinical liability risks.
                </p>
              </div>
            </div>
          </div>

          {/* Real World Impact */}
          <div className="bg-gradient-to-r from-teal-950/40 to-slate-950 p-4 rounded-xl border border-teal-500/30 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Target Impact in Rural India:</p>
              <p className="text-lg font-bold text-teal-300">70% Faster Emergency Triage Transfer</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Target Users:</p>
              <p className="text-sm font-semibold text-white">ASHA Workers • PHC Doctors • Rural Citizens</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-teal-900/50"
          >
            Close Patent Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
