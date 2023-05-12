import {Request, Response, Router} from "express";

const adminRouter: Router = Router();

adminRouter.get("/products", async (req: Request, res: Response) => {
    res.render("./admin/products", {title: "Admin Products"});
});

export {adminRouter};