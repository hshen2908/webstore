import express, {Request, Response, Router} from "express";
import {IGlasses, GlassesModel} from "../model/Glasses";
import {IProduct, ProductModel} from "../model/Product";

const rootRouter: Router = Router();

rootRouter.use(express.json());

rootRouter.get("/", async (req: Request, res: Response) => {
    const glasses = await GlassesModel.find({}, null, {limit: 64});
    res.render("./root", {title: "Home", glasses, startIndex: 0});
});

rootRouter.post("/products", async (req: Request, res: Response) => {
    const filter = req.body;
    const modelFilter = {};
    !(filter.categories.length == 0) && (modelFilter["categories"] = filter.categories);
    !(filter.materials.length == 0) && (modelFilter["materials"] = filter.materials);
    !(filter.types.length == 0) && (modelFilter["type"] = filter.types);
    !(filter.shapes.length == 0) && (modelFilter["shape"] = filter.shapes);
    modelFilter["dimensions.eye"] = {
        $lte: Number.parseInt(filter.dimensions.eye.max) || 10000,
        $gte: Number.parseInt(filter.dimensions.eye.min) || 0,
    }
    modelFilter["dimensions.bridge"] = {
        $lte: Number.parseInt(filter.dimensions.bridge.max) || 10000,
        $gte: Number.parseInt(filter.dimensions.bridge.min) || 0,
    };
    modelFilter["dimensions.temple"] = {
        $lte: Number.parseInt(filter.dimensions.temple.max) || 10000,
        $gte: Number.parseInt(filter.dimensions.temple.min) || 0,
    };

    (filter.newArrival) && (modelFilter["newArrival"] = filter.newArrival);
    (filter.onSale) && (modelFilter["onSale"] = filter.onSale);

    const glasses = await GlassesModel.find(modelFilter);
    console.log(glasses)
    console.log(modelFilter)
    res.render("./partials/productListings", {glasses, startIndex: 0});
})

rootRouter.get("/contact", (req: Request, res: Response) => {
    res.render("./contact", {title: "Contact"});
});

export {rootRouter};