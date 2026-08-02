import Product from "../models/Product.js";
import uploadFile from "../utils/fileUploader.js";

const getAllProducts = async () => {
    return await Product.find()
        .populate("category", "name")
        .populate("createdBy", "name email role");
};
const getProductById = async (id) => {
    return await Product.findById(id)
        .populate("category", "name")
        .populate("createdBy", "name email role");
};

const createProduct = async (productData) => {
    const { files, ...data } = productData;

    const imageUrls = await uploadFile(files);

    return await Product.create({
        ...data,
        images: imageUrls,
    });
};

const updateProduct = async (id, productData) => {
    return await Product.findByIdAndUpdate(
        id,
        productData,
        {
            new: true,
            runValidators: true,
        }
    )
        .populate("category", "name")
        .populate("createdBy", "name email phone role");
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