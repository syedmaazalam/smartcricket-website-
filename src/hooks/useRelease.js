import { useState, useEffect } from 'react';
import { getLatestRelease } from '../lib/firestore';

const STATIC_FALLBACK_RELEASE = {
  versionCode: 3,
  versionName: '1.3',
  fileSize: '4.63 MB',
  releaseDate: 'November 2026',
  apkUrl: 'https://github.com/syedmaazalam/cricket-scorer/releases/download/v1.3/SmartCricket.apk',
  notes: 'Redesigned Home Screen with matches under search bar, mandatory bowler assignment, mid-over bowling changes, and live streaming.',
  force: false,
};

export function useRelease() {
  const [releaseData, setReleaseData] = useState(STATIC_FALLBACK_RELEASE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadRelease() {
      try {
        setLoading(true);
        const data = await getLatestRelease();
        if (isMounted) {
          if (data) {
            setReleaseData({
              versionCode: data.versionCode || 3,
              versionName: data.versionName || '1.3',
              fileSize: data.fileSize || '4.63 MB',
              releaseDate: data.releasedAt || data.releaseDate || 'November 2026',
              apkUrl: data.apkUrl || STATIC_FALLBACK_RELEASE.apkUrl,
              notes: data.notes || STATIC_FALLBACK_RELEASE.notes,
              force: !!data.force,
            });
          } else {
            setReleaseData(STATIC_FALLBACK_RELEASE);
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setReleaseData(STATIC_FALLBACK_RELEASE);
          setLoading(false);
        }
      }
    }

    loadRelease();

    return () => {
      isMounted = false;
    };
  }, []);

  return { releaseData, loading, error };
}
