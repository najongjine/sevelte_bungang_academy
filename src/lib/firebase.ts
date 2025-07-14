// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgvOhAOhwHkTrVcncaqfFX0TTFXDCcqJI",
  authDomain: "test1-3fc5c.firebaseapp.com",
  projectId: "test1-3fc5c",
  // 기타 설정들...
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
