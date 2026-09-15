import orderService from "../services/orderServices.js";

const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        const order = await orderService.createOrder(
            req.body,
            userId
        );

        res.status(201).json({
            message: "Order created successfully",
            order
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await orderService.getMyOrders(userId);

        res.status(200).json({
            message: "My orders fetched successfully",
            orders
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await orderService.updateOrderStatus(
            req.params.id,
            status
        );

        res.status(200).json({
            message: "Order status updated successfully",
            order
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
export default {
    createOrder,
    getMyOrders,
    updateOrderStatus
};