import {Schema} from "mongoose";
import {IProduct, ProductModel} from "./Product";

interface IGlasses extends IProduct {
    dimensions: {
        bridge: number,
        eye: number,
        temple: number,
    },
    category: Categories,
    mainMaterial: Materials,
};

enum Categories {
    unissex = "unissex",
    masculino = "masculino",
    feminino = "feminino",
    infantil = "infantil",
};

enum Materials {
    acetato = "acetato",
    metal = "metal",
    titanium = "titanium",
    tr90 = "tr90",
};

const categories: string[] = ["unissex", "masculino", "feminino", "infantil"];
const materials: string[] = ["acetato", "metal", "titanium", "tr90"];
const schemaProperties = {
    dimensions: {
        bridge: {type: Number, min: 0, required: true,},
        eye: {type: Number, min: 0, required: true,},
        temple: {type: Number, min: 0, required: true,},
    },
    category: {
        type: String,
        enum: categories,
        required: true,
    },
    mainMaterial: {
        type: String,
        enum: materials,
        required: true,
    }
};

const schemaOptions = {
    timestamps: true,
    discriminatorKey: "kind",
};

const glassesSchema = new Schema<IGlasses>(schemaProperties, schemaOptions);
const GlassesModel = ProductModel.discriminator("Glasses", glassesSchema);
// GlassesModel.create({
//     productCode: 1,
//     productName: "A",
//     price: 123,
//     quantity: 100,
//     tags: "abc",
//     hidden: false,
//     onSale: false,
//     imageURL: "abc.com",
//     dimensions: {
//         bridge: 1,
//         eye: 2,
//         temple: 3,
//     },
//     category: Categories.feminino,
//     mainMaterial: Materials.acetato,
// }).then((g) => g.save());
export {IGlasses, GlassesModel};