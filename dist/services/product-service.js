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
class ProductService {
    static count() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.products.count({});
        });
    }
    static list(currentPage = 0, pageSize = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.products.findMany({
                skip: pageSize * currentPage,
                take: pageSize
            });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield prisma_1.default.products.findFirst({
                where: {
                    id: Number(id),
                }
            });
            if (!product) {
                throw new http_exceptions_1.NotFoundException(id.toString());
            }
            return product;
        });
    }
    static findByCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield prisma_1.default.products.findMany({
                where: {
                    categoryId: Number(id),
                }
            });
            if (!products) {
                throw new http_exceptions_1.NotFoundException(id.toString());
            }
            return products;
        });
    }
    static create(name, price, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.products.create({
                data: {
                    name,
                    price,
                    categoryId
                }
            });
            return user;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield prisma_1.default.products.delete({
                where: {
                    id: Number(id),
                },
            });
            return product;
        });
    }
}
exports.default = ProductService;
