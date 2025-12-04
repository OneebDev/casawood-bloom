import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDglfgoaRl7xV4hnWIUk0nJBRBWlKHbtzY",
  authDomain: "scarwood.firebaseapp.com",
  projectId: "scarwood",
  storageBucket: "scarwood.firebasestorage.app",
  messagingSenderId: "100903992202",
  appId: "1:100903992202:web:ad997fdffb3b2c89ee2673",
  measurementId: "G-MY104SXJK0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Analytics only in browser environment
export const initAnalytics = async () => {
  if (await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

export default app;
