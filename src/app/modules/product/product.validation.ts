import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    image: z.string(),
    title: z.string(),
    brand: z.string(),
    quantity: z.number(),
    price: z.number(),
    rating: z.number(),
    description: z.string(),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    image: z.string().optional(),
    title: z.string().optional(),
    brand: z.string().optional(),
    quantity: z.number().optional(),
    price: z.number().optional(),
    rating: z.number().optional(),
    description: z.string().optional(),
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
