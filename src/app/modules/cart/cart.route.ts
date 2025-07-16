import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import authVerify from "../../middlewares/authVerify";
import { USER_ROLE } from "../user/user.constant";
import { CartController } from "./cart.controller";
import { createCartSchema, updateCartSchema } from "./cart.validation";

const router = Router();

// Get cart by user id
router.get(
  "/user/:userId",
  authVerify(USER_ROLE.admin),
  CartController.getCartByUserId
);

// Add Item to cart
router.post(
  "/add-item",
  authVerify(USER_ROLE.user),
  CartController.addItemToCart
);

// Update cart item
router.put(
  "/update-item",
  authVerify(USER_ROLE.user),
  CartController.updateCartItem
);

// Remove item from cart
router.delete(
  "/remove-item/:id",
  authVerify(USER_ROLE.user),
  CartController.removeItemFromCart
);

// Get my cart
router.get("/my-cart", authVerify(USER_ROLE.user), CartController.getMyCart);

// Clear cart
router.delete("/clear", authVerify(USER_ROLE.user), CartController.clearCart);

// Create a new cart
router.post(
  "/",
  authVerify(USER_ROLE.user),
  validateRequest(createCartSchema),
  CartController.createCart
);

// Get all carts
router.get("/", authVerify(USER_ROLE.admin), CartController.getAllCarts);

// Get cart by id
router.get(
  "/:id",
  authVerify(USER_ROLE.user, USER_ROLE.admin),
  CartController.getCartById
);

// Update a cart
router.put(
  "/:id",
  authVerify(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(updateCartSchema),
  CartController.updateCart
);

// Delete a cart
router.delete("/:id", authVerify(USER_ROLE.user), CartController.deleteCart);

export const CartRoutes = router;
