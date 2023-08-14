// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getStorage } from "firebase/storage";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTcCrYTjY_Eg37OWhxSkR144l93347fQU",
  authDomain: "blog-astro-f0c8b.firebaseapp.com",
  projectId: "blog-astro-f0c8b",
  storageBucket: "blog-astro-f0c8b.appspot.com",
  messagingSenderId: "66951030397",
  appId: "1:66951030397:web:bfb8b579e4ce00c3a97314",
  measurementId: "G-KDT6BEBC3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const storage = getStorage(app);