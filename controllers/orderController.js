import orderService from "../services/orderService.js";

const createOrder = async (req, res) => {
  try {
    console.log(req.body)
    const order = await orderService.createOrder(
      req.user.id,
      req.body.shippingAddress
    );

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await orderService.getMyOrders(req.user.id);

    res.status(200).json({
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);

    res.status(200).json({
      message: "Order retrieved successfully",
      order,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export default {
  createOrder,
  getMyOrders,
  getOrderById,
};