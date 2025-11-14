// ------------------------------------------
// 🔥 FIREBASE IMPORTS (CDN)
// ------------------------------------------
import { initializeApp } 
    from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";

import { 
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail
} 
from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc
} 
from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";


// ------------------------------------------
// 🔥 YOUR FIREBASE CONFIG (PASTE YOURS)
// ------------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyBYhJAl9-6C2cZP4PHXkAznYS4L6n42ND0",
    authDomain: "contact-from-users.firebaseapp.com",
    databaseURL: "https://contact-from-users-default-rtdb.firebaseio.com",
    projectId: "contact-from-users",
    storageBucket: "contact-from-users.firebasestorage.app",
    messagingSenderId: "864210653346",
    appId: "1:864210653346:web:41cc5648c3d9d8595ec7fb",
    measurementId: "G-T9KDGXK2MJ"
};


// ------------------------------------------
// 🔥 INITIALIZE
// ------------------------------------------
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// ------------------------------------------
// 🔥 DOM ELEMENTS
// ------------------------------------------
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const googleBtn = document.getElementById("googleBtn");
const signupBtn = document.getElementById("signupBtn");
const forgotBtn = document.getElementById("forgotBtn");


// ------------------------------------------
// 🔥 LOGIN
// ------------------------------------------
loginBtn.addEventListener("click", async () => {
    try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        alert("Login successful!");
        window.location.href = "homepage.html";
    } catch (err) {
        alert("Error: " + err.message);
    }
});


// ------------------------------------------
// 🔥 GOOGLE LOGIN
// ------------------------------------------
googleBtn.addEventListener("click", async () => {
    try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        alert("Google Login Successful!");
        window.location.href = "homepage.html";
    } catch (err) {
        alert("Error: " + err.message);
    }
});


// ------------------------------------------
// 🔥 SIGN UP
// ------------------------------------------
signupBtn.addEventListener("click", async () => {
    try {
        const user = await createUserWithEmailAndPassword(
            auth,
            email.value,
            password.value
        );

        // Save user to Firestore
        await setDoc(doc(db, "users", user.user.uid), {
            email: email.value,
            createdAt: new Date()
        });

        alert("Sign Up Successful!");
        window.location.href = "homepage.html";
    } catch (err) {
        alert("Error: " + err.message);
    }
});


// ------------------------------------------
// 🔥 PASSWORD RESET
// ------------------------------------------
forgotBtn.addEventListener("click", async () => {
    const userEmail = prompt("Enter your registered email:");

    if (!userEmail) {
        alert("Enter a valid email!");
        return;
    }

    try {
        await sendPasswordResetEmail(auth, userEmail);
        alert("Password reset email sent!");
    } catch (err) {
        alert("Error: " + err.message);
    }
});
