import { email, z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    id: z.string().min(1, "User id is required!"),
    password: z.string().min(1, "Password is required!"),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    id: z.string().min(1, "User id is required!"),
    oldPassword: z.string().min(1, "Old password is required!"),
    newPassword: z.string().min(1, "New password is required!"),
  }),
});

export const refreshTokenSchema = z.object({
  cookies: z.object({
    refreshToken: z.string().min(1, "Refresh token is required!"),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email("Invalid email format")
      .min(1, "Email is required!"),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    id: z.string().min(1, "User id is required!"),
    password: z.string().min(1, "Password is required!"),
  }),
});
