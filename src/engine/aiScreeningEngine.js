/**
 * JEEVANSETU AI - Clinical Risk Screening & Triage Engine
 * Non-diagnostic, preliminary triage & explainable AI risk scoring
 * Follows WHO Emergency Triage Assessment (ETAT) & National Health Mission protocols
 */

import { commonSymptoms } from '../data/symptomRules';

export function analyzePatientHealth({ age, vitals, selectedSymptoms = [] }) {
  let riskScore = 0;
  const reasoning = [];

  const spo2 = Number(vitals.spo2) || 98;
  const bpSys = Number(vitals.bpSystolic) || 120;
  const bpDia = Number(vitals.bpDiastolic) || 80;
  const temp = Number(vitals.temperature) || 98.6;
  const glucose = Number(vitals.glucose) || 100;
  const patientAge = Number(age) || 35;

  // 1. Oxygen Saturation (SpO2) evaluation
  if (spo2 < 90) {
    riskScore += 45;
    reasoning.push({
      factor: `Severe Hypoxia Deficit (SpO2 ${spo2}%)`,
      weight: 45,
      detail: "Critical oxygen saturation below 90%. Immediate emergency intervention & oxygen support required."
    });
  } else if (spo2 <= 93) {
    riskScore += 30;
    reasoning.push({
      factor: `Moderate Oxygen Deficit (SpO2 ${spo2}%)`,
      weight: 30,
      detail: "Sub-optimal SpO2 level between 90-93%. Indicates respiratory compromise."
    });
  } else if (spo2 <= 95) {
    riskScore += 15;
    reasoning.push({
      factor: `Borderline SpO2 Reduction (${spo2}%)`,
      weight: 15,
      detail: "Borderline oxygen saturation requiring close clinical observation."
    });
  } else {
    reasoning.push({
      factor: `Normal SpO2 Saturation (${spo2}%)`,
      weight: 0,
      detail: "Adequate blood oxygenation."
    });
  }

  // 2. Body Temperature (Pyrexia) evaluation
  if (temp >= 103) {
    riskScore += 35;
    reasoning.push({
      factor: `Hyperpyrexia Severe Fever (${temp}°F)`,
      weight: 35,
      detail: "Dangerously high fever with acute febrile seizure/sepsis risk."
    });
  } else if (temp >= 101) {
    riskScore += 25;
    reasoning.push({
      factor: `High Grade Fever (${temp}°F)`,
      weight: 25,
      detail: "Significant active systemic infection requiring clinical antibiotic/malarial screening."
    });
  } else if (temp >= 99.5) {
    riskScore += 15;
    reasoning.push({
      factor: `Low-to-Moderate Fever (${temp}°F)`,
      weight: 15,
      detail: "Elevated temperature indicating inflammatory response."
    });
  }

  // 3. Blood Pressure evaluation
  if (bpSys >= 160 || bpDia >= 100) {
    riskScore += 30;
    reasoning.push({
      factor: `Stage 2 Severe Hypertension (${bpSys}/${bpDia} mmHg)`,
      weight: 30,
      detail: "High cardiovascular strain and risk of hypertensive emergency."
    });
  } else if (bpSys >= 135 || bpDia >= 85) {
    riskScore += 15;
    reasoning.push({
      factor: `Pre-hypertension / Stage 1 (${bpSys}/${bpDia} mmHg)`,
      weight: 15,
      detail: "Elevated baseline blood pressure."
    });
  }

  // 4. Blood Glucose evaluation
  if (glucose >= 200) {
    riskScore += 25;
    reasoning.push({
      factor: `Hyperglycemia Alert (${glucose} mg/dL)`,
      weight: 25,
      detail: "Severely elevated blood sugar level."
    });
  } else if (glucose >= 140) {
    riskScore += 10;
    reasoning.push({
      factor: `Impaired Glucose (${glucose} mg/dL)`,
      weight: 10,
      detail: "Borderline high fasting/random blood sugar."
    });
  }

  // 5. Age Risk Factor
  if (patientAge >= 65) {
    riskScore += 15;
    reasoning.push({
      factor: `Elderly Demographic Vulnerability (Age ${patientAge})`,
      weight: 15,
      detail: "Higher risk of rapid clinical decompensation."
    });
  } else if (patientAge <= 5) {
    riskScore += 15;
    reasoning.push({
      factor: `Pediatric Vulnerability (Age ${patientAge})`,
      weight: 15,
      detail: "High risk of dehydration and febrile complications."
    });
  }

  // 6. Selected Symptoms Evaluation using Clinical Risk Weights
  if (selectedSymptoms && selectedSymptoms.length > 0) {
    selectedSymptoms.forEach(symName => {
      const match = commonSymptoms.find(s => s.name.toLowerCase() === symName.toLowerCase()) ||
                    commonSymptoms.find(s => symName.toLowerCase().includes(s.name.toLowerCase().split(' ')[0]));

      if (match) {
        riskScore += match.riskWeight;
        reasoning.push({
          factor: match.name,
          weight: match.riskWeight,
          detail: match.critical ? "Critical red-flag emergency symptom." : "Active clinical complaint."
        });
      } else {
        // Fallback for custom symptom strings
        let weight = 10;
        if (symName.includes("Chest") || symName.includes("Breath")) weight = 35;
        else if (symName.includes("Fever") || symName.includes("Abdominal") || symName.includes("Vomit")) weight = 20;
        
        riskScore += weight;
        reasoning.push({
          factor: symName,
          weight,
          detail: "Reported patient symptom."
        });
      }
    });
  }

  // Normalize final score 0 - 100
  const finalScore = Math.min(Math.max(riskScore, 10), 99);

  // Determine Triage Level:
  const isHypoxic = spo2 < 92;
  const isHighPyrexia = temp >= 103;
  const hasChestPain = selectedSymptoms.some(s => s.toLowerCase().includes("chest"));
  const hasSevereBreathing = selectedSymptoms.some(s => s.toLowerCase().includes("breath") || s.toLowerCase().includes("shortness"));
  const hasHighFever = temp >= 100.4 || selectedSymptoms.some(s => s.toLowerCase().includes("fever"));
  const hasSevereStomach = selectedSymptoms.some(s => s.toLowerCase().includes("abdominal") || s.toLowerCase().includes("vomit"));

  let triageLevel = "ROUTINE";
  let recommendedAction = "";

  if (finalScore >= 70 || isHypoxic || isHighPyrexia || hasChestPain || hasSevereBreathing) {
    triageLevel = "URGENT";
    recommendedAction = "SEEK IMMEDIATE EMERGENCY MEDICAL EVALUATION & FACILITY TRANSFER";
  } else if (finalScore >= 35 || hasHighFever || hasSevereStomach || temp >= 100.0) {
    triageLevel = "PRIORITY";
    recommendedAction = "CONSULT HEALTHCARE WORKER OR PHC DOCTOR WITHIN 24 HOURS";
  } else {
    triageLevel = "ROUTINE";
    recommendedAction = "ROUTINE CARE, HYDRATION & RE-ASSESS IF SYMPTOMS WORSEN";
  }

  return {
    priorityScore: finalScore,
    overallScore: finalScore, // Alias for backward compatibility
    triageLevel,
    recommendedAction,
    aiReasoning: reasoning
  };
}
