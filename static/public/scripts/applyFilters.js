const applyFiltersButton = document.getElementById("applyFiltersButton");
const applyFiltersForm = document.getElementById("applyFiltersForm");

applyFiltersForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const productsContainer = document.getElementById("productsContainer");
    const {html, totalProductCount, responseProductCount} = await getProducts(0);
    productsContainer.innerHTML = html;
    productsContainer.attributes["data-product-count"].value = `${responseProductCount}`;
    productsContainer.attributes["data-total-product-count"].value = `${totalProductCount}`;
});