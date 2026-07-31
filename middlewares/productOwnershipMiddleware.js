import { ROLE_ADMIN } from "../constants/userRole.js";
import Product from "../models/Product.js";

const productOwnershipMiddleware = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        // Admin can manage any product
        if (req.user.role === ROLE_ADMIN) {
            req.product = product;
            return next();
        }

        // Merchant can manage only their own product
        if (product.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You can only manage your own product",
            });
        }

        req.product = product;

        next();
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export default productOwnershipMiddleware;