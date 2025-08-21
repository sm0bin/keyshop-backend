"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartSchema = exports.createCartSchema = exports.addToCartSchema = exports.shippingAddressSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.shippingAddressSchema = zod_1.default.object({
    body: zod_1.default.object({
        country: zod_1.default.string().min(1, "Country is required!"),
        zipCode: zod_1.default.string().min(1, "Zip code is required!"),
        district: zod_1.default.string().min(1, "District is required!"),
        thana: zod_1.default.string().min(1, "Thana is required!"),
        address: zod_1.default.string().min(1, "Address is required!"),
        phone: zod_1.default.string().min(1, "Phone is required!"),
    }),
});
exports.addToCartSchema = zod_1.default.object({
    body: zod_1.default.object({
        // userId: z.string().min(1, "User id is required!"),
        productId: zod_1.default.string().min(1, "Product id is required!"),
        quantity: zod_1.default.number().min(1, "Quantity must be at least 1!"),
        price: zod_1.default.number().min(1, "Price must be at least 1!"),
    }),
});
exports.createCartSchema = zod_1.default.object({
    body: zod_1.default.object({
        userId: zod_1.default.string().min(1, "User id is required!"),
        items: zod_1.default.array(zod_1.default.object({
            productId: zod_1.default.string().min(1, "Product id is required!"),
            quantity: zod_1.default.number().min(1, "Quantity must be at least 1!"),
            price: zod_1.default.number().min(1, "Price must be at least 1!"),
        })),
        discount: zod_1.default
            .object({
            code: zod_1.default.string().min(1, "Code is required!"),
            amount: zod_1.default.number().optional(),
            percentage: zod_1.default.number().optional(),
        })
            .optional(),
        shippingAddress: exports.shippingAddressSchema.optional(),
        paymentMethod: zod_1.default
            .enum(["cashOnDelivery", "onlinePayment"])
            .default("cashOnDelivery"),
        status: zod_1.default
            .enum(["active", "abandoned", "converted", "cash_on_delivery"])
            .default("active"),
    }),
});
exports.updateCartSchema = zod_1.default.object({
    body: zod_1.default.object({
        userId: zod_1.default.string().min(1, "User id is required!"),
        items: zod_1.default.array(zod_1.default.object({
            productId: zod_1.default.string().min(1, "Product id is required!"),
            quantity: zod_1.default.number().min(1, "Quantity must be at least 1!"),
            price: zod_1.default.number().min(1, "Price must be at least 1!"),
        })),
        discount: zod_1.default
            .object({
            code: zod_1.default.string().min(1, "Code is required!"),
            amount: zod_1.default.number().optional(),
            percentage: zod_1.default.number().optional(),
        })
            .optional(),
        shippingAddress: zod_1.default
            .object({
            country: zod_1.default.string().min(1, "Country is required!"),
            zipCode: zod_1.default.string().min(1, "Zip code is required!"),
            district: zod_1.default.string().min(1, "District is required!"),
            thana: zod_1.default.string().min(1, "Thana is required!"),
            address: zod_1.default.string().min(1, "Address is required!"),
            phone: zod_1.default.string().min(1, "Phone is required!"),
        })
            .optional(),
        paymentMethod: zod_1.default
            .enum(["cashOnDelivery", "onlinePayment"])
            .default("cashOnDelivery"),
        status: zod_1.default.enum(["active", "abandoned", "converted"]).default("active"),
    }),
});
// import { Types } from "mongoose";
// import { IProduct } from "../product/product.interface";
// export interface ICartItem {
//   _id?: Types.ObjectId;
//   productId: Types.ObjectId;
//   quantity: number;
//   price: number;
//   addedAt?: Date;
// }
// export interface ICartDiscount {
//   code: string;
//   amount?: number;
//   percentage?: number;
// }
// export interface IShippingAddress {
//   country: string;
//   zipCode: string;
//   district: string;
//   thana: string;
//   address: string;
//   phone: string;
// }
// export enum CartStatus {
//   ACTIVE = "active",
//   ABANDONED = "abandoned",
//   CONVERTED = "converted",
// }
// export interface ICart {
//   _id?: Types.ObjectId;
//   userId?: Types.ObjectId;
//   items: ICartItem[];
//   totalAmount: number;
//   totalItems: number;
//   discount?: ICartDiscount;
//   shippingAddress?: IShippingAddress;
//   status: CartStatus;
//   expiresAt: Date;
//   createdAt?: Date;
//   updatedAt?: Date;
// }
