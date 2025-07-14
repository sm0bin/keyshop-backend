import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import authVerify from "../../middlewares/authVerify";
import { USER_ROLE } from "./user.constant";
import { UserController } from "./user.controller";
import { createUserSchema, updateUserSchema } from "./user.validation";

const router = express.Router();

// Create a new user
router.post("/", validateRequest(createUserSchema), UserController.createUser);

// Get all users
router.get("/", authVerify(USER_ROLE.admin), UserController.getAllUsers);

// Get user by id
router.get("/:id", authVerify(USER_ROLE.admin), UserController.getUserById);

// Update a user
router.put(
  "/:id",
  authVerify(USER_ROLE.admin),
  validateRequest(updateUserSchema),
  UserController.updateUser
);

// Delete a user
router.delete("/:id", authVerify(USER_ROLE.admin), UserController.deleteUser);

export const UserRoutes = router;
