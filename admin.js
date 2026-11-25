import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
const loginSection = document.getElementById("admin-login");
const dashboard = document.getElementById("admin-dashboard");
const logoutButton = document.getElementById("logout-button");

const adminUID = "H80SEyhoE3eFouZd9xTuqXNXklD3"

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);

        loginMessage.textContent = "Login successful!";
        loginMessage.style.color = "green";
    } catch (error) {
        loginMessage.textContent = "Invalid email or password, or login unavailable.";
        loginMessage.style.color = "red";
        console.error(error.code);
    }
});

onAuthStateChanged(auth, (user) => {
    if (user && user.uid === adminUID) {
        loginSection.hidden = true;
        dashboard.hidden = false;
    } else {
        loginSection.hidden = false;
        dashboard.hidden = true;

        if (user) {
            loginMessage.textContent = "Access denied.";
            loginMessage.style.color = "red";
        };
    }
});

logoutButton.addEventListener("click", async () => {
    await signOut(auth);
    loginForm.reset();
    loginMessage.textContent = "";
});