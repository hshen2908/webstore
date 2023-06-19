import {ErrorRequestHandler, Express, NextFunction, Request, RequestHandler, Response, Router} from "express";
import * as http from "http";
import {ServerLogger} from "../logging/ServerLogger";

const HttpTerminator = require("lil-http-terminator");
const express = require("express");
const path = require("path");
const defaultErrorHandler: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).render("./root/pageNotFound", {title: "404 Not Found"});
}

export abstract class Server {
    protected readonly port: number;
    protected readonly viewEngine: string;
    protected app: Express;
    protected httpServer: http.Server;
    protected logger: ServerLogger;
    private httpTerminator;

    constructor(port: number, enableLogging: boolean, logPath: string = "./logs",
                viewEngine: string = "ejs",
                notFoundHandler: RequestHandler = defaultErrorHandler,
                errorHandler?: ErrorRequestHandler) {
        this.app = express();
        this.port = port;
        process.env.USE_PROXY && this.app.set("trust proxy", "loopback");
        this.app.set("views", path.join(__dirname, "..", "views"));
        this.viewEngine = viewEngine;
        this.app.set("view engine", viewEngine);
        this.app.set("view options", {filename: true});
        this.app.use(express.static(path.join(__dirname, "..", "static", "public")));
        this.initServer();
        enableLogging && (this.logger = new ServerLogger(this))
        && this.app.use((req: Request, res: Response, next: NextFunction) => this.logger.logRequest(req, res, next))
        && this.app.use((err: any, req: Request, res: Response, next: NextFunction) => this.logger.logRequestError(err, req, res, next))
        this.app.use(defaultErrorHandler);
    }

    start(onListen?: () => void, onError?: (err: Error) => void): void {
        this.httpServer = this.app.listen(this.port, "0.0.0.0", () => {
            this.logger.logServerStart();
            onListen && onListen();
        }).on("error", (err: Error) => {
            this.logger.error("Error Starting Server");
            onError && onError(err);
        });
        this.httpTerminator = HttpTerminator({server: this.httpServer});
    }

    async stop(onClose?: (err) => void): Promise<void> {
        const {success, code, message, err} = await this.httpTerminator.terminate();
        if (!success) {
            if (code === "TIMED_OUT") this.logger.error(`Error Closing Server - ${message}`);
            if (code === "SERVER_ERROR") this.logger.error(`Error Closing Server - ${message}; ${err}`);
            if (code === "INTERNAL_ERROR") this.logger.error(`Error Closing Server - ${message}; ${err}`);
        } else {
            this.logger.logServerStop();
        }
        onClose && onClose(err);
    }

    abstract initServer();

    registerRouter(route: string, router: Router): void {
        this.app.use(route, router);
    }

    getPort(): number {
        return this.port;
    }
}