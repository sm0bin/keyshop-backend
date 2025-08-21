"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        image: zod_1.z.string(),
        title: zod_1.z.string(),
        brand: zod_1.z.string(),
        quantity: zod_1.z
            .string()
            .min(1, "Quantity is required")
            .transform((val) => Number(val))
            .refine((val) => !isNaN(val) && val > 0, {
            message: "Quantity must be a positive number",
        }),
        price: zod_1.z
            .string()
            .min(1, "Price is required")
            .transform((val) => Number(val))
            .refine((val) => !isNaN(val) && val > 0, {
            message: "Price must be a positive number",
        }),
        rating: zod_1.z
            .string()
            .min(1, "Rating is required")
            .transform((val) => Number(val))
            .refine((val) => !isNaN(val) && val >= 0 && val <= 5, {
            message: "Rating must be between 0 and 5",
        }),
        description: zod_1.z.string(),
    }),
});
exports.updateProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        image: zod_1.z.string().optional(),
        title: zod_1.z.string().optional(),
        brand: zod_1.z.string().optional(),
        quantity: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        rating: zod_1.z.number().optional(),
        description: zod_1.z.string().optional(),
    }),
});
// const productSchema = new Schema<IProduct>({
//   image: {
//     type: String,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   brand: {
//     type: String,
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   rating: {
//     type: Number,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   isDeleted: {
//     type: Boolean,
//     default: false,
//   },
// });
