import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import config from "./src/config/config.js";
import connectCloudinary from "./src/config/cloudinary.js";

dotenv.config();



connectDB();
connectCloudinary();
app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});