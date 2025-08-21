"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const cart_interface_1 = require("./cart.interface");
// const cartItemSchema = new Schema({
//   product: {
//     type: Types.ObjectId,
//     ref: "Product",
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: 1,
//     default: 1,
//   },
//   price: {
//     type: Number,
//     required: true,
//     min: 0,
//   },
//   addedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });
const cartSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose_1.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1,
            },
            price: {
                type: Number,
                required: true,
                min: 0,
            },
            addedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    totalItems: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    discount: {
        code: String,
        amount: Number,
        percentage: Number,
    },
    shippingAddress: {
        country: String,
        zipCode: String,
        district: String,
        thana: String,
        address: String,
        phone: String,
    },
    status: {
        type: String,
        enum: ["active", "abandoned", "converted", "paid", "cash_on_delivery"],
        default: cart_interface_1.CartStatus.ACTIVE,
    },
}, {
    timestamps: true,
});
exports.Cart = mongoose_1.default.model("Cart", cartSchema);
