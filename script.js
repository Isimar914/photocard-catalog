import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

const inventoryPages = [
    {
        member: "Jurin",
        page: "A",
        image: "images/Jurin-a.png",
        cards: [
            {id: "A1", price: 40, status: "available" },
            {id: "A2", price: 45, status: "sold" },
            {id: "A3", price: 5, status: "sold" },
            {id: "A4", price: 48, status: "sold" },
            {id: "A5", price: 10, status: "available" },
            {id: "A6", price: 20, status: "sold" }
        ]
    },
    {
        member: "Jurin",
        page: "B",
        image: "images/Jurin-b.png",
        cards: [
            {id: "B1", price: 8, status: "available" },
            {id: "B2", price: 10, status: "available" },
            {id: "B3", price: 10, status: "sold" },
            {id: "B4", price: 8, status: "available" },
            {id: "B5", price: 8, status: "sold" },
            {id: "B6", price: 8, status: "sold" },
            {id: "B7", price: 20, status: "sold" },
            {id: "B8", price: 22, status: "sold" },
            {id: "B9", price: 20, status: "sold" }
        ]
    }
];

const gallery = document.getElementById("gallery-grid");

function displayInventory() {
    gallery.innerHTML = "";

    inventoryPages.forEach(page => {
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

async function loadInventory() {
    const querySnapshot = await getDocs(collection(db, "inventory"));

    const firebaseInventory = [];

    querySnapshot.forEach(doc => {
        firebaseInventory.push(doc.data());
    });

    console.log(firebaseInventory);
}

loadInventory();
displayInventory();