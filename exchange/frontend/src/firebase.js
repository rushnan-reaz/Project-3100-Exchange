// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// // import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC2Dk1oHJewpd76IMl8rpdfTgA18ttLq0o",
//   authDomain: "xchange-65726.firebaseapp.com",
//   projectId: "xchange-65726",
//   storageBucket: "xchange-65726.appspot.com",
//   messagingSenderId: "302315323274",
//   appId: "1:302315323274:web:2e732968c43317d2e99273",
//   measurementId: "G-GMWC8JVN2Z"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();
// export { auth, provider, analytics };

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Import the provider here

const firebaseConfig = {
  apiKey: "AIzaSyDJwVYZVo31cCHVb2c_Pe3-57ejEV89yH0",
  authDomain: "exchange-e3b77.firebaseapp.com",
  projectId: "exchange-e3b77",
  storageBucket: "exchange-e3b77.firebasestorage.app",
  messagingSenderId: "397972220909",
  appId: "1:397972220909:web:913779245bb26d4ec595e4",
  measurementId: "G-QK8SFT64PK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Google Auth Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();  // Initialize GoogleAuthProvider

// Function to register a new user
const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Function to login an existing user
const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Function to sign in using Google
const googleLogin = () => {
  return signInWithPopup(auth, provider); // Use the provider for Google login
};

// Exporting necessary functions and provider
export { auth, registerUser, loginUser, googleLogin, provider };

