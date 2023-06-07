import {Logger} from "./Logger";
import {NextFunction, Request, Response} from "express";
import {Server} from "../controller/Server";

export class ServerLogger extends Logger {
    private server: Server;

    constructor(server: Server) {
        super();
        this.server = server;
    }

    logServerStart() {
        this.info(`Server Started on port ${this.server.getPort()}`);
    }

    logServerStop() {
        this.info("Server Stopped Successfully");
    }

    logRequest(req: Request, res: Response, next: NextFunction) {
        this.info(`${req.method} ${req.originalUrl} ${req.ip}`);
        next();
    }

    logRequestError(err: any, req: Request, res: Response, next: NextFunction) {
        this.error(`${req.method} ${req.originalUrl} ${req.ip}`);
        next(err);
    }
}