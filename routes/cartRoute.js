import express from "express";
import cartController from "../controllers/cartController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add product to cart
router.post("/", authMiddleware, cartController.addToCart);

// Get logged in user's cart
router.get("/", authMiddleware, cartController.getMyCart);

export default router;