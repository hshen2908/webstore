const registerButtons = () => {
        document.querySelectorAll(".deleteProductButton").forEach((button) => {
            console.log(111)
        button.addEventListener("click", async (e) => {
            e.preventDefault();
            try {
                const productsRequest = getFilterData();
                productsRequest.startIndex = 0;
                productsRequest.responseType = "";
                console.log( button.attributes["data-product-id"].value);
                const data = { productsRequest, productToDeleteId: button.attributes["data-product-id"].value};
                const response = await fetch("/admin/product", {
                    method: "DELETE",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const {html, responseProductCount, totalProductCount} = await response.json();
                document.getElementById("productsContainer").innerHTML = html;
                document.getElementById("productsContainer").attributes["data-product-count"].value = `${responseProductCount}`;
                document.getElementById("productsContainer").attributes["data-total-product-count"].value = `${totalProductCount}`;
                registerButtons();
            } catch (e) {
                console.log(e);
            }
        });
    });
}

registerButtons()