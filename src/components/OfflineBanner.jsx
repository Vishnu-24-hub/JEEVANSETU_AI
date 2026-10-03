import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';
import { getPendingSyncQueue, clearSyncQueue } from '../engine/offlineStorageEngine';

export default function OfflineBanner({ isOfflineSimulated, setIsOfflineSimulated, onDataSynced }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingCount, setPendingCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showSyncedToast, setShowSyncedToast] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    updateCount();
    const interval = setInterval(updateCount, 2000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  const updateCount = () => {
    const queue = getPendingSyncQueue();
    setPendingCount(queue.length);
  };

  const currentNetworkOnline = isOnline && !isOfflineSimulated;

  const handleSyncNow = () => {
    if (!currentNetworkOnline) return;
    setIsSyncing(true);
    setTimeout(() => {
      clearSyncQueue();
      setIsSyncing(false);
      setPendingCount(0);
      setShowSyncedToast(true);
      if (onDataSynced) onDataSynced();
      setTimeout(() => setShowSyncedToast(false), 3000);
    }, 1500);
  };

  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 px-4 py-2 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
      {/* Network Status Indicator */}
      <div className="flex items-center gap-2">
        {currentNetworkOnline ? (
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <Wifi className="w-3.5 h-3.5 animate-pulse" />
            <span>ONLINE — Cloud Sync Active</span>
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-amber-400 font-medium bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            <WifiOff className="w-3.5 h-3.5 animate-bounce" />
            <span>OFFLINE MODE — Local Queue Storage Enabled</span>
          </span>
        )}

        {/* Simulator Toggle Button */}
        <button
          onClick={() => setIsOfflineSimulated(!isOfflineSimulated)}
          className="ml-2 underline text-slate-400 hover:text-white transition-colors"
          title="Toggle network simulation for demo"
        >
          [{isOfflineSimulated ? "Disable Offline Simulation" : "Simulate Rural Offline Mode"}]
        </button>
      </div>

      {/* Pending Sync Controls */}
      <div className="flex items-center gap-3">
        {pendingCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-amber-300 font-semibold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              {pendingCount} record{pendingCount > 1 ? 's' : ''} stored offline
            </span>
            <button
              onClick={handleSyncNow}
              disabled={!currentNetworkOnline || isSyncing}
              className={`flex items-center gap-1 px-3 py-1 rounded font-medium transition-all ${
                currentNetworkOnline
                  ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-900/40'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? "Syncing..." : "Sync Now"}
            </button>
          </div>
        )}

        {showSyncedToast && (
          <span className="flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/20 px-2.5 py-1 rounded">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Successfully synced to Doctor Dashboard!
          </span>
        )}
      </div>
    </div>
  );
}
