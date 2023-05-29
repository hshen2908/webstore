function initChooseVariant() {
    const productsContainer = document.getElementById("productsContainer");
    const productCount = Number.parseInt(productsContainer.attributes["data-product-count"].value);

    for (let i = 0; i < productCount; i++) {
        const variantsInfoContainerImages = document.getElementById(`[${i}]variantsInfoContainer[images]`);
        const variantsInfoContainerSelectorImages = document.getElementById(`[${i}]variantsInfoContainerSelector[images]`);
        document.querySelectorAll(`[id^="[${i}]productVariantInfoInput[color]"]`).forEach((variantInput) => {
            variantInput.addEventListener("click", (e) => {
                variantsInfoContainerImages.innerHTML = "";
                variantsInfoContainerSelectorImages.innerHTML = "";
                const images = JSON.parse(variantInput.attributes["data-images"].value);
                console.dir(images)
                if (images.length) {
                images.forEach((image, index) => {
                        const newImageElement = document.createElement("img");
                        newImageElement.classList.add("rounded-lg", "min-w-full", "shadow-sm", "aspect-square", "object-cover","snap-center");
                        newImageElement.id = image.fileName.split("/")[1];
                        newImageElement.src = image.url;
                        variantsInfoContainerImages.appendChild(newImageElement);
                
                        const newImageSelectorElement = document.createElement("a");
                        newImageSelectorElement.href = `#${image.fileName.split("/")[1]}`;
                        newImageSelectorElement.classList.add("text-gray-700", "opacity-50", "active:opacity-100", "focus:opacity-75")
                        newImageSelectorElement.innerHTML = "&#9679;";
                        variantsInfoContainerSelectorImages.appendChild(newImageSelectorElement);
                    });
                } else {
                    variantsInfoContainerSelectorImages.innerHTML = `<a href="#1" class="text-gray-700 opacity-50 active:opacity-100 focus:opacity-75">&#9679;</a>
                    <a href="#2" class="text-gray-700 opacity-50 active:opacity-100 focus:opacity-75">&#9679;</a>
                    <a href="#3" class="text-gray-700 opacity-50 active:opacity-100 focus:opacity-75">&#9679;</a>`;
                    variantsInfoContainerImages.innerHTML = `<img src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png" class="rounded-lg min-w-full shadow-sm bg-gray-800 aspect-square object-cover snap-center" id="1"></img>
                    <div class="rounded-lg min-w-full shadow-sm bg-gray-400 aspect-square object-cover snap-center" id="2"></div>
                    <div class="rounded-lg min-w-full shadow-sm bg-gray-200 aspect-square object-cover snap-center" id="3"></div>`;
                }
            });
        });
    }
}
initChooseVariant();