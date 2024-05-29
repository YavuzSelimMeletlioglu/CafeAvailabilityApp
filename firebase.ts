// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {addDoc,doc,documentId,query,where,getDoc,collection, getFirestore} from "firebase/firestore"


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
export const myCafeId = "LPly9akk4dOVhpTjnFJe" ;
export const db = getFirestore(app);
export const cafeRef = collection(db,"cafes");
export const commRef = collection(db,"comments");
export const myCafe = doc(cafeRef,myCafeId ) ;



//cafe eklenecek
//database'den masalar ve reservasyonlar çekilecek.