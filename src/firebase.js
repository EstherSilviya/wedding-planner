import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDY1QbECTnHJ1ip2kAEyyTm9M_ZTX0z2kU",
  authDomain: "wedding-planner-app-b87fa.firebaseapp.com",
  projectId: "wedding-planner-app-b87fa",
  storageBucket: "wedding-planner-app-b87fa.firebasestorage.app",
  messagingSenderId: "979237256855",
  appId: "1:979237256855:web:267e6d0f22dbb0bca1f3d2"
};

// ✅ THIS FIXES THE ERROR
const app = getApps().length === 0 
  ? initializeApp(firebaseConfig) 
  : getApp();

export const db = getFirestore(app);