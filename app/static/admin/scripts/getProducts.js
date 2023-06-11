function getFilterData() {
    const categoriesCheckboxes = document.querySelectorAll(".productFilterCategoriesCheckboxClass:checked");
    const categories = [];
    categoriesCheckboxes.forEach((categoriesCheckbox) => categories.push(categoriesCheckbox.value));
    const materialsCheckboxes = document.querySelectorAll(".productFilterMaterialsCheckboxClass:checked");
    const materials = [];
    materialsCheckboxes.forEach((materialsCheckbox) => materials.push(materialsCheckbox.value));
    const typesCheckboxes = document.querySelectorAll(".productFilterTypesCheckboxClass:checked");
    const types = [];
    typesCheckboxes.forEach((typesCheckbox) => types.push(typesCheckbox.value));
    const shapesCheckboxes = document.querySelectorAll(".productFilterShapesCheckboxClass:checked");
    const shapes = [];
    shapesCheckboxes.forEach((shapesCheckbox) => shapes.push(shapesCheckbox.value));

    const colorsCheckboxes = document.querySelectorAll(".productFilterColorsCheckboxClass:checked");
    const colors = [];
    colorsCheckboxes.forEach((colorsCheckbox) => colors.push(colorsCheckbox.value));

    const onSale = document.getElementById("productFilterOnSale").checked;
    const newArrival = document.getElementById("productFilterNewArrival").checked;

    const dimensions = {
        eye: {
            min: document.getElementById("productFilterEyeMin").value || null,
            max: document.getElementById("productFilterEyeMax").value || null,
        },
        bridge: {
            min: document.getElementById("productFilterBridgeMin").value || null,
            max: document.getElementById("productFilterBridgeMax").value || null,
        },
        temple: {
            min: document.getElementById("productFilterTempleMin").value || null,
            max: document.getElementById("productFilterTempleMax").value || null,
        }
    }

    return {categories, materials, types, shapes, colors, onSale, newArrival, dimensions};
}

async function getProducts(startIndex, responseType = "html:page-listing") {
    const productsRequest = getFilterData();
    productsRequest.startIndex = startIndex;
    productsRequest.responseType = responseType;

    try {
        const response = await fetch("/admin/products", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productsRequest),
        });
        return {html, totalProductCount, responseProductCount} = await response.json();
    } catch (err) {
        console.error(err);
    }
}