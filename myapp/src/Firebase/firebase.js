// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4FnpI3xEG5zGT2hsEhSjAnmIaFqy7SKY",
  authDomain: "phantom-tag.firebaseapp.com",
  projectId: "phantom-tag",
  storageBucket: "phantom-tag.appspot.com",
  messagingSenderId: "268206385263",
  appId: "1:268206385263:web:52d4270f64872a5ac1859a",
  measurementId: "G-W12S8K8FXP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);