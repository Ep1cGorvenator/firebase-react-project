import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAsbwWaXQ5EgdaqpU-_OcI1KA5ALS2gh_U",
  authDomain: "react-contact-72701.firebaseapp.com",
  projectId: "react-contact-72701",
  storageBucket: "react-contact-72701.firebasestorage.app",
  messagingSenderId: "231544193370",
  appId: "1:231544193370:web:652c180f5b2f3c36d13363",
};

const app = initializeApp(firebaseConfig);
const fireDb = getDatabase(app);

export default fireDb;
