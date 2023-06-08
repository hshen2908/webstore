const addProductForm = document.getElementById("addProductForm");

addProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (isValidForm(addProductForm)) {
        const newProductData = {};
        newProductData["code"] = addProductForm.productCode.value;
        newProductData["name"] = addProductForm.productName.value;
        newProductData["price"] = addProductForm.productPrice.value;
        newProductData["quantity"] = addProductForm.productQuantity.value;
        newProductData["hidden"] = addProductForm.productHidden.checked;
        newProductData["onSale"] = addProductForm.productOnSale.checked;
        newProductData["newArrival"] = addProductForm.productNewArrival.checked
        newProductData["dimensions"] = {
            bridge: addProductForm.productBridge.value,
            eye: addProductForm.productEye.value,
            temple: addProductForm.productTemple.value
        };
        const categories = [];
        for (let category of ["unissex", "men", "women", "kids"]) {
            if (addProductForm[`product${category.charAt(0).toUpperCase() + category.slice(1)}`].checked) {
                categories.push(category);
            }
        }
        console.dir(categories)
        newProductData["categories"] = categories;

        const materials = [];
        for (let material of ["acetate", "stainlessSteel", "titanium", "tr90"]) {
            if (addProductForm[`product${material.charAt(0).toUpperCase() + material.slice(1)}`].checked) {
                materials.push(material === "stainlessSteel" ? "stainless steel" : material);
            }
        }
        newProductData["materials"] = materials;

        newProductData["shape"] = addProductForm.productShape.value;
        newProductData["type"] =  addProductForm.productType.value;

        const variants = [];
        for (let i = 0; i < numberOfVariants; i++) {
            variants.push({
                color: document.querySelector(`input[name="productVariant[color][${i}]"]:checked`).value,
                images: productVariant.imagesData[i]
            });
        }
        newProductData["variants"] = variants;
        console.dir(addProductForm)
        console.dir(newProductData);
        
        // const productsRequest = getFilterData();
        // productsRequest.startIndex = 0;
        // productsRequest.responseType = "";

        // const data = {newProductData, productsRequest};
        const data = {newProductData};

        try {
            const response = await fetch("/admin/products", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            console.log(responseData);
        } catch (e) {
            console.log(e);
        }
    } else {
        console.log("FORM SUBMISSION INVALID ERROR")
    }
});

function isValidForm(formElement) {
    return true;
    const variantsFilesInput = document.querySelectorAll(`[id^="productVariant[images]"]`);
    if (variantsFilesInput.length === 0) {
        console.log("no variants")
        return false;
    }

    for (e of variantsFilesInput) {
        if (e.files.length === 0) {
            console.log("no files")
            return false;
        }
    }

    for (let i = 0; i < numberOfVariants; i++) {
        if (productVariant.imagesData[i].length === 0) {
            console.log("missing images");
            return false;
        }
    }

    return true;
}