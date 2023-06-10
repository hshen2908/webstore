"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
var ServerLogger_1 = require("../logging/ServerLogger");
var HttpTerminator = require("lil-http-terminator");
var express = require("express");
var path = require("path");
var defaultErrorHandler = function (req, res, next) {
    res.status(404).render("./root/pageNotFound", { title: "404 Not Found" });
};
var Server = /** @class */ (function () {
    function Server(port, viewEngine, notFoundHandler, errorHandler, enableLogging, logPath) {
        if (viewEngine === void 0) { viewEngine = "ejs"; }
        if (notFoundHandler === void 0) { notFoundHandler = defaultErrorHandler; }
        if (enableLogging === void 0) { enableLogging = true; }
        if (logPath === void 0) { logPath = "./logs"; }
        var _this = this;
        this.app = express();
        this.port = port;
        this.app.set("views", path.join(__dirname, "..", "views"));
        this.viewEngine = viewEngine;
        this.app.set("view engine", viewEngine);
        this.app.set("view options", { filename: true });
        this.app.use(express.static(path.join(__dirname, "..", "static", "public")));
        this.initServer();
        enableLogging && (this.logger = new ServerLogger_1.ServerLogger(this))
            && this.app.use(function (req, res, next) { return _this.logger.logRequest(req, res, next); })
            && this.app.use(function (err, req, res, next) { return _this.logger.logRequestError(err, req, res, next); });
        this.app.use(defaultErrorHandler);
    }
    Server.prototype.start = function (onListen, onError) {
        var _this = this;
        this.httpServer = this.app.listen(this.port, function () {
            _this.logger.logServerStart();
            onListen && onListen();
        }).on("error", function (err) {
            _this.logger.error("Error Starting Server");
            onError && onError(err);
        });
        this.httpTerminator = HttpTerminator({ server: this.httpServer });
    };
    Server.prototype.stop = function (onClose) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, success, code, message, err;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.httpTerminator.terminate()];
                    case 1:
                        _a = _b.sent(), success = _a.success, code = _a.code, message = _a.message, err = _a.err;
                        if (!success) {
                            if (code === "TIMED_OUT")
                                this.logger.error("Error Closing Server - ".concat(message));
                            if (code === "SERVER_ERROR")
                                this.logger.error("Error Closing Server - ".concat(message, "; ").concat(err));
                            if (code === "INTERNAL_ERROR")
                                this.logger.error("Error Closing Server - ".concat(message, "; ").concat(err));
                        }
                        else {
                            this.logger.logServerStop();
                        }
                        onClose && onClose(err);
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.registerRouter = function (route, router) {
        this.app.use(route, router);
    };
    Server.prototype.getPort = function () {
        return this.port;
    };
    return Server;
}());
exports.Server = Server;
