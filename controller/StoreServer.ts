import {Server} from "./Server";
import {rootRouter} from "./Root";
import {adminRouter} from "./Admin";

export class StoreServer extends Server {
    initRouters() {
        this.registerRouter("/", rootRouter);
        this.registerRouter("/admin", adminRouter);
    }
}