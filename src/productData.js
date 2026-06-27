export async function fetchProducts() {
    try {
        const response = await fetch("./products.json");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <h3>${product.name}</h3>
            <p><strong>${product.price}</strong></p>
            <p>${product.description}</p>
            <div class="card-actions">
                <a href="?id=${product.id}" class="view-details-link">View Details</a>
                <button class="more-info-btn" data-name="${product.name}">Request Info</button>
            </div>
        </div>
    `;
}