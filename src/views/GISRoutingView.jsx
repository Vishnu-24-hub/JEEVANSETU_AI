import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import {
  MapPin,
  Navigation,
  Sparkles,
  Loader2,
  AlertTriangle,
  RefreshCw,
  ShieldAlert,
  LocateFixed,
  Phone,
  Bed
} from 'lucide-react';

import useGeolocation from '../hooks/useGeolocation';
import { generateNearbyFacilities } from '../data/dynamicFacilities';
import { findBestFacilityFromList } from '../engine/facilityRoutingEngine';

// ─── Custom Leaflet marker icons ────────────────────────────────────────────
const makeIcon = (color) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="28" height="42">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 24 12 24s12-15 12-24C24 5.37 18.63 0 12 0z" fill="${color}" stroke="#fff" stroke-width="1.5"/>
    <circle cx="12" cy="12" r="5" fill="#fff"/>
  </svg>`;
  return L.icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(svg)}`,
    iconSize: [28, 42],
    iconAnchor: [14, 42],
    popupAnchor: [0, -44]
  });
};

const userIcon = makeIcon('#ef4444');   // red  – you
const phcIcon  = makeIcon('#f59e0b');   // amber – PHC
const chcIcon  = makeIcon('#10b981');   // green – CHC (recommended)
const hospIcon = makeIcon('#3b82f6');   // blue  – District Hospital

