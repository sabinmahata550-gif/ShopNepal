import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

const createOrder = async (userId, shippingAddress) => {
    // Find user's cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
        throw new Error("Cart not found");
    }

    if (cart.items.length === 0) {
        throw new Error("Cart is empty");
    }

    let totalAmount = 0;

    const orderItems = cart.items.map((item) => {
        totalAmount += item.product.price * item.quantity;

        return {
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
        };
    });

    const order = await Order.create({
        user: userId,
        items: orderItems,
        totalAmount,
        shippingAddress,
    });

    // Clear cart after successful order
    cart.items = [];
    await cart.save();

    return await Order.findById(order._id)
        .populate("user", "name email phone")
        .populate("items.product", "name price images");
};

const getMyOrders = async (userId) => {
    return await Order.find({ user: userId })
        .populate("items.product", "name price images")
        .sort({ createdAt: -1 });
};

const getOrderById = async (orderId) => {
    const order = await Order.findById(orderId)
        .populate("user", "name email phone")
        .populate("items.product", "name price images");

    if (!order) {
        throw new Error("Order not found");
    }

    return order;
};
export default {
    createOrder,
    getMyOrders,
    getOrderById,
};