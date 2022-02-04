import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyBrDdmrwiMWNUFrHg0CKtK3JmaOvF0EP7Q",
    authDomain: "peppermint-8fb1f.firebaseapp.com",
    projectId: "peppermint-8fb1f",
    storageBucket: "peppermint-8fb1f.appspot.com",
    messagingSenderId: "122223278746",
    appId: "1:122223278746:web:983bf9b2bc6da0f23cfd23",
    measurementId: "G-FJQ1VX85Z0"
};


initializeApp(firebaseConfig);
const auth = getAuth();
export const apiKey = firebaseConfig.apiKey;
export { auth };