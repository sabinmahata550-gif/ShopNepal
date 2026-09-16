import mongoose from "mongoose";

const paymentSChema=new mongoose.Schema({
    transactionId:String,
})

const Payment=mongoose.model("Payment",paymentSChema);
export default Payment;