// ✅ CORRECT: Use environment variables
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get, set, update, remove } from "firebase/database";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";

// ✅ Load config from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// ✅ Validate config exists
const requiredFields = ['apiKey', 'authDomain', 'databaseURL', 'projectId', 'appId'];
const missingFields = requiredFields.filter(field => !firebaseConfig[field]);

if (missingFields.length > 0) {
  console.error('❌ Missing Firebase config:', missingFields);
  console.error('Please check your .env file');
  throw new Error(`Missing Firebase config: ${missingFields.join(', ')}`);
}

console.log('✅ Firebase config loaded from environment variables');

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Cloud Functions
const functions = getFunctions(app, "asia-south1");

// Connect to emulator only during local development
if (import.meta.env.DEV) {
  connectFunctionsEmulator(functions, "127.0.0.1", 5002);
  console.log("🔵 Using Functions Emulator at 127.0.0.1:5002");
}

const createOrder = httpsCallable(functions, "createOrder");
const verifyPayment = httpsCallable(functions, "verifyPayment");
const sendEmails = httpsCallable(functions, "sendEmails");
const testEmail = httpsCallable(functions, "testEmail");

export {
  db,
  ref,
  onValue,
  get,
  set,
  update,
  remove,
  createOrder,
  verifyPayment,
  sendEmails,
  testEmail,
};