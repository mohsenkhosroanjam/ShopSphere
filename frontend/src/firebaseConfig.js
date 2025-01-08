import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import conf from "./Conf/conf.js";

console.log("Firebase Config");
const firebaseConfig = {
  apiKey: conf.FireBaseApiKey,
  authDomain: conf.FireBaseAuthDomain,
  projectId: conf.FireBaseProjectId,
  storageBucket: conf.FireBaseStorageBucket,
  messagingSenderId: conf.FireBaseMessagingSenderId,
  appId: conf.FireBaseAppId,
  measurementId: conf.FireBaseMeasurementId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
