const modal = document.querySelector("#info-modal");
const closeModalButton = document.querySelector(".close-button");
const catalogGrid = document.querySelector("#catalog-grid");

export function openModal(productName) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.querySelector("#modal-title").textContent = `Inquire about: ${productName}`;
}

function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
}

closeModalButton.addEventListener("click", closeModal);
window.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

async function fetchAndRenderCatalog() {
    try {
        const response = await fetch("./products.json");
        const products = await response.json();
        catalogGrid.innerHTML = "";

        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card");
            card.innerHTML = `
                <h3>${product.name}</h3>
                <p><strong>${product.price}</strong></p>
                <p>${product.description}</p>
                <button class="more-info-btn">Request Info</button>
            `;
            card.querySelector(".more-info-btn").addEventListener("click", () => {
                openModal(product.name);
            });
            catalogGrid.appendChild(card);
        });
    } catch (error) {
        catalogGrid.innerHTML = "<p>Error loading catalog.</p>";
    }
}

document.addEventListener("DOMContentLoaded", fetchAndRenderCatalog);