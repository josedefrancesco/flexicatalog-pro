import { fetchProducts, createProductCard } from "./productData.js";

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

async function initApp() {
    const products = await fetchProducts();
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (productId && products.length > 0) {
        const selectedProduct = products.find(p => p.id == productId);
        
        if (selectedProduct && catalogGrid) {
            catalogGrid.innerHTML = `
                <div class="product-detail-view">
                    <a href="." class="btn-back">← Back to Catalog</a>
                    <h2>${selectedProduct.name}</h2>
                    <p class="detail-price"><strong>${selectedProduct.price}</strong></p>
                    <p class="detail-desc">${selectedProduct.description}</p>
                    <button class="more-info-btn" data-name="${selectedProduct.name}">Request Info</button>
                </div>
            `;
        } else if (catalogGrid) {
            catalogGrid.innerHTML = "<p>Product not found.</p><a href='.'>Go Back</a>";
        }
    } else {
        if (catalogGrid) {
            if (products.length === 0) {
                catalogGrid.innerHTML = "<p>Error loading catalog.</p>";
                return;
            }
            catalogGrid.innerHTML = products.map(product => createProductCard(product)).join("");
        }
    }
}

if (catalogGrid) {
    catalogGrid.addEventListener("click", (e) => {
        if (e.target.classList.contains("more-info-btn")) {
            const productName = e.target.getAttribute("data-name");
            openModal(productName);
        }
    });
}

document.addEventListener("DOMContentLoaded", initApp);
const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        const isOpen = navMenu.classList.contains("open");
        menuToggle.setAttribute("aria-expanded", isOpen);
    });
}