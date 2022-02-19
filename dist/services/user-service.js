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
const bcrypt_1 = __importDefault(require("bcrypt"));
const { BCRYPT_PEPPER, BCRYPT_SALT_ROUNDS } = process.env;
const saltRounds = BCRYPT_SALT_ROUNDS;
const pepper = BCRYPT_PEPPER;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../helpers/logger"));
class UserService {
    static count() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.users.count({});
        });
    }
    static list(currentPage = 0, pageSize = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.users.findMany({
                skip: pageSize * currentPage,
                take: pageSize
            });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.users.findFirst({
                where: {
                    id: Number(id),
                }
            });
            if (!user) {
                throw new http_exceptions_1.NotFoundException(id.toString());
            }
            return user;
        });
    }
    static create(first_name, last_name, password_digest) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = bcrypt_1.default.hashSync(password_digest + pepper, parseInt(saltRounds));
            const user = yield prisma_1.default.users.create({
                data: {
                    first_name,
                    last_name,
                    password_digest: hash
                }
            });
            return user;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.users.delete({
                where: {
                    id: Number(id),
                },
            });
            return user;
        });
    }
    static authenticate(first_name, last_name, password_digest) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.users.findFirst({
                where: {
                    first_name: String(first_name),
                    last_name: String(last_name)
                }
            });
            logger_1.default.info(`User::::${user === null || user === void 0 ? void 0 : user.first_name}`);
            try {
                if (user) {
                    logger_1.default.info(`Inside User::::${user === null || user === void 0 ? void 0 : user.first_name}`);
                    if (bcrypt_1.default.compareSync(password_digest + pepper, user.password_digest)) {
                        logger_1.default.info(`Inside Token::::${user === null || user === void 0 ? void 0 : user.first_name}`);
                        const token = jsonwebtoken_1.default.sign({ user: user }, process.env.TOKEN_SECRET);
                        logger_1.default.info(`Token::::${token}`);
                        return token;
                    }
                    else {
                        return null;
                    }
                }
            }
            catch (error) {
                logger_1.default.info(`Error::::${error}`);
            }
            return null;
        });
    }
}
exports.default = UserService;
