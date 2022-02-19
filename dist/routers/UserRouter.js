"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_validation_1 = __importDefault(require("../validations/user-validation"));
const general_validation_1 = __importDefault(require("../validations/shared/general-validation"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const auth_1 = require("../middlewares/auth");
const userRouter = (app) => {
    app.get('/user', auth_1.verifyAuthToken, general_validation_1.default.paginatedList, UserController_1.default.list);
    app.get('/user/:id', auth_1.verifyAuthToken, general_validation_1.default.onlyIdParam, UserController_1.default.findById);
    app.post('/user', user_validation_1.default.create, UserController_1.default.create);
    app.delete('/user/:id', auth_1.verifyAuthToken, general_validation_1.default.onlyIdParam, UserController_1.default.delete);
    app.post('/user/authenticate', UserController_1.default.authenticate);
};
exports.default = userRouter;
