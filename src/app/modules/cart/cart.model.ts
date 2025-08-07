import mongoose, { Schema, Types } from "mongoose";
import { CartStatus, ICart } from "./cart.interface";

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

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [
      {
        productId: {
          type: Types.ObjectId,
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
      enum: ["active", "abandoned", "converted", "paid"],
      default: CartStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.model<ICart>("Cart", cartSchema);
