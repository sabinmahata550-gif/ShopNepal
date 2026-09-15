import Order from "../models/Order.js";
import Product from "../models/Product.js";

const createOrder = async (orderData, userId) => {
    try {
        const { products } = orderData;
        let totalAmount = 0;
        const orderProducts = [];

        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                throw new Error(`Product not found: ${item.product}`);
            }

            if (product.stock < item.quantity) {
                throw new Error(`Not enough stock for ${product.name}`);
            }

            const price = product.price;

            totalAmount += price * item.quantity;

            orderProducts.push({
                product: product._id,
                quantity: item.quantity,
                price: price
            });
        }

        const order = await Order.create({
            user: userId,
            products: orderProducts,
            totalAmount
        });

        return order;

    } catch (error) {
        throw error;
    }
};

const getMyOrders = async (userId) => {
    try {
        const orders = await Order.find({ user: userId })
            .populate("user", "name email")
            .populate("products.product", "name price images")
            .sort({ createdAt: -1 });

        return orders;
    } catch (error) {
        throw error;
    }
};

const updateOrderStatus = async (orderId, status) => {
    try {
        const order = await Order.findById(orderId);

        if (!order) {
            throw new Error("Order not found");
        }

        order.status = status;

        await order.save();

        return order;
    } catch (error) {
        throw error;
    }
};
export default {
    createOrder,
    getMyOrders,
    updateOrderStatus
};