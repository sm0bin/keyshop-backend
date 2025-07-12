import { Router } from "express";
import { ProductController } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import authVerify from "../../middlewares/authVerify";
import { createProductSchema, updateProductSchema } from "./product.validation";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

// Get all products
router.get("/", ProductController.getAllProducts);

// Get product by id
router.get("/:id", ProductController.getProductById);

// Create a new product
router.post(
  "/",
  authVerify(USER_ROLE.admin),
  validateRequest(createProductSchema),
  ProductController.createProduct
);

// Update a product
router.put(
  "/:id",
  authVerify(USER_ROLE.admin),
  validateRequest(updateProductSchema),
  ProductController.updateProduct
);

// Delete a product
router.delete(
  "/:id",
  authVerify(USER_ROLE.admin),
  ProductController.deleteProduct
);

export const ProductRoutes = router;
