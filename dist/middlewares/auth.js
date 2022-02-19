"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyAuthToken(req, res, next) {
    if (!req.headers || !req.headers.authorization) {
        return res.status(401).send({ message: "No authorization headers" });
    }
    const tokenBearer = req.headers.authorization.split(' ');
    if (tokenBearer.length != 2) {
        return res.status(401).send({ message: "Malformed token" });
    }
    const token = tokenBearer[1];
    return jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err) => {
        if (err) {
            return res.status(500).send({ message: "Failed to authenticate" });
        }
        return next();
    });
}
exports.verifyAuthToken = verifyAuthToken;
