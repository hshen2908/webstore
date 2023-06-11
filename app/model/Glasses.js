"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.GlassesModel = void 0;
var mongoose_1 = require("mongoose");
var Product_1 = require("./Product");
;
var Categories;
(function (Categories) {
    Categories["unissex"] = "unissex";
    Categories["men"] = "men";
    Categories["women"] = "women";
    Categories["kids"] = "kids";
})(Categories || (Categories = {}));
;
var Materials;
(function (Materials) {
    Materials["acetate"] = "acetate";
    Materials["stainlessSteel"] = "stainless steel";
    Materials["titanium"] = "titanium";
    Materials["tr90"] = "tr90";
})(Materials || (Materials = {}));
;
var Shapes;
(function (Shapes) {
    Shapes["round"] = "round";
    Shapes["catEye"] = "cat eye";
    Shapes["rectangle"] = "rectangle";
    Shapes["wayfare"] = "wayfare";
    Shapes["square"] = "square";
    Shapes["oval"] = "oval";
    Shapes["geometric"] = "geometric";
    Shapes["aviator"] = "aviator";
    Shapes["clubmaster"] = "clubmaster";
})(Shapes || (Shapes = {}));
var Types;
(function (Types) {
    Types["sunglasses"] = "sunglasses";
    Types["clipOn"] = "clip on";
    Types["eyeglasses"] = "eyeglasses";
})(Types || (Types = {}));
var categories = ["unissex", "men", "women", "kids"];
var materials = ["acetate", "stainless steel", "titanium", "tr90"];
var shapes = ["round", "cat eye", "rectangle", "wayfare", "square", "oval", "geometric", "aviator", "clubmaster"];
var types = ["sunglasses", "clip on", "eyeglasses"];
var schemaProperties = {
    dimensions: {
        bridge: { type: Number, min: 0, required: true, },
        eye: { type: Number, min: 0, required: true, },
        temple: { type: Number, min: 0, required: true, },
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
var schemaOptions = {
    timestamps: true,
    discriminatorKey: "kind",
};
var glassesSchema = new mongoose_1.Schema(schemaProperties, schemaOptions);
var GlassesModel = Product_1.ProductModel.discriminator("Glasses", glassesSchema);
exports.GlassesModel = GlassesModel;
function getProducts(filter, includeHidden, recentFirst) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    if (recentFirst === void 0) { recentFirst = true; }
    var modelFilter = {};
    var $and = [{}, {}, {}, {}, {}];
    ((_a = filter === null || filter === void 0 ? void 0 : filter.categories) === null || _a === void 0 ? void 0 : _a.length) && (filter.categories.length !== 0) && ($and[0]["$or"] = filter.categories.map(function (category) {
        return { categories: category };
    }));
    ((_b = filter === null || filter === void 0 ? void 0 : filter.materials) === null || _b === void 0 ? void 0 : _b.length) && (filter.materials.length !== 0) && ($and[1]["$or"] = filter.materials.map(function (material) {
        return { materials: material };
    }));
    ((_c = filter === null || filter === void 0 ? void 0 : filter.types) === null || _c === void 0 ? void 0 : _c.length) && (filter.types.length !== 0) && ($and[2]["$or"] = filter.types.map(function (type) {
        return { type: type };
    }));
    ((_d = filter === null || filter === void 0 ? void 0 : filter.shapes) === null || _d === void 0 ? void 0 : _d.length) && (filter.shapes.length !== 0) && ($and[3]["$or"] = filter.shapes.map(function (shape) {
        return { shape: shape };
    }));
    ((_e = filter === null || filter === void 0 ? void 0 : filter.colors) === null || _e === void 0 ? void 0 : _e.length) && (filter.colors.length !== 0) && ($and[4]["$or"] = filter.colors.map(function (color) {
        return { "variants.color": color };
    }));
    modelFilter["$and"] = $and;
    modelFilter["dimensions.eye"] = {
        $lte: Number.parseInt((_f = filter === null || filter === void 0 ? void 0 : filter.dimensions) === null || _f === void 0 ? void 0 : _f.eye.max) || 10000,
        $gte: Number.parseInt((_g = filter === null || filter === void 0 ? void 0 : filter.dimensions) === null || _g === void 0 ? void 0 : _g.eye.min) || 0,
    };
    modelFilter["dimensions.bridge"] = {
        $lte: Number.parseInt((_h = filter === null || filter === void 0 ? void 0 : filter.dimensions) === null || _h === void 0 ? void 0 : _h.bridge.max) || 10000,
        $gte: Number.parseInt((_j = filter === null || filter === void 0 ? void 0 : filter.dimensions) === null || _j === void 0 ? void 0 : _j.bridge.min) || 0,
    };
    modelFilter["dimensions.temple"] = {
        $lte: Number.parseInt((_k = filter === null || filter === void 0 ? void 0 : filter.dimensions) === null || _k === void 0 ? void 0 : _k.temple.max) || 10000,
        $gte: Number.parseInt((_l = filter === null || filter === void 0 ? void 0 : filter.dimensions) === null || _l === void 0 ? void 0 : _l.temple.min) || 0,
    };
    (filter.newArrival) && (modelFilter["newArrival"] = filter.newArrival);
    (filter.onSale) && (modelFilter["onSale"] = filter.onSale);
    !includeHidden && (modelFilter["hidden"] = includeHidden);
    if (recentFirst) {
        return GlassesModel.find(modelFilter).sort({ updatedAt: "-1" });
    }
    return GlassesModel.find(modelFilter);
}
exports.getProducts = getProducts;
