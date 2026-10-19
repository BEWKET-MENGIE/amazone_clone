import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import "firebase/compat/app"
import "firebase/compat/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDzFIBM0N9eN8Y8ISadArAKzwU3SFlJqQo",
  authDomain: "e-clone-23cee.firebaseapp.com",
  projectId: "e-clone-23cee",
  storageBucket: "e-clone-23cee.firebasestorage.app",
  messagingSenderId: "581140485916",
  appId: "1:581140485916:web:d3adf3428693f8c06d0cd9"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);