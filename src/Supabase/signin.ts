import { supabase } from "../Supabase/SupabaseConfig";

const signinForm = document.getElementById("signin-form") as HTMLFormElement;

signinForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = (document.getElementById("signin-email") as HTMLInputElement).value;
  const password = (document.getElementById("signin-password") as HTMLInputElement).value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Login Error: " + error.message);
    return;
  }

  localStorage.setItem("loggedUserId", data.user?.id || "");

  alert("Login Successful!");
  window.location.href = "homepage.html";
});
