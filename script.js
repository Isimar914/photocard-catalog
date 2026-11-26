import { db } from "./firebase.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

let inventoryPages = [];

let selectedMember = "All"
const gallery = document.getElementById("gallery-grid");

function displayInventory() {
    gallery.innerHTML = "";

    const filteredPages = inventoryPages.filter(page => 
        selectedMember === "All" || page.member === selectedMember
    );

    if (filteredPages.length === 0) {
        gallery.textContent = "No inventory available yet."
        return;
    }
    
    filteredPages.forEach(page => {
        const inventoryPage = document.createElement("div");

        inventoryPage.classList.add("inventory-page");

        inventoryPage.innerHTML = `
            <h3>${page.member} - Page ${page.page}</h3>
            <img src="${page.image}"
                 alt="${page.member} Page ${page.page}"
                 class="photocard-sheet">
        `;

        const priceGrid = document.createElement("div");
        priceGrid.classList.add("price-grid");

        page.cards.forEach(card => {
            const priceBox = document.createElement("div");
            priceBox.classList.add("price-box");

            priceBox.innerHTML = `
                <strong>${card.id}</strong>
                <span>$${card.price}</span>
                <span class="${card.status}">
                    ${card.status === "available" ? "Available" :
                      card.status === "sold" ? "Sold":
                      "Not for Sale"
                    }
                </span>
            `;

            priceGrid.appendChild(priceBox);
        });

        inventoryPage.appendChild(priceGrid);
        gallery.appendChild(inventoryPage);
    });
}

function loadInventory() {
    onSnapshot(collection(db, "inventory"), (querySnapshot) =>  {
        const firebaseInventory = [];

        querySnapshot.forEach(doc => {
            firebaseInventory.push(doc.data());
        });

        inventoryPages = firebaseInventory;
        displayInventory();
    });
}

const memberTabs = document.querySelectorAll("#member-tabs button");

memberTabs.forEach(button => {
    button.addEventListener("click", () => {
        selectedMember = button.dataset.member;
        displayInventory();
    });
});

loadInventory();