"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../helpers/logger"));
const http_status_codes_1 = require("http-status-codes");
const http_exceptions_1 = __importStar(require("../exceptions/http-exceptions"));
/**
 * Handle and catch the HttpException
 * Log the exception and sends `StatusMessage` type responses with the correct code
 * @param err the HttpException error
 * @param req the Request
 * @param res the Response
 * @param _ the NextFunction
 */
function httpErrorMiddleware(err, req, res, _) {
    const status = err.status;
    const message = err.uiMessage;
    const errors = err instanceof http_exceptions_1.BadRequestException ? err.errors : undefined;
    const logMessage = `[${status}] ${req.method} ${req.path} -> ${err.message || err.uiMessage}`;
    switch (err.constructor) {
        case http_exceptions_1.BadRequestException:
            logger_1.default.warn(logMessage + ` ${JSON.stringify(errors)}`);
            break;
        case http_exceptions_1.ForbiddenException:
        case http_exceptions_1.UnauthorizedException:
            logger_1.default.warn(logMessage);
            break;
        case http_exceptions_1.InternalServerErrorException:
            logger_1.default.error(logMessage);
            break;
        default:
            logger_1.default.info(logMessage);
    }
    const response = { status, message, errors };
    res.status(status).send(response);
}
/**
 * Handle and catch all Error
 * Log the exception and sends `StatusMessage` type responses with the correct code
 * @param err the error
 * @param req the Request
 * @param res the Response
 * @param next the NextFunction
 */
function errorMiddleware(err, req, res, next) {
    if (err instanceof http_exceptions_1.default) {
        return httpErrorMiddleware(err, req, res, next);
    }
    // @ts-ignore
    if (err instanceof SyntaxError && err.status === 400) {
        return httpErrorMiddleware(new http_exceptions_1.BadRequestException([{
                msg: err.message,
                // @ts-ignore
                value: ('body' in err) ? err.body : '',
                param: 'body',
                location: 'body'
            }]), req, res, next);
    }
    logger_1.default.error(`[500] ${req.method} ${req.path} -> ${err.stack}`);
    const response = { status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, message: 'Something went wrong' };
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send(response);
}
exports.default = errorMiddleware;
