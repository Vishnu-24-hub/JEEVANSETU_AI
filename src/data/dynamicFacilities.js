/**
 * JEEVANSETU AI - Dynamic Facility Generator
 * Generates realistic nearby healthcare facility positions relative to user's GPS coordinates.
 * Facilities are placed at real-world offsets (lat/lng delta) from user position.
 */

/**
 * Convert km distance to approximate lat/lng degree offsets.
 * @param {number} userLat  - User latitude (degrees)
 * @param {number} kmNorth  - km offset north (+) or south (-)
 * @param {number} kmEast   - km offset east (+) or west (-)
 * @returns {{ lat: number, lng: number }}
 */
function offsetCoords(userLat, userLng, kmNorth, kmEast) {
  const latOffset = kmNorth / 111.32;
  const lngOffset = kmEast / (111.32 * Math.cos((userLat * Math.PI) / 180));
  return {
    lat: parseFloat((userLat + latOffset).toFixed(6)),
    lng: parseFloat((userLng + lngOffset).toFixed(6)),
  };
}

/**
 * Generates 4 nearby healthcare facilities relative to the user's real GPS location.
 * @param {number} userLat
 * @param {number} userLng
 * @param {string} district
 * @returns {Array} facility objects with real lat/lng
 */
export function generateNearbyFacilities(userLat, userLng, district = "Nearby District") {
  const phcA = offsetCoords(userLat, userLng, 3.1, -2.2);   // PHC ~3.8 km away (close, no oxygen)
  const chcB = offsetCoords(userLat, userLng, 6.8, 4.5);    // CHC ~8.2 km away (emergency beds, oxygen)
  const hospC = offsetCoords(userLat, userLng, 14.2, 10.1); // District Hospital ~17.5 km away
  const phcD = offsetCoords(userLat, userLng, -4.3, 2.1);   // Sub-PHC ~4.7 km away (routine care)

  return [
    {
      id: "fac-1",
      name: `${district} Primary Health Center (PHC A)`,
      type: "PHC",
      typeFull: "Primary Health Center",
      lat: phcA.lat,
      lng: phcA.lng,
      distanceKm: 3.8,
      travelTimeMins: 11,
      totalBeds: 6,
      emergencyBedsAvailable: 0,
      hasOxygen: false,
      hasICU: false,
      hasBloodBank: false,
      hasEmergencyDoctor: false,
      services: ["General Consultation", "Basic Immunization", "First Aid"],
      phone: "+91 98480 11223",
      doctorInCharge: "Dr. K. Saroja",
      address: `${district} PHC, Mandal Center`,
      status: "Limited Capacity"
    },
    {
      id: "fac-2",
      name: `${district} Community Health Center (CHC B)`,
      type: "CHC",
      typeFull: "Community Health Center",
      lat: chcB.lat,
      lng: chcB.lng,
      distanceKm: 8.2,
      travelTimeMins: 21,
      totalBeds: 30,
      emergencyBedsAvailable: 12,
      hasOxygen: true,
      hasICU: true,
      hasBloodBank: true,
      hasEmergencyDoctor: true,
      services: ["Emergency Stabilization", "Oxygen Support", "24/7 Casualty", "Basic Surgery", "Pediatric Care"],
      phone: "+91 98480 44556",
      doctorInCharge: "Dr. R. V. Sharma",
      address: `NH Bypass Road, ${district}`,
      status: "Available — Recommended for Emergency Triage"
    },
    {
      id: "fac-3",
      name: `${district} Government District Hospital`,
      type: "District Hospital",
      typeFull: "Government District Hospital",
      lat: hospC.lat,
      lng: hospC.lng,
      distanceKm: 17.5,
      travelTimeMins: 36,
      totalBeds: 150,
      emergencyBedsAvailable: 46,
      hasOxygen: true,
      hasICU: true,
      hasBloodBank: true,
      hasEmergencyDoctor: true,
      services: ["Advanced ICU", "Trauma Care", "CT Scan", "Dialysis", "Ventilators", "Multispecialty Surgery"],
      phone: "+91 98480 77889",
      doctorInCharge: "Dr. Ananya Reddy",
      address: `Collectorate Road, ${district}`,
      status: "High Capacity Tertiary Center"
    },
    {
      id: "fac-4",
      name: `Sub-Primary Health Center (PHC D)`,
      type: "PHC",
      typeFull: "Sub-Primary Health Center",
      lat: phcD.lat,
      lng: phcD.lng,
      distanceKm: 4.7,
      travelTimeMins: 14,
      totalBeds: 4,
      emergencyBedsAvailable: 1,
      hasOxygen: false,
      hasICU: false,
      hasBloodBank: false,
      hasEmergencyDoctor: false,
      services: ["Maternal Screening", "Routine Fever Checkup", "Basic Medicines Distribution"],
      phone: "+91 98480 99001",
      doctorInCharge: "ANM Health Worker",
      address: `Local Area Sub-Center`,
      status: "Routine Care Only"
    }
  ];
}
