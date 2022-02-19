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
const order_service_1 = __importDefault(require("../services/order-service"));
class OrderController {
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageSize = Number(req.query.pageSize), currentPage = Number(req.query.currentPage);
            const totalItems = yield order_service_1.default.count();
            const paginatedList = {
                pageSize, currentPage,
                totalPages: Math.ceil(totalItems / pageSize),
                totalItems,
                contentList: yield order_service_1.default.list(currentPage, pageSize)
            };
            res.send(paginatedList);
        });
    }
    static findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            res.send(yield order_service_1.default.findById(Number(id)));
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let bodyData = (0, express_validator_1.matchedData)(req, { locations: ['body'] }); // Get only validated params
            const { user_id } = req.body;
            const order = yield order_service_1.default.create(user_id);
            res.status(http_status_codes_1.StatusCodes.CREATED).send(order);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const order = yield order_service_1.default.findById(Number(id));
            res.send(yield order_service_1.default.delete(order.id));
        });
    }
    static setComplete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            res.send(yield order_service_1.default.updateStatusToComplete(Number(id)));
        });
    }
    static showCompleteByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = req.body;
            res.send(yield order_service_1.default.findCompleteByUserId(Number(user_id)));
        });
    }
    static findCurrentByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = req.body;
            res.send(yield order_service_1.default.findCurrentByUserId(Number(user_id)));
        });
    }
}
exports.default = OrderController;
