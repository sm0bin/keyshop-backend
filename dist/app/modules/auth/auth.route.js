"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const authVerify_1 = __importDefault(require("../../middlewares/authVerify"));
const user_constant_1 = require("../user/user.constant");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
// Login
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.loginSchema), auth_controller_1.AuthController.loginUser);
// Refresh token
router.get("/refresh-token", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.superAdmin), auth_controller_1.AuthController.refreshToken);
// Forgot password
router.post("/forgot-password", (0, validateRequest_1.default)(auth_validation_1.forgotPasswordSchema), auth_controller_1.AuthController.forgotPassword);
// Reset password
router.post("/reset-password", (0, validateRequest_1.default)(auth_validation_1.resetPasswordSchema), auth_controller_1.AuthController.resetPassword);
// Change password
router.post("/change-password", (0, validateRequest_1.default)(auth_validation_1.changePasswordSchema), auth_controller_1.AuthController.changePassword);
// Get user profile
router.get("/profile", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.superAdmin), auth_controller_1.AuthController.getUserProfile);
exports.AuthRoutes = router;
