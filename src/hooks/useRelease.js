import { useState, useEffect } from 'react';
import { getLatestRelease } from '../lib/firestore';

const STATIC_FALLBACK_RELEASE = {
  versionCode: 4,
  versionName: '1.3.1',
  fileSize: '5.6 MB',
  releaseDate: 'November 2026',
  apkUrl: '/SmartCricket.apk',
  notes: 'POTM scoring system update, match engine stats tracking (dismissed, bowled/LBW, extras, direct run-outs), over comparison score metrics cleanup, and teams worm graph view by default.',
  force: false,
};

async function probeApkFileSize(apkUrl = '/SmartCricket.apk') {
  try {
    const res = await fetch(apkUrl, { method: 'HEAD' });
    const cl = res.headers.get('content-length');
    if (cl) {
      const bytes = parseInt(cl, 10);
      if (!isNaN(bytes) && bytes > 0) {
        return (bytes / 1000000).toFixed(1) + ' MB';
      }
    }
  } catch {}
  return '5.6 MB';
}

export function useRelease() {
  const [releaseData, setReleaseData] = useState(STATIC_FALLBACK_RELEASE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadRelease() {
      try {
        setLoading(true);
        const [data, probedSize] = await Promise.all([
          getLatestRelease().catch(() => null),
          probeApkFileSize('/SmartCricket.apk')
        ]);

        if (isMounted) {
          const effectiveSize = (data?.fileSize && data.fileSize !== '6.16 MB') ? data.fileSize : probedSize;
          if (data) {
            setReleaseData({
              versionCode: data.versionCode || 4,
              versionName: data.versionName || '1.3.1',
              fileSize: effectiveSize,
              releaseDate: data.releasedAt || data.releaseDate || 'November 2026',
              apkUrl: data.apkUrl || STATIC_FALLBACK_RELEASE.apkUrl,
              notes: data.notes || STATIC_FALLBACK_RELEASE.notes,
              force: !!data.force,
            });
          } else {
            setReleaseData({
              ...STATIC_FALLBACK_RELEASE,
              fileSize: effectiveSize
            });
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
