import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
  uId: { type: String, required: true },
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
});

export const User = model<IUser>("User", userSchema);
