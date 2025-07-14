import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import { v4 as uuidv4 } from "uuid";

const userSchema = new Schema<IUser>(
  {
    id: { type: String, unique: true, default: uuidv4 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    photo: { type: String, required: false },
    needsPasswordChange: { type: Boolean, required: true, default: false },
    passwordChangedAt: { type: Date },
    role: {
      type: String,
      required: true,
      enum: ["superAdmin", "admin", "user"],
      default: "user",
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "blocked"],
      default: "active",
    },
    isDeleted: { type: Boolean, required: true, default: false },
  }
  // {
  //   _id: false,
  // }
);

export const User = model<IUser>("User", userSchema);
