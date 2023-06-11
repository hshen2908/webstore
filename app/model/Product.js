"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
var mongoose = __importStar(require("mongoose"));
var mongoose_1 = require("mongoose");
var schemaProperties = {
    code: { type: Number, min: 0, required: true },
    name: { type: String, required: true },
    price: { type: Number, min: 0, required: true },
    quantity: { type: Number, min: 0, required: true },
    tags: [{ type: String }],
    hidden: { type: Boolean, required: true },
    onSale: { type: Boolean, required: true },
    newArrival: { type: Boolean, required: true },
};
var schemaOptions = {
    timestamps: true,
    discriminatorKey: "kind",
};
var productSchema = new mongoose_1.Schema(schemaProperties, schemaOptions);
var ProductModel = mongoose.model("Product", productSchema, "products");
exports.ProductModel = ProductModel;
