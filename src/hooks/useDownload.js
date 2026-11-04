import { useCallback } from 'react';
import { recordDownloadEvent } from '../lib/firestore';

function getDeviceType() {
  const ua = navigator.userAgent.toLowerCase();
  if (/android/.test(ua)) {
    return 'android';
  }
  if (/iphone|ipad|ipod/.test(ua)) {
    return 'ios';
  }
  return 'desktop';
}

export function useDownload(releaseData) {
  const handleDownload = useCallback(
    async (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      const versionCode = releaseData?.versionCode || 1;
      const apkUrl = releaseData?.apkUrl || '#';
      const storageKey = `sc_download_v${versionCode}`;
      const device = getDeviceType();

      // Check 24-hour dedup in localStorage
      let shouldRecord = true;
      try {
        const lastRecorded = localStorage.getItem(storageKey);
        if (lastRecorded) {
          const elapsed = Date.now() - parseInt(lastRecorded, 10);
          const twentyFourHours = 24 * 60 * 60 * 1000;
          if (elapsed < twentyFourHours) {
            shouldRecord = false;
          }
        }
      } catch (err) {
        // LocalStorage disabled / blocked
      }

      // Record to Firestore if not counted in last 24h
      if (shouldRecord) {
        try {
          recordDownloadEvent({ versionCode, device });
          localStorage.setItem(storageKey, Date.now().toString());
        } catch (err) {
          console.warn('Non-blocking download tracking error:', err);
        }
      }

      // Start the download immediately
      if (apkUrl && apkUrl !== '#') {
        window.location.href = apkUrl;
      }
    },
    [releaseData]
  );

  return { handleDownload };
}
