import fs from "node:fs";
import path from "node:path";
import { EventEmitter } from "node:events";
import levels from "./levels.js";
import formatMessage from "./formatter.js";

class Logger extends EventEmitter {
    constructor(logPath = "logs/app.log") {
        super();
        this.logPath = logPath;

        this._ensureLogDirectory();
        this._setupEventListeners();
    }

    _ensureLogDirectory() {
        const logDir = path.dirname(this.logPath);
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
    }

    _setupEventListeners() {
        this.on("log", async (formattedMsg) => {
            try {
                await fs.promises.appendFile(this.logPath, `${formattedMsg}\n`);
            } catch (err) {
                console.error("Logger Error: Unable to write to log file:", err.message);
            }
        });
    }

    /**
    * @param {string} level
    * @param {string | Error} msg
    */
    _log(level, msg) {
        const formattedMsg = msg instanceof Error
            ? formatMessage(level, `${msg.toString()}\nStack: ${msg.stack}`)
            : formatMessage(level, msg);

        if (process.env.APP_ENV === "local") {
            console.log(formattedMsg);
        } else {
            this.emit("log", formattedMsg);
        }
    }

    info(msg) {
        this._log(levels.INFO, msg);
    }

    warning(msg) {
        this._log(levels.WARNING, msg);
    }

    error(err) {
        this._log(levels.ERROR, err);
    }
}

export default Logger;
