const addVariantButton = document.getElementById("addProductVariantButton");
const variantsContainer = document.getElementById("variantsContainer");
const variantsInfoContainerColor = document.getElementById("variantsInfoContainer[color]");
const variantsInfoContainerImages = document.getElementById("variantsInfoContainer[images]");
const variantsInfoContainerSelectorImages = document.getElementById("variantsInfoContainerSelector[images]");

let numberOfVariants = 0;
const productVariant = {
    color: [document.getElementById("productVariant[color][0]")],
    input: [document.getElementById("productVariant[images][0]")],
    imagesData: []
};
const productVariantInfo = {
    color: [document.getElementById("productVariantInfo[color][0]")],
    input: [document.getElementById("productVariantInfo[images][0]")],
    imagesElement: []
}
numberOfVariants++;
productVariant.color[0].addEventListener("input", (e) => {
    productVariantInfo.color[0].style.backgroundColor = productVariant.color[0].value;
});

productVariant.input[0].addEventListener("change", async (e) => {
    const imagesData = await uploadFiles(productVariant.input[0].files);
    variantsInfoContainerImages.innerHTML = "";
    variantsInfoContainerSelectorImages.innerHTML = "";
    productVariant.imagesData[0] = imagesData;
    imagesData.forEach((imageData, index) => {
        const newImageElement = document.createElement("img");
        newImageElement.classList.add("rounded-lg", "min-w-full", "shadow-sm", "aspect-square", "object-cover","snap-center");
        newImageElement.id = index;
        newImageElement.src = imageData.url;
        variantsInfoContainerImages.appendChild(newImageElement);

        const newImageSelectorElement = document.createElement("a");
        newImageSelectorElement.href = `#${index}`;
        newImageSelectorElement.classList.add("text-black", "opacity-50", "active:opacity-100", "focus:opacity-75")
        newImageSelectorElement.innerHTML = "&#9679;";
        variantsInfoContainerSelectorImages.appendChild(newImageSelectorElement);
        document.getElementById(`productVariantInfoInput[color][${0}]`).checked = "true";
    });
});

document.getElementById("productVariantInfoInput[color][0]").addEventListener("click", (e) => {
    variantsInfoContainerImages.innerHTML = "";
        variantsInfoContainerSelectorImages.innerHTML = "";
        if (productVariant.input[0].files.length) {
            productVariant.imagesData[0].forEach((imageData, index) => {
                const newImageElement = document.createElement("img");
                newImageElement.classList.add("rounded-lg", "min-w-full", "shadow-sm", "aspect-square", "object-cover","snap-center");
                newImageElement.id = index;
                newImageElement.src = imageData.url;
                variantsInfoContainerImages.appendChild(newImageElement);
        
                const newImageSelectorElement = document.createElement("a");
                newImageSelectorElement.href = `#${index}`;
                newImageSelectorElement.classList.add("text-black", "opacity-50", "active:opacity-100", "focus:opacity-75")
                newImageSelectorElement.innerHTML = "&#9679;";
                variantsInfoContainerSelectorImages.appendChild(newImageSelectorElement);
            });
        } else {
            variantsInfoContainerSelectorImages.innerHTML = `<a href="#1" class="text-black opacity-50 active:opacity-100 focus:opacity-75">&#9679;</a>
            <a href="#2" class="text-black opacity-50 active:opacity-100 focus:opacity-75">&#9679;</a>
            <a href="#3" class="text-black opacity-50 active:opacity-100 focus:opacity-75">&#9679;</a>`;
            variantsInfoContainerImages.innerHTML = `<img src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png" class="rounded-lg min-w-full shadow-sm bg-gray-800 aspect-square object-cover snap-center" id="1"></img>
            <div class="rounded-lg min-w-full shadow-sm bg-gray-400 aspect-square object-cover snap-center" id="2"></div>
            <div class="rounded-lg min-w-full shadow-sm bg-gray-200 aspect-square object-cover snap-center" id="3"></div>`;
        }
});

