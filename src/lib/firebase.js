import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'smartcricket-c79b5.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'smartcricket-c79b5',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'smartcricket-c79b5.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '44577848123',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:44577848123:web:6e9cba4afa547467fe551e',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-RD9P93REJX',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { app, db };
