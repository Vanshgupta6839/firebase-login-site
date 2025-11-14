import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const signupForm = document.getElementById("signup-form") as HTMLFormElement;

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = (document.getElementById("signup-email") as HTMLInputElement).value;
  const password = (document.getElementById("signup-password") as HTMLInputElement).value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log("User created:", user);
      window.location.href = "homepage.html";
    })
    .catch((err) => {
      console.log("Error:", err.message);
    });
});
