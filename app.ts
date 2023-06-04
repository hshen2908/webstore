import {MongoDatabase} from "./model/MongoDatabase";
import {IDatabase} from "./model/IDatabase";
import {Server} from "./controller/Server";
import {StoreServer} from "./controller/StoreServer";

require("./model/Product");
require("./model/Glasses");

require("dotenv").config();

let serverPort: number = process.env.PORT;

export class App {
    private server: Server;
    private database: IDatabase;

    constructor(serverPort: number) {
        this.server = new StoreServer(serverPort);
        this.database = new MongoDatabase(process.env.MONGODBURI);
    }

    async start(): Promise<void> {
        this.server.start();
        await this.database.connect();
    }

    async stop(): Promise<void> {
        await this.server.stop();
        await this.database.disconnect();
    }
}

const app = new App(serverPort);
app.start().then(() => {
    process.on("SIGINT", async () => await app.stop());
    process.on("SIGTERM", async () => await app.stop());
});