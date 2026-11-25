import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

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