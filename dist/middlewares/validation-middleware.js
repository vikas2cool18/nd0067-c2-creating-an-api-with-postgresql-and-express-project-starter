"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const http_exceptions_1 = require("../exceptions/http-exceptions");
const logger_1 = __importDefault(require("../helpers/logger"));
/**
 * Validate the input parameters from ValidationChain
 * and sent a BadRequest if parameters are invalid
 * @param chains the ValidationChain
 */
function validationMiddleware(chains) {
    return [
        ...chains,
        (req, res, next) => {
            const { categoryId } = req.params;
            logger_1.default.info(`The categoryId is::::${categoryId}`);
            const errors = (0, express_validator_1.validationResult)(req);
            logger_1.default.info(`Error Message:::::${errors}`);
            if (!errors.isEmpty()) {
                throw new http_exceptions_1.BadRequestException(errors.array());
            }
            next();
        }
    ];
}
exports.default = validationMiddleware;
