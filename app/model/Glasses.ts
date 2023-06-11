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
            color: string,
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
                type: String,
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

function getProducts(filter, includeHidden: boolean, recentFirst: boolean = true): Promise<any> {
    const modelFilter = {};
    const $and = [{}, {}, {}, {}, {}];
    (filter?.categories?.length) && (filter.categories.length !== 0) && ($and[0]["$or"] = filter.categories.map((category) => {
        return {categories: category};
    }));
    (filter?.materials?.length) && (filter.materials.length !== 0) && ($and[1]["$or"] = filter.materials.map((material) => {
        return {materials: material};
    }));
    (filter?.types?.length) && (filter.types.length !== 0) && ($and[2]["$or"] = filter.types.map((type) => {
        return {type: type};
    }));
    (filter?.shapes?.length) && (filter.shapes.length !== 0) && ($and[3]["$or"] = filter.shapes.map((shape) => {
        return {shape: shape};
    }));
    (filter?.colors?.length) && (filter.colors.length !== 0) && ($and[4]["$or"] = filter.colors.map((color) => {
        return {"variants.color": color};
    }));
    modelFilter["$and"] = $and;

    modelFilter["dimensions.eye"] = {
        $lte: Number.parseInt(filter?.dimensions?.eye.max) || 10000,
        $gte: Number.parseInt(filter?.dimensions?.eye.min) || 0,
    }
    modelFilter["dimensions.bridge"] = {
        $lte: Number.parseInt(filter?.dimensions?.bridge.max) || 10000,
        $gte: Number.parseInt(filter?.dimensions?.bridge.min) || 0,
    };
    modelFilter["dimensions.temple"] = {
        $lte: Number.parseInt(filter?.dimensions?.temple.max) || 10000,
        $gte: Number.parseInt(filter?.dimensions?.temple.min) || 0,
    };

    (filter.newArrival) && (modelFilter["newArrival"] = filter.newArrival);
    (filter.onSale) && (modelFilter["onSale"] = filter.onSale);
    !includeHidden && (modelFilter["hidden"] = includeHidden);
    if (recentFirst) {
        return GlassesModel.find(modelFilter).sort({updatedAt: "-1"});
    }
    return GlassesModel.find(modelFilter);
}

export {getProducts};