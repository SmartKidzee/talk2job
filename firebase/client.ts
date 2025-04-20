import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC_98rS7vqkfip3llk5T6Qpo3IAtU-Bb98",
    authDomain: "talk2jobshrey.firebaseapp.com",
    projectId: "talk2jobshrey",
    storageBucket: "talk2jobshrey.firebasestorage.app",
    messagingSenderId: "185401160189",
    appId: "1:185401160189:web:ac26fdde4d2cbed677a994",
    measurementId: "G-LQWGFZENBN"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

// Create the Google Provider instance
const googleProvider = new GoogleAuthProvider();

// Export all together
export { auth, db, googleProvider };