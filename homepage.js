import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ---------------------------
// SUPABASE CONFIG
// ---------------------------
const supabaseUrl = "https://dfrjavvcaeuadoplkbom.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmphdnZjYWV1YWRvcGxrYm9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNzI0NTQsImV4cCI6MjA3ODk0ODQ1NH0.TQV9ix14TMQ7vrxLz-bdBKGc5KJKkEDl5roxVr_-F5U";

const supabase = createClient(supabaseUrl, supabaseKey);

// ---------------------------
// DOM ELEMENTS
// ---------------------------
const fnameEl = document.getElementById("loggedUserFName");
const lnameEl = document.getElementById("loggedUserLName");
const emailEl = document.getElementById("loggedUserEmail");
const logoutButton = document.getElementById("logout");

// ---------------------------
// GET USER DETAILS
// ---------------------------

async function loadUserData() {
  const loggedInUserId = localStorage.getItem("loggedInUserId");

  if (!loggedInUserId) {
    console.log("User ID not found in LocalStorage");
    window.location.href = "index.html";
    return;
  }

  // GET SESSION USER
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    console.log("No active session");
    window.location.href = "index.html";
    return;
  }

  console.log("Session user:", session.user);

  // FETCH USER DATA FROM SUPABASE TABLE "users"
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", loggedInUserId)
    .single();

  if (error) {
    console.log("Error fetching user:", error);
    return;
  }

  // SET DATA TO HTML
  if (fnameEl) fnameEl.innerText = data.firstName || "";
  if (lnameEl) lnameEl.innerText = data.lastName || "";
  if (emailEl) emailEl.innerText = data.email || "";
}

loadUserData();

// ---------------------------
// LOGOUT
// ---------------------------
if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    localStorage.removeItem("loggedInUserId");
    await supabase.auth.signOut();
    window.location.href = "index.html";
  });
} else {
  console.error("Logout button not found in DOM");
}
