import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
import { collection, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
const loginSection = document.getElementById("admin-login");
const dashboard = document.getElementById("admin-dashboard");
const logoutButton = document.getElementById("logout-button");
const adminInventory = document.getElementById("admin-inventory");

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
        loadAdminInventory();
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

async function loadAdminInventory() {
    const querySnapshot = await getDocs(collection(db, "inventory"));
    
    adminInventory.innerHTML = "";

    querySnapshot.forEach(doc => {
        const page = doc.data();
        const editedCards = [];

        const inventoryPage = document.createElement("div");
        inventoryPage.classList.add("admin-inventory-page");

        const heading = document.createElement("h3");
        heading.textContent = `${page.member} = Page ${page.page}`;

        inventoryPage.appendChild(heading);

        page.cards.forEach(card => {
            const cardRow = document.createElement("div");
            cardRow.classList.add("admin-card-row");

            const cardID = document.createElement("strong");
            cardID.textContent = card.id;

            const priceInput = document.createElement("input");
            priceInput.type = "number";
            priceInput.value = card.price;
            priceInput.min = "0";
            priceInput.step = "0.01";

            const statusSelect = document.createElement("select");

            statusSelect.innerHTML = `
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="not-for-sale">Not for Sale</option>
            `;

            statusSelect.value = card.status;

            editedCards.push({
                card: card,
                priceInput: priceInput,
                statusSelect: statusSelect
            });

            cardRow.appendChild(cardID);
            cardRow.appendChild(priceInput);
            cardRow.appendChild(statusSelect);


            inventoryPage.appendChild(cardRow);
        });

        const saveButton = document.createElement("button");
        saveButton.textContent = "Save Changes";
        saveButton.classList.add("save-button");
        saveButton.addEventListener("click", async() => {
            const updatedCards = editedCards.map(item => ({
                ...item.card,
                price: Number(item.priceInput.value),
                status: item.statusSelect.value
            }));

            const invalidPrice = editedCards.some(item => 
                item.priceInput.value === "" ||
                !item.priceInput.validity.valid
            );

            if (invalidPrice) {
                alert("Please enter valid prices");
                return;
            }

            try {
                await updateDoc(doc.ref, {
                    cards: updatedCards
                });

                alert("change saved succesfully!");
            } catch (error) {
                alert ("Unable to save changes.");
                console.error(error);
            }
        });
            
        inventoryPage.appendChild(saveButton);

        adminInventory.appendChild(inventoryPage);
    });
}