import jwt from "jsonwebtoken"
import config from "../config/config.js";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (user) => {
    return jwt.sign(user, config.JWT_SECRET, { expiresIn: "1h" })
};


export const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
        throw new Error("Invalid token");
    }

}