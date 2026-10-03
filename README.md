# 🏥 JEEVANSETU AI — Smart Rural Health & Emergency Triage Engine
### Smart India Hackathon (SIH 2026) • Problem Statement SIH26133

> **JEEVANSETU AI** is an end-to-end, offline-first AI triage, capacity-aware GIS hospital routing, and multilingual clinical decision support system designed specifically for rural hamlets, primary health centers (PHCs), ASHA workers, and district emergency response teams in India.

---

## 🌟 Key Highlights & Innovations

- **🇮🇳 Multi-Lingual Multimodal Voice Triage**: Supports Voice Intake in **Telugu, Hindi, and English** for semi-literate rural patients.
- **🛰️ Live Hardware GPS & Dynamic GIS Hospital Routing**: Auto-detects patient device location (e.g. Tadigadapa, Vijayawada) and routes patients to hospitals with **available emergency beds and oxygen**, not just the physically closest center.
- **📶 Rural Offline-First Architecture**: Operates 100% offline in remote hamlets using IndexedDB local storage, generating encrypted **QR Referral Passes**. Syncs automatically when cellular data recovers.
- **🔬 Explainable AI (XAI) Attribution**: Transparent feature-attribution bars for doctors showing exact clinical reasoning (SpO₂ weight, blood pressure threshold, symptom scores).
- **📊 Outbreak Analytics & Disease Radar**: Real-time epidemiological monitoring for early detection of fever clusters (Dengue, Malaria, Typhoid) across hamlets.
- **🏅 Patentable Innovations**: 3 claims ready for IP filing (Dual-Weight Capacity Triage, Multilingual Clinical Voice Parser, Offline QR Health Passport).

---

## 📱 System Modules & Workflow

```
[ 🩺 Rural Patient / ASHA Worker ]
                │
   ┌────────────┴────────────┐
   ▼                         ▼
 🗣️ Multilingual Voice   📱 Offline Rapid Intake
   (Telugu / Hindi)         (Hardware GPS Sync)
   └────────────┬────────────┘
                │
                ▼
 🧠 Offline AI Triage Engine (Vitals + Symptoms)
                │
                ├──► 🟢 ROUTINE  ──► Local PHC Advice
                ├──► 🟡 PRIORITY ──► Tele-Consultation Queue
                └──► 🔴 URGENT   ──► GIS Capacity-Aware Hospital Route
                                            │
                                            ▼
                                  🎟️ QR Referral Pass
                                  🏥 Hospital Desk Check-in
```

### Main Views:
1. **🔬 AI Risk Screening & Triage**: Sliders for vitals (SpO₂, BP, Temp, Glucose), interactive symptoms, and instant XAI risk scoring.
2. **👷 ASHA & ANM Mobile Village Mode**: High-density door-to-door triage list with village filtering and rapid intake form.
3. **👨‍⚕️ Doctor Review & Patient Timeline**: Longitudinal health timeline with multi-month vitals progression tracking.
4. **🗺️ GIS Capacity-Aware Hospital Routing**: Live Leaflet map auto-centered on device GPS with bed & oxygen availability filters.
5. **📈 Epidemic Outbreak Analytics**: Disease heatmap, 7-day trend analysis, and automated hamlet alert triggers.
6. **🏆 SIH Pitch & Patent Dossier**: Comprehensive pitch metrics, impact comparison, and patent claim documentation.

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation Commands

```bash
# 1. Clone the repository
git clone https://github.com/your-username/jeevansetu-ai.git
cd jeevansetu-ai

# 2. Install dependencies
npm install

# 3. Start the local dev server
npm run dev
```

The application will be live at `http://localhost:3000`.

### Production Build

```bash
# Build static production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| **Frontend Framework** | React 18 + Vite |
| **Styling & UI Design** | Custom Vanilla CSS + TailwindCSS + Lucide Icons |
| **Mapping & GIS** | Leaflet + React-Leaflet + OpenStreetMap Nominatim |
| **Geolocation API** | Browser Geolocation API (Hardware GPS + Offline LocalStorage Cache) |
| **State & Offline Storage** | React State + LocalStorage / IndexedDB Sync Queue |
| **Typography** | Outfit & Inter (Google Fonts) |

---

## 🏅 Patent Claims Overview

1. **Claim 1 (System)**: Capacity-Aware Dynamic GIS Emergency Routing Algorithm incorporating real-time ICU/Oxygen availability weights.
2. **Claim 2 (Method)**: Multilingual Rural Vernacular Clinical Entity Extraction & Risk Scoring Engine.
3. **Claim 3 (Device/Data)**: Zero-Connectivity Cryptographic QR Pass System for Rural Patient Transfer.

---

## 📄 License & Intellectual Property
Developed for **Smart India Hackathon (SIH 2026)** — Problem Statement SIH26133.
All rights reserved. Patent filing pending.
