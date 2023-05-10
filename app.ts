import {MongoDatabase} from "./model/MongoDatabase";
import {IDatabase} from "./model/IDatabase";
import {Server} from "./controller/Server";
import {StoreServer} from "./controller/StoreServer";

require("./model/Product");
require("./model/Glasses");

require("dotenv").config();

let serverPort: number = Number.parseInt(process.argv[2]);

export class App {
    private server: Server;
    private database: IDatabase;

    constructor(serverPort: number) {
        this.server = new StoreServer(serverPort);
        this.database = new MongoDatabase(process.env.MONGODBURI);
    }

    async start(): Promise<void> {
        this.server.start();
        await this.database.connect(() => console.info("Connected to Database"), () => console.info("Error when connecting to Database"));
    }

    async stop(): Promise<void> {
        await this.server.stop((err) => console.info(`Server Closed`));
        await this.database.disconnect(() => console.info("Disconnected from Database"), () => console.info("Error when connecting to Database"));
    }
}

const app = new App(serverPort);
app.start().then(() => {
    process.on("SIGINT", async () => await app.stop());
    process.on("SIGTERM", async () => await app.stop());
});