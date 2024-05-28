// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import {getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgQNupxf_isyOREAl8J-9FAA6TYxuBn1A",
  authDomain: "caferesrevationsystem.firebaseapp.com",
  projectId: "caferesrevationsystem",
  storageBucket: "caferesrevationsystem.appspot.com",
  messagingSenderId: "266923099329",
  appId: "1:266923099329:web:35ca27612ffd1033798040",
  measurementId: "G-FEQ9LE7LZ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);