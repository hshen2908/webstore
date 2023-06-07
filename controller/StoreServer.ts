import {Server} from "./Server";
import {rootRouter} from "./Root";
import {adminRouter} from "./Admin";
import {auth, requiresAuth} from "express-openid-connect";
import {NextFunction, Request, Response} from "express";

require("dotenv").config();

const auth0Config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH_SECRET,
    baseURL: process.env.APPLICATION_BASE_URL,
    clientID: process.env.APPLICATION_CLIENT_ID,
    issuerBaseURL: process.env.APPLICATION_ISSUER_BASE_URL,
};

export class StoreServer extends Server {
    initServer() {
        // auth router attaches /login, /logout, and /callback routes to the baseURL
        this.app.use(auth(auth0Config));
        // req.isAuthenticated is provided from the auth router
        this.app.use(async (req: Request, res: Response, next: NextFunction) => {
            res.locals.isAuthenticated = req.oidc.isAuthenticated();
            res.locals.user = req.oidc.user;
            res.locals.url = req.url;
            next();
        });
        this.app.get('/profile', requiresAuth(), (req, res) => {
            res.send(JSON.stringify(req.oidc.user));
        });

        this.registerRouter("/", rootRouter);
        this.registerRouter("/admin", adminRouter);
    }
}
