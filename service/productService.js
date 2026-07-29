import Product from "../models/Product.js";

const getAllProducts = async () => {
    return await Product.find().populate("category", "name") .populate("category", "name")
    .populate("createdBy", "name email");;
};

const getProductById = async (id) => {
    return await Product.findById(id).populate("category", "name").populate("createdBy", "name email");
};

const createProduct = async (productData) => {
    return await Product.create(productData);
};

const updateProduct = async (id, productData) => {
    return await Product.findByIdAndUpdate(
        id,
        productData,
        {
            new: true,
            runValidators: true,
        }
    );
};

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};



export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};