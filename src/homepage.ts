import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { getFirestore, getDoc, doc } from "firebase/firestore";

// ⚠️ IMPORTANT: Apna firebaseConfig yahan paste karna
const firebaseConfig = {
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

// ---------- DOM ELEMENTS WITH TYPE CHECK ----------
const fnameEl = document.getElementById("loggedUserFName") as HTMLElement | null;
const lnameEl = document.getElementById("loggedUserLName") as HTMLElement | null;
const emailEl = document.getElementById("loggedUserEmail") as HTMLElement | null;
const logoutButton = document.getElementById("logout") as HTMLButtonElement | null;

// ---------- AUTH STATE LISTENER ----------
onAuthStateChanged(auth, async (user: User | null) => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");

    if (!loggedInUserId) {
        console.log("User Id not found in local storage");
        return;
    }

    if (!user) {
        console.log("User not logged in");
        return;
    }

    console.log("User:", user);

    try {
        const docRef = doc(db, "users", loggedInUserId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();

            if (fnameEl) fnameEl.innerText = userData.firstName || "";
            if (lnameEl) lnameEl.innerText = userData.lastName || "";
            if (emailEl) emailEl.innerText = userData.email || "";

        } else {
            console.log("No document found matching id");
        }

    } catch (error) {
        console.log("Error getting document", error);
    }
});

// ---------- LOGOUT ----------
if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
        localStorage.removeItem("loggedInUserId");
        try {
            await signOut(auth);
            window.location.href = "index.html";
        } catch (err) {
            console.error("Error signing out:", err);
        }
    });
} else {
    console.error("Logout button not found in DOM");
}
