import productController from "../controllers/productController.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import { ROLE_ADMIN } from "../constants/userRole.js";
const router=express.Router();

router.get("/",productController.getAllProducts);
router.get("/:id",productController.getProductById);
router.post("/",authMiddleware,roleMiddleware(ROLE_ADMIN),  productController.createProduct);
router.put("/:id",authMiddleware,productController.updateProduct);
router.delete("/:id",authMiddleware,productController.deleteProduct);

export default router;