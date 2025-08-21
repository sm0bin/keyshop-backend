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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../user/user.model");
const auth_utils_1 = require("./auth.utils");
// Login user
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield user_model_1.User.findOne({ email, isDeleted: false });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid credentials");
    }
    if (user.status === "blocked") {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User is blocked");
    }
    const jwtPayload = {
        id: user.id,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwtSecret, 2 * 24 * 60 * 60 * 1000);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwtRefreshSecret, 30 * 24 * 60 * 60 * 1000);
    // const needsPasswordChange = user.isPasswordChanged();
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: false,
    };
});
// Refresh token
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ refreshToken: token, isDeleted: false });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (user.status === "blocked") {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User is blocked");
    }
    const jwtPayload = {
        id: user.id,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwtSecret, 2 * 24 * 60 * 60 * 1000);
    return {
        accessToken,
    };
});
// Forgot password
const forgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email, isDeleted: false });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (user.status === "blocked") {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User is blocked");
    }
    // Generate reset token and save it to the user
    const resetToken = (0, auth_utils_1.createToken)({ id: user.id, role: user.role }, config_1.default.jwtSecret, 7 * 24 * 60 * 60 * 1000);
    user.resetToken = resetToken;
    yield user.save();
    return { resetToken };
});
// Reset password
const resetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, password } = payload;
    const user = yield user_model_1.User.findOne({ resetToken: token, isDeleted: false });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (user.status === "blocked") {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User is blocked");
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.bcryptSaltRounds));
    const updatedUser = yield user_model_1.User.findOneAndUpdate({ resetToken: token }, { password: hashedPassword, resetToken: null }, { new: true });
    if (!updatedUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    return user;
});
// Change password
const changePassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, oldPassword, newPassword } = payload;
    const user = yield user_model_1.User.findOne({ email, isDeleted: false });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const isMatch = yield bcrypt_1.default.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid credentials");
    }
    if (user.status === "blocked") {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User is blocked");
    }
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bcryptSaltRounds));
    const updatedUser = yield user_model_1.User.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true });
    if (!updatedUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const _a = user.toObject(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]);
    return userWithoutPassword;
});
// Get user profile
const getUserProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ id, isDeleted: false });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (user.status === "blocked") {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User is blocked");
    }
    const _a = user.toObject(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]);
    return userWithoutPassword;
});
exports.AuthService = {
    loginUser,
    refreshToken,
    forgotPassword,
    resetPassword,
    changePassword,
    getUserProfile,
};
