// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDhNMh3zNFP27dn8fSa22cLrOrtK_NAu14",
  authDomain: "portfolioweb-hayden.firebaseapp.com",
  projectId: "portfolioweb-hayden",
  storageBucket: "portfolioweb-hayden.firebasestorage.app",
  messagingSenderId: "286072012417",
  appId: "1:286072012417:web:50828d2645cdae7a7ad780",
  measurementId: "G-6LMNZ5E91C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
