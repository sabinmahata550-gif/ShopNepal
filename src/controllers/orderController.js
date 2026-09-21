import orderServices from "../services/orderServices.js"
const getOrder = async (req, res) => {
    try {
        const orders = await orderServices.getOrder();
        res.json(orders)
    } catch (error) {
        res.status(400).json(error.message);
    }
}
const getOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await orderServices.getOrderById(id);
        res.json(order)

    } catch (error) {
        res.status(400).json(error.message);

    }
}
const createOrder = async (req, res) => {
    try {
        const data = req.body;
        const user = req.user;
        const createorder = await orderServices.createOrder(data, user);
        res.json(createorder)

    } catch (error) {
        res.status(400).json(error.message);

    }
}
const updateOrderStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.status;
        const order = await orderServices.updateOrderStatus(id, status);
        res.json(order)

    } catch (error) {
        res.status(400).json(error.message);

    }
}
const cancelOrder = async (req, res) => {
    try {
        const id = req.params.id;

        const order = await orderServices.cancelOrder(id)
        res.json(order)

    } catch (error) {
        res.status(400).json(error.message);

    }
}
const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id;

        await orderServices.deleteOrder(id)
        res.json({ message: "Order deleted successfull." })

    } catch (error) {
        res.status(400).json(error.message);

    }
}
const confirmOrder = async (req, res) => {
    try {
        const id = req.params.id;

        const order = await orderServices.confirmOrder(id, req.body.status)
        res.json(order)


    } catch (error) {
        res.status(400).json(error.message);

    }
}
const getOrderByUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const order = await orderServices.getOrderByUser(userId);
        res.json(order);
    } catch (error) {
        res.status(400).json(error.message);

    }
}
const getOrderByMerchant = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await orderServices.getOrderByMerchant(userId);
        res.json(orders);

    } catch (error) {
        res.status(400).json(error.message);

    }
}

const orderPaymentViaCash = async (req, res) => {
    try {
        const id = req.params.id;

        const order = await orderServices.orderPaymentViaCash(id)
        res.json(order)
    } catch (error) {
        res.status(400).json(error.message);

    }
}

const orderPaymentViaKhalti = async (req, res) => {
    try {
        const id = req.params.id;

        const order = await orderServices.orderPaymentViaKhalti(id)
        res.json(order)
    } catch (error) {
        res.status(400).json(error.message);

    }
}

export default {
    getOrder,
    getOrderById,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    confirmOrder,
    deleteOrder,
    getOrderByUser,
    getOrderByMerchant,
    orderPaymentViaCash,
    orderPaymentViaKhalti
}