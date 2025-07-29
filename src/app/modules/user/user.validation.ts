import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    email: z.email("Invalid email address"),
    name: z.string().min(2, "Name must be at least 2 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    role: z.enum(["superAdmin", "admin", "user"]).default("user").optional(),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address").optional(),
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .optional(),
    // password: z
    //   .string()
    //   .min(8, "Password must be at least 8 characters long")
    //   .optional(),
    role: z.enum(["superAdmin", "admin", "user"]).default("user").optional(),
    status: z.enum(["active", "blocked"]).default("active").optional(),
  }),
});
