import z from "zod";

export const shippingAddressSchema = z.object({
  body: z.object({
    country: z.string().min(1, "Country is required!"),
    zipCode: z.string().min(1, "Zip code is required!"),
    district: z.string().min(1, "District is required!"),
    thana: z.string().min(1, "Thana is required!"),
    address: z.string().min(1, "Address is required!"),
    phone: z.string().min(1, "Phone is required!"),
  }),
});

export const createCartSchema = z.object({
  body: z.object({
    userId: z.string().min(1, "User id is required!"),
    items: z.array(
      z.object({
        productId: z.string().min(1, "Product id is required!"),
        quantity: z.number().min(1, "Quantity must be at least 1!"),
        price: z.number().min(1, "Price must be at least 1!"),
      })
    ),
    discount: z
      .object({
        code: z.string().min(1, "Code is required!"),
        amount: z.number().optional(),
        percentage: z.number().optional(),
      })
      .optional(),
    shippingAddress: shippingAddressSchema.optional(),
    paymentMethod: z
      .enum(["cashOnDelivery", "onlinePayment"])
      .default("cashOnDelivery"),
    status: z.enum(["active", "abandoned", "converted"]).default("active"),
  }),
});

export const updateCartSchema = z.object({
  body: z.object({
    userId: z.string().min(1, "User id is required!"),
    items: z.array(
      z.object({
        productId: z.string().min(1, "Product id is required!"),
        quantity: z.number().min(1, "Quantity must be at least 1!"),
        price: z.number().min(1, "Price must be at least 1!"),
      })
    ),
    discount: z
      .object({
        code: z.string().min(1, "Code is required!"),
        amount: z.number().optional(),
        percentage: z.number().optional(),
      })
      .optional(),
    shippingAddress: z
      .object({
        country: z.string().min(1, "Country is required!"),
        zipCode: z.string().min(1, "Zip code is required!"),
        district: z.string().min(1, "District is required!"),
        thana: z.string().min(1, "Thana is required!"),
        address: z.string().min(1, "Address is required!"),
        phone: z.string().min(1, "Phone is required!"),
      })
      .optional(),
    paymentMethod: z
      .enum(["cashOnDelivery", "onlinePayment"])
      .default("cashOnDelivery"),
    status: z.enum(["active", "abandoned", "converted"]).default("active"),
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
