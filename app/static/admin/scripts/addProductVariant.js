const addVariantButton = document.getElementById("addProductVariantButton");
const variantsContainer = document.getElementById("variantsContainer");
const variantsInfoContainerColor = document.getElementById("variantsInfoContainer[color]");
const variantsInfoContainerImages = document.getElementById("variantsInfoContainer[images]");
const variantsInfoContainerSelectorImages = document.getElementById("variantsInfoContainerSelector[images]");

let numberOfVariants = 0;
const productVariant = {
    input: [document.getElementById("productVariant[images][0]")],
    imagesData: []
};
const productVariantInfo = {
    color: [document.getElementById("productVariantInfo[color][0]")],
    input: [document.getElementById("productVariantInfo[images][0]")],
    imagesElement: []
}
numberOfVariants++;
document.querySelectorAll(`input[name="productVariant[color][0]"]`).forEach((input) => input.addEventListener("change", (e) => {
    productVariantInfo.color[0].style.backgroundColor = input.value;
}));

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
            variantsInfoContainerSelectorImages.innerHTML = /*html*/`<a href="#1" class="text-black opacity-50 active:opacity-100 focus:opacity-75">&#9679;</a>
            <a href="#2" class="text-black opacity-50 active:opacity-100 focus:opacity-75">&#9679;</a>
            <a href="#3" class="text-black opacity-50 active:opacity-100 focus:opacity-75">&#9679;</a>`;
            variantsInfoContainerImages.innerHTML = /*html*/`<img src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png" class="rounded-lg min-w-full shadow-sm bg-gray-800 aspect-square object-cover snap-center" id="1"></img>
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
    newVariantContainer.innerHTML = /*html*/`
    ${ejs.render(`<div class="flex flex-col gap-1">
    <div class="flex" id="">
        <input class="productColorsRadio peer form-radio rounded-md absolute hidden" type="radio" name="productVariant[color][<%-numberOfVariants-1%>]"  id="productColorBright0Radio[<%-numberOfVariants-1%>]" value="hsla(0deg 0% 100%)">
        <label style="background-color: hsla(0deg 0% 100%);" id="" for="productColorBright0Radio[<%-numberOfVariants-1%>]" class="w-2 h-2 rounded-full p-2 border-2 border-solid border-gray-400 peer-checked:border-rose-600"></label>
    </div>
    <div class="flex" id="">
        <input class="productColorsRadio peer form-radio rounded-md absolute hidden" type="radio" name="productVariant[color][<%-numberOfVariants-1%>]"  id="productColorDark1Radio[<%-numberOfVariants-1%>]" value="hsla(0deg, 0%, 0%)" checked>
        <label style="background-color: hsla(0deg, 0%, 0%)" id="" for="productColorDark1Radio[<%-numberOfVariants-1%>]" class="w-2 h-2 rounded-full p-2 border-2 border-solid border-gray-400 peer-checked:border-rose-600"></label>
    </div>
</div>
<div class="flex flex-col gap-1">
    <div class="flex" id="">
        <input class="productColorsRadio peer form-radio rounded-md absolute hidden" type="radio" name="productVariant[color][<%-numberOfVariants-1%>]"  id="productColorBright2Radio[<%-numberOfVariants-1%>]" value="hsla(0deg 0% 33%)">
        <label style="background-color: hsla(0deg 0% 33%);" id="" for="productColorBright2Radio[<%-numberOfVariants-1%>]" class="w-2 h-2 rounded-full p-2 border-2 border-solid border-gray-400 peer-checked:border-rose-600"></label>
    </div>
    <div class="flex" id="">
        <input class="productColorsRadio peer form-radio rounded-md absolute hidden" type="radio" name="productVariant[color][<%-numberOfVariants-1%>]"  id="productColorDark3Radio[<%-numberOfVariants-1%>]" value="hsla(0deg 0% 16%)">
        <label style="background-color: hsla(0deg 0% 16%);" id="" for="productColorDark3Radio[<%-numberOfVariants-1%>]" class="w-2 h-2 rounded-full p-2 border-2 border-solid border-gray-400 peer-checked:border-rose-600"></label>
    </div>
</div>  
<% for( let i = 0; i*30 <= 330; i++) { %>
    <div class="flex flex-col gap-1">
        <div class="flex" id="">
            <input class="productColorsRadio peer form-radio rounded-md absolute hidden" type="radio" name="productVariant[color][<%-numberOfVariants-1%>]"  id="productColorBright<%-i+4%>Radio[<%-numberOfVariants-1%>]" value="hsla(<%-i*30%>deg 100% 33%)">
            <label style="background-color: hsla(<%-i*30%>deg 100% 33%);" id="" for="productColorBright<%-i+4%>Radio[<%-numberOfVariants-1%>]" class="w-2 h-2 rounded-full p-2 border-2 border-solid border-gray-400 peer-checked:border-rose-600"></label>
        </div>
        <div class="flex" id="">
            <input class="productColorsRadio peer form-radio rounded-md absolute hidden" type="radio" name="productVariant[color][<%-numberOfVariants-1%>]"  id="productColorDark<%-i+4%>Radio[<%-numberOfVariants-1%>]" value="hsla(<%-i*30%>deg 100% 16%)">
            <label style="background-color: hsla(<%-i*30%>deg 100% 16%);" id="" for="productColorDark<%-i+4%>Radio[<%-numberOfVariants-1%>]" class="w-2 h-2 rounded-full p-2 border-2 border-solid border-gray-400 peer-checked:border-rose-600"></label>
        </div>
    </div>  
<% } %>
<div class="flex flex-col gap-1">
    <div class="flex" id="">
        <input class="productColorsRadio peer form-radio rounded-md absolute hidden" type="radio" name="productVariant[color][<%-numberOfVariants-1%>]"  id="productColorBrightTransparentRadio[<%-numberOfVariants-1%>]" value="transparent">
        <label style="background-image: 
        linear-gradient(90deg, #999 4px, white 4px),
        linear-gradient(90deg, white 4px, #999 4px),
        linear-gradient(90deg, #999 4px, white 4px),
    linear-gradient(90deg, white 4px, #999 4px);
    background-position: 0 0, 0 4px, 0 8px, 0 12px;
    background-repeat: repeat-x;
    background-size: 8px 4px;" id="" for="productColorBrightTransparentRadio[<%-numberOfVariants-1%>]" class="w-2 h-2 rounded-full p-2 border-2 border-solid border-gray-400 peer-checked:border-rose-600"></label>
    </div>
</div>`, {numberOfVariants})}
    <div class="flex align-middle">
    <input type="file" name="productVariant[images][${numberOfVariants-1}]" id="productVariant[images][${numberOfVariants-1}]" multiple="true" accept="images/*" capture="environment" class="file:border-rose-600 file:rounded-full file:bg-transparent file:text-rose-600 text-sm" required>
    </div>`;
    variantsContainer.appendChild(newVariantContainer);

    const newProductVariantInfo = document.createElement("div");
    newProductVariantInfo.classList.add("flex");
    newProductVariantInfo.id = `productVariantInfo[${numberOfVariants-1}]`;
    newProductVariantInfo.innerHTML = /*html*/`
    <input class="peer form-radio rounded-md absolute hidden" type="radio" name="productVariantInfo"  id="productVariantInfoInput[color][${numberOfVariants-1}]" value="1">
    <label  id="productVariantInfo[color][${numberOfVariants-1}]" for="productVariantInfoInput[color][${numberOfVariants-1}]" class="w-[16cqw] h-[16cqw] rounded-full bg-[black] p-2 border-2 border-solid border-gray-400 peer-checked:border-rose-600"></label>
    `;
    variantsInfoContainerColor.appendChild(newProductVariantInfo)

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
            variantsInfoContainerSelectorImages.innerHTML = /*html*/`<a href="#1" class="text-black opacity-50 active:opacity-100 focus:opacity-75">&#9679;</a>
            <a href="#2" class="text-black opacity-50 active:opacity-100 focus:opacity-75">&#9679;</a>
            <a href="#3" class="text-black opacity-50 active:opacity-100 focus:opacity-75">&#9679;</a>`;
            variantsInfoContainerImages.innerHTML = /*html*/`<img src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png" class="rounded-lg min-w-full shadow-sm bg-gray-800 aspect-square object-cover snap-center" id="1"></img>
            <div class="rounded-lg min-w-full shadow-sm bg-gray-400 aspect-square object-cover snap-center" id="2"></div>
            <div class="rounded-lg min-w-full shadow-sm bg-gray-200 aspect-square object-cover snap-center" id="3"></div>`;
        }
    });

    document.querySelectorAll(`input[name="productVariant[color][${numberOfVariants-1}]"]`).forEach((input) => input.addEventListener("change", (e) => {
        productVariantInfo.color[currVariant].style.backgroundColor = input.value;
    }));

    productVariant.input[currVariant].addEventListener("change", async (e) => {
        const imagesData = await uploadFiles(productVariant.input[currVariant].files);
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
            console.err(e);
        }
    }
    return imagesData;
}