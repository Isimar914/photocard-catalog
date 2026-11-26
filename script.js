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

        const heading = document.createElement("h3");
        heading.textContent = `${page.member} - Page ${page.page}`;

        const image = document.createElement("img");
        image.src = page.image;
        image.alt = `${page.member} Page ${page.page}`;
        image.classList.add("photocard-sheet");

        inventoryPage.appendChild(heading);
        inventoryPage.appendChild(image); 

        const priceGrid = document.createElement("div");
        priceGrid.classList.add("price-grid");

        page.cards.forEach(card => {
            const priceBox = document.createElement("div");
            priceBox.classList.add("price-box");

            const cardID = document.createElement("strong");
            cardID.textContent = card.id;

            const price = document.createElement("span");
            price.textContent = `$${card.price}`;

            const status = document.createElement("span");

            if (card.status === "available") {
                status.textContent = "Available";
                status.classList.add("available");
            } else if (card.status === "sold") {
                status.textContent = "Sold";
                status.classList.add("sold");
            } else {
                status.textContent = "Not for Sale";
                status.classList.add("not-for-sale");
            }

            priceBox.appendChild(cardID);
            priceBox.appendChild(price);
            priceBox.appendChild(status);

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