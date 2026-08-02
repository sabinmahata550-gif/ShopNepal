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

const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    const cart = await cartService.updateCartItem(
      req.user.id,
      productId,
      quantity
    );

    return res.status(200).json({
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


const removeCartItem=async(req,res)=>{
  try{
    const{productId} = req.params;
    const cart = await cartService.removeCartItem(req.user.id, productId);
    return res.status(200).json({
      message: "Item removed from cart successfully",
      cart,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

const clearCart=async(req,res)=>{
  try{
    const cart=await cartService.clearCart(req.user.id);
    return res.status(200).json({
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

export default {
  addToCart,
  getMyCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};