import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyDCn2loNxoCssmJ6OuEWUyj74NqBjVw7BE",
    authDomain: "buff-buddy.firebaseapp.com",
    projectId: "buff-buddy",
    storageBucket: "buff-buddy.appspot.com",
    messagingSenderId: "753111259512",
    appId: "1:753111259512:web:fbdfc0ee627d615736908d",
    measurementId: "G-08BNPW7YLG"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  })
  const db = getFirestore(firebaseApp);
  
  export { db, auth };