import { useState, useEffect } from 'react';
import { getLatestRelease } from '../lib/firestore';

const STATIC_FALLBACK_RELEASE = {
  versionCode: 1,
  versionName: '1.0',
  fileSize: '4.4 MB',
  releaseDate: 'November 2026',
  apkUrl: 'https://drive.usercontent.google.com/download?id=1ddi2Wws_dbTjswFrdqB2DK6FgzpB1341&export=download&confirm=t',
  notes: 'Complete offline-first scoring engine, real-time live match streaming, and MCC law compliance.',
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
              versionCode: data.versionCode || 1,
              versionName: data.versionName || '1.0',
              fileSize: data.fileSize || '4.4 MB',
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
