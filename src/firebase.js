
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkcFoHaAlbOjjlGkpFphm93tA7EGwZcdY",
  authDomain: "ecomerce-d86e2.firebaseapp.com",
  projectId: "ecomerce-d86e2",
  storageBucket: "ecomerce-d86e2.firebasestorage.app",
  messagingSenderId: "193258793872",
  appId: "1:193258793872:web:7adc3df73be5689117e115",
  measurementId: "G-258LZX44P0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export { app, analytics };
