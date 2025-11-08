// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_cc-WIN-x6fo-omGk1JL2lGkFxKiSxjE",
  authDomain: "coffee-house-rs.firebaseapp.com",
  projectId: "coffee-house-rs",
  storageBucket: "coffee-house-rs.firebasestorage.app",
  messagingSenderId: "916749340743",
  appId: "1:916749340743:web:72c72944acecc0a087a162",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
