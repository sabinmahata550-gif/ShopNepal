import config from "../config/config.js";
import ResetPassword from "../models/ResetPassword.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import sendEmail from "../utils/email.js";
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

const forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    console.log("user is:", user._id.toString())
    if (!user) {
        throw {
            ststus: 404,
            message: "User not found."
        }
    }

    const token = crypto.randomUUID();
    await ResetPassword.create({
        userId: user._id,
        token: token

    })
    const link = `${config.appUrl}reset-password?userId=${user._id}&token=${token}`;
    await sendEmail({
        recipient: email,
        subject: "Reset Password",
        html: `
        <h2>Reset Your Password</h2>

        <p>Click the button below to reset your password.</p>

        <a
            href=${link}
            style="
                display: inline-block;
                padding: 12px 24px;
                background: #2563eb;
                color: white;
                text-decoration: none;
                border-radius: 6px;
            "
        >
            Reset Password
        </a>
    `
    });
    return {
        link,
        message: "Reset password link send to your email."
    }

}

const resetPassword = async (input) => {
    const data = await ResetPassword.findOne({
        userId: input.userId,
        expiresAt: { $gt: new Date() }
    }).sort({ createdAt: -1 });

    if (!data || data.token != input.token) {
        throw {
            status: 400,
            message: "Invalid or expired link.",
        }
    }

    if (data.isUsed) {
        throw {
            status: 400,
            message: "Link already used."
        }
    }
    const hashedPassword = await bcrypt.hash(input.password, 10);

    await User.findByIdAndUpdate(input.userId, {
        password: hashedPassword,

    })
    await ResetPassword.findByIdAndUpdate(data._id, {
        isUsed: true
    })

    return {
        message: "Password reset successfull.."
    }

}
export default {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
}