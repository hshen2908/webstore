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
exports.DatabaseLogger = void 0;
var Logger_1 = require("./Logger");
var DatabaseLogger = /** @class */ (function (_super) {
    __extends(DatabaseLogger, _super);
    function DatabaseLogger(database) {
        var _this = _super.call(this) || this;
        _this.database = database;
        return _this;
    }
    DatabaseLogger.prototype.logDatabaseStart = function () {
        this.info("Database Connected Successfully");
    };
    DatabaseLogger.prototype.logDatabaseStop = function () {
        this.info("Database Disconnected Successfully");
    };
    DatabaseLogger.prototype.logCreate = function () {
    };
    DatabaseLogger.prototype.logSave = function () {
    };
    DatabaseLogger.prototype.logDelete = function () {
    };
    return DatabaseLogger;
}(Logger_1.Logger));
exports.DatabaseLogger = DatabaseLogger;
