import User from "../models/User.js";
import bcrypt from "bcrypt";
const registerUser = async (userData) => {
    const { name, email, password, phone, address, role } = userData;
    if (!name || !email || !password || !phone || !address) {
        throw new Error("All fields are required");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        ...userData,
        password: hashedPassword
    });
    return user;
}

const loginUser = async ({ identifier, password }) => {
    if (!identifier || !password) {
        throw new Error("Email/phone and password are required");
    }

    const user = await User.findOne({
        $or: [
            { email: identifier },
            { phone: identifier }
        ]
    });

    if (!user) {
        throw new Error("Invalid email/phone or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid email/phone or password");
    }

    return user;
};
export default {
    registerUser,
    loginUser
}