import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhiCNJ-WyXjxS2sdP0VSSFgI54mGTFQSc",
  authDomain: "workoutplanner-8ad52.firebaseapp.com",
  projectId: "workoutplanner-8ad52",
  storageBucket: "workoutplanner-8ad52.appspot.com",
  messagingSenderId: "92221100906",
  appId: "1:92221100906:web:00dda8c80ac0072c684b13"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, db, auth}