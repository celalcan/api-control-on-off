// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB9GNCHgFEtgj9UHE0VN5AvES5cIze6O84",
  authDomain: "iotcontrol-eb731.firebaseapp.com",
  databaseURL: "https://iotcontrol-eb731-default-rtdb.firebaseio.com",
  projectId: "iotcontrol-eb731",
  storageBucket: "iotcontrol-eb731.appspot.com",
  messagingSenderId: "473929818111",
  appId: "1:473929818111:web:626e46d1958c72197311ca"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
