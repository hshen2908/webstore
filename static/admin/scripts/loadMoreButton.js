const loadMoreButton = document.getElementById("loadMoreButton");
const loadMoreText = document.getElementById("loadMoreText");
const loadMoreSpinner = document.getElementById("loadMoreSpinner");

loadMoreButton.addEventListener("click", async (e) => {
    loadMoreButton.style.width = "56px"
    loadMoreText.classList.add("hidden");
    loadMoreSpinner.classList.remove("hidden");
    const productsContainer = document.getElementById("productsContainer");
    const currProductCount = Number.parseInt(productsContainer.attributes["data-product-count"].value);
    const {html, totalProductCount, responseProductCount} = await getProducts(currProductCount, "html:admin-product-table");
    productsContainer.innerHTML = productsContainer.innerHTML + html;
    productsContainer.attributes["data-product-count"].value = `${currProductCount + responseProductCount}`;
    productsContainer.attributes["data-total-product-count"].value = `${totalProductCount}`;
    loadMoreText.classList.remove("hidden");
    loadMoreSpinner.classList.add("hidden");
    const loadMoreContainer = document.getElementById("loadMoreContainer");
    if (responseProductCount + currProductCount === totalProductCount) {
        loadMoreContainer.classList.add("hidden");
    } else {
        loadMoreContainer.classList.remove("hidden");
    }
});