import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// ✅ Environment Variables
const env = import.meta.env;

const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
];

// ✅ Missing Key Check (only in dev)
if (import.meta.env.DEV) {
  const missingVars = requiredEnvVars.filter(
    (key) => !env[key] || env[key].startsWith('your_')
  );

  if (missingVars.length > 0) {
    console.error('❌ Missing Firebase ENV variables:', missingVars);
    console.error(
      '👉 Check your `.env` file or Netlify environment settings.'
    );
  }
}

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

// ✅ Initialize App
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// ✅ Export Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
