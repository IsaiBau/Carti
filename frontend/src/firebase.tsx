// frontend/src/firebase.ts (extensión .ts normal)
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCWbcJ4CmZMdYjo21IvLNH4WaSg9AnqnQk",
  authDomain: "carti-ceaf2.firebaseapp.com",
  projectId: "carti-ceaf2",
  storageBucket: "carti-ceaf2.appspot.com",
  messagingSenderId: "416349833190",
  appId: "1:416349833190:web:02d2f25ec36a7c5b8ff827",
  measurementId: "G-CJ8NNZZDSR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export { signInWithPopup }; // Re-exportamos directamente de firebase/auth