"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.email("Invalid email address"),
        name: zod_1.z.string().min(2, "Name must be at least 2 characters long"),
        password: zod_1.z.string().min(8, "Password must be at least 8 characters long"),
        role: zod_1.z.enum(["superAdmin", "admin", "user"]).default("user").optional(),
    }),
});
exports.updateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Invalid email address").optional(),
        name: zod_1.z
            .string()
            .min(2, "Name must be at least 2 characters long")
            .optional(),
        // password: z
        //   .string()
        //   .min(8, "Password must be at least 8 characters long")
        //   .optional(),
        role: zod_1.z.enum(["superAdmin", "admin", "user"]).default("user").optional(),
        status: zod_1.z.enum(["active", "blocked"]).default("active").optional(),
    }),
});
