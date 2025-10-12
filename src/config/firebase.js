import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// These are the same credentials from your Flutter app
const firebaseConfig = {
  apiKey: "AIzaSyBXTJBo7tLCrl0Oqeh5m9ccjOozAurpeMI",
  authDomain: "flutterfirebaseapp-4908e.firebaseapp.com",
  projectId: "flutterfirebaseapp-4908e",
  storageBucket: "flutterfirebaseapp-4908e.firebasestorage.app",
  messagingSenderId: "22129348483",
  appId: "1:22129348483:web:351e391a99e8c2852870b6",
  measurementId: "G-6LK4TSS6NH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
