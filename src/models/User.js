import mongoose from "mongoose";
import {
    ADMIN_ROLE,
    MERCHANT_ROLE,
    CUSTOMER_ROLE
} from "../constants/userRole.js";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },

        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        address: [
            {
                _id: false,

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
            }
        ],

        role: {
            type: String,
            enum: [
                ADMIN_ROLE,
                MERCHANT_ROLE,
                CUSTOMER_ROLE
            ],
            default: CUSTOMER_ROLE
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;