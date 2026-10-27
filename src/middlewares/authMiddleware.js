import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    let token;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    } else {
        const cookie = req.headers.cookie;
        if (!cookie) return res.status(401).send("User not authenticated.")
        token = cookie.split("=")[1];
    }
    try {

        const data = verifyToken(token);

        req.user = data;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export default authMiddleware;