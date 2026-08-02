import express from "express";
import cartController from "../controllers/cartController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validateMiddleware.js";
import cartSchema from "../validators/cartSchema.js";
import updateCartSchema from "../validators/updateCartSchema.js";
const router = express.Router();

// Add product to cart

router.post(
    "/",
    authMiddleware,
    validate(cartSchema),
    cartController.addToCart
);
// Get logged in user's cart
router.get("/", authMiddleware, cartController.getMyCart);

//Update cart item quantity

router.put("/:productId", authMiddleware, validate(updateCartSchema), cartController.updateCartItem);

// Remove item from cart
router.delete("/:productId", authMiddleware, cartController.removeCartItem);

// Clear cart
router.delete("/", authMiddleware, cartController.clearCart);

export default router;