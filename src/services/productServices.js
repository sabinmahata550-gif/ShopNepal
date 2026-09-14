import Product from "../models/Product.js";

const createProduct = async (productData, userId) => {
    try {
        const product = await Product.create({
            ...productData,
            createdBy: userId
        });

        return product;
    } catch (error) {
        throw error;
    }
};



const getAllProducts = async () => {
    try {
        return await Product.find()
            .populate("createdBy", "name email");
    } catch (error) {
        throw error;
    }
};

const getProductById = async (productId) => {
    try {

        const product = await Product.findById(productId)
            .populate("createdBy", "name email");
        return product;
    } catch (error) {
        throw error;
    }
}

const updateProduct = async (productId, userId, updateData) => {
    try {
        const product = await Product.findById(productId);

        if (!product) {
            throw new Error("Product not found");
        }

        // Product create गर्ने user मात्र update गर्न पाउने
        if (product.createdBy.toString() !== userId.toString()) {
            throw new Error(
                "Only the product creator can update this product"
            );
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true, runValidators: true }
        );

        return updatedProduct;

    } catch (error) {
        throw error;
    }
};

const deleteProduct = async (productId, userId) => {
    try {
        const product = await Product.findById(productId);

        if (!product) {
            throw new Error("Product not found");
        }

        if (product.createdBy.toString() !== userId.toString()) {
            throw new Error(
                "Only the product creator can delete this product"
            );
        }

        const deletedProduct = await Product.findByIdAndDelete(productId);

        return deletedProduct;

    } catch (error) {
        throw error;
    }
};
export default {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};




