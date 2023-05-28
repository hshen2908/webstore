import {Schema} from "mongoose";
import {IProduct, ProductModel} from "./Product";

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

export {IGlasses, GlassesModel};