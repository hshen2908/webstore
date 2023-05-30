import express, {Request, Response, Router} from "express";
import path from "path";
import cloudinary from "cloudinary";
import {GlassesModel} from "../model/Glasses";
import {requiresAuth} from "express-openid-connect";

const adminRouter: Router = Router();


adminRouter.use(express.static(path.join(__dirname, "..", "static", "admin")));
adminRouter.use(express.json());

adminRouter.use(requiresAuth());

adminRouter.get("/products", async (req: Request, res: Response) => {
    res.render("./admin/products", {title: "Admin Products"});
});

adminRouter.post("/products", async (req: Request, res: Response) => {
    const newGlasses = await GlassesModel.create(req.body);
    await newGlasses.save();
    res.status(200).send("{}");
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

adminRouter.post("/api/upload-signature", async (req: Request, res: Response) => {
    const uploadSignatureResponse = await getImageUploadSignature();

    res.status(200).send(uploadSignatureResponse);
    res.end();
});

export {adminRouter};