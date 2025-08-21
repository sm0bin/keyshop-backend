"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartServices = void 0;
const product_model_1 = require("../product/product.model");
const cart_model_1 = require("./cart.model");
// Get all carts
const getAllCarts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.find();
});
// Get cart by cart ID (if needed)
const getCartById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.findById(userId);
});
// Get cart by user ID
const getCartByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.findOne({ userId });
});
// Create a new cart
const createCart = (cart) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.create(cart);
});
// Update entire cart
const updateCart = (userId, cart) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCart = yield cart_model_1.Cart.findOneAndUpdate({ userId, status: "active" }, { status: cart.status }, { new: true });
    console.log(updatedCart);
    if (!updatedCart) {
        throw new Error("Cart not found");
    }
    const bulkOperations = updatedCart.items.map((p) => ({
        updateOne: {
            filter: { _id: p.productId, isDeleted: false },
            update: { $inc: { quantity: -p.quantity } },
        },
    }));
    const updatedProducts = yield product_model_1.Product.bulkWrite(bulkOperations);
    console.log(updatedProducts);
    return updatedProducts;
});
// Delete a cart by ID
const deleteCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.findByIdAndDelete(userId);
});
// Add an item to the user's cart
const addItem = (userId, item) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.Cart.findOne({ userId, status: "active" });
    if (!cart) {
        return yield cart_model_1.Cart.create({ userId, items: [item] });
    }
    const existingItem = cart.items.find((i) => i.productId.toString() === item.productId.toString());
    const product = yield product_model_1.Product.findOne({
        _id: item.productId,
        isDeleted: false,
    });
    if (!product) {
        throw new Error("Product not found");
    }
    if (product.quantity < item.quantity + ((existingItem === null || existingItem === void 0 ? void 0 : existingItem.quantity) || 0)) {
        throw new Error("Cart quantity must not exceed product available");
    }
    if (existingItem) {
        existingItem.quantity += item.quantity;
    }
    else {
        cart.items.push(item);
    }
    return yield cart.save();
});
// Update item quantity in cart
const updateItem = (userId, item) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.Cart.findOne({ userId, status: "active" });
    if (!cart)
        return null;
    const existingItem = cart.items.find((i) => i.productId.toString() === item.productId.toString());
    // const product = await Product.findOne({
    //   _id: item.productId,
    //   isDeleted: false,
    // });
    // if (!product) {
    //   throw new Error("Product not found");
    // }
    // if (product.quantity < item.quantity + (existingItem?.quantity || 0)) {
    //   throw new Error("Cart quantity must not exceed product available");
    // }
    if (existingItem) {
        existingItem.quantity = item.quantity;
        return yield cart.save();
    }
    return null;
});
// Remove item from cart
const removeItem = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.Cart.findOne({ userId, status: "active" });
    if (!cart)
        return null;
    cart.items = cart.items.filter((item) => item.productId.toString() !== productId.toString());
    return yield cart.save();
});
const getMyCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.Cart.findOne({ userId, status: "active" });
    if (!cart) {
        return yield cart_model_1.Cart.create({ userId, items: [] });
    }
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalAmount = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newCart = yield cart.save();
    // Fetch product details for each item
    const itemsWithProductDetails = yield Promise.all(newCart.items.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield product_model_1.Product.findById(item.productId);
        return Object.assign(Object.assign({}, item.toObject()), { product: product || null });
    })));
    // Return a plain object with the enhanced items
    return Object.assign(Object.assign({}, newCart.toObject()), { items: itemsWithProductDetails });
});
// Clear all items from the user's cart
const clearCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.Cart.findOne({ userId, status: "active" });
    if (!cart)
        return null;
    cart.items = [];
    return yield cart.save();
});
// Update cart address
const updateCartAddress = (userId, address) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.Cart.findOne({ userId, status: "active" });
    if (!cart)
        return null;
    cart.shippingAddress = address;
    return yield cart.save();
});
exports.CartServices = {
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
    updateCartAddress,
};
