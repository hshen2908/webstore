import {Logger} from "./Logger";
import {NextFunction, Request, Response} from "express";

export class ServerLogger extends Logger {
    async logRequest(req: Request, res: Response, next: NextFunction) {
        await this.pinoLogger.info(`${req.method} ${req.originalUrl} ${req.ip}`);
        next();
    }

    logRequestError(err, req, res, next) {

    }
}