import mongoose from "mongoose";
import { ORDER_STATUS } from "../constants/orderStatus.js";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required."]
        },

        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: [true, "Product is required."]
                },

                quantity: {
                    type: Number,
                    required: [true, "Quantity must be at lesat 1."],
                    min: 1
                },

                payment: {
                    type: Number,
                    // required: true
                }
            }
        ],

        status: {
            type: String,
            enum: Object.values(ORDER_STATUS),
            default: ORDER_STATUS.PENDING
        },
        shippingAddress: {
            province: {
                type: String,
                required: true
            },
            district: {
                type: String,
                required: true
            },

            city: {
                type: String
            },

            street: {
                type: String
            }
        },
        orderNumber: {
            type: String,
            required: [true, "Ordernumber is required."]

        },
        totalAmount: {
            type: Number,
            required: [true, "total amount is required."]
        },
        payment: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Payment"

        }

    },
    {
        timestamps: true
    }
);

export default mongoose.model("Order", orderSchema);