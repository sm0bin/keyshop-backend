import { Product } from "../product/product.model";
import { ICart, ICartItem } from "./cart.interface";
import { Cart } from "./cart.model";
import mongoose from "mongoose";

// Get all carts
const getAllCarts = async () => {
  return await Cart.find();
};

// Get cart by cart ID (if needed)
const getCartById = async (userId: string) => {
  return await Cart.findById(userId);
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
const updateCart = async (userId: string, cart: ICart) => {
  return await Cart.findByIdAndUpdate(userId, cart, { new: true });
};

// Delete a cart by ID
const deleteCart = async (userId: string) => {
  return await Cart.findByIdAndDelete(userId);
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

const getMyCart = async (userId: string) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return await Cart.create({ userId, items: [] });
  }

  cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  cart.totalAmount = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const newCart = await cart.save();

  // Fetch product details for each item
  const itemsWithProductDetails = await Promise.all(
    newCart.items.map(async (item) => {
      const product = await Product.findById(item.productId);
      return {
        ...item.toObject(), // Convert mongoose document to plain object
        product: product || null,
      };
    })
  );

  // Return a plain object with the enhanced items
  return {
    ...newCart.toObject(),
    items: itemsWithProductDetails,
  };
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
  getMyCart,
  clearCart,
};
