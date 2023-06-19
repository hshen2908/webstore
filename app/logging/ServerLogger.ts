import {Logger} from "./Logger";
import {NextFunction, Request, Response} from "express";
import {Server} from "../controller/Server";

export class ServerLogger extends Logger {
    private server: Server;
    private loggingEnabled: boolean;

    constructor(server: Server, enableLogging: boolean) {
        super();
        this.server = server;
        this.loggingEnabled = enableLogging;
    }

    logServerStart() {
        this.loggingEnabled && this.info(`Server Started on port ${this.server.getPort()}`);
    }

    logServerStop() {
        this.loggingEnabled && this.info("Server Stopped Successfully");
    }

    logRequest(req: Request, res: Response, next: NextFunction) {
        this.loggingEnabled && this.info(`${req.method} ${req.originalUrl} ${req.ip}`);
        next();
    }

    logRequestError(err: any, req: Request, res: Response, next: NextFunction) {
        this.loggingEnabled && this.error(`${req.method} ${req.originalUrl} ${req.ip}`);
        next(err);
    }
}