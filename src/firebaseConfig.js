// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDestpKVuWQSc0Tx_hrN0Kq4sxRdBfx0zc",
  authDomain: "tabletab-e5d17.firebaseapp.com",
  projectId: "tabletab-e5d17",
  storageBucket: "tabletab-e5d17.appspot.com",
  messagingSenderId: "1061073821501",
  appId: "1:1061073821501:web:17def1381223f03effef54",
  measurementId: "G-230GB7YNEC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
