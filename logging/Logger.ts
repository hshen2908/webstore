const pino = require("pino")


export class Logger {
    protected readonly logPath: string;
    protected pinoLogger;

    constructor(logPath: string = "./logs") {
        const transport = pino.transport({
            targets: [
                {
                    level: 'trace',
                    target: 'pino/file',
                    options: {
                        destination: logPath, mkdir: true
                    },
                },
                {
                    level: 'trace',
                    target: 'pino-pretty',
                    options: {destination: 1},
                },
            ],
        })
        this.pinoLogger = pino(transport);
    }

    info(message: string) {
        this.pinoLogger.info(message);
    }

    debug(message: string) {
        this.pinoLogger.debug(message);
    }

    trace(message: string) {
        this.pinoLogger.trace(message);
    }

    error(message: string) {
        this.pinoLogger.error(message);
    }
}
