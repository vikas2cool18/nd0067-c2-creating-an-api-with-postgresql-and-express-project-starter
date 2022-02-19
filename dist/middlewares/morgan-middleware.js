"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("../helpers/logger"));
const environment_1 = __importDefault(require("../environment"));
// Override the stream method by telling Morgan to use the custom logger instead of the console.log.
const stream = {
    // Use the http severity
    write: (message) => logger_1.default.http(message),
};
// Skip all the Morgan http log if the application is not running in development mode.
const skip = () => {
    return environment_1.default.isProduction();
};
// Build the morgan middleware
const morganMiddleware = (0, morgan_1.default)(':response-time ms - [:status] :method :url', // Define message format string
{ stream, skip } // Overwrote the stream and the skip logic.
);
exports.default = morganMiddleware;
