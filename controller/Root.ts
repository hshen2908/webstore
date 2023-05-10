import {Request, Response, Router} from "express";

const rootRouter: Router = Router();

rootRouter.get("/", (req: Request, res: Response) => {
    res.render("./root");
});

export {rootRouter};