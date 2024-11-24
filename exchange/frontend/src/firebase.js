// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2Dk1oHJewpd76IMl8rpdfTgA18ttLq0o",
  authDomain: "xchange-65726.firebaseapp.com",
  projectId: "xchange-65726",
  storageBucket: "xchange-65726.appspot.com",
  messagingSenderId: "302315323274",
  appId: "1:302315323274:web:2e732968c43317d2e99273",
  measurementId: "G-GMWC8JVN2Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };