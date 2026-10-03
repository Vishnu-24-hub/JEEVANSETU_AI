import React from 'react';
import { 
  Award, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Radio, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  FileText, 
  TrendingUp,
  Target,
  Layers
} from 'lucide-react';

export default function PitchAndPatentView({ onOpenPatentModal }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      
      {/* Pitch Deck Header */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-amber-950 p-8 rounded-3xl border border-amber-500/40 relative overflow-hidden text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Smart India Hackathon 2026 • Problem Statement SIH26133</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-outfit text-white tracking-tight">
              JEEVANSETU<span className="text-teal-400">.AI</span> — Hackathon Pitch & Patent Summary
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              AI-Powered Rural Health Screening, Referral & Emergency Support Platform. Engineering healthcare accessibility for 800+ million rural citizens.
            </p>
          </div>

          <button
            onClick={onOpenPatentModal}
            className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-teal-500 hover:from-amber-400 hover:to-teal-400 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-amber-950/50 transition-all scale-100 active:scale-95 flex-shrink-0 flex items-center gap-2"
          >
            <Award className="w-5 h-5" />
            <span>Open Patent Claims Dossier</span>
          </button>
        </div>
      </div>

      {/* The Impact Story: TODAY vs WITH JEEVANSETU */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-xl font-bold font-outfit text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-teal-400" />
          <span>The Impact Story — Paradigm Shift in Rural Healthcare</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* TODAY (Traditional Flow) */}
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-500/30 space-y-3">
            <span className="bg-rose-500/20 text-rose-300 font-extrabold text-xs px-3 py-1 rounded-full border border-rose-500/30">
              TRADITIONAL RURAL FLOW (TODAY)
            </span>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg">
                <span className="font-bold text-rose-400">1. Remote Village:</span> Patient suffers severe fever & breathing issue
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg">
                <span className="font-bold text-rose-400">2. Long Travel (20–50 km):</span> Travel to nearest district hospital blindly
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg">
                <span className="font-bold text-rose-400">3. Hospital Overcrowding:</span> Arrive to find 0 emergency beds available
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg">
                <span className="font-bold text-rose-400">4. Delayed Treatment:</span> Critical care delayed by 6-12 hours
              </div>
            </div>
          </div>

          {/* WITH JEEVANSETU AI */}
          <div className="bg-slate-950 p-5 rounded-xl border border-teal-500/40 space-y-3">
            <span className="bg-teal-500/20 text-teal-300 font-extrabold text-xs px-3 py-1 rounded-full border border-teal-500/30">
              WITH JEEVANSETU AI (REVOLUTIONARY)
            </span>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg border border-teal-500/20">
                <span className="font-bold text-teal-400">1. ASHA Village Screening:</span> Doorstep voice screening & vitals check
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg border border-teal-500/20">
                <span className="font-bold text-teal-400">2. AI Risk Stratification:</span> Instant URGENT triage score & XAI reasoning
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg border border-teal-500/20">
                <span className="font-bold text-teal-400">3. Capacity-Aware Routing:</span> Directs patient to CHC (8 km) with 12 free beds
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg border border-teal-500/20">
                <span className="font-bold text-teal-400">4. Instant Admission QR:</span> Fast-track treatment & doctor sync
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why JEEVANSETU AI Wins Matrix */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-xl font-bold font-outfit text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          <span>What Makes JEEVANSETU AI Unique? (Core USP)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h4 className="font-bold text-teal-400 text-sm mb-1">AI Triage + Capacity Routing</h4>
            <p className="text-slate-300">
              Matches patient oxygen requirements against live hospital bed capacity rather than simple distance.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h4 className="font-bold text-teal-400 text-sm mb-1">7 Indian Languages Voice AI</h4>
            <p className="text-slate-300">
              Voice-first speech interaction in Telugu, Hindi, Tamil, Kannada, Marathi, Bengali, and English.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h4 className="font-bold text-teal-400 text-sm mb-1">100% Offline Field Capability</h4>
            <p className="text-slate-300">
              ASHA workers can complete screening in zero-network villages with encrypted offline QR passes.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
