import jwt from "jsonwebtoken"
const generateToken = async (data) => {
    try {
        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' })
        return token
    } catch (error) {
        throw error;
    }
}

const verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {

        throw {
            status: 401,
            message: "Invalid or expired token"
        };
    }
}

export default { generateToken, verifyToken }