"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validation_middleware_1 = __importDefault(require("../middlewares/validation-middleware"));
const general_validation_1 = require("./shared/general-validation");
/** VALIDATIONS **/
const UserValidation = {
    create: (0, validation_middleware_1.default)([
        (0, express_validator_1.body)('first_name').isString(),
        (0, express_validator_1.body)('last_name').isString(),
        (0, express_validator_1.body)('password_digest').isString(),
    ]),
    list: (0, validation_middleware_1.default)([
        general_validation_1.idParamChain,
        (0, express_validator_1.body)('pageSize').isNumeric(),
        (0, express_validator_1.body)('currentPage').isNumeric(),
    ]),
    findById: (0, validation_middleware_1.default)([
        general_validation_1.idParamChain
    ]),
    delete: (0, validation_middleware_1.default)([
        general_validation_1.idParamChain
    ]),
};
exports.default = UserValidation;
