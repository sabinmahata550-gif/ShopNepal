import { ORDER_STATUS } from "../constants/orderStatus.js";
import {
    PAYMENT_METHOD_CARD,
    PAYMENT_METHOD_CASH,
    PAYMENT_METHOD_ONLINE,
    PAYMENT_STATUS_FAILED,
    PAYMENT_STATUS_SUCCESS
} from "../constants/payment.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import { payVaiKhalti } from "../utils/payment.js";
import userServices from "./userServices.js";

const getOrder = async () => {
    return await Order.find()
        .sort({ createdAt: -1 })
        .populate("user", "name email phone")
        .populate("orderItems.product", "name brand category price");
};
const getOrderById = async (id) => {
    const order = await Order.findById(id)
        .populate("user", "name email phone")
        .populate("orderItems.product", "name brand category price")
        .populate("payment", "transactionId status amount method ");
    if (!order) throw {
        status: 400,
        message: "Order not found."
    }
    return order;
};
const createOrder = async (data, userId) => {
    const user = await userServices.getUserById(userId);
console.log(user.address)
    if (!data.shippingAddress) {
        data.shippingAddress = user.address[0];
    }

    data.orderNumber = crypto.randomUUID();
    data.user = userId;
    return await Order.create(data);
};
const updateOrderStatus = async (id, status) => {
    return await Order.findByIdAndUpdate(id, { status }, { new: true });
};
const cancelOrder = async (id) => {
    return await Order.findByIdAndUpdate(id, { status: ORDER_STATUS.CANCELLED }, { new: true });
};
const deleteOrder = async (id) => {
    await Order.findByIdAndDelete(id)
};
const confirmOrder = async (id, status) => {
    const order = await Order.findById(id);
    if (status?.toUpperCase() != PAYMENT_STATUS_SUCCESS) {
        await Payment.findByIdAndUpdate(order.payment, {
            status: PAYMENT_STATUS_FAILED
        }
        )

        throw {
            status: 400,
            message: "payment failed."
        }
    }
    await Payment.findByIdAndUpdate(order.payment, {
        status: PAYMENT_STATUS_SUCCESS
    })
    return await Order.findByIdAndUpdate(id,
        { status: ORDER_STATUS.CONFIRMED },
        { new: true }
    );

};
const getOrderByUser = async (userId) => {
    return await Order.find({ user: userId })
        .populate("user", "name email phone")
        .populate("orderItems.product", "name brand category price");
};
const getOrderByMerchant = () => { };

const orderPaymentViaCash = async (id) => {
    const order = await Order.findById(id)

    const orderPayment = await Payment.create({
        method: PAYMENT_METHOD_CASH,
        amount: order.totalAmount,
    });

    return await Order.findByIdAndUpdate(id, {
        status: ORDER_STATUS.CONFIRMED,
        payment: orderPayment.id,

    }, { new: true });
}

const orderPaymentViaKhalti = async (id) => {

    const order = await Order.findById(id)
        .populate("user", "name email phone")
        .populate("orderItems.product", "name");

    console.log("my order is ", order);

    const orderPayment = await Payment.create({
        method: PAYMENT_METHOD_ONLINE,
        amount: order.totalAmount,
    });

    await Order.findByIdAndUpdate(id, {
        payment: orderPayment.id,
    });

    return await payVaiKhalti({
        amount: order.totalAmount,
        purchaseOrderId: order.orderNumber,

        purchaseOrderName: order.orderItems[0].product.name,

        customerInfo: {
            name: order.user.name,
            email: order.user.email,
            phone: order.user.phone
        }
    });
};

export default {
    getOrder,
    getOrderById,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    deleteOrder,
    confirmOrder,
    getOrderByUser,
    getOrderByMerchant,
    orderPaymentViaCash,
    orderPaymentViaKhalti
}




