const categoryDropdown = {
    select: document.getElementById("categorySelect"),
    button: document.getElementById("categoryButton"),
    selectShown: false,
}

const materialDropdown = {
    select: document.getElementById("materialSelect"),
    button: document.getElementById("materialButton"),
    selectShown: false,
}

const typeDropdown = {
    select: document.getElementById("typeSelect"),
    button: document.getElementById("typeButton"),
    selectShown: false,
}

const colorsDropdown = {
    select: document.getElementById("colorsSelect"),
    button: document.getElementById("colorsButton"),
    selectShown: false,
}

const shapesDropdown = {
    select: document.getElementById("shapesSelect"),
    button: document.getElementById("shapesButton"),
    selectShown: false,
}

const dimensionsDropdown = {
    select: document.getElementById("dimensionsSelect"),
    button: document.getElementById("dimensionsButton"),
    selectShown: false,
}

const modifiersDropdown = {
    select: document.getElementById("modifiersSelect"),
    button: document.getElementById("modifiersButton"),
    selectShown: false,
}

const dropdowns = [categoryDropdown, materialDropdown, typeDropdown, colorsDropdown, shapesDropdown, dimensionsDropdown, modifiersDropdown];

for (let dropdown of dropdowns) {
    dropdown.button.addEventListener("click", (e) => {
        if (dropdown.selectShown) {
            dropdown.selectShown = false;
            dropdown.select.classList.remove("animate-dropdownClose");
            dropdown.select.classList.remove("animate-dropdownOpen");
            dropdown.select.classList.add("animate-dropdownClose");
        } else {
            dropdown.selectShown = true;
            dropdown.select.classList.remove("hidden");
            dropdown.select.classList.remove("animate-dropdownClose");
            dropdown.select.classList.remove("animate-dropdownOpen");
            dropdown.select.classList.add("animate-dropdownOpen");
        }
    });
    dropdown.select.addEventListener("animationend", (e) => {
        if (!dropdown.selectShown) {
            dropdown.select.classList.remove("hidden");
            dropdown.select.classList.add("hidden");
            
        }
    });
}
