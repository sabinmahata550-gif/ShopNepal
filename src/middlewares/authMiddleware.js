import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
    try {
        const cookie = req.headers.cookie;
        if (!cookie) return res.status(401).send("User not authenticated.")
        const token = cookie.split("=")[1];
        const decoded = verifyToken(token);

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export default authMiddleware;