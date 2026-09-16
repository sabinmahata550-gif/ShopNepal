import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const addToCart = async (userId, productId, quantity) => {
    try {
        // 1. Product exists कि छैन check
        const product = await Product.findById(productId);

        if (!product) {
            throw new Error("Product not found");
        }

        // 2. Quantity valid छ कि छैन
        if (quantity < 1) {
            throw new Error("Quantity must be at least 1");
        }

        // 3. Cart खोज्ने
        let cart = await Cart.findOne({ user: userId });

        // 4. Cart छैन भने नयाँ cart बनाउने
        if (!cart) {
            if (quantity > product.stock) {
                throw new Error("Not enough stock");
            }

            cart = await Cart.create({
                user: userId,
                products: [
                    {
                        product: productId,
                        quantity
                    }
                ]
            });

            return cart;
        }

        // 5. Product पहिले नै cart मा छ कि छैन
        const existingItem = cart.products.find(
            (item) => item.product.toString() === productId.toString()
        );

        // 6. Product cart मा पहिलेदेखि छ
        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;

            if (newQuantity > product.stock) {
                throw new Error("Not enough stock");
            }

            existingItem.quantity = newQuantity;
        }
        // 7. Product cart मा छैन
        else {
            if (quantity > product.stock) {
                throw new Error("Not enough stock");
            }

            cart.products.push({
                product: productId,
                quantity
            });
        }

        // 8. Save
        await cart.save();

        return cart;

    } catch (error) {
        throw error;
    }
};

export default {
    addToCart
};