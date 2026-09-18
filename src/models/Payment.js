import mongoose from "mongoose";
import {
    PAYMENT_METHOD_CARD,
    PAYMENT_METHOD_CASH,
    PAYMENT_METHOD_ONLINE,
    PAYMENT_STATUS_FAILED,
    PAYMENT_STATUS_SUCCESS,
    PAYMENT_STATUS_PENDING
} from "../constants/payment.js";

const paymentSChema = new mongoose.Schema({
    transactionId: String,
    amount: {
        type: Number,
        required: [true, "payment amount is required."],
    },
    method: {
        type: String,
        required: [true, "payment method is required."],

        enum: [PAYMENT_METHOD_CARD, PAYMENT_METHOD_CASH, PAYMENT_METHOD_ONLINE]
    },
    status: {
        type: String,
        enum: [PAYMENT_STATUS_PENDING, PAYMENT_STATUS_SUCCESS, PAYMENT_STATUS_FAILED],
        default:PAYMENT_STATUS_PENDING
    },
}, {
    timestamps: true
})

const Payment = mongoose.model("Payment", paymentSChema);
export default Payment;