import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import orderController from "../controllers/orderController.js";

const router = express.Router();

// Create Order
router.post(
    "/",
    authMiddleware,
    orderController.createOrder
);

// Get My Orders
router.get(
    "/my-orders",
    authMiddleware,
    orderController.getMyOrders
);

router.get(
    "/:id",
    authMiddleware,
    orderController.getOrderById
);

export default router;