const addProductForm = document.getElementById("addProductForm");

addProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (isValidForm(addProductForm)) {
        const data = {};
        data["code"] = addProductForm.productCode.value;
        data["name"] = addProductForm.productName.value;
        data["price"] = addProductForm.productPrice.value;
        data["quantity"] = addProductForm.productCode.value;
        data["hidden"] = addProductForm.productHidden.checked
        data["onSale"] = addProductForm.productOnSale.checked
        data["newArrival"] = addProductForm.productNewArrival.checked
        data["dimensions"] = {
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
        data["categories"] = categories;

        const materials = [];
        for (let material of ["acetate", "stainlessSteel", "titanium", "tr90"]) {
            if (addProductForm[`product${material.charAt(0).toUpperCase() + material.slice(1)}`].checked) {
                materials.push(material === "stainlessSteel" ? "stainless steel" : material);
            }
        }
        data["materials"] = materials;

        data["shape"] = addProductForm.productShape.value;
        data["type"] =  addProductForm.productType.value;

        const variants = [];
        for (let i = 0; i < numberOfVariants; i++) {
            variants.push({
                color: Number.parseInt(productVariant.color[i].value.substr(1), 16),
                images: productVariant.imagesData[i]
            });
        }
        data["variants"] = variants;
        console.dir(addProductForm)
        console.dir(data);

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