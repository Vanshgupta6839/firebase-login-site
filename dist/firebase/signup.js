import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
        console.log("User created:", user);
        window.location.href = "homepage.html";
    })
        .catch((err) => {
        console.log("Error:", err.message);
    });
});
