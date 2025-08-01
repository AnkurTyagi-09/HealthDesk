// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // <-- Add this line

const firebaseConfig = {
  apiKey: "AIzaSyAOSxx08LvPVy4-LvblhZS1teHo_a2IPoI",
  authDomain: "healthdesk-5192f.firebaseapp.com",
  projectId: "healthdesk-5192f",
  storageBucket: "healthdesk-5192f.appspot.com", // <-- Fix typo: should be .appspot.com
  messagingSenderId: "222561466265",
  appId: "1:222561466265:web:91db8677cb023fdcf6c508",
  measurementId: "G-JQT8FZ75CV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); // <-- Add this line

export { storage };
