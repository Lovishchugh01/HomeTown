// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7_vYW364R7i70PYYzYlJfknck1SfmdpA",
  authDomain: "hometown-68618.firebaseapp.com",
  projectId: "hometown-68618",
  storageBucket: "hometown-68618.appspot.com",
  messagingSenderId: "12331047551",
  appId: "1:12331047551:web:a5c43a33fa7794a2fb3d4a",
  measurementId: "G-ZS8S9QCG4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics)
export const db = getFirestore();