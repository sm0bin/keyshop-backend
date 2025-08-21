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
// middlewares/authVerify.ts
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/user/user.model");
const authVerify = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Authorization header is missing");
        }
        if (!authHeader.startsWith("Bearer ")) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid token format");
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Token is missing");
        }
        const decoded = (yield jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret));
        const { id, role } = decoded;
        const user = yield user_model_1.User.findOne({ id });
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
        }
        if (requiredRoles && !requiredRoles.includes(user.role)) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You have no access to this route");
        }
        req.user = decoded;
        next();
    }));
};
exports.default = authVerify;
