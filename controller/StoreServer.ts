import {Server} from "./Server";
import {rootRouter} from "./Root";

export class StoreServer extends Server {
    initRouters() {
        this.registerRouter("/", rootRouter);
    }
}