"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const authVerify_1 = __importDefault(require("../../middlewares/authVerify"));
const user_constant_1 = require("./user.constant");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
// Create a new user
router.post("/", (0, validateRequest_1.default)(user_validation_1.createUserSchema), user_controller_1.UserController.createUser);
// Get all users
router.get("/", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserController.getAllUsers);
// Get user by id
router.get("/:id", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserController.getUserById);
// Update a user
router.put("/:id", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(user_validation_1.updateUserSchema), user_controller_1.UserController.updateUser);
// Delete a user
router.delete("/:id", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserController.deleteUser);
exports.UserRoutes = router;
