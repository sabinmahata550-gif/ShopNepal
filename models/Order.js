import mongoose from "mongoose";
import { ORDER_CANCELLED, ORDER_CONFIRMED, ORDER_DELIVERED, ORDER_PENDING, ORDER_SHIPPED } from "../constants/orderStatus.js";


const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],

        totalAmount: {
            type: Number,
            required: true,
        },

        shippingAddress: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: [
                ORDER_PENDING,
                ORDER_CONFIRMED,
                ORDER_SHIPPED,
                ORDER_DELIVERED,
                ORDER_CANCELLED,
            ],
            default: ORDER_PENDING,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Order", orderSchema);