// ─── Map auto-re-center when coords change ───────────────────────────────────
function MapRecenter({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) map.setView([lat, lng], 12);
  }, [lat, lng, map]);
  return null;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function GISRoutingView() {
  const geo = useGeolocation();
  const [urgency, setUrgency] = useState('URGENT');
  const [patientSpo2, setPatientSpo2] = useState(91);

  // Derive facilities + routing result once we have GPS
  const facilities = geo.lat
    ? generateNearbyFacilities(geo.lat, geo.lng, geo.district)
    : [];

  const routingResult = facilities.length
    ? findBestFacilityFromList(
        facilities,
        urgency,
        ['Difficulty Breathing / Shortness of Breath', 'High Fever (>100°F)'],
        { spo2: patientSpo2 }
      )
    : null;

  const recommended = routingResult?.recommendedFacility;

  const polylineCoords =
    geo.lat && recommended
      ? [[geo.lat, geo.lng], [recommended.lat, recommended.lng]]
      : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-950 p-6 rounded-2xl border border-amber-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Navigation className="w-3.5 h-3.5" />
              Feature 3 & 4 — Capacity-Aware GIS Hospital Routing
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-white">
              Intelligent Hospital Routing — Live GPS Location
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              Uses your <strong>real device GPS</strong> to find the nearest suitable healthcare facility with available emergency beds and oxygen — not just the closest centre.
            </p>
          </div>

          {/* Urgency Tier Selector */}
          <div className="bg-slate-950/80 p-3 rounded-xl border border-amber-500/40 text-xs flex-shrink-0">
            <span className="text-amber-400 font-bold block mb-2">Simulate Triage Tier:</span>
            <div className="flex gap-2">
              {['URGENT', 'PRIORITY', 'ROUTINE'].map(tier => (
                <button
                  key={tier}
                  onClick={() => setUrgency(tier)}
                  className={`px-3 py-1.5 rounded text-[11px] font-extrabold transition-all ${
                    urgency === tier
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-600'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── GPS Status Panel ────────────────────────────────────────────────── */}
      {geo.loading && (
        <div className="bg-slate-900 border border-teal-500/40 p-5 rounded-2xl flex items-center gap-4 animate-pulse">
          <Loader2 className="w-8 h-8 text-teal-400 animate-spin flex-shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-white">Detecting Your GPS Location…</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Please allow location access when your browser asks. This helps find hospitals near you.
            </p>
          </div>
        </div>
      )}

      {geo.error && (
        <div className="bg-rose-500/10 border border-rose-500/40 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="p-2 bg-rose-500/20 text-rose-400 rounded-xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-white">
              {geo.permissionDenied ? "Location Permission Denied" : "GPS Error"}
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">{geo.error}</p>
            {geo.permissionDenied && (
              <p className="text-xs text-amber-300 mt-1">
                👉 Open browser Settings → Site Permissions → Location → Allow for this site, then retry.
              </p>
            )}
          </div>
          <button
            onClick={geo.retry}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl shadow-md"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Location</span>
          </button>
        </div>
      )}

      {geo.lat && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <LocateFixed className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-white text-sm">
                📍 GPS Detected: <span className="text-teal-300">{geo.villageName}</span>
                {geo.district && geo.district !== geo.villageName && (
                  <span className="text-slate-400">, {geo.district}</span>
                )}
                {geo.state && <span className="text-slate-500">, {geo.state}</span>}
              </p>
              <p className="text-slate-400 font-mono mt-0.5">
                {geo.lat.toFixed(6)}°N, {geo.lng.toFixed(6)}°E
              </p>
            </div>
          </div>
          <button
            onClick={geo.retry}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-white border border-slate-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh Location
          </button>
        </div>
      )}

      {/* ── Routing USP Banner ──────────────────────────────────────────────── */}
      {routingResult && (
        <div className="bg-slate-900 p-4 rounded-xl border border-teal-500/40 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300 flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <h4 className="font-bold text-white text-sm">
              AI Routing Decision (Key USP):
            </h4>
            <p className="text-slate-300 mt-0.5">{routingResult.capacityRoutingUSPReason}</p>
          </div>
        </div>
      )}

      {/* ── Main Content: Map + Cards ───────────────────────────────────────── */}
      {geo.lat ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Interactive Leaflet Map */}
          <div className="lg:col-span-7 bg-slate-900 p-3 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between px-2 pt-1 pb-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-400" />
                Live Map — Centered on Your GPS Location
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {geo.villageName} · OpenStreetMap
              </span>
            </div>

            <div className="h-[480px] w-full rounded-xl overflow-hidden border border-slate-800 relative">
              <MapContainer
                center={[geo.lat, geo.lng]}
                zoom={12}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
              >
                <MapRecenter lat={geo.lat} lng={geo.lng} />

                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* YOU are here */}
                <Marker position={[geo.lat, geo.lng]} icon={userIcon}>
                  <Popup>
                    <div className="text-xs font-sans">
                      <strong className="text-rose-600">📍 Your Location</strong><br />
                      {geo.villageName}, {geo.district}<br />
                      <span className="font-mono text-slate-600">
                        {geo.lat.toFixed(5)}, {geo.lng.toFixed(5)}
                      </span><br />
                      <span className="font-bold text-slate-800">Triage: {urgency}</span>
                    </div>
                  </Popup>
                </Marker>

                {/* Healthcare Facility Markers */}
                {facilities.map((fac) => {
                  const isRecommended = fac.id === recommended?.id;
                  const icon = fac.type === 'CHC' ? chcIcon : fac.type === 'District Hospital' ? hospIcon : phcIcon;
                  return (
                    <Marker key={fac.id} position={[fac.lat, fac.lng]} icon={icon}>
                      <Popup>
                        <div className="text-xs font-sans">
                          <strong>{fac.name}</strong><br />
                          {fac.typeFull}<br />
                          Distance: <strong>{fac.distanceKm} km</strong> ({fac.travelTimeMins} mins)<br />
                          Emergency Beds: <strong>{fac.emergencyBedsAvailable} free</strong><br />
                          Oxygen: {fac.hasOxygen ? "✅ Available" : "❌ Not available"}<br />
                          {isRecommended && (
                            <span className="inline-block mt-1 font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                              ⭐ AI Recommended for {urgency} Case
                            </span>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}

                {/* Routing Polyline */}
                {polylineCoords.length === 2 && (
                  <Polyline
                    positions={polylineCoords}
                    pathOptions={{ color: '#10b981', weight: 4, dashArray: '10, 8', opacity: 0.9 }}
                  />
                )}
              </MapContainer>
            </div>

            {/* Map Legend */}
            <div className="flex flex-wrap items-center gap-4 px-2 pt-3 pb-1 text-[11px]">
              {[
                { color: '#ef4444', label: 'Your Location' },
                { color: '#f59e0b', label: 'PHC (Primary)' },
                { color: '#10b981', label: 'CHC (Community) ✅' },
                { color: '#3b82f6', label: 'District Hospital' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-1.5 text-slate-400">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Facility Ranking Cards */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-base font-bold font-outfit text-white flex items-center justify-between">
              <span>Nearby Healthcare Centers</span>
              <span className="text-xs text-slate-400 font-mono">AI Ranked</span>
            </h3>

            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {routingResult?.evaluatedList
                .slice()
                .sort((a, b) => b.suitabilityScore - a.suitabilityScore)
                .map((fac) => {
                  const isRec = fac.id === recommended?.id;
                  return (
                    <div
                      key={fac.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isRec
                          ? 'bg-slate-900 border-emerald-500/70 shadow-xl shadow-emerald-950/40 ring-1 ring-emerald-500/30'
                          : 'bg-slate-950 border-slate-800/80 opacity-75'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-white leading-tight">{fac.name}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">{fac.typeFull}</p>
                        </div>
                        {isRec && (
                          <span className="flex-shrink-0 bg-emerald-500 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full">
                            BEST MATCH
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80 my-3 text-xs">
                        <div>
                          <span className="text-slate-500 block text-[10px]">Distance</span>
                          <span className="font-bold text-white">{fac.distanceKm} km</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">Travel</span>
                          <span className="font-bold text-slate-200">{fac.travelTimeMins} min</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">Emg. Beds</span>
                          <span className={`font-bold ${fac.emergencyBedsAvailable > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {fac.emergencyBedsAvailable} Free
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 text-[10px]">
                        {fac.hasOxygen && (
                          <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                            💨 Oxygen
                          </span>
                        )}
                        {fac.hasICU && (
                          <span className="bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded-full">
                            🏥 ICU
                          </span>
                        )}
                        {fac.hasEmergencyDoctor && (
                          <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                            👨‍⚕️ 24/7 Doctor
                          </span>
                        )}
                        {!fac.hasOxygen && !fac.hasICU && (
                          <span className="bg-slate-800/60 text-slate-500 border border-slate-700 px-2 py-0.5 rounded-full">
                            Basic Care Only
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-400">
                        <Phone className="w-3 h-3" />
                        <span>{fac.phone}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        !geo.loading && !geo.error && (
          <div className="bg-slate-900/60 p-12 rounded-2xl border border-dashed border-slate-800 text-center">
            <LocateFixed className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">Waiting for GPS permission…</p>
          </div>
        )
      )}
    </div>
  );
}
