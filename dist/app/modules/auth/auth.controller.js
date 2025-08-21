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
exports.AuthController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const config_1 = __importDefault(require("../../config"));
const auth_service_1 = require("./auth.service");
const nodemailer_1 = require("nodemailer");
// Login
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.loginUser(req.body);
    const { refreshToken, accessToken, needsPasswordChange } = result;
    res.cookie("refreshToken", refreshToken, {
        secure: config_1.default.nodeEnv === "production",
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User logged in successfully!",
        data: {
            accessToken,
            needsPasswordChange,
        },
    });
}));
// Refresh token
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.refreshToken(req.cookies.refreshToken);
    // res.cookie("refreshToken", result.refreshToken, {
    //   secure: config.nodeEnv === "production",
    //   httpOnly: true,
    //   sameSite: "none",
    //   maxAge: 1000 * 60 * 60 * 24 * 30,
    // });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User logged in successfully!",
        data: result,
    });
}));
// Forgot password
const forgotPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.forgotPassword(req.body.email);
    const transporter = (0, nodemailer_1.createTransport)({
        service: "gmail",
        auth: {
            user: config_1.default.mailUser,
            pass: config_1.default.mailPass,
        },
    });
    const mailOptions = {
        from: "`Shehjad Mobin from Mechakeys",
        to: req.body.email,
        subject: "Password Reset Request",
        text: `You requested a password reset. Click the link below to reset your password:\n\nhttp://localhost:5000/api/v1/auth/reset-password?token=${result.resetToken}`,
        html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href='http://localhost:5000/api/v1/auth/reset-password?token=${result.resetToken}'>Reset Password</a></p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("Error:", error);
        }
        console.log("Email sent:", info.response);
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Password reset email sent successfully",
        // data: result,
    });
}));
// Reset password
const resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.resetPassword(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Password reset successfully",
        data: result,
    });
}));
// Change password
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.changePassword(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Password changed successfully",
        data: result,
    });
}));
// Get user profile
const getUserProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_service_1.AuthService.getUserProfile(req.user.id);
    console.log("User profile:", user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User profile retrieved successfully",
        data: user,
    });
}));
exports.AuthController = {
    loginUser,
    refreshToken,
    forgotPassword,
    resetPassword,
    changePassword,
    getUserProfile,
};
