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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const logger_1 = __importDefault(require("./helpers/logger"));
const environment_1 = __importDefault(require("./environment"));
const error_middleware_1 = __importDefault(require("./middlewares/error-middleware"));
const morgan_middleware_1 = __importDefault(require("./middlewares/morgan-middleware"));
const http_1 = require("http");
const os_1 = require("os");
const UserRouter_1 = __importDefault(require("./routers/UserRouter"));
const ProductRouter_1 = __importDefault(require("./routers/ProductRouter"));
const CategoryRouter_1 = __importDefault(require("./routers/CategoryRouter"));
const OrderRouter_1 = __importDefault(require("./routers/OrderRouter"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
/** Security and config **/
app.use((0, helmet_1.default)()); // Add security configuring HTTP headers appropriately
app.use((0, cors_1.default)()); // Enable cors
app.use(body_parser_1.default.json());
/** Middlewares **/
app.use(morgan_middleware_1.default); // Print http logs in development mode
/** Handlers **/
app.use(error_middleware_1.default); // Error handler
process.on('unhandledRejection', (error) => {
    logger_1.default.error(`[unhandledRejection] ${error.stack}`);
});
(0, UserRouter_1.default)(app);
(0, ProductRouter_1.default)(app);
(0, CategoryRouter_1.default)(app);
(0, OrderRouter_1.default)(app);
/** Listen on provided port, on all network interfaces. **/
server.listen(environment_1.default.port, () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const ip = environment_1.default.isProduction() ? (_a = Object.values((0, os_1.networkInterfaces)()).flat().find(details => details && details.family == 'IPv4' && !details.internal)) === null || _a === void 0 ? void 0 : _a.address : '127.0.0.1';
    logger_1.default.info(`⚡ ${environment_1.default.appName} Server Running here -> ${ip !== null && ip !== void 0 ? ip : (0, os_1.hostname)()}:${environment_1.default.port}`);
}));
