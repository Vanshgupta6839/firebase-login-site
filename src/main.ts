// Yeh file sirf UI toggle / navigation ke liye use hogi
// Yaha auth ya db import karne ki bilkul zarurat nahi hai

console.log("Main TS loaded!");

// Example: Toggle Forms
const signinBtn = document.getElementById("show-signin");
const signupBtn = document.getElementById("show-signup");

signinBtn?.addEventListener("click", () => {
  document.getElementById("signin-box")!.style.display = "block";
  document.getElementById("signup-box")!.style.display = "none";
});

signupBtn?.addEventListener("click", () => {
  document.getElementById("signup-box")!.style.display = "block";
  document.getElementById("signin-box")!.style.display = "none";
});
// Aap yaha aur bhi UI related code add kar sakte hain