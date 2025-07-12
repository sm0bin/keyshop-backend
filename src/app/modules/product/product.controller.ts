import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import { ProductService } from "./product.service";

// Get all products
const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const products = await ProductService.getAllProducts();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: products,
  });
});

// Get product by id
const getProductById = catchAsync(async (req: Request, res: Response) => {
  const product = await ProductService.getProductById(req.params.id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: product,
  });
});

// Create a new product
const createProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await ProductService.createProduct(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    data: product,
  });
});

// Update a product
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await ProductService.updateProduct(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: product,
  });
});

// Delete a product
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await ProductService.deleteProduct(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: product,
  });
});

export const ProductController = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
