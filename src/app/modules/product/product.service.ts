import { IProduct } from "./product.interface";
import { Product } from "./product.model";
interface ProductQueryParams {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
}
// Get all products
const getAllProducts = async (queryParams?: ProductQueryParams) => {
  const filter: any = { isDeleted: false };

  // Search
  if (queryParams?.search) {
    filter.$or = [
      { title: { $regex: queryParams.search, $options: "i" } },
      { brand: { $regex: queryParams.search, $options: "i" } },
    ];
  }

  // Price range
  if (queryParams?.minPrice || queryParams?.maxPrice) {
    filter.price = {
      ...(queryParams.minPrice && { $gte: queryParams.minPrice }),
      ...(queryParams.maxPrice && { $lte: queryParams.maxPrice }),
    };
  }

  // Sort options
  const sortOptions: any = {
    "price-low": { price: 1 },
    "price-high": { price: -1 },
    default: { createdAt: -1 },
  };

  const sortBy = sortOptions[queryParams?.sortBy || "default"];

  const products = await Product.find(filter).sort(sortBy);
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
