import * as mongoose from "mongoose";
import {Schema} from "mongoose";

interface IProduct {
    code: number,
    name: string,
    price: number,
    quantity: number,
    tags: [string],
    hidden: boolean,
    onSale: boolean,
    newArrival: boolean,
}

const schemaProperties = {
    code: {type: Number, min: 0, required: true},
    name: {type: String, required: true},
    price: {type: Number, min: 0, required: true},
    quantity: {type: Number, min: 0, required: true},
    tags: [{type: String}],
    hidden: {type: Boolean, required: true},
    onSale: {type: Boolean, required: true},
    newArrival: {type: Boolean, required: true},
};

const schemaOptions = {
    timestamps: true,
    discriminatorKey: "kind",
}

const productSchema = new Schema<IProduct>(schemaProperties, schemaOptions);
const ProductModel = mongoose.model("Product", productSchema, "products");

export {IProduct, ProductModel};
