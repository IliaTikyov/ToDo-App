// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkFhDacdMicyWlQ0ktnOeB9kKzl_wgcxg",
  authDomain: "todo-app-d2ad5.firebaseapp.com",
  projectId: "todo-app-d2ad5",
  storageBucket: "todo-app-d2ad5.firebasestorage.app",
  messagingSenderId: "819894016241",
  appId: "1:819894016241:web:80944e646ae899c10a7150",
  measurementId: "G-59LFD0SQE7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Create a Google provider instance
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
