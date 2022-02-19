"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
require("winston-daily-rotate-file");
const environment_1 = __importDefault(require("../environment"));
/**
 * This method set the current severity based on the environment mode:
 * show all the log levels if the server was run in development mode;
 * otherwise, if it was run in production, show info, warn and error messages.
 */
const level = () => {
    return environment_1.default.isProduction() ? 'info' : 'debug';
};
// Change default colors
winston_1.default.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
});
// Set the logging text format
const format = winston_1.default.format.combine(
// Add the message timestamp with the preferred format
winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), 
// Define the format of the message showing the timestamp, the level and the message
winston_1.default.format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`));
// Set the shared DailyRotateFile transport config
const fileConfig = {
    format,
    datePattern: 'YYYY_MM_DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    createSymlink: true
};
// Define which transports the logger must use to print out messages.
const transports = [
    // Allow the use the console to print the colorize messages
    new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(format, winston_1.default.format.colorize({ all: true }))
    }),
    // Allow to print all the error level messages inside the error.log file
    new winston_1.default.transports.DailyRotateFile(Object.assign({ filename: 'logs/errors/errors_%DATE%.log', level: 'error' }, fileConfig)),
    // Allow to print all the error message inside the all.log file
    new winston_1.default.transports.DailyRotateFile(Object.assign({ filename: 'logs/all/all_%DATE%.log' }, fileConfig))
];
const Logger = winston_1.default.createLogger({
    level: level(),
    transports
});
exports.default = Logger;
