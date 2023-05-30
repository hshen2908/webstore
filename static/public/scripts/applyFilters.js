const applyFiltersButton = document.getElementById("applyFiltersButton");
const applyFiltersForm = document.getElementById("applyFiltersForm");

applyFiltersForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const categoriesCheckboxes = document.querySelectorAll(".productCategoriesCheckbox:checked");
    const categories = [];
    categoriesCheckboxes.forEach((categoriesCheckbox) => categories.push(categoriesCheckbox.value));
    const materialsCheckboxes = document.querySelectorAll(".productMaterialsCheckbox:checked");
    const materials = [];
    materialsCheckboxes.forEach((materialsCheckbox) => materials.push(materialsCheckbox.value));
    const typesCheckboxes = document.querySelectorAll(".productTypesCheckbox:checked");
    const types = [];
    typesCheckboxes.forEach((typesCheckbox) => types.push(typesCheckbox.value));
    const shapesCheckboxes = document.querySelectorAll(".productShapesCheckbox:checked");
    const shapes = [];
    shapesCheckboxes.forEach((shapesCheckbox) => shapes.push(shapesCheckbox.value));

    const colorsCheckboxes = document.querySelectorAll(".productColorsCheckbox:checked");
    const colors = [];
    colorsCheckboxes.forEach((shapesCheckbox) => colors.push(window.getComputedStyle(shapesCheckbox).backgroundColor));

    const onSale = document.getElementById("productOnSale").checked;
    const newArrival = document.getElementById("productNewArrival").checked;

    const dimensions = {
        eye: {
            min: document.getElementById("productEyeMin").value || null,
            max: document.getElementById("productEyeMax").value || null,
        },
        bridge: {
            min: document.getElementById("productBridgeMin").value || null,
            max: document.getElementById("productBridgeMax").value || null,
        },
        temple: {
            min: document.getElementById("productTempleMin").value || null,
            max: document.getElementById("productTempleMax").value || null,
        }
    }

    const filter = {categories, materials, types, shapes, colors, onSale, newArrival, dimensions};

    console.log(filter);
    try {
        const response = await fetch("/products", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filter),
        });
        const data = await response.text();
        const productsContainer = document.getElementById("productsContainer");
        productsContainer.innerHTML = data;
        console.log(data);
    } catch (err) {
        console.error(err);
    }
});