import { ICart, ICartItem } from "./cart.interface";
import { Cart } from "./cart.model";
import mongoose from "mongoose";

// Get all carts
const getAllCarts = async () => {
  return await Cart.find();
};

// Get cart by cart ID (if needed)
const getCartById = async (id: string) => {
  return await Cart.findById(id);
};

// Get cart by user ID
const getCartByUserId = async (userId: string) => {
  return await Cart.findOne({ userId });
};

// Create a new cart
const createCart = async (cart: ICart) => {
  return await Cart.create(cart);
};

// Update entire cart
const updateCart = async (id: string, cart: ICart) => {
  return await Cart.findByIdAndUpdate(id, cart, { new: true });
};

// Delete a cart by ID
const deleteCart = async (id: string) => {
  return await Cart.findByIdAndDelete(id);
};

// Add an item to the user's cart
const addItem = async (userId: string, item: ICartItem) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return await Cart.create({ userId, items: [item] });
  }

  const existingItem = cart.items.find(
    (i) => i.productId.toString() === item.productId.toString()
  );

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.items.push(item);
  }

  return await cart.save();
};

// Update item quantity in cart
const updateItem = async (userId: string, item: ICartItem) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) return null;

  const existingItem = cart.items.find(
    (i) => i.productId.toString() === item.productId.toString()
  );

  if (existingItem) {
    existingItem.quantity = item.quantity;
    return await cart.save();
  }

  return null;
};

// Remove item from cart
const removeItem = async (userId: string, productId: string) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) return null;

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId.toString()
  );

  return await cart.save();
};

// Clear all items from the user's cart
const clearCart = async (userId: string) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) return null;

  cart.items = [];
  return await cart.save();
};

export const CartServices = {
  getAllCarts,
  getCartById,
  getCartByUserId,
  createCart,
  updateCart,
  deleteCart,
  addItem,
  updateItem,
  removeItem,
  clearCart,
};
