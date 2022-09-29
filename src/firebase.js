import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBxVp3H65rYsJ3-wIPjMc9S0JDngnmoUDw",
    authDomain: "boxworkshop-5b0be.firebaseapp.com",
    projectId: "boxworkshop-5b0be",
    storageBucket: "boxworkshop-5b0be.appspot.com",
    messagingSenderId: "665618813889",
    appId: "1:665618813889:web:15598d69ae8b6dd6a75540",
    measurementId: "G-WJCXV3BZKG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
var provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export { provider }
export { auth };
export { db };
