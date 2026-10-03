// Mock Population Health & Anomaly Detection Data
export const mockVillageStats = [
  {
    villageId: "v-1",
    villageName: "Vijayawada",
    population: 34200,
    totalScreenedThisMonth: 412,
    symptomDistribution: {
      respiratory: 34, // % high alert
      fever: 28,
      hypertension: 14,
      diabetes: 12,
      gastrointestinal: 7,
      other: 5
    },
    outbreakStatus: "CRITICAL_ANOMALY",
    anomalyDetails: {
      title: "Sudden Spike in Respiratory Fever Cluster",
      increasePercentage: 35.4,
      affectedHouseholds: 42,
      suspectedTrigger: "Viral Bronchial Infection / Seasonal Dengue Cluster",
      recommendedGovtAction: "Deploy Mobile Medical Unit (MMU) & Vector Control Team in Vijayawada"
    },
    trendData: [
      { day: "Mon", fever: 8, respiratory: 6 },
      { day: "Tue", fever: 11, respiratory: 9 },
      { day: "Wed", fever: 14, respiratory: 12 },
      { day: "Thu", fever: 22, respiratory: 19 },
      { day: "Fri", fever: 31, respiratory: 27 },
      { day: "Sat", fever: 45, respiratory: 38 },
      { day: "Sun", fever: 58, respiratory: 49 }
    ]
  },
  {
    villageId: "v-2",
    villageName: "Eluru",
    population: 28900,
    totalScreenedThisMonth: 310,
    symptomDistribution: {
      respiratory: 12,
      fever: 14,
      hypertension: 22,
      diabetes: 28,
      gastrointestinal: 16,
      other: 8
    },
    outbreakStatus: "NORMAL",
    anomalyDetails: null,
    trendData: [
      { day: "Mon", fever: 4, respiratory: 3 },
      { day: "Tue", fever: 5, respiratory: 3 },
      { day: "Wed", fever: 4, respiratory: 4 },
      { day: "Thu", fever: 6, respiratory: 3 },
      { day: "Fri", fever: 5, respiratory: 4 },
      { day: "Sat", fever: 5, respiratory: 4 },
      { day: "Sun", fever: 6, respiratory: 5 }
    ]
  },
  {
    villageId: "v-3",
    villageName: "Guntur",
    population: 41500,
    totalScreenedThisMonth: 520,
    symptomDistribution: {
      respiratory: 18,
      fever: 16,
      hypertension: 24,
      diabetes: 19,
      gastrointestinal: 15,
      other: 8
    },
    outbreakStatus: "MODERATE_WATCH",
    anomalyDetails: {
      title: "Elevated Water-Borne Diarrhea Reports",
      increasePercentage: 18.2,
      affectedHouseholds: 19,
      suspectedTrigger: "Contaminated Water Supply Pipeline in Guntur Rural",
      recommendedGovtAction: "Distribute ORS Packets & Chlorinate Local Water Tanks in Guntur"
    },
    trendData: [
      { day: "Mon", fever: 10, respiratory: 8 },
      { day: "Tue", fever: 12, respiratory: 9 },
      { day: "Wed", fever: 13, respiratory: 11 },
      { day: "Thu", fever: 15, respiratory: 12 },
      { day: "Fri", fever: 18, respiratory: 14 },
      { day: "Sat", fever: 20, respiratory: 16 },
      { day: "Sun", fever: 22, respiratory: 18 }
    ]
  }
];
