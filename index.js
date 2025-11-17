// CREATE CLIENT
const supabase = supabase.createClient(
    "YOUR_SUPABASE_URL",
    "YOUR_SUPABASE_ANON_KEY"
);

// ELEMENTS
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");


const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const googleBtn = document.getElementById("googleBtn");

const forgotBtn = document.getElementById("forgotBtn");



// LOGIN

loginBtn.addEventListener("click", async () => {
    let { data, error } = await supabase.auth.signInWithPassword({
        email: emailInput.value,
        password: passwordInput.value,
    });

    if (error) return alert("Login Failed: " + error.message);

    alert("Login Successful!");
    window.location.href = "homepage.html";
});


// SIGNUP
signupBtn.addEventListener("click", async () => {
    let { data, error } = await supabase.auth.signUp({
        email: emailInput.value,
        password: passwordInput.value,
    });

    if (error) return alert("Signup Failed: " + error.message);

    alert("Signup Successful! Check your email for verification.");
});


// GOOGLE LOGIN

googleBtn.addEventListener("click", async () => {
    let { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
    });

    if (error) return alert("Google Login Failed: " + error.message);

    // Automatically redirects
});


// RESET PASSWORD
forgotBtn.addEventListener("click", async () => {
    const email = emailInput.value;

    let { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://vanshgupta6839.github.io/firebase-login-site/reset.html",
    });

    if (error) return alert("Error: " + error.message);

    alert("Reset link sent! Check your email.");
});
