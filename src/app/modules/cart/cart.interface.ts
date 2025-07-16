import { Types } from "mongoose";
import { IProduct } from "../product/product.interface";

export interface ICartItem {
  _id?: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
  price: number;
  addedAt?: Date;
  product?: IProduct | null; // Optional, populated when fetching cart
}

export interface ICartDiscount {
  code: string;
  amount?: number;
  percentage?: number;
}

export interface IShippingAddress {
  country: string;
  zipCode: string;
  district: string;
  thana: string;
  address: string;
  phone: string;
}

export enum CartStatus {
  ACTIVE = "active",
  ABANDONED = "abandoned",
  CONVERTED = "converted",
}

export interface ICart {
  _id?: Types.ObjectId;
  userId: string; // Changed to string for user ID
  items: ICartItem[];
  totalAmount: number;
  totalItems: number;
  discount?: ICartDiscount;
  shippingAddress?: IShippingAddress;
  status: CartStatus;
  //   expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
