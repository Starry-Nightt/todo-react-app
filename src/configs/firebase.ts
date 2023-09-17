import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7ioPVknOP7nJDu92hlEGzSzr-0pryt20",
  authDomain: "todo-react-app-b3f0e.firebaseapp.com",
  projectId: "todo-react-app-b3f0e",
  storageBucket: "todo-react-app-b3f0e.appspot.com",
  messagingSenderId: "244463465149",
  appId: "1:244463465149:web:347a3f75d895b963acbdd4",
  measurementId: "G-1EVMMPL75N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
