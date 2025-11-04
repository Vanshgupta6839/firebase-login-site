// firebaseauth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// ✅ Replace below with your actual Firebase config
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


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
console.log("Firebase Auth connected successfully");

// Function to show messages
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => (messageDiv.style.opacity = 0), 5000);
}

// 🔹 SIGN UP
document.getElementById("submitSignUp").addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.getElementById("rEmail").value;
  const password = document.getElementById("rPassword").value;
  const firstName = document.getElementById("fName").value;
  const lastName = document.getElementById("lName").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email,
      firstName,
      lastName
    });

    showMessage("Account Created Successfully!", "signUpMessage");
    window.location.href = "index.html"; // redirect back to login
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      showMessage("Email Address Already Exists !!!", "signUpMessage");
    } else {
      showMessage("Unable to create user", "signUpMessage");
    }
  }
});

// 🔹 SIGN IN
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
  event.preventDefault();
  console.log("Sign In button clicked");
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
      showMessage('login is successful', 'signInMessage');
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      window.location.href = 'homepage.html';
  })
  .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-credential') {
          showMessage('Incorrect Email or Password', 'signInMessage');
      } else {
          showMessage('Account does not Exist', 'signInMessage');
      }
  });
});