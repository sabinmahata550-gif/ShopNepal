import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Add product to cart
const addToCart = async (userId, productId, quantity) => {
    // Check product exists
    const product = await Product.findById(productId);

    if (!product) {
        throw new Error("Product not found");
    }

    // Find user's cart
    let cart = await Cart.findOne({ user: userId });

    // If cart doesn't exist, create one
    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: [],
        });
    }

    // Check if product already exists in cart
    const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
    );

    if (existingItem) {
        // Increase quantity
        existingItem.quantity += quantity;
    } else {
        // Add new product
        cart.items.push({
            product: productId,
            quantity,
        });
    }

    await cart.save();

    return await Cart.findOne({ user: userId })
        .populate("items.product", "name price images");
};

// Get logged in user's cart
const getMyCart = async (userId) => {
    return await Cart.findOne({ user: userId }).populate(
        "items.product",
        "name price images"
    )
        .populate("user", "name email phone")

        ;
};

const updateCartItem = async (userId, productId, quantity) => {
    // Find user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        throw new Error("Cart not found");
    }

    // Find product in cart
    const item = cart.items.find(
        (item) => item.product.toString() === productId
    );
    if (!item) {
        throw new Error("Product not found in cart");
    }

    // Update quantity
    item.quantity = quantity;

    await cart.save();

    return await Cart.findOne({ user: userId })
        .populate("user", "name email phone")
        .populate("items.product", "name price images");
};

const removeCartItem = async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new Error("Cart not found");
    }

    cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
    );

    await cart.save();

    return await Cart.findOne({ user: userId })
        .populate("user", "name email phone")
        .populate("items.product", "name price images");
};

const clearCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId });
console.log("my cart is",cart)
    if (!cart) {
        throw new Error("Cart not found");
    }

    cart.items = [];

    await cart.save();

    return await Cart.findOne({ user: userId })
        .populate("user", "name email phone")
        .populate("items.product", "name price images");
};

export default {
    addToCart,
    getMyCart,
    updateCartItem,
    removeCartItem,
    clearCart,
};