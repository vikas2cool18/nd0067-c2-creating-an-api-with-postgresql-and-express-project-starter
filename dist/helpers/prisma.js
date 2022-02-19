"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const environment_1 = __importDefault(require("../environment"));
const prisma = global.prisma || new client_1.PrismaClient();
if (!environment_1.default.isProduction())
    global.prisma = prisma;
exports.default = prisma;
