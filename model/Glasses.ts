import {Schema} from "mongoose";
import {IProduct, ProductModel} from "./Product";
import {randomInt} from "crypto";

interface IGlasses extends IProduct {
    dimensions: {
        bridge: number,
        eye: number,
        temple: number,
    },
    categories: Array<Categories>,
    materials: Array<Materials>,
    variants: [
        {
            color: number,
            images: [
                {
                    url: string,
                    fileName: string
                }
            ]
        }
    ],
    shape: Shapes
    type: Types
};

enum Categories {
    unissex = "unissex",
    men = "men",
    women = "women",
    kids = "kids",
};

enum Materials {
    acetate = "acetate",
    stainlessSteel = "stainless steel",
    titanium = "titanium",
    tr90 = "tr90",
};

enum Shapes {
    round = "round",
    catEye = "cat eye",
    rectangle = "rectangle",
    wayfare = "wayfare",
    square = "square",
    oval = "oval",
    geometric = "geometric",
    aviator = "aviator",
    clubmaster = "clubmaster"
}

enum Types {
    sunglasses = "sunglasses",
    clipOn = "clip on",
    eyeglasses = "eyeglasses"
}

const categories: string[] = ["unissex", "men", "women", "kids"];
const materials: string[] = ["acetate", "stainless steel", "titanium", "tr90"];
const shapes: string[] = ["round", "cat eye", "rectangle", "wayfare", "square", "oval", "geometric", "aviator", "clubmaster"];
const types: string[] = ["sunglasses", "clip on", "eyeglasses"]

const schemaProperties = {
    dimensions: {
        bridge: {type: Number, min: 0, required: true,},
        eye: {type: Number, min: 0, required: true,},
        temple: {type: Number, min: 0, required: true,},
    },
    categories: [
        {
            type: String,
            enum: categories,
        }
    ],
    materials: [
        {
            type: String,
            enum: materials,
        }
    ],
    variants: [
        {
            color: {
                type: Number,
                min: 0,
            },
            images: [
                {
                    url: {
                        type: String,
                    },
                    fileName: {
                        type: String
                    }
                }
            ]
        }
    ],
    shape: {
        type: String,
        enum: shapes,
        required: true
    },
    type: {
        type: String,
        enum: types,
        required: true
    }
};

const schemaOptions = {
    timestamps: true,
    discriminatorKey: "kind",
};

const glassesSchema = new Schema<IGlasses>(schemaProperties, schemaOptions);
const GlassesModel = ProductModel.discriminator("Glasses", glassesSchema);
// for (let i = 0; i < 10; i++) {
//     GlassesModel.create({
//         code: randomInt(0, 100),
//         name: "A",
//         price: 123,
//         quantity: 100,
//         tags: "abc",
//         hidden: false,
//         onSale: false,
//         newArrival: true,
//         dimensions: {
//             bridge: 1,
//             eye: 2,
//             temple: 3,
//         },
//         categories: [Categories.women],
//         materials: [Materials.acetate],
//         variants: [{
//             color: 123,
//             images: [{
//                 fileName: "A.a",
//                 url: "data:image/png;base64,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"
//             }],
//         }],
//         shape: Shapes.round,
//         type: Types.clipOn
//     }).then((g) => g.save());
// }

export {IGlasses, GlassesModel};