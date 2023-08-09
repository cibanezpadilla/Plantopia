// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOHl-EK97mMWt4LQ8eqxhnXlfR4LAlr9g",
  authDomain: "plantopia-7cb15.firebaseapp.com",
  projectId: "plantopia-7cb15",
  storageBucket: "plantopia-7cb15.appspot.com",
  messagingSenderId: "35401403339",
  appId: "1:35401403339:web:d13c01b3b1961e0329844e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()