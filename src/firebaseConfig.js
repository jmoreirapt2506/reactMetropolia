import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, remove, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBsDcRIr1PyDBADg6K74vZlURrJbsSV9BI",
  authDomain: "bookstore-85215.firebaseapp.com",
  databaseURL:
    "https://bookstore-85215-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bookstore-85215",
  storageBucket: "bookstore-85215.firebasestorage.app",
  messagingSenderId: "339886429122",
  appId: "1:339886429122:web:0b52b5cfcfe961755cbc5b",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, get, set, remove, push };
