// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFztqj_L0Xp1sKR760WhvKPuoAKaJF5WI",
  authDomain: "eboos-fc2c7.firebaseapp.com",
  databaseURL:
    "https://eboos-fc2c7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "eboos-fc2c7",
  storageBucket: "eboos-fc2c7.appspot.com",
  messagingSenderId: "839948915669",
  appId: "1:839948915669:web:1d2b90baf964eb7681235c",
  measurementId: "G-07QM7DF357",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
