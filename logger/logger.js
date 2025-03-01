import fs from "node:fs"
import path from "node:path"
import levels from "./levels.js"
import formatMessage from "./formatter.js"

class Logger {

    constructor(logPath = 'logs/app.log') {
        this.logPath = logPath

        const logDir = path.dirname(this.logPath);
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
    }

    __log(level, msg) {
        let formattedMsg;

        if (msg instanceof Error) {
            formattedMsg = formatMessage(
                level,
                `${msg.toString()}\nStack: ${msg.stack}`
            );
        } else {
            formattedMsg = formatMessage(level, msg);
        }

        if (process.env.APP_ENV === "local") {
            console.log(formattedMsg);
        } else {
            fs.appendFile(this.logPath, `${formattedMsg}\n`, (err) => {
                if (err) {
                    console.error("Error while trying to write to file:", err.message);
                }
            });
        }
    }

    info(msg) {
        this.__log(levels.INFO, msg);
    }

    warning(msg) {
        this.__log(levels.WARNING, msg);
    }

    error(err) {
        this.__log(levels.ERROR, err);
    }
}

export default Logger;
