import { Writable } from "node:stream";
import path from "node:path";
import fs from "node:fs";
//
import LogTransformer from "./logTransformer.js";
import logEmitter from "./logEmitter.js";

class Logger {
    constructor(logPath = "logs/app.log") {
        this.logPath = logPath;
        this._ensureLogDirectory();
        this._setupStreams();
        this._setupEventListeners();
    }

    _ensureLogDirectory() {
        const logDir = path.dirname(this.logPath);
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
    }

    _setupStreams() {
        this.logStream = fs.createWriteStream(this.logPath, { flags: "a" });
        this.transformer = new LogTransformer();

        this.consoleStream = new Writable({
            write: (chunk, encoding, callback) => {
                process.stdout.write(chunk);
                callback();
            }
        });

        this.transformer.pipe(this.consoleStream);
        this.transformer.pipe(this.logStream);
    }

    _setupEventListeners() {
        logEmitter.on("log", (log) => {
            this.transformer.write(log);
        });
    }

    _log(type, message) {
        logEmitter.emit("log", { message, type });
    }

    info(message) {
        this._log("info", message);
    }

    warning(message) {
        this._log("warning", message);
    }

    /**
     * @param {string | Error} err
     */
    error(err) {
        const errorMessage = err instanceof Error ? `${err.message}\nStack: ${err.stack}` : err;
        this._log("error", errorMessage);
    }
}

export default Logger;
