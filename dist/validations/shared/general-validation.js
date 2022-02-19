"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idParamChain = exports.paginatedListChain = void 0;
const express_validator_1 = require("express-validator");
const validation_middleware_1 = __importDefault(require("../../middlewares/validation-middleware"));
/** CHAINS **/
exports.paginatedListChain = [
    (0, express_validator_1.query)('pageSize').default(10).isInt({ min: 1 }),
    (0, express_validator_1.query)('currentPage').default(0).isInt({ min: 0 })
];
exports.idParamChain = (0, express_validator_1.param)('id').isInt({ min: 1 });
/** VALIDATIONS **/
const GeneralValidation = {
    paginatedList: (0, validation_middleware_1.default)(exports.paginatedListChain),
    onlyIdParam: (0, validation_middleware_1.default)([
        exports.idParamChain
    ])
};
exports.default = GeneralValidation;
