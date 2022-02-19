"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const general_validation_1 = __importDefault(require("../validations/shared/general-validation"));
const CategoryController_1 = __importDefault(require("../controllers/CategoryController"));
const auth_1 = require("../middlewares/auth");
const category_validation_1 = __importDefault(require("../validations/category-validation"));
const categoryRouter = (app) => {
    app.get('/category', auth_1.verifyAuthToken, general_validation_1.default.paginatedList, CategoryController_1.default.list);
    app.get('/category/:id', auth_1.verifyAuthToken, general_validation_1.default.onlyIdParam, CategoryController_1.default.findById);
    app.post('/category', auth_1.verifyAuthToken, category_validation_1.default.create, CategoryController_1.default.create);
    app.delete('/category/:id', auth_1.verifyAuthToken, general_validation_1.default.onlyIdParam, CategoryController_1.default.delete);
};
exports.default = categoryRouter;
