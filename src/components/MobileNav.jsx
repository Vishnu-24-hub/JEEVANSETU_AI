import React from 'react';
import { Activity, UserCheck, Stethoscope, MapPin, BarChart3, Award } from 'lucide-react';

export default function MobileNav({ currentView, setCurrentView }) {
  const items = [
    { id: 'screening', label: 'Screening', icon: Activity },
    { id: 'asha', label: 'ASHA Mode', icon: UserCheck },
    { id: 'doctor', label: 'Doctor', icon: Stethoscope },
    { id: 'gis', label: 'GIS Routing', icon: MapPin },
    { id: 'population', label: 'Stats', icon: BarChart3 },
    { id: 'pitch', label: 'SIH Pitch', icon: Award },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-2 py-2">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                isActive
                  ? 'text-teal-400 font-extrabold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
