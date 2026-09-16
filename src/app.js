import express from "express";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoutes from "./routes/orderRoutes.js";
import multer from "multer"
const upload = multer({ storage: multer.memoryStorage() })

const app = express();
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", upload.array('images', 12), productRoute);
app.use("/api/orders", orderRoutes);
export default app;