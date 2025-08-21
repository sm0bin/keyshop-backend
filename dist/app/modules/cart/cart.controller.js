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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const cart_service_1 = require("./cart.service");
const console_1 = require("console");
// Get all carts (for admin)
const getAllCarts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carts = yield cart_service_1.CartServices.getAllCarts();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Carts fetched successfully",
        data: carts,
    });
}));
// Get cart by ID
const getCartById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_service_1.CartServices.getCartById(req.params.id);
    if (!cart) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Cart not found");
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cart fetched successfully",
        data: cart,
    });
}));
const getCartByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_service_1.CartServices.getCartByUserId(req.params.id);
    if (!cart) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Cart not found");
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cart fetched successfully",
        data: cart,
    });
}));
// Get current user's cart
const getMyCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const id = req.user.id; // assuming auth middleware sets req.user
    console.log("User ID from request:", req.user.id);
    const id = req.user.id; // assuming auth middleware sets req.user
    const cart = yield cart_service_1.CartServices.getMyCart(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Your cart fetched successfully",
        data: cart,
    });
}));
// Create a new cart
const createCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_service_1.CartServices.createCart(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Cart created successfully",
        data: cart,
    });
}));
// Update entire cart
const updateCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_service_1.CartServices.updateCart(req.user.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cart updated successfully",
        data: cart,
    });
}));
// Delete cart
const deleteCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_service_1.CartServices.deleteCart(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cart deleted successfully",
        data: cart,
    });
}));
// Add item to cart
const addItemToCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const item = req.body; // should include productId and quantity
    const updatedCart = yield cart_service_1.CartServices.addItem(id, item);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Item added to cart",
        data: updatedCart,
    });
}));
// Update item quantity in cart
const updateCartItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const updatedCart = yield cart_service_1.CartServices.updateItem(id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cart item updated",
        data: updatedCart,
    });
}));
// Remove item from cart
const removeItemFromCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const productId = req.params.id; // product ID to remove
    if (!productId) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Product ID is required");
    }
    const updatedCart = yield cart_service_1.CartServices.removeItem(id, productId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Item removed from cart",
        data: updatedCart,
    });
}));
// Clear entire cart
const clearCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const clearedCart = yield cart_service_1.CartServices.clearCart(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cart cleared",
        data: clearedCart,
    });
}));
// Update cart address
const updateCartAddress = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const address = req.body; // should include address details
    (0, console_1.log)("Updating cart address:", address);
    const updatedCart = yield cart_service_1.CartServices.updateCartAddress(id, address);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cart address updated",
        data: updatedCart,
    });
}));
exports.CartController = {
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
    updateCartAddress,
};
