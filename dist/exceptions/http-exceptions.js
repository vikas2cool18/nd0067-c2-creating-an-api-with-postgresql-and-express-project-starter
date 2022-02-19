"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerErrorException = exports.NotFoundException = exports.ForbiddenException = exports.UnauthorizedException = exports.BadRequestException = void 0;
const http_status_codes_1 = require("http-status-codes");
class HttpException extends Error {
    /**
     * The HttpException
     * @param status the status code of error
     * @param uiMessage message to send to the client
     * @param message the internal message error (it is not sent to the client)
     */
    constructor(status, uiMessage, message) {
        super(message);
        this.status = status;
        this.uiMessage = uiMessage;
    }
}
exports.default = HttpException;
/**
 * 400 Bad Request response status code indicates that the server
 * cannot or will not process the request due to something that is perceived
 * to be a client error
 */
class BadRequestException extends HttpException {
    /**
     * The Bad Request Exception
     * @param errors the errors to send to the client
     */
    constructor(errors) {
        super(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Bad Request');
        this.errors = errors;
    }
}
exports.BadRequestException = BadRequestException;
/**
 * 401 Unauthorized client error response code indicates that the request
 * has not been applied because it lacks valid authentication credentials for the target resource.
 */
class UnauthorizedException extends HttpException {
    /**
     * The Unauthorized Exception,
     * To indicate that lacks valid authentication credentials for the target resource.
     * @param message custom message to be sent to the client [default: 'Unauthorized']
     */
    constructor(message) {
        super(http_status_codes_1.StatusCodes.UNAUTHORIZED, message ? message : 'Unauthorized');
    }
}
exports.UnauthorizedException = UnauthorizedException;
/**
 * 403 Forbidden client error response code indicates that the server
 * understood the request but refuses to authorize it.
 */
class ForbiddenException extends HttpException {
    /**
     * The Forbidden Exception,
     * To indicate that the server understood the request but refuses to authorize it.
     * @param message custom message to be sent to the client [default: 'Access denied']
     */
    constructor(message) {
        super(http_status_codes_1.StatusCodes.FORBIDDEN, message ? message : 'Access denied');
    }
}
exports.ForbiddenException = ForbiddenException;
/**
 * 404 Not Found client error response code indicates that the server
 * can't find the requested resource.
 */
class NotFoundException extends HttpException {
    /**
     * The Not Found Exception,
     * To indicate that a resource was not found
     * @param message custom message to be sent to the client or the resource id not found
     * @param isResourceId false if message is a custom message, true if message is the resource id [default: true]
     */
    constructor(message, isResourceId = true) {
        super(http_status_codes_1.StatusCodes.NOT_FOUND, isResourceId ? `Resource with id ${message} not found` : message);
    }
}
exports.NotFoundException = NotFoundException;
/**
 * 500 Internal Server Error server error response code
 * indicates that the server encountered an unexpected condition that
 * prevented it from fulfilling the request.
 */
class InternalServerErrorException extends HttpException {
    /**
     * The Internal Server Error Exception,
     * @param message The error message, will only be saved in the internal log
     */
    constructor(message) {
        super(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong', message);
    }
}
exports.InternalServerErrorException = InternalServerErrorException;
