"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const userSchema = new mongoose_1.Schema({
    id: { type: String, unique: true, default: uuid_1.v4 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    photo: { type: String, required: false },
    needsPasswordChange: { type: Boolean, required: true, default: false },
    passwordChangedAt: { type: Date },
    role: {
        type: String,
        required: false,
        enum: ["superAdmin", "admin", "user"],
        default: "user",
    },
    status: {
        type: String,
        required: true,
        enum: ["active", "blocked"],
        default: "active",
    },
    resetToken: { type: String, required: false, default: null },
    isDeleted: { type: Boolean, required: true, default: false },
}
// {
//   _id: false,
// }
);
exports.User = (0, mongoose_1.model)("User", userSchema);
