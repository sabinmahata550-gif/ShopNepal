import productController from "../controllers/productController.js";
import express from "express";

const router=express.Router();

router.get("/",productController.getAllProducts);
router.get("/:id",productController.getProductById);
router.post("/",productController.createProduct);
router.put("/:id",productController.updateProduct);
router.delete("/:id",productController.deleteProduct);

export default router;