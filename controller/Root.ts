import express, {NextFunction, Request, Response, Router} from "express";
import {GlassesModel} from "../model/Glasses";

function getProducts(filter, includeHidden: boolean): Promise<any> {
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
    includeHidden && (modelFilter["hidden"] = includeHidden);
    console.log(modelFilter)
    return GlassesModel.find(modelFilter);
}

const rootRouter: Router = Router();

rootRouter.use(express.json());

rootRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const startIndex = 0;
        const initialMaxProductCount = 64
        const glasses = await getProducts({}, false);
        res.render("./root/root", {title: "Home", glasses, startIndex, initialMaxProductCount});
    } catch (err) {
        next(err);
    }
});

rootRouter.post("/products", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filter = req.body;
        const startIndex = filter.startIndex;
        const initialMaxProductCount = 64;
        const glasses = await getProducts(filter, false);
        res.render("./root/partials/productListings", {glasses, startIndex, initialMaxProductCount},
            (err: Error, html: string) => {
                err && next(err);
                res.status(200).send(JSON.stringify({
                    html,
                    totalProductCount: glasses.length,
                    responseProductCount: (glasses.length - startIndex < initialMaxProductCount ? glasses.length - startIndex : initialMaxProductCount)
                }));
            });
    } catch (err) {
        next(err);
    }
})

rootRouter.get("/contact", (req: Request, res: Response) => {
    res.render("./root/contact", {title: "Contact"});
});

export {rootRouter};