import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import config from "./src/config/config.js";
import connectCloudinary from "./src/config/cloudinary.js";

dotenv.config();

await connectDB();
connectCloudinary();

const PORT = config.PORT || 8000;

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;