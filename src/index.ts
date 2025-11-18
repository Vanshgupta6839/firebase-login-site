import { auth, db } from "./Supabase/firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// ---------------- BUTTONS ----------------
const signUpButton = document.getElementById("signUpButton")!;
const signInButton = document.getElementById("signInButton")!;
const submitSignUp = document.getElementById("submitSignUp")!;
const submitSignIn = document.getElementById("submitSignIn")!;
const googleSignup = document.getElementById("googleSignup")!;
const googleLogin = document.getElementById("googleLogin")!;

const signInForm = document.getElementById("signIn")!;
const signUpForm = document.getElementById("signup")!;

// --------------- TOGGLE LOGIN / SIGNUP ----------------
signUpButton.addEventListener("click", () => {
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
});

signInButton.addEventListener("click", () => {
    signInForm.style.display = "block";
    signUpForm.style.display = "none";
});

// ---------------- SIGNUP ----------------
submitSignUp.addEventListener("click", async (e) => {
    e.preventDefault();

    const firstName = (document.getElementById("fName") as HTMLInputElement).value;
    const lastName = (document.getElementById("lName") as HTMLInputElement).value;
    const email = (document.getElementById("rEmail") as HTMLInputElement).value;
    const password = (document.getElementById("rPassword") as HTMLInputElement).value;

    try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", userCred.user.uid), {
            firstName,
            lastName,
            email
        });

        alert("Account created! Redirecting...");
        window.location.href = "homepage.html";

    } catch (error) {
        alert("Signup failed: " + (error as any).message);
    }
});

// ---------------- LOGIN ----------------
submitSignIn.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    try {
        await signInWithEmailAndPassword(auth, email, password);

        alert("Login successful!");
        window.location.href = "homepage.html";

    } catch (error) {
        alert("Login failed: " + (error as any).message);
    }
});

// ---------------- GOOGLE LOGIN ----------------
const provider = new GoogleAuthProvider();

googleSignup.addEventListener("click", async () => {
    await signInWithPopup(auth, provider);
    window.location.href = "homepage.html";
});

googleLogin.addEventListener("click", async () => {
    await signInWithPopup(auth, provider);
    window.location.href = "homepage.html";
});
