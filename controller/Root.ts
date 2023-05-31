import express, {Request, Response, Router} from "express";
import {GlassesModel} from "../model/Glasses";

function getProducts(filter, includeHidden: boolean): Promise<any> {
    const modelFilter = {};
    (filter?.categories?.length) && (filter.categories.length !== 0) && (modelFilter["categories"] = filter.categories);
    (filter?.materials?.length) && (filter.materials.length !== 0) && (modelFilter["materials"] = filter.materials);
    (filter?.types?.length) && (filter.types.length !== 0) && (modelFilter["type"] = filter.types);
    (filter?.shapes?.length) && (filter.shapes.length !== 0) && (modelFilter["shape"] = filter.shapes);
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
    includeHidden && (modelFilter["hidden"] = includeHidden);

    return GlassesModel.find(modelFilter);
}

const rootRouter: Router = Router();

rootRouter.use(express.json());

rootRouter.get("/", async (req: Request, res: Response) => {
    const startIndex = 0;
    const initialMaxProductCount = 64
    const glasses = await getProducts({}, false);
    res.render("./root", {title: "Home", glasses, startIndex, initialMaxProductCount});
});

rootRouter.post("/products", async (req: Request, res: Response) => {
    const filter = req.body;
    const startIndex = filter.startIndex;
    const initialMaxProductCount = 64;
    const glasses = await getProducts(filter, false);
    console.log(glasses)
    res.render("./partials/productListings", {glasses, startIndex, initialMaxProductCount},
        (err: Error, html: string) => {
            res.status(200).send(JSON.stringify({
                html,
                totalProductCount: glasses.length,
                responseProductCount: (glasses.length - startIndex < initialMaxProductCount ? glasses.length - startIndex : initialMaxProductCount)
            }));
        });
})

rootRouter.get("/contact", (req: Request, res: Response) => {
    res.render("./contact", {title: "Contact"});
});

export {rootRouter};