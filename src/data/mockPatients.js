// Mock Patients with Longitudinal Timeline History
export const mockPatients = [
  {
    id: "P-1024",
    name: "Rameshamma Gowda",
    age: 62,
    gender: "Female",
    village: "Vijayawada",
    contact: "+91 94412 88301",
    triageLevel: "URGENT",
    priorityScore: 88,
    vitals: {
      spo2: 91,
      bpSystolic: 154,
      bpDiastolic: 96,
      temperature: 101.4,
      pulse: 104,
      glucose: 182
    },
    symptoms: ["Severe Breathlessness", "High Fever", "Persistent Cough", "Chest Tightness"],
    aiReasoning: [
      { factor: "Low SpO2 Saturation (91%)", weight: 45, detail: "Hypoxia risk requiring urgent oxygen support" },
      { factor: "Severe Respiratory Symptoms", weight: 30, detail: "Breathlessness combined with high fever (101.4°F)" },
      { factor: "Age Risk Factor (62 yrs)", weight: 15, detail: "Elevated vulnerability to respiratory complications" },
      { factor: "Stage 2 Hypertension (154/96)", weight: 10, detail: "Cardiovascular strain" }
    ],
    recommendedAction: "URGENT CLINICAL EVALUATION & OXYGEN STABILIZATION",
    recommendedFacilityId: "fac-2", // Recommends CHC B over PHC A because of Emergency Bed & Oxygen
    timestamp: "2026-09-11 09:30 AM",
    healthWorker: "ASHA - Lakshmi Bai",
    longitudinalTimeline: [
      { date: "Jan 14, 2026", event: "Routine Screening", symptoms: "Mild seasonal fever", vitals: "SpO2 97%, BP 130/84", triage: "ROUTINE" },
      { date: "Mar 22, 2026", event: "Follow-up Checkup", symptoms: "Occasional mild shortness of breath", vitals: "SpO2 95%, BP 138/88", triage: "PRIORITY" },
      { date: "Jun 10, 2026", event: "Hypertension Monitoring", symptoms: "Dizziness, high blood pressure", vitals: "SpO2 96%, BP 150/92", triage: "PRIORITY" },
      { date: "Sep 11, 2026", event: "Emergency Village Triage", symptoms: "Fever, Cough, Breathlessness, SpO2 91%", vitals: "SpO2 91%, BP 154/96", triage: "URGENT" }
    ]
  },
  {
    id: "P-1025",
    name: "Srinivas Rao",
    age: 48,
    gender: "Male",
    village: "Eluru",
    contact: "+91 98851 22440",
    triageLevel: "PRIORITY",
    priorityScore: 62,
    vitals: {
      spo2: 95,
      bpSystolic: 142,
      bpDiastolic: 90,
      temperature: 100.2,
      pulse: 88,
      glucose: 210
    },
    symptoms: ["Fever", "Excessive Thirst", "Fatigue", "Frequent Urination"],
    aiReasoning: [
      { factor: "Uncontrolled Blood Glucose (210 mg/dL)", weight: 40, detail: "Indicates hyperglycemia risk" },
      { factor: "Moderate Fever (100.2°F)", weight: 35, detail: "Possible secondary metabolic infection" },
      { factor: "Pre-hypertension (142/90)", weight: 25, detail: "Elevated systolic baseline" }
    ],
    recommendedAction: "CONSULT HEALTHCARE WORKER WITHIN 24 HOURS",
    recommendedFacilityId: "fac-1",
    timestamp: "2026-09-11 11:15 AM",
    healthWorker: "ANM - K. Sunitha",
    longitudinalTimeline: [
      { date: "Feb 05, 2026", event: "Diabetes Screening", symptoms: "Fatigue", vitals: "SpO2 98%, Glucose 190 mg/dL", triage: "PRIORITY" },
      { date: "Sep 11, 2026", event: "Village Health Drive", symptoms: "Fever + High Glucose", vitals: "Glucose 210 mg/dL, Temp 100.2°F", triage: "PRIORITY" }
    ]
  },
  {
    id: "P-1026",
    name: "Chandra Kala",
    age: 29,
    gender: "Female",
    village: "Vijayawada",
    contact: "+91 97003 44112",
    triageLevel: "ROUTINE",
    priorityScore: 24,
    vitals: {
      spo2: 98,
      bpSystolic: 118,
      bpDiastolic: 76,
      temperature: 98.6,
      pulse: 72,
      glucose: 95
    },
    symptoms: ["Mild Headache", "Slight Runny Nose"],
    aiReasoning: [
      { factor: "Normal Vitals Range", weight: 80, detail: "SpO2 98%, Normal Blood Pressure & Temperature" },
      { factor: "Mild Upper Respiratory Symptoms", weight: 20, detail: "Localized non-severe rhinitis" }
    ],
    recommendedAction: "SELF-CARE GUIDANCE & REST AT HOME",
    recommendedFacilityId: "fac-1",
    timestamp: "2026-09-11 01:45 PM",
    healthWorker: "ASHA - Lakshmi Bai",
    longitudinalTimeline: [
      { date: "Sep 11, 2026", event: "Routine Check", symptoms: "Mild headache", vitals: "SpO2 98%, Temp 98.6°F", triage: "ROUTINE" }
    ]
  },
  {
    id: "P-1027",
    name: "Balaiah Naidu",
    age: 71,
    gender: "Male",
    village: "Guntur",
    contact: "+91 91210 55667",
    triageLevel: "URGENT",
    priorityScore: 92,
    vitals: {
      spo2: 89,
      bpSystolic: 168,
      bpDiastolic: 102,
      temperature: 99.1,
      pulse: 112,
      glucose: 145
    },
    symptoms: ["Crushing Chest Pain", "Radiating Arm Pain", "Cold Sweats", "Shortness of Breath"],
    aiReasoning: [
      { factor: "Severe Acute Chest Pain & Sweats", weight: 50, detail: "High clinical indicator for Acute Coronary Syndrome" },
      { factor: "Severe Hypoxia (SpO2 89%)", weight: 30, detail: "Critical oxygen saturation deficit" },
      { factor: "Stage 3 Hypertension (168/102)", weight: 20, detail: "Severe cardiovascular distress" }
    ],
    recommendedAction: "IMMEDIATE AMBULANCE REFERRAL TO DISTRICT HOSPITAL (ICU CARE)",
    recommendedFacilityId: "fac-3",
    timestamp: "2026-09-11 02:20 PM",
    healthWorker: "ASHA - Radha Rani",
    longitudinalTimeline: [
      { date: "May 18, 2026", event: "Hypertension Check", symptoms: "Angina on exertion", vitals: "BP 158/98", triage: "PRIORITY" },
      { date: "Sep 11, 2026", event: "Emergency Triage", symptoms: "Chest pain, SpO2 89%", vitals: "SpO2 89%, BP 168/102", triage: "URGENT" }
    ]
  }
];
