import express, {Handler, NextFunction, Request, Response, Router} from "express";
import path from "path";
import cloudinary from "cloudinary";
import {GlassesModel} from "../model/Glasses";
import {requiresAuth} from "express-openid-connect";
import {auth as jwtAuth, requiredScopes} from "express-oauth2-jwt-bearer";

require("dotenv").config();
const axios = require("axios").default;

const checkJwt = jwtAuth({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.APPLICATION_ISSUER_BASE_URL,
});

const defaultScopes = ["view:admin-dashboard"];
const checkScopes = (scopes?: string | string[]): Handler => {
    return requiredScopes((scopes ? defaultScopes.concat(scopes) : defaultScopes));
}

const adminRouter: Router = Router();

adminRouter.use(express.static(path.join(__dirname, "..", "static", "admin")));
adminRouter.use(express.json());

adminRouter.use(requiresAuth());

adminRouter.use(async (req: Request, res: Response, next: NextFunction) => {
    const options = {
        method: 'POST',
        url: `${process.env.APPLICATION_ISSUER_BASE_URL}/oauth/token`,
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.APPLICATION_CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            audience: process.env.AUDIENCE
        })
    };
    try {
        const response = await axios.request(options);
        req.headers.authorization = `${response.data.token_type} ${response.data.access_token}`
    } catch (err) {
        next(err);
    }
    next()
});

adminRouter.get("/", checkJwt, checkScopes(),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.render("./admin/root", {title: "Admin Dashboard"});
        } catch (err) {
            next(err);
        }
    });

adminRouter.get("/activity", checkJwt, checkScopes(), async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render("./admin/dashboard", {title: "Activity", panelPath: "activity"});
    } catch (err) {
        next(err);
    }
});

adminRouter.get("/products", checkJwt, checkScopes("create:product"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render("./admin/dashboard", {title: "Manage Products", panelPath: "products"});
    } catch (err) {
        next(err);
    }
});

adminRouter.post("/products", checkJwt, requiredScopes("create:product"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newGlasses = await GlassesModel.create(req.body);
        await newGlasses.save();
        res.status(200).send("{}");
    } catch (err) {
        next(err);
    }
});

adminRouter.post("/api/upload-signature", checkJwt, requiredScopes("create:product"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const uploadSignatureResponse = await getImageUploadSignature();

        res.status(200).send(uploadSignatureResponse);
        res.end();
    } catch (err) {
        next(err);
    }
});

adminRouter.get("/admins", checkJwt, checkScopes(), async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render("./admin/dashboard", {title: "Manage Admins", panelPath: "admins"});
    } catch (err) {
        next(err);
    }
});

adminRouter.get("/users", checkJwt, checkScopes(), async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render("./admin/dashboard", {title: "Manage Users", panelPath: "users"});
    } catch (err) {
        next(err);
    }
});

adminRouter.get("/settings", checkJwt, checkScopes(), async (req: Request, res: Response, next: NextFunction) => {
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