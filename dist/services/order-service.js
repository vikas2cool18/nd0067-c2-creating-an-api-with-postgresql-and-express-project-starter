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
const prisma_1 = __importDefault(require("../helpers/prisma"));
const http_exceptions_1 = require("../exceptions/http-exceptions");
class OrderService {
    static count() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.orders.count({});
        });
    }
    static list(currentPage = 0, pageSize = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.orders.findMany({
                skip: pageSize * currentPage,
                take: pageSize
            });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield prisma_1.default.orders.findFirst({
                where: {
                    id: Number(id),
                }
            });
            if (!order) {
                throw new http_exceptions_1.NotFoundException(id.toString());
            }
            return order;
        });
    }
    static findCurrentByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield prisma_1.default.orders.findFirst({
                where: {
                    user_id: Number(user_id),
                    status: 'active'
                }
            });
            if (!order) {
                throw new http_exceptions_1.NotFoundException(user_id.toString());
            }
            return order;
        });
    }
    static findCompleteByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield prisma_1.default.orders.findMany({
                where: {
                    user_id: Number(user_id),
                    status: 'complete'
                }
            });
            if (!order) {
                throw new http_exceptions_1.NotFoundException(user_id.toString());
            }
            return order;
        });
    }
    static create(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield prisma_1.default.orders.create({
                data: {
                    user_id,
                    status: 'active'
                }
            });
            return category;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield prisma_1.default.orders.delete({
                where: {
                    id: Number(id),
                },
            });
            return category;
        });
    }
    static updateStatusToComplete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = prisma_1.default.orders.update({
                where: {
                    id: Number(id),
                },
                data: {
                    status: 'complete'
                },
            });
            return order;
        });
    }
}
exports.default = OrderService;
