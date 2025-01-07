import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

console.log("Firebase Config");
const firebaseConfig = {
  apiKey: "AIzaSyAE87LEeHrUl2wK-tbkYieS2Sa4zWcV5G0",
  authDomain: "shopsphere-234db.firebaseapp.com",
  projectId: "shopsphere-234db",
  storageBucket: "shopsphere-234db.appspot.com",
  messagingSenderId: "1031816300546",
  appId: "1:1031816300546:web:d4c79523d4842500853f1b",
  measurementId: "G-TPCVK30J0T"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
