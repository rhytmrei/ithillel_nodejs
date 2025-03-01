import { EventEmitter } from "node:events";

class LogEmitter extends EventEmitter {}

const logEmitter = new LogEmitter();

export default logEmitter;
