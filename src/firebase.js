// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // for profile images

const firebaseConfig = {
  apiKey: "AIzaSyCCPca4A7w9xx2xQcdd1ZhkkMPJ3_Gwx0o",
  authDomain: "ksujob-c541e.firebaseapp.com",
  databaseURL: "https://ksujob-c541e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ksujob-c541e",
  storageBucket: "ksujob-c541e.firebasestorage.app",
  messagingSenderId: "293284882585",
  appId: "1:293284882585:web:bead4126be3f7bbeeb7008",
  measurementId: "G-GMW5WP973S"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
