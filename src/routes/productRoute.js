import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import productController from "../controllers/productController.js";

import {
    MERCHANT_ROLE,
    ADMIN_ROLE
} from "../constants/userRole.js";
import validate from "../middlewares/validate.js";
import productSchema from "../validators/productValidator.js";

const router = express.Router();

router.post(
    "/create",
    authMiddleware,
    roleBasedAuth(MERCHANT_ROLE, ADMIN_ROLE),
    validate(productSchema),
    productController.createProduct
);

router.patch(
    "/:id",
    authMiddleware,
    roleBasedAuth(MERCHANT_ROLE, ADMIN_ROLE),
    validate(productSchema),
    productController.updateProduct
);

router.delete(
    "/:id",
    authMiddleware,
    roleBasedAuth(MERCHANT_ROLE, ADMIN_ROLE),
    productController.deleteProduct
);

router.get(
    "/",
    productController.getAllProducts
);

export default router;