addVariantButton.addEventListener("click", (e) => {
    e.preventDefault();
    numberOfVariants++;
    const newVariantContainer = document.createElement("div");
    newVariantContainer.classList.add("flex", "flex-wrap", "gap-2");
    newVariantContainer.id = `productVariant[${numberOfVariants-1}]`;
    newVariantContainer.innerHTML = `<div class="overflow-hidden w-6 h-6 rounded-full border-gray-300 bg-black relative p-1 border-4 inline-block border-double">
    <input type="color" name="productVariant[color][${numberOfVariants-1}]" id="productVariant[color][${numberOfVariants-1}]" class="w-[175%] h-[175%] absolute -bottom-[0.3rem] -left-1">
</div>
<div class="flex align-middle">
    <input type="file" name="productVariant[images][${numberOfVariants-1}]" id="productVariant[images][${numberOfVariants-1}]" multiple="true" accept="images/*" capture="environment" required>
</div>`;
    variantsContainer.appendChild(newVariantContainer);

    const newProductVariantInfo = document.createElement("div");
    newProductVariantInfo.classList.add("flex");
    newProductVariantInfo.id = `productVariantInfo[${numberOfVariants-1}]`;
    newProductVariantInfo.innerHTML = `<input class="peer form-radio rounded-md absolute hidden" type="radio" name="productVariantInfo"  id="productVariantInfoInput[color][${numberOfVariants-1}]" value="1">
    <label  id="productVariantInfo[color][${numberOfVariants-1}]" for="productVariantInfoInput[color][${numberOfVariants-1}]" class="w-[16cqw] h-[16cqw] rounded-full bg-[black] p-2 border-4 border-double border-gray-400 peer-checked:border-blue-400"></label>`;
    variantsInfoContainerColor.appendChild(newProductVariantInfo)

    productVariant.color.push(document.getElementById(`productVariant[color][${numberOfVariants-1}]`));
    productVariant.input.push(document.getElementById(`productVariant[images][${numberOfVariants-1}]`));
    
    productVariantInfo.color.push(document.getElementById(`productVariantInfo[color][${numberOfVariants-1}]`));
    productVariantInfo.input.push(document.getElementById(`productVariantInfo[images][${numberOfVariants-1}]`));
    const currVariant = numberOfVariants-1;

    const currColorRadio = document.getElementById(`productVariantInfoInput[color][${numberOfVariants-1}]`);
    currColorRadio.addEventListener("click", (e) => {
        variantsInfoContainerImages.innerHTML = "";
        variantsInfoContainerSelectorImages.innerHTML = "";
        if (productVariant.input[currVariant].files.length) {
            productVariant.imagesData[currVariant].forEach((imageData, index) => {
                const newImageElement = document.createElement("img");
                newImageElement.classList.add("rounded-lg", "min-w-full", "shadow-sm", "aspect-square", "object-cover","snap-center");
                newImageElement.id = index;
                newImageElement.src = imageData.url;
                variantsInfoContainerImages.appendChild(newImageElement);
        
                const newImageSelectorElement = document.createElement("a");
                newImageSelectorElement.href = `#${index}`;
                newImageSelectorElement.classList.add("text-black", "opacity-50", "active:opacity-100", "focus:opacity-75")
                newImageSelectorElement.innerHTML = "&#9679;";
                variantsInfoContainerSelectorImages.appendChild(newImageSelectorElement);
            });
        } else {
            variantsInfoContainerSelectorImages.innerHTML = `<a href="#1" class="text-black opacity-50 active:opacity-100 focus:opacity-75">&#9679;</a>
            <a href="#2" class="text-black opacity-50 active:opacity-100 focus:opacity-75">&#9679;</a>
            <a href="#3" class="text-black opacity-50 active:opacity-100 focus:opacity-75">&#9679;</a>`;
            variantsInfoContainerImages.innerHTML = `<img src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png" class="rounded-lg min-w-full shadow-sm bg-gray-800 aspect-square object-cover snap-center" id="1"></img>
            <div class="rounded-lg min-w-full shadow-sm bg-gray-400 aspect-square object-cover snap-center" id="2"></div>
            <div class="rounded-lg min-w-full shadow-sm bg-gray-200 aspect-square object-cover snap-center" id="3"></div>`;
        }
    });

    productVariant.color[numberOfVariants-1].addEventListener("input", (e) => {
        productVariantInfo.color[currVariant].style.backgroundColor = productVariant.color[currVariant].value;
    });

    productVariant.input[currVariant].addEventListener("change", async (e) => {
        const imagesData = await uploadFiles(productVariant.input[currVariant].files);
        console.dir(imagesData);
        variantsInfoContainerImages.innerHTML = "";
        variantsInfoContainerSelectorImages.innerHTML = "";
        productVariant.imagesData[currVariant] = imagesData;
        imagesData.forEach((imageData, index) => {
            const newImageElement = document.createElement("img");
            newImageElement.classList.add("rounded-lg", "min-w-full", "shadow-sm", "aspect-square", "object-cover","snap-center");
            newImageElement.id = index;
            newImageElement.src = imageData.url;
            variantsInfoContainerImages.appendChild(newImageElement);
    
            const newImageSelectorElement = document.createElement("a");
            newImageSelectorElement.href = `#${index}`;
            newImageSelectorElement.classList.add("text-black", "opacity-50", "active:opacity-100", "focus:opacity-75")
            newImageSelectorElement.innerHTML = "&#9679;";
            variantsInfoContainerSelectorImages.appendChild(newImageSelectorElement);
            document.getElementById(`productVariantInfoInput[color][${currVariant}]`).checked = "true";
        });
    });
});

async function uploadFiles(files) {
    const formData = new FormData();
    const imagesData = [];
    for (let i = 0; i < files.length; i++) {
        const signatureResponse = await fetch("/admin/api/upload-signature", {method: "POST"});
        const {timestamp, signature, apiKey, uploadUrl, uploadPreset, uploadFolder} = await signatureResponse.json();
        // formData.append("file", files[i]);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("upload_preset", uploadPreset);
        formData.append("folder", uploadFolder)
    
        try {
            const transparencyForm = new FormData();
            transparencyForm.append("image_file", files[i]);
            const transparencyResponse = await fetch("https://clipdrop-api.co/remove-background/v1", {
                method: "POST",
                headers: {
                    "x-api-key": "a6de1a7bf333f13d5934f0b3f18789ee1b14a224e0230aaa3e73dfed1cd630f1343a341d0c7495ef721c26f80097890a"
                },
                body: transparencyForm,
            });
            const transparencyResponseData = await transparencyResponse.arrayBuffer();
            console.dir(transparencyResponseData);
            const transparentImageFile = new File([transparencyResponseData], "a.png", {type: "image/png"});

            formData.append("file", transparentImageFile);

            const response = await fetch(uploadUrl, {
                method: "POST",
                body: formData
            });
            const imageResponseData = await response.json();
            const imageData = {url: imageResponseData.secure_url, fileName: imageResponseData.public_id};
            imagesData.push(imageData);
        } catch (e) {
            console.log(e);
        }
    }
    console.log(2222)
    return imagesData;
}