import express from "express";
import orderController from "../controllers/orderController.js";
import { ADMIN_ROLE, CUSTOMER_ROLE, MERCHANT_ROLE } from "../constants/userRole.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get(
    "/",
    roleBasedAuth(ADMIN_ROLE),
    orderController.getOrder
);

router.get(
    "/my-orders",
    authMiddleware,
    orderController.getOrderByUser
);
router.get(
    "/:id",
    orderController.getOrderById
);



router.post(
    "/",
    authMiddleware,
    roleBasedAuth(CUSTOMER_ROLE),
    orderController.createOrder
);

router.patch(
    "/:id/cancel",
    authMiddleware,
    roleBasedAuth(CUSTOMER_ROLE),
    orderController.cancelOrder
);

router.patch(
    "/:id/status",
    authMiddleware,
    roleBasedAuth(ADMIN_ROLE, MERCHANT_ROLE),
    orderController.updateOrderStatus
);

router.patch(
    "/:id/confirm",
    authMiddleware,
    roleBasedAuth(CUSTOMER_ROLE),
    orderController.confirmOrder
);

router.delete(
    "/:id",
    roleBasedAuth(ADMIN_ROLE),
    orderController.deleteOrder
);


export default router;