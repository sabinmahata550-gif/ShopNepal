import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import orderController from "../controllers/orderController.js";
import { ADMIN_ROLE, MERCHANT_ROLE } from "../constants/userRole.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";

const router = express.Router();

router.post(
    "/create",
    authMiddleware,
    orderController.createOrder
);
router.get(
    "/my-orders",
    authMiddleware,
    orderController.getMyOrders
);
router.patch(
    "/:id/status",
    authMiddleware,
    roleBasedAuth(ADMIN_ROLE, MERCHANT_ROLE),
    orderController.updateOrderStatus
);
export default router;