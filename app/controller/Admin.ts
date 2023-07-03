import express, {Handler, NextFunction, Request, Response, Router} from "express";
import path from "path";
import cloudinary from "cloudinary";
import {getProducts, GlassesModel} from "../model/Glasses";
import {requiresAuth} from "express-openid-connect";
import {InsufficientScopeError, Manager} from "../model/Manager";

require("dotenv").config();

const defaultScopes = ["view:admin-dashboard"];
const checkScopes = (addDefaultScopes: boolean, scopes?: string | string[]): Handler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const initialScopes = addDefaultScopes ? defaultScopes : [];
        const scopesToCheck = (scopes ? initialScopes.concat(scopes) : initialScopes);
        const authorized = await Manager.checkUserScopes(res.locals.user, scopesToCheck);
        if (!authorized) {
            return next(new InsufficientScopeError(scopesToCheck));
        }
        next();
    }
}

const adminRouter: Router = Router();

adminRouter.use(express.static(path.join(__dirname, "..", "static", "admin")));
adminRouter.use(express.json());

adminRouter.use(requiresAuth());

adminRouter.get("/", checkScopes(true),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.redirect("/admin/activity");
            // res.render("./admin/root", {title: "Admin Dashboard"});
        } catch (err) {
            next(err);
        }
    });

adminRouter.get("/activity", checkScopes(true), async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render("./admin/dashboard", {title: "Activity", panelPath: "activity"});
    } catch (err) {
        next(err);
    }
});

adminRouter.get("/products", checkScopes(true, "create:product"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const startIndex = 0;
        const initialMaxProductCount = 6//64;
        const glasses = await getProducts({}, true);
        res.render("./admin/dashboard", {
            title: "Manage Products",
            panelPath: "products",
            glasses,
            startIndex,
            initialMaxProductCount
        });
    } catch (err) {
        next(err);
    }
});

adminRouter.post("/products", checkScopes(true, "create:product"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filter = req.body;
        const startIndex = filter.startIndex;
        const initialMaxProductCount = 64;
        const glasses = await getProducts(filter, false);
        res.render("./admin/partials/productsTableListings", {glasses, startIndex, initialMaxProductCount},
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

adminRouter.post("/product", checkScopes(false, "create:product"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.newProductData && req.body.productsRequest) {
            const newProductData = req.body.newProductData;
            const productsRequest = req.body.productsRequest;
            const newGlasses = await GlassesModel.create(newProductData);
            await newGlasses.save();
            const startIndex = productsRequest.startIndex;
            const initialMaxProductCount = 64;
            const glasses = await getProducts(productsRequest, true);
            res.render("./admin/partials/productsTableListings", {glasses, startIndex, initialMaxProductCount},
                (err: Error, html: string) => {
                    if (err) return next(err);
                    res.status(200).send(JSON.stringify({
                        html,
                        totalProductCount: glasses.length,
                        responseProductCount: (glasses.length - startIndex < initialMaxProductCount ? glasses.length - startIndex : initialMaxProductCount)
                    }));
                });
        } else {
            next(new Error());
        }
    } catch (err) {
        next(err);
    }
});

adminRouter.delete("/product", checkScopes(false, "delete:product"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.productToDeleteId && req.body.productsRequest) {
            const productToDeleteId = req.body.productToDeleteId;
            await GlassesModel.deleteOne({"_id": productToDeleteId});
            const productsRequest = req.body.productsRequest;
            const startIndex = productsRequest.startIndex;
            const initialMaxProductCount = 64;
            const glasses = await getProducts(productsRequest, true);
            res.render("./admin/partials/productsTableListings", {glasses, startIndex, initialMaxProductCount},
                (err: Error, html: string) => {
                    if (err) return next(err);
                    res.status(200).send(JSON.stringify({
                        html,
                        totalProductCount: glasses.length,
                        responseProductCount: (glasses.length - startIndex < initialMaxProductCount ? glasses.length - startIndex : initialMaxProductCount)
                    }));
                });
        } else {
            next(new Error());
        }
    } catch (err) {
        next(err);
    }
});

adminRouter.post("/api/upload-signature", checkScopes(false, "create:product"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const uploadSignatureResponse = await getImageUploadSignature();

        res.status(200).send(uploadSignatureResponse);
        res.end();
    } catch (err) {
        next(err);
    }
});

adminRouter.get("/admins", checkScopes(true), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const startIndex = 0;
        const initialMaxAdminCount = 6//64;
        const admins = await Manager.getAdmins();
        const adminsWithRoles = await Promise.all(admins.map(async (admin) => {
            const adminScopes = await Manager.getUserScopes(admin);
            const adminRoles = await Manager.getUserRoles(admin);
            return {...admin, adminScopes, adminRoles};
        }));
        res.render("./admin/dashboard", {
            title: "Manage Admins",
            panelPath: "admins",
            adminsWithRoles,
            startIndex,
            initialMaxAdminCount
        });
    } catch (err) {
        next(err);
    }
});

adminRouter.get("/users", checkScopes(true), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const startIndex = 0;
        const initialMaxUserCount = 6//64;
        const users = await Manager.getUsers();
        res.render("./admin/dashboard", {
            title: "Manage Users",
            panelPath: "users",
            users,
            startIndex,
            initialMaxUserCount
        });
    } catch (err) {
        next(err);
    }
});

adminRouter.get("/settings", checkScopes(true), async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render("./admin/dashboard", {title: "Admin Settings", panelPath: "settings"});
    } catch (err) {
        next(err);
    }
});

async function getImageUploadSignature() {
    const timestamp: number = new Date().getTime();
    const apiKey: string = process.env.CLOUDINARY_API_KEY;
    const uploadUrl: string = process.env.CLOUDINARY_UPLOAD_URL;
    const uploadPreset: string = process.env.CLOUDINARY_PRESET;
    const uploadFolder: string = process.env.CLOUDINARY_FOLDER;
    const signature: string = await cloudinary.utils.api_sign_request({
        timestamp: timestamp,
        folder: uploadFolder,
        upload_preset: uploadPreset,
    }, process.env.CLOUDINARY_SECRET);
    return {timestamp, apiKey, uploadUrl, uploadPreset, uploadFolder, signature};
}

export {adminRouter};