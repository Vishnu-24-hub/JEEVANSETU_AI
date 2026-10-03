import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import OfflineBanner from './components/OfflineBanner';
import VoiceAssistantModal from './components/VoiceAssistantModal';
import ReferralPassModal from './components/ReferralPassModal';
import PatentSummaryModal from './components/PatentSummaryModal';

import PatientScreeningView from './views/PatientScreeningView';
import AshaWorkerModeView from './views/AshaWorkerModeView';
import DoctorDashboardView from './views/DoctorDashboardView';
import GISRoutingView from './views/GISRoutingView';
import PopulationHealthView from './views/PopulationHealthView';
import PitchAndPatentView from './views/PitchAndPatentView';

export default function App() {
  const [currentView, setCurrentView] = useState('screening');
  const [isOfflineSimulated, setIsOfflineSimulated] = useState(false);
  const [isMobileSimulated, setIsMobileSimulated] = useState(false);

  // Modals state
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isPatentModalOpen, setIsPatentModalOpen] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [passPatient, setPassPatient] = useState(null);
  const [passFacility, setPassFacility] = useState(null);

  const handleOpenPass = (patient, facility) => {
    setPassPatient(patient);
    setPassFacility(facility);
    setIsPassModalOpen(true);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'screening':
        return (
          <PatientScreeningView
            onOpenPass={handleOpenPass}
            onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
          />
        );
      case 'asha':
        return (
          <AshaWorkerModeView
            onOpenPass={handleOpenPass}
          />
        );
      case 'doctor':
        return (
          <DoctorDashboardView
            onOpenPass={handleOpenPass}
          />
        );
      case 'gis':
        return (
          <GISRoutingView
            onOpenPass={handleOpenPass}
          />
        );
      case 'population':
        return <PopulationHealthView />;
      case 'pitch':
        return (
          <PitchAndPatentView
            onOpenPatentModal={() => setIsPatentModalOpen(true)}
          />
        );
      default:
        return (
          <PatientScreeningView
            onOpenPass={handleOpenPass}
            onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      
      {/* Offline Status & Network Simulation Banner */}
      <OfflineBanner
        isOfflineSimulated={isOfflineSimulated}
        setIsOfflineSimulated={setIsOfflineSimulated}
      />

      {/* Mobile Simulation Wrapper if active */}
      {isMobileSimulated ? (
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-slate-900/50">
          <div className="w-full max-w-[420px] h-[840px] bg-slate-950 rounded-[44px] border-[10px] border-slate-800 shadow-2xl overflow-hidden flex flex-col relative">
            
            {/* Phone Speaker & Notch */}
            <div className="w-full bg-slate-900 h-6 flex justify-center items-center flex-shrink-0 z-50">
              <div className="w-24 h-4 bg-slate-950 rounded-b-xl flex items-center justify-center gap-2">
                <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
                <div className="w-2 h-2 rounded-full bg-slate-800"></div>
              </div>
            </div>

            {/* Mobile Header */}
            <Navbar
              currentView={currentView}
              setCurrentView={setCurrentView}
              isMobileSimulated={isMobileSimulated}
              setIsMobileSimulated={setIsMobileSimulated}
              onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
              onOpenPatentModal={() => setIsPatentModalOpen(true)}
            />

            {/* Mobile Viewport Area */}
            <main className="flex-1 overflow-y-auto pb-16">
              {renderCurrentView()}
            </main>

            {/* Mobile Bottom Navigation Bar */}
            <MobileNav
              currentView={currentView}
              setCurrentView={setCurrentView}
            />
          </div>
        </div>
      ) : (
        <>
          {/* Full Screen Desktop Layout */}
          <Navbar
            currentView={currentView}
            setCurrentView={setCurrentView}
            isMobileSimulated={isMobileSimulated}
            setIsMobileSimulated={setIsMobileSimulated}
            onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            onOpenPatentModal={() => setIsPatentModalOpen(true)}
          />

          <main className="flex-1 pb-16 lg:pb-8">
            {renderCurrentView()}
          </main>

          <MobileNav
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
        </>
      )}

      {/* Global Modals */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onApplyVoiceResult={(data) => {
          setCurrentView('screening');
        }}
      />

      <ReferralPassModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
        patient={passPatient}
        facility={passFacility}
      />

      <PatentSummaryModal
        isOpen={isPatentModalOpen}
        onClose={() => setIsPatentModalOpen(false)}
      />
    </div>
  );
}
