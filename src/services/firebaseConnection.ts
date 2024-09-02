
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYCxih7oRl5IN0xSXAepDZxaXfVwrRrpk",
  authDomain: "reactlinks-a7a34.firebaseapp.com",
  projectId: "reactlinks-a7a34",
  storageBucket: "reactlinks-a7a34.appspot.com",
  messagingSenderId: "740357047180",
  appId: "1:740357047180:web:9f6b6b245f1f2b832c0ca9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {auth, db};