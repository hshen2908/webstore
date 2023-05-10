import {IDatabase} from "./IDatabase";

const mongoose = require("mongoose");

export class MongoDatabase implements IDatabase {
    readonly uri: string;

    constructor(uri: string) {
        this.uri = uri;
    }

    async connect(onOpen: () => void, onError: () => void): Promise<void> {
        mongoose.connection.on('open', onOpen);
        mongoose.connection.on('error', onError);
        await mongoose.connect(this.uri);
    }

    async disconnect(onClose: () => void, onError: () => void): Promise<void> {
        mongoose.connection.on('close', onClose);
        mongoose.connection.on('error', onError);
        await mongoose.disconnect();
    }
}