// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGsqfBjorUH4xLyGTZjYcr5_zY4g2qyzc",
  authDomain: "tourist-2003.firebaseapp.com",
  projectId: "tourist-2003",
  storageBucket: "tourist-2003.appspot.com",
  messagingSenderId: "13417575730",
  appId: "1:13417575730:web:54210a5385eb696c4dd32b",
  measurementId: "G-BR6CGSBP1M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore()
//const analytics = getAnalytics(app);