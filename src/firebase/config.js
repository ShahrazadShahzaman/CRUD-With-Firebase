import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLcN2NhaslA6MOTU25EGEwSfFOudNEtPo",
  authDomain: "crudwithfirebase-c20c9.firebaseapp.com",
  projectId: "crudwithfirebase-c20c9",
  storageBucket: "crudwithfirebase-c20c9.firebasestorage.app",
  messagingSenderId: "294542475166",
  appId: "1:294542475166:web:c76e81dc480daf2d5be08f",
  measurementId: "G-F9D49GKN5R"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { app };