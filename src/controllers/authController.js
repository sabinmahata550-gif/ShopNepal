import authservice from "../services/authServices.js";
import { generateToken } from "../utils/jwt.js";
const registerUser = async (req, res) => {
    try {
        const user = await authservice.registerUser(req.body);
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        const user = await authservice.loginUser({ identifier, password });
        const token = generateToken(user);
        res.cookie("authToken",token,{
            maxAge:86400*1000,
        })
        res.status(200).json({ message: "User logged in successfully", user, token });
    } catch (error) {
        res.status(error.status || 401).json({ error: error.message });
    }
};


const forgotPassword = async (req, res) => {
    try {
        const input = req.body;

        const data = await authservice.forgotPassword(input.email);

        res.json(data);
    } catch (error) {
        res.status(error.status || 400).json({ error: error.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const input = req.body;

        const data = await authservice.resetPassword(input);

        res.json(data);
    } catch (error) {
        res.status(error.status || 400).json({ error: error.message });
    }
};

export default {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
};