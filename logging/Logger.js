"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var pino = require("pino");
var Logger = /** @class */ (function () {
    function Logger(logPath) {
        if (logPath === void 0) { logPath = "./logs"; }
        var transport = pino.transport({
            targets: [
                {
                    level: 'trace',
                    target: 'pino/file',
                    options: {
                        destination: logPath, mkdir: true
                    },
                },
                {
                    level: 'trace',
                    target: 'pino-pretty',
                    options: { destination: 1 },
                },
            ],
        });
        this.logPath = logPath;
        this.pinoLogger = pino(transport);
    }
    Logger.prototype.info = function (message) {
        this.pinoLogger.info(message);
    };
    Logger.prototype.debug = function (message) {
        this.pinoLogger.debug(message);
    };
    Logger.prototype.trace = function (message) {
        this.pinoLogger.trace(message);
    };
    Logger.prototype.error = function (message) {
        this.pinoLogger.error(message);
    };
    return Logger;
}());
exports.Logger = Logger;
