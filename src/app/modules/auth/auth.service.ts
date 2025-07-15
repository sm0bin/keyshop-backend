import config from "../../config";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { IChangePassword, IResetPassword, IUserLogin } from "./auth.interface";
import { User } from "../user/user.model";
import { createToken } from "./auth.utils";

// Login user
const loginUser = async (payload: IUserLogin) => {
  const { email, password } = payload;
  const user = await User.findOne({ email, isDeleted: false });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  if (user.status === "blocked") {
    throw new AppError(httpStatus.UNAUTHORIZED, "User is blocked");
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwtSecret as string,
    15 * 60 * 1000
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwtRefreshSecret as string,
    30 * 24 * 60 * 60 * 1000
  );
  // const needsPasswordChange = user.isPasswordChanged();

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: false,
  };
};

// Refresh token
const refreshToken = async (token: string) => {
  const user = await User.findOne({ refreshToken: token, isDeleted: false });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (user.status === "blocked") {
    throw new AppError(httpStatus.UNAUTHORIZED, "User is blocked");
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwtSecret as string,
    15 * 60 * 1000
  );

  return {
    accessToken,
  };
};

// Forgot password
const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email, isDeleted: false });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (user.status === "blocked") {
    throw new AppError(httpStatus.UNAUTHORIZED, "User is blocked");
  }

  // Generate reset token and save it to the user
  const resetToken = createToken(
    { id: user.id, role: user.role },
    config.jwtSecret as string,
    15 * 60 * 1000
  );

  user.resetToken = resetToken;
  await user.save();

  return { resetToken };
};

// Reset password
const resetPassword = async (payload: IResetPassword) => {
  const { token, password } = payload;
  const user = await User.findOne({ resetToken: token, isDeleted: false });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (user.status === "blocked") {
    throw new AppError(httpStatus.UNAUTHORIZED, "User is blocked");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcryptSaltRounds)
  );

  const updatedUser = await User.findOneAndUpdate(
    { resetToken: token },
    { password: hashedPassword, resetToken: null },
    { new: true }
  );
  if (!updatedUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

// Change password
const changePassword = async (payload: IChangePassword) => {
  const { email, oldPassword, newPassword } = payload;
  const user = await User.findOne({ email, isDeleted: false });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  if (user.status === "blocked") {
    throw new AppError(httpStatus.UNAUTHORIZED, "User is blocked");
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcryptSaltRounds)
  );

  const updatedUser = await User.findOneAndUpdate(
    { email },
    { password: hashedPassword },
    { new: true }
  );
  if (!updatedUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const { password: _, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

export const AuthService = {
  loginUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
};
