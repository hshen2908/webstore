"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerLogger = void 0;
var Logger_1 = require("./Logger");
var ServerLogger = /** @class */ (function (_super) {
    __extends(ServerLogger, _super);
    function ServerLogger(server) {
        var _this = _super.call(this) || this;
        _this.server = server;
        return _this;
    }
    ServerLogger.prototype.logServerStart = function () {
        this.info("Server Started on port ".concat(this.server.getPort()));
    };
    ServerLogger.prototype.logServerStop = function () {
        this.info("Server Stopped Successfully");
    };
    ServerLogger.prototype.logRequest = function (req, res, next) {
        this.info("".concat(req.method, " ").concat(req.originalUrl, " ").concat(req.ip));
        next();
    };
    ServerLogger.prototype.logRequestError = function (err, req, res, next) {
        this.error("".concat(req.method, " ").concat(req.originalUrl, " ").concat(req.ip));
        next(err);
    };
    return ServerLogger;
}(Logger_1.Logger));
exports.ServerLogger = ServerLogger;
