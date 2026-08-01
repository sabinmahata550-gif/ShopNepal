import cartService from "../services/cartService.js";

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await cartService.addToCart(
      req.user.id,
      productId,
      quantity
    );

    return res.status(200).json({
      message: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getMyCart = async (req, res) => {
  try {
    const cart = await cartService.getMyCart(req.user.id);

    return res.status(200).json({
      message: "Cart retrieved successfully",
      cart,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export default {
  addToCart,
  getMyCart,
};