import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCSm6k9sMWb7UlvHOcvPxYG5EFb1wbY8M8",
  authDomain: "tv-show-tracker-9a34c.firebaseapp.com",
  projectId: "tv-show-tracker-9a34c",
  storageBucket: "tv-show-tracker-9a34c.appspot.com",
  messagingSenderId: "531529747425",
  appId: "1:531529747425:web:a73db2b7dae8463ad320a0",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const collections = {
  subscriptions: collection(db, "subscriptions"),
};

export default {
  async set_data(subscriptions) {
    const subscriptionsRef = doc(db, "subscriptions", "shows");
    try {
      await setDoc(subscriptionsRef, { subscriptions });
    } catch (error) {
      console.log(error);
    }
  },
  async get_data() {
    try {
      const subscriptionsSnapshot = await getDocs(collections.subscriptions);
      const docsArray = subscriptionsSnapshot.docs.map((doc) => doc.data());
      return docsArray[0].subscriptions;
    } catch (error) {
      console.log(error);
    }
  },
};
