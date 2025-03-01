import { Transform } from "node:stream";
import levels from "./levels.js";
import chalk from "chalk";

class LogTransformer extends Transform {
    constructor() {
        super({ objectMode: true });
    }

    _transform(log, encoding, callback) {
        const timestamp = new Date().toISOString();
        let coloredMessage;

        switch (log.type) {
            case levels.INFO:
                coloredMessage = chalk.blue(`[${timestamp}] INFO: ${log.message}`);
                break;
            case levels.WARNING:
                coloredMessage = chalk.yellow(`[${timestamp}] WARNING: ${log.message}`);
                break;
            case levels.ERROR:
                coloredMessage = chalk.red(`[${timestamp}] ERROR: ${log.message}`);
                break;
            default:
                coloredMessage = chalk.gray(`[${timestamp}] UNKNOWN: ${log.message}`);
        }

        this.push(`${coloredMessage}\n`);
        callback();
    }
}

export default LogTransformer;
