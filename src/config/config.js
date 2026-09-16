import dotenv from "dotenv";
dotenv.config();

const config = {
    PORT: process.env.PORT || 8000,
    MONGO_URI: process.env.MONGO_URI || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
    cloudinary: {
        cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME || "",
        apiKey: process.env.CLOUDINARY_API_KEY || "",
        apiSecret: process.env.CLOUDINAY_API_SECRET || ""
    }

}

export default config;