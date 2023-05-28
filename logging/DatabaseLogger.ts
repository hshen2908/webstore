import {Logger} from "./Logger";
import {IDatabase} from "../model/IDatabase";

export class DatabaseLogger extends Logger {
    private database: IDatabase;

    constructor(database: IDatabase) {
        super();
        this.database = database;
    }

    logDatabaseStart() {
        this.info(`Database Connected Successfully`);
    }

    logDatabaseStop() {
        this.info("Database Disconnected Successfully");
    }


    logCreate() {
    }

    logSave() {
    }

    logDelete() {

    }
}