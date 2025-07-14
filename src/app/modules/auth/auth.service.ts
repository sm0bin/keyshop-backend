import config from "../../config";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { IUserLogin } from "./auth.interface";
import { User } from "../user/user.model";
import { createToken } from "./auth.utils";

// Login user
const loginUser = async (payload: IUserLogin) => {
  const { id, password } = payload;
  const user = await User.findOne({ id, isDeleted: false });

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
    "15m"
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwtRefreshSecret as string,
    "10d"
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
    "15m"
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

  return user;
};

// Reset password
const resetPassword = async (id: string, password: string) => {
  const user = await User.findByIdAndUpdate(id, { password }, { new: true });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

// Change password
const changePassword = async (id: string, password: string) => {
  const user = await User.findById(id, { isDeleted: false });
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

  const updatedUser = await User.findByIdAndUpdate(
    id,
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
