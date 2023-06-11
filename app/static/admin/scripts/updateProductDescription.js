const formCheckInfoMap = {
    productHidden: "productHiddenInfo",
    productUnissex: "productUnissexInfo",
    productMen: "productMenInfo",
    productWomen: "productWomenInfo",
    productKids: "productKidsInfo",
    productAcetate: "productAcetateInfo",
    productStainlessSteel: "productStainlessSteelInfo",
    productTitanium: "productTitaniumInfo",
    productTr90: "productTr90Info",
    productNewArrival: "productNewArrivalInfo",
    productOnSale: "productOnSaleInfo",
    productHidden: "productHiddenInfo",
}

const formTextNumberInfoMap = {
    productName: "productNameInfo",
    productPrice: "productPriceInfo",
    productEyeglasses: "productTypeInfo",
    productSunglasses: "productTypeInfo",
    productClipOn: "productTypeInfo",
    productEye: "productEyeInfo",
    productBridge: "productBridgeInfo",
    productTemple: "productTempleInfo",
}

for (const [check, info] of Object.entries(formCheckInfoMap)) {
    const checkElement = document.getElementById(check);
    const infoElement = document.getElementById(info);

    checkElement.addEventListener("change", (e) => {
        infoElement.classList.toggle("hidden");
    });
}

for (const [textNumber, info] of Object.entries(formTextNumberInfoMap)) {
    const textNumberElement = document.getElementById(textNumber);
    const infoElement = document.getElementById(info);

    textNumberElement.addEventListener("input", (e) => {
        infoElement.innerText = textNumberElement.value;
    });
}