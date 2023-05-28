import {Server} from "./Server";
import {rootRouter} from "./Root";
import {adminRouter} from "./Admin";
import {auth, requiresAuth} from "express-openid-connect";
import {NextFunction, Request, Response} from "express";

require("dotenv").config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH_SECRET,
    baseURL: 'http://localhost:3000',
    clientID: '9CAuBh7wc3ehHYzymSIfajUw4Lv8X6HW',
    issuerBaseURL: 'https://dev-trtfma77joc55las.us.auth0.com'
};

export class StoreServer extends Server {
    initRouters() {
        // auth router attaches /login, /logout, and /callback routes to the baseURL
        this.app.use(auth(config));
        // req.isAuthenticated is provided from the auth router
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.locals.isAuthenticated = req.oidc.isAuthenticated();
            next();
        });
        this.app.get('/profile', requiresAuth(), (req, res) => {
            res.send(JSON.stringify(req.oidc.user));
        });

        this.registerRouter("/", rootRouter);
        this.registerRouter("/admin", adminRouter);
    }
}