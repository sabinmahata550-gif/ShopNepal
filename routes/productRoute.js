import express from "express";

import productController from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import productOwnershipMiddleware from "../middlewares/productOwnershipMiddleware.js";

import {
    ROLE_ADMIN,
    ROLE_MERCHANT,
} from "../constants/userRole.js";

const router = express.Router();

// Public
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// Create product
// अहिले Admin मात्र
router.post(
    "/",
    authMiddleware,
    roleMiddleware(ROLE_ADMIN,ROLE_MERCHANT),
    productController.createProduct
);

// Update product
// Merchant + Admin
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware(ROLE_MERCHANT, ROLE_ADMIN),
    productOwnershipMiddleware,
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