import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Fetch latest release metadata from Firestore config/latestRelease
 */
export async function getLatestRelease() {
  try {
    const docRef = doc(db, 'config', 'latestRelease');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (err) {
    console.warn('Failed to fetch config/latestRelease from Firestore (offline/unconfigured):', err);
    return null;
  }
}

/**
 * Record an anonymous download event in Firestore collection 'downloads'
 */
export async function recordDownloadEvent({ versionCode, device = 'android' }) {
  try {
    const colRef = collection(db, 'downloads');
    await addDoc(colRef, {
      versionCode: Number(versionCode) || 1,
      createdAt: serverTimestamp(),
      source: 'web',
      device,
    });
    return true;
  } catch (err) {
    console.warn('Could not record download analytics to Firestore (non-blocking):', err);
    return false;
  }
}
