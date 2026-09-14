import authservice from "../services/authServices.js";
import { generateToken } from "../utils/jwt.js";
const registerUser = async (req, res) => {
    try {
        const user = await authservice.registerUser(req.body);
        user.password = undefined; // Hide password in response
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        const user = await authservice.loginUser({ identifier, password });
        user.password = undefined; // Hide password in response
        const token = generateToken(user);
        res.status(200).json({ message: "User logged in successfully", user, token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export default {
    registerUser,
    loginUser
};