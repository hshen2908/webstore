import {IDatabase} from "./IDatabase";
import {DatabaseLogger} from "../logging/DatabaseLogger";

const mongoose = require("mongoose");

export class MongoDatabase implements IDatabase {
    readonly uri: string;
    protected logger: DatabaseLogger;

    constructor(uri: string) {
        this.uri = uri;
        this.logger = new DatabaseLogger(this);
    }

    async connect(onOpen?: () => void, onError?: () => void): Promise<void> {
        onOpen && mongoose.connection.on('open', onOpen);
        onError && mongoose.connection.on('error', onError);
        mongoose.connection.on('error', () => this.logger.info("Error when connecting to Database"));
        await mongoose.connect(this.uri);
        this.logger.logDatabaseStart();
    }

    async disconnect(onClose?: () => void, onError?: () => void): Promise<void> {
        onClose && mongoose.connection.on('close', onClose);
        onError && mongoose.connection.on('error', onError);
        mongoose.connection.on('error', () => this.logger.error("Error when disconnecting from Database"));
        await mongoose.disconnect();
        this.logger.logDatabaseStop();
    }
}