var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, getDoc, doc } from "firebase/firestore";
// ⚠️ IMPORTANT: Apna firebaseConfig yahan paste karna
const firebaseConfig = {};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
// ---------- DOM ELEMENTS WITH TYPE CHECK ----------
const fnameEl = document.getElementById("loggedUserFName");
const lnameEl = document.getElementById("loggedUserLName");
const emailEl = document.getElementById("loggedUserEmail");
const logoutButton = document.getElementById("logout");
// ---------- AUTH STATE LISTENER ----------
onAuthStateChanged(auth, (user) => __awaiter(void 0, void 0, void 0, function* () {
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
        const docSnap = yield getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            if (fnameEl)
                fnameEl.innerText = userData.firstName || "";
            if (lnameEl)
                lnameEl.innerText = userData.lastName || "";
            if (emailEl)
                emailEl.innerText = userData.email || "";
        }
        else {
            console.log("No document found matching id");
        }
    }
    catch (error) {
        console.log("Error getting document", error);
    }
}));
// ---------- LOGOUT ----------
if (logoutButton) {
    logoutButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        localStorage.removeItem("loggedInUserId");
        try {
            yield signOut(auth);
            window.location.href = "index.html";
        }
        catch (err) {
            console.error("Error signing out:", err);
        }
    }));
}
else {
    console.error("Logout button not found in DOM");
}
