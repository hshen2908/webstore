import {Schema} from "mongoose";
import * as mongoose from "mongoose";

interface IProduct {
    productCode: number,
    productName: string,
    price: number,
    quantity: number,
    tags: string,
    hidden: boolean,
    onSale: boolean,
    imageURL: string,
}

const schemaProperties = {
    productCode: {type: Number, min: 0, required: true},
    productName: {type: String, required: true},
    price: {type: Number, min: 0, required: true},
    quantity: {type: Number, min: 0, required: true},
    tags: [{type: String, required: true}],
    hidden: {type: Boolean, required: true},
    onSale: {type: Boolean, required: true},
    imageURL: {type: String, required: true},
};

const schemaOptions = {
    timestamps: true,
    discriminatorKey: "kind",
}

const productSchema = new Schema<IProduct>(schemaProperties, schemaOptions);
const ProductModel = mongoose.model("Product", productSchema, "products");

export {IProduct, ProductModel};
