/**
 * JEEVANSETU AI - Custom Geolocation Hook (v2)
 * 
 * Features:
 * - Real device GPS via navigator.geolocation (works OFFLINE — hardware GPS)
 * - Reverse geocode via Nominatim (requires internet — skipped offline)
 * - Caches last known location in localStorage → works in offline/rural mode
 * - Auto-loads cached location instantly on mount, then updates with live GPS
 */

import { useState, useEffect } from 'react';

const CACHE_KEY = 'jeevansetu_last_known_location';

function loadCachedLocation() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveCachedLocation(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      ...data,
      cachedAt: new Date().toISOString()
    }));
  } catch {}
}

async function reverseGeocode(lat, lng) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=18&addressdetails=1`,
    {
      headers: { 'Accept-Language': 'en-IN,en', 'User-Agent': 'JeevansetuAI/1.0' },
      signal: AbortSignal.timeout(8000)   // 8-second timeout
    }
  );
  if (!res.ok) throw new Error('Nominatim error');
  const data = await res.json();
  const addr = data.address || {};

  // Priority order for village name — Indian address hierarchy
  const villageName =
    addr.village ||
    addr.hamlet ||
    addr.suburb ||
    addr.neighbourhood ||
    addr.quarter ||
    addr.town ||
    addr.city_block ||
    addr.residential ||
    addr.county ||
    'Your Location';

  const district =
    addr.state_district ||
    addr.county ||
    addr.city ||
    addr.town ||
    '';

  const state = addr.state || 'India';

  return { villageName, district, state };
}

export default function useGeolocation() {
  // Start from cache immediately for instant offline experience
  const cached = loadCachedLocation();

  const [location, setLocation] = useState({
    lat: cached?.lat ?? null,
    lng: cached?.lng ?? null,
    villageName: cached?.villageName ?? null,
    district: cached?.district ?? null,
    state: cached?.state ?? null,
    isFromCache: !!cached,
    loading: true,
    error: null,
    permissionDenied: false,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        loading: false,
        error: 'Geolocation not supported by this browser.'
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;

        // Immediately update with fresh GPS coordinates (even before geocoding)
        setLocation(prev => ({ ...prev, lat, lng, loading: false, error: null, permissionDenied: false }));

        // Try to reverse-geocode (requires internet — gracefully skip if offline)
        const isOnline = navigator.onLine;
        if (isOnline) {
          try {
            const place = await reverseGeocode(lat, lng);
            const updated = { lat, lng, ...place, isFromCache: false, loading: false, error: null, permissionDenied: false };
            setLocation(updated);
            saveCachedLocation(updated);
          } catch {
            // Geocoding failed (e.g. slow network) — use GPS coords + cached name if available
            const fallbackName = cached?.villageName ?? 'Detected Location';
            const fallbackDistrict = cached?.district ?? '';
            const partial = {
              lat, lng,
              villageName: fallbackName,
              district: fallbackDistrict,
              state: cached?.state ?? 'India',
              isFromCache: true, loading: false, error: null, permissionDenied: false
            };
            setLocation(partial);
            saveCachedLocation(partial);
          }
        } else {
          // OFFLINE: GPS coordinates available, place name from cache
          const fallbackName = cached?.villageName ?? 'Your GPS Location';
          const partial = {
            lat, lng,
            villageName: fallbackName,
            district: cached?.district ?? '',
            state: cached?.state ?? 'India',
            isFromCache: true, loading: false, error: null, permissionDenied: false
          };
          setLocation(partial);
          saveCachedLocation(partial);
        }
      },
      (err) => {
        const denied = err.code === 1;
        if (cached) {
          // GPS denied but we have a cached location — use it silently
          setLocation({
            lat: cached.lat,
            lng: cached.lng,
            villageName: cached.villageName,
            district: cached.district,
            state: cached.state,
            isFromCache: true,
            loading: false,
            error: denied
              ? 'GPS access denied. Showing last known location.'
              : 'GPS unavailable. Showing last known location.',
            permissionDenied: denied,
          });
        } else {
          // No cache + GPS failed (common on desktop browsers offline) -> Fallback to default rural GPS coordinates
          const fallbackData = {
            lat: 16.4970,
            lng: 80.6814,
            villageName: 'Tadigadapa (Offline GPS)',
            district: 'Krishna',
            state: 'Andhra Pradesh',
            isFromCache: true,
            loading: false,
            permissionDenied: denied,
            error: null // Graceful fallback
          };
          setLocation(fallbackData);
          saveCachedLocation(fallbackData);
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 }
    );
  }, []);

  const retry = () => {
    setLocation(prev => ({ ...prev, loading: true, error: null }));
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setLocation(prev => ({ ...prev, lat, lng, loading: false, error: null }));
        if (navigator.onLine) {
          try {
            const place = await reverseGeocode(lat, lng);
            const updated = { lat, lng, ...place, isFromCache: false, loading: false, error: null, permissionDenied: false };
            setLocation(updated);
            saveCachedLocation(updated);
          } catch {
            setLocation(prev => ({ ...prev, loading: false }));
          }
        } else {
          setLocation(prev => ({
            ...prev, lat, lng, loading: false,
            villageName: prev.villageName || 'Your GPS Location'
          }));
        }
      },
      (err) => {
        const fallbackData = {
          lat: 16.4970,
          lng: 80.6814,
          villageName: 'Tadigadapa (Offline GPS)',
          district: 'Krishna',
          state: 'Andhra Pradesh',
          isFromCache: true,
          loading: false,
          permissionDenied: err.code === 1,
          error: null
        };
        setLocation(fallbackData);
        saveCachedLocation(fallbackData);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  return { ...location, retry };
}
