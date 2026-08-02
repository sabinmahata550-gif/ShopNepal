import express from "express";
import validate from "../middlewares/validateMiddleware.js"
import productController from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import upload from "../middlewares/upload.js";
import productOwnershipMiddleware from "../middlewares/productOwnershipMiddleware.js";
import {
    ROLE_ADMIN,
    ROLE_MERCHANT,
} from "../constants/userRole.js";
import productSchema from "../validators/productValidator.js";
import uploadFile from "../utils/fileUploader.js";

const router = express.Router();

// Public
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// Create product
// अहिले Admin मात्र
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLE_MERCHANT, ROLE_ADMIN),
  upload.array("images",5),
  validate(productSchema),
  productController.createProduct
);

// Update product
// Merchant + Admin
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware(ROLE_MERCHANT, ROLE_ADMIN),
    productOwnershipMiddleware,
    validate(productSchema),
    productController.updateProduct
);

// Delete product
// Merchant + Admin
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(ROLE_MERCHANT, ROLE_ADMIN),
    productOwnershipMiddleware,
    productController.deleteProduct
);

export default router;