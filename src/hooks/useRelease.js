import { useState, useEffect } from 'react';
import { getLatestRelease } from '../lib/firestore';

const STATIC_FALLBACK_RELEASE = {
  versionCode: 6,
  versionName: '1.3.3',
  fileSize: '5.4 MB',
  releaseDate: 'November 2026',
  apkUrl: '/SmartCricket.apk',
  notes: 'Responsive scorecard & summary action toolbars with visible Infographic buttons, 3200x1600 broadcast scorecard, and Top 4 infographics.',
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
  return '5.4 MB';
}

async function fetchStaticVersionJson() {
  try {
    const res = await fetch('/version.json');
    if (res.ok) {
      return await res.json();
    }
  } catch {}
  return null;
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
        const [cloudData, staticJson, probedSize] = await Promise.all([
          getLatestRelease().catch(() => null),
          fetchStaticVersionJson().catch(() => null),
          probeApkFileSize('/SmartCricket.apk')
        ]);

        if (isMounted) {
          const data = cloudData || staticJson;
          const effectiveSize = (data?.fileSize && data.fileSize !== '6.16 MB') ? data.fileSize : probedSize;
          if (data) {
            setReleaseData({
              versionCode: data.versionCode || STATIC_FALLBACK_RELEASE.versionCode,
              versionName: data.versionName || STATIC_FALLBACK_RELEASE.versionName,
              fileSize: effectiveSize,
              releaseDate: data.releasedAt || data.releaseDate || STATIC_FALLBACK_RELEASE.releaseDate,
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
