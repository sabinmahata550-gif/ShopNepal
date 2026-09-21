import Product from "../models/Product.js";

const createProduct = async (productData, userId, imgUrl) => {
    try {
        const product = await Product.create({
            ...productData,
            createdBy: userId,
            ImageUrls: imgUrl
        });

        return product;
    } catch (error) {
        throw error;
    }
};



const getAllProducts = async (query) => {
    try {
        const limit = Number(query.limit) || 10;
        const skip = Number(query.skip) || 0;
        const filters = {}
        const { brand, category, name, min, max } = query;
        if (brand) filters.brand = {
            $regex: brand,
            $options: "i"
        };
        if (category) filters.category = {
            $regex: category,
            $options: "i"
        };

        if (name) filters.name = {
            $regex: name,
            $options: "i"
        };
        if (min || max) {
            filters.price = {};

            if (min) {
                filters.price.$gte = Number(min);
            }

            if (max) {
                filters.price.$lte = Number(max);
            }
        }
        return await Product.find(filters)
            .sort({ createdAt: -1 }).skip(skip).limit(limit)
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




