import productService from '../services/productServices.js';

const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const id = req.user.id;

        const product = await productService.createProduct(productData, id);
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const query=req.query;
        const products = await productService.getAllProducts(query);

        res.status(200).json({
            message: "Products fetched successfully",
            products
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const pId = req.params.id;
        const product = await productService.getProductById(pId);
        console.log("product is", product);
        res.status(200).json({
            message: "Products fetched successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const product = await productService.updateProduct(
            id,
            userId,
            req.body
        );

        res.status(200).json({
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        res.status(403).json({
            message: error.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const product = await productService.deleteProduct(
            id,
            userId
        );

        res.status(200).json({
            message: "Product deleted successfully",
            product
        });

    } catch (error) {
        res.status(403).json({
            message: error.message
        });
    }
};
export default {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}


