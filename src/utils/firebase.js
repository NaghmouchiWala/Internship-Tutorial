// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEsf7d3NbcBOVdyLBD4wfz8bPEg5Py-dY",
  authDomain: "internship-tutorial.firebaseapp.com",
  projectId: "internship-tutorial",
  storageBucket: "internship-tutorial.firebasestorage.app",
  messagingSenderId: "289511106427",
  appId: "1:289511106427:web:26042a5d67b0dcba6cffde",
  measurementId: "G-XDFL18DY3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth , db};
