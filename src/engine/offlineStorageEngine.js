/**
 * JEEVANSETU AI - Offline Storage & Sync Engine
 * LocalStorage queue for field health workers operating without internet
 */

const STORAGE_KEY = "jeevansetu_offline_patients";
const OFFLINE_QUEUE_KEY = "jeevansetu_pending_sync_queue";

export function getLocalPatients() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error reading local patients:", e);
    return [];
  }
}

export function savePatientLocally(patientData) {
  try {
    const existing = getLocalPatients();
    const isOffline = !navigator.onLine;

    const record = {
      ...patientData,
      id: patientData.id || `P-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleString(),
      isOfflineCreated: isOffline,
      synced: !isOffline
    };

    const updated = [record, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    if (isOffline) {
      const queue = getPendingSyncQueue();
      queue.push(record);
      localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
    }

    return record;
  } catch (e) {
    console.error("Error saving patient locally:", e);
    return null;
  }
}

export function getPendingSyncQueue() {
  try {
    const raw = localStorage.getItem(OFFLINE_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function clearSyncQueue() {
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify([]));
  // Mark all stored patients as synced
  const existing = getLocalPatients();
  const synced = existing.map(p => ({ ...p, synced: true }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(synced));
}
