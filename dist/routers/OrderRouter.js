"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const general_validation_1 = __importDefault(require("../validations/shared/general-validation"));
const OrderController_1 = __importDefault(require("../controllers/OrderController"));
const auth_1 = require("../middlewares/auth");
const order_validation_1 = __importDefault(require("../validations/order-validation"));
const orderRouter = (app) => {
    app.get('/order', auth_1.verifyAuthToken, general_validation_1.default.paginatedList, OrderController_1.default.list);
    app.get('/order/:id', auth_1.verifyAuthToken, general_validation_1.default.onlyIdParam, OrderController_1.default.findById);
    app.post('/order', auth_1.verifyAuthToken, order_validation_1.default.create, OrderController_1.default.create);
    app.delete('/order/:id', auth_1.verifyAuthToken, general_validation_1.default.onlyIdParam, OrderController_1.default.delete);
    app.post('/orders-current-by-userid', auth_1.verifyAuthToken, OrderController_1.default.findCurrentByUserId);
    app.post('/orders-complete-by-userid', auth_1.verifyAuthToken, OrderController_1.default.showCompleteByUserId);
    app.post('/order/complete', auth_1.verifyAuthToken, OrderController_1.default.setComplete);
};
exports.default = orderRouter;
