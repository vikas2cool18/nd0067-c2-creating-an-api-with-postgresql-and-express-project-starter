"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const express_validator_1 = require("express-validator");
const user_service_1 = __importDefault(require("../services/user-service"));
const logger_1 = __importDefault(require("../helpers/logger"));
class UserController {
    static authenticate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`request::::${req.body.first_name}`);
                const token = yield user_service_1.default.authenticate(req.body.first_name, req.body.last_name, req.body.password_digest);
                logger_1.default.info(`token::::${token}
        `);
                res.json(token);
            }
            catch (err) {
                res.status(400);
                res.json(err);
            }
            return "";
        });
    }
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageSize = Number(req.query.pageSize), currentPage = Number(req.query.currentPage);
            const totalItems = yield user_service_1.default.count();
            const paginatedList = {
                pageSize, currentPage,
                totalPages: Math.ceil(totalItems / pageSize),
                totalItems,
                contentList: yield user_service_1.default.list(currentPage, pageSize)
            };
            res.send(paginatedList);
        });
    }
    static findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            res.send(yield user_service_1.default.findById(Number(id)));
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let bodyData = (0, express_validator_1.matchedData)(req, { locations: ['body'] }); // Get only validated params
            const { first_name, last_name, password_digest } = req.body;
            const user = yield user_service_1.default.create(first_name, last_name, password_digest);
            res.status(http_status_codes_1.StatusCodes.CREATED).send(user);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield user_service_1.default.findById(Number(id));
            res.send(yield user_service_1.default.delete(user.id));
        });
    }
}
exports.default = UserController;
