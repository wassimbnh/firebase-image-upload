import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAND-1PUMhLj4ev41Aohf9KMynDWAq1dgE",
  authDomain: "mychat-172b8.firebaseapp.com",
  projectId: "mychat-172b8",
  storageBucket: "mychat-172b8.appspot.com",
  messagingSenderId: "411820925743",
  appId: "1:411820925743:web:8f746746b2aad5e3dc37da",
  measurementId: "G-Z0ZRYP5JCS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);