import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import { CartServices } from "./cart.service";

// Get all carts (for admin)
const getAllCarts = catchAsync(async (req: Request, res: Response) => {
  const carts = await CartServices.getAllCarts();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Carts fetched successfully",
    data: carts,
  });
});

// Get cart by ID
const getCartById = catchAsync(async (req: Request, res: Response) => {
  const cart = await CartServices.getCartById(req.params.id);
  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, "Cart not found");
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart fetched successfully",
    data: cart,
  });
});

const getCartByUserId = catchAsync(async (req: Request, res: Response) => {
  const cart = await CartServices.getCartByUserId(req.params.id);
  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, "Cart not found");
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart fetched successfully",
    data: cart,
  });
});

// Get current user's cart
const getMyCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id; // assuming auth middleware sets req.user
  const cart = await CartServices.getCartByUserId(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Your cart fetched successfully",
    data: cart,
  });
});

// Create a new cart
const createCart = catchAsync(async (req: Request, res: Response) => {
  const cart = await CartServices.createCart(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Cart created successfully",
    data: cart,
  });
});

// Update entire cart
const updateCart = catchAsync(async (req: Request, res: Response) => {
  const cart = await CartServices.updateCart(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart updated successfully",
    data: cart,
  });
});

// Delete cart
const deleteCart = catchAsync(async (req: Request, res: Response) => {
  const cart = await CartServices.deleteCart(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart deleted successfully",
    data: cart,
  });
});

// Add item to cart
const addItemToCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const item = req.body; // should include productId and quantity
  const updatedCart = await CartServices.addItem(userId, item);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Item added to cart",
    data: updatedCart,
  });
});

// Update item quantity in cart
const updateCartItem = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const item = req.body; // should include productId and new quantity
  const updatedCart = await CartServices.updateItem(userId, item);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart item updated",
    data: updatedCart,
  });
});

// Remove item from cart
const removeItemFromCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { productId } = req.body;
  const updatedCart = await CartServices.removeItem(userId, productId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Item removed from cart",
    data: updatedCart,
  });
});

// Clear entire cart
const clearCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const clearedCart = await CartServices.clearCart(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart cleared",
    data: clearedCart,
  });
});

export const CartController = {
  getAllCarts,
  getCartById,
  getCartByUserId,
  getMyCart,
  createCart,
  updateCart,
  deleteCart,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
  clearCart,
};
