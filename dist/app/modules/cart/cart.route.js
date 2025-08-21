"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const authVerify_1 = __importDefault(require("../../middlewares/authVerify"));
const user_constant_1 = require("../user/user.constant");
const cart_controller_1 = require("./cart.controller");
const cart_validation_1 = require("./cart.validation");
const router = (0, express_1.Router)();
// Get cart by user id
router.get("/user/:userId", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin), cart_controller_1.CartController.getCartByUserId);
// Add Item to cart
router.post("/add-item", (0, authVerify_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(cart_validation_1.addToCartSchema), cart_controller_1.CartController.addItemToCart);
// Update cart item
router.put("/update-item", (0, authVerify_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), cart_controller_1.CartController.updateCartItem);
// Remove item from cart
router.delete("/remove-item/:id", (0, authVerify_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), cart_controller_1.CartController.removeItemFromCart);
// Get my cart
router.get("/my-cart", (0, authVerify_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), cart_controller_1.CartController.getMyCart);
// Clear cart
router.delete("/clear", (0, authVerify_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), cart_controller_1.CartController.clearCart);
router.put("/address", (0, authVerify_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(cart_validation_1.shippingAddressSchema), cart_controller_1.CartController.updateCartAddress);
// Create a new cart
router.post("/", (0, authVerify_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(cart_validation_1.createCartSchema), cart_controller_1.CartController.createCart);
// Get all carts
router.get("/", (0, authVerify_1.default)(user_constant_1.USER_ROLE.admin), cart_controller_1.CartController.getAllCarts);
// Get cart by id
router.get("/:id", (0, authVerify_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), cart_controller_1.CartController.getCartById);
// Update a cart
router.put("/update", (0, authVerify_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), 
// validateRequest(updateCartSchema),
cart_controller_1.CartController.updateCart);
// Delete a cart
router.delete("/:id", (0, authVerify_1.default)(user_constant_1.USER_ROLE.user), cart_controller_1.CartController.deleteCart);
exports.CartRoutes = router;
