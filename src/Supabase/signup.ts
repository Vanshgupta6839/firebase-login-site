import { supabase } from "../Supabase/SupabaseConfig";

const signupForm = document.getElementById("signup-form") as HTMLFormElement;

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = (document.getElementById("signup-email") as HTMLInputElement).value;
  const password = (document.getElementById("signup-password") as HTMLInputElement).value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "http://localhost:5500/signin.html"
    }
  });

  if (error) {
    alert("Signup Error: " + error.message);
    return;
  }

  alert("Signup successful! Email verification link sent. Please verify your email.");
  window.location.href = "signin.html";
});
