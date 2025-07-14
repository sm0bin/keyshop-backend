import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import authVerify from "../../middlewares/authVerify";
import { USER_ROLE } from "../user/user.constant";
import { AuthController } from "./auth.controller";
import {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from "./auth.validation";

const router = express.Router();

// Login
router.post("/login", validateRequest(loginSchema), AuthController.loginUser);

// Refresh token
router.get(
  "/refresh-token",
  authVerify(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superAdmin),
  AuthController.refreshToken
);

// Forgot password
router.post(
  "/forgot-password",
  validateRequest(forgotPasswordSchema),
  AuthController.forgotPassword
);

// Reset password
router.post(
  "/reset-password",
  validateRequest(resetPasswordSchema),
  AuthController.resetPassword
);

// Change password
router.post(
  "/change-password",
  validateRequest(changePasswordSchema),
  AuthController.changePassword
);

export const AuthRoutes = router;
