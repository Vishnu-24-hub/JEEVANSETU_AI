// Symptom Options and Clinical Triage Rules Data
export const commonSymptoms = [
  { id: "sym-1", name: "High Fever (>100°F)", category: "General", riskWeight: 20 },
  { id: "sym-2", name: "Persistent Cough", category: "Respiratory", riskWeight: 15 },
  { id: "sym-3", name: "Difficulty Breathing / Shortness of Breath", category: "Respiratory", riskWeight: 40, critical: true },
  { id: "sym-4", name: "Chest Pain / Pressure", category: "Cardiovascular", riskWeight: 45, critical: true },
  { id: "sym-5", name: "Cold Sweats & Dizziness", category: "Cardiovascular", riskWeight: 30 },
  { id: "sym-6", name: "Excessive Thirst & Frequent Urination", category: "Metabolic", riskWeight: 15 },
  { id: "sym-7", name: "Severe Abdominal Pain", category: "Gastrointestinal", riskWeight: 25 },
  { id: "sym-8", name: "Frequent Vomiting / Dehydration", category: "Gastrointestinal", riskWeight: 20 },
  { id: "sym-9", name: "Joint Pain & High Rash", category: "General", riskWeight: 15 },
  { id: "sym-10", name: "Mild Headache & Fatigue", category: "General", riskWeight: 5 }
];

export const IndianLanguages = [
  { code: "te-IN", name: "తెలుగు (Telugu)" },
  { code: "hi-IN", name: "हिन्दी (Hindi)" },
  { code: "ta-IN", name: "தமிழ் (Tamil)" },
  { code: "kn-IN", name: "கன்னட (Kannada)" },
  { code: "mr-IN", name: "मराठी (Marathi)" },
  { code: "bn-IN", name: "বাংলা (Bengali)" },
  { code: "en-IN", name: "English (India)" }
];
