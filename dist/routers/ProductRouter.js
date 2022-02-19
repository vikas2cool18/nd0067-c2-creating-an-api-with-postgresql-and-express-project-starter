"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const general_validation_1 = __importDefault(require("../validations/shared/general-validation"));
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
const auth_1 = require("../middlewares/auth");
const product_validation_1 = __importDefault(require("../validations/product-validation"));
const productRouter = (app) => {
    app.get('/product', auth_1.verifyAuthToken, general_validation_1.default.paginatedList, ProductController_1.default.list);
    app.get('/product/:id', auth_1.verifyAuthToken, general_validation_1.default.onlyIdParam, ProductController_1.default.findById);
    app.post('/product', auth_1.verifyAuthToken, product_validation_1.default.create, ProductController_1.default.create);
    app.delete('/product/:id', auth_1.verifyAuthToken, general_validation_1.default.onlyIdParam, ProductController_1.default.delete);
    app.get('/product/category/:id', auth_1.verifyAuthToken, general_validation_1.default.onlyIdParam, ProductController_1.default.findByCategory);
};
exports.default = productRouter;
