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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// INPUTS
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// BUTTONS
const loginBtn = document.getElementById("loginBtn");
const googleBtn = document.getElementById("googleBtn");
const signupBtn = document.getElementById("signupBtn");
const forgotBtn = document.getElementById("forgotBtn");


// --------------------------------------------
// LOGIN
// --------------------------------------------
loginBtn.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        alert("Enter email & password");
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");

        
        window.location.href = "homepage.html";

    } catch (err) {
        alert(err.message);
    }
});



signupBtn.addEventListener("click", async () => {
    const email = prompt("Enter your email for Signup:");
    const password = prompt("Enter your password (min 6 chars):");

    if (!email || !password) {
        alert("Please enter valid details.");
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful!");
    } catch (err) {
        alert("Error: " + err.message);
    }
});


// --------------------------------------------
// GOOGLE LOGIN
// --------------------------------------------
googleBtn.addEventListener("click", async () => {
    try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        alert("Google login success!");
    } catch (err) {
        alert(err.message);
    }
});


// --------------------------------------------
// PASSWORD RESET (FULL WORKING VERSION)
// const --------------------------------------------
forgotBtn.addEventListener("click", async () => {
    const emailVal = email.value.trim();

    if (!emailVal) {
        alert("Please type your email in the email box first.");
        return;
    }

    try {
        await sendPasswordResetEmail(auth, emailVal, {
            url: "https://vanshgupta6839.github.io/firebase-login-site/",
            handleCodeInApp: false
        });

        alert("Password reset email sent! Check your inbox.");
    } catch (error) {
        alert("Error: " + error.message);
    }
});
