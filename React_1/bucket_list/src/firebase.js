// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBrDdmrwiMWNUFrHg0CKtK3JmaOvF0EP7Q",
    authDomain: "peppermint-8fb1f.firebaseapp.com",
    projectId: "peppermint-8fb1f",
    storageBucket: "peppermint-8fb1f.appspot.com",
    messagingSenderId: "122223278746",
    appId: "1:122223278746:web:55c904e3798237183cfd23",
    measurementId: "G-9CGWRGSW5B"
};

// Initialize Firebase

//const analytics = getAnalytics(app);
// const app = initializeApp(firebaseConfig);


initializeApp(firebaseConfig)
export const db = getFirestore();