// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore as getFireStore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUnbnW7QC_5jDUF6rd8xpLlIXexdbTS74",
  authDomain: "prepwise-1bcb8.firebaseapp.com",
  projectId: "prepwise-1bcb8",
  storageBucket: "prepwise-1bcb8.firebasestorage.app",
  messagingSenderId: "519801379340",
  appId: "1:519801379340:web:2b20a1903cdba91e826c29",
  measurementId: "G-XWS8K02K8N"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFireStore(app);