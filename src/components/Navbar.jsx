import React from 'react';
import { 
  Activity, 
  UserCheck, 
  Stethoscope, 
  MapPin, 
  BarChart3, 
  Award, 
  Mic, 
  Smartphone, 
  Monitor,
  HeartPulse
} from 'lucide-react';

export default function Navbar({ 
  currentView, 
  setCurrentView, 
  isMobileSimulated, 
  setIsMobileSimulated, 
  onOpenVoiceModal, 
  onOpenPatentModal 
}) {
  const navItems = [
    { id: 'screening', label: 'AI Risk Screening', icon: Activity },
    { id: 'asha', label: 'ASHA Village Mode', icon: UserCheck },
    { id: 'doctor', label: 'Doctor Dashboard', icon: Stethoscope },
    { id: 'gis', label: 'GIS Hospital Routing', icon: MapPin },
    { id: 'population', label: 'Outbreak Analytics', icon: BarChart3 },
    { id: 'pitch', label: 'SIH Pitch & Patent', icon: Award },
  ];

  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-400 p-0.5 shadow-lg shadow-teal-900/40">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-teal-400">
                <HeartPulse className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black font-outfit tracking-wide text-white">
                  JEEVANSETU<span className="text-teal-400">.AI</span>
                </h1>
                <span className="hidden sm:inline-block bg-teal-500/10 text-teal-300 border border-teal-500/30 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  SIH26133
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden md:block">
                Rural Health Screening, Referral & Emergency Support
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-900/50'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls: Voice Mic, Mobile Simulation Toggle, Patent Deck */}
          <div className="flex items-center gap-2">
            
            {/* Voice Mic Launcher */}
            <button
              onClick={onOpenVoiceModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-bold shadow-lg shadow-teal-900/40 transition-all scale-100 active:scale-95"
              title="Launch Multilingual Voice Assistant"
            >
              <Mic className="w-3.5 h-3.5 animate-bounce" />
              <span className="hidden sm:inline">Voice Assistant</span>
            </button>

            {/* Mobile View Toggle */}
            <button
              onClick={() => setIsMobileSimulated(!isMobileSimulated)}
              className={`p-2 rounded-xl border transition-all text-xs font-semibold flex items-center gap-1.5 ${
                isMobileSimulated
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title="Toggle Mobile App Frame View"
            >
              {isMobileSimulated ? (
                <>
                  <Smartphone className="w-4 h-4 text-amber-400" />
                  <span className="hidden md:inline text-[11px]">Mobile Frame</span>
                </>
              ) : (
                <>
                  <Monitor className="w-4 h-4 text-slate-400" />
                  <span className="hidden md:inline text-[11px]">Desktop</span>
                </>
              )}
            </button>

            {/* Patent Dossier Button */}
            <button
              onClick={onOpenPatentModal}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-400 transition-all"
              title="View SIH Patent Claims"
            >
              <Award className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
