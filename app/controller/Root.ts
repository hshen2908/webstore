import express, {NextFunction, Request, Response, Router} from "express";
import {getProducts} from "../model/Glasses";
import {Manager} from "../model/Manager";

const rootRouter: Router = Router();

rootRouter.use(express.json());

rootRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const startIndex = 0;
        const initialMaxProductCount = 6//64;
        const glasses = await getProducts({}, false);
        res.render("./root/root", {
            title: "Home",
            includeAdminDashboardLink: res.locals.user ? await Manager.checkUserScopes(res.locals.user, ["view:admin-dashboard"]) : false,
            glasses, startIndex,
            initialMaxProductCount
        });
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
                if (err) return next(err);
                res.status(200).send(JSON.stringify({
                    html,
                    totalProductCount: glasses.length,
                    responseProductCount: (glasses.length - startIndex < initialMaxProductCount ? glasses.length - startIndex : initialMaxProductCount)
                }));
            });
    } catch (err) {
        next(err);
    }
});

rootRouter.get("/contact", async (req: Request, res: Response) => {
    res.render("./root/contact", {
        title: "Contact",
        includeAdminDashboardLink: res.locals.user ? await Manager.checkUserScopes(res.locals.user, ["view:admin-dashboard"]) : false,
    });
});

export {rootRouter};