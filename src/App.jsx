import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import OfflineBanner from './components/OfflineBanner';
import VoiceAssistantModal from './components/VoiceAssistantModal';
import ReferralPassModal from './components/ReferralPassModal';
import PatentSummaryModal from './components/PatentSummaryModal';
import QRScannerModal from './components/QRScannerModal';

import PatientScreeningView from './views/PatientScreeningView';
import AshaWorkerModeView from './views/AshaWorkerModeView';
import DoctorDashboardView from './views/DoctorDashboardView';
import GISRoutingView from './views/GISRoutingView';
import PopulationHealthView from './views/PopulationHealthView';
import PitchAndPatentView from './views/PitchAndPatentView';
import DigitalReferralFormView from './views/DigitalReferralFormView';

export default function App() {
  const [currentView, setCurrentView] = useState('screening');
  const [isOfflineSimulated, setIsOfflineSimulated] = useState(false);
  const [isMobileSimulated, setIsMobileSimulated] = useState(false);

  // Modals state
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isPatentModalOpen, setIsPatentModalOpen] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [passPatient, setPassPatient] = useState(null);
  const [passFacility, setPassFacility] = useState(null);
  const [scannedPatient, setScannedPatient] = useState(null);
  const [formPassData, setFormPassData] = useState(null);

  // Handle URL Hash #pass routing (when scanned with external phone camera or opened directly)
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#pass')) {
        const queryIndex = hash.indexOf('?');
        if (queryIndex !== -1) {
          const queryString = hash.slice(queryIndex + 1);
          const params = new URLSearchParams(queryString);
          const parsed = {
            id: params.get('id') || 'P-2840',
            name: params.get('name') || 'Sunita Devi',
            age: parseInt(params.get('age')) || 30,
            gender: params.get('gender') || 'Female',
            village: params.get('village') || 'Rampura Hamlet',
            spo2: parseInt(params.get('spo2')) || 91,
            bpSystolic: parseInt(params.get('bpSys')) || 160,
            bpDiastolic: parseInt(params.get('bpDia')) || 100,
            temperature: parseFloat(params.get('temp')) || 101.4,
            pulse: parseInt(params.get('pulse')) || 104,
            glucose: parseInt(params.get('glucose')) || 182,
            triageLevel: params.get('triage') || 'URGENT',
            priorityScore: parseInt(params.get('score')) || 94,
            facility: params.get('facility') || 'Community Health Center (Emergency Ready)',
            distanceKm: parseFloat(params.get('dist')) || 8.5,
            emergencyBedsAvailable: parseInt(params.get('beds')) || 12,
            healthWorker: params.get('worker') || 'Lakshmi Bai (ASHA Worker)',
            symptoms: ['Severe Chest Pain / Pressure', 'Difficulty Breathing', 'High Fever (>100°F)'],
            timestamp: new Date().toLocaleDateString('en-IN', { 
              day: '2-digit', 
              month: 'short', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          };
          setFormPassData(parsed);
          setCurrentView('form');
        } else {
          setCurrentView('form');
        }
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const handleOpenPass = (patient, facility) => {
    setPassPatient(patient);
    setPassFacility(facility);
    setIsPassModalOpen(true);
  };

  const handlePatientScanned = (patient) => {
    setScannedPatient(patient);
    setCurrentView('doctor');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'form':
        return (
          <DigitalReferralFormView
            passData={formPassData}
            onBack={() => {
              window.location.hash = '';
              setCurrentView('screening');
            }}
          />
        );
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
            onOpenScanner={() => setIsScannerModalOpen(true)}
            scannedPatient={scannedPatient}
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
      {currentView !== 'form' && (
        <OfflineBanner
          isOfflineSimulated={isOfflineSimulated}
          setIsOfflineSimulated={setIsOfflineSimulated}
        />
      )}

      {/* Mobile Simulation Wrapper if active */}
      {isMobileSimulated && currentView !== 'form' ? (
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
              onOpenScannerModal={() => setIsScannerModalOpen(true)}
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
          {/* Full Screen Layout */}
          {currentView !== 'form' && (
            <Navbar
              currentView={currentView}
              setCurrentView={setCurrentView}
              isMobileSimulated={isMobileSimulated}
              setIsMobileSimulated={setIsMobileSimulated}
              onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
              onOpenPatentModal={() => setIsPatentModalOpen(true)}
              onOpenScannerModal={() => setIsScannerModalOpen(true)}
            />
          )}

          <main className={`flex-1 ${currentView !== 'form' ? 'pb-16 lg:pb-8' : ''}`}>
            {renderCurrentView()}
          </main>

          {currentView !== 'form' && (
            <MobileNav
              currentView={currentView}
              setCurrentView={setCurrentView}
            />
          )}
        </>
      )}

      {/* Global Modals */}
      <QRScannerModal
        isOpen={isScannerModalOpen}
        onClose={() => setIsScannerModalOpen(false)}
        onPatientScanned={handlePatientScanned}
      />

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
        onOpenFormView={(data) => {
          setFormPassData(data);
          setCurrentView('form');
        }}
      />

      <PatentSummaryModal
        isOpen={isPatentModalOpen}
        onClose={() => setIsPatentModalOpen(false)}
      />
    </div>
  );
}
