import {Request, Response, Router} from "express";
import {IGlasses, GlassesModel} from "../model/Glasses";
import {IProduct, ProductModel} from "../model/Product";

const rootRouter: Router = Router();

rootRouter.get("/", async (req: Request, res: Response) => {
    const glasses = await GlassesModel.find({});
    res.render("./root", {title: "Home", glasses});
});

export {rootRouter};