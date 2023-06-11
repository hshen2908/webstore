"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
var express_1 = __importStar(require("express"));
var path_1 = __importDefault(require("path"));
var cloudinary_1 = __importDefault(require("cloudinary"));
var Glasses_1 = require("../model/Glasses");
var express_openid_connect_1 = require("express-openid-connect");
var express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
require("dotenv").config();
var axios = require("axios").default;
var checkJwt = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.APPLICATION_ISSUER_BASE_URL,
});
var defaultScopes = ["view:admin-dashboard"];
var checkScopes = function (scopes) {
    return (0, express_oauth2_jwt_bearer_1.requiredScopes)((scopes ? defaultScopes.concat(scopes) : defaultScopes));
};
var adminRouter = (0, express_1.Router)();
exports.adminRouter = adminRouter;
adminRouter.use(express_1.default.static(path_1.default.join(__dirname, "..", "static", "admin")));
adminRouter.use(express_1.default.json());
adminRouter.use((0, express_openid_connect_1.requiresAuth)());
adminRouter.use(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var options, response, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options = {
                    method: 'POST',
                    url: "".concat(process.env.APPLICATION_ISSUER_BASE_URL, "/oauth/token"),
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    data: new URLSearchParams({
                        grant_type: 'client_credentials',
                        client_id: process.env.APPLICATION_CLIENT_ID,
                        client_secret: process.env.CLIENT_SECRET,
                        audience: process.env.AUDIENCE
                    })
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios.request(options)];
            case 2:
                response = _a.sent();
                req.headers.authorization = "".concat(response.data.token_type, " ").concat(response.data.access_token);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 4];
            case 4:
                next();
                return [2 /*return*/];
        }
    });
}); });
adminRouter.get("/", checkJwt, checkScopes(), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.render("./admin/root", { title: "Admin Dashboard" });
        }
        catch (err) {
            next(err);
        }
        return [2 /*return*/];
    });
}); });
adminRouter.get("/activity", checkJwt, checkScopes(), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.render("./admin/dashboard", { title: "Activity", panelPath: "activity" });
        }
        catch (err) {
            next(err);
        }
        return [2 /*return*/];
    });
}); });
adminRouter.get("/products", checkJwt, checkScopes("create:product"), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var startIndex, initialMaxProductCount, glasses, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                startIndex = 0;
                initialMaxProductCount = 64;
                return [4 /*yield*/, (0, Glasses_1.getProducts)({}, true)];
            case 1:
                glasses = _a.sent();
                res.render("./admin/dashboard", {
                    title: "Manage Products",
                    panelPath: "products",
                    glasses: glasses,
                    startIndex: startIndex,
                    initialMaxProductCount: initialMaxProductCount
                });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
adminRouter.post("/products", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var filter, startIndex_1, initialMaxProductCount_1, glasses_1, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                filter = req.body;
                startIndex_1 = filter.startIndex;
                initialMaxProductCount_1 = 64;
                return [4 /*yield*/, (0, Glasses_1.getProducts)(filter, false)];
            case 1:
                glasses_1 = _a.sent();
                res.render("./admin/partials/productsTableListings", { glasses: glasses_1, startIndex: startIndex_1, initialMaxProductCount: initialMaxProductCount_1 }, function (err, html) {
                    if (err)
                        return next(err);
                    res.status(200).send(JSON.stringify({
                        html: html,
                        totalProductCount: glasses_1.length,
                        responseProductCount: (glasses_1.length - startIndex_1 < initialMaxProductCount_1 ? glasses_1.length - startIndex_1 : initialMaxProductCount_1)
                    }));
                });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                next(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
adminRouter.post("/product", checkJwt, (0, express_oauth2_jwt_bearer_1.requiredScopes)("create:product"), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var newProductData, productsRequest, newGlasses, startIndex_2, initialMaxProductCount_2, glasses_2, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                if (!(req.body.newProductData && req.body.productsRequest)) return [3 /*break*/, 4];
                newProductData = req.body.newProductData;
                productsRequest = req.body.productsRequest;
                return [4 /*yield*/, Glasses_1.GlassesModel.create(newProductData)];
            case 1:
                newGlasses = _a.sent();
                return [4 /*yield*/, newGlasses.save()];
            case 2:
                _a.sent();
                startIndex_2 = productsRequest.startIndex;
                initialMaxProductCount_2 = 64;
                return [4 /*yield*/, (0, Glasses_1.getProducts)({}, true)];
            case 3:
                glasses_2 = _a.sent();
                res.render("./admin/partials/productsTableListings", { glasses: glasses_2, startIndex: startIndex_2, initialMaxProductCount: initialMaxProductCount_2 }, function (err, html) {
                    if (err)
                        return next(err);
                    res.status(200).send(JSON.stringify({
                        html: html,
                        totalProductCount: glasses_2.length,
                        responseProductCount: (glasses_2.length - startIndex_2 < initialMaxProductCount_2 ? glasses_2.length - startIndex_2 : initialMaxProductCount_2)
                    }));
                });
                return [3 /*break*/, 5];
            case 4:
                next(new Error());
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_4 = _a.sent();
                next(err_4);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
adminRouter.post("/api/upload-signature", checkJwt, (0, express_oauth2_jwt_bearer_1.requiredScopes)("create:product"), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var uploadSignatureResponse, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getImageUploadSignature()];
            case 1:
                uploadSignatureResponse = _a.sent();
                res.status(200).send(uploadSignatureResponse);
                res.end();
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                next(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
adminRouter.get("/admins", checkJwt, checkScopes(), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.render("./admin/dashboard", { title: "Manage Admins", panelPath: "admins" });
        }
        catch (err) {
            next(err);
        }
        return [2 /*return*/];
    });
}); });
adminRouter.get("/users", checkJwt, checkScopes(), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.render("./admin/dashboard", { title: "Manage Users", panelPath: "users" });
        }
        catch (err) {
            next(err);
        }
        return [2 /*return*/];
    });
}); });
adminRouter.get("/settings", checkJwt, checkScopes(), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.render("./admin/dashboard", { title: "Admin Settings", panelPath: "settings" });
        }
        catch (err) {
            next(err);
        }
        return [2 /*return*/];
    });
}); });
function getImageUploadSignature() {
    return __awaiter(this, void 0, void 0, function () {
        var timestamp, apiKey, uploadUrl, uploadPreset, uploadFolder, signature;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timestamp = new Date().getTime();
                    apiKey = process.env.CLOUDINARY_API_KEY;
                    uploadUrl = process.env.CLOUDINARY_UPLOAD_URL;
                    uploadPreset = process.env.CLOUDINARY_PRESET;
                    uploadFolder = process.env.CLOUDINARY_FOLDER;
                    return [4 /*yield*/, cloudinary_1.default.utils.api_sign_request({
                            timestamp: timestamp,
                            folder: uploadFolder,
                            upload_preset: uploadPreset,
                        }, process.env.CLOUDINARY_SECRET)];
                case 1:
                    signature = _a.sent();
                    return [2 /*return*/, { timestamp: timestamp, apiKey: apiKey, uploadUrl: uploadUrl, uploadPreset: uploadPreset, uploadFolder: uploadFolder, signature: signature }];
            }
        });
    });
}
