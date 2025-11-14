// src/ui/toggleForms.ts

// Get Buttons
const signUpButton = document.getElementById('signUpButton') as HTMLButtonElement | null;
const signInButton = document.getElementById('signInButton') as HTMLButtonElement | null;

// Get Forms
const signInForm = document.getElementById('signIn') as HTMLDivElement | null;
const signUpForm = document.getElementById('signup') as HTMLDivElement | null;

if (signUpButton && signInButton && signInForm && signUpForm) {

    // Show Sign Up Form
    signUpButton.addEventListener('click', () => {
        signInForm.style.display = "none";
        signUpForm.style.display = "block";
    });

    // Show Sign In Form
    signInButton.addEventListener('click', () => {
        signInForm.style.display = "block";
        signUpForm.style.display = "none";
    });

} else {
    console.error("Some UI elements were not found. Check your HTML IDs.");
}
