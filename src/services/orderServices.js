import { ORDER_STATUS } from "../constants/orderStatus.js";
import Order from "../models/Order.js";


const getOrder = async () => {
    return await Order.find()
        .sort({ createdAt: -1 })
        .populate("user", "name email phone")
        .populate("orderItems.product", "name brand category price");
};
const getOrderById = async (id) => {
    return await Order.findById(id)
        .populate("user", "name email phone")
        .populate("orderItems.product", "name brand category price");
};
const createOrder = async (data, userId) => {
    return await Order.create({ ...data, user: userId });
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
const confirmOrder = async (id) => {
    return await Order.findByIdAndUpdate(id, { status: ORDER_STATUS.CONFIRMED }, { new: true });

};
const getOrderByUser = async (userId) => {
    return await Order.find({ user: userId })
        .populate("user", "name email phone")
        .populate("orderItems.product", "name brand category price");
};
const getOrderByMerchant = () => { };


export default {
    getOrder,
    getOrderById,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    deleteOrder,
    confirmOrder,
    getOrderByUser,
    getOrderByMerchant
}




