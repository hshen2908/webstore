import {Logger} from "./Logger";
import {IDatabase} from "../model/IDatabase";

export class DatabaseLogger extends Logger {
    private database: IDatabase;
    private loggingEnabled: boolean;

    constructor(database: IDatabase, enableLogging: boolean) {
        super();
        this.database = database;
        this.loggingEnabled = enableLogging;
    }

    logDatabaseStart() {
        this.loggingEnabled && this.info(`Database Connected Successfully`);
    }

    logDatabaseStop() {
        this.loggingEnabled && this.info("Database Disconnected Successfully");
    }


    logCreate() {
    }

    logSave() {
    }

    logDelete() {

    }
}