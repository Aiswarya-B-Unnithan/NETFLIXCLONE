import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  inMemoryPersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXjOc6cb0IXA1C8QqfpLyW0p2JUq26Vbw",
  authDomain: "netflixclone-fcee1.firebaseapp.com",
  projectId: "netflixclone-fcee1",
  storageBucket: "netflixclone-fcee1.appspot.com",
  messagingSenderId: "138078560179",
  appId: "1:138078560179:web:5e5755663ce5f0307af5c6",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleAuth = new GoogleAuthProvider(app);
export const database = getFirestore(app);
// Enable session persistence
setPersistence(auth, inMemoryPersistence)
  .then(() => {
    console.log("Persistence enabled", auth);
  })
  .catch((error) => {
    // Handle errors
    console.error(error);
  });