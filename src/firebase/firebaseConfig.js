// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
/* importando getFirestore para cloudFirestore y getAuth para autenticación */
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRESTORE_APIKEY,
  authDomain: process.env.REACT_APP_FIRESTORE_AUTHDOMAIN,
  projectId:process.env.REACT_APP_FIRESTORE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIRESTORE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIRESTORE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIRESTORE_APPID
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export {db, auth};
