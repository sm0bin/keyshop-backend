"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.refreshTokenSchema = exports.changePasswordSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.email("Invalid email format").min(1, "Email is required!"),
        password: zod_1.z.string().min(1, "Password is required!"),
    }),
});
exports.changePasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.email("Invalid email format").min(1, "Email is required!"),
        oldPassword: zod_1.z.string().min(1, "Old password is required!"),
        newPassword: zod_1.z.string().min(1, "New password is required!"),
    }),
});
exports.refreshTokenSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string().min(1, "Refresh token is required!"),
    }),
});
exports.forgotPasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.email("Invalid email format").min(1, "Email is required!"),
    }),
});
exports.resetPasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.email("Invalid email format").min(1, "Email is required!"),
        password: zod_1.z.string().min(1, "Password is required!"),
    }),
});
