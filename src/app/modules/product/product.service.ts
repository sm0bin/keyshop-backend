import Product from "./product.model";
import { IProduct } from "./product.interface";

// Get all products
const getAllProducts = async () => {
  const products = await Product.find({ isDeleted: false });

  return products;
};

// Get product by id
const getProductById = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

// Create a new product
const createProduct = async (product: IProduct) => {
  return Product.create(product);
};

// Update a product
const updateProduct = async (id: string, product: IProduct) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, product, {
    new: true,
  });

  return updatedProduct;
};

// Delete a product
const deleteProduct = async (id: string) => {
  return Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

export const ProductService = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
