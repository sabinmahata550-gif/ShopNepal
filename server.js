import express from 'express';
import connectDB from './config/db.js';
import dotenv from "dotenv";
import userRoutes from './routes/userRoute.js';
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
dotenv.config();
const app = express();
const port = 3000;
connectDB();
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});