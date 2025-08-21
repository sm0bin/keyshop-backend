"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_model_1 = require("./product.model");
// Get all products
const getAllProducts = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { isDeleted: false };
    // Search
    if (queryParams === null || queryParams === void 0 ? void 0 : queryParams.search) {
        filter.$or = [
            { title: { $regex: queryParams.search, $options: "i" } },
            { brand: { $regex: queryParams.search, $options: "i" } },
        ];
    }
    // Price range
    if ((queryParams === null || queryParams === void 0 ? void 0 : queryParams.minPrice) || (queryParams === null || queryParams === void 0 ? void 0 : queryParams.maxPrice)) {
        filter.price = Object.assign(Object.assign({}, (queryParams.minPrice && { $gte: queryParams.minPrice })), (queryParams.maxPrice && { $lte: queryParams.maxPrice }));
    }
    // Sort options
    const sortOptions = {
        "price-low": { price: 1 },
        "price-high": { price: -1 },
        default: { createdAt: -1 },
    };
    const sortBy = sortOptions[(queryParams === null || queryParams === void 0 ? void 0 : queryParams.sortBy) || "default"];
    const products = yield product_model_1.Product.find(filter).sort(sortBy);
    return products;
});
// Get product by id
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(id);
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
});
// Create a new product
const createProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    return product_model_1.Product.create(product);
});
// Update a product
const updateProduct = (id, product) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProduct = yield product_model_1.Product.findByIdAndUpdate(id, product, {
        new: true,
    });
    return updatedProduct;
});
// Delete a product
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return product_model_1.Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
});
exports.ProductService = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
