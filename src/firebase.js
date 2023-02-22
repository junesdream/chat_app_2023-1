import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAQEWq5f6z-hRGqncP8qQWZ4_MdH9qCwTE",
	authDomain: "chat-cb7aa.firebaseapp.com",
	projectId: "chat-cb7aa",
	storageBucket: "chat-cb7aa.appspot.com",
	messagingSenderId: "782583284971",
	appId: "1:782583284971:web:b646e297d44ea289b6eaae",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
// Create a root reference
export const storage = getStorage();

export const db = getFirestore();
