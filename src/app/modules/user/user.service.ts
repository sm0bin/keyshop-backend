import config from "../../config";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { IUser } from "./user.interface";
import { User } from "./user.model";

// Get all users
const getAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

// Get user by id
const getUserById = async (id: string) => {
  const user = await User.findById(id).select("-password");
  return user;
};

// Create a new user
const createUser = async (payload: IUser) => {
  const { email, password, role, ...userData } = payload;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }

  // Validate role
  // if (!role || !["superAdmin", "admin", "user"].includes(role)) {
  //   throw new AppError(httpStatus.BAD_REQUEST, "Invalid role specified");
  // }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcryptSaltRounds)
  );

  const user = await User.create({
    email,
    password: hashedPassword,
    role,
    ...userData,
  });

  const { password: _, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

// Update a user
const updateUser = async (id: string, payload: Partial<IUser>) => {
  const { email, password, role, ...userData } = payload;

  const user = await User.findByIdAndUpdate(
    id,
    {
      email,
      //   password: hashedPassword,
      role,
      ...userData,
    },
    { new: true }
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const { password: _, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

// Delete a user
const deleteUser = async (id: string) => {
  const user = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

export const UserServices = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
