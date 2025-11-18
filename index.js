// ---------------------------------------------------
// 🔥 SUPABASE IMPORT
// ---------------------------------------------------
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ---------------------------------------------------
// 🔥 SUPABASE CONFIG
// ---------------------------------------------------
const supabaseUrl = "https://dfrjavvcaeuadoplkbom.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmphdnZjYWV1YWRvcGxrYm9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNzI0NTQsImV4cCI6MjA3ODk0ODQ1NH0.TQV9ix14TMQ7vrxLz-bdBKGc5KJKkEDl5roxVr_-F5U";

const supabase = createClient(supabaseUrl, supabaseKey);

// ---------------------------------------------------
// 🔥 DOM ELEMENTS
// ---------------------------------------------------
const email = document.getElementById("email");
const password = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const googleBtn = document.getElementById("googleBtn");
const signupBtn = document.getElementById("signupBtn");
const forgotBtn = document.getElementById("forgotBtn");

// ---------------------------------------------------
// 🔥 LOGIN
// ---------------------------------------------------
loginBtn.addEventListener("click", async () => {
  if (!email.value || !password.value)
    return alert("Please enter both email and password!");

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) return alert("Error: " + error.message);

  alert("Login Successful!");
  window.location.href = "homepage.html";
});

// ---------------------------------------------------
// 🔥 SIGNUP (FIXED + PASSWORD VALIDATION)
// ---------------------------------------------------
signupBtn.addEventListener("click", async () => {
  if (!email.value || !password.value)
    return alert("Please enter email & password!");

  if (password.value.length < 6)
    return alert("Password must be 6 characters minimum!");

  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });

  if (error) return alert("Error: " + error.message);

  alert("Signup successful! Check your email for verification.");
});

// ---------------------------------------------------
// 🔥 GOOGLE LOGIN (FIXED REDIRECT)
// ---------------------------------------------------
googleBtn.addEventListener("click", async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:5500/homepage.html",
    },
  });

  if (error) alert("Error: " + error.message);
});

// ---------------------------------------------------
// 🔥 PASSWORD RESET
// ---------------------------------------------------
forgotBtn.addEventListener("click", async () => {
  const userEmail = prompt("Enter your registered email:");

  if (!userEmail) return alert("Email required!");

  const { error } = await supabase.auth.resetPasswordForEmail(userEmail, {
    redirectTo: "http://localhost:5500/reset.html",
  });

  if (error) return alert("Error: " + error.message);

  alert("Password reset email sent!");
});
