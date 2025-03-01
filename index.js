import Logger from "./logger/logger.js";
import PermissionException from "./exceptions/PermissionException.js";

const logger  = new Logger();

logger.info("Info message");
logger.warning("Warning message");
logger.error("Error message");
logger.error(new Error("Error message"));

console.log("====================================");

logger.error(new PermissionException("Permission denied"));

console.log({
    APP_ENV: process.env['APP_ENV'],
    DB_PASS: process.env['DB_PASS'],
    PID: process.pid,
})

try {
    // ReferenceError
    console.log( a = 5 /0);
} catch (error) {
    logger.error(error);
}

const p = process.env;

setInterval(() => {
    const timestemp = new Date().toISOString();

    logger.info(`${timestemp}`);
}, 10_000);
