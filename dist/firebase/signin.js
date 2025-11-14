import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
const signinForm = document.getElementById("signin-form");
signinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;
    signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
        console.log("Logged in:", user);
        window.location.href = "homepage.html";
    })
        .catch((err) => {
        console.log("Error:", err.message);
    });
});
