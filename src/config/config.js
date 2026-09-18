import dotenv from "dotenv";
dotenv.config();

const config = {
    appUrl:process.env.APP_URL||"",
    PORT: process.env.PORT || 8000,
    MONGO_URI: process.env.MONGO_URI || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
    cloudinary: {
        cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME || "",
        apiKey: process.env.CLOUDINARY_API_KEY || "",
        apiSecret: process.env.CLOUDINAY_API_SECRET || ""
    },
    khalti:{
        apiUrl:process.env.KHALTI_API_URL||"",
        secretKey:process.env.KHALTI_SECRET_KEY||"",
        returnUrl:process.env.KHALTI_RETURN_URL||"",
    }

}

export default config;