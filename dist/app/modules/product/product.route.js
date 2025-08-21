"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const authVerify_1 = __importDefault(require("../../middlewares/authVerify"));
const product_validation_1 = require("./product.validation");
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
// Get all products
router.get("/", product_controller_1.ProductController.getAllProducts);
// Get product by id
router.get("/:id", product_controller_1.ProductController.getProductById);
// Create a new product
router.post("/", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(product_validation_1.createProductSchema), product_controller_1.ProductController.createProduct);
// Update a product
router.put("/:id", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(product_validation_1.updateProductSchema), product_controller_1.ProductController.updateProduct);
// Delete a product
router.delete("/:id", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin), product_controller_1.ProductController.deleteProduct);
exports.ProductRoutes = router;
